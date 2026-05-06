import rclpy 
from rclpy.node import Node
from std_msgs.msg import String
from andromeda_middleware.infrastructure.serial.serial_client import SerialClient
from andromeda_middleware.infrastructure.serial.serial_config import SerialConfig
import math
import json

class SensorNode(Node):
    def __init__(self):
        super().__init__('sensor_node')
        self.publisher_ = self.create_publisher(String, 'sensor_data', 10)
        self.serial = None
        self.serial_connected = False
        self._tick = 0

        config = SerialConfig(port='/dev/ttyAMA0', baudrate=115200)
        try:
            self.serial = SerialClient(config)
            self.serial.connect()
            self.serial_connected = True
            self.get_logger().info("Serial conectado")
        except Exception as e:
            self.get_logger().warning(f"Serial no disponible, {e}")

        self.timer = self.create_timer(0.1, self.read_and_publish)

    def process_raw_data(self, raw: str):
        try:
            data = json.loads(raw)

            temp = data.get('temp')
            hum  = data.get('hum')
            volt = data.get('volt')
            turb = data.get('turb')

            # Validaciones
            if temp is not None and not (-40 <= temp <= 125):
                return None
            if hum is not None and not (0 <= hum <= 100):
                return None
            if volt is not None and not (0 <= volt <= 5):
                return None
            if turb is not None and not (0 <= turb <= 1000):
                return None

            return json.dumps({
                "temp": temp,
                "hum": hum,
                "volt": volt,
                "turb": turb
            })

        except Exception:
            return None

   

    def read_and_publish(self):
        try:
            raw = self.serial.read_line() if self.serial_connected else None

            if not raw:
                return

            data = self.process_raw_data(raw)
            if data:
                msg = String()
                msg.data = data
                self.publisher_.publish(msg)
                self.get_logger().info(f"Publicado: {msg.data}")

        except Exception as e:
            self.get_logger().error(f"Error en loop: {e}")

def main(args=None):
    rclpy.init(args=args)
    node = SensorNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    node.destroy_node()
    rclpy.shutdown()