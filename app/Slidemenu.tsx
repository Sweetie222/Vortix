'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function SlideMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* HEADER */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9999,
          backgroundColor: '#fff',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Centers logo horizontally
        }}
      >
        {/* HAMBURGER / X TOGGLE BUTTON */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          style={{
            background: 'none',
            border: 'none',
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Top Line */}
          <span
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#fff',
              transition: '0.3s',
              transform: menuOpen
                ? 'rotate(45deg) translate(5px, 5px)'
                : 'none',
            }}
          />
          {/* Middle Line (disappears when open) */}
          <span
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#fff',
              transition: '0.3s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          {/* Bottom Line */}
          <span
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#fff',
              transition: '0.3s',
              transform: menuOpen
                ? 'rotate(-45deg) translate(5px, -5px)'
                : 'none',
            }}
          />
        </button>

        {/* LOGO (CENTER) */}
        <div>
          <Image
            src="/Vortixlogo/VortixLogonobackground.png" // Same logo path
            alt="VORTIX Logo"
            width={80}
            height={80}
            style={{ objectFit: 'contain' }}
            unoptimized={true}
          />
        </div>
      </header>

      {/* DROPDOWN MENU PANEL (Vertical, half screen) */}
      <div
        style={{
          position: 'fixed',
          top: '80px', // Immediately below the header
          left: 0,
          width: '100%',
          height: '50vh', // Half of the viewport height
          backgroundColor: '#818d8d',
          color: '#fff',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-50vh)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 9998,
          padding: '20px',
        }}
      >
        {/* NAVIGATION LINKS as a vertical list */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <a
            href="#products"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
            onClick={toggleMenu}
          >
            Accesorios
          </a>
          <a
            href="#contact"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
            onClick={toggleMenu}
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  );
}
