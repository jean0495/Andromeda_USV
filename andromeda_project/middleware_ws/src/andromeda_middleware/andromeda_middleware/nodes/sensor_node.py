import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from andromeda_middleware.infrastructure.serial.serial_client import SerialClient
from andromeda_middleware.infrastructure.serial.serial_config import SerialConfig
import math

class SensorNode(Node):
    def __init__(self):
        super().__init__('sensor_node')
        self.publisher_ = self.create_publisher(String, 'sensor_data', 10)
        self.serial = None
        self.serial_connected = False
        self._tick = 0

        config = SerialConfig(port='/dev/ttyUSB0', baudrate=115200)
        try:
            self.serial = SerialClient(config)
            self.serial.connect()
            self.serial_connected = True
            self.get_logger().info("Serial conectado")
        except Exception as e:
            self.get_logger().warning(f"Serial no disponible, modo mock activo: {e}")

        self.timer = self.create_timer(0.1, self.read_and_publish)

    def process_raw_data(self, raw: str):
        try:
            parsed = {}
            for item in raw.split(','):
                key, value = item.split(':')
                parsed[key.strip()] = float(value)

            temp = parsed.get('temp')
            ph   = parsed.get('ph')
            volt = parsed.get('volt')
            turb = parsed.get('turb')

            if temp is not None and not (-40 <= temp <= 125):
                return None
            if ph is not None and not (0 <= ph <= 14):
                return None
            if volt is not None and not (0 <= volt <= 30):
                return None
            if turb is not None and not (0 <= turb <= 1000):
                return None

            return f"SensorData(temp={temp}, ph={ph}, volt={volt}, turb={turb})"
        except Exception:
            return None

    def _mock_data(self) -> str:
        self._tick += 1
        temp = round(25.0 + 5.0 * math.sin(self._tick * 0.1),  2)
        ph   = round(7.0  + 0.5 * math.cos(self._tick * 0.07), 2)
        volt = round(12.0 + 0.4 * math.sin(self._tick * 0.05), 2)
        turb = round(12.0 + 3.0 * math.cos(self._tick * 0.09), 2)
        return f"temp:{temp},ph:{ph},volt:{volt},turb:{turb}"

    def read_and_publish(self):
        try:
            raw = self.serial.read_line() if self.serial_connected else self._mock_data()
            if raw:
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