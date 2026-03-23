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
  cacheLife('breaking-news');
  cacheTag('breaking-news');

  const { data } = await getBreakingNewsFromApi();

  if (!data) {
    return null;
  }

  const { data: article } = await getArticle({
    path: {
      id: data?.data?.articleId ?? ''
    }
  });

  if (!article) {
    return null;
  }

  return {
    slug: article?.data?.slug ?? '',
    headline: data?.data?.headline ?? ''
  };
}
