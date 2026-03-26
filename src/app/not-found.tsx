import Link from 'next/link';
import {Metadata} from 'next';
import {ArrowRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {NotFoundImage} from '@/components/shared/not-found-image';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFoundPage() {
  return (
    <div className={'flex flex-col items-center gap-4 mt-8 md:mt-16 text-center'}>
      <NotFoundImage alt={'Page not found'} />
      <h1 className={'text-2xl md:text-4xl font-bold'}>Page not found</h1>
      <p className={'text-lg text-muted-foreground'}>Sorry, we couldn't find the page you're looking for.</p>
      <div className={'mt-12'}>
        <Button size={'lg'} variant={'link'} className={'text-lg'} asChild>
          <Link href={'/'}>Return Home <ArrowRight /></Link>
        </Button>
      </div>
    </div>
  );
}
