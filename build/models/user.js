"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email es requerido",
        invalid_type_error: "Email debe ser un string",
    })
        .email({
        message: "Email no es un email válido",
    }),
    password: zod_1.z
        .string({
        required_error: "Password es requerido",
        invalid_type_error: "Password debe ser un string",
    })
        .min(6, "Password debe tener al menos 6 caracteres"),
    role: zod_1.z
        .enum(["admin", "user"], {
        errorMap: () => ({ message: "El rol debe ser admin o user" }),
    })
        .default("user"),
});
