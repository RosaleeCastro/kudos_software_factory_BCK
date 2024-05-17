import express from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../midlewears/errors";


const jwSecret = "mindset";



const upLoadRouter = express.Router();


upLoadRouter.post("/upload", (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1] || "";
         let userId;

         try {
            
         } catch (error) {
            next(new ApiError("No autorizado", 400))
         }
    
        
    });










export default upLoadRouter