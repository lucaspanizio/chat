import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((val) => Number(val.trim())),

  ENABLED_LOGGER: z
    .string()
    .default('false')
    .transform((val) => val.trim().toLowerCase() === 'true'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Erro ao validar variáveis de ambiente:', parsed.error.format());
  process.exit(1);
}

export const { PORT, ENABLED_LOGGER } = parsed.data;
