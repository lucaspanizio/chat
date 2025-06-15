import { FastifyRequest, FastifyReply } from 'fastify';
import { USERS, validateCredentials } from '../services/auth.ts';
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

  const user = validateCredentials(username, password);

  if (!user) {
    return reply.status(401).send({ success: false, message: 'Usuário ou senha inválidos' });
  }

  return reply.send({
    success: true,
    token: generateToken({ username }),
    user: {
      name: user.name,
      username: user.username,
    },
  });
}
