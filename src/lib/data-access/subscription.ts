import 'server-only';
import {cookies} from 'next/headers';
import {getSubscription, Subscription} from '@/lib/api/client';

export async function getSubscriptionStatus(): Promise<NonNullable<Subscription['status']>> {
  const cookieStore = await cookies();
  const subscriptionToken = cookieStore.get('x-subscription-token')?.value || '';
  if (!subscriptionToken) {
    return 'inactive';
  }

  const { data, error } = await getSubscription({
    headers: {
      'x-subscription-token': subscriptionToken
    }
  });

  if (error) {
    console.error('Error while getting subscription status:', error);
  }

  return data?.data?.status ?? 'inactive';
}
