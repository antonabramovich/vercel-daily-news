import {BadgeCheck, BadgeX} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {getSubscriptionStatus} from '@/lib/data-access/subscription';
import {cn} from '@/lib/utils';

export async function SubscriptionBadge() {
  const subscriptionStatus = await getSubscriptionStatus();
  const className = cn({
    'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300': subscriptionStatus === 'active',
    'bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300': subscriptionStatus === 'inactive',
  });

  return (
    <Badge className={className} variant="secondary">
      {subscriptionStatus === 'active' ?  <BadgeCheck data-icon="inline-start" /> : <BadgeX data-icon="inline-start" />}
      <span className={'hidden xs:inline'}>{subscriptionStatus === 'active' ? 'Subscribed' : 'Unsubscribed'}</span>
    </Badge>
  );
}
