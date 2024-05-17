import  { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { ApiError } from "../midlewears/errors";
import { getUserById } from "../data";

const jwSecret = "mindset";



export const authorizeAdmin = async (req:Request, _res:Response, next:NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    let userId;

    if (!token) {
        return next(new ApiError("No autorizado", 401));
    };

    try {
        const payload = jwt.verify(token, jwSecret) as { 
            userId: number;
            iat: number;
            exp: number; 
        };
        userId= payload.userId
        const user = await getUserById(userId);
        if (!user || user.role !== "admin") {
            return next(new ApiError("No autorizado", 403));
        }

        next();
    } catch (error) {
        return next(new ApiError("No autorizado", 401));
    }
};