import { PrismaClient } from '@prisma/client';
import { clientSchema } from './client.schema';
import { z } from 'zod';
import { ClientCreateInput, ClientUpdateInput } from './client.types';

const prisma = new PrismaClient();



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
}

export const clientService = new ClientService();