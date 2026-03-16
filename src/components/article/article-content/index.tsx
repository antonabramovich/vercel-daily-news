import {Suspense} from 'react';
import {ArticleContentBlocks, ArticleContentBlocksProps} from './article-content-blocks';
import {ArticleContentSkeleton} from './article-content-skeleton';

type ArticleContentProps = ArticleContentBlocksProps;

export function ArticleContent({ slug }: ArticleContentProps) {
  return (
    <Suspense fallback={<ArticleContentSkeleton />}>
      <ArticleContentBlocks slug={slug} />
    </Suspense>
  );
}
