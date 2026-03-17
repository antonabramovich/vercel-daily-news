export function ArticleCardSkeleton() {
  return (
    <div className={'flex flex-col gap-2 w-full animate-pulse'}>
      <div className={'aspect-video bg-gray-200'} />
      <div className={'flex items-center gap-2'}>
        <div className={'w-1/2 p-2 bg-gray-200'} />
        <span className={'text-gray-200'}>&middot;</span>
        <div className={'w-1/4 p-2 bg-gray-200'} />
      </div>
      <div className={'p-3 bg-gray-200'} />
      <p className={'p-5 bg-gray-200'} />
    </div>
  )
}
