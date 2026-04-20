import cv2


class CameraClient:

    def __init__(self, device_index=0):
        self.device_index = device_index
        self.cap = None

    def connect(self):
        self.cap = cv2.VideoCapture(self.device_index)

        if not self.cap.isOpened():
            raise Exception("No se pudo abrir la cámara")

    def read_frame(self):
        if self.cap is None:
            return None

        ret, frame = self.cap.read()

        if not ret:
            return None

        return frame

    def release(self):
        if self.cap:
            self.cap.release()