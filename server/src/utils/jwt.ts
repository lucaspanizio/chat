import jwt from 'jsonwebtoken';

const JWT_SECRET = '?kkry_envelopad@!';

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}
