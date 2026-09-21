import { formatUsd } from '@/lib/format';
import styles from './PriceTag.module.css';

/** Prices are published in US dollars only. */
export default function PriceTag({
  priceUsd,
  size = 'md',
  align = 'start',
}: {
  priceUsd: number | null;
  size?: 'md' | 'lg';
  align?: 'start' | 'center';
}) {
  if (priceUsd === null) {
    return <p className={styles.consult}>Consultar precio</p>;
  }
  return (
    <p
      className={`${size === 'lg' ? styles.blockLg : styles.block} ${
        align === 'center' ? styles.center : ''
      }`}
    >
      <span className={`price ${styles.usd}`}>{formatUsd(priceUsd)}</span>
    </p>
  );
}
