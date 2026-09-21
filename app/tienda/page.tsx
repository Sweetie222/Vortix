import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoreCard from '@/components/StoreCard';
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
      <main id="contenido">
        <div className="container">
          <Breadcrumbs trail={trail} />
        </div>
        <StoreCard heading="h1" />
      </main>
      <JsonLd
        data={breadcrumbSchema(
          trail.map((t) => ({ name: t.name, url: t.href ? `${SITE.url}${t.href}` : undefined })),
        )}
      />
    </>
  );
}
