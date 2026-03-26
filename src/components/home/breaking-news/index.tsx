import {Suspense} from 'react';
import {BreakingNewsBanner} from '@/components/home/breaking-news/breaking-news-banner';

export function BreakingNews() {
  return (
    <Suspense>
      <BreakingNewsBanner />
    </Suspense>
  );
}
