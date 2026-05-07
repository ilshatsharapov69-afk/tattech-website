# T-Tech Phase C Session C2 — Service detail pages part 1 + Content Collection

> Этот файл всегда содержит промт для **следующей** запланированной сессии. Сейчас = Phase C Session 2.
>
> Полный план фазы: `D:\tattech-website\PHASE-C-ROADMAP.md`
>
> Завершено: C1 (foundation + /contacts + /privacy + 404 + nav update + lazy-map). См. `git log` `phase-c-1: foundation + contacts + privacy`.

## Что сделать в C2

1. **Mini-research (1 subagent, 8-10 sources, ~20 мин)** — B2B service-detail page patterns 2026:
   - Stripe Atlas docs, Vercel Functions, Linear marketing, Attio
   - RU 1С-франчайзи: 1С-Рарус, WiseAdvice-IT, БИТ
   - Что показывать в hero / "что входит" / "сколько стоит" / "кейсы по отрасли" / process / faq
   - Output: `research/2026-05-09_b2b-service-detail-patterns/report.md`

2. **Astro Content Collection `services`** — `src/content/config.ts`:
   - Frontmatter schema: slug, title, lead, included[], pricing[], faq[], relatedCases[], heroIcon, ogImage
   - 1 service = 1 .md в `src/content/services/`
   - Уже scraped в `D:\DeepReserch\research\2026-05-08_tattech-inner-content\` — использовать как контент-базу

3. **Dynamic route `src/pages/[service].astro`** — рендерит из коллекции через getStaticPaths

4. **Контент 3 service pages** (template-driven, использовать InnerLayout):
   - `/1s-razrabotka` (от 3 000 ₽/час)
   - `/obsluzhivanie-1s` (от 4 990 ₽/мес ИЛИ 3 000 ₽/час)
   - `/razrabotka-sajtov` (от 50 000 ₽ фикс ИЛИ 3 000 ₽/час)

5. **Layout каждой service page:**
   - PageHero (breadcrumb + H1 + lead + 1 TG CTA + 3 trust pills)
   - "Что входит" — буллеты с чек-иконками
   - "Сколько стоит" — pricing-table (фикс + почасовая где применимо)
   - "Кейсы в этой отрасли" — re-use Cases.astro grid фильтр по `tag`
   - Process (re-use существующий)
   - ServiceFAQ — custom 4-5 Q (не общий FAQ)
   - CTABanner

6. **Lighthouse 3×3 на 1 random service page** (например /razrabotka-sajtov)

## Финал

- `npm run build` green
- 1 локальный commit: `phase-c-2: services collection + 3 detail pages`
- Push отдельным шагом → `gh run watch` → smoke test live
- Memory update: `project_tattech_client.md`
- Update `next-session-START.md` → Phase C Session C3 (ITS family)

## Stack reminder

- Astro 6, plain CSS, branch `main`
- Никаких новых deps
- Karpathy guidelines всегда (auto-loaded)
- Бонус-фичи / refactoring **запрещены** — только то что в скоупе C2

## Live preview

```bash
cd D:\tattech-website
npm run dev
# открыть http://localhost:4321/tattech-website/1s-razrabotka
```

## C1 итоги (что задеплоено)

**Done:** scraping 11 страниц, InnerLayout + Breadcrumb + PageHero, /contacts, /privacy, /404, Header nav update.

**Lighthouse C1 финал:** desktop 100/100/100/100 (6×), mobile 98+ perf / 100 a11y/bp/seo (6×). LCP desktop 350-400ms, mobile 1.6s, CLS 0, TBT 0-91ms.

**Lazy-load карты Яндекс:** заменил inline iframe на click-to-load placeholder — best-practices 77→100 (Яндекс ставит third-party cookies). Best practice + GDPR-friendly паттерн.

**Контент scraping:** 11 .md в `D:\DeepReserch\research\2026-05-08_tattech-inner-content\` + INDEX.md. Готовая база для C2-C4.

## Параллельно (Phase A revision-loop по главной)

Phase A (placeholder swap на главной) идёт отдельным commit'ом между сессиями C1-C5, не блокирует Phase C.

---

## Что вставить в новый чат

```
T-Tech Phase C Session C2 — service-detail pages part 1.

Прочитай:
- D:\tattech-website\PHASE-C-ROADMAP.md (план 5 сессий)
- D:\tattech-website\next-session-START.md (детали C2)
- memory project_tattech_client.md
- D:\DeepReserch\research\2026-05-08_tattech-inner-content\ (scraped контент 11 страниц)

Задачи C2:
1. Mini-research: B2B service-detail page patterns 2026 (8-10 sources, 1 subagent)
2. Astro Content Collection `services` (src/content/config.ts schema)
3. Dynamic route src/pages/[service].astro
4. 3 service pages: /1s-razrabotka, /obsluzhivanie-1s, /razrabotka-sajtov
5. Layout per page: PageHero → Что входит → Сколько стоит → Кейсы → Process → ServiceFAQ → CTABanner
6. Lighthouse 3×3 на 1 random service page

Финал: build green → 1 commit "phase-c-2: services collection + 3 detail pages" → push → memory update → next-session-START.md → C3.

Stack: Astro 6 + plain CSS, branch main. Никаких новых deps. Karpathy guidelines.

Live: https://ilshatsharapov69-afk.github.io/tattech-website/
Repo: D:\tattech-website
```
