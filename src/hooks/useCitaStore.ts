import { create } from "zustand";

export interface CitasData {

    hospital_id: number;
    fecha_hora: Date | null,
    motivo_consulta: string[];
    tipoCita: number | null;
}

interface CitaStore {
    formData: CitasData;
    updateFormData: (data: Partial<CitasData>) => void;
    resetForm: () => void;
}

const initialData: CitasData = {
  
    hospital_id: 1,
    fecha_hora: null,
    motivo_consulta: [],
    tipoCita:null
}

export const useCitaStore = create<CitaStore>((set) => ({
    formData: initialData,
    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data }
        })),
    resetForm: () => set({ formData: initialData })
}))