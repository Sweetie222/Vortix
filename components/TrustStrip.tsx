import { PRODUCTS } from '@/lib/catalog';
import { SITE } from '@/lib/site';
import styles from './TrustStrip.module.css';

/**
 * Every claim here is one we can stand behind from the shop's own published
 * details. Nothing about shipping, warranty, hours or payment rails appears
 * until the owner confirms them — an unverifiable trust badge is worse than none.
 */
const ITEMS = [
  { label: 'Tienda física', note: `${SITE.address.locality}, ${SITE.address.region}` },
  { label: 'Precio a la vista', note: 'Todos los precios en dólares' },
  { label: 'Atención por WhatsApp', note: 'Respuesta directa, sin formularios' },
  { label: `${PRODUCTS.length} productos`, note: 'Todo el catálogo publicado' },
];

export default function TrustStrip() {
  return (
    <section className={styles.strip} aria-label="Por qué comprar en VORTIX">
      <div className="container">
        <ul className={styles.list}>
          {ITEMS.map((item) => (
            <li key={item.label}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.note}>{item.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
