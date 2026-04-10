'use server';

import {cookies} from 'next/headers';
import {
  Subscription,
  createSubscription,
  subscribe as subscribeFromApi,
  unsubscribe as unsubscribeFromApi
} from '@/lib/api/client';
import {env} from '@/lib/env';
import {SUBSCRIPTION_COOKIE_HEADER_NAME} from '@/lib/constants';

export async function toggleSubscription(subscriptionStatus: Subscription['status']) {
  if (subscriptionStatus === 'active') {
    return unsubscribe();
  } else {
    return subscribe();
  }
}

export async function subscribe(): Promise<{ error: boolean, message: string }> {
  try {
    const cookieStore = await cookies();
    const { data } = await createSubscription();
    const subscriptionToken = data?.data?.token || '';
    await subscribeFromApi({
      headers: {
        [SUBSCRIPTION_COOKIE_HEADER_NAME]: subscriptionToken,
      },
    });
    cookieStore.set({
      name: SUBSCRIPTION_COOKIE_HEADER_NAME,
      value: subscriptionToken,
      httpOnly: true,
      secure: Boolean(env.VERCEL_URL),
      sameSite: 'lax',
      path: '/'
    });
    return {
      error: false,
      message: 'Subscribed successfully.'
    };
  } catch (e) {
    console.error('Error while subscribing user to newsletter:', e);
    return {
      error: true,
      message: 'Something went wrong while subscribing. Please try again later.'
    };
  }
}

export async function unsubscribe(): Promise<{ error: boolean, message: string }> {
  try {
    const cookieStore = await cookies();
    await unsubscribeFromApi({
      headers: {
        [SUBSCRIPTION_COOKIE_HEADER_NAME]: cookieStore.get(SUBSCRIPTION_COOKIE_HEADER_NAME)?.value || '',
      },
    });
    cookieStore.delete(SUBSCRIPTION_COOKIE_HEADER_NAME);
    return {
      error: false,
      message: 'Unsubscribed successfully.'
    };
  } catch (e) {
    console.error('Error while unsubscribing user from newsletter:', e);
    return {
      error: true,
      message: 'Something went wrong while unsubscribing. Please try again later.'
    };
  }
}
