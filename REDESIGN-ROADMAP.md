# T-Tech Redesign Roadmap (post-session-5 pivot)

**Started:** 2026-05-07
**Trigger:** UX/CRO-аудит другой нейронкой + правки клиента → переделка landing page
**Цель:** превратить шаблонный лендинг в самый сильный кейс портфолио. B2B-конверсия из посетителя в квалифицированный лид (Казань, 1С-внедрение).

**Workflow:** одна сессия = один шаг = один commit. В конце каждой сессии Claude генерирует короткий handoff-промт для следующей. Между сессиями — review клиента.

**Кэп контекста на сессию:** ≤200K tokens (≤20% от 1M).

---

## Текущий статус

```
[ ] 5.1 — Top-bar revamp + Hero CTA revert + Spacing fix     ← NEXT
[ ] 6   — Анимации primary CTA + button micro-interactions
[ ] 7   — Услуги: упаковка вместо пустых ссылок
[ ] 8   — Кейсы: B2B-формат с реальными данными
[ ] 9   — Отзывы: real B2B (должность + боль + результат)
[ ] 10  — Блок «О нас» (новый, человеческое лицо)
[ ] 11  — Финальный copywriting pass (benefit headlines)
```

---

## Pre-flight (DONE)

- ✅ Variant B rollback применён: оставлены Header (Telegram + WhatsApp icon-buttons), `phone.svg`, регистрация phone в `Icon.astro`. Удалены: `CallbackModal.astro`. Откатан Hero.astro и index.astro к оригиналу session 4.
- ✅ Текущий live: https://ilshatsharapov69-afk.github.io/tattech-website/ (commit `6dd6646` — без новой работы; baseline = после этого commit)
- ✅ Lighthouse session 4 baseline: desktop 100/100/100/100, mobile 96/100/100/100

---

## Session 5.1 — Top-bar revamp + Hero CTA revert + Spacing

**Status:** pending • **No research** • **No client input** • **~100 LOC**

### Цели

1. **Hero CTA primary** — оставить как сейчас (Telegram), визуально подготовить к session 6 анимациям. Никаких «Заказать звонок».
2. **Контакты переезжают в Header** — phone, Telegram, WhatsApp, email.
   - Phone: текстом, как сейчас.
   - Telegram: круглая кнопка **Telegram brand blue** `#229ED9`, при hover чуть темнее. Иконка белая.
   - WhatsApp: круглая кнопка **WhatsApp brand green** `#25D366`, hover — темнее. Иконка белая.
   - Email: маленькая icon-кнопочка (надо добавить email.svg) или текст-ссылка с иконкой ✉ — определить в начале сессии.
3. **Hero — убрать дублирующие контакты** (`.hero-contacts` блок: phone + email удалить, остаётся только CTA + secondary + trust pills).
4. **Spacing fix** — между Stats (300+/420/2016) и Services сейчас слишком большой разрыв. Сжать до уровня других секционных переходов. И в целом аудит вертикального ритма всех секций.

### Out of scope (для session 6+)

- ❌ Pulse-анимация на «Написать в Telegram» (это session 6)
- ❌ Email modal или дополнительные каналы (session 5.1 только переносит существующее)
- ❌ Изменения текста в Hero/Stats (session 11)

### Success criteria

- Build green, Lighthouse desktop ≥ 95/95/100/95, mobile ≥ 90/95/100/95 (без регрессии vs session 4 baseline)
- Phone visible в Header, не пропадает на mobile (mobile menu)
- Telegram + WhatsApp в брендовых цветах на и dark Hero header, и на белом scrolled header
- Visual diff: Hero после изменений проще (ушёл дублирующий блок контактов)
- Stats → Services gap сократился, общий scroll-length уменьшился

### Deliverables

- 1 commit, ≤ 5 файлов, ≤ 100 LOC delta
- Lighthouse `.lighthouse/lh-5.1-{desktop|mobile}-{1|2|3}.html`
- Handoff на session 6 в конце сессии

### Файлы которые трогаем

- `src/components/Header.astro` — добавить email-кнопку, переключить TG/WA на brand colors
- `src/components/Hero.astro` — удалить `.hero-contacts` блок (с CSS) + сократить `gap` если нужно
- `src/components/Stats.astro` — проверить и при нужде ужать padding-block снизу
- `src/components/Services.astro` — проверить padding-top
- (опц.) `src/components/icons/email.svg` + регистрация в `Icon.astro`

---

## Session 6 — Анимации primary CTA + button micro-interactions

**Status:** pending • **Research нужен** (~30 мин) • **No client input** • **~60 LOC**

### Research

- B2B pulse animation patterns: NOT casino-style. Subtle attention magnet. Stripe / Vercel / Linear как делают
- `prefers-reduced-motion` safe — обязателен fallback
- Shadow-pulse vs scale-pulse vs ring-pulse — что выбрать

### Цели

1. Pulse на Hero «Написать в Telegram» CTA (subtle, attention без раздражения)
2. Hover micro-interactions на всех `.btn` (translateY, shadow grow)
3. Magnetic CTA уже есть — проверить что не мешает pulse
4. Все TG/WA icon-кнопки в Header — лёгкая ripple/glow на hover
5. Принципы: motion gated through `prefers-reduced-motion`

### Success criteria

- Reduced-motion → анимаций нет, кнопки статичны
- Lighthouse perf без регрессии (animations on transform/opacity only)
- На прокрутке pulse не сжирает CPU (DevTools FPS check)

### Deliverables

- 1 commit, ≤ 3 файла, ≤ 60 LOC delta
- `research/2026-MM-DD_b2b-pulse-cta/report.md` (короткий, ~3 источника)

---

## Session 7 — Услуги: упаковка вместо пустых ссылок

**Status:** pending • **Research нужен** (~1 час) • **Возможен input от клиента** • **~120 LOC**

### Research

- Топ-5 1С-внедренцев РФ (1С-Рарус, BIA Technologies, ITAdvice, Корус Консалтинг, ВЦ Раздолье) — как они подают каждую услугу. Что в expanded view: bullets / pricing / case-link / form?
- Раскрытие: accordion vs hover-reveal vs card-flip vs modal? Best practice для B2B desktop + mobile

### Цели

1. Убрать пустые «Узнать подробнее» (сейчас они ведут в `#services` или никуда — confusing)
2. Каждая услуга → expanded состояние (hover desktop, tap mobile) с 3 benefit-bullets и optional «от X ₽» price hint
3. Single-page UX — никаких переходов на несуществующие /uslugi/* страницы (это session 12+)

### Возможный input

- Согласовать тексты bullets (можем сначала сгенерировать → ты редактируешь)

### Deliverables

- 1 commit, ≤ 3 файла, ≤ 120 LOC delta
- `research/2026-MM-DD_b2b-services-packaging/report.md`

---

## Session 8 — Кейсы: B2B-формат с реальными данными

**Status:** pending • **Research нужен** (~1 час) • **Input от клиента ОБЯЗАТЕЛЕН** • **~140 LOC**

### Research

- B2B case-study patterns (Stripe customers, Linear customers, 1С-Рарус кейсы) — структура отрасль / клиент / боль / решение / метрика / срок
- Иконки отраслей вместо стоков: Heroicons / Phosphor / Tabler — что подходит

### Input от клиента

- 2-3 реальных кейса:
  - Отрасль (например: Пищевое производство)
  - Клиент или общее описание (если NDA — «Производитель, оборот N млн»)
  - Боль (1-2 предложения)
  - Решение (1-2 предложения)
  - **Метрика результата** (часы / дни / % / ₽)
  - Срок реализации
- Если реальных кейсов нет → согласовать generated шаблоны

### Deliverables

- 1 commit, ≤ 3 файла, ≤ 140 LOC delta
- `research/2026-MM-DD_b2b-cases-format/report.md`

---

## Session 9 — Отзывы: real B2B

**Status:** pending • **Research нужен** (~30 мин) • **Input от клиента ОБЯЗАТЕЛЕН** • **~80 LOC**

### Research

- Linear / Vercel / Stripe testimonials — формат: должность + компания + 1 строка боль + 1 строка результат
- Avatar handling без stock-photos: инициалы в круге / abstract pattern / лого компании

### Input от клиента

- 2-3 реальных отзыва:
  - Должность (Главбух / Финдиректор / Собственник)
  - Компания (или анонимно: «производственная компания Казань»)
  - Боль которую решил T-Tech (1 строка)
  - Результат (1 строка с метрикой)

### Deliverables

- 1 commit, ≤ 2 файла, ≤ 80 LOC delta

---

## Session 10 — Блок «О нас» (новый)

**Status:** pending • **Research нужен** (~30 мин) • **Input от клиента ОБЯЗАТЕЛЕН** • **~100 LOC**

### Research

- B2B about-section patterns: личное лицо vs «команда» vs «миссия». Trust-driving элементы

### Input от клиента

- Фото владельца компании (можешь скинуть из Telegram, разрешение ≥ 600×600)
- Имя + должность владельца
- 1-2 предложения «почему мы» от первого лица
- Опционально: 1-2 ключевых сотрудника (фото + должность)

### Deliverables

- 1 commit, новый компонент `src/components/About.astro`, обновлён `index.astro`
- ≤ 100 LOC delta

---

## Session 11 — Финальный copywriting pass

**Status:** pending • **Research нужен** (~30 мин) • **Может потребовать ревью** • **text-heavy, ~30 LOC**

### Research

- B2B benefit-driven headlines — формулы: PAS, AIDA адаптированные для landing
- Tone-references: tat-tech.ru конкуренты + примеры экспертного без воды

### Цели

1. Все H2/H3 на странице → benefit-focused (что получит читатель), не feature-focused (что мы делаем)
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
- ❌ Не ломать `--color-bg-tint` / brand tokens / Hero gradient — color system frozen с session 4
- ❌ Не пушить без визуальной проверки на mobile breakpoint
- ❌ Не делать backend-формы — все channels через external links (Telegram/WhatsApp/tel/mailto)
- ✅ Каждая сессия → один commit с детальным message
- ✅ Lighthouse 3 прогона desktop + 3 mobile после каждой сессии
- ✅ Memory update после каждой сессии (project_tattech_client.md status + новые feedback)
- ✅ Karpathy guidelines всегда (auto-loaded из ~/.claude/CLAUDE.md)

---

## Целевые показатели (после всех 7 сессий)

- Desktop: perf ≥ 95 / a11y ≥ 95 / bp = 100 / seo ≥ 95
- Mobile: perf ≥ 90 / a11y ≥ 95 / bp = 100 / seo ≥ 95
- LCP mobile < 2.5s, CLS < 0.05, INP < 200ms
- Visual: проще, плотнее (меньше скролла на топ-3 экрана), brand-coherent
- Conversion (если получится отследить): клик на «Написать в Telegram» из Hero — основная метрика
