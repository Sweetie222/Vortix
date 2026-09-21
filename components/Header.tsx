'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/site';
import { whatsappGeneral } from '@/lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './Header.module.css';

const NAV = [{ href: '/productos', label: 'Catálogo' }];

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand}>
            <Image
              src="/Vortixlogo/VortixLogonobackground.png"
              alt=""
              width={36}
              height={36}
              className={styles.mark}
              priority
            />
            <span>
              <span className={styles.wordmark} translate="no">
                VORTIX
              </span>
              <span className={styles.tagline}>Accesorios y repuestos</span>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Principal">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navLink}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            className={styles.cta}
            href={whatsappGeneral()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            <span className={styles.ctaLabel}>WhatsApp</span>
            <span className="visually-hidden">Escribir a {SITE.name} por WhatsApp</span>
          </a>
          </div>
      </header>
    </>
  );
}
