import Link from 'next/link';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {ArrowRight} from 'lucide-react';

export default function ArticleNotFoundPage() {
  return (
    <div className={'flex flex-col items-center gap-4 mt-8 md:mt-16 text-center'}>
      <Image
        priority
        src={'/article-not-found.png'}
        alt={'Article not found illustration'}
        width={82}
        height={149}
      />
      <h1 className={'text-2xl md:text-4xl font-bold'}>Article not found</h1>
      <p className={'text-lg text-muted-foreground'}>Sorry, we couldn't find the article you're looking for.</p>
      <div className={'mt-12'}>
        <Button size={'lg'} variant={'link'} asChild>
          <Link href={'/search'}>Browse available articles <ArrowRight /></Link>
        </Button>
      </div>
    </div>
  );
}
