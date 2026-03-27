import 'server-only';
import z from 'zod';

const envSchema = z.object({
  API_KEY: z.string(),
  VERCEL_PROTECTION_BYPASS_TOKEN: z.string(),
  VERCEL_URL: z.string().optional(),
  VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
});

export const env = envSchema.parse({
  API_KEY: process.env.API_KEY,
  VERCEL_PROTECTION_BYPASS_TOKEN: process.env.VERCEL_PROTECTION_BYPASS_TOKEN,
  VERCEL_URL: process.env.VERCEL_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
});
