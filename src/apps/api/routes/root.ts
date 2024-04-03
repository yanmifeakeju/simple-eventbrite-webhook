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

const { Clean, Check } = Value;

export default async function rootRoute(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.post('/eventbrite', async (request, reply) => {
    const payload = Clean(
      eventBriteSchema.EventBriteWebhookSchema,
      request.body
    );

    const valid = Check(eventBriteSchema.EventBriteWebhookSchema, payload);

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
