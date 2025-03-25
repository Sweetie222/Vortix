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

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        minHeight: '350px',
      }}
    >
      {/* Top Section: Title, Image, Price */}
      <div>
        <h3
          style={{
            fontSize: '1.2rem',
            color: '#333',
            marginBottom: '10px',
            textAlign: 'center',
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

        {/* Price */}
        <p
          style={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          {product.price}
        </p>
      </div>

      {/* Bottom Section: Buttons (side-by-side, centered) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Centers horizontally
          gap: '10px',
          marginTop: 'auto', // Pushes buttons to bottom
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
              `https://wa.me/584147516607?text=Me%20gustaría%20saber%20más%20información%20de%20${encodeURIComponent(product.name)}`,
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