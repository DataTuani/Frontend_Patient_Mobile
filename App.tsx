import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Button, TextInput, Text } from 'react-native';
import { io } from 'socket.io-client';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isStreaming, setIsStreaming] = useState(false);
  const [remoteFrame, setRemoteFrame] = useState<string | null>(null);
  const [roomId, setRoomId] = useState("1001"); // ✅ ID por defecto
  const [connected, setConnected] = useState(false);
  const [waiting, setWaiting] = useState(true);

  const cameraRef = useRef<CameraView | null>(null);
  const socketRef = useRef<any>(null);

  // pedir permisos de cámara
  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  // conexión websocket
  useEffect(() => {
    const socket = io("https://sinaes.up.railway.app/", { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Conectado al servidor:", socket.id);
    });

    // cuando otro usuario se une a la misma sala
    socket.on("user-joined", (userId) => {
      console.log("Otro usuario se unió:", userId);
      setWaiting(false);
    });

    // recibir frames del otro usuario
    socket.on("video-frame", ({ frame }) => {
      setRemoteFrame(frame);
      setWaiting(false);
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor");
      setConnected(false);
      setWaiting(true);
    });

    return () => socket.disconnect();
  }, []);

  // unirse a la sala
  const joinRoom = () => {
    if (socketRef.current) {
      socketRef.current.emit("join-room", { roomId });
      setConnected(true);
      setWaiting(true);
    }
  };

  // capturar y enviar frames periódicamente
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStreaming && cameraRef.current && socketRef.current && connected) {
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
  }, [isStreaming, connected]);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Button title="Permitir cámara" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!connected ? (
        <>
          <Text style={styles.title}>📡 Unirse a una sala</Text>
          <TextInput
            value={roomId}
            onChangeText={setRoomId}
            keyboardType="numeric"
            placeholder="Ingrese ID de sala"
            style={styles.input}
          />
          <Button title="Conectarse" onPress={joinRoom} />
        </>
      ) : (
        <>
          <CameraView ref={cameraRef} style={styles.camera} facing="front" />
          {waiting && !remoteFrame && (
            <Text style={styles.waitingText}>Esperando cámara del otro usuario...</Text>
          )}
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 16 },
  camera: { width: 180, height: 240, borderRadius: 10, marginBottom: 10 },
  remote: { width: 180, height: 240, borderRadius: 10, marginBottom: 10 },
  title: { color: '#fff', fontSize: 18, marginBottom: 10 },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    width: 150,
    textAlign: 'center',
    marginBottom: 10,
  },
  waitingText: { color: '#aaa', marginBottom: 10 },
});
