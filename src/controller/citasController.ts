
import { CitasData } from '../hooks/useCitaStore'
import { citaService } from '../api/citaService'
import { useAuthStore } from '../hooks/authStore';

export const citasController = async (data: CitasData) => {
    try {
        //sacamos el id del usuario
        const { user, token } = useAuthStore.getState();

        console.log("Estado actual en citasController:", { user, token });

        if (!user) throw new Error("No hay usuario logueado");

        const response = await citaService(
            user.paciente_id ?? 0,
            data.hospital_id ?? 0, 
            data.fecha_hora!,
            data.motivo_consulta,
            data.tipoCita ?? 0 ,// provide a default value if null
            data.File ?? ''
        );

        return { success: true, data: response.data, message: 'Sistema aceptada' }

    } catch (error: any) {
        console.log('Error en peticion: ', error.response?.data || error.message);
        return {
            success: false, message: error.response?.data?.message || 'Error en el sistema de citas',

            data: error.response?.data ?? null
        }
    }
}
