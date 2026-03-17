import {Suspense} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {SubscriptionBadge} from './subscription-badge';
import {SubscriptionBadgeSkeleton} from './subscription-badge-skeleton';

export function Header() {
  return (
    <header className={'sticky top-0 p-4 bg-background border-b z-1'}>
      <div className={'mx-auto max-w-4xl flex items-center gap-2 xs:gap-8'}>
        <div className={'font-bold flex gap-2 items-center'}>
          <Image
            src={'/vercel.svg'}
            alt={'Vercel Daily News logo'}
            width={16}
            height={16}
          />
          <span className={'hidden xs:inline'}>Vercel Daily</span>
        </div>
        <Button variant={'link'} className={'text-sm'} asChild>
          <Link href={'/'}>Home</Link>
        </Button>
        <Button variant={'link'} className={'text-sm'} asChild>
          <Link href={'/search'}>Search</Link>
        </Button>
        <div className={'ml-auto'}>
          <Suspense fallback={<SubscriptionBadgeSkeleton />}>
            <SubscriptionBadge />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
