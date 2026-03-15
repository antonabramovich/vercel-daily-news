import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {SubscribeButton} from '@/components/home/hero-section/subscribe-button';

export function HeroSection() {
  return (
    <section className={'max-w-2xl flex flex-col items-start gap-4 mt-12 mb-16'}>
      <span className={'text-muted-foreground text-xl [font-variant:all-small-caps]'}>
        The Vercel Daily
      </span>
      <h1 className={'text-4xl md:text-5xl font-bold'}>
        News and insights for modern web developers.
      </h1>
      <p className={'text-lg text-gray-600'}>
        Changelogs, engineering deep dives, customer stories, and community updates - all in one place.
      </p>
      <div className={'flex gap-4'}>
        <Button size={'lg'} className={'text-sm'} asChild>
          <Link href={'/search'}>
            Browse articles <ArrowRight />
          </Link>
        </Button>
        <SubscribeButton />
      </div>
    </section>
  )
}
