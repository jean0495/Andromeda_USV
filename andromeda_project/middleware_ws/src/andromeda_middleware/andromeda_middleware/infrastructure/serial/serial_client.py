import serial
from .serial_config import SerialConfig
from .exceptions import SerialConnectionError, SerialReadError


class SerialClient:
    def __init__(self, config: SerialConfig):
        self.config = config
        self.ser = None

    def connect(self):
        try:
            self.ser = serial.Serial(
                port=self.config.port,
                baudrate=self.config.baudrate,
                timeout=self.config.timeout
            )
        except Exception as e:
            raise SerialConnectionError(f"Error connecting to serial: {e}")

    def is_connected(self):
        return self.ser is not None and self.ser.is_open

    def read_line(self) -> str | None:
        if not self.is_connected():
            raise SerialConnectionError("Serial not connected")

        try:
            if self.ser.in_waiting > 0:
                return self.ser.readline().decode('utf-8').strip()
            return None
        except Exception as e:
            raise SerialReadError(f"Error reading serial: {e}")

    def write(self, data: str):
        if not self.is_connected():
            raise SerialConnectionError("Serial not connected")

        try:
            self.ser.write(data.encode('utf-8'))
        except Exception as e:
            raise SerialReadError(f"Error writing serial: {e}")

    def close(self):
        if self.ser and self.ser.is_open:
            self.ser.close()