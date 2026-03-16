import 'server-only';
import {cacheLife, cacheTag} from 'next/cache';
import {
  Article,
  ContentBlock,
  listArticles,
  getArticle as getArticleFromApi,
  getTrendingArticles as getTrendingArticlesFromApi
} from '@/lib/api/client';
import {getSubscriptionStatus} from '@/lib/data-access/subscription';

export type ArticleDto = Pick<
  Article,
  | 'id'
  | 'slug'
  | 'title'
  | 'author'
  | 'content'
  | 'image'
  | 'category'
  | 'publishedAt'
>;

export type ArticleCardDto = Pick<
  Article,
  | 'id'
  | 'slug'
  | 'title'
  | 'excerpt'
  | 'image'
  | 'category'
  | 'publishedAt'
>;

export type ArticleMetaDto = Pick<
  Article,
  | 'id'
  | 'slug'
  | 'title'
  | 'author'
  | 'image'
  | 'category'
  | 'publishedAt'
>;

export async function getArticles(options?: Parameters<typeof listArticles>[0]): Promise<ArticleCardDto[]> {
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

export async function getFeaturedArticles(): Promise<ArticleCardDto[]> {
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

export async function getTrendingArticles(exclude: string[]): Promise<ArticleCardDto[]> {
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

export async function getArticleMeta(slug: string): Promise<ArticleMetaDto | null> {
  const article = await getArticle(slug);

  if (!article) {
    return null;
  }

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    author: article.author,
    image: article.image,
    category: article.category,
    publishedAt: article.publishedAt
  };
}

export async function getArticleContent(slug: string): Promise<ContentBlock[]> {
  const [
    article,
    subscriptionStatus
  ] = await Promise.all([
    getArticle(slug),
    getSubscriptionStatus()
  ]);

  let content = article?.content ?? [];
  if (subscriptionStatus === 'inactive') {
    content = content.slice(0, 2);
  }

  return content;
}

async function getArticle(slug: string): Promise<ArticleDto | null> {
  'use cache';
  cacheLife('article');
  cacheTag(`article-${slug}`);

  const {data} = await getArticleFromApi({
    path: {
      id: slug
    }
  });

  if (!data?.data) {
    return null;
  }

  return {
    id: data.data.id,
    slug: data.data.slug,
    title: data.data.title,
    author: data.data.author,
    content: data.data.content,
    image: data.data.image,
    category: data.data.category,
    publishedAt: data.data.publishedAt
  };
}
