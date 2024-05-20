"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_services_1 = require("../services/auth-services");
const jwSecret = "mindset";
const authRouter = express_1.default.Router();
authRouter.post("/login", async (req, res, next) => {
    try {
        console.log('cuerpo de la petición', req.body);
        //paso #1 validacion del usuario
        const user = await (0, auth_services_1.validateCredentianls)(req.body);
        // encontramos el id del usuario y lo asignamos a una session atravez del middlewear de expreess-session
        // ya no vamos a manejar por sesiones 
        //req.session.userId = user.id;
        //Ahora lo vamos a manejar por jwt
        const payload = { userId: user.id, userRole: user.role };
        const token = jsonwebtoken_1.default.sign(payload, jwSecret, { expiresIn: "5min" }); // no olvidar el tiempo de expiración
        res.json({ ok: true, message: "Login exitoso", data: { token } });
    }
    catch (error) {
        next(error);
    }
});
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
exports.default = authRouter;
//La función validateCredentials devuelve un usuario si las credenciales son válidas, de lo contrario, arroja un error. No se considera un middleware porque no actúa como un paso intermedio en el flujo de la solicitud, sino que es una función de validación de credenciales independiente que se utiliza en el enrutador de autenticación para verificar las credenciales de inicio de sesión.
