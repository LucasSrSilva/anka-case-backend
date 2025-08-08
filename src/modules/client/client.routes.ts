import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { clientService } from './client.services';
import {
  clientSchema,
  clientUpdateSchema,
  clientIdParamsSchema,
  clientEmailParamsSchema,
  clientProfileParamsSchema,
  clientSearchQuerySchema,
  errorResponseSchema,
  clientResponseSchema,
  clientCreateResponseSchema, // Nova importação
} from './client.schema';

export async function clientRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/clients',
    schema: {
      body: clientSchema,
      response: {
        201: clientCreateResponseSchema, 
        400: errorResponseSchema,
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
        reply.code(400).send({
          error: 'Erro ao criar cliente',
          message: error.message,
        });
      }
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/clients',
    schema: {
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
          error: 'Erro ao buscar clientes',
          message: error.message,
        });
      }
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/clients/:id',
    schema: {
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
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/clients/email/:email',
    schema: {
      params: clientEmailParamsSchema,
      response: {
        200: clientResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const client = await clientService.getClientByEmail(request.params.email);
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
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PUT',
    url: '/clients/:id',
    schema: {
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

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/clients/:id',
    schema: {
      params: clientIdParamsSchema,
      response: {
        200: clientResponseSchema,
        404: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const client = await clientService.deleteClient(request.params.id);
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
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/clients/status/active',
    schema: {
      response: {
        200: clientResponseSchema.array(),
        500: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const clients = await clientService.getActiveClients();
        reply.send(clients);
      } catch (error: any) {
        reply.code(500).send({
          error: 'Erro ao buscar clientes ativos',
          message: error.message,
        });
      }
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/clients/profile/:perfil',
    schema: {
      params: clientProfileParamsSchema,
      response: {
        200: clientResponseSchema.array(),
        500: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const clients = await clientService.getClientsByProfile(request.params.perfil);
        reply.send(clients);
      } catch (error: any) {
        reply.code(500).send({
          error: 'Erro ao buscar clientes por perfil',
          message: error.message,
        });
      }
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/clients/search',
    schema: {
      querystring: clientSearchQuerySchema,
      response: {
        200: clientResponseSchema.array(),
        400: errorResponseSchema,
        500: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const clients = await clientService.searchClientsByName(request.query.nome);
        reply.send(clients);
      } catch (error: any) {
        reply.code(500).send({
          error: 'Erro ao buscar clientes por nome',
          message: error.message,
        });
      }
    },
  });
}