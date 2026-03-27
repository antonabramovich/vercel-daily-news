'use client';

import {toast} from 'sonner';
import {useActionState, useEffect} from 'react';
import {subscribe} from '@/lib/actions/subscription';
import {Button} from '@/components/ui/button';
import {Spinner} from '@/components/ui/spinner';

export function SubscribeButton() {
  const [state, action, pending] = useActionState(subscribe, null);

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
        size={'lg'}
        className={'text-md'}
        disabled={pending}>
        Subscribe
        {pending && <Spinner data-icon="inline-start" />}
      </Button>
    </form>
  );
}
