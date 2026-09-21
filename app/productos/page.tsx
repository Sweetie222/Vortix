import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryChips from '@/components/CategoryChips';
import CatalogBrowser from '@/components/CatalogBrowser';
import JsonLd from '@/components/JsonLd';
import { PRODUCTS } from '@/lib/catalog';
import { SITE } from '@/lib/site';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import styles from './productos.module.css';

export const metadata: Metadata = {
  title: 'Catálogo de accesorios y repuestos para moto',
  description: `Los ${PRODUCTS.length} accesorios y repuestos para moto de VORTIX: cascos, trancas de disco, bombillos LED, chapaletas y más. Pedidos por WhatsApp.`,
  alternates: { canonical: '/productos' },
};

export default function ProductosPage() {
  const trail = [{ name: 'Inicio', href: '/' }, { name: 'Catálogo' }];

  return (
    <>
      <main id="contenido" className="container">
        <Breadcrumbs trail={trail} />
        <h1 className={styles.title}>Catálogo completo</h1>
        <CategoryChips />
        <CatalogBrowser products={PRODUCTS} />
      </main>
      <JsonLd data={itemListSchema('Catálogo completo VORTIX', PRODUCTS)} />
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, url: t.href ? `${SITE.url}${t.href}` : undefined })),
        )}
      />
    </>
  );
}
