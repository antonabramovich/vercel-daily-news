import type { CreateClientConfig } from './client/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  headers: {
    'x-vercel-protection-bypass': process.env.VERCEL_PROTECTION_BYPASS_TOKEN,
  }
});
