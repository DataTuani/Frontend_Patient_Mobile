import { create } from "zustand";
import api from "../api/api";


interface User {
    id: number;
    correo: string;
    contraseña: string;
    paciente_id: number | null;
};

interface AuthState {
    user: User | null;
    token: string | null;
    setUser: (user: User, token: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    setUser: (user, token) => set({ user, token }),
    logout: () => set({ user: null, token: null })
}));


type Usuario = {

    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    fecha_nacimiento?: string;
    genero?: string;
    telefono?: string;
};

type Alergia = {
    descripcion: string;
};

type Enfermedad = {
    descripcion: string;
};

type Paciente = {

    usuario: Usuario;
    grupo_sanguineo?: string;
    alergias?: Alergia[];
    enfermedades?: Enfermedad[];
};

export type Expediente = {
    id: number;
    folio: string;
    paciente: Paciente;

};

interface ExpedienteState {
    expediente: Expediente | null;
    loading: boolean;
    error: string | null;
    fetchExpediente: () => Promise<void>;
}

export const useExpedienteStore = create<ExpedienteState>((set) => ({
    expediente: null,
    loading: false,
    error: null,

    fetchExpediente: async () => {
        set({ loading: true, error: null });
        try {
            const { user, token } = useAuthStore.getState();
            if (!user?.paciente_id) throw new Error("No se encontró el paciente");

            const res = await api.get(`api/expediente/${user.paciente_id}`, {
                headers: { "x-token": token },
            });

            console.log("Expediente recibido:", res.data);

            // Ajusta según la respuesta real de tu backend
            let payload = res.data?.expediente ?? res.data?.Expediente ?? res.data;
            set({ expediente: payload as Expediente });
        } catch (err: any) {
            set({
                error:
                    err?.response?.data?.message ??
                    err.message ??
                    "Error al obtener la información del paciente",
            });
        } finally {
            set({ loading: false });
        }
    },
}));
