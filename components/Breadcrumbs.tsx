import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

export type Crumb = { name: string; href?: string };

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav className={styles.nav} aria-label="Ruta de navegación">
      <ol className={styles.list}>
        {trail.map((c, i) => (
          <li key={c.name}>
            {c.href ? (
              <Link className={styles.link} href={c.href}>
                {c.name}
              </Link>
            ) : (
              <span className={styles.current} aria-current="page">
                {c.name}
              </span>
            )}
            {i < trail.length - 1 ? (
              <span className={styles.sep} aria-hidden="true">
                {' '}
                ›
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
