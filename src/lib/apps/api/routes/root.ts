import { FastifyInstance, FastifyPluginOptions } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    example: string;
  }
}

export default async function rootRoute(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.post('/eventbrite', async (request, reply) => {
    return { data: request.body };
  });

  fastify.get('/status', async (request, reply) => {
    return { status: 'ok' };
  });
}
