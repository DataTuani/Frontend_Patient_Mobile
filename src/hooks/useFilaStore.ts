import { create } from 'zustand';
import { useAuthStore } from './authStore';
import api from '../api/api';

interface Fila {
  posicion: number;
  personasDelante: number;
  totalEnFila: number;
  turnoPaciente: {
    id: number;
    numero_turno: number;
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
  fetchFila: (citaId: number) => Promise<void>;
}

export const useFilaStore = create<FilaState>((set) => ({
  fila: null,
  loading: false,
  error: null,

  fetchFila: async (citaId: number) => {
    try {
      set({ loading: true, error: null });
      const { token } = useAuthStore.getState();

      if (!citaId) throw new Error('ID de cita inválido');

      const res = await api.get(`/api/fila/${citaId}`, {
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
