import { z } from 'zod';
import { clientSchema } from './client.schema';

export type Client = z.infer<typeof clientSchema>;

export type ClientResponse = {
  id: string;
  nome: string;
  email: string;
  idade: number;
  status: 'ativo' | 'inativo';
  perfil: 'Solteiro' | 'Com_Filho' | 'Com_Dependente';
  metas?: any[];
  carteira?: any;
  seguros?: any[];
  simulacoes?: any[];
  movimentacoes?: any[];
};

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

export type GetClientsByProfileParams = {
  perfil: 'Solteiro' | 'Com_Filho' | 'Com_Dependente';
};

export type SearchClientsByNameQuery = {
  nome: string;
};