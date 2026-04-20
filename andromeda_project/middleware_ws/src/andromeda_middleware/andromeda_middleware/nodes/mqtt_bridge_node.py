import rclpy
from rclpy.node import Node
from std_msgs.msg import String

from andromeda_middleware.infrastructure.mqtt.mqtt_client import MQTTClient


class MQTTBridgeNode(Node):

    def __init__(self):
        super().__init__('mqtt_bridge_node')

        # MQTT
        self.mqtt = MQTTClient()

        try:
            self.mqtt.connect()
            self.get_logger().info("MQTT conectado")
        except Exception as e:
            self.get_logger().error(f"MQTT error: {e}")

        # 🔹 Subscripciones ROS2
        self.sensor_sub = self.create_subscription(
            String,
            'sensor_data',
            self.sensor_callback,
            10
        )

        self.camera_sub = self.create_subscription(
            String,
            'camera_status',
            self.camera_callback,
            10
        )

    # 🔥 CALLBACK SENSORES
    def sensor_callback(self, msg):
        self.get_logger().info(f"Sensor recibido: {msg.data}")

        self.mqtt.publish("sensors/data", msg.data)

    # 🔥 CALLBACK CAMARA
    def camera_callback(self, msg):
        self.get_logger().info(f"Camara: {msg.data}")

        self.mqtt.publish("camera/status", msg.data)


def main(args=None):
    rclpy.init(args=args)

    node = MQTTBridgeNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass

    node.destroy_node()
    rclpy.shutdown()