export default function ArticleLoadingPage() {
  return (
    <div className={'flex flex-col gap-6 md:gap-8 mt-4 md:mt-8 animate-pulse'}>
      <div className={'mx-auto w-24 h-5 bg-gray-200'} />
      <div className={'max-w-2xl mx-auto w-full h-9 md:h-14 bg-gray-200'} />
      <div className={'mx-auto flex items-center gap-2 text-sm text-muted-foreground'}>
        <div className={'w-16 h-4 bg-gray-200'} />
        <span>&middot;</span>
        <div className={'w-16 h-4 bg-gray-200'} />
      </div>
      <div className={'mx-auto w-full aspect-video max-w-160 max-h-90 bg-gray-200'} />
      <div className={'w-full h-8 bg-gray-200'} />
      <div className={'w-full h-8 bg-gray-200'} />
      <div className={'w-full h-8 bg-gray-200'} />
      <div className={'w-full h-8 bg-gray-200'} />
      <div className={'w-full h-8 bg-gray-200'} />
      <div className={'w-full h-8 bg-gray-200'} />
    </div>
  );
}
