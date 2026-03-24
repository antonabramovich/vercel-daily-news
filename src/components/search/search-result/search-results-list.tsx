import {getArticles} from '@/lib/data-access/articles';
import {ArticleCard} from '@/components/shared/article-card/article-card';
import {ArticleCardGrid} from '@/components/shared/article-card/article-card-grid';
import {EmptySearchResults} from '@/components/search/search-result/empty-search-results';

export interface SearchResultsListProps {
  query: string;
  category: string | null;
}

export async function SearchResultsList({ query, category }: SearchResultsListProps) {
  const articles = await getArticles({
    query: {
      search: query || undefined,
      // @ts-expect-error - category can be any string, but OpenAPI spec only allows specific values.
      // We can ignore this error since the UI will handle invalid categories gracefully.
      category: category || undefined,
      limit: query ? 5 : undefined
    }
  });

  if (articles.length === 0) {
    return <EmptySearchResults />;
  }

  return (
    <ArticleCardGrid>
      {articles.map(({ id, ...rest }) => (
        <ArticleCard key={id} article={rest} />
      ))}
    </ArticleCardGrid>
  )
}
