import { z } from "zod"

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email é obrigatório'}).email('Email é inválido'),
  password: z.string({ required_error: 'Senha é obrigatória'})
})

export type LoginData = z.infer<typeof loginSchema>