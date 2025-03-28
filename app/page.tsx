'use client';

import { useState } from 'react';
import { Analytics } from "@vercel/analytics/react"
import products from '../data/productos.json'; // Adjust path as needed
import ProductCard from './product_card';
import SlideMenu from './Slidemenu';

export default function MyMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Slide-in Menu (Hamburger + Overlay) */}
      <SlideMenu />

      {/* Main Content */}
      <main style={{ fontFamily: 'sans-serif' }}>
        {/* HERO SECTION */}
        <section
          style={{
            position: 'relative',
            // Make hero taller:
            minHeight: '600px',
            // Push content below the header:
            marginTop: '50px',
            color: '#fff',
            backgroundColor: 'black',
            backgroundImage: 'url("/images/guyforbackground.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '100px 100px',
          }}
        >
          {/* Optional dark overlay */}
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

          {/* HERO CONTENT */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
            <h1
              style={{
                fontSize: '5rem',
                fontFamily: '"Reesha", cursive',
                marginBottom: '20px',
              }}
            >
              VORTIX
            </h1>
            <p
              style={{
                fontSize: '1.2rem',
                lineHeight: '1.5',
                marginBottom: '50px',
              }}
            >
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

        {/* PRODUCTS SECTION */}
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

      {/* FOOTER */}
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
    // Force side-by-side columns:
    flexWrap: 'nowrap',
    // (Optional) allow horizontal scrolling if it doesn't fit:
    overflowX: 'auto',
  }}
>
      {/* Left Column: Logo */}
      <div style={{ flex: '0 0 auto', marginBottom: '20px' }}>
        <img
          src="/Vortixlogo/VortixLogonobackground.png"
          alt="VORTIX Footer Logo"
          style={{ width: '250px', height: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Right Column: Contact Info */}
      <div style={{ 
        flex: '1 1 auto', 
        marginLeft: '40px',
        // Optional: set a minimum width to avoid text cramming
        minWidth: '250px',
      }}>
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

            {/* Dirección */}
            <p style={{ color: '#000', margin: '0px 3px' }}>
              <strong>Dirección:</strong>{' '} </p>
              <p><a
                href="https://www.google.com/maps/place/Vortix/@7.7992701,-72.2417878,18z/data=..."
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                Barrancas Parte Alta Calle El Mirador #1-18
              </a></p>
            

            {/* Correo electrónico */}
            <p style={{ color: '#000', margin: '0px 3px' }}>
              <strong>Correo electrónico:</strong>{' '}</p>
              <p><a
                href="mailto:vortixaccesoriosyrepuestos@gmail.com"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                vortixaccesoriosyrepuestos@gmail.com
              </a> </p>

            {/* Número telefónico */}
            <p style={{ color: '#000', margin: '0px 3px' }}>
              <strong>Número telefónico:</strong>{' '}</p>
             <p> <a
                href="https://wa.me/584147516607?text=Vi%20tu%20página%20web%20y%20me%20interesa%20"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                +58 414-7516607
              </a>
            </p>

            {/* Follow Us */}
            <div style={{ textAlign: 'left' }}>
              <h2
                style={{
                  color: '#000',
                  fontSize: '1.5rem',
                  marginTop: '30px',
                  fontFamily: '"Reesha", cursive',
                }}
              >
Síguenos              </h2>

              <div style={{ display: 'flex', gap: '20px' }}>
                {/* Facebook Icon */}
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
                    src="/images/fbicon.jpg"
                    alt="Facebook"
                    style={{ width: '40px', height: '40px' }}

                  />
                </a>

                {/* Instagram Icon */}
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
                    src="/images/iglogo.png"
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
