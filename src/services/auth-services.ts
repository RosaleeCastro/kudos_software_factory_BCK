import bcrypt from "bcrypt";
import { User, UserParams } from "../models/user";
import * as userDb from "../data/index";
import { ApiError } from "../midlewears/errors";


// aqui vamos a tomar lo que envia el cliente y validarlo con ayuda de la fx getUserByEmail
export async function validateCredentianls(credentials: UserParams):Promise<User> {
    const {email, password} = credentials;
    const user = await userDb.getUserByEmail(email);//verificacion de existencia email y lo guard
    const isValid = await bcrypt.compare(password, user?.password || "");

    if(!user || !isValid) {
        throw new ApiError("Credenciales inválidas", 400);
    }
    return user;
}
