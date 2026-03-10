import React from 'react';
import type {Metadata} from 'next';
import {Geist, Geist_Mono, Outfit} from 'next/font/google';
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import {cn} from '@/lib/utils';
import {Header} from '@/components/shared/header';
import {Footer} from '@/components/shared/footer';
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

export const metadata: Metadata = {
  title: {
    default: 'Vercel Daily News',
    template: '%s | Vercel Daily News',
  },
  description: 'News and insights from the world of Vercel and frontend development.'
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={cn('font-sans', outfit.variable)}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-scroll`}>
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
