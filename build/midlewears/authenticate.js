"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateHandler = void 0;
const errors_1 = require("./errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwSecret = "mindset";
function authenticateHandler(req, _res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new errors_1.ApiError("No autorizado", 401));
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, jwSecret);
        //estas propiedades no existen en el request de express,las incluimos con una declaración de tipo global
        req.userId = payload.userId;
        req.userRole = payload.userRole;
        next();
    }
    catch (error) {
        return next(new errors_1.ApiError("No autorizado", 401));
    }
}
exports.authenticateHandler = authenticateHandler;
