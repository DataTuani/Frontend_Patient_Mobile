import api from './api';

export const citaService = (paciente_id: number, hospital_id: number,
    fecha_hora: Date, motivo_consulta: string[], tipoCita: number
) => {
    return api.post('/api/citas/', {
        paciente_id,
        hospital_id,
        fecha_hora,
        motivo_consulta,
        tipoCita
    });
};