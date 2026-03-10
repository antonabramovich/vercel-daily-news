import Image from 'next/image';
import Link from 'next/link';
import {formatDate, humanizeCategory} from '@/lib/utils';
import {getSearchLink} from '@/lib/search-params/search';
import type {ArticleCard} from '@/lib/data-access/articles';

interface ArticleCardProps {
  article: Omit<ArticleCard, 'id'>;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { slug, title, excerpt, image, category, publishedAt } = article;

  return (
    <div className={'flex flex-col gap-2 w-full'}>
      <Image
        src={image!}
        alt={`${title}'s article image`}
        width={256}
        height={134}
        className={'w-full'}
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
        <Link href={`/articles/${slug}`} className={'hover:underline'}>{title}</Link>
      </h3>
      <p className={'line-clamp-2 text-muted-foreground'}>{excerpt}</p>
    </div>
  )
}
