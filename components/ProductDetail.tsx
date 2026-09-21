'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/catalog';
import { formatUsd } from '@/lib/format';
import { productUrl, whatsappProduct } from '@/lib/whatsapp';
import PriceTag from './PriceTag';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './ProductDetail.module.css';

export default function ProductDetail({
  product,
}: {
  product: Product;
}) {
  const colors = product.colors ?? [];
  const [colorIndex, setColorIndex] = useState<number | null>(colors.length ? 0 : null);
  const selected = colorIndex !== null ? colors[colorIndex] : undefined;

  // Colour images are part of the gallery, so picking a colour moves the gallery.
  const gallery = useMemo(() => {
    const seen = new Set<string>();
    return [...product.images, ...colors.map((c) => c.image)].filter((src) => {
      if (seen.has(src)) return false;
      seen.add(src);
      return true;
    });
  }, [product.images, colors]);

  const [imageIndex, setImageIndex] = useState(0);
  const activeImage = gallery[imageIndex] ?? gallery[0];

  function chooseColor(i: number) {
    setColorIndex(i);
    const idx = gallery.indexOf(colors[i].image);
    if (idx >= 0) setImageIndex(idx);
  }

  const href = whatsappProduct(product, { color: selected?.name, url: productUrl(product) });
  const cta = product.priceUsd !== null ? 'Pedir por WhatsApp' : 'Consultar por WhatsApp';

  return (
    <div className={styles.layout}>
      <div className={styles.gallery}>
        <div className={styles.main}>
          <Image
            src={`/${activeImage}`}
            alt={`${product.name}${selected ? ` — ${selected.name}` : ''}`}
            fill
            priority
            sizes="(max-width: 880px) 100vw, 560px"
            className={styles.mainImg}
          />
        </div>
        {gallery.length > 1 ? (
          <div className={styles.thumbs} role="group" aria-label="Imágenes del producto">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`${styles.thumb} ${i === imageIndex ? styles.thumbOn : ''}`}
                onClick={() => setImageIndex(i)}
                aria-label={`Ver imagen ${i + 1} de ${gallery.length}`}
                aria-pressed={i === imageIndex}
              >
                <Image src={`/${src}`} alt="" fill sizes="64px" className={styles.thumbImg} />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.sku}>Ref. VTX-{String(product.id).padStart(3, '0')}</p>

        <div className={styles.priceBlock}>
          <PriceTag priceUsd={product.priceUsd} size="lg" />
        </div>

        {colors.length > 0 ? (
          <div className={styles.group}>
            <p className={styles.groupLabel}>
              Color: <span className={styles.groupValue}>{selected?.name}</span>
            </p>
            <div className={styles.swatchRow}>
              {colors.map((c, i) => (
                <button
                  key={c.image}
                  type="button"
                  className={`${styles.swatch} ${i === colorIndex ? styles.swatchOn : ''}`}
                  onClick={() => chooseColor(i)}
                  aria-pressed={i === colorIndex}
                >
                  <span className={styles.dot} style={{ backgroundColor: c.hex }} aria-hidden="true" />
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className={styles.group}>
          <p className={styles.groupLabel}>Compatible con</p>
          <div className={styles.tags}>
            {product.fitment.map((f) => (
              <span key={f} className={styles.tag}>
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.buy}>
          <a
            className={`btn btn-primary ${styles.buyBtn}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={20} />
            {cta}
            {product.priceUsd !== null ? ` · ${formatUsd(product.priceUsd)}` : ''}
          </a>
          <p className={styles.help}>
            ¿No sabe si le sirve a su moto? Mándenos el modelo por WhatsApp y le confirmamos antes
            de pagar.
          </p>
        </div>
      </div>

      <div className={styles.sticky}>
        <div className={styles.stickyPrice}>
          <PriceTag priceUsd={product.priceUsd} />
        </div>
        <a
          className={`btn btn-primary ${styles.stickyBtn}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={18} />
          {cta}
        </a>
      </div>
    </div>
  );
}
