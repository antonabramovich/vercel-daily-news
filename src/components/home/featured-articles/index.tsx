import {Suspense} from 'react';
import {FeaturedArticlesList} from './featured-articles-list';
import {FeaturedArticlesContainer} from './featured-articles-container';
import {FeaturedArticlesListSkeleton} from './featured-articles-list-skeleton';

export function FeaturedArticles() {
  return (
    <FeaturedArticlesContainer>
      <Suspense fallback={<FeaturedArticlesListSkeleton />}>
        <FeaturedArticlesList />
      </Suspense>
    </FeaturedArticlesContainer>
  );
}
