import z from "zod";
import PrismaClient from "@prisma/client";
import { planejamentoSchema } from "../planner/planner.schema";

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
  id: z.string(),
  planejamentos: z.array(planejamentoSchema).optional(),
});

export const clientCreateResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: clientResponseSchema,
});