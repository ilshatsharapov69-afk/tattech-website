# Session 8 kickoff — T-Tech redesign

> Этот файл всегда содержит промт для **следующей** запланированной сессии. После завершения сессии Claude обновляет этот файл, указывая на следующий шаг.

---

## Что вставить в новый чат

```
T-Tech redesign — session 8 (Кейсы). Открой D:\tattech-website\next-session-START.md и D:\tattech-website\REDESIGN-ROADMAP.md, прочитай оба полностью. Это самая большая сессия — обязательно нужен input от клиента: 2-3 реальных кейса (отрасль / клиент / боль / решение / метрика результата / срок). Если клиент ещё не дал — спроси у меня и приостанови работу до получения. Внимание: 3D tilt после mid-session pivot в session 7 уехал из Cases в Services. На Cases решить со мной — re-use 3D tilt для consistency или skip для дифференциации (рекомендуется skip: Cases использует image-zoom + spotlight gradient как signature). Параллельно сделай research ~1 час по B2B case-study паттернам (Stripe customers, Linear customers, 1С-Рарус кейсы, Vercel showcase) + spotlight gradient через CSS pointer-tracking + image hover-zoom техника. Сохрани в research/2026-MM-DD_b2b-cases-format/report.md. Покажи план и подтверди scope ДО старта работы. В конце сессии: build + ЛОКАЛЬНЫЙ commit (БЕЗ push), Lighthouse 3×3, обнови ROADMAP + next-session-START.md, дай handoff для session 9. Push в GitHub — финальный после session 11.
```

---

## Контекст для Claude (читай при старте сессии)

### Состояние проекта

- **Repo:** `D:\tattech-website` (Astro 6, plain CSS)
- **Live:** https://ilshatsharapov69-afk.github.io/tattech-website/ (отстаёт — push заморожен до session 11)
- **Last local commit:** `<session-7-commit>` (NOT pushed) — Services hover-reveal + accordion + border-glow
- **Live на GitHub Pages соответствует:** `368c809` (5.1 + roadmap freeze)

### Что закрыто (НЕ ТРОГАТЬ без явной просьбы клиента)

- ✅ 5.1 — Header (blue tonal + glass-morphism baseline + 3 icon-buttons)
- ✅ 6 — Все анимации (pulse, scroll progress, mouse-glow, Hero dots spotlight, Stats redesign, counter timing)
- ✅ 7 — Services (3D tilt mouse-tracked / compact reveal price+TG button с стабильной высотой / border-glow conic-gradient / hybrid pricing «от X ₽»)

### ⚠️ ВАЖНО: 3D tilt уехал в Services после mid-session pivot в session 7

Изначальный план session 8 включал 3D tilt на Cases cards (decision #5). После клиентского фидбека в session 7 («сделайте как в barbershop, чтобы 3D были») — 3D tilt был перенесён на Services. **Cases теперь должен решить:**

**Вариант A (consistency)** — переиспользовать 3D tilt и на Cases (одинаковый паттерн на всех cards). Минус: повторяется, может надоесть.

**Вариант B (differentiation, рекомендуется)** — Cases дифференцируется через **image hover-zoom + spotlight gradient + другой формат** (B2B метрики). Без 3D tilt — Services и Cases визуально различаются, каждая секция имеет свой signature эффект.

Спросить у user'а в начале session 8 какой вариант предпочтителен.

### Финальные решения по дизайну (одобрены клиентом 2026-05-07)

См. таблицу в начале REDESIGN-ROADMAP.md. Для session 8 актуальны решения:
- **#5** — 3D tilt (УЖЕ применён на Services в session 7) — re-use или skip на Cases?
- **#6** — Spotlight gradient (mouse-tracked внутренний glow на Cases cards) — обязательно
- **#7** — Image hover-zoom scale(1.1) на Cases cards (как barbershop demo) — обязательно если идём с фото-обложками

---

## Session 8 — детальные шаги

### 0. Input от клиента (BLOCKER, спросить ДО кода)

**Нужно от клиента:**
- 2-3 реальных кейса T-Tech, для каждого:
  - **Отрасль** (например: «Пищевое производство», «Розничная торговля», «Строительство»)
  - **Клиент** (название или общее описание, если NDA — «Региональный дистрибьютор Х»)
  - **Боль** (1-2 предложения — что было до)
  - **Решение** (1-2 предложения — что внедрили)
  - **Метрика результата** (часы / дни / % / ₽; конкретная цифра)
  - **Срок реализации** (1-3 месяца обычно)

**Если клиент не предоставил:** приостанови работу, попроси меня ping'нуть его. Альтернатива (опасная) — generated шаблоны на основе типовых сценариев 1С-внедрения, помеченные как placeholder, для ОДОБРЕНИЯ клиентом до commit.

### 1. Research (~1 час, обязательно ДО кода)

Темы:
- **B2B case-study паттерны** — Stripe customers, Linear customers, Vercel showcase, 1С-Рарус кейсы. Что показывают? (отрасль / метрика / лого vs аватар / срок / quote от клиента?)
- **3D tilt** — vanilla-tilt.js (~3KB gzip) vs CSS-only (perspective + rotateX/Y через CSS variables). Performance comparison (paint, GPU compositing, mobile CPU). Что используют Stripe/Linear?
- **Spotlight gradient через CSS pointer-tracking** — single-component (`<MouseGlow />` уже сделан в session 6) или новый per-card listener? Реюз `mouse-glow.ts` паттерна. Как в barbershop demo сделано.
- **Image hover-zoom** — простой `transform: scale(1.1)` + `overflow: hidden` на parent или image filter эффекты? Transition timing (500ms = barbershop reference).
- **Иконки отрасли** — Phosphor / Tabler icons. Сравнить со stock-фото подходом — что сильнее в B2B (subjective + a11y/perf).

Сохранить в `research/2026-MM-DD_b2b-cases-format/report.md` (frontmatter, ≥5 источников).

### 2. Cases.astro — полный rewrite

**Файл:** `src/components/Cases.astro` (текущая структура — посмотреть до старта)

**Цель:** B2B-формат карточки кейса. Структура:
- Иконка отрасли (Phosphor/Tabler) ИЛИ stock-фото с image-zoom (зависит от решения — спроси клиента «иконки или фото?»)
- Заголовок: отрасль + клиент
- Боль (1-2 строки)
- Решение (1-2 строки)
- **Метрика результата** (большая, с gradient-text, по типу Stats counter)
- Срок реализации (small text)
- Optional: short quote от клиента (1 строка, если предоставлен)

### 3. Эффекты на hover (Cases-only)

1. **Image hover-zoom scale(1.1)** transition 500ms ease-out (если идём через фото). Если иконки — пропустить.
2. **3D tilt** — ⚠️ перенесён в Services в session 7. На Cases решить с user'ом: re-use паттерн (consistency) или skip (differentiation). Если re-use — взять готовый код из Services.astro: pointermove handler обновляющий `--rx`/`--ry` + CSS `transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))`. Параметризировать MAX_TILT (10° на Services — может быть 6° на Cases для меньшей агрессии). На mobile/touch отключить (gated `matchMedia('(hover: hover)')`). prefers-reduced-motion → transform: none.
3. **Spotlight gradient** mouse-tracked внутри карточки (radial 400px, opacity ~0.15, color brand). **ОБЯЗАТЕЛЬНО** — это signature эффект для Cases. Реюз `mouse-glow.ts` подхода или новый per-card listener. Опционально через CSS-only `radial-gradient(... at var(--mx) var(--my) ...)` + JS обновляет CSS variables. Border-glow conic уже на Services — на Cases НЕ дублировать (используем spotlight как differentiator).

### 4. Запреты session 8

- ❌ НЕ трогать Hero / Header / Stats / Services / ScrollProgress / mouse-glow (5.1 + 6 + 7 закрыты)
- ❌ НЕ начинать Reviews (session 9)
- ❌ НЕ менять palette tokens / spacing scale
- ❌ НЕ ломать существующий .reveal-stagger на Cases cards
- ❌ НЕ устанавливать vanilla-tilt без явного approval (CSS-only предпочтительнее)

---

## Чек-лист в конце session 8

1. Research отчёт сохранён в `research/2026-MM-DD_b2b-cases-format/report.md` + INDEX обновлён
2. Реальные кейсы (или approved generated placeholders) встроены в Cases.astro
3. `npm run build` зелёный
4. `npm run preview` + Chrome desktop + mobile (DevTools 360w) — image-zoom + 3D tilt + spotlight работают
5. Mobile: 3D tilt отключён, hover-эффекты отсутствуют (touch ux чистый)
6. Lighthouse 3 прогона desktop + 3 mobile — без регрессии vs session 7 baseline (desktop 100/100/100/100, mobile 95-98/100/100/100)
7. Visual diff: Cases стали B2B-форматом с метриками, исчезла стоковая Tilda-эстетика
8. Спросить «всё ОК?» с показом локального превью (open Chrome at #cases anchor)
9. После OK: **ЛОКАЛЬНЫЙ** `git commit` с детальным message (БЕЗ `git push`, БЕЗ `gh run watch`)
10. Обновить `REDESIGN-ROADMAP.md`: `[x] 8` + `[ ] 9 ← NEXT`
11. Перезаписать `next-session-START.md` промтом для session 9 (Reviews — input от клиента ОБЯЗАТЕЛЕН: 2-3 реальных отзыва)
12. Обновить memory `project_tattech_client.md` (статус session 8) + `project_tattech_redesign_roadmap.md`
13. Вставить в финальный ответ handoff-промт для копирования

---

## Что унаследовали из session 7 (полезный контекст)

- **TG pre-fill helper** `const tgUrl = (msg: string) => \`https://t.me/CyclesOfID?text=\${encodeURIComponent(msg)}\`;` уже используется в Programs.astro И Services.astro — стандарт для CTA. Cases должен использовать тот же паттерн (сообщения вида «Здравствуйте! Хочу обсудить кейс [отрасль]»).
- **3D tilt JS pattern** (Services.astro): pointermove handler читает positon относительно карточки, обновляет `--rx` / `--ry` CSS переменные. CSS трансформирует через `transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))` + `transform-style: preserve-3d`. На pointerleave property removed → eased возврат через `transition: transform 320ms var(--ease-spring)`. Gated `matchMedia('(hover: hover) and (pointer: fine)')` — JS вообще не вешается на touch. Готовый код для копи-паста.
- **Border-glow `@property --bg-angle` + conic-gradient** реализована в Services. На Cases НЕ дублировать (signature эффект Services) — использовать spotlight gradient как differentiator.
- **`@media (hover: hover) and (pointer: fine)` wrapper** для всех hover-only фич — стандарт. На mobile heavy effects выключены полностью.
- **`prefers-reduced-motion`** — глобальный обработчик в global.css уже занулит animation/transition durations, но локальные `transform`-based эффекты нужно явно отключать (см. Services.astro pattern: `transform: none !important`).
- **Compact reveal pattern** (Services.astro): reveal-блок занимает место всегда (фиксированная высота карточки), на default `opacity: 0` + `translateY(6px)`, на hover `opacity: 1` + `translateY(0)`. Без max-height транзиций — нет скачков. На mobile `(hover: none), (pointer: coarse)` — всегда visible. Если на Cases карточке нужен похожий reveal (например, дополнительная информация на hover) — переиспользовать.
- **mouse-glow.ts** уже трекает курсор на `.has-glow` секциях. Для Cases card-уровневый spotlight: либо доработать mouse-glow.ts (добавить таргет `.spotlight-card`), либо отдельный листенер per-card. Альтернатива — расширить тот же 3D-tilt handler из Services чтобы он ещё обновлял `--mx`/`--my` для radial-gradient в карточке.

---

## Если клиент НЕ предоставил кейсы

**Вариант A (предпочтительный):** приостановить session 8, ping клиенту через user'а, дождаться. Не делать placeholder без approval — может пойти на лендинг.

**Вариант B (если клиент далеко и нужно двигаться):** генерация placeholder-кейсов на основе типовых сценариев (например, «Пищевое производство — внедрение УТ + ускорение отчётности 5×»), helmет «PLACEHOLDER — требует подтверждения T-Tech» в commit message + handoff для замены до push session 11. Не делать это без user'а explicit ОК.

---

## Открытые вопросы для клиента (спросить через user'а)

1. **Кейсы:** какие 2-3 реальных проекта показать на лендинге? (отрасль / клиент / боль / решение / метрика / срок)
2. **Иконки или фото?** Phosphor industry icons (clean B2B, экономит на стоке) или фото-обложки кейсов с image-zoom (живее, но нужны качественные фото клиентов)?
3. **NDA:** можно показывать клиента поименно или anonymized («Региональный дистрибьютор Х»)?
4. **Quote от клиента:** есть короткие отзывы клиентов, которые можно встроить в карточку кейса? (1 строка, для усиления доверия)

Если что-то непонятно после прочтения — спросить ДО старта.
