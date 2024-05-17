import express from "express";



const authRouter= express.Router();

authRouter.get("/", (_req, res) => {
    res.send("Hola mundo ROSALEE !!!")
})

authRouter.post("/login", (_req, _res) => {

})













export default authRouter;