import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryChips from '@/components/CategoryChips';
import CatalogBrowser from '@/components/CatalogBrowser';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import JsonLd from '@/components/JsonLd';
import { PRODUCTS } from '@/lib/catalog';
import { SITE } from '@/lib/site';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import styles from './productos.module.css';

export const metadata: Metadata = {
  title: 'Catálogo de accesorios y repuestos para moto',
  description: `Los ${PRODUCTS.length} accesorios y repuestos para moto de VORTIX, con el precio en dólares a la vista. Cascos, trancas de disco, bombillos LED, chapaletas y más en ${SITE.address.locality}, estado ${SITE.address.region}.`,
  alternates: { canonical: '/productos' },
};

export default function ProductosPage() {
  const trail = [{ name: 'Inicio', href: '/' }, { name: 'Catálogo' }];

  return (
    <>
      <Header />
      <main id="contenido" className="container">
        <Breadcrumbs trail={trail} />
        <h1 className={styles.title}>Catálogo completo</h1>
        <p className={styles.lead}>
          {PRODUCTS.length} accesorios y repuestos, con el precio a la vista en dólares.
        </p>
        <CategoryChips />
        <CatalogBrowser products={PRODUCTS} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <JsonLd data={itemListSchema('Catálogo completo VORTIX', PRODUCTS)} />
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, url: t.href ? `${SITE.url}${t.href}` : undefined })),
        )}
      />
    </>
  );
}
