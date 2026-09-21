import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import CategoryChips from '@/components/CategoryChips';
import CatalogBrowser from '@/components/CatalogBrowser';
import StoreCard from '@/components/StoreCard';
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
        <TrustStrip />

        <section className={styles.catalog} id="catalogo">
          <div className="container">
            <div className={styles.head}>
              <h2 className={styles.title}>Catálogo</h2>
              <p className={styles.lead}>
                Todo lo que tenemos, con el precio a la vista. Elija una categoría o busque
                directamente lo que necesita.
              </p>
            </div>
            <CategoryChips />
            <CatalogBrowser products={PRODUCTS} />
          </div>
        </section>

        <StoreCard />
      </main>
      <JsonLd data={itemListSchema('Catálogo VORTIX', PRODUCTS)} />
    </>
  );
}
