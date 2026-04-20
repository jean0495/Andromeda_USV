import { useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';

export function useMQTT() {
  const clientRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [sensorData, setSensorData] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(null);

  useEffect(() => {
    const client = mqtt.connect('ws://localhost:9001');
    clientRef.current = client;

    client.on('connect', () => {
      setConnected(true);
      client.subscribe('sensors/data');
      client.subscribe('camera/status');
    });

    client.on('message', (topic, message) => {
      const payload = message.toString();
      if (topic === 'sensors/data') setSensorData(payload);
      else if (topic === 'camera/status') setCameraStatus(payload);
    });

    client.on('error', (err) => {
      console.error('MQTT error:', err);
      setConnected(false);
    });

    client.on('disconnect', () => setConnected(false));

    return () => client.end();
  }, []);

  const publish = (topic, message) => {
    clientRef.current?.publish(topic, message);
  };

  return { connected, sensorData, cameraStatus, publish };
}
