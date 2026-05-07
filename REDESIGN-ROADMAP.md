# T-Tech Redesign Roadmap

**Started:** 2026-05-07
**Trigger:** UX/CRO-аудит другой нейронкой + правки клиента + reference от barbershop demo
**Цель:** превратить шаблонный лендинг в самый сильный кейс портфолио. B2B-конверсия из посетителя в квалифицированный лид (Казань, 1С-внедрение).

**Workflow:** одна сессия = один шаг = один **локальный** commit. Push на GitHub Pages — НЕ после каждой сессии, а финальным bundle после session 11. До этого — только local preview. В конце каждой сессии Claude генерирует короткий handoff-промт.

**Кэп контекста на сессию:** ≤200K tokens (≤20% от 1M).

---

## Финальные решения по дизайну (2026-05-07)

| # | Решение | Применение |
|---|---|---|
| 1 | **Header — синий gradient tonal**: всегда blue (matches Hero gradient `#1E3A8A → #2563EB → #635BFF`). На скролле — semi-transparent blue с blur. Лого/nav/phone всегда белые | Решает блокер видимости лого |
| 2 | **Light body + синие islands** (Hero/CTA/Footer) — палитра session 4 сохраняется, footer возможно перекрасить с #0F172A на синий gradient (TBD в 5.1) | Премиум вайб без полного pivot |
| 3 | **Mouse-tracking glow** на белых секциях (Services/Programs/FAQ) — radial 600px, opacity ~0.05, follows cursor. На mobile отключён | Anim-фон, не отвлекает |
| 4 | **Scroll progress bar** — тонкая 3px gradient полоска сверху, без иконки | Простой polish |
| 5 | **3D tilt** на Cases cards при движении мыши (vanilla CSS perspective + JS pointer-listener) | Wow-эффект на главной секции доверия |
| 6 | **Spotlight gradient** на Cases cards (mouse-tracked внутренний glow); **border-glow** на Services cards | Premium hover-эффекты |
| 7 | **Image hover-zoom** scale(1.1) на Cases cards (как barbershop) | Living-feel |
| 8 | **AI-генерация фото** офиса/команды/процессов через Gemini Nano Banana 2 / Imagen 4 (TBD по research) | Замена sticker-стока |

---

## Текущий статус

```
[x] Pre-flight — Variant B rollback + ROADMAP (commit 0e44d6e, NOT pushed)
[x] 5.1 — Top-bar revamp + Header blue tonal + email btn + brand TG/WA + Hero contacts removed + Stats→Services spacing
[x] 6   — Анимации: pulse CTA + scroll progress + mouse-tracking glow + Hero dots spotlight + Header glass + Stats redesign (commit d104c45, NOT pushed)
[x] 7   — Услуги: упаковка hover-reveal/accordion + border-glow + benefit-bullets + цены + TG-CTA (NOT pushed)
[ ] 8   — Кейсы: B2B-формат + image zoom + 3D tilt + spotlight gradient     ← NEXT
[ ] 9   — Отзывы: real B2B
[ ] 10a — AI photo generation (Gemini Nano Banana 2 / Imagen 4)
[ ] 10b — About-блок с фото владельца
[ ] 11  — Финальный copywriting pass (benefit headlines)
```

8 сессий total после pre-flight.

---

## Pre-flight (DONE, commit 0e44d6e)

- Variant B rollback применён: оставлены Header (Telegram + WhatsApp icon-buttons), `phone.svg`, регистрация phone в `Icon.astro`. Удалены: `CallbackModal.astro`. Откатан Hero.astro и index.astro к session-4 state.
- Lighthouse session 4 baseline: desktop 100/100/100/100, mobile 96/100/100/100.

---

## Session 5.1 — Top-bar revamp + Hero CTA revert + Header blue tonal + Spacing

**Status:** ✅ done 2026-05-07 • **No research** • **No client input** • **+72 / −97 LOC**

**Lighthouse 5.1:** desktop 100/100/100/100 (3×), mobile 99/100/100/100 (3×). Mobile perf +3 vs baseline (96 → 99) от удаления `.hero-contacts` блока.

### Цели

1. **Header → синий tonal**
   - `:not(.is-scrolled)` поверх Hero — transparent (Hero gradient просвечивает)
   - `.is-scrolled` — semi-transparent blue gradient (`linear-gradient(180deg, rgba(30,58,138,0.95) 0%, rgba(37,99,235,0.85) 100%)`) + `backdrop-filter: saturate(180%) blur(12px)`
   - Логотип, текст лого, nav-links, phone, burger — **всегда белые** (убрать current scroll-aware light/dark dual code)
   - Box-shadow ниже header при скролле — `0 2px 24px rgba(30,58,138,0.18)`

2. **Telegram + WhatsApp icon-buttons → brand colors**
   - Telegram: bg `#229ED9`, hover `#1B8CC0`, иконка всегда `#fff`
   - WhatsApp: bg `#25D366`, hover `#1FAE57`, иконка всегда `#fff`
   - Border убрать (brand colors сами по себе достаточно visible на синем header)
   - Hover translate(-2px) + box-shadow grow остаётся

3. **Email icon-button** (новый)
   - Маленькая (40×40 как TG/WA) icon-кнопка с `email.svg` (Heroicons mail)
   - bg `rgba(255,255,255,0.10)` поверх синего header, hover `rgba(255,255,255,0.20)`
   - href `mailto:ttech.kzn.it@gmail.com`
   - Размещение: phone-text → email-icon → Telegram → WhatsApp (компактно)
   - В mobile menu добавить email кнопку рядом с TG/WA

4. **Hero — удалить дублирующие контакты**
   - Удалить `.hero-contacts` блок (строки 45-55) — phone и email теперь в Header
   - Удалить связанный CSS (`.hero-contacts`, `.contact-link`, `.contact-icon`, `.contact-sep`) включая mobile media query
   - Hero CTA «Написать в Telegram» оставить как есть (анимации в session 6)

5. **Spacing fix Stats → Services**
   - Stats сейчас: `padding-block: var(--space-12) var(--space-16)` desktop / `var(--space-8) var(--space-10)` mobile
   - Services наследует `.section { padding-block: var(--space-32) }` → большой gap
   - Решение: на Services сделать `padding-top: var(--space-16)` desktop / `var(--space-12)` mobile (override .section)
   - Аудит вертикального ритма: пройти все секции, убрать остальные пустоты если есть

### Out of scope

- ❌ Pulse-анимация на «Написать в Telegram» (это session 6)
- ❌ Scroll progress bar (это session 6)
- ❌ Mouse-tracking glow (это session 6)
- ❌ Изменения текстов (это session 11)
- ❌ Изменения palette tokens (frozen)

### Success criteria

- Build green
- Lighthouse desktop ≥ 95/95/100/95, mobile ≥ 90/95/100/95
- Логотип читается на ВСЕХ scroll-positions (over Hero + scrolled)
- Phone+TG+WA+email visible в Header desktop, не пропадают на mobile (mobile menu)
- Visual diff: Hero после изменений проще, контакты переехали наверх
- Stats → Services gap сократился, общий scroll-length уменьшился

### Файлы

- `src/components/Header.astro` — редизайн scrolled state + email button + brand colors на TG/WA
- `src/components/Hero.astro` — удалить `.hero-contacts` + CSS
- `src/components/Services.astro` — override padding-top
- (опц.) `src/components/icons/email.svg` + регистрация в `Icon.astro`

### Deliverables

- 1 commit, ≤ 5 файлов, ≤ 120 LOC delta
- Lighthouse `.lighthouse/lh-5.1-{desktop|mobile}-{1|2|3}.html`
- Handoff на session 6

---

## Session 6 — Анимации: pulse CTA + scroll progress + mouse-tracking glow + button hovers

**Status:** ✅ done 2026-05-07 • **commit d104c45 (NOT pushed)** • **+225 / −31 LOC** (out-of-roadmap polish bumped LOC over the planned ≤120 budget — client-driven additions: Hero dots spotlight, Header glass, Stats redesign)

**What shipped vs plan:**
- Pulse CTA on Hero btn-primary (Tobias Ahlin pseudo-element ring pattern)
- ScrollProgress.astro component (CSS animation-timeline: scroll() + Firefox JS fallback)
- Mouse-tracking glow on .has-glow sections (Services/Programs/FAQ)
- Hero dots — replaced static pattern with cursor-tracked mask spotlight (NOT in original plan; client request after preview)
- Header — glass-morphism from page load (NOT in original plan, 5.1 fixup; client noticed jarring scroll jump)
- Stats — full redesign as Hero→Services gradient bridge (NOT in original plan; client wanted it narrower + group slide-in animation)
- Counter timing fix — IntersectionObserver threshold 0.5 + rootMargin -120px so it doesn't fire on tall-screen page load

**Skipped:** btn micro-interactions polish (Karpathy: btn-primary already had translateY+scale+filter from earlier work, surgical principle).

**Deferred:** Lighthouse 3×3 (run at start of session 7).

**Research:** [research/2026-05-07_b2b-animation-patterns/report.md](../DeepReserch/research/2026-05-07_b2b-animation-patterns/report.md) — 25 sources

---

## Session 6 — original plan (kept for context)

**Status:** pending • **Research:** ~30 мин • **No client input** • **~120 LOC**

### Research

- B2B pulse animation patterns (Stripe/Vercel/Linear) — НЕ казино-style. Subtle attention magnet
- Mouse-tracking glow CSS-only (`pointer` events + CSS variable animation) — best practices, perf cost
- `prefers-reduced-motion` safety паттерны

### Цели

1. **Pulse на Hero «Написать в Telegram»**
   - Subtle box-shadow expansion (radial pulse 2-3s loop, scale 1.0 → 1.03)
   - Magnetic CTA остаётся, не конфликтует
   - Off при prefers-reduced-motion
2. **Scroll progress bar** (Q4=A)
   - Fixed top 3px, gradient `--color-brand-700 → --color-brand-500 → --color-brand-purple`
   - JS: scroll-event с rAF throttle обновляет width %
   - z-index выше header, под mobile-menu
3. **Mouse-tracking glow на белых секциях** (Q3=A)
   - Single component: `<MouseGlow />` или CSS-trick на `body`
   - Radial 600px gradient, opacity 0.05, color `--color-brand-500`
   - JS: pointer-event обновляет CSS variables (`--mx`, `--my`)
   - Off на mobile (`@media (hover: hover)`)
4. **Hover micro-interactions** на всех `.btn`
   - translateY(-2px) уже есть, добавить shadow grow + filter brightness(1.05)
   - На icon-buttons в header — лёгкий glow

### Success criteria

- Reduced-motion → анимаций нет
- Lighthouse perf без регрессии (animations only on transform/opacity, GPU-accelerated)
- На прокрутке pulse не сжирает CPU (DevTools Performance tab check)

### Deliverables

- 1 commit, ≤ 4 файла, ≤ 120 LOC delta
- `research/2026-MM-DD_b2b-animation-patterns/report.md`

---

## Session 7 — Услуги: 3D tilt + compact hover-reveal + border-glow

**Status:** ✅ done 2026-05-07 • **NOT pushed** • **+105 / −12 LOC**

### Mid-session pivot (важно для контекста)

Изначально по плану было: accordion на mobile + 3 benefit-bullets + большой expanded state. Реализовано в первой итерации (см. research отчёт). После визуальной проверки клиент-сёрфер (user) дал фидбек: «карточки сильно расширяются, кнопка обсудить в Telegram уезжает за экран на меньших viewport, нужно компактнее + сделайте 3D-tilt как в barbershop».

Pivot: **3D tilt был перенесён из плана session 8 (Cases) в session 7 (Services)**. Дроп: benefit-bullets, accordion JS, max-height expansion. Замена: компактный reveal с фиксированной высотой карточки.

### What shipped (final)

- ✅ Удалена пустая ссылка «Узнать подробнее → #contacts»
- ✅ **3D tilt на pointermove** (perspective(1000px) + rotateX/Y до ±10°), CSS-only через `--rx` / `--ry` custom properties, обновляются JS-handler'ом. На mouseleave — eased-out возврат через `var(--ease-spring)` 320ms. (ref: barbershop reference + decision #5 ROADMAP, originally planned for Cases)
- ✅ Compact reveal block в каждой карточке: «от X ₽» (4 из 6) + кнопка «Обсудить в Telegram». **Высота карточки СТАБИЛЬНА** — reveal-блок занимает место всегда, на default `opacity: 0` + `translateY(6px)`, на hover `opacity: 1` + `translateY(0)`. Нет `max-height` транзиций → нет скачков высоты row'а.
- ✅ Border-glow `::after` через conic-gradient + `@property --bg-angle` + `padding-box`/`border-box` техника (ref: CodeTV.dev Animated CSS gradient border 2026). Animation `paused` по default, `running` на hover.
- ✅ Border-glow + 3D tilt + reveal hover scoped в `@media (hover: hover) and (pointer: fine)` — на mobile/touch не парсятся (perf optimization)
- ✅ **На mobile:** 3D tilt off (нет hover), border-glow off, reveal-block ВСЕГДА видимый (price + TG button, layout `flex-direction: column` чтобы кнопка была full-width). Нет аккордеона, нет JS-toggle.
- ✅ `:focus-within` дублирует hover для клавиатурной a11y
- ✅ `prefers-reduced-motion` отключает 3D tilt + reveal анимацию + border-glow rotation
- ✅ pre-fill TG-сообщений per-service через `tgUrl(msg)` helper (паттерн из Programs.astro)
- ✅ Цены: 4 из 6 услуг показывают «от X ₽» (Обслуживание / Сайты / 1С:ИТС / Б24); 2 scope-зависимых без цены (1С Разработка / Подбор оборудования) — hybrid pricing pattern (1С-Рарус показывает / Корус прячет)

### Что было реализовано но дропнуто после фидбека

- ❌ **3 benefit-bullets** (КАК решает боль клиента) — занимали слишком много места в expanded state, дропнуты
- ❌ **Accordion JS-toggle на mobile** (data-expanded + multi-open) — заменён на статичную видимость reveal-блока
- ❌ **Chevron-индикатор «Подробнее ›»** — удалён вместе с accordion
- ❌ **max-height transition expanded state** — заменён на opacity-only fade, fixed height

Defer на возможный future-pass (если клиент попросит): benefit-bullets через tooltip/popover (не expansion).

### Pricing values (placeholder, ТРЕБУЕТ подтверждения клиента до session 11 финального copy-pass)

| Услуга | «от X ₽» |
|---|---|
| Обслуживание 1С | 4 990 ₽/мес |
| Разработка сайтов | 50 000 ₽ |
| 1С:ИТС | 16 200 ₽/год |
| Битрикс-24 | 25 000 ₽ |

Базис: рыночные ставки российского 1С-сегмента 2026 (rarus.ru evidence, типовые пороги партнёров 1С).

### Lighthouse session 7 (final)

**Desktop 3×:** 100/100/100/100 ✓ (matches 5.1 baseline)
**Mobile 3×:** perf 98/97/97 (median 97), a11y/bp/seo 100, LCP 2.2s, SI 1.7-2.7s
- Δ vs 5.1 baseline (99): −1..−2 perf — в пределах 5-pt threshold ✓
- Compact rewrite (drop accordion JS + simpler CSS) дал лучшие mobile-метрики чем первая итерация (была 95-98 с SI 1.7-4.2s)

**Lighthouse session 6 догон выполнен:** desktop 100/100/100/100, mobile 98/100/100/100 (LCP 2.2s, CLS 0). Регрессия mobile −1 perf vs 5.1 — в пределах допуска.

### Research

[research/2026-05-07_b2b-services-packaging/report.md](../DeepReserch/research/2026-05-07_b2b-services-packaging/report.md) — 11 источников. Конкурентный анализ топ-5 1С франчайзи РФ + Stripe/Linear/Vercel + accordion/hover UX best practices + conic-gradient техника. Финальная реализация частично дроп'нула рекомендации (benefit-bullets + accordion) на основе клиентского визуального фидбека — ROI accordion и benefit-bullets не оправдал UX-стоимость на small viewport.

### Файлы изменены

- `src/components/Services.astro` — полный rewrite (+105/-12 LOC final)
- `REDESIGN-ROADMAP.md` — статус session 7
- `next-session-START.md` — handoff для session 8
- `.lighthouse/lh-6-*` — session 6 догон (gitignored)
- `.lighthouse/lh-7-*` — session 7 результаты (gitignored)
- `D:/DeepReserch/research/2026-05-07_b2b-services-packaging/report.md` — research отчёт (вне tattech-website репо)
- `D:/DeepReserch/research/INDEX.md` — обновлён

### Возможные доработки (defer на session 11 или client-feedback)

- Точные цены (T-Tech подтверждает в session 11 финальном copy-pass)
- 3D-tilt MAX_TILT (сейчас 10°) — увеличить если клиент скажет «слишком слабо», уменьшить если «перебор»
- Border-glow «всегда вращается» вместо hover-only (если клиент захочет более заметный disco-вайб)
- Benefit-bullets через tooltip/popover (если клиент захочет вернуть «КАК это решает боль»)

---

## Session 8 — Кейсы: B2B-формат + image zoom + 3D tilt + spotlight gradient

**Status:** pending • **Research:** ~1 час • **Input от клиента ОБЯЗАТЕЛЕН** • **~200 LOC**

### Research

- B2B case-study patterns (Stripe customers, Linear customers, 1С-Рарус кейсы)
- Vanilla-tilt vs CSS-only 3D tilt (perf comparison)
- Spotlight gradient implementation (CSS pointer-tracking via JS, single component)

### Input от клиента

- 2-3 реальных кейса:
  - Отрасль (например: Пищевое производство)
  - Клиент или общее описание
  - Боль (1-2 предложения)
  - Решение (1-2 предложения)
  - **Метрика результата** (часы / дни / % / ₽)
  - Срок реализации
- Если реальных нет → согласовать generated шаблоны

### Цели

1. B2B-формат карточки (отрасль/боль/метрика/срок)
2. **Image hover-zoom scale(1.1)** transition 500ms (Q7=A)
3. **3D tilt** на mousemove внутри карточки (Q5=A) — perspective(1000px) + rotateX/Y до ±8deg, ease-out на mouseleave
4. **Spotlight gradient** mouse-tracked внутри карточки (Q6=A) — радужный/синий glow следует за курсором, opacity ~0.15
5. Иконка отрасли вместо stock-фото (если client согласен на этот подход) — Phosphor/Tabler icons

### Deliverables

- 1 commit, ≤ 4 файла, ≤ 200 LOC delta
- `research/2026-MM-DD_b2b-cases-format/report.md`

---

## Session 9 — Отзывы: real B2B

**Status:** pending • **Research:** ~30 мин • **Input от клиента ОБЯЗАТЕЛЕН** • **~80 LOC**

### Research

- Linear / Vercel / Stripe testimonials — формат: должность + компания + 1 строка боль + 1 строка результат
- Avatar handling без stock-photos: инициалы в круге / abstract pattern / лого компании

### Input от клиента

- 2-3 реальных отзыва:
  - Должность (Главбух / Финдиректор / Собственник)
  - Компания (или анонимно)
  - Боль которую решил T-Tech (1 строка)
  - Результат с метрикой (1 строка)

### Deliverables

- 1 commit, ≤ 2 файла, ≤ 80 LOC delta

---

## Session 10a — AI photo generation (Gemini Nano Banana 2 / Imagen 4)

**Status:** pending • **Research:** ~1 час** • **Input от клиента: API key Google AI Studio** • **~150 LOC скрипта + N сгенерированных PNG**

### Research

- На дату 2026-05-07: какая актуальная Google image-gen модель? (Gemini Nano Banana 2 = Gemini 2.5 Flash Image? Imagen 4? что-то новее?)
- Free quota: $200 кредит на новых аккаунтах AI Studio + free tier
- Batch generation pattern (стиль один раз, N картинок в одном look-and-feel)
- Resolution / quality / face restrictions

### Input от клиента

- API ключ из https://aistudio.google.com/apikey (бесплатный $200 кредит)

### Цели

Сгенерировать пакет фото для T-Tech в едином B2B-стиле (clean office, не stock):

- **Office (3-4)**: open-space, laptop+notebook flat-lay, modern interior с растениями
- **Process (3-4)**: люди работают за компьютерами с 1С интерфейсом, обсуждение в zoom-room
- **Team (2-3)**: condon обсуждение (faces blurred or back-view), handshake business meeting
- **Hero alternatives (1-2)**: optional, abstract «1С в действии» если место для замены

Стиль: editorial, желто-синяя палитра (matches T-Tech brand), natural light, Russian-corporate-tasteful.

### Deliverables

- 1 commit: `scripts/generate-tattech-photos.mjs` + сгенерированные `public/images/photos/*.webp` (через sharp)
- `research/2026-MM-DD_gemini-image-gen/report.md` с актуальной моделью на дату

---

## Session 10b — About-блок с фото владельца

**Status:** pending • **Research:** ~30 мин • **Input от клиента ОБЯЗАТЕЛЕН** • **~120 LOC**

### Research

- B2B about-section patterns: личное лицо vs «команда» vs «миссия». Trust-driving элементы

### Input от клиента

- Фото владельца компании (через Telegram)
- Имя + должность владельца
- 1-2 предложения «почему мы» от первого лица
- Опционально: 1-2 ключевых сотрудника

### Цели

- Новый компонент `src/components/About.astro`
- Размещение: между Reviews и Programs (или TBD)
- Использует фото владельца + сгенерированные office/team фото из 10a

### Deliverables

- 1 commit, новый компонент + обновлён `index.astro`
- ≤ 120 LOC delta

---

## Session 11 — Финальный copywriting pass

**Status:** pending • **Research:** ~30 мин • **Может потребовать ревью** • **text-heavy, ~30 LOC**

### Research

- B2B benefit-driven headlines — формулы: PAS, AIDA адаптированные для landing
- Tone-references: tat-tech.ru конкуренты + примеры экспертного без воды

### Цели

1. Все H2/H3 на странице → benefit-focused (что получит читатель), не feature-focused
2. Lead-параграфы (Stats subtitle, Services lead, Cases lead, FAQ lead) — конкретика вместо воды
3. Trust pills и FAQ — короче, точнее
4. Final tone audit — экспертный, конкретный, B2B

### Deliverables

- 1 commit, ≤ 8 файлов компонентов (text-only changes mostly)
- ≤ 30 LOC delta (но много текстовых правок)
- Возможен ревью-чекпоинт перед commit

---

## Глобальные принципы redesign

- ❌ Не вводить Tailwind / GSAP / Framer / React — остаёмся на Astro 6 + plain CSS
- ❌ Не делать backend-формы — все channels через external links
- ❌ Не пушить per-session (push только финальный после session 11)
- ❌ Не запускать `gh run watch` per-session
- ✅ Каждая сессия → один **локальный** commit с детальным message (без push)
- ✅ Lighthouse 3 прогона desktop + 3 mobile после каждой сессии (локально, gitignored)
- ✅ Memory update после каждой сессии (project_tattech_client.md status + новые feedback)
- ✅ Karpathy guidelines всегда (auto-loaded из ~/.claude/CLAUDE.md)
- ✅ Всё что использует JS/анимации — gated через `prefers-reduced-motion`
- ✅ На mobile отключаем pointer-tracking эффекты (`@media (hover: hover)`)

---

## Целевые показатели (после всех 8 сессий)

- Desktop: perf ≥ 95 / a11y ≥ 95 / bp = 100 / seo ≥ 95
- Mobile: perf ≥ 90 / a11y ≥ 95 / bp = 100 / seo ≥ 95
- LCP mobile < 2.5s, CLS < 0.05, INP < 200ms
- Visual: проще, плотнее (меньше скролла на топ-3 экрана), brand-coherent
- «Wow-эффекты» на топ-3: Hero pulse CTA + Cases 3D tilt + spotlight gradients
