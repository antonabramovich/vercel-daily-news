import type {Metadata, ResolvingMetadata} from 'next'
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {Separator} from '@/components/ui/separator';
import {ArticleContent} from '@/components/article/article-content';
import {TrendingArticles} from '@/components/article/trending-articles';
import {SubscribeCallToAction} from '@/components/article/call-to-action';
import {HoverPrefetchLink} from '@/components/shared/hover-prefetch-link';
import {getArticleMeta, getFeaturedArticles} from '@/lib/data-access/articles';
import {formatDate, humanizeCategory} from '@/lib/utils';
import {getSearchLink} from '@/lib/search-params/search';

export async function generateMetadata(
  { params }: PageProps<'/articles/[slug]'>,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const [
    article,
    parentMetadata,
  ] = await Promise.all([
    getArticleMeta(slug),
    await parent
  ]);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    category: article.category,
    keywords: article.tags?.join(', '),
    authors: { name: article.author?.name },
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url: `/${slug}`,
      title: article.title,
      description: article.excerpt,
      authors: article.author?.name ? [article.author.name] : '',
      images: [
        {
          url: article.image!,
          alt: article.title,
          width: 1200,
          height: 630,
        },
      ],
      type: 'article',
      publishedTime: article.publishedAt
    },
  };
}

export async function generateStaticParams() {
  const featuredArticles = await getFeaturedArticles();
  return featuredArticles.map(({ slug }) => ({ slug }));
}

export default async function ArticlePage({ params }: PageProps<'/articles/[slug]'>) {
  const { slug } = await params;
  const article = await getArticleMeta(slug);

  if (!article) {
    return notFound();
  }

  return (
    <div className={'flex flex-col gap-6 md:gap-8 mt-4 md:mt-8'}>
      <div className={'mx-auto'}>
        <HoverPrefetchLink
          href={getSearchLink({ category: article.category })}
          className={'text-sm uppercase hover:underline text-muted-foreground'}>
          {humanizeCategory(article.category!)}
        </HoverPrefetchLink>
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
          preload
          src={article.image!}
          alt={article.title!}
          width={640}
          height={372}
          sizes="(max-width: 48rem) 100vw, 640px"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAQAAABN/Pf1AAAADUlEQVR42mNk4GHAAAABDgAOukGxgAAAAABJRU5ErkJggg=="
          className="aspect-video object-cover"
        />
      </div>
      <ArticleContent slug={slug} />
      <SubscribeCallToAction />
      <Separator />
      <TrendingArticles exclude={[article.id!]} />
    </div>
  );
}
