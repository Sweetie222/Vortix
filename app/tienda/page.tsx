import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import JsonLd from '@/components/JsonLd';
import { ADDRESS_ONE_LINE, SITE } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: `Tienda en ${SITE.address.locality}, ${SITE.address.region}`,
  description: `VORTIX queda en ${ADDRESS_ONE_LINE}. Accesorios y repuestos para moto en ${SITE.address.municipality}, cerca de Táriba y San Cristóbal.`,
  alternates: { canonical: '/tienda' },
};

export default function TiendaPage() {
  const trail = [{ name: 'Inicio', href: '/' }, { name: 'Tienda' }];

  return (
    <>
      <Header />
      <main id="contenido">
        <div className="container">
          <Breadcrumbs trail={trail} />
        </div>
        <StoreCard heading="h1" />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, url: t.href ? `${SITE.url}${t.href}` : undefined })),
        )}
      />
    </>
  );
}
