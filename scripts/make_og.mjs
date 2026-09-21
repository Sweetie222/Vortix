/**
 * Default Open Graph card (1200x630). Next picks up app/opengraph-image.jpg by
 * file convention and applies it to every route that does not set its own,
 * so sharing the homepage in a WhatsApp group renders a real card.
 */
import sharp from 'sharp';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const W = 1200, H = 630;

const base = await sharp(path.join(ROOT, 'public/images/guyforbackground.png'))
  .resize(W, H, { fit: 'cover', position: 'top' })
  .modulate({ brightness: 0.55 })
  .toBuffer();

// Darken the left third so the emblem and the brand band stay legible.
const veil = Buffer.from(
  `<svg width="${W}" height="${H}">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
         <stop offset="0"   stop-color="#0B0B0C" stop-opacity="0.92"/>
         <stop offset="0.55" stop-color="#0B0B0C" stop-opacity="0.55"/>
         <stop offset="1"   stop-color="#0B0B0C" stop-opacity="0.35"/>
       </linearGradient>
     </defs>
     <rect width="${W}" height="${H}" fill="url(#g)"/>
     <rect x="0" y="${H - 10}" width="${W}" height="10" fill="#FF5A00"/>
   </svg>`,
);

const logo = await sharp(path.join(ROOT, 'public/Vortixlogo/VortixLogonobackground.png'))
  .resize(300, 300, { fit: 'inside' })
  .toBuffer();

await sharp(base)
  .composite([
    { input: veil, top: 0, left: 0 },
    { input: logo, top: Math.round((H - 300) / 2), left: 70 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(ROOT, 'app/opengraph-image.jpg'));

const { size } = await import('node:fs/promises').then((m) => m.stat(path.join(ROOT, 'app/opengraph-image.jpg')));
console.log(`app/opengraph-image.jpg  ${W}x${H}  ${(size / 1024).toFixed(0)}KB`);
