import 'server-only';
import {cacheLife, cacheTag} from 'next/cache';
import {Category, listCategories} from '@/lib/api/client';

type CategoryDto = Pick<
  Category,
  | 'name'
  | 'slug'
>;

export async function getCategories(): Promise<CategoryDto[]> {
  'use cache';
  cacheLife('categories');
  cacheTag('categories');

  const { data } = await listCategories();

  return data?.data?.map(({ name, slug }) => ({
    name,
    slug
  })) ?? [];
}
