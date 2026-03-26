import {HeroSection} from '@/components/home/hero-section';
import {BreakingNews} from '@/components/home/breaking-news';
import {FeaturedArticles} from '@/components/home/featured-articles';

export default function Home() {
  return (
    <>
      <BreakingNews />
      <HeroSection />
      <FeaturedArticles />
    </>
  );
}
