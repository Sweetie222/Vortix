import Image from 'next/image';
import Link from 'next/link';
import { whatsappGeneral } from '@/lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './Hero.module.css';

export default function Hero() {
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
        <h1 className={styles.title}>Accesorios y repuestos para moto</h1>
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
