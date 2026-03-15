'use client';

import {useActionState} from 'react';
import {subscribe} from '@/lib/actions/subscription';
import {Button} from '@/components/ui/button';
import {Spinner} from '@/components/ui/spinner';

export function SubscribeButton() {
  const [, action, pending] = useActionState(subscribe, null);

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
