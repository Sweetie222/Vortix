/**
 * Maintenance script. Run with:  npm i -D sharp && node scripts/optimize_images.mjs
 * sharp is intentionally not a project dependency — it is not needed to
 * build the site, and Vercel supplies its own for next/image.
 * Downsize oversized source images. next/image resizes on request, but huge
 * sources still cost build time, repo size and optimizer budget — and the hero
 * and logo were being served raw because they bypassed next/image entirely.
 */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const MAX_EDGE = 1200;
const MAX_KB = 220;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(png|jpe?g)$/i.test(e.name)) out.push(p);
  }
  return out;
}

let saved = 0, touched = 0;
for (const file of await walk(path.join(ROOT, 'public'))) {
  const before = (await stat(file)).size;
  const img = sharp(file);
  const meta = await img.metadata();
  const tooBig = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX_EDGE;
  const tooHeavy = before / 1024 > MAX_KB;
  if (!tooBig && !tooHeavy) continue;

  let pipe = sharp(file);
  if (tooBig) pipe = pipe.resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true });
  // Keep the format: PNGs here are cut-outs that may carry transparency.
  const buf =
    meta.format === 'png'
      ? await pipe.png({ quality: 82, compressionLevel: 9, palette: true }).toBuffer()
      : await pipe.jpeg({ quality: 82, mozjpeg: true }).toBuffer();

  if (buf.length < before) {
    await sharp(buf).toFile(file + '.tmp');
    const { rename } = await import('node:fs/promises');
    await rename(file + '.tmp', file);
    saved += before - buf.length;
    touched++;
    console.log(
      `${path.relative(ROOT, file).padEnd(62)} ${(before / 1024).toFixed(0).padStart(5)}KB -> ${(buf.length / 1024).toFixed(0).padStart(5)}KB`,
    );
  }
}
console.log(`\n${touched} files, ${(saved / 1024 / 1024).toFixed(2)} MB saved`);
