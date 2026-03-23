import {PropsWithChildren} from 'react';

export function ArticleCardGrid({ children }: PropsWithChildren) {
  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
      {children}
    </div>
  )
}
