
import { loginService, registerService } from "../api/authService";
import { RegisterData } from "../hooks/useRegisterStore";


export const loginController = async (correo: string, contraseña: string) => {
    try {
        const response = await loginService(correo, contraseña);
        return { success: true, data: response.data }
    } catch (error: any) {
        return { success: false, message: 'Error en el login' }
    }
}

export const registerController = async (data: RegisterData) => {
    try {
        const nombres = data.nombreCompleto.trim().split(' ');

        const primer_nombre = nombres[0] || '';
        const segundo_nombre = nombres.length > 3 ? nombres.slice(1, nombres.length - 2).join(' ') : nombres[1] || '';
        const primer_apellido = nombres.length > 2 ? nombres[nombres.length - 2] : '';
        const segundo_apellido = nombres.length > 3 ? nombres[nombres.length - 1] : '';

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
        return { success: true, data: response.data }
    } catch (error: any) {
        return { success: false, message: 'Error en el registro' }
    }
}