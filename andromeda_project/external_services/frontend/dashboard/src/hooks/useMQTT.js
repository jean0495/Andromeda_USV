import { useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';

export function useMQTT() {
  const clientRef = useRef(null);
  const onFrameRef = useRef(null);
  const lastFrameTime = useRef(0);
  const onFrameRef2 = useRef(null);

  const [connected, setConnected] = useState(false);
  const [sensorData, setSensorData] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(null);
  const [frameData, setFrameData] = useState(null); 

  useEffect(() => {
    const client = mqtt.connect('ws://raspberrypi.local:9001');
    clientRef.current = client;

    client.on('connect', () => {
      console.log(" MQTT conectado");
      setConnected(true);

      client.subscribe('sensors/data');
      client.subscribe('camera/status');
      client.subscribe('camera/frame');
      client.subscribe('camera/frame/2'); 
    });

    client.on('message', (topic, message) => {
      const payload = message.toString();

      if (topic === 'sensors/data') {
        try {
          const raw = JSON.parse(payload);
          console.log("📡 Sensor recibido:", raw);
          setSensorData(raw);
        } catch (e) {
          console.error('Error parsing sensor data:', e);
        }
      }

      else if (topic === 'camera/status') {
        setCameraStatus(payload);
      }
      else if (topic === 'camera/frame/2') {
        if (onFrameRef2.current) {
          onFrameRef2.current(`data:image/jpeg;base64,${payload}`);
      }
    }

      else if (topic === 'camera/frame') { // 
         const now = Date.now();
         if (now - lastFrameTime.current < 100) return;
         lastFrameTime.current = now;
         if (onFrameRef.current) {

            onFrameRef.current(`data:image/jpeg;base64,${payload}`);
        }
      }
    });

    client.on('error', (err) => {
      console.error('❌ MQTT error:', err);
      setConnected(false);
    });

    client.on('close', () => {
      console.warn("⚠️ MQTT desconectado");
      setConnected(false);
    });

    return () => {
      client.end();
    };
  }, []);

  const publish = (topic, message) => {
    if (clientRef.current && connected) {
      clientRef.current.publish(topic, message);
    }
  };

  return {
    connected,
    sensorData,
    cameraStatus,
    onFrameRef,
    onFrameRef2,
    publish
  };
}