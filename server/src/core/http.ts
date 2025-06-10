import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import { loginHandler } from '../controllers/auth.ts';
import { PORT } from '../env.ts';

export async function startHTTP(server: FastifyInstance) {
  await server.register(cors, {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  server.get('/', async (_req, reply) => {
    return reply.send('Server is running!');
  });

  server.post('/login', loginHandler);

  server.listen({ port: PORT }, (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log(`🚀 Server running at ${address}`);
  });
}
