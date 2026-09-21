import { ADDRESS_ONE_LINE, SITE } from '@/lib/site';
import { whatsappGeneral } from '@/lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './StoreCard.module.css';

export default function StoreCard({ heading = 'h2' }: { heading?: 'h1' | 'h2' }) {
  const Heading = heading;
  return (
    <section className={styles.section} id="tienda">
      <div className={`container ${styles.inner}`}>
        <div>
          <Heading className={styles.title}>Visítenos en {SITE.address.locality}</Heading>
          <address className={styles.address}>
            <span className={styles.strong}>{SITE.address.street}</span>
            <br />
            {SITE.address.locality}, {SITE.address.municipality}, estado {SITE.address.region}
            <br />
            <span className="visually-hidden">{ADDRESS_ONE_LINE}</span>
          </address>
          <div className={styles.actions}>
            <a
              className="btn btn-secondary"
              href={SITE.maps}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar
            </a>
            <a
              className="btn btn-primary"
              href={whatsappGeneral()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
