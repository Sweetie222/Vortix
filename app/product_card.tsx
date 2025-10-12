'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  ID: number;
  name: string;
  price: string;
  images?: string[]; // Mark as optional if some products may not have this property
  image?: string;    // Fallback if images array is not provided
}

export default function ProductCard({ product }: { product: Product }) {
  // Create an array of images; if product.images is not provided, use product.image (if available)
  const imageArray =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  // If there are no images at all, render a fallback message or a placeholder
  if (imageArray.length === 0) {
    return (
      <div
        style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h3>{product.name}</h3>
        <p>No image available</p>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers for arrow navigation
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? imageArray.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === imageArray.length - 1 ? 0 : prev + 1
    );
  };

  const handleBuyClick = () => {
    const whatsappUrl = `https://wa.me/584147516607?text=Me%20gustaría%20saber%20más%20información%20acerca%20de%20${encodeURIComponent(product.name)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <div
      className="product-card"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '25px',
        minHeight: '400px',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Top Section: Title, Image, Price */}
      <div>
        <h3
          style={{
            fontSize: '1.1rem',
            color: '#000000',
            marginBottom: '15px',
            textAlign: 'center',
            fontFamily: 'var(--font-orbitron)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {product.name}
        </h3>

        {/* Image Carousel Container */}
        <div style={{ marginBottom: '10px', textAlign: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '200px',
              height: '200px',
              margin: '0 auto',
            }}
          >
            <Image
              src={`/${imageArray[currentIndex]}`} // Display current image
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
            />

            {/* Only show arrows if more than one image */}
            {imageArray.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '-25px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    border: '2px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: '#333333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#333333';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.color = '#333333';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-25px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    border: '2px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: '#333333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#333333';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.color = '#333333';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>

        {/* Price */}
        <p
          style={{
            fontWeight: '700',
            fontSize: '1.3rem',
            color: '#000000',
            marginBottom: '15px',
            textAlign: 'center',
            fontFamily: 'var(--font-orbitron)',
          }}
        >
          {product.price}
        </p>
      </div>

      {/* Bottom Section: Buttons (side-by-side, centered) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: 'auto',
          position: 'relative',
          zIndex: 1000,
        }}
      >
        <button 
          style={{
            width: '100%',
            background: '#0080ff',
            color: '#ffffff',
            border: '2px solid #0080ff',
            borderRadius: '8px',
            padding: '14px 24px',
            cursor: 'pointer',
            fontWeight: '700',
            fontFamily: 'var(--font-orbitron)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.9rem',
            position: 'relative',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 128, 255, 0.3)',
          }}
          onClick={handleBuyClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 128, 255, 0.5)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 128, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}