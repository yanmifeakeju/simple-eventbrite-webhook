import fastify, { FastifyPluginOptions } from 'fastify';
import rootRoute from './routes/root.js';

export const buildServer = async (opts: FastifyPluginOptions = {}) => {
  const app = fastify(opts);

  app.register(rootRoute);

  return app;
};
