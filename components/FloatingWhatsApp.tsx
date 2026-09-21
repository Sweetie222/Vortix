import { SITE } from '@/lib/site';
import { whatsappGeneral } from '@/lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './FloatingWhatsApp.module.css';

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="Contacto rápido">
      <a
      className={styles.fab}
      href={whatsappGeneral()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir a ${SITE.name} por WhatsApp`}
    >
        <WhatsAppIcon size={24} />
      </a>
    </aside>
  );
}
