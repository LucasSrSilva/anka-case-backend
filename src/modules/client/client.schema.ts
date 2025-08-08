import z from "zod";
import PrismaClient from "@prisma/client";

export const clientSchema = z.object({
  nome: z.string().max(32),
  email: z.email(),
  idade: z.number().int().min(0).max(120),
  status: z.enum(PrismaClient.Status).default(PrismaClient.Status.ativo),
  perfil: z.enum(PrismaClient.Perfil),
});

export const clientIdParamsSchema = z.object({
  id: z.uuid(),
});

export const clientEmailParamsSchema = z.object({
  email: z.email(),
});

export const clientProfileParamsSchema = z.object({
  perfil: z.enum(PrismaClient.Perfil),
});

export const clientSearchQuerySchema = z.object({
  nome: z.string().min(1),
});

export const clientUpdateSchema = clientSchema.partial();

export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
});

export const successResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const clientResponseSchema = clientSchema.extend({
  id: z.uuid(),
});

export const clientCreateResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: clientResponseSchema,
});