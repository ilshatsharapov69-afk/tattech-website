# T-Tech Phase C Session C5 — SEO + polish (final session)

> Этот файл всегда содержит промт для **следующей** запланированной сессии. Сейчас = Phase C Session C5 — финальная.
>
> Полный план фазы: `D:\tattech-website\PHASE-C-ROADMAP.md`
>
> Завершено: C1 (foundation + /contacts + /privacy + 404 + nav) + C2 (services collection + 3 detail pages) + C3 (5 service-detail pages: ITS family + оборудование + Битрикс24 + ItsTable.astro) + C4 (3 aggregator pages /uslugi /programmy-1s /nashi-kejsi + ServiceCrossLinks). Live: https://ilshatsharapov69-afk.github.io/tattech-website/. Last commit: `590dbb6`.

## Что сделать в C5

1. **Sitemap через `@astrojs/sitemap`:**
   - `npm install @astrojs/sitemap` (единственный add-on, разрешено)
   - `astro.config.mjs` — добавить integration с `site` URL уже настроенным
   - Build генерирует `dist/sitemap-index.xml` + `dist/sitemap-0.xml`
   - Verify: после build все 14 страниц в sitemap

2. **robots.txt** — статический в `public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://ilshatsharapov69-afk.github.io/tattech-website/sitemap-index.xml
   ```

3. **Schema.org JSON-LD:**

   ⚠ **Важно:** в `src/layouts/Base.astro` (lines 60-79) УЖЕ ЕСТЬ глобальный `LocalBusiness` JSON-LD. Это неправильно — `LocalBusiness` должен быть только на `/contacts`. **План:** заменить глобальный на `Organization`, добавить `LocalBusiness` only on /contacts.astro inline.

   - **Organization** (заменить текущий LocalBusiness в Base.astro): name, url, logo, address, telephone, contactPoint (multiple: phone/email/Telegram/WhatsApp), sameAs.
   - **Service** (на каждой service-detail page): name, description, provider, areaServed, offers (price из first pricing tier or itsHighlight pricing). Сделать через [service].astro inline JSON-LD.
   - **FAQPage** (главная + 8 service pages): mainEntity[] из faq array. На главной — добавить в FAQ.astro inline. На service-pages — в [service].astro.
   - **LocalBusiness** (только на /contacts): inline JSON-LD на странице с geo coords (lat 55.821 / lng 49.150 для Дубравной 43а), openingHoursSpecification, telephone, всё что было в Base.
   - **BreadcrumbList** уже есть из C1 (Breadcrumb.astro inline JSON-LD).

4. **Per-page meta polish:**
   - Audit: все 14 страниц имеют unique `<title>` и `metaDescription`. Проверить что нет дублей.
   - `og:image` — main OG (из session 11) применяется ко всем. Per-service custom OG = nice-to-have, defer (или скрипт `build-og-page.mjs`).

5. **Internal linking audit:**
   - Каждая страница достижима из главной за ≤2 клика — проверить ручным crawl.
   - Footer должен ссылаться на /contacts, /privacy.
   - Crosslinks в /uslugi → 6 service-detail; /1s-its → /1s-its-tehno + /1s-its-prof; service-detail → ServiceCrossLinks (3 related).
   - Если orphans → добавить ссылки.

6. **Lighthouse 3×3 на 3 random pages:**
   - 1 aggregator (например /uslugi)
   - 1 service-detail (например /razrabotka-sajtov или /1s-its-prof)
   - 1 главная (compare с session 11 baseline — no regression!)
   - Все desktop ≥95, mobile ≥90.

7. **Memory final update:** `project_tattech_client.md` — Phase C полностью DONE.

## Финал

- `npm run build` green
- 1 локальный commit: `phase-c-5: sitemap + robots + schema.org + final audit`
- Push отдельным шагом → `gh run watch` → smoke test
- Memory final update + `feedback_tattech_phase_c_done.md` (если уместно)
- Update `next-session-START.md` → Phase D или Phase B (см. ниже)

## Stack reminder

- Astro 6, plain CSS, branch `main`
- **Один разрешённый add-on:** `@astrojs/sitemap` (стандартная Astro integration, не community plugin)
- Karpathy guidelines всегда (auto-loaded)

## Что после Phase C

После C5 фаза C закрыта (13 inner pages + SEO done). Дальше клиент-driven choice:
- **Phase A** — revision-loop по placeholder контенту (если клиент пришлёт правки)
- **Phase B** — Decap CMS (+3 000 ₽ к договору, изначальная задача)
- **Phase D** — перенос с GitHub Pages на свой сервер клиента + домен tat-tech.ru + SSL
- **Phase E** — optional perf polish (mobile SI 4.2-4.6s → quality 80→75)
- **Phase F** — Node 20 → 24 в GitHub Actions (до 2026-06-02 deprecation)

## C4 итоги (что уже задеплоено)

**Done:** 3 aggregator pages (/uslugi с 6 services из Content Collection, /programmy-1s с 5 programs из extracted data file, /nashi-kejsi с 8 кейсами + JS-фильтр по 8 отраслям) + ServiceCrossLinks.astro подцеплен к [service].astro перед CTABanner. Schema добавлен `relatedSlugs`, все 8 .md заполнены related slugs.

**Lighthouse C4 (/uslugi):** desktop 100/100/100/100 (3×), mobile 99/100/100/100 (3×). LCP desktop 0.4s, mobile 1.9-2.0s, CLS 0, TBT 0.

**Header nav теперь работает:** все 4 top-level ссылки (/uslugi, /programmy-1s, /nashi-kejsi, /contacts) резолвятся в 200.

## Live preview

```bash
cd D:\tattech-website
npm run dev
# открыть http://localhost:4321/tattech-website/uslugi
```

Если порт 4321 занят (zombie astro/vite): `netstat -ano | grep ':4321 ' | grep LISTENING | awk '{print $5}' | xargs -I {} taskkill //PID {} //F`

## Параллельно (Phase A revision-loop по главной)

Phase A (placeholder swap на главной) идёт отдельным commit'ом между сессиями C1-C5, не блокирует Phase C.

## Что попросить клиента ПЕРЕД C5 push (или сразу после)

См. `memory project_tattech_client_confirmations.md` — собрать в один Telegram message Ленару:
- Цены (ИТС / почасовка / абонентский / Bitrix24 25k / 1С-программ)
- Контент (About bio, Cases pain/deadline, 3 Reviews)
- Тех вопросы (email, Yandex Maps vs 2GIS, домен)

C5 deliverable не блокирует на этом — sitemap/schema/robots можно сделать с placeholder-данными, после правок клиента ничего не сломается.

---

## Что вставить в новый чат

```
T-Tech Phase C Session C5 — SEO + polish (финальная сессия фазы C).

Прочитай:
- D:\tattech-website\PHASE-C-ROADMAP.md (план 5 сессий — C5 последняя)
- D:\tattech-website\next-session-START.md (детали C5)
- memory project_tattech_client.md (см. блок 2026-05-09 C4 DONE для контекста ServiceCrossLinks и aggregator pages)
- memory project_tattech_client_confirmations.md (что попросить клиента)

Задачи C5:
1. @astrojs/sitemap integration (единственный разрешённый add-on)
2. public/robots.txt
3. Schema.org JSON-LD: Organization (везде), Service (8 service-detail), FAQPage (главная + 8 service), LocalBusiness (/contacts)
4. Per-page meta audit (14 страниц — unique title + description)
5. Internal linking audit (orphan pages?)
6. Lighthouse 3×3 на 3 random pages (1 aggregator + 1 service-detail + главная — no regression vs session 11 baseline)

Финал: build green → 1 commit "phase-c-5: sitemap + robots + schema.org + final audit" → push → memory final update.

Stack: Astro 6 + plain CSS, branch main. Один add-on (@astrojs/sitemap). Karpathy guidelines.

Live: https://ilshatsharapov69-afk.github.io/tattech-website/
Repo: D:\tattech-website
```
