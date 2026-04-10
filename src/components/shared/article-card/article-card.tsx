import Image from 'next/image';
import {formatDate, humanizeCategory} from '@/lib/utils';
import {getSearchLink} from '@/lib/search-params/search';
import type {ArticleMetaDto} from '@/lib/data-access/articles';
import {HoverPrefetchLink} from '@/components/shared/hover-prefetch-link';
import {BLUR_DATA_URL} from '@/lib/constants';

interface ArticleCardProps {
  article: Omit<ArticleMetaDto, 'id'>;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { slug, title, excerpt, image, category, publishedAt } = article;

  return (
    <div className={'flex flex-col gap-2 w-full'}>
      <Image
        src={image!}
        alt={title!}
        width={414}
        height={216}
        sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className={'w-full aspect-video object-cover'}
      />
      <div className={'flex items-center gap-2 text-sm text-muted-foreground'}>
        <HoverPrefetchLink
          href={getSearchLink({ category })}
          className={'uppercase hover:underline'}>
          {humanizeCategory(category!)}
        </HoverPrefetchLink>
        <span>&middot;</span>
        <span>{formatDate(publishedAt!)}</span>
      </div>
      <h3 className={'text-lg text-primary font-semibold'}>
        <HoverPrefetchLink
          href={`/articles/${slug}`}
          className={'hover:underline'}>
          {title}
        </HoverPrefetchLink>
      </h3>
      <p className={'line-clamp-2 text-muted-foreground'}>{excerpt}</p>
    </div>
  )
}
