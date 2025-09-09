import { date } from "yup";
import { loginService, registerService } from "../api/authService";


export const loginController = async (correo: string, contraseña: string) => {
    try {
        const response = await loginService(correo, contraseña);
        return { success: true, data: response.data }
    } catch (error: any) {
        return { success: false, message: 'Error en el login' }
    }
}

export const registerController = async (
    correo: string,
    password: string,
    primer_nombre: string,
    segundo_nombre: string,
    primer_apellido: string,
    segundo_apellido: string,
    cedula: string,
    fecha_nacimiento: Date,
    telefono: string,
    genero: string,
    direccion: string,
    grupo_sanguineo: string,
    enfermedades_cronicas: string,
    alergias: string
) => {
    try {
        const response = await registerService(
            correo,
            password,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            cedula,
            fecha_nacimiento,
            telefono,
            genero,
            direccion,
            grupo_sanguineo,
            enfermedades_cronicas,
            alergias
        );
        return { success: true, data: response.data }
    } catch (error: any) {
        return { success: false, message: 'Error en el registro' }
    }
}