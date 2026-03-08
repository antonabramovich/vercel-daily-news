import {FeaturedArticleCard} from '@/components/home/featured-articles/featured-article-card';
import {getFeaturedArticles} from '@/lib/data-access/articles';

export async function FeaturedArticlesList() {
  const featuredArticles = await getFeaturedArticles();

  return (
    <>
      {featuredArticles.map(({ id, ...rest }) => (
        <FeaturedArticleCard key={id} article={rest} />
      ))}
    </>
  )
}
