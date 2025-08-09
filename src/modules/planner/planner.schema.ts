import { z } from "zod";

export const planejamentoSchema = z.object({
  nomePlanejamento: z.string(),
  idadeAposentadoria: z.number(),
  versao: z.number(),
  idPlanejamento: z.string(),
  dataPlanejamento: z.date(),
  clienteId: z.string(),
});

export const createPlanejamentoSchema = z.object({
  clientId: z.string(),
  nomePlanejamento: z.string(),
  idadeAposentadoria: z.number(),
  versao: z.number(),
});
