import paho.mqtt.client as mqtt


class MQTTClient:

    def __init__(self, host='localhost', port=1883):
        self.client = mqtt.Client()
        self.host = host
        self.port = port

    def connect(self):
        self.client.connect(self.host, self.port)
        self.client.loop_start()

    def publish(self, topic, message):
        self.client.publish(topic, message)
