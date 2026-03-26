import {ArticleCardGrid} from '@/components/shared/article-card/article-card-grid';
import {ArticleCardSkeleton} from '@/components/shared/article-card/article-card-skeleton';

export function TrendingArticlesListSkeleton() {
  return (
    <ArticleCardGrid>
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
    </ArticleCardGrid>
  );
}
