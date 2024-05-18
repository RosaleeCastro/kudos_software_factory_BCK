import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string({
      required_error: "Email es requerido",
      invalid_type_error: "Email debe ser un string",
    })
    .email({
      message: "Email no es un email válido",
    }),
  password: z
    .string({
      required_error: "Password es requerido",
      invalid_type_error: "Password debe ser un string",
    })
    .min(6, "Password debe tener al menos 6 caracteres"),
    role: z
    .enum(["admin", "user"], {
      invalid_type_error: "Role debe ser un string",
    })
    .default("user"),

});

export type UserParams = z.infer<typeof userSchema>;

export type User = UserParams & { id: number, name: string, age: number };