import { z } from "zod";

export const loginSchema = z.object({
    user: z.string().min(3, "Usuário deve ter pelo menos 3 caracteres"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;