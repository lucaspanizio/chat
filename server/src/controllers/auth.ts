import { FastifyRequest, FastifyReply } from 'fastify';
import { validateCredentials } from '../services/auth.ts';
import { generateToken } from '../utils/jwt.ts';

interface LoginBody {
  username?: string;
  password?: string;
}

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  const { username, password } = request.body as LoginBody;

  if (!username || !password) {
    return reply.status(400).send({ success: false, message: 'Usuário e senha são obrigatórios' });
  }

  const isValid = validateCredentials(username, password);

  if (!isValid) {
    return reply.status(401).send({ success: false, message: 'Usuário ou senha inválidos' });
  }

  const token = generateToken({ username });
  return reply.send({ success: true, token });
}
