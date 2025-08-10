import { PrismaClient } from "@prisma/client";
import { planejamentoSchema } from "./planner.schema";
import { CreatePlanejamento } from "./planner.types";

const prisma = new PrismaClient();

export class PlanejamentoService {
    async createPlanejamento(data: CreatePlanejamento) {
        const validatedData = planejamentoSchema.parse(data);

        const { clienteId, ...rest } = validatedData;
        const prismaData = {
            ...rest,
            dataPlanejamento: new Date(),
            cliente: { connect: { id: clienteId } }
        };

        return await prisma.planejamento.create({
            data: prismaData
        });
    }
}