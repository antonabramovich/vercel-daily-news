import 'server-only';
import {cacheLife, cacheTag} from 'next/cache';
import {BreakingNews, getArticle, getBreakingNews as getBreakingNewsFromApi} from '@/lib/api/client';

type BreakingNewsDto = Pick<
  BreakingNews,
  | 'headline'
> & {
  slug: string;
};

export async function getBreakingNews(): Promise<BreakingNewsDto | null> {
  'use cache';
  cacheTag('breaking-news');

  const { data, error: breakingNewsError } = await getBreakingNewsFromApi();

  if (breakingNewsError) {
    cacheLife('seconds');
    return null;
  }

  if (!data) {
    cacheLife('breaking-news');
    return null;
  }

  const { data: article, error: articleError } = await getArticle({
    path: {
      id: data?.data?.articleId ?? ''
    }
  });

  if (articleError) {
    cacheLife('seconds');
  } else {
    cacheLife('breaking-news');
  }

  if (!article) {
    return null;
  }

  return {
    slug: article.data?.slug ?? '',
    headline: data.data?.headline ?? ''
  };
}
