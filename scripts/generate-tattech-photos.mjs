// AI-генерация B2B-фото для T-Tech через Google Gemini Image API.
// Стратегия: per-prompt variation (different photographer per shot) — НЕ единый стиль.
// Модель: gemini-3.1-flash-image-preview (Nano Banana 2). Fallback: gemini-2.5-flash-image.
// Output: 16:9 native → sharp crop в 16:10 → 3 webp размера в public/images/cases/.
// CLI:
//   node scripts/generate-tattech-photos.mjs                    # all 8
//   node scripts/generate-tattech-photos.mjs --only=01-zhkh     # один
//   node scripts/generate-tattech-photos.mjs --only=01-zhkh,04-tires
//   node scripts/generate-tattech-photos.mjs --model=fallback   # 2.5 Flash
//   node scripts/generate-tattech-photos.mjs --dry-run          # без API call

import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import { readFile, writeFile, mkdir, stat, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const PRIMARY_MODEL = 'gemini-3.1-flash-image-preview';
const FALLBACK_MODEL = 'gemini-2.5-flash-image';

const RAW_DIR = 'public/images/photos/raw';
const CASES_DIR = 'public/images/cases';
const WIDTHS = [640, 960, 1200];
const HEIGHTS = { 640: 400, 960: 600, 1200: 750 };

// 8 industry-specific prompts — professional B2B-publication documentary.
// Strategy v3: показать СУБЪЕКТ ИНДУСТРИИ (продукт/процесс/site), не клерка за монитором.
// Только 04-tires + 07-pharmacy сохраняют "human-with-software" pattern для баланса.
// Остальные 6 = объект работы (residential building, conveyor, construction site,
// engineering model, retail floor, monument display yard).
const PROMPTS = [
  {
    slug: '01-zhkh',
    prompt:
      'Professional B2B documentary photograph of a modern well-maintained Russian residential apartment complex courtyard, two mid-rise apartment buildings (8-9 floors) with clean facades in the background, organized parking with cars, landscaped courtyard with benches, trees, and a children\'s playground, two residents walking on the path, sunny day with clear sky, sharp focus, depth on the foreground courtyard, warm professional color grading, business publication editorial style of a property management company brochure. NOT stock photo. 16:9 aspect ratio.',
  },
  {
    slug: '02-food',
    prompt:
      'Professional B2B documentary photograph of a modern Russian food production facility interior, clean stainless steel automated conveyor line filling and labeling glass jars or product packages, two female workers in white coats and hairnets supervising the line, bright industrial lighting with cool-white color cast, polished epoxy floor reflecting overhead lights, organized production environment with food-grade equipment, sharp focus on the conveyor machinery in foreground, depth on the production hall, business publication editorial style. NOT stock photo. 16:9 aspect ratio.',
  },
  {
    slug: '03-construction',
    prompt:
      'Professional B2B documentary photograph of a Russian commercial construction site, mid-rise concrete and steel building under construction with tall yellow tower crane on the right, scaffolding visible on the partially finished facade, two foremen in white hard hats and reflective hi-vis vests reviewing project documents on a tablet on-site in foreground, organized stacks of construction materials and rebar nearby, clear bright daylight, slight haze, sharp focus, modern professional construction project documentation style, business publication editorial. NOT stock photo. 16:9 aspect ratio.',
  },
  {
    slug: '04-tires',
    prompt:
      'Professional B2B documentary photograph of a contemporary Russian tire and wheel retail showroom interior, neatly organized branded passenger and truck tires on yellow industrial racks, employee in branded polo shirt holding tablet scanning a tire with handheld barcode terminal, polished concrete floor reflecting bright LED ceiling lights, customer service counter visible in background with monitor, clean modern retail aesthetic, sharp focus, depth of field on employee, B2B trade publication editorial style. NOT stock photo. 16:9 aspect ratio.',
  },
  {
    slug: '05-engineering',
    prompt:
      'Professional B2B documentary photograph close-up of a large widescreen monitor displaying a detailed 3D engineering CAD model of complex industrial mechanical equipment (multi-stage pump assembly with pipes, valves, and motor in exploded technical view), professional CAD software interface with measurements and annotations on the side panel, several large technical drawings printed on A1 sheets with engineering schematics partially visible on the desk surface in front of the monitor, soft natural daylight from a window outside the frame, no people in frame, sharp focus on the model rendering, business publication editorial style of an engineering trade magazine. NOT stock photo. 16:9 aspect ratio.',
  },
  {
    slug: '06-clothing',
    prompt:
      'Professional B2B documentary photograph of a contemporary Russian clothing retail store interior, dense rows of seasonal apparel hanging on wall-mounted display rails (jackets, sweaters, shirts in muted earth tones), folded knitwear on light wood shelves, female sales associate in branded outfit organizing a rack of clothing in foreground, view through an open stockroom door in the right background showing densely packed garment racks of inventory on rolling rails extending into the depth, bright modern retail aesthetic with light wood floor and white walls, soft daylight from large windows, sharp focus, business publication editorial style. NOT stock photo. 16:9 aspect ratio.',
  },
  {
    slug: '07-pharmacy',
    prompt:
      'Professional B2B documentary photograph of a Russian pharmacy chain interior, female pharmacist in white coat at point-of-sale counter using touchscreen POS system showing pharmaceutical inventory, organized shelves of medication boxes with Cyrillic labels in background, bright clean white-and-mint pharmacy aesthetic, professional retail healthcare lighting, sharp focus, depth of field on pharmacist hands and screen, editorial business publication style. NOT stock photo. 16:9 aspect ratio.',
  },
  {
    slug: '08-monuments',
    prompt:
      'Professional B2B documentary photograph of a Russian stone monument and sculpture workshop outdoor showroom area, varied finished works displayed in a curated arrangement - a mix of polished granite memorial stones, hand-carved decorative stone sculptures (a classical angel statue, an ornamental urn, a carved lion figure, abstract granite art piece, decorative garden columns, a small bust on a pedestal), in materials of black, grey, and creamy-white granite and marble, organized along clean concrete pavement walkways, workshop building with simple signage in soft-focus background, mature trees and greenery framing the scene, partly cloudy bright daylight, sharp focus, artistic and dignified showroom composition emphasizing variety of craftsmanship, business publication editorial style of a stoneworking trade catalog. NOT a cemetery, NOT funereal, NOT stock photo. 16:9 aspect ratio.',
  },
];

function parseArgs() {
  const args = { only: null, model: PRIMARY_MODEL, dryRun: false };
  for (const a of process.argv.slice(2)) {
    if (a.startsWith('--only=')) args.only = a.slice(7).split(',').map((s) => s.trim());
    else if (a === '--model=fallback') args.model = FALLBACK_MODEL;
    else if (a.startsWith('--model=')) args.model = a.slice(8);
    else if (a === '--dry-run') args.dryRun = true;
  }
  return args;
}

async function loadEnv() {
  const txt = await readFile('.env.local', 'utf8');
  for (const line of txt.split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

async function generateOne(ai, model, prompt) {
  const response = await ai.models.generateContent({
    model,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: '16:9' },
    },
  });

  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData?.data);
  if (!imagePart) {
    const textPart = parts.find((p) => p.text);
    throw new Error(
      `No image in response. Text: ${textPart?.text ?? '(none)'} | finishReason: ${response?.candidates?.[0]?.finishReason}`
    );
  }
  return {
    buffer: Buffer.from(imagePart.inlineData.data, 'base64'),
    mimeType: imagePart.inlineData.mimeType ?? 'image/png',
  };
}

async function processImage(rawBuffer, slug) {
  await mkdir(CASES_DIR, { recursive: true });
  for (const w of WIDTHS) {
    const h = HEIGHTS[w];
    const out = join(CASES_DIR, `${slug}-${w}.webp`);
    await sharp(rawBuffer)
      .resize({ width: w, height: h, fit: 'cover', position: 'centre' })
      .webp({ quality: 80, effort: 6 })
      .toFile(out);
    const s = await stat(out);
    console.log(`    ${out} (${(s.size / 1024).toFixed(0)} KB)`);
  }
}

async function saveRaw(buffer, mimeType, slug) {
  await mkdir(RAW_DIR, { recursive: true });
  const ext = mimeType.includes('jpeg') ? 'jpg' : 'png';
  const out = join(RAW_DIR, `${slug}.${ext}`);
  await writeFile(out, buffer);
  const s = await stat(out);
  console.log(`    raw → ${out} (${(s.size / 1024).toFixed(0)} KB)`);
  return out;
}

async function main() {
  const args = parseArgs();
  await loadEnv();
  if (!process.env.GEMINI_API_KEY) {
    console.error('FATAL: GEMINI_API_KEY missing in .env.local');
    process.exit(1);
  }

  const targets = args.only
    ? PROMPTS.filter((p) => args.only.includes(p.slug))
    : PROMPTS;
  if (targets.length === 0) {
    console.error(`FATAL: --only matched 0 prompts. Available: ${PROMPTS.map((p) => p.slug).join(', ')}`);
    process.exit(1);
  }

  console.log(`Model: ${args.model}`);
  console.log(`Targets (${targets.length}): ${targets.map((p) => p.slug).join(', ')}`);
  console.log(`Dry-run: ${args.dryRun}\n`);

  if (args.dryRun) {
    for (const p of targets) console.log(`[${p.slug}]\n  ${p.prompt}\n`);
    return;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  let ok = 0;
  let fail = 0;
  for (const p of targets) {
    console.log(`→ ${p.slug}`);
    try {
      const t0 = Date.now();
      const { buffer, mimeType } = await generateOne(ai, args.model, p.prompt);
      console.log(`    generated (${(Date.now() - t0)}ms, ${mimeType}, ${(buffer.length / 1024).toFixed(0)} KB)`);
      await saveRaw(buffer, mimeType, p.slug);
      await processImage(buffer, p.slug);
      ok++;
    } catch (e) {
      fail++;
      console.error(`    FAIL: ${e.message}`);
    }
  }

  console.log(`\nDone. OK=${ok}, FAIL=${fail}`);
  if (fail > 0) process.exit(2);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
