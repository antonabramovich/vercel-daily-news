import Link from 'next/link';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {ArticleContent} from '@/components/article/article-content';
import {TrendingArticles} from '@/components/article/trending-articles';
import {Separator} from '@/components/ui/separator';
import {getArticle} from '@/lib/data-access/articles';
import {formatDate, humanizeCategory} from '@/lib/utils';
import {getSearchLink} from '@/lib/search-params/search';

export default async function ArticlePage({ params }: PageProps<'/articles/[slug]'>) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return notFound();
  }

  return (
    <div className={'flex flex-col gap-6 md:gap-8 mt-4 md:mt-8'}>
      <div className={'mx-auto'}>
        <Link
          prefetch={false}
          href={getSearchLink({ category: article.category })}
          className={'text-sm uppercase hover:underline text-muted-foreground'}>
          {humanizeCategory(article.category!)}
        </Link>
      </div>
      <div className={'max-w-2xl mx-auto'}>
        <h1 className={'text-3xl md:text-5xl font-medium text-center'}>{article.title}</h1>
      </div>
      <div className={'mx-auto flex items-center gap-2 text-sm text-muted-foreground'}>
        <span>{article.author?.name}</span>
        <span>&middot;</span>
        <span>{formatDate(article.publishedAt!)}</span>
      </div>
      <div className={'mx-auto'}>
        <Image
          priority
          src={article.image!}
          alt={`${article.title}'s article image`}
          width={500}
          height={200}
        />
      </div>
      <ArticleContent blocks={article.content!} />
      <Separator />
      <TrendingArticles exclude={[article.id!]} />
    </div>
  );
}
