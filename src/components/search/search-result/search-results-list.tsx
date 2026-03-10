import {getArticles} from '@/lib/data-access/articles';
import {ArticleCard} from '@/components/shared/article-card/article-card';
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
      category: category || undefined
    }
  });

  if (articles.length === 0) {
    return <EmptySearchResults />;
  }

  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
      {articles.map(({ id, ...rest }) => (
        <ArticleCard key={id} article={rest} />
      ))}
    </div>
  )
}
