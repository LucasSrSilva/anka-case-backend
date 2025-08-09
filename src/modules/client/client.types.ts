import { z } from 'zod';
import { clientSchema } from './client.schema';
import { Perfil, Planejamento, Status } from '@prisma/client';

export type Client = z.infer<typeof clientSchema>;

export type ClientResponse = {
  id: string;
  nome: string;
  email: string;
  idade: number;
  status: Status;
  perfil: Perfil;
  metas?: any[];
  carteira?: any;
  seguros?: any[];
  planejamentos?: Planejamento[];
  movimentacoes?: any[];
};

export type ClientCreateInput = z.infer<typeof clientSchema>;

export type ClientUpdateInput = Partial<ClientCreateInput>;

export type GetClientByIdParams = {
  id: string;
};

export type GetClientByEmailParams = {
  email: string;
};

export type UpdateClientParams = {
  id: string;
};

export type DeleteClientParams = {
  id: string;
};