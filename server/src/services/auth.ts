import type { User } from '../models/user.ts';

export const USERS: User[] = [
  {
    createdAt: new Date('2025-06-08T19:52:15Z'),
    username: 'admin',
    name: 'Admin',
    password: '@dmin',
  },
  {
    createdAt: new Date('2025-06-08T19:52:15Z'),
    username: 'panizio',
    name: 'Panizio',
    password: 'p@nizio',
  },
  {
    createdAt: new Date('2025-06-08T17:52:59Z'),
    username: 'pedro',
    name: 'Pedro',
    password: 'p3dro',
  },
];

export function validateCredentials(username: string, password: string): boolean {
  if (!username || !password) return false;

  const user = USERS.find((user) => user.username === username);
  if (!user) return false;

  if (user.password !== password) return false;

  return true;
}
