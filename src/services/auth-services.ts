import bcrypt from "bcrypt";
import { User, UserParams } from "../models/user";
import * as userDb from "../data/index";
import { ApiError } from "../midlewears/errors";


// aqui vamos a tomar lo que envia el cliente y validarlo con ayuda de la fx getUserByEmail
export async function validateCredentianls(credentials: UserParams):Promise<User> {
    const {email, password} = credentials;
    const user = await userDb.getUserByEmail(email);//verificacion de existencia email y lo guard
    // Si el usuario no existe, lanza un error inmediatamente
    // Log de depuración para verificar los valores
   
   
    if (!user) {
        throw new ApiError("Credenciales inválidas", 400);
    }
    const isValid = await bcrypt.compare(password, user?.password || "");
    // Log de depuración para verificar el resultado de la comparación
    console.log('Contraseña válida:', isValid);

    if( !isValid) {
        throw new ApiError("Credenciales inválidas", 400);
    }
    return user;
}
