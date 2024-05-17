import express from "express";
import { validateCredentianls } from "../services/auth-services";

const authRouter= express.Router();

authRouter.get("/", (_req, res) => {
    res.send("Hola mundo ROSALEE !!!")
})

authRouter.post("/login", async(req, res) => {
try {
    //paso #1 validacion del usuario
    const user = await validateCredentianls(req.body);
    // encontramos el id del usuario y lo asignamos a una session atravez del middlewear de expreess-session
    req.session.userId = user.id;
    res.json({ok: true, message: "Login exitoso"})
} catch (error) {
    res.status(401).json({ok: false, message: "Credenciales inválidas"})
}

})














export default authRouter;



//La función validateCredentials devuelve un usuario si las credenciales son válidas, de lo contrario, arroja un error. No se considera un middleware porque no actúa como un paso intermedio en el flujo de la solicitud, sino que es una función de validación de credenciales independiente que se utiliza en el enrutador de autenticación para verificar las credenciales de inicio de sesión.