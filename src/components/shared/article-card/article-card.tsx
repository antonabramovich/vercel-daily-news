import Image from 'next/image';
import Link from 'next/link';
import {formatDate, humanizeCategory} from '@/lib/utils';
import {getSearchLink} from '@/lib/search-params/search';
import type {ArticleMetaDto} from '@/lib/data-access/articles';
import {HoverPrefetchLink} from '@/components/shared/hover-prefetch-link';

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
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAQAAABN/Pf1AAAADUlEQVR42mNk4GHAAAABDgAOukGxgAAAAABJRU5ErkJggg=="
        className={'w-full aspect-video object-cover'}
      />
      <div className={'flex items-center gap-2 text-sm text-muted-foreground'}>
        <Link
          prefetch={false}
          href={getSearchLink({ category })}
          className={'uppercase hover:underline'}>
          {humanizeCategory(category!)}
        </Link>
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
