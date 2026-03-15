'use server';

import {cookies} from 'next/headers';
import {createSubscription, subscribe as subscribeFromApi, unsubscribe as unsubscribeFromApi} from '@/lib/api/client';

export async function toggleSubscription(subscriptionStatus: string) {
  if (subscriptionStatus === 'active') {
    await unsubscribe();
  } else {
    await subscribe();
  }
}

export async function subscribe() {
  const cookieStore = await cookies();

  const { data } = await createSubscription();
  const subscriptionToken = data?.data?.token || '';
  await subscribeFromApi({
    headers: {
      'x-subscription-token': subscriptionToken,
    },
  });
  cookieStore.set({
    name: 'x-subscription-token',
    value: subscriptionToken,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })
}

export async function unsubscribe() {
  const cookieStore = await cookies();

  await unsubscribeFromApi({
    headers: {
      'x-subscription-token': cookieStore.get('x-subscription-token')?.value || '',
    },
  });
  cookieStore.delete('x-subscription-token');
}
