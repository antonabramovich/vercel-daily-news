import 'server-only';

import {cookies} from 'next/headers';
import {getSubscription, Subscription} from '@/lib/api/client';

export async function getSubscriptionStatus(): Promise<NonNullable<Subscription['status']>> {
  const cookieStore = await cookies();
  const subscriptionToken = cookieStore.get('x-subscription-token')?.value || '';
  if (!subscriptionToken) {
    return 'inactive';
  }

  const { data } = await getSubscription({
    headers: {
      'x-subscription-token': subscriptionToken
    }
  });
  return data?.data?.status ?? 'inactive';
}
