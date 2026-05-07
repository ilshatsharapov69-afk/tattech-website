// Process founder photo into 4:5 webp variants (480/720/960).
// Source: public/images/about/lenar-raw.{jpg,jpeg,png} OR generated placeholder.
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';

const DIR = 'public/images/about';
// Photo displayed compactly (~200px on desktop, ~140px on mobile).
// 240/400/600 covers 1x/2x/3x density without bloating payload.
const widths = [240, 400, 600];
const candidates = ['lenar-raw.jpg', 'lenar-raw.jpeg', 'lenar-raw.png'].map((f) => `${DIR}/${f}`);
const src = candidates.find(existsSync);

async function fromSource(srcPath) {
  // No crop — preserve original aspect ratio (typically 1:1 for Telegram photos).
  for (const w of widths) {
    const out = `${DIR}/lenar-${w}.webp`;
    await sharp(srcPath)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(out);
    const s = await stat(out);
    console.log(`  ${out} (${(s.size / 1024).toFixed(0)} KB)`);
  }
}

async function placeholder() {
  // Brand-blue gradient with "ЛГ" initials so build/Lighthouse don't see broken img.
  const svg = (w, h) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E3A8A"/><stop offset="100%" stop-color="#2563EB"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
      font-family="Inter,system-ui,sans-serif" font-size="${Math.round(h * 0.32)}"
      font-weight="700" fill="rgba(255,255,255,0.92)">ЛГ</text>
  </svg>`);
  for (const w of widths) {
    const h = Math.round((w * 5) / 4);
    const out = `${DIR}/lenar-${w}.webp`;
    await sharp(svg(w, h)).webp({ quality: 82, effort: 6 }).toFile(out);
    const s = await stat(out);
    console.log(`  [placeholder] ${out} (${(s.size / 1024).toFixed(0)} KB)`);
  }
}

if (src) {
  console.log(`Processing real photo: ${src}`);
  await fromSource(src);
} else {
  console.log('No lenar-raw.{jpg,jpeg,png} found — generating placeholder.');
  await placeholder();
}
console.log('done.');
