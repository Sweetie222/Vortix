'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/catalog';
import PriceTag from './PriceTag';
import styles from './ProductCard.module.css';

const MAX_SWATCHES = 5;

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const colors = product.colors ?? [];
  const shown = colors.slice(0, MAX_SWATCHES);
  const hidden = colors.length - shown.length;
  const selected = active !== null ? colors[active] : undefined;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={`/${product.images[0]}`}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
          className={styles.img}
          priority={priority}
        />
        {selected ? (
          <Image
            key={selected.image}
            src={`/${selected.image}`}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
            className={`${styles.img} ${styles.overlay} ${styles.overlayOn}`}
          />
        ) : null}
      </div>

      {shown.length > 0 ? (
        <div className={styles.swatches} role="group" aria-label={`Colores de ${product.name}`}>
          {shown.map((c, i) => (
            <button
              key={c.image}
              type="button"
              className={`${styles.swatchBtn} ${active === i ? styles.swatchOn : ''}`}
              style={{ backgroundColor: c.hex }}
              aria-label={c.name}
              aria-pressed={active === i}
              onClick={() => setActive(active === i ? null : i)}
              onMouseEnter={() => setActive(i)}
            />
          ))}
          {hidden > 0 ? <span className={styles.more}>+{hidden}</span> : null}
        </div>
      ) : null}

      <h3 className={styles.title}>
        <Link href={`/productos/${product.slug}`}>{product.name}</Link>
      </h3>

      <p className={styles.fitment}>{product.fitment.join(' · ')}</p>

      <div className={styles.priceRow}>
        <PriceTag priceUsd={product.priceUsd} align="center" />
      </div>
    </article>
  );
}
