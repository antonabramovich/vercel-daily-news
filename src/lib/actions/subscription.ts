'use server';

import {cookies} from 'next/headers';
import {createSubscription, subscribe as subscribeFromApi, unsubscribe as unsubscribeFromApi} from '@/lib/api/client';
import {env} from '@/lib/env';

export async function toggleSubscription(subscriptionStatus: string) {
  if (subscriptionStatus === 'active') {
    return unsubscribe();
  } else {
    return subscribe();
  }
}

export async function subscribe(): Promise<{ error: true, message: string } | void> {
  try {
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
      secure: Boolean(env.VERCEL_URL),
      sameSite: 'lax',
      path: '/'
    });
  } catch (e) {
    console.error('Error while subscribing user to newsletter:', e);
    return {
      error: true,
      message: 'Something went wrong while subscribing. Please try again later.'
    };
  }
}

export async function unsubscribe(): Promise<void> {
  let cookieStore;

  try {
    cookieStore = await cookies();
    await unsubscribeFromApi({
      headers: {
        'x-subscription-token': cookieStore.get('x-subscription-token')?.value || '',
      },
    });
  } catch (e) {
    console.error('Error while unsubscribing user from newsletter:', e);
  }

  cookieStore?.delete('x-subscription-token');
}
