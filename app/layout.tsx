import type { Metadata, Viewport } from 'next';
import { Barlow, Fjalla_One } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { SITE } from '@/lib/site';
import { organizationAndStore } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

/** Condensed uppercase display face — headings, buttons, product names. */
const fjalla = Fjalla_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fjalla',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'VORTIX | Accesorios y repuestos para moto',
    template: '%s | VORTIX',
  },
  description: SITE.description,
  // Monolingual site: hreflang is for multi-language/region pairs, and a
  // self-referencing pair that only appears on some routes is worse than none.
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.name,
    url: SITE.url,
    title: 'VORTIX | Accesorios y repuestos para moto',
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.lang} className={`${fjalla.variable} ${barlow.variable}`}>
      <body>
        <JsonLd data={organizationAndStore()} />
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
