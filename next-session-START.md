# T-Tech Phase B — Decap CMS внедрение + тест

> Phase C закрыта (5 сессий, 13 inner pages, SEO baseline). Клиент Ленар согласился на Decap CMS (+3 000 ₽ к договору). **Эта сессия: внедрить и протестировать end-to-end.**

## Что делаем

Подключаем Decap CMS к Astro Content Collection (`services`) + редактируемые data-файлы (`cases.ts`, `programs.ts`) + контент-блоки на главной (About bio, Reviews, Hero copy, ценники Services).

Цель — клиент логинится на `tat-tech.ru/admin/` (или `ilshatsharapov69-afk.github.io/tattech-website/admin/`), правит контент через UI → Decap коммитит в main → 27s deploy → live.

## ⚠ Главное препятствие — auth на GitHub Pages

Сайт хостится на GitHub Pages, **не Netlify**. Стандартный Decap workflow «Netlify Identity + git-gateway» не работает.

**Перед началом сессии — mini-research (1 subagent, 8-10 sources, ~15 мин):**
- Какой OAuth-backend для Decap CMS на GitHub Pages в 2026 году best practice?
- Варианты на проверку: Cloudflare Worker as OAuth proxy / Vercel-hosted decap-proxy / Sveltia CMS (fork с native GitHub OAuth, без proxy) / GitHub OAuth App + DIY proxy
- Что выбрать с т.з. простоты setup'а, бесплатности, надёжности на 2026
- Если research покажет что Sveltia CMS реально drop-in замена — взять её (proxy не нужен, GitHub OAuth напрямую)

## Stack & contraints

- Astro 6, plain CSS, branch `main`, GitHub Pages deploy
- **Один новый add-on:** Decap CMS (либо `decap-cms` npm, либо `<script>` standalone в `public/admin/index.html`)
- Может потребоваться 1 small infra service (Cloudflare Worker для OAuth proxy) — бесплатный, без креди-карты
- Karpathy guidelines (auto-loaded)
- Workflow: 1-3 commits + push + `gh run watch` smoke test

## План сессии (предварительный — уточнить после research)

1. **Research backend (15 мин)** — выбрать OAuth-стратегию.
2. **`public/admin/index.html`** — Decap (или Sveltia) entry point.
3. **`public/admin/config.yml`** — backend конфиг + collections schema:
   - `services` (folder `src/content/services`, file mode, fields из content schema: slug, title, metaTitle, metaDescription, heroTitle, heroLead, heroPills[], icon, included[], pricing.tiers[], itsHighlight, relatedSlugs[], faq[], casesTitle, caseTags[], order)
   - `cases` (file mode → `src/data/cases.ts` — но это TS, не markdown! → **решение:** перенести cases в `src/content/cases/*.md` или `src/data/cases.json`)
   - `programs` (то же самое — `src/data/programs.ts` → JSON или markdown collection)
   - `home_blocks` (file mode → `src/content/home/{about,reviews,hero,services-meta}.md` или прямые правки в `src/components/About.astro` / `Reviews.astro` через `src/data/home.json`)
4. **Refactor** TS data files (`cases.ts`, `programs.ts`) → JSON или markdown collections, чтобы Decap мог редактировать.
5. **OAuth setup:**
   - Создать GitHub OAuth App (settings/developers/new-oauth-app), callback на proxy URL
   - Deploy proxy (Cloudflare Worker или Vercel function) с `CLIENT_ID` + `CLIENT_SECRET` env vars
   - Подставить proxy URL в `config.yml` `backend.base_url`
6. **Локальный тест:** `npm run dev` → `localhost:4321/tattech-website/admin/` → login → edit one service price → save → проверить commit в репо (на test branch?).
7. **Live тест:** push → wait deploy → `tat-tech.ru/admin/` (или github.io URL) → клиентский flow повторить.
8. **Документация для Ленара:** короткий how-to (RU, в `D:\tattech-website\CMS-GUIDE.md`):
   - Как залогиниться (GitHub login)
   - Где править цены / About / Reviews / Cases
   - Что произойдёт после Save (commit + auto-deploy ~30s)
   - Что делать если возникла ошибка
9. **Финал:** 1-3 commits + push + smoke test + memory update (`project_tattech_client.md` — новый блок `2026-05-XX — Phase B Session B1 DONE`).

## Edge cases / риски

- **Decap не любит TypeScript data files** — нужен refactor `cases.ts`/`programs.ts` в JSON или Astro Content Collection. Это меняет импорты в `Cases.astro`, `Programs.astro`, `programmy-1s.astro`, `nashi-kejsi.astro`. Lighthouse re-run после refactor (no regression check).
- **Markdown body для services:** сейчас все service.md имеют пустое body (только frontmatter). Decap по дефолту требует body — либо настроить `editor: { preview: false }` + body skip, либо добавить optional body field. Не блокер.
- **Image uploads:** Decap может загружать картинки в `public/images/`. Для `og-image.png` per-service это nice-to-have. Defer на отдельную сессию.
- **Concurrent edits:** клиент + Claude правят одни файлы — стандартный git conflict. Документировать как разруливать.

## Lighthouse re-check после Phase B

После refactor data files + добавления Decap admin (только `/admin/` страницы — не должны быть в основном bundle):
- Run на 3 random pages (например главная + /uslugi + /1s-its-prof) — desktop + mobile preset.
- Compare с C5 baseline (desktop 100/100/100/100, mobile 93-99 perf).
- /admin/ страницы в sitemap НЕ попадают (уже исключены через `astro:sitemap` config или вручную).

## Что после Phase B

- **Phase A** — revision-loop по placeholder контенту, когда клиент пришлёт правки (или сам внесёт через CMS — самостоятельно).
- **Phase D** — перенос на tat-tech.ru + свой сервер + SSL.
- **Phase F** — Node 20 → 24 в GitHub Actions (до 2026-06-02).

## Файлы в курсе

- `D:\tattech-website\PHASE-C-ROADMAP.md` (контекст Phase C, для понимания content schema)
- `D:\tattech-website\src\content.config.ts` (services collection schema — мапить в Decap fields 1-в-1)
- `D:\tattech-website\src\data\cases.ts` + `programs.ts` (refactor candidates)
- `D:\tattech-website\src\components\About.astro` + `Reviews.astro` (placeholder content, кандидаты на CMS-редактируемость)
- `memory project_tattech_client.md` — полная история проекта
- `memory project_tattech_client_confirmations.md` — placeholder/вопросы Ленару (решаются после CMS — клиент сам внесёт)

## Live preview

```bash
cd D:\tattech-website
npm run dev
# http://localhost:4321/tattech-website/
# CMS будет на http://localhost:4321/tattech-website/admin/
```

## Live URLs

- https://ilshatsharapov69-afk.github.io/tattech-website/ (текущий)
- https://ilshatsharapov69-afk.github.io/tattech-website/admin/ (после Phase B)

Repo: `D:\tattech-website`
Last commit: `9a07839` (fix space-7 padding bug)
Branch: `main`
