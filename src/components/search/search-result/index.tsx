import {Suspense} from 'react';
import {SearchResultsListSkeleton} from '@/components/search/search-result/search-results-list-skeleton';
import {SearchResultsList, SearchResultsListProps} from '@/components/search/search-result/search-results-list';

type SearchResultProps = SearchResultsListProps;

export function SearchResult(props: SearchResultProps) {
  return (
    <Suspense fallback={<SearchResultsListSkeleton />}>
      <SearchResultsList {...props} />
    </Suspense>
  )
}
