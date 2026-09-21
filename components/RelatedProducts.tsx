import type { Product } from '@/lib/catalog';
import ProductCard from './ProductCard';
import styles from './RelatedProducts.module.css';

export default function RelatedProducts({
  products,
  title = 'También le puede servir',
}: {
  products: Product[];
  title?: string;
}) {
  if (products.length === 0) return null;
  return (
    <section className={styles.section} aria-labelledby="related">
      <h2 className={styles.title} id="related">
        {title}
      </h2>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
