import {Suspense} from 'react';
import {CallToActionContent} from './call-to-action-content';

export function SubscribeCallToAction() {
  return (
    // no need to have a fallback here,
    // since the content renders null for subscribers
    // and is rendered together with the promo content for non-subscribers
    <Suspense>
      <CallToActionContent />
    </Suspense>
  );
}
