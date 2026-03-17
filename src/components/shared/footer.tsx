import {cacheLife, cacheTag} from 'next/cache';

export async function Footer() {
  'use cache';
  cacheLife('max');
  cacheTag('footer');

  return (
    <footer className={'border-t p-4 bg-foreground text-background text-sm'}>
      <div className={'mx-auto max-w-4xl'}>
        <p>&copy; {new Date().getFullYear()} Vercel Daily News. No rights reserved.</p>
      </div>
    </footer>
  );
}
