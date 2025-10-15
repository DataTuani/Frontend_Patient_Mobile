import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Audio } from "expo-av";
import axios from "axios";

export default function TextToSpeech() {
  const [text, setText] = useState<string>("");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePlay = async () => {
    if (!text) {
      Alert.alert("Escribe algo primero");
      return;
    }

    try {
      setLoading(true);

      // Crear FormData
      const formData = new FormData();
      formData.append("text", text);
      try {

        const response = await axios.post(
          "http://10.0.2.2:8000/text-to-speech"
, // Cambia <TU_IP_LOCAL> por tu IP
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            responseType: "arraybuffer", // recibir audio
          }
        );

        const blob = new Blob([response.data], { type: "audio/mpeg" });
        const uri = URL.createObjectURL(blob);

        // Reproducir audio
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
        await newSound.playAsync();
      } catch (error) {
        console.log(error)

      }

      // Convertir a blob y URI para expo-av

    } catch (error) {
      console.error(error);
      Alert.alert("Error al reproducir audio");
    } finally {
      setLoading(false);
    }
  };

  // Limpiar sonido al salir
  React.useEffect(() => {
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
