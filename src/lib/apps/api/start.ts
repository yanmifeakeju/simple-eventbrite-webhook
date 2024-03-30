import { buildServer } from './build.js';

const app = await buildServer({ logger: true });

app.listen({ host: '0.0.0.0', port: 3000 });
