import Link from 'next/link';
import { PRODUCTS, activeCategories, categoryCounts } from '@/lib/catalog';
import styles from './CategoryChips.module.css';

/**
 * Real links to real pages, not client-side filter state: each category becomes
 * an indexable URL, and the row renders server-side with no loading flash.
 */
export default function CategoryChips({ active }: { active?: string }) {
  const counts = categoryCounts();
  return (
    <div className={styles.wrap}>
      <nav className={styles.scroller} aria-label="Categorías">
        <Link
          href="/productos"
          className={`${styles.chip} ${!active ? styles.chipOn : ''}`}
          aria-current={!active ? 'page' : undefined}
        >
          Todo <span className={styles.count}>{PRODUCTS.length}</span>
        </Link>
        {activeCategories().map((c) => (
          <Link
            key={c.slug}
            href={`/categoria/${c.slug}`}
            className={`${styles.chip} ${active === c.slug ? styles.chipOn : ''}`}
            aria-current={active === c.slug ? 'page' : undefined}
          >
            {c.short} <span className={styles.count}>{counts[c.slug] ?? 0}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
