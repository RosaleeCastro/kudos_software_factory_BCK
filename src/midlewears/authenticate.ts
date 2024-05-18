import { NextFunction, Request, Response } from "express";
import { ApiError } from "./errors";
import jwt from "jsonwebtoken";


// Extensión del objeto Request 
declare global{
    namespace Express {
        interface Request {
            userId?: number;
            userRole?: string;
        }
    }
}

const jwSecret = "mindset";
export function authenticateHandler(
    req: Request, 
    _res: Response, 
    next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return next(new ApiError("No autorizado", 401))
    }
    try {
        const payload = jwt.verify(token, jwSecret) as {
            userId:number;
            userRole: string;
            iat: number;
            exp: number;
        };
        //estas propiedades no existen en el request de express,las incluimos con una declaración de tipo global
        req.userId = payload.userId;
        req.userRole = payload.userRole;
        next();
    }  
     catch (error) {
        return next(new ApiError("No autorizado", 401))
}   
}