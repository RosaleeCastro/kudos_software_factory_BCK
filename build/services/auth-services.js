"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentianls = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDb = __importStar(require("../data/index"));
const errors_1 = require("../midlewears/errors");
// aqui vamos a tomar lo que envia el cliente y validarlo con ayuda de la fx getUserByEmail
async function validateCredentianls(credentials) {
    const { email, password } = credentials;
    const user = await userDb.getUserByEmail(email); //verificacion de existencia email y lo guard
    // Si el usuario no existe, lanza un error inmediatamente
    // Log de depuración para verificar los valores
    console.log('Usuario encontrado:', user);
    console.log('Password proporcionada:', password);
    if (!user) {
        throw new errors_1.ApiError("Credenciales inválidas", 400);
    }
    const isValid = await bcrypt_1.default.compare(password, user?.password || "");
    // Log de depuración para verificar el resultado de la comparación
    console.log('Contraseña válida:', isValid);
    if (!isValid) {
        throw new errors_1.ApiError("Credenciales inválidas", 400);
    }
    return user;
}
exports.validateCredentianls = validateCredentianls;
