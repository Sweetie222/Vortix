'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  ID: number;
  name: string;
  price: string;
  images: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  const { name, price, images } = product;
  const basePath = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        minHeight: '150px',
        maxHeight: '450px'
      }}
    >
      <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#333', fontWeight: 'bold' }}>
        {name}
      </h3>

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
            src={`${basePath}/${images[currentIndex]}`}
            alt={name}
            fill
            style={{ objectFit: 'contain' }}
            unoptimized={true}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '-25px',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
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
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                }}
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      <p style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
        {price}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: 'auto',
        }}
      >
        <button 
          style={{
            width: '50%',
            backgroundColor: '#818d8d',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginBottom: 'auto',
          }}
          onClick={() => {
            window.open(
              `https://wa.me/584147516607?text=Me%20gustaría%20saber%20más%20información%20de%20${encodeURIComponent(name)}`,
              '_blank'
            );
          }}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
