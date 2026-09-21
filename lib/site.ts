/**
 * Single source of truth for everything that appears in metadata, structured
 * data and the footer. Keeping one canonical NAP string matters: local ranking
 * and AI citation both depend on the same name/address/phone appearing
 * byte-for-byte across the site, Google Business Profile and directories.
 */
export const SITE = {
  name: 'VORTIX',
  legalName: 'VORTIX Accesorios y Repuestos',
  /** Change this one line when the .com.ve domain is registered. */
  url: 'https://vortix-rho.vercel.app',
  locale: 'es_VE',
  lang: 'es-VE',
  description:
    'Accesorios y repuestos para moto en Barrancas, Municipio Cárdenas, estado Táchira. Cascos, trancas de disco, bombillos LED, chapaletas, defensas mataperro y más. Pedidos por WhatsApp.',
  phone: '+58 414-7516607',
  phoneE164: '+584147516607',
  whatsapp: '584147516607',
  email: 'vortixaccesoriosyrepuestos@gmail.com',
  address: {
    street: 'Calle El Mirador #1-18, Barrancas Parte Alta',
    locality: 'Barrancas',
    municipality: 'Municipio Cárdenas',
    region: 'Táchira',
    country: 'VE',
    countryName: 'Venezuela',
  },
  geo: { lat: 7.7992701, lng: -72.2417878 },
  maps: 'https://www.google.com/maps?q=7.7992701,-72.2417878',
  social: {
    instagram: 'https://www.instagram.com/vortixpartsandaccesories',
    facebook: 'https://www.facebook.com/profile.php?id=61572657137720',
  },
  /** Towns we can honestly say we are near. Not a shipping claim. */
  areaServed: ['Táriba', 'San Cristóbal', 'Palmira', 'Municipio Cárdenas', 'Táchira'],
} as const;

export const ADDRESS_ONE_LINE = `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.municipality}, ${SITE.address.region}, ${SITE.address.countryName}`;
