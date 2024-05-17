import express from "express";
import { validateCredentianls } from "../services/auth-services";

const authRouter= express.Router();

authRouter.get("/", (_req, res) => {
    res.send("Hola mundo ROSALEE !!!")
})

authRouter.post("/login", (req, _res) => {
//valida las credenciales, para ello usa la fx 
// recibe la peticion
try {
    const user = validateCredentianls(req.body);

    
} catch (error) {
    
}
// hace la validacion con zod 
// genera el token
// responde
})














export default authRouter;



//La función validateCredentials devuelve un usuario si las credenciales son válidas, de lo contrario, arroja un error. No se considera un middleware porque no actúa como un paso intermedio en el flujo de la solicitud, sino que es una función de validación de credenciales independiente que se utiliza en el enrutador de autenticación para verificar las credenciales de inicio de sesión.