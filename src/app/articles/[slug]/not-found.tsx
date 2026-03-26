import Link from 'next/link';
import {Metadata} from 'next';
import {ArrowRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {NotFoundImage} from '@/components/shared/not-found-image';

export const metadata: Metadata = {
  title: 'Article not found',
  description: 'The article you are looking for does not exist.',
};

export default function ArticleNotFoundPage() {
  return (
    <div className={'flex flex-col items-center gap-4 mt-8 md:mt-16 text-center'}>
      <NotFoundImage alt={'Article not found'} />
      <h1 className={'text-2xl md:text-4xl font-bold'}>Article not found</h1>
      <p className={'text-lg text-muted-foreground'}>Sorry, we couldn't find the article you're looking for.</p>
      <div className={'mt-12'}>
        <Button size={'lg'} variant={'link'} className={'text-lg'} asChild>
          <Link href={'/search'}>Browse available articles <ArrowRight /></Link>
        </Button>
      </div>
    </div>
  );
}
