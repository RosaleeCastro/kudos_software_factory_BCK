import express from "express";
import  jwt from "jsonwebtoken";
import { validateCredentianls } from "../services/auth-services";

const jwSecret = "mindset";
const authRouter= express.Router();


authRouter.get("/", (_req, res) => {
  res.send("Auth Router BY ROSALEE CASTRO")
})

authRouter.post("/login", async(req, res, next) => {
try {
  console.log('cuerpo de la petición', req.body)
    //paso #1 validacion del usuario
    const user = await validateCredentianls(req.body);
    // encontramos el id del usuario y lo asignamos a una session atravez del middlewear de expreess-session
    // ya no vamos a manejar por sesiones 
    //req.session.userId = user.id;
    //Ahora lo vamos a manejar por jwt
    const payload = { userId: user.id, userRole: user.role };
    const token = jwt.sign(payload, jwSecret, {expiresIn: "5min"})// no olvidar el tiempo de expiración
    res.json({ok: true, message: "Login exitoso", data: {token}})
} catch (error) {
    next(error)
}

})


/*authRouter.post("/logout", (req, res, next) => {
    req.session.destroy((error) => {
      if (error) {
        next(error);
      } else {
        res.clearCookie("connect.sid");
        res.json({ ok: true, message: "Logout exitoso" });
      }
    });
  });
*/
















export default authRouter;



//La función validateCredentials devuelve un usuario si las credenciales son válidas, de lo contrario, arroja un error. No se considera un middleware porque no actúa como un paso intermedio en el flujo de la solicitud, sino que es una función de validación de credenciales independiente que se utiliza en el enrutador de autenticación para verificar las credenciales de inicio de sesión.