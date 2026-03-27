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
  cacheTag('categories');

  const { data, error } = await listCategories();

  if (error) {
    console.error('Error while listing categories:', error);
    cacheLife('seconds');
  } else {
    cacheLife('max');
  }

  return data?.data?.map(({ name, slug }) => ({
    name,
    slug
  })) ?? [];
}
