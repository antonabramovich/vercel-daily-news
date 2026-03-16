import 'server-only';
import {cacheLife, cacheTag} from 'next/cache';
import {BreakingNews, getBreakingNews as getBreakingNewsFromApi} from '@/lib/api/client';

export type BreakingNewsDto = Pick<
  BreakingNews,
  | 'articleId'
  | 'headline'
>;

export async function getBreakingNews(): Promise<BreakingNewsDto> {
  'use cache';
  cacheLife('breaking-news');
  cacheTag('breaking-news');

  const { data } = await getBreakingNewsFromApi();

  return {
    articleId: data?.data?.articleId ?? '',
    headline: data?.data?.headline ?? ''
  };
}
