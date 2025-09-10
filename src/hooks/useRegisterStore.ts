import { create } from 'zustand';
//manejo de estado global usando zustand

export interface RegisterData {
    nombreCompleto: string;
    genero: string;
    fecha_nacimiento: Date | null;
    correo: string;
    password: string;
    cedula: string;
    telefono: string;
    direccion: string;
    rol_id: number;
    grupo_sanguineo: string;
    enfermedades_cronicas: string[];
    alergias: string[];
}

interface RegisterStore {
    formData: RegisterData;
    updateFormData: (data: Partial<RegisterData>) => void;
    resetForm: () => void;
}

const initialData: RegisterData = {
    nombreCompleto: '',
    genero: '',
    fecha_nacimiento: null,
    correo: '',
    password: '',
    cedula: '',
    telefono: '',
    direccion: '',
    rol_id: 1,
    grupo_sanguineo: '',
    enfermedades_cronicas: [],
    alergias: []
};

export const useRegisterStore = create<RegisterStore>((set) => ({
    formData: initialData,
    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data }
        })),
    resetForm: () => set({ formData: initialData })
}))