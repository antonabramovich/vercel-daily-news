import {ArticleCard} from '@/components/shared/article-card/article-card';
import {getFeaturedArticles} from '@/lib/data-access/articles';

export async function FeaturedArticlesList() {
  const featuredArticles = await getFeaturedArticles();

  return (
    <>
      {featuredArticles.map(({ id, ...rest }) => (
        <ArticleCard key={id} article={rest} />
      ))}
    </>
  )
}
