import type { MetadataRoute } from 'next';
import { PRODUCTS, activeCategories } from '@/lib/catalog';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/productos`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/tienda`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...activeCategories().map((c) => ({
      url: `${SITE.url}/categoria/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${SITE.url}/productos/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      images: [`${SITE.url}/${p.images[0]}`],
    })),
  ];
}
