import {Suspense} from 'react';
import {BreakingNewsBanner} from '@/components/home/breaking-news/breaking-news-banner';

export async function BreakingNews() {
  return (
    <Suspense fallback={null}>
      <BreakingNewsBanner />
    </Suspense>
  );
}
