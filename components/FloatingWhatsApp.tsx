import { SITE } from '@/lib/site';
import { whatsappGeneral } from '@/lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './FloatingWhatsApp.module.css';

export default function FloatingWhatsApp() {
  return (
    /* fab-wrap is positioned in globals.css: it must be `fixed` so it never
       becomes a scroll target for the App Router's navigation handler, which
       walks top-level nodes and would otherwise scroll to this element at the
       very bottom of the document. */
    <aside className="fab-wrap" aria-label="Contacto rápido">
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
