import {BreakingNewsBannerSkeleton} from '@/components/home/breaking-news/breaking-news-banner-skeleton';
import {FeaturedArticlesSkeleton} from '@/components/home/featured-articles/featured-articles-skeleton';
import {HeroSectionSkeleton} from '@/components/home/hero-section/hero-section-skeleton';

export default function HomeLoadingPage() {
  return (
    <>
      <BreakingNewsBannerSkeleton />
      <HeroSectionSkeleton />
      <FeaturedArticlesSkeleton />
    </>
  );
}
