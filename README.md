# SINAES App - Paciente (Frontend)

Aplicación móvil desarrollada en **React Native** para la gestión de citas médicas y expedientes clínicos de pacientes.  
Este frontend consume la **API del backend de SINAES**, permitiendo a los pacientes interactuar con su información, gestionar citas, recibir notificaciones y visualizar datos de su historial médico.

---

## 🚀 Tecnologías utilizadas

- **React Native**: Framework principal para el desarrollo de la aplicación móvil.
- **TypeScript**: Tipado estático para mayor seguridad y mantenibilidad.
- **Zustand**: Librería ligera y rápida para gestión de estado global.
- **Expo** (si aplica): Para simplificar el desarrollo y testing en dispositivos móviles.
- **React Navigation**: Manejo de rutas y navegación entre pantallas.
- **Axios / Fetch API**: Consumo de la **API Backend**.
- **Styled Components / Theme**: Personalización y manejo centralizado de estilos.

---

## 📂 Estructura del proyecto

```plaintext
SINAES-APP/
├── android/               # Archivos de configuración Android
├── .expo/                 # Configuración Expo (si se usa)
├── src/
│   ├── api/               # Conexiones y peticiones al backend
│   ├── constants/         # Constantes globales (colores, variables, etc.)
│   ├── controller/        # Lógica de negocio para distintas funcionalidades
│   ├── helpers/           # Funciones reutilizables
│   ├── hooks/             # Custom hooks
│   ├── presentation/      # UI principal
│   │   ├── assets/        # Recursos como imágenes, íconos, fuentes
│   │   ├── components/    # Componentes reutilizables
│   │   │   └── shared/    # Componentes compartidos
│   │   ├── interface/     # Tipos e interfaces TypeScript
│   │   ├── routes/        # Definición de rutas y navegación
│   │   ├── screens/       # Pantallas principales de la app
│   │   └── settings/      # Configuración de usuario y app
│   │   └── theme/         # Manejo de temas de la app
│   └── ...
├── App.tsx                # Punto de entrada de la app
├── index.ts               # Configuración principal
├── package.json           # Dependencias del proyecto
└── app.json               # Configuración de la app
```

⚙️ Requerimientos técnicos

    Node.js >= 18.x

    npm o yarn

    Expo CLI (opcional, si usas Expo)

    Android Studio o Xcode (para emuladores o build nativo)

    Acceso a la API Backend (Node.js + Express + Prisma con base de datos en Supabase)



1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/tu-repositorio.git
   cd tu-repositorio
   ````

Instalar dependencias:

    npm install
     o
    yarn install

Ejecutar en modo desarrollo:

    npx expo start

    Escanear el QR con Expo Go o abrir en emulador Android/iOS.

📱 Funcionalidades principales

    Registro e inicio de sesión de pacientes.

    Visualización de expediente médico.

    Gestión de citas (crear, cancelar, consultar).

    Notificaciones de recordatorio.

    Cambio de cuenta con autenticación OTP (control parental / familiar).

    Personalización de perfil.

📌 Notas

    La app requiere conexión a internet para interactuar con el backend.

    El backend está implementado en Node.js + Express + Prisma, y la base de datos se encuentra alojada en Supabase.

    Se recomienda configurar las variables de entorno en un archivo .env (ejemplo: URL del backend).

## Author

- [@Melanie Arias](https://github.com/ArisEspino)

