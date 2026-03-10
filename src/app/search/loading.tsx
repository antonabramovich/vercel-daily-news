import {SearchResultsListSkeleton} from '@/components/search/search-result/search-results-list-skeleton';
import {FiltersSkeleton} from '@/components/search/filters/filters-skeleton';

export default function SearchLoadingPage() {
  return (
    <div className={'flex flex-col gap-6 mt-6'}>
      <FiltersSkeleton />
      <SearchResultsListSkeleton />
    </div>
  );
}
