
import { loginService, registerService } from "../api/authService";
import { useAuthStore } from '../hooks/authStore';
import { RegisterData } from "../hooks/useRegisterStore";


export const loginController = async (correo: string, contraseña: string) => {
    try {
        const response = await loginService(correo, contraseña);
        const { usuario, token } = response.data;

        useAuthStore.getState().setUser({
            id: usuario.id,
            correo: usuario.correo,
            contraseña: usuario.contraseña ?? "",
            paciente_id: usuario.Paciente?.id ?? null,
        },
            token
        );
        console.log("Usuario guardado: ", useAuthStore.getState().user);
        console.log("Token guardado: ", useAuthStore.getState().token);

        return { success: true, data: response.data }
    } catch (error: any) {
        return { success: false, message: 'Error en el login' }
    }
}

export const registerController = async (data: RegisterData) => {
    try {
        const nombres = data.nombreCompleto.trim().split(' ');

        const primer_nombre = nombres[0] || '';
        const segundo_nombre = nombres.length > 2 ? nombres[1] : '';
        const primer_apellido = nombres.length >= 2 ? nombres[nombres.length - 2] : '';
        const segundo_apellido = nombres.length >= 3 ? nombres[nombres.length - 1] : '';

        console.log('Payload enviado al registerService:', data);

        const response = await registerService(
            data.correo,
            data.password,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            data.cedula,
            data.fecha_nacimiento!,
            data.telefono,
            data.genero,
            data.direccion,
            data.rol_id,
            data.grupo_sanguineo,
            data.enfermedades_cronicas,
            data.alergias
        );

        const { usuario, token } = response.data;

        useAuthStore.getState().setUser(
            {
                id: usuario.id,
                correo: usuario.correo,
                contraseña: usuario.contraseña ?? '',
                paciente_id: usuario.Paciente?.ud ?? null
            }, token
        );

        console.log('Axios response completo: ', response);
        console.log("response.data:", response.data);
        console.log("response:", response);

        return { success: true, data: response.data }
    } catch (error: any) {

        if (error.response) {
            // Error HTTP del backend
            console.log('Error HTTP:', error.response.data);
        } else {
            console.log('Error desconocido:', error.message);
        }
        return { success: false, message: 'Error en el registro' };
    }
}