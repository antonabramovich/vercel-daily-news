import {Suspense} from 'react';
import {CallToActionContent} from './call-to-action-content';

export function SubscribeCallToAction() {
  return (
    <Suspense>
      <CallToActionContent />
    </Suspense>
  );
}
