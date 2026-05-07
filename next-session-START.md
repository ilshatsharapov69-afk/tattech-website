# T-Tech — Phase C закрыта, далее Phase A / B / D (client-driven)

> Этот файл всегда содержит промт для **следующей** запланированной сессии. Phase C полностью DONE 2026-05-09 — 13 inner pages + SEO baseline live.
>
> Следующая сессия зависит от клиента: revision-loop по контенту (A), CMS (B) или перенос на свой домен (D).

## Phase C — DONE summary

5 сессий, ~12h работы Claude. Live: https://ilshatsharapov69-afk.github.io/tattech-website/

| Session | Что задеплоено | Commit |
|---|---|---|
| C1 | /contacts + /privacy + 404 + InnerLayout + Header nav | (см. git log) |
| C2 | services Collection + [service].astro + 3 service-detail pages + 3 subcomponents | `5c3f34b` |
| C3 | 5 service-detail pages (ITS family + оборудование + Битрикс24) + ItsTable.astro | `2c103a2` |
| C4 | 3 aggregator pages (/uslugi /programmy-1s /nashi-kejsi) + ServiceCrossLinks | `590dbb6` |
| C5 | sitemap.xml + robots.txt + Schema.org JSON-LD (Org/LocalBusiness/Service/FAQPage) + meta audit + footer fix | `8dcd57e` |

**Lighthouse C5 (3 pages × 3+3 = 18 прогонов локально):**
- Desktop 9/9: 100/100/100/100, LCP 0.4-0.7s
- Mobile 9/9: home 93-94, /uslugi 99, /1s-razrabotka 94-95 perf; все a11y/bp/seo 100; LCP 2.0-2.7s

**Live URLs:**
- https://ilshatsharapov69-afk.github.io/tattech-website/sitemap-index.xml (200 ✓)
- https://ilshatsharapov69-afk.github.io/tattech-website/robots.txt (200 ✓)

## ⏳ ПЕРЕД следующей сессией — единый Telegram-message Ленару

См. `memory project_tattech_client_confirmations.md`. Собрать в один DM:

**Цены (placeholder подтвердить):**
- 1С:ИТС Техно/ПРОФ — все суммы со scraped tat-tech.ru (5 964 / 12 892 / 23 283 / 44 064 / 79 315 ПРОФ; 9 834 / 18 600 Техно). Это льготные на 2026 — свежие?
- Почасовка 3 500 / 3 200 / 3 000 ₽/час
- Абонентский «от 4 990 ₽/мес» на /obsluzhivanie-1s
- Лендинг «от 50 000 ₽» + корпсайт «от 150 000 ₽» на /razrabotka-sajtov
- Bitrix24 «от 25 000 ₽ под ключ»
- Цены 1С-программ (Бухгалтерия от 4 000, УТ от 8 200, ДО 48 500, Розница от 4 400, ЗУП от 9 100)

**Контент (placeholder → реальный):**
- About Ленара (38 слов биографии)
- About trust pills (Казань / Партнёр 1С / 8 лет)
- Cases (8 штук) pain/deadline — метрики реальные, остальное мы написали
- Reviews (3 testimonials) — полностью placeholder
- Cases AI-photos (8 штук через Gemini Nano Banana 2)

**Технические:**
- email `ttech.kzn.it@gmail.com` — рабочий?
- Yandex Maps на /contacts vs 2GIS?
- Privacy policy юристом проверить
- Domain tat-tech.ru + перенос с GitHub Pages — Phase D
- Decap CMS (+3 000 ₽) — Phase B

**Логотипы клиентов** — 6-8 SVG/PNG для будущей полосы доверия.

## Phase A — Revision-loop (если клиент пришлёт правки)

Когда клиент вернёт фидбек — заменить placeholder в:
- `src/components/About.astro` (bio, trust pills)
- `src/data/cases.ts` (pain/deadline для 8 кейсов)
- `src/components/Reviews.astro` (3 testimonials)
- Ценники в `src/components/Services.astro`, `src/data/programs.ts`, и 8 service.md frontmatter (`pricing.tiers[].price`)

**Workflow:** 1 commit `phase-a-1: client revision pass 1` (или несколько мелких если несколько раундов). Lighthouse spot-check после правок (text-only changes — perf не должна меняться).

## Phase B — Decap CMS (+3 000 ₽ к договору)

Изначальная клиентская задача — клиент сам редактирует контент через CMS UI без правок кода.

**Шаги:**
1. `npm install -D decap-cms-app` (или standalone admin/index.html подключение)
2. `public/admin/index.html` — Decap entry point
3. `public/admin/config.yml` — backend (git-gateway или GitHub direct), collections (services, cases, programs, reviews)
4. Map Astro Content Collection schema → Decap `fields` (zod schema → yaml)
5. Edit-сценарии: услуги (pricing tiers, FAQ), кейсы, программы, отзывы, About bio, цены
6. Auth: GitHub OAuth (через Netlify Identity или git-gateway proxy) — клиент логинится своим gh аккаунтом
7. Test: клиент открывает `/admin`, меняет цену, сохраняет → commit в main → 27s deploy → live

**Workflow:** 2-3 сессии. ~3-4h работы Claude. Документация для клиента (русский how-to PDF / Loom).

## Phase D — Перенос на свой сервер + tat-tech.ru + SSL

1. Регистрация / уже зарегистрирован домен tat-tech.ru — DNS settings
2. Сервер клиента (VPS / shared hosting?) — узнать конфигурацию
3. Build → SCP / rsync → SSL (Let's Encrypt через certbot или Cloudflare proxy)
4. `astro.config.mjs`: `base: '/'`, `site: 'https://tat-tech.ru'` — рекомпиляция
5. Redirect от старого GitHub Pages URL → tat-tech.ru (либо просто отключить gh-pages workflow)
6. Обновить sitemap.xml + Yandex Webmaster + Search Console под новый домен

**Workflow:** 1-2 сессии. Зависит от инфраструктуры клиента.

## Phase E — Optional perf polish (mobile SI 4.2-4.6s)

Defer пока не попросит. Quality 80→75 на webp, smaller fallback изображения, lazy iframe (уже есть на /contacts).

## Phase F — Node 20 → 24 в GitHub Actions (до 2026-06-02)

`.github/workflows/deploy.yml` — обновить `setup-node@v4` `node-version: 20` → 24. Простой PR (1 файл). Проверить build green.

## Stack reminder

- Astro 6, plain CSS, branch `main`
- Один add-on: `@astrojs/sitemap` (добавлен в C5)
- Karpathy guidelines (auto-loaded через ~/.claude/CLAUDE.md)
- Workflow: 1 commit + push отдельным шагом + `gh run watch` smoke test

## Live preview

```bash
cd D:\tattech-website
npm run dev
# открыть http://localhost:4321/tattech-website/
```

## Что вставить в новый чат

```
T-Tech [Phase A/B/D — выбрать что начать первым].

Phase C полностью DONE — 13 inner pages + sitemap + robots + Schema.org JSON-LD live на https://ilshatsharapov69-afk.github.io/tattech-website/.

Прочитай:
- D:\tattech-website\next-session-START.md (этот файл — план A/B/D)
- memory project_tattech_client.md (полная история всех 5 C-сессий)
- memory project_tattech_client_confirmations.md (что попросить клиента)

Какую phase начать:
- Phase A — revision-loop по placeholder контенту (если клиент прислал правки)
- Phase B — Decap CMS (+3 000 ₽ к договору)
- Phase D — перенос на tat-tech.ru + свой сервер + SSL

Repo: D:\tattech-website
Last commit: 8dcd57e (phase-c-5 done)
```
