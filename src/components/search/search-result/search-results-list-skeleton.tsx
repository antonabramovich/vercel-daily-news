import {ArticleCardSkeleton} from '@/components/shared/article-card/article-card-skeleton';

export function SearchResultsListSkeleton() {
  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
    </div>
  )
}
