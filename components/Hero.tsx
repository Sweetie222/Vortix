import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { whatsappGeneral } from '@/lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './Hero.module.css';

export default function Hero({ productCount }: { productCount: number }) {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/guyforbackground.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.img}
      />
      <div className={styles.scrim} />
      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow ${styles.eyebrowOnDark}`}>
          {SITE.address.locality} · {SITE.address.municipality} · {SITE.address.region}
        </p>
        <h1 className={styles.title}>Accesorios y repuestos para moto</h1>
        <p className={styles.sub}>
          {productCount} productos con el precio a la vista. Tienda física en{' '}
          {SITE.address.locality} y pedidos por WhatsApp.
        </p>
        <div className={styles.actions}>
          <Link className="btn btn-onDark" href="/productos">
            Ver el catálogo
          </Link>
          <a
            className="btn btn-secondary"
            style={{ color: '#fff', borderColor: 'rgb(255 255 255 / 45%)' }}
            href={whatsappGeneral()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
