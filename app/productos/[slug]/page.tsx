import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductDetail from '@/components/ProductDetail';
import RelatedProducts from '@/components/RelatedProducts';
import JsonLd from '@/components/JsonLd';
import { PRODUCTS, getCategory, getProduct, relatedProducts } from '@/lib/catalog';
import { formatUsd } from '@/lib/format';
import { SITE } from '@/lib/site';
import { breadcrumbSchema, productSchema } from '@/lib/schema';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const price = product.priceUsd !== null ? ` — ${formatUsd(product.priceUsd)}` : '';
  const description =
    `${product.name}${price} en ${SITE.name}. Pedidos por WhatsApp al ${SITE.phone}.`;

  return {
    title: `${product.name}${price}`,
    description,
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: {
      type: 'website',
      locale: SITE.locale,
      url: `/productos/${product.slug}`,
      title: `${product.name}${price}`,
      description,
      // Pre-rendered 1200x630 card: many source photos are only 200px, which
      // WhatsApp would show as a tiny square thumb instead of a preview card.
      images: [{ url: `/og/${product.slug}.jpg`, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name}${price}`,
      description,
      images: [`/og/${product.slug}.jpg`],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);

  const trail = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo', href: '/productos' },
    ...(category ? [{ name: category.name, href: `/categoria/${category.slug}` }] : []),
    { name: product.name },
  ];

  return (
    <>
      <main id="contenido" className="container productPage">
        <Breadcrumbs trail={trail} />
        <ProductDetail product={product} />
        <RelatedProducts products={relatedProducts(product)} />
      </main>
      <JsonLd data={productSchema(product)} />
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, url: t.href ? `${SITE.url}${t.href}` : undefined })),
        )}
      />
    </>
  );
}
