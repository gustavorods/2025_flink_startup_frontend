import { z } from 'zod'

export const etapa1Schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  sobrenome: z.string().min(1, 'Sobrenome é obrigatório'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .refine((email) => email.includes('@'), {
      message: 'O email deve conter "@"',
    }),
});

export const etapa2Schema = z.object({
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export const etapa3Schema = z.object({
  esportes: z.array(z.string()).min(1, 'Selecione pelo menos um esporte'),
});

const socialHandle = z
  .string()
  .optional()
  .refine(val => !val || val.startsWith('@'), {
    message: 'O campo deve começar com @',
  });

export const etapa4Schema = z.object({
  instagram: socialHandle,
  x: socialHandle,
  tiktok: socialHandle,
});

export const etapa6Schema = z.object({
  username: z.string().min(3, 'Nome de usuário deve ter pelo menos 3 caracteres'),
});
