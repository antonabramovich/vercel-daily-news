import {getArticles} from '@/lib/data-access/articles';
import {ArticleCard} from '@/components/shared/article-card/article-card';
import {ArticleCardGrid} from '@/components/shared/article-card/article-card-grid';
import {EmptySearchResults} from '@/components/search/search-result/empty-search-results';
import {SEARCH_RESULTS_LIMIT} from '@/lib/constants';
import {loadFilters} from '@/lib/search-params/search';

export interface SearchResultsListProps {
  searchParams: PageProps<'/search'>['searchParams'];
}

export async function SearchResultsList({ searchParams }: SearchResultsListProps) {
  const {query, category} = await loadFilters(searchParams);
  const articles = await getArticles({
    query: {
      search: query || undefined,
      // @ts-expect-error - category can be any string, but OpenAPI spec only allows specific values.
      // We can ignore this error since the UI will handle invalid categories gracefully.
      category: category || undefined,
      limit: query ? SEARCH_RESULTS_LIMIT : undefined
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
