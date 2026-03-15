import {Button} from '@/components/ui/button';

export function SubscribeButtonSkeleton() {
  return (
    <Button className={'h-9'} variant={'outline'} disabled>
      <div className={'w-18 h-3 bg-gray-200 animate-pulse'} />
    </Button>
  );
}
