import { useAuthStore } from '../hooks/authStore';
import api from './api';

export const citaService = (paciente_id: number, hospital_id: number,
    fecha_hora: Date, motivo_consulta: string, tipoCita: number, File: string
) => {

    const { token } = useAuthStore.getState();

    console.log("Token en citaService: ", token);
    return api.post("/api/citas/", {
        paciente_id,
        hospital_id,
        fecha_hora, 
        motivo_consulta,
        tipoCita,
        File
    }, {
        headers: {
            "x-token": token,
        },
    });
};
