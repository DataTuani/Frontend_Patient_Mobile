import api from '../api/api';
import { create } from 'zustand';
import { useAuthStore } from './authStore';

export interface Resultados {
    id: number;
    cita_id: number;
    tipo_examen: string;
    created_at: Date;
    instrucciones: string;
    resultado_url: string;
    estado: {nombre: string};
}

interface ResultadoState {
    resultados: Resultados[];
    loading: boolean;
    error: string | null;
    fetchResultados: () => Promise<void>;
}

export const useResultadosStore = create<ResultadoState>((set) => ({
    resultados: [],
    loading: false,
    error: null,
    fetchResultados: async () => {
        try {
            set({ loading: true, error: null });

            const { user, token } = useAuthStore.getState();

            if (!user?.paciente_id) throw new Error("No tiene resultados");

            const res = await api.get(
                `/api/ordenesLab?paciente_id=${user.paciente_id}`,
                {
                    headers: {
                        "x-token": token
                    }
                }
            );
            set({ resultados: res.data.ordenes, loading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || error.message || 'Error al cargar los resultados',
                loading: false
            })
        }
    }
}));