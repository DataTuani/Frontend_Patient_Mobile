import { create } from "zustand";
import { useAuthStore } from "./authStore";
import api from "../api/api";

export interface CitasData {

    hospital_id: number | null;
    fecha_hora: Date | null,
    motivo_consulta: string;
    tipoCita: number | null;
    File?: string;
}

interface CitaStore {
    formData: CitasData;
    updateFormData: (data: Partial<CitasData>) => void;
    resetForm: () => void;
}

const initialData: CitasData = {

    hospital_id: null,
    fecha_hora: null,
    motivo_consulta: '',
    tipoCita: null,
    File: ''

}

export const useCitaStore = create<CitaStore>((set) => ({
    formData: initialData,
    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data }
        })),
    resetForm: () => set({ formData: initialData })
}))

//Obtener hospital

type Hospital = {
    id: number;
    nombre: string;
    direccion: string;
    codigo: string;
    email: string;
    telefono: string;
};

type CitaState = {
    hospitales: Hospital[];
    loading: boolean;
    error: string | null;
    fetchHospitales: () => Promise<void>;
}

export const useHospitalStore = create<CitaState>((set) => ({
    hospitales: [],
    loading: false,
    error: null,
    fetchHospitales: async () => {
        try {
            set({ loading: true, error: null });
            const token = useAuthStore.getState().token;

            const res = await api.get('/api/hospitales', {
                headers: {
                    "x-token": token,
                },
            });
            console.log(res.data);

            set({ hospitales: res.data.hospitales, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Error al cargar hospitales", loading: false });

        }
    },
}));

//Obtener Turnos

type HorarioState = {
    horario: string[];
    loading: boolean;
    error: string | null;
    fetchHorario: (hospitalId: number) => Promise<void>;
};

export const userHorarioStore = create<HorarioState>((set) => ({
    horario: [],
    loading: false,
    error: null,
    fetchHorario: async (hospitalId: number) => {
        try {
            set({ loading: true, error: null });
            const token = useAuthStore.getState().token;

            const res = await api.get(
                `/api/enfermeria/turnos-disponibles?hospital_id=${hospitalId}`, {
                headers: {
                    "x-token": token,
                },
            }
            );
            console.log(res.data);
            set({ horario: res.data.horarios, loading: false });

        } catch (err: any) {
            set({
                error: err.message || "Error al cargar horarios",
                loading: false,
            });
        }
    },
}));

//Obtener historial de citas

type Cita = {
    id: number;
    motivo_consulta: string;
    fecha_hora: string;
    hospital: { nombre: string};
    medico: { usuario: { primer_nombre: string; primer_apellido: string; especialidad: string } };
    estado: { nombre: string };

};

interface HistorialState {
    citas: Cita[];
    loading: boolean;
    error: string | null;
    fetchHistorial: () => Promise<void>;
}

export const useHistorialCitaStore = create<HistorialState>((set) => ({
    citas: [],
    loading: false,
    error: null,

    fetchHistorial: async () => {
        try {
            set({ loading: true, error: null });
            const { user, token } = useAuthStore.getState();

            if (!user?.paciente_id) throw new Error("No se encontro el paciente");

            const res = await api.get(
                `/api/citas/paciente?paciente_id=${user.paciente_id}`,
                {
                    headers: { "x-token": token }
                }
            );
            set({ citas: res.data.citas, loading: false });
        } catch (err: any) {
            set({
                error: err.res?.data?.message || err.message || "Error al obtener citas",
                loading: false
            })
        }
    },
}));