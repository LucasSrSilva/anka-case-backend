import { Meta } from "@prisma/client";

export type Planejamento = {
  idPlanejamento: string;
  nomePlanejamento: string;
  dataPlanejamento: Date;
  metas: Meta[];
  idadeAposentadoria: number;
  versao: number;
  clienteId: string;
};

export type CreatePlanejamento = {
  clientId: string;
  nomePlanejamento: string;
  idadeAposentadoria: number;
  versao: number;
};