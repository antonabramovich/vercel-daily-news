import {ArticleCard} from '@/components/shared/article-card/article-card';
import {ArticleCardGrid} from '@/components/shared/article-card/article-card-grid';
import {getFeaturedArticles} from '@/lib/data-access/articles';

export async function FeaturedArticlesList() {
  const featuredArticles = await getFeaturedArticles();

  if (!featuredArticles.length) {
    return <div className={'text-muted-foreground'}>No featured articles at the moment. Check back soon!</div>;
  }

  return (
    <ArticleCardGrid>
      {featuredArticles.map(({ id, ...rest }) => (
        <ArticleCard key={id} article={rest} />
      ))}
    </ArticleCardGrid>
  );
}
