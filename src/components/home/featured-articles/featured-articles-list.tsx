import {ArticleCard} from '@/components/shared/article-card/article-card';
import {ArticleCardGrid} from '@/components/shared/article-card/article-card-grid';
import {getFeaturedArticles} from '@/lib/data-access/articles';

export async function FeaturedArticlesList() {
  const featuredArticles = await getFeaturedArticles();

  return (
    <ArticleCardGrid>
      {featuredArticles.map(({ id, ...rest }) => (
        <ArticleCard key={id} article={rest} />
      ))}
    </ArticleCardGrid>
  )
}
