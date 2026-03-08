import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

const ALLOWED_TAGS = [
  'breaking-news',
  'featured-articles'
];

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  if (!tag) {
    return NextResponse.json({ error: '"tag" query parameter is required.' }, { status: 400 });
  }

  if (!ALLOWED_TAGS.includes(tag)) {
    return NextResponse.json({ error: `"${tag}" tag is not allowed to be revalidated.` }, { status: 400 });
  }

  revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ message: `Cache for "${tag}" tag has been invalidated.` });
}
