import cv2
import threading

class CameraClient:

    def __init__(self, device_index=0):
        self.device_index = device_index
        self.cap = None
        self.latest_frame = None
        self.lock = threading.Lock()
        self._running = False
        self._thread = None

    def connect(self):
        self.cap = cv2.VideoCapture(self.device_index)
        if not self.cap.isOpened():
            raise Exception(f"No se pudo abrir /dev/video{self.device_index}")
        self.cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'MJPG'))
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 320)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 240)
        self.cap.set(cv2.CAP_PROP_FPS, 30)

        # ✅ Hilo que consume frames continuamente
        self._running = True
        self._thread = threading.Thread(target=self._capture_loop, daemon=True)
        self._thread.start()

    def _capture_loop(self):
        """Lee frames lo más rápido posible y guarda solo el último"""
        while self._running:
            ret, frame = self.cap.read()
            if ret:
                with self.lock:
                    self.latest_frame = frame

    def read_frame(self):
        """Devuelve siempre el frame más reciente"""
        with self.lock:
            return self.latest_frame.copy() if self.latest_frame is not None else None

    def release(self):
        self._running = False
        if self._thread:
            self._thread.join(timeout=1)
        if self.cap:
            self.cap.release()