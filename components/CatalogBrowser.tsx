'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/lib/catalog';
import { searchProducts } from '@/lib/catalog';
import { SITE } from '@/lib/site';
import { whatsappGeneral } from '@/lib/whatsapp';
import ProductCard from './ProductCard';
import styles from './CatalogBrowser.module.css';

type Sort = 'destacados' | 'precio-asc' | 'precio-desc';

const SORTS: { value: Sort; label: string }[] = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
];

export default function CatalogBrowser({
  products,
}: {
  products: Product[];
}) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('destacados');

  const visible = useMemo(() => {
    const found = searchProducts(products, query);
    if (sort === 'destacados') return found;
    const dir = sort === 'precio-asc' ? 1 : -1;
    // Items without a published price always sort last, either way.
    return [...found].sort((a, b) => {
      if (a.priceUsd === null) return 1;
      if (b.priceUsd === null) return -1;
      return (a.priceUsd - b.priceUsd) * dir;
    });
  }, [products, query, sort]);

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <svg
            className={styles.searchIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <input
            id="buscar"
            type="search"
            className={styles.search}
            placeholder="Buscar en el catálogo…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <label htmlFor="buscar" className="visually-hidden">
            Buscar en el catálogo
          </label>
        </div>

        <label htmlFor="ordenar" className="visually-hidden">
          Ordenar productos
        </label>
        <select
          id="ordenar"
          className={styles.sort}
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <p className={styles.count} aria-live="polite">
          {visible.length === products.length
            ? `${products.length} productos`
            : `${visible.length} de ${products.length} productos`}
        </p>
      </div>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No encontramos «{query}»</p>
          <p>
            Puede escribirnos y lo buscamos.{' '}
            <a
              className={styles.emptyLink}
              href={whatsappGeneral()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </p>
        </div>
      ) : (
        <>
          <h2 className="visually-hidden">Productos</h2>
          <div className={styles.grid}>
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
          </div>
        </>
      )}
    </>
  );
}
