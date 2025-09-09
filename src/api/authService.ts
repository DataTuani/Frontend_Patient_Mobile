import api from './api';

export const loginService = (correo: string, contraseña: string) => {
    return api.post('/api/auth/login', {
        correo,
        contraseña
    })
}

