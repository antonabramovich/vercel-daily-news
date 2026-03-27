import {ArticleCard} from '@/components/shared/article-card/article-card';
import {ArticleCardGrid} from '@/components/shared/article-card/article-card-grid';
import {getTrendingArticles} from '@/lib/data-access/articles';

export interface TrendingArticlesListProps {
  exclude: string[];
}

export async function TrendingArticlesList({ exclude }: TrendingArticlesListProps) {
  const trendingArticles = await getTrendingArticles(exclude);

  if (!trendingArticles.length) {
    return <div className={'text-muted-foreground'}>No trending articles at the moment. Check back soon!</div>;
  }

  return (
    <ArticleCardGrid>
      {trendingArticles.map(({ id, ...rest }) => (
        <ArticleCard key={id} article={rest} />
      ))}
    </ArticleCardGrid>
  )
}
