/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Product tiles are small; there is no point generating 3840px variants.
    imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 384],
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1920],
  },
};

module.exports = nextConfig;
