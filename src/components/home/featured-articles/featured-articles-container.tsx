import {PropsWithChildren} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export function FeaturedArticlesContainer({ children }: PropsWithChildren) {
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
      {children}
    </div>
  );
}
