# T-Tech Phase C Session C3 — Service detail pages part 2 + ITS family

> Этот файл всегда содержит промт для **следующей** запланированной сессии. Сейчас = Phase C Session C3.
>
> Полный план фазы: `D:\tattech-website\PHASE-C-ROADMAP.md`
>
> Завершено: C1 (foundation + /contacts + /privacy + 404 + nav) + C2 (services collection + 3 detail pages: /1s-razrabotka, /obsluzhivanie-1s, /razrabotka-sajtov). Live: https://ilshatsharapov69-afk.github.io/tattech-website/. Last commit: `5c3f34b`.

## Что сделать в C3

1. **Контент 5 service pages** через тот же `services` Content Collection (просто новые .md в `src/content/services/`):
   - `/podbor-i-ustanovka-oborudovaniya` (scope-зависимая, без фикс-цены — почасовая модель + «получить смету»)
   - `/vnedrenie-bitriks-24` (от 25 000 ₽ фикс ИЛИ почасовая 3 000 ₽/ч)
   - `/1s-its` (родительская — overview + ItsTable со сравнением Техно vs ПРОФ + ссылки на 2 sub-pages)
   - `/1s-its-tehno` (full детальная страница тарифа Техно)
   - `/1s-its-prof` (full детальная страница тарифа ПРОФ, 12 сервисов)

2. **Новый компонент `ItsTable.astro`** — переиспользуемая compare-table между Техно vs ПРОФ. Показывается на `/1s-its` (полная), на `/1s-its-tehno` и `/1s-its-prof` (highlighted нужный столбец).
   - Контент таблицы готов в `D:\DeepReserch\research\2026-05-08_tattech-inner-content\1s-its.md`.
   - Расширить content schema если ItsTable требует кастомные поля; иначе передавать через props.

3. **Re-use всё из C2:** InnerLayout, IncludedList, ServicePricing, ServiceFAQ, Cases с tags filter, Process, CTABanner. Никаких новых паттернов — research C2 валиден для C3.

4. **Layout каждой service page** (тот же что в C2):
   - PageHero (breadcrumb + 3 trust pills + TG CTA)
   - IncludedList («Что входит» — 5 буллетов)
   - ServicePricing (3-tier hybrid)
   - Cases с фильтром по `caseTags`
   - Process (re-used)
   - ServiceFAQ (5 objection-handling Q/A)
   - CTABanner (через InnerLayout)

5. **ITS-specific layout pivot:** /1s-its и sub-tier страницы могут заменить ServicePricing на ItsTable как primary pricing block (compare 2 тарифа в табличной форме нагляднее чем 3 раздельные карточки).

6. **Lighthouse 3×3 на 1 random ITS page** (например /1s-its-tehno).

## Финал

- `npm run build` green
- 1 локальный commit: `phase-c-3: services part 2 + ITS family`
- Push отдельным шагом → `gh run watch` → smoke test live
- Memory update: `project_tattech_client.md`
- Update `next-session-START.md` → Phase C Session C4 (aggregator pages /uslugi /programmy-1s /nashi-kejsi)

## Stack reminder

- Astro 6, plain CSS, branch `main`
- Никаких новых deps
- Karpathy guidelines всегда (auto-loaded)
- Бонус-фичи / refactoring **запрещены** — только то что в скоупе C3

## C2 итоги (что уже задеплоено)

**Done:** `src/content.config.ts` (Astro 6 schema), 3 service .md в `src/content/services/`, dynamic route `src/pages/[service].astro`, 3 service subcomponents (`src/components/service/IncludedList.astro` / `ServicePricing.astro` / `ServiceFAQ.astro`), Cases.astro refactor (data → `src/data/cases.ts`, optional props for filter/copy).

**Lighthouse C2 (/razrabotka-sajtov):** desktop 100/100/100/100 (3×), mobile 95-97 perf / 100 a11y/bp/seo (3×). LCP desktop 0.5-0.6s, mobile 2.4s, CLS 0, TBT 0.

**Mini-research:** `research/2026-05-09_b2b-service-detail-patterns/` — 14 источников, валидировано: 5-item «что входит», 3-tier hybrid pricing «от X ₽», 4-5 service-FAQ objection-handling.

## Live preview

```bash
cd D:\tattech-website
npm run dev
# открыть http://localhost:4321/tattech-website/1s-its-tehno
```

Если порт 4321 занят (zombie astro/vite): `netstat -ano | grep ':4321 ' | grep LISTENING | awk '{print $5}' | xargs -I {} taskkill //PID {} //F`

## Параллельно (Phase A revision-loop по главной)

Phase A (placeholder swap на главной) идёт отдельным commit'ом между сессиями C1-C5, не блокирует Phase C.

---

## Что вставить в новый чат

```
T-Tech Phase C Session C3 — service-detail pages part 2 + ITS family.

Прочитай:
- D:\tattech-website\PHASE-C-ROADMAP.md (план 5 сессий)
- D:\tattech-website\next-session-START.md (детали C3)
- memory project_tattech_client.md (см. блок 2026-05-09 C2 DONE для контекста collection и компонентов)
- D:\DeepReserch\research\2026-05-08_tattech-inner-content\ (scraped 1s-its*, podbor-*, vnedrenie-bitriks-24)
- research/2026-05-09_b2b-service-detail-patterns/report.md (паттерны валидны для C3)

Задачи C3:
1. 5 новых .md в src/content/services/: 1s-its, 1s-its-tehno, 1s-its-prof, podbor-i-ustanovka-oborudovaniya, vnedrenie-bitriks-24
2. Новый компонент src/components/service/ItsTable.astro (compare Техно vs ПРОФ)
3. Re-use всех C2 компонентов (IncludedList, ServicePricing, ServiceFAQ, Cases с tags)
4. /1s-its parent — ItsTable вместо ServicePricing в роли pricing block
5. Lighthouse 3×3 на /1s-its-tehno

Финал: build green → 1 commit "phase-c-3: services part 2 + ITS family" → push → memory update → next-session-START.md → C4.

Stack: Astro 6 + plain CSS, branch main. Никаких новых deps. Karpathy guidelines.

Live: https://ilshatsharapov69-afk.github.io/tattech-website/
Repo: D:\tattech-website
```
