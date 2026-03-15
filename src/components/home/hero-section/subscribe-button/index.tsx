import {Suspense} from 'react';
import {getSubscriptionStatus} from '@/lib/data-access/subscription';
import {SubscribeButtonSkeleton} from './subscribe-button-skeleton';
import {SubscribeButton as SubscribeButtonInternal} from './subscribe-button';

export async function SubscribeButton() {
  const subscriptionStatusPromise = getSubscriptionStatus();

  return (
    <Suspense fallback={<SubscribeButtonSkeleton />}>
      <SubscribeButtonInternal subscriptionStatusPromise={subscriptionStatusPromise} />
    </Suspense>
  );
}
