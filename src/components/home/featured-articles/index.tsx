import {Suspense} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {FeaturedArticlesList} from '@/components/home/featured-articles/featured-articles-list';
import {FeaturedArticlesListSkeleton} from '@/components/home/featured-articles/featured-articles-list-skeleton';

export async function FeaturedArticles() {
  return (
    <div className={'flex flex-col gap-4'}>
      <div>
        <h2 className={'text-2xl font-bold'}>Featured</h2>
        <div className={'flex items-center justify-between gap-2'}>
          <span className={'text-muted-foreground'}>Handpicked articles from the team</span>
          <Button variant={'link'} className={'text-sm p-0'} asChild>
            <Link href={'/search'}>View all</Link>
          </Button>
        </div>
      </div>
      <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
        <Suspense fallback={<FeaturedArticlesListSkeleton />}>
          <FeaturedArticlesList />
        </Suspense>
      </div>
    </div>
  );
}
