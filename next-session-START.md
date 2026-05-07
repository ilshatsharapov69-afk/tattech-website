# Session 10b kickoff — T-Tech redesign (About-блок с фото владельца)

> Этот файл всегда содержит промт для **следующей** запланированной сессии.

---

## Что вставить в новый чат

```
T-Tech redesign — session 10b (About-блок). Открой D:\tattech-website\next-session-START.md и D:\tattech-website\REDESIGN-ROADMAP.md, прочитай оба полностью. Цель: новый компонент src/components/About.astro между Reviews и Programs. Демо-first: владелец = Ленар Гильмутдинов (см. memory project_tattech_owner.md), placeholder фото + bio. После research B2B-about-section паттернов (~30 мин) — дизайн + LOC ≤120 + локальный commit. Push в GitHub — финальный после session 11. Lighthouse 3×3 desktop + 3×3 mobile baseline session 10a: desktop 100/100/100/100, mobile 96/100/100/100 (LCP 2.20s, CLS 0).
```

---

## Контекст для Claude (читай при старте)

### Состояние проекта (после session 10a)

- **Repo:** `D:\tattech-website` (Astro 6, plain CSS, no Tailwind)
- **Live:** https://ilshatsharapov69-afk.github.io/tattech-website/ (отстаёт — push заморожен до session 11)
- **Last local commit:** session 10a (AI photo generation, 8 case-photos через Gemini Nano Banana 2), NOT pushed
- **Lighthouse session 10a baseline:** desktop 100/100/100/100, mobile 96/100/100/100 (LCP 2.20s, CLS 0, TBT 0, SI ~4s)

### Что закрыто (НЕ ТРОГАТЬ без явной просьбы клиента)

- ✅ 5.1 — Header (blue tonal + glass-morphism + 3 icon-buttons)
- ✅ 6 — Анимации (pulse, scroll progress, mouse-glow, Hero spotlight, Stats redesign)
- ✅ 7 — Services (3D tilt + compact reveal + border-glow + цены + TG-CTA)
- ✅ 8 — Cases (grid 4×2 + B2B-формат + image hover-zoom + per-card spotlight gradient + footer-strip)
- ✅ 9 — Reviews (B2B + per-industry avatar-initials + quote-mark hover, demo-first placeholder)
- ✅ 10a — AI photo generation: 8 case-photos (industry-focus, NOT office), professional B2B-publication style, Cyrillic readable

### AI-photo стратегия (важно для 10b)

Из 10a research: **vary by subject/scene/industry** (разные интерьеры/процессы), NOT by camera quality. Все cases теперь indus-focus:
- Outdoor: ЖКХ-двор / стройка / памятники-showroom
- Indoor industrial: пищевка conveyor
- Indoor close-up: инжиниринг CAD
- Indoor retail с людьми: шины / одежда / аптека

Hero/About — это **сама компания T-Tech (один фотограф)**, можно унифицированный стиль. Но Hero менять НЕ в плане 10b.

---

## Session 10b — детальные шаги

### 0. Открыть с user'а (~3 мин)

- Подтвердить bio для Ленара Гильмутдинова (placeholder OK по demo-first):
  - Должность? «Основатель T-Tech» / «CEO» / «Руководитель» — спросить
  - Опционально 1-2 предложения от первого лица (можно generated, клиент потом скорректирует)
- Решить про фото:
  - Option A: AI-generated portrait владельца через Nano Banana 2 (как cases, но 1 фото)
  - Option B: Placeholder silhouette / initials в круге (avatar-pattern из Reviews)
  - Option C: Реальное фото если user даст (быстрее всего)

### 1. Research (~30 мин)

Темы:
- B2B about-section patterns 2025-2026: личное лицо vs «команда» vs «миссия». Trust-driving элементы
- Layout: 1-col bio + photo? 2-col split? Stats + photo?
- Tone-of-voice 1С франчайзи (Рарус / БИТ / Корус about-pages эталоны)
- Animations: parallax / fade-in / hover на портрете — что подходит после Reviews quote-mark

### 2. Компонент `src/components/About.astro`

- Размещение: между Reviews и Programs (или TBD)
- Структура (wireframe пока):
  - Eyebrow: «О компании» или «Кто за этим стоит»
  - H2: benefit-headline (TBD session 11)
  - 2-col split: photo (4:5 portrait) + text block (bio + role + signature?)
  - Trust элементы: годы опыта, проектов, инфо про Казань/локацию
- Использует [base]-aware paths как другие компоненты

### 3. Запреты session 10b

- ❌ НЕ трогать Hero / Header / Stats / Services / Cases / Reviews / ScrollProgress / mouse-glow / Programs / FAQ / Footer
- ❌ НЕ начинать session 11 (copywriting pass)
- ❌ НЕ commit'ить .env.local или API key
- ❌ НЕ запускать `gh run watch` (push frozen до session 11)
- ❌ НЕ деплоить (no `git push`)

---

## Чек-лист в конце session 10b

1. Research отчёт сохранён в `research/2026-MM-DD_b2b-about-section/report.md` (≥5 источников 2025-2026) + INDEX обновлён
2. `src/components/About.astro` создан + интегрирован в `src/pages/index.astro`
3. Bio + role placeholder (помечены в commit message)
4. Фото владельца (один из 3 вариантов выше)
5. `npm run build` зелёный
6. Lighthouse 3×3 desktop + 3×3 mobile — без регрессии vs 10a baseline (desktop 100, mobile 96)
7. **ЛОКАЛЬНЫЙ** `git commit` (БЕЗ `git push`)
8. Обновить `REDESIGN-ROADMAP.md`: `[x] 10b` + `[ ] 11 ← NEXT`
9. Перезаписать `next-session-START.md` промтом для session 11 (copywriting pass)
10. Обновить memory `project_tattech_client.md`

---

## AI photo generation (если нужно 1 portrait для 10b)

Скрипт `scripts/generate-tattech-photos.mjs` готов и универсален. Для портрета:

```bash
# Edit PROMPTS array, add { slug: 'about-lenar', prompt: '...' }
# Then:
node scripts/generate-tattech-photos.mjs --only=about-lenar
```

API key в `.env.local` (whisper-typing project, billing-enabled). Стоимость ~$0.05/img.

Prompt идея для AI-portrait владельца (не выдавая за реального человека):
> Professional B2B portrait of a Russian male IT business owner in his 40s, friendly confident smile, wearing smart casual business attire (button-down shirt, no tie), sitting/standing in a modern office environment with subtle Tatarstan cultural cue in background (soft-focus), natural daylight from window, sharp focus on face, shallow depth of field, business publication editorial style, professional headshot. 4:5 aspect ratio.

⚠ После генерации спросить user'а: можно ли использовать generated face или нужно реальное фото от клиента.

---

## Открытые вопросы для user'а в начале session 10b

1. **Bio:** placeholder писать самим или есть текст от клиента?
2. **Должность:** «Основатель» / «CEO» / «Руководитель» / другое?
3. **Photo:** AI-generated / placeholder silhouette / реальное от клиента?
4. **Layout:** 2-col split (photo + text) или single-col centered?
5. **Размещение:** between Reviews ↔ Programs (default) или другое?

---

## Что унаследовали из session 10a (полезный контекст)

- **AI-photo strategy:** vary by industry/subject/scene, NOT by camera quality. Professional B2B-publication baseline.
- **Cyrillic readability:** Nano Banana 2 хорошо handle русский текст в кадре (вывески, имена, branded labels).
- **Sharp pipeline:** quality 80, effort 6, fit:'cover' force 16:10. Mobile SI отстаёт — defer perf optimization на session 11.
- **API key reuse:** whisper-typing key billing-enabled, новый T-Tech key (`AIzaSyB...FGcAs`) ещё не активирован — оставить пока на будущее.
- **Demo-first OK:** placeholder для bio/role/photo — клиент скорректирует к session 11 push.
