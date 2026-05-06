// Generate WebP variants for case images (640w, 960w, 1200w).
// Run once after adding new images; outputs are gitted.
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

const CASES_DIR = 'public/images/cases';
const widths = [640, 960, 1200];

const files = await readdir(CASES_DIR);
for (const file of files) {
  const { name, ext } = parse(file);
  if (!/\.(png|jpg|jpeg)$/i.test(ext)) continue;
  if (/-(640|960|1200)$/.test(name)) continue;

  const src = join(CASES_DIR, file);
  for (const w of widths) {
    const out = join(CASES_DIR, `${name}-${w}.webp`);
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    const s = await stat(out);
    console.log(`  ${out} (${(s.size / 1024).toFixed(0)} KB)`);
  }
}
// Square logo crop for header/footer (avoids aspect-ratio mismatch warning).
{
  const out = 'public/images/logo-240.webp';
  await sharp('public/images/logo.png')
    .resize(240, 240, { fit: 'cover' })
    .webp({ quality: 88 })
    .toFile(out);
  const s = await stat(out);
  console.log(`  ${out} (${(s.size / 1024).toFixed(1)} KB)`);
}

console.log('done.');
