import { create } from "zustand";
import { useAuthStore } from "./authStore";
import api from "../api/api";

export interface CitasData {

    hospital_id: number | null;
    fecha_hora: Date | null,
    motivo_consulta: string;
    tipoCita: number | null;
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
    tipoCita: null
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