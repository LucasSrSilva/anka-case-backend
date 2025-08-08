import { PrismaClient } from '@prisma/client';
import { clientSchema } from './client.schema';
import { z } from 'zod';

const prisma = new PrismaClient();

export type ClientCreateInput = z.infer<typeof clientSchema>;
export type ClientUpdateInput = Partial<ClientCreateInput>;

export class ClientService {
  async createClient(data: ClientCreateInput) {
    const validatedData = clientSchema.parse(data);
    
    return await prisma.cliente.create({
      data: validatedData,
    });
  }

  async getAllClients() {
    return await prisma.cliente.findMany({
      include: {
        metas: true,
        carteira: true,
        seguros: true,
        simulacoes: true,
        movimentacoes: true,
      },
    });
  }

  async getClientById(id: string) {
    const client = await prisma.cliente.findUnique({
      where: { id },
      include: {
        metas: true,
        carteira: true,
        seguros: true,
        simulacoes: true,
        movimentacoes: true,
      },
    });

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    return client;
  }

  async getClientByEmail(email: string) {
    const client = await prisma.cliente.findUnique({
      where: { email },
      include: {
        metas: true,
        carteira: true,
        seguros: true,
        simulacoes: true,
        movimentacoes: true,
      },
    });

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    return client;
  }

  async updateClient(id: string, data: ClientUpdateInput) {
    await this.getClientById(id);

    const validatedData = clientSchema.partial().parse(data);

    return await prisma.cliente.update({
      where: { id },
      data: validatedData,
      include: {
        metas: true,
        carteira: true,
        seguros: true,
        simulacoes: true,
        movimentacoes: true,
      },
    });
  }

  async deleteClient(id: string) {
    await this.getClientById(id);

    return await prisma.cliente.delete({
      where: { id },
    });
  }

  async getActiveClients() {
    return await prisma.cliente.findMany({
      where: {
        status: 'ativo',
      },
      include: {
        metas: true,
        carteira: true,
        seguros: true,
        simulacoes: true,
        movimentacoes: true,
      },
    });
  }

  async getClientsByProfile(perfil: 'Solteiro' | 'Com_Filho' | 'Com_Dependente') {
    return await prisma.cliente.findMany({
      where: {
        perfil,
      },
      include: {
        metas: true,
        carteira: true,
        seguros: true,
        simulacoes: true,
        movimentacoes: true,
      },
    });
  }

  async searchClientsByName(nome: string) {
    return await prisma.cliente.findMany({
      where: {
        nome: {
          contains: nome,
          mode: 'insensitive',
        },
      },
      include: {
        metas: true,
        carteira: true,
        seguros: true,
        simulacoes: true,
        movimentacoes: true,
      },
    });
  }
}

export const clientService = new ClientService();