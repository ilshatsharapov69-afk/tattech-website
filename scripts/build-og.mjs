// Render OG image + favicon raster fallbacks from SVG sources via sharp.
// Run after editing public/og-source.svg or public/favicon.svg.
import sharp from 'sharp';
import { readFileSync, statSync } from 'node:fs';

const og = readFileSync('public/og-source.svg');
await sharp(og)
  .resize(1200, 630)
  .png({ quality: 92, compressionLevel: 9 })
  .toFile('public/og-image.png');

const fav = readFileSync('public/favicon.svg');
await sharp(fav).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(fav).resize(180, 180).png().toFile('public/apple-touch-icon.png');

for (const f of ['public/og-image.png', 'public/favicon-32.png', 'public/apple-touch-icon.png']) {
  console.log(`  ${f} (${(statSync(f).size / 1024).toFixed(1)} KB)`);
}
console.log('done.');
