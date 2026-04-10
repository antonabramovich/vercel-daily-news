import Link from 'next/link';
import {TriangleAlert} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {getBreakingNews} from '@/lib/data-access/breaking-news';
import {BreakingNewsBannerSkeleton} from './breaking-news-banner-skeleton';

export async function BreakingNewsBanner() {
  const breakingNews = await getBreakingNews();

  if (!breakingNews) {
    return <BreakingNewsBannerSkeleton />;
  }

  const { headline, slug } = breakingNews;

  return (
    <div className={'absolute top-[65px] left-0 right-0 py-2 px-4 bg-foreground text-background border-b'}>
      <Link href={`/articles/${slug}`} className={'mx-auto max-w-4xl flex gap-4 items-center whitespace-nowrap hover:underline'}>
        <TriangleAlert className={'shrink-0 size-4 xs:size-6'} />
        <Badge>Breaking</Badge>
        <span className={'overflow-hidden text-ellipsis'}>{headline}</span>
      </Link>
    </div>
  );
}
