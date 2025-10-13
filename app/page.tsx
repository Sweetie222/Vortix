'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { Analytics } from "@vercel/analytics/react"
import products from '../data/productos.json'; // Adjust path as needed
import ProductCard from './product_card';
import SlideMenu from './Slidemenu';
import FilterDropdown from './FilterDropdown';
import { filterProducts, normalizeCategory, type Category } from './filters.types';

export default function MyMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Filter state
  const [selected, setSelected] = useState<Category | "Todos">(() => {
    // Lee ?cat= de la URL al cargar (client-side)
    if (typeof window === "undefined") return "Todos";
    const qs = new URLSearchParams(window.location.search);
    const cat = qs.get("cat");
    return (cat as Category) ?? "Todos";
  });

  // Filtrar productos
  const filteredProducts = useMemo(
    () => filterProducts(products as any, { selected }),
    [selected]
  );

  return (
    <>
      {/* Scanline Effect */}
      <div className="scanline" />
      
      {/* Slide-in Menu (Hamburger + Overlay) */}
      <SlideMenu />

      {/* Main Content */}
      <main style={{ position: 'relative' }}>
        {/* HERO SECTION - Futuristic Full Screen */}
        <section
          style={{
            position: 'relative',
            minHeight: '100vh',
            marginTop: '50px',
            color: '#000',
            background: 'url("/images/guyforbackground.png") center top/cover no-repeat, #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',            overflow: 'hidden',
          }}
        >
          {/* Mobile responsive styles */}
          <style jsx>{`
            @media (max-width: 768px) {
              section {
                min-height: 90vh !important;
                padding: 60px 15px 40px !important;
              }
            }
          `}</style>
          {/* Animated Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Grid Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 
                'linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Light Streaks Effect */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(128, 128, 128, 0.1) 0%, transparent 70%)',
              animation: 'float 8s ease-in-out infinite',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* HERO CONTENT */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
            <h1
              style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                fontFamily: 'var(--font-audiowide)',
                marginBottom: '30px',
                color: '#ffffff',
                letterSpacing: '0.1em',
              }}
            >
              VORTIX
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                lineHeight: '1.8',
                marginBottom: '50px',
                fontFamily: 'var(--font-inter)',
                color: '#ffffff',
                maxWidth: '700px',
                margin: '0 auto 50px',              }}
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
                background: '#0080ff',
                color: '#ffffff',
                padding: '16px 48px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '700',
                fontFamily: 'var(--font-orbitron)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                border: '2px solid #0080ff',                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.background = '#555555';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = '#666666';
              }}
            >
              Contactar
            </a>
          </div>
        </section>

        {/* PRODUCTS SECTION - Cyberpunk Grid */}
        <section
          id="products"
          style={{
            padding: '80px 20px',
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            background: '#ffffff',
          }}
        >
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                marginBottom: '20px',
                fontFamily: 'var(--font-audiowide)',
                textAlign: 'center',
                color: '#000000',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Accesorios
            </h2>
            <div
              style={{
                width: '150px',
                height: '3px',
                background: '#0080ff',
                margin: '0 auto',
              }}
            />
          </div>

          {/* Filter Dropdown */}
          <Suspense fallback={
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur px-3 py-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm bg-white">
                <span className="text-gray-700">Cargando filtros...</span>
              </div>
            </div>
          }>
            <FilterDropdown value={selected} onChange={setSelected} />
          </Suspense>

          {/* Products Grid - MercadoLibre Style */}
          <div
            id="productos-grid"
            aria-live="polite"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '16px',
              position: 'relative',
              zIndex: 10,
              marginTop: '20px',
            }}
          >
            <style jsx>{`
              @media (min-width: 1200px) {
                div {
                  grid-template-columns: repeat(5, 1fr) !important;
                }
              }
              @media (min-width: 768px) and (max-width: 1199px) {
                div {
                  grid-template-columns: repeat(3, 1fr) !important;
                }
              }
              @media (min-width: 480px) and (max-width: 767px) {
                div {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
              @media (max-width: 479px) {
                div {
                  grid-template-columns: repeat(3, 1fr) !important;
                  gap: 8px !important;
                }
              }
            `}</style>
            {filteredProducts.map((product) => (
              <ProductCard key={product.ID} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER - Responsive */}
      <footer>
        <style jsx>{`
          @media (max-width: 768px) {
            .footer-section {
              padding: 40px 15px !important;
            }
            .footer-content {
              gap: 30px !important;
            }
            .footer-logo {
              width: 180px !important;
              margin: 0 auto !important;
              display: block !important;
            }
            .footer-contact {
              margin-left: 0 !important;
            }
            .footer-title {
              font-size: 1.75rem !important;
              margin-bottom: 20px !important;
              text-align: center !important;
            }
          }
          @media (max-width: 480px) {
            .footer-section {
              padding: 30px 15px !important;
            }
            .footer-content {
              gap: 20px !important;
            }
            .footer-logo {
              width: 150px !important;
            }
            .footer-title {
              font-size: 1.5rem !important;
            }
          }
        `}</style>
        <section 
          id="contact"
          className="footer-section"
        style={{
          background: 'rgba(128, 128, 128, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          padding: '60px 20px',
          position: 'relative',
          overflow: 'hidden',
        }}
        >
          {/* Background Grid */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 
                'linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />

          <div
            className="footer-content"
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '40px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Left Column: Logo */}
            <div style={{ flex: '0 0 auto', marginBottom: '20px' }}>
              <img
                src="/Vortixlogo/VortixLogonobackground.png"
                alt="VORTIX Footer Logo"
                className="footer-logo"
                style={{ 
                  width: '250px', 
                  height: 'auto', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1))',
                }}
              />
            </div>

            {/* Right Column: Contact Info */}
            <div 
              className="footer-contact"
              style={{ 
                flex: '1 1 auto', 
                marginLeft: '40px',
                minWidth: '250px',
              }}
            >
              <h2
                className="footer-title"
                style={{
                  color: '#000000',
                  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                  fontFamily: 'var(--font-orbitron)',
                  marginBottom: '30px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                Contáctanos
              </h2>

              {/* Dirección */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ 
                  color: '#000000', 
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-orbitron)',
                  fontWeight: '600',
                  fontSize: '1rem',
                }}>
                  <strong>Dirección:</strong>
                </p>
                <p style={{ margin: 0 }}>
                  <a
                    href="https://www.google.com/maps/place/Vortix/@7.7992701,-72.2417878,18z/data=..."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#333333', 
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#0080ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#333333';
                    }}
                  >
                    Barrancas Parte Alta Calle El Mirador #1-18
                  </a>
                </p>
              </div>

              {/* Correo electrónico */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ 
                  color: '#000000', 
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-orbitron)',
                  fontWeight: '600',
                  fontSize: '1rem',
                }}>
                  <strong>Correo electrónico:</strong>
                </p>
                <p style={{ margin: 0 }}>
                  <a
                    href="mailto:vortixaccesoriosyrepuestos@gmail.com"
                    style={{ 
                      color: '#333333', 
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#0080ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#333333';
                    }}
                  >
                    vortixaccesoriosyrepuestos@gmail.com
                  </a>
                </p>
              </div>

              {/* Número telefónico */}
              <div style={{ marginBottom: '30px' }}>
                <p style={{ 
                  color: '#000000', 
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-orbitron)',
                  fontWeight: '600',
                  fontSize: '1rem',
                }}>
                  <strong>Número telefónico:</strong>
                </p>
                <p style={{ margin: 0 }}>
                  <a
                    href="https://wa.me/584147516607?text=Vi%20tu%20página%20web%20y%20me%20interesa%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#333333', 
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#0080ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#333333';
                    }}
                  >
                    +58 414-7516607
                  </a>
                </p>
              </div>

              {/* Follow Us */}
              <div style={{ textAlign: 'left' }}>
                <h3
                  style={{
                    color: '#000000',
                    fontSize: '1.5rem',
                    marginTop: '30px',
                    marginBottom: '20px',
                    fontFamily: 'var(--font-orbitron)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Síguenos
                </h3>

                <div style={{ display: 'flex', gap: '20px' }}>
                  {/* Facebook Icon */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61572657137720&mibextid=ZbWKwL"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      border: '2px solid rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    <img
                      src="/images/fbicon.jpg"
                      alt="Facebook"
                      style={{ 
                        width: '30px', 
                        height: '30px',
                        borderRadius: '50%',
                      }}
                    />
                  </a>

                  {/* Instagram Icon */}
                  <a
                    href="https://www.instagram.com/vortixpartsandaccesories?igsh=MW1rMWJxMWpsYzV4dw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      border: '2px solid rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    <img
                      src="/images/iglogo.png"
                      alt="Instagram"
                      style={{ 
                        width: '30px', 
                        height: '30px',
                        borderRadius: '50%',
                      }}
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
