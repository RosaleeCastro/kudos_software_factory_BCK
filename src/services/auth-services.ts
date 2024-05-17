import bcrypt from "bcrypt";
import { User, UserParams } from "../models/user";
import * as userDb from "../data/index";
import { ApiError } from "../midlewears/errors";


// aqui vamos a tomar lo que envia el cliente y validarlo con ayuda de la fx getUserByEmail
export async function validateCredentianls({ email, password }: UserParams):Promise<User> {
    const user = await userDb.getUserByEmail(email);
    const isValid = await bcrypt.compare(password, user?.password || "");

    if(!user || !isValid) {
        throw new ApiError("Credenciales inválidas", 401);
    }
    return user;
}
