import Image from 'next/image';
import Link from 'next/link';
import {Search} from 'lucide-react';
import {Button} from '@/components/ui/button';

export function EmptySearchResults() {
  return (
    <div className={'flex flex-col items-center gap-4 mt-8 md:mt-16 text-center'}>
      <Image
        preload
        src={'/not-found.png'}
        alt={'Search results are empty'}
        width={82}
        height={149}
      />
      <p className={'text-lg text-muted-foreground'}>No articles found matching your search criteria.</p>
      <div className={'mt-12'}>
        <Button size={'lg'} variant={'link'} className={'text-lg'} asChild>
          <Link href={'/search'}>Browse all articles <Search /></Link>
        </Button>
      </div>
    </div>
  );
}
