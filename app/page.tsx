import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CategoryChips from '@/components/CategoryChips';
import CatalogBrowser from '@/components/CatalogBrowser';
import JsonLd from '@/components/JsonLd';
import { PRODUCTS } from '@/lib/catalog';
import { itemListSchema } from '@/lib/schema';
import styles from './page.module.css';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <main id="contenido">
        <Hero />

        <section className={styles.catalog} id="catalogo">
          <div className="container">
            <div className={styles.head}>
              <h2 className={styles.title}>Catálogo</h2>
            </div>
            <CategoryChips />
            <CatalogBrowser products={PRODUCTS} />
          </div>
        </section>
      </main>
      <JsonLd data={itemListSchema('Catálogo VORTIX', PRODUCTS)} />
    </>
  );
}
