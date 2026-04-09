'use client';

import Link from 'next/link';
import {RotateCw, Search, ServerCrash} from 'lucide-react';
import {Button} from '@/components/ui/button';

export default function ArticleErrorPage({ error, unstable_retry }: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <div className={'flex flex-col justify-center gap-8 text-center h-[calc(100svh-166px)]'}>
      <div className={'mx-auto'}>
        <ServerCrash className={'w-12 h-12 text-red-400'} />
      </div>

      <h1 className={'text-2xl'}>Error happened while fetching article</h1>

      <div>
        {error?.message && (
          <div>Message: {error.message}</div>
        )}

        {error?.digest && (
          <div>Digest: {error.digest}</div>
        )}
      </div>

      <div className={'flex items-center justify-center gap-4'}>
        <Button onClick={unstable_retry}>
          <RotateCw />
          Try again
        </Button>
        <Button variant={'ghost'} asChild>
          <Link href={'/search'}>
            <Search />
            Browse articles
          </Link>
        </Button>
      </div>
    </div>
  );
}
