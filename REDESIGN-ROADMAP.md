# T-Tech Redesign Roadmap

**Started:** 2026-05-07
**Trigger:** UX/CRO-аудит другой нейронкой + правки клиента + reference от barbershop demo
**Цель:** превратить шаблонный лендинг в самый сильный кейс портфолио. B2B-конверсия из посетителя в квалифицированный лид (Казань, 1С-внедрение).

**Workflow:** одна сессия = один шаг = один **локальный** commit. Push на GitHub Pages — НЕ после каждой сессии, а финальным bundle после session 11. До этого — только local preview. В конце каждой сессии Claude генерирует короткий handoff-промт.

**Кэп контекста на сессию:** ≤200K tokens (≤20% от 1M).

**Demo-first (с 2026-05-07, после session 7):** sessions 8-11 НЕ блокируются на ожидании клиентского input'а. Используем placeholder/generated контент → клиент видит готовое демо → точечные правки → push. Применимо к кейсам (8), отзывам (9), About (10b). Session 10a (AI photos) — спросить про API key, иначе fallback. См. `feedback_tattech_demo_first.md`.

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
[x] 8   — Кейсы: grid 4×2 + B2B-формат + image hover-zoom + per-card spotlight gradient + footer-strip метрика (NOT pushed)
[x] 9   — Отзывы: B2B + per-industry avatar-initials + quote-mark hover (commit e4838d7, NOT pushed)
[x] 10a — AI photo generation (Gemini Nano Banana 2): 8 case-photos в B2B-publication style + per-industry focus (NOT pushed)
[x] 10b — About-блок с фото владельца Ленара (real Telegram selfie 1:1 sq, compact 180×180 + bio + 3 trust pills, between FAQ↔CTA) (NOT pushed)
[ ] 11  — Финальный copywriting pass (benefit headlines)  ← NEXT
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

## Session 8 — Кейсы: grid 4×2 + B2B-формат + image hover-zoom + spotlight gradient (demo-first)

**Status:** ✅ done 2026-05-07 • **NOT pushed** • **+~120 / −~95 LOC** (Cases.astro полный rewrite)

### What shipped

- ✅ **Layout:** Grid 4×2 (drop embla-carousel), responsive 4→2→1 col на ≤1024/≤640px
- ✅ **B2B card структура:** photo (16:10 hover-zoom) + industry badge + h3 + pain (placeholder, past-tense) + solution (✓ + 1С-конфиг) + footer-strip (gradient-text метрика + deadline)
- ✅ **Footer-strip** — узкая полоска внизу карточки (~52px), tinted bg `rgba(37,99,235,0.06)`, border-top, vertical stack `metric` (gradient-text 0.9375rem 700) + `deadline` (0.7rem muted). Premium B2B-pattern (Stripe/Vercel ref).
- ✅ **Image hover-zoom** `scale(1.08)` 500ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — на `:hover` + `:focus-within`. `will-change: transform` только в hover state. Gradient overlay `::after` снизу для читаемости badge.
- ✅ **Per-card spotlight gradient** — `::before` pseudo с `radial-gradient(420px circle at var(--mx) var(--my), rgba(37,99,235,0.18), transparent 65%)`, opacity 0→1 на hover, mouse-tracked.
- ✅ **JS:** delegated pointermove на `#cases-grid` + `e.target.closest('.spotlight-card')` filter + cached `getBoundingClientRect()` через `WeakMap`, invalidate на scroll + ResizeObserver. Listener attach gated `(hover: hover) and (pointer: fine)` + `prefers-reduced-motion: no-preference` — zero JS cost на mobile.
- ✅ **3D tilt skipped** — для дифференциации с Services (decision Q1 ROADMAP). Services = border-glow + 3D tilt; Cases = spotlight gradient + image zoom.
- ✅ **Метрики РЕАЛЬНЫЕ** с tat-tech.ru (240 зданий, 65k позиций, 1 млрд оборот, 8 лет с нами) — НЕ переписаны на синтетические «−65%».
- ✅ **PLACEHOLDER**: pain + deadline (помечены в commit, клиент уточняет к session 11)

### Research

[research/2026-05-07_b2b-cases-format/report.md](../DeepReserch/research/2026-05-07_b2b-cases-format/report.md) — 18 источников. Категория A (стабильные web-стандарты — W3C, CSS-Tricks) + Категория B (2025-2026 implementation patterns — freefrontend Jan/Mar 2026, copyprogramming 2026, stan.vision 2026, saasui 2026) + Категория C (конкурентный референс — Stripe, Linear, Vercel, Корус, 1eska.ru, 1ab.ru).

### Файлы изменены

- `src/components/Cases.astro` — полный rewrite (drop embla, grid 4×2, B2B-формат, hover-zoom, spotlight)
- `REDESIGN-ROADMAP.md` — статус session 8
- `next-session-START.md` — handoff для session 9
- `.lighthouse/lh-8-*` — session 8 результаты (gitignored)
- `D:/DeepReserch/research/2026-05-07_b2b-cases-format/report.md` — research отчёт
- `D:/DeepReserch/research/INDEX.md` — обновлён

### Возможные доработки (defer на session 11 client-feedback)

- Конкретные pain-описания (T-Tech подтверждает в session 11) — сейчас placeholder
- Точные сроки внедрения per-кейс — placeholder
- Замена 8 фото на AI-generated через Gemini — defer на session 10a (там единый стиль для всего сайта)
- Quote от клиента — сознательно skipped (репутационный риск); уйдут в Reviews session 9 с обезличенными должностями

---

## Session 9 — Отзывы: B2B + per-industry avatar-initials + quote-mark hover (demo-first)

**Status:** ✅ done 2026-05-07 • **commit e4838d7 (NOT pushed)** • **+150 / −53 LOC** (Reviews.astro полный rewrite)

### What shipped

- ✅ **3 placeholder отзыва** в B2B-формате, связанные с топ-3 кейсами (ЖКХ #01, Аптеки #07, Памятники #08). Past-tense pain → present-tense result + конкретные процессы (закрытие месяца / МДЛП / смета в Excel) + скромные метрики («3 дня → 1 день» / «0 расхождений за 2 мес» / «0 возвратов за полгода»). Локальный якорь Казань/Татарстан.
- ✅ **Avatar-initials 48px** circle с per-industry coloring (matches Cases.astro badge colors: `#1D4ED8` ЖКХ / `#0E7490` Аптеки / `#334155` Памятники). Font-size 42% от диаметра (20px), weight 600, letter-spacing 0.06em, uppercase. Контраст white text ≥ 4.5:1 (WCAG 2.2 AA). `role="img"` + `aria-label="Аватар [Имя]"` для screen readers.
- ✅ **Quote-mark hover** через `::before` pseudo с `content: '\201C'` (Georgia 6rem). Default `opacity: 0.12 + translateY(4px)`, hover/focus-within `opacity: 0.28 + translateY(0)`, 300ms cubic-bezier(0.4, 0, 0.2, 1). GPU-only (opacity + transform), gated `@media (hover: hover) and (pointer: fine)`. Дифференцирует Reviews от Services border-glow и Cases spotlight (decision Q1 ROADMAP, signature-эффекты не дублируются).
- ✅ **Card hover** translateY(-4px) + border-color brand-500 + shadow-card-hover (consistent с Services/Cases).
- ✅ **Layout:** Grid 3 → 2 → 1 col на ≤1024 / ≤640px. Padding адаптируется на mobile (8/6 → 6/5).
- ✅ **prefers-reduced-motion** убирает `transform`, оставляет opacity-only (200ms linear) — opacity-only безвредна по WCAG 2.1 C39.
- ✅ **`:focus-within`** дублирует hover для клавиатурной a11y.
- ✅ **Mobile** quote-mark scaled down до 4.5rem (top -0.75rem) для пропорций; hover-эффекты не парсятся (perf optimization).
- ✅ Удалён неиспользуемый `import Icon` (orphan-cleanup после Karpathy surgical principle).

### Lighthouse session 9 (3×3)

**Desktop 3×:** 100/100/100/100 (LCP 0.57s, CLS 0.000-0.009, SI 0.43-0.46s, TBT 0)
**Mobile 3×:** 98/100/100/100 (LCP 2.18s, CLS 0.000, SI 1.51s, TBT 0)

No regression vs session 8 baseline (desktop 100, mobile 98). LCP/SI идентичны или лучше.

### Research

[research/2026-05-07_b2b-testimonials-format/report.md](../DeepReserch/research/2026-05-07_b2b-testimonials-format/report.md) — 24 источника, 5 параллельных subagents:
- **Cat. A** (стабильные стандарты): WCAG 2.2, eBay DS, Radix UI, Flowbite, Pope Tech, Tatiana Mac
- **Cat. B** (implementation patterns 2025-2026): subframe.com, freefrontend, codegenes, b2better.co, SaaSFrame
- **Cat. C** (конкуренты-эталоны): Linear, Vercel, Stripe, Attio, Intercom
- **Cat. D** (RU 1С франчайзи): Рарус (3309 писем), 1АБ скан-галерея, БИТ, Интро-С (best card pattern), ЭС-Бай, Victory
- **Cat. E** (RU copywriting): in-scale, sales-generator, TestimonialHero — past-tense + skromnaya метрика правила

### Файлы изменены

- `src/components/Reviews.astro` — полный rewrite (+150/−53 LOC final)
- `REDESIGN-ROADMAP.md` — статус session 9
- `next-session-START.md` — handoff для session 10a (AI photo generation)
- `.lighthouse/lh-9-*` — session 9 результаты (gitignored)
- `D:/DeepReserch/research/2026-05-07_b2b-testimonials-format/report.md` — research отчёт
- `D:/DeepReserch/research/INDEX.md` — обновлён

### Возможные доработки (defer на session 11 client-feedback)

- Замена placeholder имён/метрик на реальные после получения реальных отзывов
- Опционально PDF-ссылки на сканы благодарственных писем (RU B2B trust pattern, Рарус/1АБ/Интро-С); требует реальных сканов от клиента
- Опционально 4-й отзыв (Пищевое производство — DataMatrix кейс) если 3 покажутся «жидко»

---

---

## Session 10a — AI photo generation (Gemini Nano Banana 2)

**Status:** ✅ done 2026-05-07 • **NOT pushed** • **+155 LOC script + 24 webp + 8 raw (gitignored)**

### What shipped (final)

- ✅ **`scripts/generate-tattech-photos.mjs`** — Node.js script (`@google/genai@1.52.0` SDK + sharp), CLI flags `--only`, `--model=fallback`, `--dry-run`, `.env.local` loader
- ✅ **Model:** `gemini-3.1-flash-image-preview` (Nano Banana 2, primary), fallback `gemini-2.5-flash-image`
- ✅ **8 case-photos** сгенерированы → конвертированы sharp в 3 webp размера (640/960/1200, 16:10 aspect via `fit:cover`, quality 80, effort 6)
- ✅ **Pipeline:** API call returns base64 JPEG (16:9 native) → Buffer → sharp resize+crop в 16:10 → `public/images/cases/{slug}-{w}.webp` (replace existing — Cases.astro paths не тронуты)
- ✅ **Raw JPEG** в `public/images/photos/raw/` — gitignored (только webp в репо)
- ✅ **`.env.local`** loader (manual fs parse, no dotenv dep) — key reused from `D:\whisper-typing\.env` (billing-enabled project)

### Strategy pivots (важно для будущих сессий)

1. **v1 prompts (lo-fi documentary, "shot on iPhone 8" / security camera) — REJECTED** клиентом как «грязно/любительски/похоже на AI». См. `feedback_b2b_cases_varied_style.md` updated.
2. **v2 prompts (professional B2B-publication, all offices) — partially REJECTED** — «везде блин офисы». Только `04-tires` (showroom) + `07-pharmacy` (POS counter) одобрены.
3. **v3 prompts (industry-focus, NOT office)** — финальная стратегия:
   - Outdoor: ЖКХ (жилой комплекс с двором), стройка (site с краном), памятники (showroom yard со скульптурами)
   - Indoor industrial: пищевка (conveyor line с банками)
   - Indoor close-up: инжиниринг (CAD pump model on monitor, no people)
   - Indoor retail (people): шины (showroom + scanner), одежда (rack + stockroom), аптека (POS counter)

### Lighthouse session 10a (3×3)

**Desktop 3×:** 100/100/100/100 (LCP 0.57s, CLS 0, TBT 0, SI 0.48-0.63s) — без регрессии vs session 9
**Mobile 3×:** **96**/100/100/100 (LCP 2.20s, CLS 0, TBT 0, SI ~4.03s)
- Δ vs session 9 baseline (98): **−2 perf, +2.5s SI** — heavier webp payload (60-150 KB vs 30-50 KB scraped)
- LCP/CLS/TBT без регрессии
- Mobile target ≥90 — перевыполнен. Defer optimization (quality 80→75 или smaller fallback) на session 11 polish

### Cyrillic readability в AI-output

Nano Banana 2 хорошо handle русский текст в кадре: вывески «МАСТЕРСКАЯ КАМНЯ "КАМЕННЫЙ ВЕК"», «ПАМЯТНИКИ • ОГРАДЫ • УСТАНОВКА», «ОПАСНАЯ ЗОНА», engraved family names на памятниках, branded shelf labels «МУЖСКАЯ КОЛЛЕКЦИЯ», тары «АРБИДОЛ»/«ВАЛИДОЛ» — всё readable. Минорные AI-typos в редких местах но не критично для landing.

### Stack & cost

- **API key:** whisper-typing project (billing-enabled). New T-Tech key (`AIzaSyB...FGcAs`) не активирован для image-gen — оставлен на потом для отдельного billing.
- **Cost:** ~16 generations × ~$0.045 = **$0.72** total (canary v1 rejected + canary v2 + batch v2 partial reject + re-batch v3 + 08-monuments retry).
- **Free tier:** Imagen 4 = no free; gemini-2.5-flash-image = ~500/day; gemini-3.1-flash-image-preview = «very limited» (~0 для нового key).

### Research

[research/2026-05-07_gemini-image-gen/report.md](../DeepReserch/research/2026-05-07_gemini-image-gen/report.md) — 28 источников, 4 параллельных subagents (models / variation prompting / sharp pipeline / free tier).

### Файлы изменены

- `scripts/generate-tattech-photos.mjs` — новый (+155 LOC)
- `package.json` + `package-lock.json` — `@google/genai@^1.52.0`
- `.gitignore` — `.env.local`, `.env.*.local`, `public/images/photos/raw/`
- `public/images/cases/{01..08}-{640|960|1200}.webp` — 24 файла, replace existing (Cases.astro paths без изменений)
- `REDESIGN-ROADMAP.md` — статус 10a
- `next-session-START.md` — handoff для 10b
- `.lighthouse/lh-10a-*` — 6 reports (gitignored)
- `D:/DeepReserch/research/2026-05-07_gemini-image-gen/report.md` — research отчёт
- `D:/DeepReserch/research/INDEX.md` — обновлён
- `C:/Users/.../memory/feedback_b2b_cases_varied_style.md` — корректирован (varied subject, NOT varied camera)

### Возможные доработки (defer)

- Mobile SI 4.0s → quality webp 80→75 если хочется session 11 perf-pass
- Activate billing на новом T-Tech key → switch `.env.local` (когда user подключит payment к T-Tech project)
- Hero/About фото — defer на session 10b (pose photos владельца)

---

## Session 10b — About-блок с фото владельца (demo-first)

**Status:** ✅ done 2026-05-07 • **NOT pushed** • **+85 LOC About.astro + 30 LOC sharp script + 3 webp + 3 dist** • **Real photo от user (Telegram selfie)**

### What shipped

- ✅ **`src/components/About.astro`** — компактный B2B founder-spotlight, 2-col grid (180px square photo / 1fr text), max-width 720px centered, between FAQ ↔ CTABanner (по запросу user'а — не Reviews↔Programs из roadmap'а; placement-логика «trust-anchor прямо перед финальным CTA» подтверждена research-источниками)
- ✅ **Photo:** real Telegram selfie от Ленара (640×640 square source, no crop) → sharp resize-only (no `fit:cover` на ≠1:1 target) → 3 webp variants (240/400/600 wide, 1:1 aspect, ~18/42/76 KB). Filenames `lenar-v2-{w}.webp` (v2 prefix forced cache-bust mid-session — см. lessons learned)
- ✅ **Layout:** Photo column **180×180px explicit pixels** (НЕ aspect-ratio CSS — explicit pixel sizing после mid-session bug где browser-cache подменял картинку другого aspect'а несмотря на CSS `aspect-ratio: 1/1`). Mobile (≤640px) → 120×120
- ✅ **Animation:** только hover-zoom `scale(1.05)` + shadow grow var(--shadow-md) → var(--shadow-lg), 400ms `var(--ease-spring)`. Gated `(hover: hover) and (pointer: fine)`. Никаких pulse/halo/spinning — пользователь явно отверг decoration-эффекты («просто вставь как есть»). Differentiation от других секций: Cases image-zoom — на mouse-tracked spotlight, About image-zoom — без spotlight, минимальный
- ✅ **Bio (PLACEHOLDER, к session 11):** "За 8 лет в автоматизации 1С я понял: главная боль клиентов — не в программе, а в подрядчиках, которые пропадают после сдачи. Команда у нас небольшая — значит, за каждым проектом стоит конкретный человек, который остаётся на связи и после запуска." (~38 слов RU, формула Credibility Hook → Pain Mirror → Operational Promise — research/2026-05-07_b2b-about-section/)
- ✅ **Role:** «Основатель T-Tech» (не CEO для 7-человечной — research: warmer for small business)
- ✅ **Trust pills (3):** «Казань» / «Официальный партнёр 1С» / «8 лет на рынке» — research-ranked elements (location-accountability + verifiable cert + personal-tenure)
- ✅ **`scripts/process-founder-photo.mjs`** — Node sharp script с fallback (real photo если есть `lenar-raw.{jpg,jpeg,png}`, иначе SVG-placeholder с brand-blue gradient + initials «ЛГ»). Не cropит — preserves original aspect (Telegram = 640×640).
- ✅ **`.gitignore`:** добавлено `public/images/about/lenar-raw.*` (raw selfie не в репо, только webp)

### Lighthouse session 10b (3×3)

**Desktop 3×:** 100/100/100/100 (LCP 0.57s, CLS 0.000-0.009, SI 0.45-0.48s, TBT 0)
**Mobile 3×:** 96/98/98 perf, 100/100/100 a11y/bp/seo (LCP 2.18-2.26s, CLS 0, TBT 0, SI 1.51/1.51/4.03s)

**No regression vs session 10a baseline** (desktop 100, mobile 96). Mobile **улучшилось** на 2 из 3 прогонов (96→98 perf, SI 4.03s→1.51s) — вероятно вариативность simulated throttling, не systematic.

### Strategy pivots (важно для session 11+)

1. **Placement: FAQ↔CTABanner, не Reviews↔Programs.** Изначальный roadmap-план был between Reviews и Programs. User сказал «лучше перед самым концом» — sequencing-логика «возражения (FAQ) → trust-anchor (founder) → CTA» подтверждена research-источниками (CTA Placement Best Practices 2026). Финал на 100% совпал с research-рекомендацией.
2. **Layout: 2-col compact (180px photo), не founder-hero.** Research рекомендовал 2-col asymmetric с 4:5 portrait. После 3 итераций по фидбеку user'а — square 1:1 (его photo 640×640), compact 180px (de-emphasised), no border-radius, no halo, only hover-zoom. Финальный паттерн: «founder spotlight as honest small-business signal», NOT «founder hero». Research-direction корректна, но visual scale меньше из-за specifics клиента (small Telegram selfie + de-emphasised section).
3. **Mid-session cache hell.** Aspect-ratio менялся в одной сессии (4:5 → 1:1). Browser cached old CSS+webp агрессивно. Fix: filename rename (`lenar-{w}` → `lenar-v2-{w}`) + explicit pixel sizing (вместо `aspect-ratio: 1/1` + `width: 100%`). Lesson: при mid-session aspect-changes → сразу новые filenames + explicit dimensions, не aspect-ratio.

### Research

[research/2026-05-07_b2b-about-section/report.md](../DeepReserch/research/2026-05-07_b2b-about-section/report.md) — 31 источник, 4 параллельных subagents:
- **Cat. A** — общие B2B-паттерны 2025-2026 (Stripe/Resend/Basecamp/Consulting Success conversion data)
- **Cat. B** — RU 1С-конкуренты: 8 сайтов проверено (Рарус/WiseAdvice/ИБР-Казань/ЦА-Казань/Ф1Софт/Комлайн/АрсанСофт/Интро-С). Только 1 из 8 (ИБР-Казань) показывает реальные имена/лица — асимметричная возможность для T-Tech
- **Cat. C** — founder-bio copywriting (theb2bplaybook + Basecamp + Copyhackers + RU Котов/petr-panda) — формула Credibility Hook → Pain Mirror → Promise, 50-75 слов optimal
- **Cat. D** — CSS-only portrait анимации 2026 (CSS-Tricks scroll-driven, @property gradient borders, Codrops, WCAG 2.2 reduced-motion)

### Файлы изменены

- `src/components/About.astro` — новый, +85 LOC
- `src/pages/index.astro` — +2 LOC (import + insert между FAQ и CTABanner)
- `scripts/process-founder-photo.mjs` — новый, +30 LOC (sharp pipeline + SVG-placeholder fallback)
- `.gitignore` — +2 LOC (lenar-raw.*)
- `public/images/about/lenar-v2-{240|400|600}.webp` — 3 файла (~18/42/76 KB)
- `public/images/about/lenar-raw.jpg` — gitignored (real selfie, 164 KB)
- `REDESIGN-ROADMAP.md` — статус 10b
- `next-session-START.md` — handoff для session 11
- `.lighthouse/lh-10b-*` — 6 reports (gitignored)
- `D:/DeepReserch/research/2026-05-07_b2b-about-section/report.md` — research (31 source)
- `D:/DeepReserch/research/INDEX.md` — обновлён
- `C:/Users/.../memory/project_tattech_client.md` — статус 10b

### Возможные доработки (defer до клиентского input session 11)

- **Real bio + role от Ленара** — placeholder текущий, клиент даст финальный copy в session 11
- **Real numbers в trust pills** — «8 лет на рынке» текущее, клиент уточнит actual founder-tenure (placeholder, не company-age)
- **LinkedIn-link** — research-ranked trust element #5, defer (нужен реальный URL)
- **Section eyebrow text** — «О компании» текущее (generic), session 11 может pivot на «Кто за этим стоит» как H2

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
