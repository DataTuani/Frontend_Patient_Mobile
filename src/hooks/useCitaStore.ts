import { create } from "zustand";

export interface CitasData {

    paciente_id: number;
    hospital_id: number;
    fecha_hora: Date | null,
    motivo_consulta: string[];
}

interface CitaStore {
    formData: CitasData;
    updateFormData: (data: Partial<CitasData>) => void;
    resetForm: () => void;
}

const initialData: CitasData = {
    paciente_id: 1,
    hospital_id: 1,
    fecha_hora: null,
    motivo_consulta: []
}

export const useCitaStore = create<CitaStore>((set) => ({
    formData: initialData,
    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data }
        })),
    resetForm: () => set({ formData: initialData })
}))