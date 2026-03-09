import 'server-only';
import {cacheLife, cacheTag} from 'next/cache';
import {Article, listArticles, getArticle as getArticleFromApi} from '@/lib/api/client';

export type FeaturedArticle = Pick<
  Article,
  | 'id'
  | 'slug'
  | 'title'
  | 'excerpt'
  | 'image'
  | 'category'
  | 'publishedAt'
>;

export async function getFeaturedArticles(): Promise<Array<FeaturedArticle>> {
  'use cache';
  cacheLife('featured-articles');
  cacheTag('featured-articles');

  const { data } = await listArticles({
    query: {
      featured: 'true',
      limit: 6
    }
  });

  return data?.data?.map(({ id, slug, title, excerpt, image, category, publishedAt }) => ({
    id,
    slug,
    title,
    excerpt,
    image,
    category,
    publishedAt
  })) ?? [];
}

export async function getArticle(idOrSlug: string): Promise<Article | null> {
  'use cache';
  cacheLife('article');
  cacheTag(`article-${idOrSlug}`);

  const { data } = await getArticleFromApi({
    path: {
      id: idOrSlug
    }
  });

  return data?.data ?? null;
}
