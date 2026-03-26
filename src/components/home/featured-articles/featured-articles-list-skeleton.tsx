import {ArticleCardGrid} from '@/components/shared/article-card/article-card-grid';
import {ArticleCardSkeleton} from '@/components/shared/article-card/article-card-skeleton';

export function FeaturedArticlesListSkeleton() {
  return (
    <ArticleCardGrid>
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
    </ArticleCardGrid>
  );
}
