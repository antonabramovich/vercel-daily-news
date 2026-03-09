import {Suspense} from 'react';
import {TrendingArticlesList, TrendingArticlesListProps} from '@/components/article/trending-articles/trending-articles-list';
import {TrendingArticlesListSkeleton} from "@/components/article/trending-articles/trending-articles-list-skeleton";

export type TrendingArticlesProps = TrendingArticlesListProps;

export function TrendingArticles({ exclude }: TrendingArticlesProps) {
  return (
    <div className={'flex flex-col gap-4'}>
      <h4 className={'text-3xl font-medium'}>Trending articles</h4>
      <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
        <Suspense fallback={<TrendingArticlesListSkeleton />}>
          <TrendingArticlesList exclude={exclude}/>
        </Suspense>
      </div>
    </div>
  );
}
