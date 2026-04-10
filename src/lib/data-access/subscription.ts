import 'server-only';
import {cookies} from 'next/headers';
import {getSubscription, Subscription} from '@/lib/api/client';
import {SUBSCRIPTION_COOKIE_HEADER_NAME} from '@/lib/constants';

export async function getSubscriptionStatus(): Promise<NonNullable<Subscription['status']>> {
  const cookieStore = await cookies();
  const subscriptionToken = cookieStore.get(SUBSCRIPTION_COOKIE_HEADER_NAME)?.value || '';
  if (!subscriptionToken) {
    return 'inactive';
  }

  const { data, error } = await getSubscription({
    headers: {
      [SUBSCRIPTION_COOKIE_HEADER_NAME]: subscriptionToken
    }
  });

  if (error) {
    console.error('Error while getting subscription status:', error?.error?.message ?? 'Unknown error');
  }

  return data?.data?.status ?? 'inactive';
}
