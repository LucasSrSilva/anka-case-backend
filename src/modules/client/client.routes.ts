import { clientService } from './client.services';
import {
  clientSchema,
  clientUpdateSchema,
  clientIdParamsSchema,
  errorResponseSchema,
  clientResponseSchema,
  clientCreateResponseSchema,
  successResponseSchema,
} from './client.schema';
import { FastifyTypedInstance } from '../../types';

export async function clientRoutes(app: FastifyTypedInstance) {
  
  app.get('/clients', {
    schema: {
      tags: ['clients'],
      description: 'get clients',
      response: {
        200: clientResponseSchema.array(),
        500: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const clients = await clientService.getAllClients();
        reply.send(clients);
      } catch (error: any) {
        reply.code(500).send({
          error: 'Erro ao listar clientes',
          message: error.message,
        });
      }
    }
  });

  app.get('/clients/:id', {
    schema: {
      tags: ['clients'],
      description: 'Get a client by ID',
      params: clientIdParamsSchema,
      response: {
        200: clientResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const client = await clientService.getClientById(request.params.id);
        reply.send(client);
      } catch (error: any) {
        if (error.message === 'Cliente não encontrado') {
          reply.code(404).send({
            error: 'Cliente não encontrado',
            message: error.message,
          });
        } else {
          reply.code(500).send({
            error: 'Erro interno do servidor',
            message: error.message,
          });
        }
      }
    }
  });

  app.post('/clients', {
    schema: {
      tags: ['clients'],
      description: 'Create a new client',
      body: clientSchema,
      response: {
        201: clientCreateResponseSchema,
        500: errorResponseSchema,
        409: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const client = await clientService.createClient(request.body);
        reply.code(201).send({
          success: true,
          message: 'Cliente criado com sucesso',
          data: client,
        });
      } catch (error: any) {
        if (error.message?.includes('Unique')) {
          reply.code(409).send({
            error: 'Conflito ao criar cliente',
            message: 'Já existe um cliente com este email.',
          });
        } else {
          reply.code(500).send({
            error: 'Erro ao criar cliente',
            message: error.message,
          });
        }
      }
    },
  });

  app.put('/clients/:id', {
    schema: {
      tags: ['clients'],
      description: 'Update a client by ID',
      params: clientIdParamsSchema,
      body: clientUpdateSchema,
      response: {
        200: clientResponseSchema,
        400: errorResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const client = await clientService.updateClient(request.params.id, request.body);
        reply.send(client);
      } catch (error: any) {
        if (error.message === 'Cliente não encontrado') {
          reply.code(404).send({
            error: 'Cliente não encontrado',
            message: error.message,
          });
        } else if (error.name === 'ZodError') {
          reply.code(400).send({
            error: 'Dados inválidos',
            message: error.message,
          });
        } else {
          reply.code(500).send({
            error: 'Erro interno do servidor',
            message: error.message,
          });
        }
      }
    },
  });

  app.delete('/clients/:id', {
    schema: {
      tags: ['clients'],
      description: 'Delete a client by ID',
      params: clientIdParamsSchema,
      response: {
        200: successResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        await clientService.deleteClient(request.params.id);
        reply.send(successResponseSchema.parse({
          success: true,
          message: 'Cliente deletado com sucesso',
        }));
      } catch (error: any) {
        if (error.message === 'Cliente não encontrado') {
          reply.code(404).send({
            error: 'Cliente não encontrado',
            message: error.message,
          });
        } else {
          reply.code(500).send({
            error: 'Erro interno do servidor',
            message: error.message,
          });
        }
      }
    },
  });
  app.get('/clients/dashboard', {
    schema: {
      tags: ['dashboard']
    },
    handler: async (request, reply) => {
      try {
        const dashboardData = await clientService.getDashBoard();
        reply.send(dashboardData);
      } catch (error: any) {
        reply.code(500).send({
          error: 'Erro interno do servidor',
          message: error.message,
        });
      }
    }
  })
}