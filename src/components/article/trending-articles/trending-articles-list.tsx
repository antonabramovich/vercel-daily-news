import {ArticleCard} from '@/components/shared/article-card/article-card';
import {getTrendingArticles} from '@/lib/data-access/articles';

export interface TrendingArticlesListProps {
  exclude: string[];
}

export async function TrendingArticlesList({ exclude }: TrendingArticlesListProps) {
  const trendingArticles = await getTrendingArticles(exclude);

  return (
    <>
      {trendingArticles.map(({ id, ...rest }) => (
        <ArticleCard key={id} article={rest} />
      ))}
    </>
  )
}
