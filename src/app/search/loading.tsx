import {SearchResultsListSkeleton} from '@/components/search/search-result/search-results-list-skeleton';
import {FiltersSkeleton} from '@/components/search/filters/filters-skeleton';

export default function SearchLoadingPage() {
  return (
    <div className={'flex flex-col gap-6 mt-6'}>
      <FiltersSkeleton />
      <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
        <SearchResultsListSkeleton />
      </div>
    </div>
  );
}
