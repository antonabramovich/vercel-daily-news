export function FiltersSkeleton() {
  return (
    <div className={'flex flex-col sm:flex-row items-center gap-4 animate-pulse'}>
      <div className={'bg-gray-200 h-8 w-full sm:w-1/2 lg:w-1/4'} />
      <div className={'bg-gray-200 h-8 w-full'} />
    </div>
  );
}
