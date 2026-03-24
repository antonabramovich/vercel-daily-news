import type { Metadata } from 'next';
import React from 'react';
import {getCategories} from '@/lib/data-access/categories';
import {loadFilters} from '@/lib/search-params/search';
import {SearchResult} from '@/components/search/search-result';
import {Filters} from '@/components/search/filters';

export const metadata: Metadata = {
  title: 'Search'
};

export default async function SearchPage({ searchParams }: PageProps<'/search'>) {
  const categoriesPromise = getCategories();
  const {query, category} = await loadFilters(searchParams);

  return (
    <div className={'flex flex-col gap-6 mt-6'}>
      <Filters categoriesPromise={categoriesPromise} />
      <SearchResult query={query} category={category} />
    </div>
  );
}
