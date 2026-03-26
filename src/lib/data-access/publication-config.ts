import 'server-only';
import {cacheLife, cacheTag} from 'next/cache';
import {getPublicationConfig as getPublicationConfigFromApi} from '@/lib/api/client';

export async function getPublicationConfig(): Promise<NonNullable<Awaited<ReturnType<typeof getPublicationConfigFromApi>>['data']>['data']> {
  'use cache';
  cacheLife('max');
  cacheTag('publication-config');

  const { data } = await getPublicationConfigFromApi();

  return data?.data;
}
