
import { CitasData, useCitaStore } from '../hooks/useCitaStore'
import { citaService } from '../api/citaService'
import { useAuthStore } from '../hooks/authStore';

export const citasController = async (data: CitasData) => {
    try {
        //sacamos el id del usuario
        const { user } = useAuthStore.getState();

        const { formData } = useCitaStore.getState();

        if (!user) {
            throw new Error("No hay usuario logueado");
        }

        const response = await citaService(
            user.id,
            data.hospital_id,
            data.fecha_hora!,
            data.motivo_consulta,
            data.tipoCita
        );

        console.log(response);
        return { success: true, data: response.data }

    } catch (error: any) {
        return { success: false, message: 'Error enel sistema de citas' }
    }

}
