import { create } from 'zustand';
import { useAuthStore } from './authStore';
import api from '../api/api';

interface Fila {
  posicion: number;
  personasDelante: number;
  totalEnFila: number;
  turnoActual: {
    id: number;
    numero_turno: number;
    paciente_id: number;
    hospital: { nombre: string };
    medico: {
      usuario: { primer_nombre: string; primer_apellido: string };
      especialidad: { nombre: string };
    };
  };

  hospital: { nombre: string };
  medico: {
    usuario: { primer_nombre: string; primer_apellido: string };
    especialidad: { nombre: string };
  };
}

interface FilaState {
  fila: Fila | null;
  loading: boolean;
  error: string | null;
  fetchFila: () => Promise<void>;
}

export const useFilaStore = create<FilaState>((set) => ({
  fila: null,
  loading: false,
  error: null,

  fetchFila: async () => {
    try {
      set({ loading: true, error: null });
      const { user, token } = useAuthStore.getState();

      if (!user?.paciente_id) throw new Error('No tiene fila');

      const res = await api.get(
        `/api/filas/${user.paciente_id}`, {
        headers: {
          'x-token': token
        }
      });

      set({ fila: res.data.data, loading: false });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.message ||
          err.message ||
          'Error al obtener la fila',
        loading: false
      });
    }
  }
}));
