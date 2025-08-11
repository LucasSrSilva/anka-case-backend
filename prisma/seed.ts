
import { PrismaClient, Perfil, Status, TipoSeguro } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const client1 = await prisma.cliente.create({
    data: {
      nome: 'João da Silva',
      email: 'joao.silva@example.com',
      idade: 35,
      perfil: Perfil.Com_Filho,
      status: Status.ativo,
    },
  });

  const client2 = await prisma.cliente.create({
    data: {
      nome: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      idade: 28,
      perfil: Perfil.Solteiro,
      status: Status.ativo,
    },
  });

  const client3 = await prisma.cliente.create({
    data: {
      nome: 'Carlos Pereira',
      email: 'carlos.pereira@example.com',
      idade: 45,
      perfil: Perfil.Com_Dependente,
      status: Status.inativo,
    },
  });

  const client4 = await prisma.cliente.create({
    data: {
      nome: 'Ana Souza',
      email: 'ana.souza@example.com',
      idade: 30,
      perfil: Perfil.Solteiro,
      status: Status.ativo,
    },
  });

  await prisma.seguro.create({
    data: {
      tipo: TipoSeguro.vida,
      valor: 100000,
      vigencia: new Date('2025-01-01'),
      clienteId: client1.id,
    },
  });

  await prisma.seguro.create({
    data: {
      tipo: TipoSeguro.invalidez,
      valor: 50000,
      vigencia: new Date('2024-01-01'),
      clienteId: client2.id,
    },
  });

  await prisma.planejamento.create({
    data: {
      nomePlanejamento: 'Aposentadoria',
      dataPlanejamento: new Date(),
      idadeAposentadoria: 65,
      versao: 1,
      clienteId: client1.id,
    },
  });

  await prisma.planejamento.create({
    data: {
      nomePlanejamento: 'Viagem dos Sonhos',
      dataPlanejamento: new Date(),
      idadeAposentadoria: 60,
      versao: 1,
      clienteId: client3.id,
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
