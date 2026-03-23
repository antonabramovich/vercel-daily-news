import React from 'react';
import type {Metadata} from 'next';
import {Geist, Geist_Mono, Outfit} from 'next/font/google';
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import {Header} from '@/components/shared/header';
import {Footer} from '@/components/shared/footer';
import {getPublicationConfig} from '@/lib/data-access/publication-config';
import {cn} from '@/lib/utils';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans'
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const publicationConfig = await getPublicationConfig();

  return {
    title: {
      default: publicationConfig?.seo?.defaultTitle ?? 'Vercel Daily News',
      template: publicationConfig?.seo?.titleTemplate ?? '%s | Vercel Daily News',
    },
    description: publicationConfig?.seo?.defaultDescription ?? 'News and insights from the world of Vercel and frontend development.',
    metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
    openGraph: {
      url: '/',
      siteName: publicationConfig?.publicationName ?? 'Vercel Daily News',
      locale: 'en_US',
      type: 'website'
    }
  }
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={cn('font-sans', outfit.variable)}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-scroll`}>
        <Analytics />
        <SpeedInsights />
        <NuqsAdapter>
          <div className={'flex flex-col min-h-screen'}>
            <Header />
            <main className={'grow p-4 mb-4'}>
              <div className={'mx-auto max-w-4xl'}>
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
