import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "COOLKID",
  description: 'Delicious catering for your next event.',
  keywords: ['catering', 'events', 'food', 'restaurant', 'my friend\'s catering', 'quote', 'inquiry'],
  openGraph: {
    title: "BasseCool",
    description: 'Bringing fresh, flavorful, and unforgettable culinary experiences directly to you.',
    url: 'https://yourwebsite.com/', 
    siteName: 'Bassesval',
    images: [
      {
        url: '/images/catering-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Delicious Catering Spread',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bassecute",
    description: 'Bringing fresh, flavorful, and unforgettable culinary experiences directly to you.',
    images: ['/images/catering-hero.jpg'],
  },
};