import { create } from "zustand";
import {persist} from 'zustand/middleware';

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