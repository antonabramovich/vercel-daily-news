import {ArticleCardSkeleton} from '@/components/shared/article-card/article-card-skeleton';
import {ArticleCardGrid} from '@/components/shared/article-card/article-card-grid';

export function SearchResultsListSkeleton() {
  return (
    <ArticleCardGrid>
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
    </ArticleCardGrid>
  )
}
