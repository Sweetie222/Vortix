// next.config.ts
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  basePath: isProd ? '/my-portfolio' : '',       // Your repo name as the base path
  assetPrefix: isProd ? '/my-portfolio/' : '',   // Same repo name with a trailing slash
  trailingSlash: true,       
  images: {
    loader: 'akamai',
    path: isProd ? '/my-portfolio/' : '/',
  }                    // Recommended for static export on GH Pages
};
