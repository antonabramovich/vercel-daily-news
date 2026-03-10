import {useQueryStates} from 'nuqs';
import {createLoader, parseAsString, UrlKeys, type Options} from 'nuqs/server';
import {createTypedLink} from '@/lib/search-params/create-typed-link';

export const searchParams = {
  query: parseAsString.withDefault(''),
  category: parseAsString.withDefault('')
};

const urlKeys: UrlKeys<typeof searchParams> = {
  query: 'q',
  category: 'c'
};

export const loadFilters = createLoader(searchParams, {
  urlKeys
});

export const getSearchLink = createTypedLink(
  '/search',
  searchParams,
  { urlKeys }
);

export const useFilters = (options: Options = {}) => useQueryStates(searchParams, {
  ...options,
  shallow: false,
  urlKeys,
});
