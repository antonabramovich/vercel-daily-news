import {Suspense} from 'react';
import {BreakingNewsBanner} from './breaking-news-banner';
import {BreakingNewsBannerSkeleton} from './breaking-news-banner-skeleton';

export function BreakingNews() {
  return (
    <Suspense fallback={<BreakingNewsBannerSkeleton />}>
      <BreakingNewsBanner />
    </Suspense>
  );
}
