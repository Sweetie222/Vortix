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
          backgroundColor: '#818d8d',
          height: '50px', // Reduced from 80px
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
            left: '25px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            width: '30px', // Reduced from 40px
            height: '20px', // Reduced from 40px
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
              height: '2px', // Reduced from 4px
              backgroundColor: '#fff',
              transition: '0.3s',
              transform: menuOpen
                ? 'rotate(50deg) translate(2.5px, 13px)'
                : 'none',
            }}
          />
          {/* Middle Line (disappears when open) */}
          <span
            style={{
              width: '100%',
              height: '2px', // Reduced from 4px
              backgroundColor: '#fff',
              transition: '0.3s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          {/* Bottom Line */}
          <span
            style={{
              width: '100%',
              height: '2px', // Reduced from 4px
              backgroundColor: '#fff',
              transition: '0.3s',
              transform: menuOpen
                ? 'rotate(-50deg) translate(0px, -13px)'
                : 'none',
            }}
          />
        </button>

        {/* LOGO (CENTER) */}
        <div>
          <Image
            src="/Vortixlogo/VortixLogonobackground.png" // Same logo path
            alt="VORTIX Logo"
            width={50} // Reduced from 80
            height={50} // Reduced from 80
            style={{ objectFit: 'contain' }}
          />
        </div>
      </header>

      {/* DROPDOWN MENU PANEL (Full viewport) */}
      <div
        style={{
          position: 'fixed', // Changed from absolute
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: '100%',
          height: '50vh', // Changed from '0vh' to full viewport height
          color: '#fff',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-50vh)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 9998,
          padding: '90px 35px', // Added padding
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
