'use client';

import React, {use, useTransition} from 'react';
import {LoaderCircle, Search} from 'lucide-react';
import {debounce} from 'nuqs';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {InputGroup, InputGroupAddon, InputGroupInput} from '@/components/ui/input-group';
import {useFilters} from '@/lib/search-params/search';
import type {Category} from '@/lib/api/client';

const SEARCH_DEBOUNCE_MS = 250;

export interface FiltersInputsProps {
  categoriesPromise: Promise<Category[]>;
}

export function FiltersInputs({ categoriesPromise }: FiltersInputsProps) {
  const categories = use(categoriesPromise);
  const [isPending, startTransition] = useTransition();
  const [{ query, category }, setSearchParams] = useFilters();

  return (
    <div className={'flex flex-col sm:flex-row items-center gap-4'}>
      <Select value={category} onValueChange={(value) => {
        startTransition(async () => {
          await setSearchParams({ category: value })
        });
      }}>
        <SelectTrigger className={'w-full sm:w-1/2 lg:w-1/4 text-sm'} aria-label={'Category selector'}>
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent position={'popper'}>
          <SelectItem value={null!}>All categories</SelectItem>
          {categories.map(({ slug, name }) => (
            <SelectItem key={slug} value={slug!}>{name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          className={'text-sm md:text-sm'}
          value={query ?? ''}
          onChange={(e) => {
            startTransition(async () => {
              await setSearchParams({
                query: e.target.value || null
              }, {
                limitUrlUpdates: e.target.value ? debounce(SEARCH_DEBOUNCE_MS) : undefined
              });
            })
          }}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        {isPending && <InputGroupAddon align={'inline-end'}>
          <LoaderCircle className={'animate-spin'} />
        </InputGroupAddon>}
      </InputGroup>
    </div>
  );
}
