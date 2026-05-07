# Session 6 kickoff — T-Tech redesign

> Этот файл всегда содержит промт для **следующей** запланированной сессии. После завершения сессии Claude обновляет этот файл, указывая на следующий шаг.

---

## Что вставить в новый чат

```
T-Tech redesign — session 6. Открой D:\tattech-website\next-session-START.md и D:\tattech-website\REDESIGN-ROADMAP.md, прочитай оба полностью. Сделай research ~30 мин по B2B-анимациям (Stripe/Vercel/Linear pulse, mouse-tracking glow CSS-only, prefers-reduced-motion patterns) и сохрани отчёт в research/2026-MM-DD_b2b-animation-patterns/report.md. Потом покажи план шагов и подтверди scope ДО старта работы. В конце сессии: build + Lighthouse + ЛОКАЛЬНЫЙ commit (БЕЗ push), обнови ROADMAP и next-session-START.md, дай handoff-промт для session 7. Push в GitHub — только финальный после session 11.
```

---

## Контекст для Claude (читай при старте сессии)

### Состояние проекта

- **Repo:** `D:\tattech-website` (Astro 6, plain CSS)
- **Live:** https://ilshatsharapov69-afk.github.io/tattech-website/
- **Last commit:** будет на момент старта 6 — содержит 5.1 + push
- **Lighthouse 5.1 baseline:** desktop 100/100/100/100, mobile 99/100/100/100

### Финальные решения по дизайну (одобрены клиентом 2026-05-07)

См. таблицу в начале REDESIGN-ROADMAP.md. Для session 6 актуальны решения #3 (mouse-tracking glow), #4 (scroll progress bar). Pulse на CTA — собственная цель session 6.

---

## Session 6 — детальные шаги (после research-фазы)

### 0. Research (~30 мин, обязательно ДО кода)

Темы:
- **B2B pulse animation patterns** — Stripe/Vercel/Linear/Resend как делают subtle CTA pulse без casino-vibe. Длительность, easing, scale/box-shadow vs glow ring
- **Mouse-tracking glow CSS-only** — pointer-events + CSS variables (`--mx`, `--my`), perf cost vs JS rAF throttle. Где включать (только белые секции), где не включать (Hero, mobile)
- **`prefers-reduced-motion` safety** — какие анимации обязательно gate'ить
- **Scroll progress bar** — single-element solutions, GPU-friendly transform-only обновление width

Сохранить в `research/2026-MM-DD_b2b-animation-patterns/report.md` (frontmatter обязателен).

### 1. Pulse-анимация на Hero «Написать в Telegram»

**Файл:** `src/components/Hero.astro` (или `src/styles/global.css`, если pulse делаем reusable)

- Subtle box-shadow pulse, 2-3s loop. Цвет под orange CTA (`rgba(245, 158, 11, 0.45)` — match существующий `.hero :global(.btn-primary)` shadow)
- Можно через `@keyframes pulse { 0%,100% { box-shadow: 0 8px 22px rgba(245,158,11,0.45) } 50% { box-shadow: 0 8px 32px rgba(245,158,11,0.65), 0 0 0 8px rgba(245,158,11,0.15) } }`
- Применять только к `.hero .btn-primary` (не глобально на все .btn-primary)
- `data-magnetic` уже есть — pulse не должен ломать magnetic
- Off через `@media (prefers-reduced-motion: reduce)`

### 2. Scroll progress bar

**Новый файл:** `src/components/ScrollProgress.astro` (компонент с CSS + JS)

- Fixed top, height 3px, z-index выше `.header` (101) но ниже mobile-menu
- `background: linear-gradient(90deg, var(--color-brand-700), var(--color-brand-500), #635BFF)`
- JS: `scroll` event с `requestAnimationFrame` throttle, обновляет CSS variable `--scroll-progress` от 0 до 1
- Width — `transform: scaleX(var(--scroll-progress))` + `transform-origin: left` (transform-only = GPU)
- Включить в `src/layouts/Layout.astro` или прямо в `index.astro` сразу после `<body>`

### 3. Mouse-tracking glow на белых секциях

**Реализация:** прямо в `src/styles/global.css` (или новый `src/components/MouseGlow.astro` если нужен JS)

Подход (CSS-only с JS-обновлением variables):
```css
.section.has-glow {
  position: relative;
  overflow: hidden;
}
.section.has-glow::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%),
              rgba(37, 99, 235, 0.05), transparent 70%);
  opacity: 0;
  transition: opacity 200ms;
}
@media (hover: hover) {
  .section.has-glow:hover::before { opacity: 1; }
}
```

JS (mouse-tracking, throttled через rAF):
- Listener на body, обновляет `--mx, --my` на target section
- Off на mobile (`@media (hover: hover)`) — не вешать listener вообще на touch-устройствах

Применить класс `has-glow` к: Services section, Programs section, FAQ section.

### 4. Hover micro-interactions на `.btn`

**Файл:** `src/styles/global.css` `.btn:hover`

Сейчас `translateY(-2px)`. Добавить:
- `box-shadow` grow на hover
- `filter: brightness(1.05)`

И на `.ic-btn-tg`/`.ic-btn-wa`/`.ic-btn-email` — лёгкий glow усилить (уже есть box-shadow, добавить чуть больше spread).

---

## Запреты session 6

- ❌ НЕ менять Header (5.1 закрыт, не трогать)
- ❌ НЕ менять palette tokens
- ❌ НЕ начинать Services hover-reveal (это session 7)
- ❌ НЕ трогать Cases (3D tilt, spotlight — session 8)
- ❌ НЕ трогать тексты
- ❌ НЕ ставить mouse-tracking на Hero (там свои glow-blobs, не накладывать)
- ❌ НЕ ломать magnetic CTA (`data-magnetic` script должен сохраниться)

---

## Чек-лист в конце сессии

1. Research отчёт сохранён в `research/2026-MM-DD_b2b-animation-patterns/report.md` + INDEX обновлён
2. `npm run build` зелёный
3. `npm run preview` + Chrome визуальная проверка desktop + mobile (DevTools 360w)
4. Проверить `prefers-reduced-motion` (DevTools → Rendering → Emulate CSS prefers-reduced-motion: reduce) — анимации должны выключиться
5. Lighthouse: 3 прогона desktop, 3 mobile, без регрессии (target ≥ 5.1 baseline: desktop 100/100/100/100, mobile ≥ 95/100/100/100)
6. DevTools Performance tab — на скролле pulse + scroll progress не должны жрать CPU (>5%)
7. Спросить пользователя «всё ОК?» с показом локального превью (открыть в Chrome)
8. После OK: **ЛОКАЛЬНЫЙ** `git commit` с детальным message (БЕЗ `git push`, БЕЗ `gh run watch` — push только финальный после session 11)
9. Обновить `REDESIGN-ROADMAP.md`: `[x] 6` + `[ ] 7 ← NEXT`
10. Перезаписать `next-session-START.md` промтом для session 7
11. Обновить memory `project_tattech_client.md` (статус session 6)
12. Вставить в финальный ответ handoff-промт для копирования

---

## Если что-то непонятно после прочтения — спросить ДО старта

- Pulse только на Hero CTA или ещё на Cases CTA / других primary buttons?
- Scroll progress — gradient слева-направо или фиксированной длины с moving band?
- Mouse-glow — только на secondary sections или включить в Hero (там уже есть animated glow-blobs)?
