import {Suspense} from 'react';
import {FiltersSkeleton} from '@/components/search/filters/filters-skeleton';
import {FiltersInputs, FiltersInputsProps} from '@/components/search/filters/filters-inputs';

type FiltersProps = FiltersInputsProps;

export function Filters(props: FiltersProps) {
  return (
    <Suspense fallback={<FiltersSkeleton />}>
      <FiltersInputs {...props} />
    </Suspense>
  )
}
