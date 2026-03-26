import {constants} from 'node:http2';
import {revalidateTag} from 'next/cache';
import {NextResponse} from 'next/server';

interface InvalidateCacheRequestBody {
  tag: string;
  profile?: Parameters<typeof revalidateTag>[1];
}

export async function POST(request: Request) {
  const isAuthorized = request.headers.get('x-api-key') === process.env.API_KEY;
  if (!isAuthorized) {
    return NextResponse.json({
      error: true,
      message: 'Unauthorized'
    }, {
      status: constants.HTTP_STATUS_UNAUTHORIZED
    });
  }

  let body: InvalidateCacheRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({
      error: true,
      message: 'Invalid request body: should be a valid JSON.'
    }, {
      status: constants.HTTP_STATUS_BAD_REQUEST
    });
  }

  const { tag, profile } = body;

  if (!tag) {
    return NextResponse.json({
      error: true,
      message: 'Invalid request body: "tag" parameter is missing.'
    }, {
      status: constants.HTTP_STATUS_BAD_REQUEST
    });
  }

  revalidateTag(tag, profile || 'max');

  return NextResponse.json({
    error: false,
    message: `Revalidated tag "${tag}" using the ${JSON.stringify(profile || 'max')} profile.`
  }, {
    status: constants.HTTP_STATUS_OK
  });
}
