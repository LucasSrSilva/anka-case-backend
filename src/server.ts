import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { z } from 'zod/v4';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  jsonSchemaTransform,
  createJsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { clientRoutes } from './modules/client/client.routes';

const app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'SampleApi',
      description: 'Sample backend service',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,

  // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
  //
  // transform: createJsonSchemaTransform({
  //   skipList: [ '/documentation/static/*' ]
  // })
});

app.register(fastifySwaggerUI, {
  routePrefix: '/documentation',
});

const LOGIN_SCHEMA = z.object({
  username: z.string().max(32).describe('Some description for username'),
  password: z.string().max(32),
});

app.after(() => {
  clientRoutes(app);
});


async function run() {
  await app.ready();

  await app.listen({
    port: 4949,
  });

  console.log(`Documentation running at http://localhost:4949/documentation`);
}

run();