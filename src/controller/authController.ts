import { loginService } from "../api/authService";


export const loginController = async (correo: string, contraseña: string) => {
    try {
        const response = await loginService(correo, contraseña );
        return { success: true, data: response.data }
    } catch (error: any) {
        return { success: false, message: 'Error en el login' }
    }
}