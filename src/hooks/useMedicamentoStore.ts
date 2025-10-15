import api from "../api/api";
import { create } from "zustand";
import { useAuthStore } from "./authStore";

export interface Medicamentos {

    id: number;
    consulta_id: number;
    nombre: string;
    dosis: string;
    frecuencia: string;
    duracion: string;
    instrucciones: string;
}

interface MedicamentosState {
    medicamentos: Medicamentos[];
    loading: boolean;
    error: string | null;
    fetchMedicamentos: () => Promise<void>;
}

export const useMedicamentoStore = create<MedicamentosState>((set) => ({
    medicamentos: [],
    loading: false,
    error: null,
    fetchMedicamentos: async () => {
        try {
            set({ loading: true, error: null }); 

            const { user, token } = useAuthStore.getState();

            if (!user?.paciente_id) throw new Error("No tiene medicamentos");

            const res = await api.get(
                `/api/user/medicamentos?user_id=${user.paciente_id}`, {
                    headers: {
                        "x-token": token
                    }
                }
                );
            set({ medicamentos: res.data.medicamentos, loading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || error.message || 'Error al cargar los medicamentos',
                loading: false
            })
        }
    }
}));