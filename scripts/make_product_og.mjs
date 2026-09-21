/**
 * Maintenance script. Run with:  npm i -D sharp && node scripts/make_product_og.mjs
 * sharp is intentionally not a project dependency — it is not needed to
 * build the site, and Vercel supplies its own for next/image.
 * Per-product Open Graph cards, 1200x630.
 * Many source photos are only 200x200 — below what WhatsApp needs for a large
 * preview — so a raw product image would render as a tiny square thumb.
 * Compositing onto a branded canvas fixes the size, normalises the mismatched
 * photo backgrounds, and puts the price in the card itself.
 */
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public/og');
const W = 1200, H = 630, PAD = 56;
const PANEL = Math.round(W * 0.42);
const TEXT_W = PANEL - PAD * 2;

await mkdir(OUT, { recursive: true });
const products = JSON.parse(await readFile(path.join(ROOT, 'data/productos.json'), 'utf8'));

const logo = await sharp(path.join(ROOT, 'public/Vortixlogo/VortixLogonobackground.png'))
  .resize(96, 96, { fit: 'inside' })
  .toBuffer();

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Greedy wrap using an average glyph width for the given size. */
function wrap(text, size, maxWidth, maxLines) {
  const perChar = size * 0.54;
  const max = Math.floor(maxWidth / perChar);
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > max && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else {
      line = candidate;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  if (lines.length === maxLines) {
    const last = lines[maxLines - 1];
    if (last.length > max) lines[maxLines - 1] = `${last.slice(0, max - 1).trimEnd()}…`;
  }
  return lines;
}

const money = (v) =>
  `$${v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

let n = 0;
for (const p of products) {
  const NAME_SIZE = 38;
  const nameLines = wrap(p.name, NAME_SIZE, TEXT_W, 4);
  const priceText = p.priceUsd === null ? 'Consultar precio' : money(p.priceUsd);
  const priceSize = p.priceUsd === null ? 34 : 68;

  const nameTop = 232;
  const priceTop = nameTop + nameLines.length * (NAME_SIZE + 8) + 54;

  const panel = Buffer.from(
    `<svg width="${W}" height="${H}">
       <rect width="${W}" height="${H}" fill="#0B0B0C"/>
       <rect x="${PANEL}" y="0" width="${W - PANEL}" height="${H}" fill="#FFFFFF"/>
       <rect x="0" y="${H - 12}" width="${W}" height="12" fill="#FF5A00"/>
       <text x="${PAD}" y="196" font-family="Helvetica, Arial, sans-serif" font-size="19"
             font-weight="bold" letter-spacing="3" fill="#7B8186">VORTIX</text>
       ${nameLines
         .map(
           (l, i) =>
             `<text x="${PAD}" y="${nameTop + i * (NAME_SIZE + 8)}" font-family="Helvetica, Arial, sans-serif" ` +
             `font-size="${NAME_SIZE}" font-weight="bold" fill="#E8EAEC">${esc(l)}</text>`,
         )
         .join('')}
       <text x="${PAD}" y="${priceTop}" font-family="Helvetica, Arial, sans-serif"
             font-size="${priceSize}" font-weight="bold" fill="#FF5A00">${esc(priceText)}</text>
       <text x="${PAD}" y="${H - 64}" font-family="Helvetica, Arial, sans-serif" font-size="21"
             fill="#7B8186">Pedidos por WhatsApp</text>
     </svg>`,
  );

  const productW = W - PANEL - PAD * 2;
  const product = await sharp(path.join(ROOT, 'public', p.images[0]))
    .resize(productW, H - PAD * 2, { fit: 'inside' })
    .flatten({ background: '#ffffff' })
    .toBuffer();
  const { width: pw, height: ph } = await sharp(product).metadata();

  await sharp(panel)
    .composite([
      { input: logo, top: PAD, left: PAD },
      {
        input: product,
        top: Math.round((H - (ph ?? 0)) / 2),
        left: Math.round(PANEL + (W - PANEL - (pw ?? 0)) / 2),
      },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(OUT, `${p.slug}.jpg`));
  n++;
}
console.log(`${n} product OG cards -> public/og/`);
