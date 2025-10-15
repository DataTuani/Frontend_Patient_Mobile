// SphereParticlesWithMic.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, Dimensions, Platform, PermissionsAndroid, Alert } from "react-native";
import { Canvas, Circle } from "@shopify/react-native-skia";
import AudioRecord from "react-native-audio-record";
import { Buffer } from "buffer";

const { width, height } = Dimensions.get("window");
const CENTER_X = width / 2;
const CENTER_Y = height / 2;
const RADIUS = Math.min(width, height) * 0.27;
const PARTICLE_COUNT = 450; // ajustar por rendimiento
const BASE_DEGS_PER_SECOND = 10; // rotación global de la esfera (deg/s)
const AUDIO_INFLUENCE_MULT = 6.0; // cuánto influye el audio en el spin

type Particle = {
  id: number;
  theta: number; // polar
  phi: number; // azimutal base
  rFactor: number; // variación radial
  spinAngle: number; // ángulo de giro individual (rad)
  spinSpeedBase: number; // velocidad base (rad/s)
  spinRadius: number; // radio de giro local
};

async function requestAudioPermissionAndroid() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    {
      title: "Permiso de micrófono",
      message: "Necesitamos acceso al micrófono para animar las partículas.",
      buttonPositive: "Ok",
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

export default function SphereParticlesWithMic() {
  // ref para rotación global (grados)
  const globalRotationRef = useRef(0);
  // audio level (0..1)
  const audioLevelRef = useRef(0);
  // tick para forzar re-render
  const [, setTick] = useState(0);

  // particles se generan solo una vez
  const particles = useMemo<Particle[]>(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // distribución uniforme en esfera
      const u = Math.random();
      const v = Math.random();
      const theta = Math.acos(2 * u - 1);
      const phi = 2 * Math.PI * v;
      const rFactor = 0.82 + Math.random() * 0.36;
      const spinAngle = Math.random() * Math.PI * 2;
      const spinSpeedBase = 0.2 + Math.random() * 1.2; // rad/s
      const spinRadius = 2 + Math.random() * 8; // px
      arr.push({
        id: i,
        theta,
        phi,
        rFactor,
        spinAngle,
        spinSpeedBase,
        spinRadius,
      });
    }
    return arr;
  }, []);

  // set up microphone capture
  useEffect(() => {
    let isMounted = true;

    async function initAudio() {
      if (Platform.OS === "android") {
        const ok = await requestAudioPermissionAndroid();
        if (!ok) {
          Alert.alert("Sin permiso", "No se concedió permiso al micrófono.");
          return;
        }
      }

      const options = {
        sampleRate: 16000,
        channels: 1,
        bitsPerSample: 16,
        audioSource: 6,
        bufferSize: 2048,
        wavFile: "recording.wav", // <-- obligatorio según la definición de tipos
      };
      AudioRecord.init(options);

      // data: chunk en base64 (PCM16 LE)
      AudioRecord.on("data", (data: string) => {
        if (!isMounted) return;
        try {
          const pcm = Buffer.from(data, "base64");
          // calcular RMS
          let sum = 0;
          const viewLen = Math.floor(pcm.length / 2);
          for (let i = 0; i < viewLen; i++) {
            const val = pcm.readInt16LE(i * 2); // signed 16-bit
            sum += val * val;
          }
          const rms = Math.sqrt(sum / Math.max(1, viewLen));
          // normalizar: 0..1 (32768 es max int16)
          let level = rms / 32768;
          if (!isFinite(level) || isNaN(level)) level = 0;
          // suavizar con un pequeño low-pass
          audioLevelRef.current = audioLevelRef.current * 0.75 + level * 0.25;
        } catch (e) {
          // si falla el decodificado, ignorar
        }
      });

      AudioRecord.start();
    }

    initAudio();

    return () => {
      isMounted = false;
      try {
        AudioRecord.stop();
      } catch (e) { }
    };
  }, []);

  // animación con requestAnimationFrame
  useEffect(() => {
    let mounted = true;
    let last = globalThis.performance.now();

    const step = (now: number) => {
      if (!mounted) return;
      const dt = (now - last) / 1000; // segundos
      last = now;

      // rotación global
      globalRotationRef.current = (globalRotationRef.current + BASE_DEGS_PER_SECOND * dt) % 360;

      // actualizamos spinAngle de cada partícula según su velocidad base + audio
      // (Usamos la referencia fuerte en particles array mutando los objetos para evitar setState)
      // NOTA: particles es inmutable desde useMemo; clonamos pequeñas vars en un map temporal
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // audio factor: cuanto influye el nivel actual (audioLevelRef.current)
        const audioFactor = audioLevelRef.current * AUDIO_INFLUENCE_MULT;
        // incremento radianes
        const dSpin = (p.spinSpeedBase + audioFactor) * dt;
        p.spinAngle = (p.spinAngle + dSpin) % (Math.PI * 2);
      }

      // Forzamos render
      setTick((t) => (t + 1) & 0xffffffff);

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);

    return () => {
      mounted = false;
    };
  }, [particles]);

  // helpers vectoriales:
  const normalize = (x: number, y: number, z: number) => {
    const L = Math.sqrt(x * x + y * y + z * z) || 1;
    return [x / L, y / L, z / L];
  };

  const cross = (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => {
    return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
  };

  // render
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {particles.map((p) => {
          // aplicamos rotación global sobre phi
          const phiRot = p.phi + (globalRotationRef.current * Math.PI) / 180;

          // posición 3D de la partícula (en esfera con rFactor)
          const nx = Math.sin(p.theta) * Math.cos(phiRot);
          const ny = Math.sin(p.theta) * Math.sin(phiRot);
          const nz = Math.cos(p.theta);

          // escala radial
          const x3 = RADIUS * p.rFactor * nx;
          const y3 = RADIUS * p.rFactor * ny;
          const z3 = RADIUS * p.rFactor * nz;

          // generamos dos vectores tangenciales para el spin local
          // tomar un vector "up" que no sea paralela a n
          let upx = 0,
            upy = 1,
            upz = 0;
          if (Math.abs(nx * upx + ny * upy + nz * upz) > 0.99) {
            // casi paralelo, escoger otro up
            upx = 1;
            upy = 0;
            upz = 0;
          }
          const tx = cross(nx, ny, nz, upx, upy, upz);
          const [txn, tyn, tzn] = normalize(tx[0], tx[1], tx[2]);
          const bx = cross(nx, ny, nz, txn, tyn, tzn); // second tangent
          const [bxn, byn, bzn] = normalize(bx[0], bx[1], bx[2]);

          // Giro local de la partícula alrededor de (x3,y3,z3) en el plano tangente
          const localR = p.spinRadius; // px
          const lx = Math.cos(p.spinAngle) * txn + Math.sin(p.spinAngle) * bxn;
          const ly = Math.cos(p.spinAngle) * tyn + Math.sin(p.spinAngle) * byn;
          const lz = Math.cos(p.spinAngle) * tzn + Math.sin(p.spinAngle) * bzn;

          // offset en 3D -> convertir a px
          const ox = lx * localR;
          const oy = ly * localR;
          // z-offset no la usamos para posicion 2D, pero sí para escala
          const oz = lz * localR;

          // posición 2D final
          const cx = CENTER_X + x3 + ox;
          const cy = CENTER_Y + y3 + oy;

          // profundidad para escala/opacidad
          const zDepth = z3 + oz; // entre -R..R
          const minScale = 0.35;
          const maxScale = 1.25;
          const scale = ((zDepth + RADIUS) / (2 * RADIUS)) * (maxScale - minScale) + minScale;

          const radius = Math.max(0.6, 1.8 * scale);
          const alpha = 0.08 + (scale - minScale) / (maxScale - minScale) * 0.9;
          const color = `rgba(173,216,230,${Math.max(0.05, Math.min(1, alpha))})`;

          return <Circle key={p.id} cx={cx} cy={cy} r={radius} color={color} />;
        })}
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  canvas: { flex: 1 },
});
