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
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px',
        minHeight: 'auto',
        position: 'relative',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Top Section: Title, Image, Price */}
      <div>
        {/* Image Carousel Container */}
        <div style={{ marginBottom: '12px', textAlign: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '100%',
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

        {/* Product Title */}
        <h3
          style={{
            fontSize: '0.875rem',
            color: '#000000',
            marginBottom: '8px',
            textAlign: 'left',
            fontFamily: 'var(--font-inter)',
            fontWeight: '400',
            lineHeight: '1.2',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.4em',
          }}
        >
          {product.name}
        </h3>

        {/* Price */}
        <p
          style={{
            fontWeight: '400',
            fontSize: '1.5rem',
            color: '#000000',
            marginBottom: '8px',
            textAlign: 'left',
            fontFamily: 'var(--font-inter)',
          }}
        >
          {product.price}
        </p>
      </div>

      {/* Bottom Section: Buy Button */}
      <div
        style={{
          marginTop: '12px',
        }}
      >
        <button 
          style={{
            width: '100%',
            background: '#3483fa',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 16px',
            cursor: 'pointer',
            fontWeight: '600',
            fontFamily: 'var(--font-inter)',
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
          }}
          onClick={handleBuyClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2968c8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#3483fa';
          }}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}