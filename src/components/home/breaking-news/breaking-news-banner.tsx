import {getBreakingNews} from '@/lib/data-access/breaking-news';
import {TriangleAlert} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import Link from 'next/link';

export async function BreakingNewsBanner() {
  const breakingNewsBanner = await getBreakingNews();

  if (!breakingNewsBanner) {
    return null;
  }

  const { headline, slug } = breakingNewsBanner;

  return (
    <div className={'absolute top-[65px] left-0 right-0 py-2 px-4 bg-foreground text-background border-b'}>
      <div className={'mx-auto max-w-4xl flex gap-4 items-center whitespace-nowrap'}>
        <TriangleAlert />
        <Badge>Breaking</Badge>
        <Link href={`/articles/${slug}`} className={'hover:underline overflow-hidden text-ellipsis'}>{headline}</Link>
      </div>
    </div>
  );
}
