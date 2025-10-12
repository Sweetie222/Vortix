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
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      {/* HEADER - Ultra Compact Black Navbar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9999,
          background: '#000000',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* HAMBURGER / X TOGGLE BUTTON */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3px',
            padding: '5px',
            transition: 'all 0.3s ease',
            boxShadow: menuOpen ? '0 2px 8px rgba(255, 255, 255, 0.2)' : '0 0 10px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Top Line */}
          <span
            style={{
              width: '100%',
              height: '1.5px',
              backgroundColor: '#ffffff',
              transition: '0.3s',
              transform: menuOpen
                ? 'rotate(45deg) translate(3px, 3px)'
                : 'none',
              boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
            }}
          />
          {/* Middle Line (disappears when open) */}
          <span
            style={{
              width: '100%',
              height: '1.5px',
              backgroundColor: '#ffffff',
              transition: '0.3s',
              opacity: menuOpen ? 0 : 1,
              boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
            }}
          />
          {/* Bottom Line */}
          <span
            style={{
              width: '100%',
              height: '1.5px',
              backgroundColor: '#ffffff',
              transition: '0.3s',
              transform: menuOpen
                ? 'rotate(-45deg) translate(3px, -3px)'
                : 'none',
              boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
            }}
          />
        </button>

        {/* LOGO (CENTER) with Glow */}
        <div
          style={{
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)) brightness(1.2)',
            transition: 'filter 0.3s ease',
          }}
        >
          <Image
            src="/Vortixlogo/VortixLogonobackground.png"
            alt="VORTIX Logo"
            width={42}
            height={42}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </header>

      {/* DROPDOWN MENU PANEL - Glassmorphic Slide */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50px',
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            width: '100%',
            height: '50vh',
            color: '#ffffff',
            zIndex: 10000,
            padding: '50px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            animation: 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
        {/* NAVIGATION LINKS */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          <a
            href="#products"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '2rem',
              fontWeight: '700',
              fontFamily: 'var(--font-orbitron)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              position: 'relative',
              paddingLeft: '20px',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            }}
            onClick={toggleMenu}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0080ff';
              e.currentTarget.style.paddingLeft = '30px';
              e.currentTarget.style.textShadow = '0 0 20px rgba(0, 128, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.paddingLeft = '20px';
              e.currentTarget.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
            }}
          >
            Accesorios
          </a>
          <a
            href="#contact"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '2rem',
              fontWeight: '700',
              fontFamily: 'var(--font-orbitron)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              position: 'relative',
              paddingLeft: '20px',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            }}
            onClick={toggleMenu}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0080ff';
              e.currentTarget.style.paddingLeft = '30px';
              e.currentTarget.style.textShadow = '0 0 20px rgba(0, 128, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.paddingLeft = '20px';
              e.currentTarget.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
            }}
          >
            Contact
          </a>
        </nav>
        </div>
      )}
    </>
  );
}
