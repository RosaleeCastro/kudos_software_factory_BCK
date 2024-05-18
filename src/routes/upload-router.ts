// aqui hay que usar el midedlewear de autenticacion y autorizacion para el usuario Admin para subir archivos tipo csv
import express from "express";
import { authenticateHandler } from "../midlewears/authenticate";
import { authorize } from "../midlewears/authorize";


const uploadRouter = express.Router();


uploadRouter.post("/upload", authenticateHandler, authorize("admin"), (_req, res) => {
    res.json({ok: true, message: "Bienvenido querido administrador"})
})



export default uploadRouter;