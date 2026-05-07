# T-Tech Phase C — 13 внутренних страниц

> Дочерний план для post-redesign фазы. Главная страница уже live (commit `9edac15` + Phase A polish coming). Этот документ — про оставшиеся 13 страниц tat-tech.ru.

## Контекст

- Stack заморожен: Astro 6 + plain CSS (no Tailwind, no React)
- Repo: `D:\tattech-website`, branch `main`
- Live: https://ilshatsharapov69-afk.github.io/tattech-website/
- Workflow: 1 сессия = 1 commit + 1 push (bundle freeze был только в redesign-фазе, больше не применяем)

## Карта 13 страниц

| # | Slug | Тип | Сессия |
|---|---|---|---|
| 1 | /contacts | static | C1 |
| 2 | /privacy | static | C1 |
| 3 | /1s-razrabotka | service-detail | C2 |
| 4 | /obsluzhivanie-1s | service-detail | C2 |
| 5 | /razrabotka-sajtov | service-detail | C2 |
| 6 | /1s-its | service-detail (parent) | C3 |
| 7 | /1s-its-tehno | service-detail (sub-tier) | C3 |
| 8 | /1s-its-prof | service-detail (sub-tier) | C3 |
| 9 | /podbor-i-ustanovka-oborudovaniya | service-detail | C3 |
| 10 | /vnedrenie-bitriks-24 | service-detail | C3 |
| 11 | /uslugi | aggregator | C4 |
| 12 | /programmy-1s | aggregator | C4 |
| 13 | /nashi-kejsi | aggregator | C4 |

## Sessions (5 шт., ~10-12h всего)

### C1 — Foundation + 2 static pages (~2h)

1. Scrape 11 missing страниц с tat-tech.ru параллельным WebFetch → raw content в `D:\DeepReserch\research\2026-05-08_tattech-inner-content\`. Это data-collection для C2-C4, **не** research.
2. `src/layouts/InnerLayout.astro` — Header + Breadcrumb + PageHero slot + main slot + CTABanner + Footer
3. Shared components: `Breadcrumb.astro`, `PageHero.astro`
4. `/contacts` — 4 канала (TG / WA / телефон / email) + Yandex Maps iframe (Дубравная 43а)
5. `/privacy` — RU 152-ФЗ совместимый шаблон, 1500-2500 слов, чистый
6. `Header.astro` nav update — ссылки на /uslugi, /programmy-1s, /nashi-kejsi, /contacts
7. Custom `404.astro`
8. Lighthouse 3×3 desktop+mobile на /contacts, /privacy

**Commit:** 1, pushed. **Memory update.**

### C2 — Service detail pages part 1 + content collection (~3h)

1. Mini-research (1 subagent, 8-10 sources) — B2B service-detail page patterns 2026 (Stripe Atlas, Vercel Functions, Linear, RU франчайзи). 20 минут.
2. Astro Content Collection `services` — frontmatter schema в `src/content/config.ts` (slug, title, lead, included[], pricing[], faq[], relatedCases[], heroIcon)
3. Dynamic route `src/pages/[service].astro` — рендерит из коллекции
4. Контент 3 service pages (template-driven):
   - /1s-razrabotka
   - /obsluzhivanie-1s
   - /razrabotka-sajtov
5. Layout каждой service page: Hero (breadcrumb + H1 + lead + 1 TG CTA + 3 trust pills) → "Что входит" (buллeты) → "Сколько стоит" (тарифы) → "Кейсы в этой отрасли" (фильтр Cases по tag) → Process (re-use) → ServiceFAQ (custom 4-5 Q) → CTABanner
6. Lighthouse 3×3 на 1 random service page

**Commit:** 1, pushed.

### C3 — Service detail pages part 2 + ITS family (~3h)

1. /podbor-i-ustanovka-oborudovaniya
2. /vnedrenie-bitriks-24
3. /1s-its (parent — overview, compare table Tehno vs Prof, links на 2 sub-pages)
4. /1s-its-tehno (full детальная страница тарифа)
5. /1s-its-prof (full детальная страница тарифа)
6. Lighthouse 3×3 на 1 random ITS page

**Pattern:** ITS family — общий компонент `ItsTable.astro` с переключателем тарифов, показывается на /1s-its / /1s-its-tehno / /1s-its-prof в разных конфигах.

**Commit:** 1, pushed.

### C4 — Aggregator pages (~2h)

1. /uslugi — grid 6 услуг с краткими описаниями + ссылки на детальные страницы
2. /programmy-1s — grid 5 программ (Бухгалтерия / УТ / ДО / Розница / ЗУП), per-card: цена + 3 буллета + CTA. Re-use Programs.astro компонента или новый pattern для full-page.
3. /nashi-kejsi — full grid 8 кейсов (re-use Cases.astro design), фильтр по отраслям сверху
4. Cross-linking: добавить блок "Похожие услуги" в конец каждой service-detail page

**Optional (defer):** /nashi-kejsi/[slug].astro per-case detail (8 sub-pages). Запросить у клиента детальный контент.

**Commit:** 1, pushed.

### C5 — SEO + polish (~1.5h)

1. Per-page `<title>`, meta description, og:image (per service — custom через `build-og-page.mjs` или inherit base)
2. `sitemap.xml` через `@astrojs/sitemap`
3. `robots.txt`
4. Schema.org JSON-LD:
   - `Organization` (footer, все страницы)
   - `Service` (service-detail pages)
   - `FAQPage` (главная + service pages с FAQ)
   - `LocalBusiness` (на /contacts)
5. Internal linking audit — no orphan pages
6. Lighthouse 3×3 на 3 random inner pages
7. Lighthouse главная — compare с session 11 baseline (no regression)
8. Memory final update — фаза C done

**Commit:** 1, pushed.

## Research

- **Не нужен** глобальный research — 196 источников с redesign главной переносятся (B2B-формулы, banned phrases, animation patterns, accessibility — всё применимо)
- **C1:** scraping 11 страниц = data-collection
- **C2:** mini-research (1 subagent, 8-10 sources, ~20 мин) — service-detail page patterns 2026
- **C5:** опционально mini-research (1 subagent) — Schema.org B2B best practices, иначе skip

## Workflow

- 1 сессия = 1 commit + push отдельным шагом
- Lighthouse spot-check (1-2 random pages) per session, не full audit
- `npm run build` green после каждого commit
- Memory update в конце каждой сессии (`project_tattech_client.md`)
- Karpathy guidelines всегда (auto-loaded)

## Open questions / risks

- **Контент service-detail pages:** старая Tilda не богата текстом. После C1 scraping посмотрим, чего не хватает — возможно потребуется copy-pass от клиента или Claude генерация под review.
- **Цены тарифов:** placeholder на главной → та же логика на inner pages → клиент подтверждает позже. Не блокирует.
- **/privacy:** генерим из открытых 152-ФЗ шаблонов, но ОБРАБАТЫВАЕМ что у T-Tech нет email-формы / cookies / трекеров (минимум данных). Клиент может пробежаться юристом потом.
- **/contacts карта:** Yandex Maps iframe (free, без API key) — default. Если клиент захочет 2GIS — переключим.
- **CMS интеграция (Phase B):** Content Collection в C2 ставим заранее с прицелом — Decap CMS потом подключается тривиально.

## Параллельно с Phase A (revision loop от клиента)

Если клиент пришлёт правки в placeholder'ы главной (Phase A) — это не блокирует Phase C. Phase A правки идут отдельным commit'ом между сессиями C1-C5 без бardака.
