'use client';

import { useState } from 'react';
import products from '../data/productos.json';
import ProductCard from './product_card';
import SlideMenu from './Slidemenu';

export default function MyMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const basePath = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

  return (
    <>
      <SlideMenu />

      <main style={{ fontFamily: 'sans-serif' }}>
        <section
          style={{
            position: 'relative',
            minHeight: '500px',
            color: '#fff',
            backgroundColor: 'black',
            backgroundImage: `url("${basePath}/images/guyforbackground.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '50px 20px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 1,
            }}
          />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
            <h1 style={{ fontSize: '5rem', fontFamily: '"Reesha", cursive', marginBottom: '20px' }}>
              VORTIX
            </h1>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.5', marginBottom: '50px' }}>
              En Vortix somos una empresa dedicada a ofrecer accesorios y repuestos
              de alta calidad, pensados para potenciar el estilo y la funcionalidad
              de tu moto. Con un enfoque innovador y personalizado, te asesoramos
              en cada paso para que encuentres justo lo que necesitas.
            </p>
            <a
              href="https://wa.me/584147516607?text=Vi%20tu%20página%20web%20y%20me%20interesa%20"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#818d8d',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Contactar
            </a>
          </div>
        </section>

        <section
          id="products"
          style={{
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              fontSize: '5rem',
              marginBottom: '20px',
              fontFamily: 'Reesha, cursive',
              textAlign: 'center',
            }}
          >
            Accesorios
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.ID} product={product} />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <section 
          id="contact"
          style={{
            backgroundColor: '#818d8d',
            padding: '40px 20px',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
            }}
          >
            <div style={{ flex: '0 0 auto' }}>
              <img
                src={`${basePath}/Vortixlogo/VortixLogonobackground.png`}
                alt="VORTIX Footer Logo"
                style={{ width: '250px', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            <div style={{ flex: '1 1 auto', marginLeft: '40px' }}>
              <h2
                style={{
                  color: '#000',
                  fontSize: '3rem',
                  fontFamily: '"Reesha", cursive',
                  marginBottom: '20px',
                }}
              >
                Contáctanos
              </h2>
              <p style={{ color: '#000', margin: '0px 3px' }}>
                <strong>Dirección:</strong>{' '}
                <a
                  href="https://www.google.com/maps/place/Vortix/@7.7992701,-72.2417878,18z/data=..."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  Barrancas Parte Alta Calle El Mirador #1-18
                </a>
              </p>
              <p style={{ color: '#000', margin: '0px 3px' }}>
                <strong>Correo electrónico:</strong>{' '}
                <a
                  href="mailto:vortixaccesoriosyrepuestos@gmail.com"
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  vortixaccesoriosyrepuestos@gmail.com
                </a>
              </p>
              <p style={{ color: '#000', margin: '0px 3px' }}>
                <strong>Número telefónico:</strong>{' '}
                <a
                  href="https://wa.me/584147516607?text=Vi%20tu%20página%20web%20y%20me%20interesa%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  +58 414-7516607
                </a>
              </p>

              <div style={{ textAlign: 'left' }}>
                <h2
                  style={{
                    color: '#000',
                    fontSize: '1.5rem',
                    marginTop: '30px',
                    fontFamily: '"Reesha", cursive',
                  }}
                >
                  Síguenos
                </h2>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <a
                    href="https://www.facebook.com/profile.php?id=61572657137720&mibextid=ZbWKwL"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    <img
                      src={`${basePath}/images/fbicon.jpg`}
                      alt="Facebook"
                      style={{ width: '40px', height: '40px' }}
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/vortixpartsandaccesories?igsh=MW1rMWJxMWpsYzV4dw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    <img
                      src={`${basePath}/images/iglogo.png`}
                      alt="Instagram"
                      style={{ width: '40px', height: '40px' }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
