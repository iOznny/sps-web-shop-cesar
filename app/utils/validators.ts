import { z } from "zod";

const validators = {
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Correo inválido"),
  password: z
    .string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[@$!%*?&]/, "Debe contener al menos un carácter especial (@$!%*?&)")
}

export const authRegisterValidator = z.object({
  username: validators.username,
  email: validators.email,
  password: validators.password
});

export const authLoginValidator = z.object({
  username: validators.username,
  password: validators.password
});