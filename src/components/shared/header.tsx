import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export function Header() {
  return (
    <header className={'sticky top-0 p-4 bg-background border-b z-1'}>
      <div className={'mx-auto max-w-4xl flex items-center gap-2 sm:gap-8'}>
        <div className={'font-bold flex gap-2 items-center'}>
          <Image
            src={'/vercel.svg'}
            alt={'Vercel Daily Logo'}
            width={16}
            height={16}
          />
          <span className={'hidden xs:inline'}>Vercel Daily</span>
        </div>
        <Button variant={'link'} className={'text-sm ml-auto sm:ml-[unset]'} asChild>
          <Link href={'/'}>Home</Link>
        </Button>
        <Button variant={'link'} className={'text-sm'} asChild>
          <Link href={'/search'}>Search</Link>
        </Button>
      </div>
    </header>
  );
}
