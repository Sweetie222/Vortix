import Image from 'next/image';
import Link from 'next/link';
import { activeCategories } from '@/lib/catalog';
import { SITE } from '@/lib/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Image
              src="/Vortixlogo/VortixLogonobackground.png"
              alt="VORTIX — accesorios y repuestos para moto"
              width={132}
              height={132}
              className={styles.logo}
              sizes="132px"
            />
            <p className={styles.blurb}>
              Accesorios y repuestos para moto en {SITE.address.locality},{' '}
              {SITE.address.municipality}, estado {SITE.address.region}.
            </p>
            <div className={styles.social}>
              <a
                className={styles.socialLink}
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VORTIX en Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                className={styles.socialLink}
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VORTIX en Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-cat">
            <h2 className={styles.heading} id="footer-cat">
              Catálogo
            </h2>
            <ul className={styles.list}>
              <li>
                <Link className={styles.link} href="/productos">
                  Todos los productos
                </Link>
              </li>
              {activeCategories().map((c) => (
                <li key={c.slug}>
                  <Link className={styles.link} href={`/categoria/${c.slug}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.heading}>Contacto</h2>
            <address className={styles.address}>
              <a className={styles.link} href={SITE.maps} target="_blank" rel="noopener noreferrer">
                {SITE.address.street}
                <br />
                {SITE.address.locality}, {SITE.address.municipality}
                <br />
                Estado {SITE.address.region}, {SITE.address.countryName}
              </a>
              <br />
              <br />
              <a className={styles.link} href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
                {SITE.phone}
              </a>
              <br />
              <a className={styles.link} href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </address>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} <span translate="no">{SITE.legalName}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
