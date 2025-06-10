import Fastify from 'fastify';
import { startHTTP } from './core/http.ts';
import { startSocket } from './core/socket.ts';

const fastifyInstance = Fastify({ logger: true });

await startHTTP(fastifyInstance);
startSocket(fastifyInstance.server);
