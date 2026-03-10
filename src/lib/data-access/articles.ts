import 'server-only';
import {cacheLife, cacheTag} from 'next/cache';
import {connection} from 'next/server';
import {Article, listArticles, getArticle as getArticleFromApi, getTrendingArticles as getTrendingArticlesFromApi} from '@/lib/api/client';

export type ArticleCard = Pick<
  Article,
  | 'id'
  | 'slug'
  | 'title'
  | 'excerpt'
  | 'image'
  | 'category'
  | 'publishedAt'
>;

export async function getArticles(options?: Parameters<typeof listArticles>[0]): Promise<ArticleCard[]> {
  const { data } = await listArticles(options);

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

export async function getFeaturedArticles(): Promise<ArticleCard[]> {
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

export async function getTrendingArticles(exclude: string[]): Promise<ArticleCard[]> {
  await connection();
  const { data } = await getTrendingArticlesFromApi({
    query: {
      exclude: exclude.join(',')
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
