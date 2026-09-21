import { SITE } from './site';
import { formatUsd } from './format';
import type { Product } from './catalog';

/**
 * Copy register note: Tachira is ustedeo territory, where "usted" is the warm
 * everyday form, while the rest of the country expects tuteo. Every string here
 * is written in the neutral infinitive/first-person, which has no second person
 * at all and so reads correctly in both.
 */

function link(text: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Generic enquiry, for the header and the floating button. */
export function whatsappGeneral(): string {
  return link(`Hola ${SITE.name} 👋 Tengo una consulta.`);
}

/**
 * Product enquiry. Carries the name, the colour and the price so the first
 * reply can be an answer instead of "¿cuál?" and "¿cuánto?".
 * WhatsApp renders *asterisks* as bold, so the product name stands out in a
 * busy inbox.
 */
export function whatsappProduct(product: Product, opts: { color?: string; url?: string } = {}): string {
  const lines = [`Hola ${SITE.name} 👋`, '', 'Quiero pedir:'];
  lines.push(`*${product.name}*${opts.color ? ` — ${opts.color}` : ''}`);
  if (product.priceUsd !== null) lines.push(`Precio: ${formatUsd(product.priceUsd)}`);
  if (opts.url) lines.push(opts.url);
  lines.push('', product.priceUsd === null ? '¿Cuál es el precio?' : '¿Está disponible?');
  return link(lines.join('\n'));
}

export function productUrl(product: Product): string {
  return `${SITE.url}/productos/${product.slug}`;
}
