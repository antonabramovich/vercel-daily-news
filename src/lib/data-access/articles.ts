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

export type ArticleMetaDto = Pick<
  Article,
  | 'id'
  | 'slug'
  | 'title'
  | 'excerpt'
  | 'author'
  | 'image'
  | 'category'
  | 'publishedAt'
  | 'tags'
>;

export async function getArticles(options?: Parameters<typeof listArticles>[0]): Promise<ArticleMetaDto[]> {
  'use cache';
  cacheLife('search-results');
  cacheTag('search-results');

  const { data } = await listArticles(options);

  return data?.data?.map(toArticleMetaDto) ?? [];
}

export async function getFeaturedArticles(): Promise<ArticleMetaDto[]> {
  'use cache';
  cacheLife('featured-articles');
  cacheTag('featured-articles');

  const { data } = await listArticles({
    query: {
      featured: 'true',
      limit: 6
    }
  });

  return data?.data?.map(toArticleMetaDto) ?? [];
}

export async function getTrendingArticles(exclude: string[]): Promise<ArticleMetaDto[]> {
  const { data } = await getTrendingArticlesFromApi({
    query: {
      exclude: exclude.join(',')
    }
  });

  return data?.data?.map(toArticleMetaDto) ?? [];
}

export async function getArticleMeta(slug: string): Promise<ArticleMetaDto | null> {
  const article = await getArticle(slug);

  if (!article) {
    return null;
  }

  return toArticleMetaDto(article);
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

async function getArticle(slug: string): Promise<Article | null> {
  'use cache';
  cacheLife('article');
  cacheTag(`article-${slug}`);

  const {data} = await getArticleFromApi({
    path: {
      id: slug
    }
  });

  return data?.data ?? null;
}

function toArticleMetaDto(article: Article): ArticleMetaDto {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    author: article.author,
    excerpt: article.excerpt,
    image: article.image,
    category: article.category,
    publishedAt: article.publishedAt,
    tags: article.tags
  };
}
