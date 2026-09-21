/**
 * Single source of truth for everything that appears in metadata, structured
 * data and the footer.
 *
 * The shop's postal address, coordinates and map link are deliberately not
 * published. Anything location-derived (LocalBusiness/AutoPartsStore schema,
 * geo, areaServed, "en Táchira" in titles) is therefore absent too.
 */
export const SITE = {
  name: 'VORTIX',
  legalName: 'VORTIX Accesorios y Repuestos',
  /** Change this one line when the .com.ve domain is registered. */
  url: 'https://vortix-rho.vercel.app',
  locale: 'es_VE',
  lang: 'es-VE',
  description:
    'Accesorios y repuestos para moto: cascos, trancas de disco, bombillos LED, chapaletas, defensas mataperro y más. Precios en dólares a la vista. Pedidos por WhatsApp.',
  phone: '+58 414-7516607',
  phoneE164: '+584147516607',
  whatsapp: '584147516607',
  email: 'vortixaccesoriosyrepuestos@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/vortixpartsandaccesories',
    facebook: 'https://www.facebook.com/profile.php?id=61572657137720',
  },
} as const;
