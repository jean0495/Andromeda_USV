import rclpy
import json
import time
import cv2
import base64
import threading
from rclpy.node import Node
from std_msgs.msg import String
from andromeda_middleware.infrastructure.mqtt.mqtt_client import MQTTClient


class MQTTBridgeNode(Node):

    def __init__(self):
        super().__init__('mqtt_bridge_node')

        self.mqtt = MQTTClient()
        try:
            self.mqtt.connect()
            self.get_logger().info("MQTT conectado")
        except Exception as e:
            self.get_logger().error(f"MQTT error: {e}")

        self.sensor_sub = self.create_subscription(
            String, 'sensor_data', self.sensor_callback, 10
        )

        self.camera_thread = threading.Thread(target=self._camera_loop, args=(0, 'camera/frame'), daemon=True)
        self.camera_thread2 = threading.Thread(target=self._camera_loop, args=(2, 'camera/frame/2'), daemon=True)
        self.camera_thread.start()
        self.camera_thread2.start()

    def sensor_callback(self, msg):
        try:
            data = json.loads(msg.data)
            data["timestamp"] = time.time()
            self.mqtt.publish("sensors/data", json.dumps(data))
        except Exception as e:
            self.get_logger().error(f"Error sensor: {e}")

    def _camera_loop(self, index, topic):
        self.get_logger().info(f"Iniciando cámara {index} → {topic}")

        cap = cv2.VideoCapture(index)
        cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'MJPG'))
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        cap.set(cv2.CAP_PROP_FPS, 30)
        cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

        if not cap.isOpened():
            self.get_logger().error(f"❌ No se pudo abrir cámara {index}")
            return

        self.get_logger().info(f"✅ Cámara {index} abierta")

        last_publish = 0
        interval = 0.033  # 30fps

        while True:
            ret, frame = cap.read()
            if not ret:
                time.sleep(0.1)
                continue

            now = time.time()
            if now - last_publish < interval:
                continue
            last_publish = now

            try:
                _, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 75])
                b64 = base64.b64encode(buffer).decode('utf-8')
                self.mqtt.publish(topic, b64)
            except Exception as e:
                self.get_logger().error(f"Error cámara {index}: {e}")

        cap.release()


def main(args=None):
    rclpy.init(args=args)
    node = MQTTBridgeNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    node.destroy_node()
    rclpy.shutdown()