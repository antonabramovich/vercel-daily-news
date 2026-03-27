'use client';

import {toast} from 'sonner';
import {use, useActionState, useEffect} from 'react';
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
  const [state, action, pending] = useActionState(toggleSubscriptionAction, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.message, {
        position: 'top-center'
      });
    }
  }, [state]);

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
