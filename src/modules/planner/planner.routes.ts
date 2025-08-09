import { PlanejamentoService } from "./planner.services";
import { FastifyTypedInstance } from "../../types";
import { createPlanejamentoSchema, planejamentoSchema } from "./planner.schema";

const planejamentoService = new PlanejamentoService();

export async function PlannerRoutes(app: FastifyTypedInstance){
    app.post('/planner', {
        schema: {
            tags: ['planner'],
            body: createPlanejamentoSchema,
        },
        handler: async (request, reply) => {
            const result = await planejamentoService.createPlanejamento(request.body);
            reply.send(result);
        }
    });
}