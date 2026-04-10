import {FeaturedArticlesContainer} from './featured-articles-container';
import {FeaturedArticlesListSkeleton} from './featured-articles-list-skeleton';

export function FeaturedArticlesSkeleton() {
  return (
    <FeaturedArticlesContainer>
      <FeaturedArticlesListSkeleton />
    </FeaturedArticlesContainer>
  );
}
