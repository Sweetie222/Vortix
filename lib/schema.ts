import { SITE } from './site';
import type { Product } from './catalog';
import { productUrl } from './whatsapp';

const ORG_ID = `${SITE.url}/#organization`;
export const STORE_ID = `${SITE.url}/#store`;

/**
 * Deliberately omitted until the owner confirms them: openingHoursSpecification,
 * paymentAccepted, currenciesAccepted, aggregateRating. Structured data that
 * contradicts reality gets a site dropped from rich results and AI answers, so
 * absent beats guessed.
 */
export function organizationAndStore() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: SITE.name,
        alternateName: SITE.legalName,
        url: SITE.url,
        email: SITE.email,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE.url}/Vortixlogo/VortixLogonobackground.png`,
        },
        sameAs: [SITE.social.instagram, SITE.social.facebook, `https://wa.me/${SITE.whatsapp}`],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: SITE.phoneE164,
            contactType: 'sales',
            availableLanguage: ['es'],
            areaServed: 'VE',
          },
        ],
      },
      {
        '@type': 'AutoPartsStore',
        '@id': STORE_ID,
        name: SITE.legalName,
        description: SITE.description,
        url: SITE.url,
        parentOrganization: { '@id': ORG_ID },
        telephone: SITE.phoneE164,
        email: SITE.email,
        priceRange: '$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          addressCountry: SITE.address.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
        hasMap: SITE.maps,
        areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
        sameAs: [SITE.social.instagram, SITE.social.facebook],
      },
    ],
  };
}

export function productSchema(product: Product) {
  const url = productUrl(product);
  const images = product.images.map((i) => `${SITE.url}/${i}`);
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    image: images,
    sku: `VTX-${String(product.id).padStart(3, '0')}`,
    category: product.category,
    url,
  };
  if (product.colors?.length) base.color = product.colors.map((c) => c.name);

  // Google requires price > 0. Items without a published price get no Offer;
  // an invented price is worse than no rich result.
  if (product.priceUsd !== null) {
    base.offers = {
      '@type': 'Offer',
      url,
      price: product.priceUsd,
      priceCurrency: 'USD',
      itemCondition: 'https://schema.org/NewCondition',
      // Honest for a WhatsApp-order shop with a physical counter.
      availability: 'https://schema.org/InStoreOnly',
      seller: { '@id': STORE_ID },
    };
  }
  return base;
}

export function breadcrumbSchema(trail: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      ...(t.url ? { item: t.url } : {}),
    })),
  };
}

export function itemListSchema(name: string, products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: productUrl(p),
    })),
  };
}
