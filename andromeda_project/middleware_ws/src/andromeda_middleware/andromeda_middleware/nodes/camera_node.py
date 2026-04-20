import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image

from cv_bridge import CvBridge
from std_msgs.msg import String

from andromeda_middleware.infrastructure.camera.camera_client import CameraClient


class CameraNode(Node):

    def __init__(self):
        super().__init__('camera_node')
        
        self.publisher_ = self.create_publisher(String, 'camera_status', 10)
        self.timer = self.create_timer(0.1, self.capture_and_publish)

        self.bridge = CvBridge()

        # Infraestructura
        self.camera = CameraClient(0)
        self.camera_connected = False 

        try:
            self.camera.connect()
            self.get_logger().info("Cámara conectada")
        except Exception as e:
            self.get_logger().warning(f"No se pudo conectar cámara: {e}")

    def capture_and_publish(self):

        if not self.camera_connected:
            self.get_logger().warning("Intentando reconectar cámara...")
        
            try:
                self.camera.connect()
                self.camera_connected = True
                self.get_logger().info("Cámara reconectada")
            except:
                return  # sigue intentando sin romper nada

        frame = self.camera.read_frame()

        if frame is None:
            self.get_logger().warning("No se pudo leer frame")
            return

        try:
            msg = self.bridge.cv2_to_imgmsg(frame, encoding="bgr8")
            self.publisher_.publish(msg)

        except Exception as e:
            self.get_logger().error(f"Error procesando frame: {e}")

        msg = String()
        msg.data = "frame capturado"

        self.publisher_.publish(msg)

def main(args=None):
    rclpy.init(args=args)

    node = CameraNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass

    node.destroy_node()
    rclpy.shutdown()