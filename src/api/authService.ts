import api from './api';

export const loginService = (correo: string, contraseña: string) => {
    return api.post('/api/auth/login', {
        correo,
        contraseña
    })
}

export const registerService = (
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
    rol_id: number,
    grupo_sanguineo: string,
    enfermedades_cronicas: string[],
    alergias: string[]
) => {

    return api.post('/api/auth/register', {
        correo,
        password,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        cedula,
        fecha_nacimiento: fecha_nacimiento ? fecha_nacimiento.toISOString().split('T')[0]
            : null,
        telefono,
        genero,
        direccion,
        rol_id,
        grupo_sanguineo,
        enfermedades_cronicas,
        alergias
    }) 

}

