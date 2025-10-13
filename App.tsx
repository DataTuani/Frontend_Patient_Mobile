import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import { io } from 'socket.io-client';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isStreaming, setIsStreaming] = useState(false);
  const [remoteFrame, setRemoteFrame] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const socketRef = useRef<any>(null);
  const roomId = "sala_1";

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  // conexión websocket
  useEffect(() => {
    const socket = io("https://sinaes.up.railway.app/", { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Conectado al servidor:", socket.id);
      socket.emit("join-room", { roomId });
    });

    socket.on("video-frame", ({ frame }) => {
      setRemoteFrame(frame);
    });

    return () => socket.disconnect();
  }, []);

  // captura y envío de frames
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStreaming && cameraRef.current && socketRef.current) {
      interval = setInterval(async () => {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.2,
        });
        socketRef.current.emit("video-frame", { roomId, frame: photo.base64 });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Button title="Permitir cámara" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="front" />
      {remoteFrame && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${remoteFrame}` }}
          style={styles.remote}
        />
      )}
      <Button
        title={isStreaming ? "Detener transmisión" : "Iniciar transmisión"}
        onPress={() => setIsStreaming(!isStreaming)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  camera: { width: 180, height: 240, borderRadius: 10 },
  remote: { width: 180, height: 240, borderRadius: 10, marginTop: 10 },
});
