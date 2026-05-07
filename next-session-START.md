# Session 8 kickoff — T-Tech redesign (Cases — demo-first)

> Этот файл всегда содержит промт для **следующей** запланированной сессии.

---

## Что вставить в новый чат

```
T-Tech redesign — session 8 (Кейсы demo-first). Открой D:\tattech-website\next-session-START.md и D:\tattech-website\REDESIGN-ROADMAP.md, прочитай оба полностью. ВАЖНО: НЕ ждём реальные кейсы от клиента — переключились на demo-first workflow (см. memory feedback_tattech_demo_first.md). Используем существующие 8 кейсов из Cases.astro как референс, улучшаем формат до B2B (отрасль/боль/решение/метрика/срок), придумываем правдоподобные метрики. Существующие 13 фото в `D:/DeepReserch/research/2026-05-06_tattech-redesign/assets/site-images/case-photos/` — переиспользуем (или генерим новые если есть Gemini API key — спроси). 3D tilt после mid-session pivot в session 7 уже на Services — на Cases решить со мной (skip для дифференциации, рекомендуется). Signature Cases-эффект: image hover-zoom scale(1.1) + spotlight gradient mouse-tracked. Research ~1 час: B2B case-study паттерны (Stripe customers / Linear customers / 1С-Рарус кейсы / Vercel showcase) + spotlight gradient implementation + image hover-zoom техника. Сохрани в research/2026-MM-DD_b2b-cases-format/report.md. Покажи план + подтверди scope ДО старта работы. В конце: build + ЛОКАЛЬНЫЙ commit + Lighthouse 3×3 + обнови ROADMAP/next-session-START.md + handoff session 9. Push в GitHub — финальный после session 11.
```

---

## Контекст для Claude (читай при старте сессии)

### 🎯 Workflow: demo-first

**С 2026-05-07 (после session 7) — НЕ блокироваться на ожидание клиентского input'а.** См. `feedback_tattech_demo_first.md`. Делаем полную demo-версию с placeholder/generated контентом → клиент видит готовое → точечные правки → push.

Применимо к sessions 8 (Cases), 9 (Reviews), 10b (About). Session 10a (AI photos) — спросить у user'а есть ли API key, иначе fallback.

### Состояние проекта

- **Repo:** `D:\tattech-website` (Astro 6, plain CSS)
- **Live:** https://ilshatsharapov69-afk.github.io/tattech-website/ (отстаёт — push заморожен до session 11)
- **Last local commit:** `0727c55` (NOT pushed) — docs follow-up. Основная работа — `e95ce8c` (session 7: Services 3D tilt + compact reveal + border-glow)
- **Live на GitHub Pages соответствует:** `368c809` (5.1 + roadmap freeze)

### Что закрыто (НЕ ТРОГАТЬ без явной просьбы клиента)

- ✅ 5.1 — Header (blue tonal + glass-morphism baseline + 3 icon-buttons)
- ✅ 6 — Все анимации (pulse, scroll progress, mouse-glow, Hero dots spotlight, Stats redesign, counter timing)
- ✅ 7 — Services (3D tilt mouse-tracked / compact reveal price+TG button с стабильной высотой / border-glow conic-gradient / hybrid pricing «от X ₽»)

### Владелец T-Tech

**Ленар Гильмутдинов** — основатель/владелец. Используется в session 10b (About-блок). Не упоминать в session 8 (Cases — это про клиентов T-Tech, не про Ленара). См. `project_tattech_owner.md`.

### ⚠️ ВАЖНО: 3D tilt уехал в Services после mid-session pivot

Изначальный план session 8 включал 3D tilt на Cases cards (decision #5 ROADMAP). После клиентского фидбека в session 7 — 3D tilt был перенесён на Services. **Cases теперь должен решить:**

**Вариант A (consistency)** — переиспользовать 3D tilt и на Cases (одинаковый паттерн на всех cards). Минус: повторяется, может надоесть.

**Вариант B (differentiation, рекомендуется)** — Cases дифференцируется через **image hover-zoom + spotlight gradient + B2B-формат**. Без 3D tilt — Services и Cases визуально различаются, каждая секция имеет свой signature эффект.

Спросить у user'а в начале session 8.

---

## Session 8 — детальные шаги (demo-first)

### 0. Прочитать Cases.astro и контекст (~5 мин)

- Открыть `src/components/Cases.astro` — посмотреть текущую структуру (8 кейсов: ЖКХ, Пищевое произ-во, Строительство, Шины, Инжен.оборудование, Одежда, Аптека, Памятники).
- Открыть `D:/DeepReserch/research/2026-05-06_tattech-redesign/assets/site-images/case-photos/` — 13 фото с именами `case-01-zhkh-...` до `case-08-monuments-...` (AI-stock из Tilda).
- Решить: оставляем 8 кейсов или сокращаем до 6 (проще для скана) / 4 (focused).

### 1. Research (~1 час, параллельно с шагом 0)

Темы:
- **B2B case-study форматы:** Stripe customers, Linear customers, Vercel showcase, 1С-Рарус кейсы — что показывают (отрасль / метрика / лого vs аватар / срок / quote клиента?)
- **Spotlight gradient через CSS pointer-tracking** — реюз `mouse-glow.ts` подхода (sections-level) или новый per-card listener? Реализация через `radial-gradient(... at var(--mx) var(--my) ...)` + JS обновляет CSS variables. Performance per-card vs per-section.
- **Image hover-zoom scale(1.1)** transition 500ms — техника + overflow:hidden обвязка. Барбершоп-демо как референс.
- **B2B placeholder copywriting** — как правдоподобно выдумать метрики, не выглядя как marketing-bullshit. Числа должны быть конкретные (не «увеличили продажи в Y раз»).

Сохранить в `research/2026-MM-DD_b2b-cases-format/report.md` (frontmatter, ≥5 источников).

### 2. Cases.astro rewrite — B2B формат

**Файл:** `src/components/Cases.astro`

**Новая структура карточки кейса:**

```
[image / icon at top]                  ← либо фото-обложка с hover-zoom, либо industry-иконка (Phosphor)
[ОТРАСЛЬ — pill / eyebrow]              ← «Пищевое производство»
[h3: «Региональный дистрибьютор Х»]     ← клиент anonymized или реальный
[боль — 1-2 строки]                     ← «Учёт партий вёлся в Excel...»
[решение — 1-2 строки]                  ← «Внедрили 1С:Управление торговлей...»
─────── divider ───────
[МЕТРИКА — большая, gradient-text]      ← «-65% времени на отчётность» / «×3 точность приёмки»
[срок реализации — small text]          ← «Внедрено за 2 месяца»
[опц: quote клиента — 1 строка]         ← «Раньше тратили день, теперь час» — Главбух
```

**8 кейсов из tat-tech.ru** (placeholder улучшения, можно переписать):

| # | Отрасль | Текущее | Placeholder улучшения (придумываем правдоподобно) |
|---|---|---|---|
| 1 | ЖКХ | Управляющая компания | Боль: «учёт начислений в Excel»; Решение: «1С:УК»; Метрика: «−70% ошибок в платёжках»; Срок: «3 мес» |
| 2 | Пищевое произ-во | Меркурий + Честный знак | Боль: «маркировка вручную»; Решение: «УТ + Меркурий + ЧЗ интеграция»; Метрика: «−85% времени на маркировку»; Срок: «2 мес» |
| 3 | Строительство | Учёт материалов | Боль: «расход не отслеживался»; Решение: «1С:Стройка»; Метрика: «−40% перерасход»; Срок: «4 мес» |
| 4 | Шины (розница) | Чек-лента | Боль: «...»; Решение: «1С:Розница»; Метрика: «...»; Срок: «1 мес» |
| 5 | Инженерное оборудование | B2B продажи | Боль: «...»; Решение: «УТ»; Метрика: «...»; Срок: «3 мес» |
| 6 | Одежда (розница) | Маркировка | Боль: «...»; Решение: «Розница + Честный знак»; Метрика: «...»; Срок: «2 мес» |
| 7 | Аптека | Лицензированный учёт | Боль: «...»; Решение: «1С:Аптека»; Метрика: «...»; Срок: «1 мес» |
| 8 | Памятники | B2C услуги | Боль: «...»; Решение: «...»; Метрика: «...»; Срок: «1 мес» |

Заполнить через research индустриальной типовой боли + правдоподобных метрик. **Пометить в commit message:** «PLACEHOLDER METRICS — клиент подтверждает в session 11».

### 3. Эффекты на Cases (signature для дифференциации с Services)

1. **Image hover-zoom** scale(1.1) transition 500ms ease-out — на фото-обложке. `overflow: hidden` на parent. Если выбираем industry-иконки вместо фото — пропустить.
2. **Spotlight gradient** mouse-tracked — radial-gradient(400px circle at var(--mx) var(--my), rgba(brand,0.15), transparent 70%) — следует за курсором ВНУТРИ карточки. JS-handler обновляет CSS variables (можно расширить mouse-glow.ts или отдельный per-card listener). Это signature эффект Cases (border-glow — signature Services).
3. **3D tilt** — DECISION POINT с user'ом в начале session. Skip (рекомендуется) или re-use из Services.

### 4. Картинки

**Вариант A (по умолчанию):** копировать 8 существующих фото из `research/2026-05-06_tattech-redesign/assets/site-images/case-photos/` в `public/images/cases/` (если ещё не там), оптимизировать через sharp (640/960/1200w WebP srcset как в session 3 паттерне). Использовать как фото-обложки кейсов.

**Вариант B:** Phosphor / Tabler industry icons вместо фото. Чище B2B-вайб, нет stock-photo проблем, но менее «живо».

**Вариант C (требует API key):** AI-генерация через Gemini Nano Banana 2 / Imagen 4 в едином B2B-стиле. Спросить user'а есть ли ключ (free $200 кредит на новых аккаунтах AI Studio). Если есть — sprint этого как **session 8 stretch goal** или defer на session 10a.

### 5. Запреты session 8

- ❌ НЕ трогать Hero / Header / Stats / Services / ScrollProgress / mouse-glow (5.1 + 6 + 7 закрыты)
- ❌ НЕ начинать Reviews (session 9)
- ❌ НЕ менять palette tokens / spacing scale
- ❌ НЕ ждать клиента — placeholder + commit, клиент правит позже (см. `feedback_tattech_demo_first.md`)
- ❌ НЕ устанавливать vanilla-tilt / Framer без явного approval (CSS-only предпочтительнее)

---

## Чек-лист в конце session 8

1. Research отчёт сохранён в `research/2026-MM-DD_b2b-cases-format/report.md` + INDEX обновлён
2. 8 (или 6/4) кейсов в B2B-формате с placeholder метриками
3. Картинки (фото / иконки / generated) на месте, оптимизированы
4. `npm run build` зелёный
5. `npm run preview` + Chrome desktop + mobile (DevTools 360w) — image-zoom + spotlight работают на desktop, отключены на mobile
6. Lighthouse 3 прогона desktop + 3 mobile — без регрессии vs session 7 baseline (desktop 100/100/100/100, mobile 97-98/100/100/100)
7. Открыть Chrome на [http://localhost:4321/tattech-website/#cases](http://localhost:4321/tattech-website/#cases) для визуальной проверки
8. После OK: **ЛОКАЛЬНЫЙ** `git commit` (БЕЗ `git push`)
9. Обновить `REDESIGN-ROADMAP.md`: `[x] 8` + `[ ] 9 ← NEXT`
10. Перезаписать `next-session-START.md` промтом для session 9 (Reviews — также demo-first, 3 placeholder отзыва)
11. Обновить memory `project_tattech_client.md` (статус session 8)
12. Вставить в финальный ответ handoff-промт для копирования

---

## Что унаследовали из session 7 (полезный контекст)

- **TG pre-fill helper** `const tgUrl = (msg: string) => \`https://t.me/CyclesOfID?text=\${encodeURIComponent(msg)}\`;` уже используется в Programs.astro И Services.astro — стандарт для CTA. Cases должен использовать тот же паттерн.
- **3D tilt JS pattern** (Services.astro): pointermove handler читает positon относительно карточки, обновляет `--rx` / `--ry` CSS переменные. CSS трансформирует через `transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))`. Готовый код для копи-паста если решим re-use.
- **Border-glow `@property --bg-angle` + conic-gradient** реализована в Services. На Cases НЕ дублировать — использовать spotlight gradient как differentiator.
- **`@media (hover: hover) and (pointer: fine)` wrapper** для всех hover-only фич — стандарт.
- **`prefers-reduced-motion`** — глобальный обработчик в global.css + локальные `transform: none !important` overrides (см. Services.astro pattern).
- **Compact reveal pattern** (Services.astro): reveal-блок занимает место всегда (фиксированная высота карточки), `opacity` + `translateY` transitions, без max-height скачков. Применимо если на Cases карточке нужен похожий reveal элемент.
- **mouse-glow.ts** уже трекает курсор на `.has-glow` секциях. Для Cases card-уровневый spotlight: либо доработать (добавить таргет `.spotlight-card`), либо отдельный листенер per-card. Альтернатива — расширить тот же 3D-tilt handler (если выберем вариант A) чтобы он ещё обновлял `--mx`/`--my` для radial-gradient в карточке.

---

## Открытые вопросы для user'а в начале session 8

1. **3D tilt на Cases:** re-use из Services (consistency) или skip (differentiation)? Рекомендую skip.
2. **Картинки:** существующие scraped фото / Phosphor industry-иконки / AI-generated через Gemini? Если AI — есть ли API key Google AI Studio?
3. **8 кейсов или сократить?** 8 — много для скана, 4-6 — фокусированнее. Какие отрасли важнее (ЖКХ / пищевка / строительство / розница / etc.)?
4. **Quote от клиента (1 строка) на карточке** — да/нет? Усиливает доверие, но это уже placeholder text не про Ленара (выдуманные слова реального клиента T-Tech).
