import { SITE } from './site';
import type { Product } from './catalog';
import { productUrl } from './whatsapp';

const ORG_ID = `${SITE.url}/#organization`;

/**
 * Organization only. LocalBusiness/AutoPartsStore requires a postal address
 * to be valid, and the shop does not publish one — emitting the type without
 * it would be invalid markup rather than a partial benefit.
 */
export function organizationAndStore() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
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
      },
    ],
  };
}

export function productSchema(product: Product) {
  const url = productUrl(product);
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    image: product.images.map((i) => `${SITE.url}/${i}`),
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
      availability: 'https://schema.org/InStock',
      seller: { '@id': ORG_ID },
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
