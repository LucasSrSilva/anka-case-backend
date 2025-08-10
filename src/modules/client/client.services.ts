import { PrismaClient } from '@prisma/client';
import { clientSchema } from './client.schema';
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
        carteira: true,
        seguros: true,
  planejamentos: true,
        movimentacoes: true
      },
    });
  }

  async getClientById(id: string) {
    const client = await prisma.cliente.findUnique({
      where: { id },
      include: {
        carteira: true,
        seguros: true,
  planejamentos: true,
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
        carteira: true,
        seguros: true,
  planejamentos: true,
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

  async getDashBoard() {
    const clients = await this.getAllClients();
    const totalClients = clients.length;
  const clientsWithPlanner = clients.filter(client => client.planejamentos.length > 0).length;
    const clientsWithPlannerPercentual = (clientsWithPlanner / totalClients) * 100;

    const perfilMap: Record<string, { total: number; comSeguro: number }> = {};
    clients.forEach(client => {
      const perfil = client.perfil;
      if (!perfilMap[perfil]) {
        perfilMap[perfil] = { total: 0, comSeguro: 0 };
      }
      perfilMap[perfil].total += 1;
      if (client.seguros.length > 0) {
        perfilMap[perfil].comSeguro += 1;
      }
    });

    const percentualByprofile: Record<string, number> = {};
    Object.entries(perfilMap).forEach(([perfil, data]) => {
      percentualByprofile[perfil] = data.total > 0 ? (data.comSeguro / data.total) * 100 : 0;
    });

    return {
      totalClients,
      clientsWithPlannerPercentual,
      percentualByprofile,
    };
  }
}

export const clientService = new ClientService();