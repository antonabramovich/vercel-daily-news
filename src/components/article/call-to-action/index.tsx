import {SubscribeButton} from './subscribe-button';

export function SubscribeCallToAction() {
  return (
    <div className={'-mt-6 md:-mt-8 p-8 text-center flex flex-col gap-8 bg-background relative before:absolute before:bottom-full before:left-0 before:block before:w-full before:h-32 before:bg-linear-(--subscription-call-to-action-gradient)'}>
      <div className={'text-2xl md:text-4xl font-medium'}>Subscribe to read the full story.</div>
      <div className={'flex flex-col gap-1 text-muted-foreground'}>
        <p>This story is available to subscribed users only.</p>
        <p>You&#39;ll also get a full access to every story on Vercel Daily News.</p>
      </div>
      <div>
        <SubscribeButton />
      </div>
    </div>
  )
}
