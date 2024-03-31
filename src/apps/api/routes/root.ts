import { Value } from '@sinclair/typebox/value';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  eventBriteSchema,
  eventBriteService
} from '../../../services/eventbrite/index.js';

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
    const payload = Value.Clean(
      eventBriteSchema.EventBriteWebhookSchema,
      request.body
    );

    const valid = Value.Check(
      eventBriteSchema.EventBriteWebhookSchema,
      payload
    );

    if (!valid) {
      reply.code(400);
      return { message: 'Invalid payload' };
    }

    eventBriteService.publishOrder(payload);
    return { message: 'ok' };
  });

  fastify.get('/status', async (request, reply) => {
    return { status: 'ok' };
  });
}
