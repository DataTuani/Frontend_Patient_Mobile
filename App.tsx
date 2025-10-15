import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system/legacy";

import axios from "axios";

export default function TextToSpeech() {
  const [text, setText] = useState<string>("");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Convertir ArrayBuffer a Base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const handlePlay = async () => {
    if (!text) {
      Alert.alert("Escribe algo primero");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("text", text);

      // Cambia por tu IP local
      const response = await axios.post(
        "http://10.0.10.242:8000/text-to-speech",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "arraybuffer",
        }
      );

      const base64Audio = arrayBufferToBase64(response.data);
      const fileUri = FileSystem.cacheDirectory + "speech.mp3";

      // Aquí usamos "base64" directamente
      await FileSystem.writeAsStringAsync(fileUri, base64Audio, {
        encoding: "base64",
      });

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: fileUri });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error(error);
      Alert.alert("Error al reproducir audio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe algo..."
        value={text}
        onChangeText={setText}
      />
      <Button title={loading ? "Cargando..." : "Reproducir"} onPress={handlePlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
