'use client';

import {use, useActionState} from 'react';
import {Button} from '@/components/ui/button';
import {Spinner} from '@/components/ui/spinner';
import {toggleSubscription} from '@/lib/actions/subscription';
import type {Subscription} from '@/lib/api/client';

interface SubscribeButtonProps {
  subscriptionStatusPromise: Promise<NonNullable<Subscription['status']>>;
}

export function SubscribeButton({ subscriptionStatusPromise }: SubscribeButtonProps) {
  const subscriptionStatus = use(subscriptionStatusPromise);
  const toggleSubscriptionAction = toggleSubscription.bind(null, subscriptionStatus);
  const [, action, pending] = useActionState(toggleSubscriptionAction, null);

  return (
    <form action={action}>
      <Button
        type={'submit'}
        variant={'outline'}
        size={'lg'}
        className={'text-sm'}
        disabled={pending}>
        {subscriptionStatus === 'active' ? 'Unsubscribe' : 'Subscribe'}
        {pending && <Spinner data-icon="inline-start" />}
      </Button>
    </form>
  );
}
