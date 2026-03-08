import Link from 'next/link';
import React from 'react';
import {listArticles} from '@/lib/api/client';

export default async function SearchPage() {
  'use cache';
  const { data } = await listArticles();

  return (
    <>
      {data?.data?.map(({ id, slug, title, excerpt }) => (
        <React.Fragment key={id}>
          <div>
            <Link href={`/articles/${slug}`}><h2>{title}</h2></Link>
            <p>{excerpt}</p>
          </div>
          <hr/>
        </React.Fragment>
      ))}
    </>
  );
}
