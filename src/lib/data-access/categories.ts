import 'server-only';
import {cacheLife, cacheTag} from 'next/cache';
import {Category, listCategories} from '@/lib/api/client';

export async function getCategories(): Promise<Category[]> {
  'use cache';
  cacheLife('categories');
  cacheTag('categories');

  const { data } = await listCategories();

  return data?.data ?? [];
}
