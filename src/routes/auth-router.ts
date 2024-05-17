import express from "express";



const authRouter= express.Router();

authRouter.get("/", (_req, res) => {
    res.send("Hola mundo ROSALEE !!!")
})

authRouter.post("/login", (_req, _res) => {
// recibe la peticion
// hace la validacion con zod 
// genera el token
// responde
})














export default authRouter;