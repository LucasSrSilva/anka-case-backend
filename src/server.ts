import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { clientRoutes } from './modules/client/client.routes';
import fastifyCors from '@fastify/cors';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {origin: '*'})
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'anka-case-api',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})
app.register(fastifySwaggerUI, {
  routePrefix: '/docs'
})
app.register(clientRoutes)
app.listen({port: 3333}).then(() => {
  console.log('Server running on http://localhost:3333');
})