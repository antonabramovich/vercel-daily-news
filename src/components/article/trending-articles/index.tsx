import {Suspense} from 'react';
import {TrendingArticlesList, TrendingArticlesListProps} from '@/components/article/trending-articles/trending-articles-list';
import {TrendingArticlesListSkeleton} from '@/components/article/trending-articles/trending-articles-list-skeleton';
import {ArticleCardGrid} from '@/components/shared/article-card/article-card-grid';

export type TrendingArticlesProps = TrendingArticlesListProps;

export function TrendingArticles({ exclude }: TrendingArticlesProps) {
  return (
    <div className={'flex flex-col gap-4'}>
      <h2 className={'text-3xl font-medium'}>Trending articles</h2>
      <ArticleCardGrid>
        <Suspense fallback={<TrendingArticlesListSkeleton />}>
          <TrendingArticlesList exclude={exclude}/>
        </Suspense>
      </ArticleCardGrid>
    </div>
  );
}
