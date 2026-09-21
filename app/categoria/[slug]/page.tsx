import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryChips from '@/components/CategoryChips';
import CatalogBrowser from '@/components/CatalogBrowser';
import JsonLd from '@/components/JsonLd';
import { CATEGORIES, getCategory, productsInCategory, type CategorySlug } from '@/lib/catalog';
import { SITE } from '@/lib/site';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import styles from './categoria.module.css';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug as CategorySlug);
  if (!category) return {};
  const inCategory = productsInCategory(category.slug);
  const description = `${inCategory.length} productos de ${category.name.toLowerCase()} para moto en ${SITE.name}, ${SITE.address.locality}, estado ${SITE.address.region}. Precios en dólares. Pedidos por WhatsApp.`;
  // Setting openGraph here replaces the file-convention card, so name an image.
  const image = inCategory[0] ? `/og/${inCategory[0].slug}.jpg` : '/opengraph-image.jpg';
  return {
    title: `${category.name} para moto`,
    description,
    alternates: { canonical: `/categoria/${category.slug}` },
    openGraph: {
      type: 'website',
      locale: SITE.locale,
      title: `${category.name} para moto`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${category.name} — VORTIX` }],
    },
    twitter: { card: 'summary_large_image', images: [image] },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = getCategory(slug as CategorySlug);
  if (!category) notFound();

  const products = productsInCategory(category.slug);
  const trail = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo', href: '/productos' },
    { name: category.name },
  ];

  return (
    <>
      <main id="contenido" className="container">
        <Breadcrumbs trail={trail} />
        <h1 className={styles.title}>{category.name}</h1>
        <CategoryChips active={category.slug} />
        <CatalogBrowser products={products} />
      </main>
      <JsonLd data={itemListSchema(category.name, products)} />
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, url: t.href ? `${SITE.url}${t.href}` : undefined })),
        )}
      />
    </>
  );
}
