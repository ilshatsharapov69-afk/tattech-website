# Post-redesign kickoff — T-Tech (next session prompt)

> Этот файл всегда содержит промт для **следующей** запланированной сессии.

## Status: ✅ Redesign DONE 2026-05-07

8 сессий + pre-flight завершены. Live: https://ilshatsharapov69-afk.github.io/tattech-website/

Финальный bundle 10 коммитов запушен в origin/main (commit `9edac15`). Deploy зелёный (28s build+deploy).

**Lighthouse final на LIVE:** Desktop perf 97-99 / a11y 100 / bp 100 / seo 100; Mobile perf 95-96 / a11y 100 / bp 100 / seo 100 (LCP mobile 2.02-2.24s, CLS ~0, TBT 22-30ms). Все ROADMAP-таргеты перевыполнены.

---

## Что вставить в новый чат (default — апгрейд placeholder'ов после client input)

```
T-Tech post-redesign (Phase A: client revision loop). Открой D:\tattech-website\next-session-START.md и REDESIGN-ROADMAP.md (раздел "Post-redesign defer"), прочитай оба полностью + memory project_tattech_client.md.

Задача: применить client-input на placeholder'ы которые остались после session 11. List:
1. About.astro — real bio (1-2 предложения от первого лица, formula Credibility Hook → Pain Mirror → Operational Promise)
2. About.astro — real role (если не "Основатель T-Tech")
3. About.astro — real founder-tenure (текущее "8 лет на рынке" — placeholder, не company-age)
4. Cases.astro — real pain-описания на 8 кейсов (текущий placeholder past-tense, нужен реальный из проектной истории)
5. Cases.astro — real deadline на 8 кейсов
6. Reviews.astro — real имена / метрики (3 testimonials, сейчас Ольга К./Расул А./Ильнур М. — placeholder)
7. Services.astro / Programs.astro — клиент подтверждает цены (placeholder)

Если клиент пришлёт subset — применить только то что есть. text-only changes, ≤30 LOC, 1 commit, push отдельным шагом (НЕ bundle).

После: build green → git push origin main → gh run watch → smoke-test live → Lighthouse 3×3 desktop+mobile (compare против session 11 baseline). Memory + ROADMAP update.
```

---

## Альтернативные следующие фазы (по приоритету клиента)

### Phase A — Client revision loop (рекомендованный default)
**Триггер:** клиент видит live, присылает текстовые правки. 1-2 раунда.
**Scope:** swap placeholder'ов на real content. Text-only.
**LOC:** ≤30 per round.
**Lighthouse:** проверять что нет регрессии vs session 11 baseline.

### Phase B — Decap CMS подключение
**Триггер:** клиент хочет сам редактировать контент.
**Scope:** изначальная клиентская задача (+3 000 ₽ к договору). Wire Decap CMS на GitHub Pages, настроить collections для services/programs/cases/reviews/about.
**Effort:** 1-2 сессии.
**Stack:** Decap CMS на GitHub Pages, Astro content collections, OAuth через GitHub.

### Phase C — 13 внутренних страниц
**Триггер:** клиент даёт зелёный после Phase A/B.
**Scope:** /uslugi, /programmy-1s, /nashi-kejsi, /contacts, /privacy, /1s-razrabotka, /obsluzhivanie-1s, /razrabotka-sajtov, /1s-its, /1s-its-tehno, /1s-its-prof, /podbor-i-ustanovka-oborudovaniya, /vnedrenie-bitriks-24
**Effort:** 4-6 сессий.
**Контент:** только главная и /nashi-kejsi отсканированы (см. report.md из session 1). Остальные 11 страниц — догнать через WebFetch tat-tech.ru.

### Phase D — Перенос с GitHub Pages на собственный сервер клиента
**Триггер:** клиент готов оплатить хостинг + домен tat-tech.ru.
**Scope:** miграция dist/ на VPS, настройка SSL, DNS (tat-tech.ru → новый сервер), 301-редирект со старой Тильды.
**Effort:** 1-2 сессии (зависит от провайдера).

### Phase E — Performance polish (опционально)
**Триггер:** если клиент захочет mobile perf >96 на live.
**Scope:** quality webp 80→75 или smaller fallback (текущий mobile SI 4.2-4.6s — тяжёлый webp payload). LCP уже < 2.5s — над таргетом.
**Effort:** 1 сессия.

### Phase F — GitHub Actions Node 20 → 24
**Триггер:** до 2026-06-02 (deprecation deadline).
**Scope:** обновить `.github/workflows/*.yml` — actions/checkout@v4, actions/setup-node@v4, actions/upload-pages-artifact@v3, actions/deploy-pages@v4 на новые версии или добавить FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true.
**Effort:** 15 минут.

---

## Контекст для Claude (читай при старте post-redesign)

### Состояние проекта (после session 11 + push)

- **Repo:** `D:\tattech-website` (Astro 6, plain CSS, no Tailwind)
- **Branch:** `main` (10 коммитов от pre-flight до 9edac15 запушены в origin)
- **Live:** https://ilshatsharapov69-afk.github.io/tattech-website/ (актуальная версия = session 11)
- **Last commit:** `9edac15` (session 11: benefit-driven copy pass)
- **Lighthouse final live:** desktop 97-99 perf / mobile 95-96 perf / a11y bp seo 100 на обоих

### Что закрыто финально (НЕ ТРОГАТЬ без explicit client request)

- ✅ Pre-flight — Variant B rollback
- ✅ 5.1 — Header blue tonal + glass-morphism + 3 icon-buttons + email
- ✅ 6 — Animations: pulse, scroll progress, mouse-glow, Hero spotlight, Stats redesign, Header glass
- ✅ 7 — Services: 3D tilt + compact reveal + border-glow + цены + TG-CTA
- ✅ 8 — Cases: grid 4×2 + B2B-формат + image hover-zoom + spotlight gradient + footer-strip
- ✅ 9 — Reviews: B2B + per-industry avatar-initials + quote-mark hover
- ✅ 10a — AI photo generation: 8 case-photos B2B-publication style (Gemini Nano Banana 2)
- ✅ 10b — About: founder-spotlight с реальной Ленар-selfie 180×180 sq + bio placeholder + 3 trust pills
- ✅ 11 — Benefit-driven copy: 4 H2/eyebrow pivot (Services / Cases / Programs / About)

### Open client-input items (placeholder'ы ждут revision-loop)

См. список выше в основном промте.

---

## Запреты post-redesign (без явной client-просьбы)

- ❌ НЕ менять структуру компонентов (text-only edits)
- ❌ НЕ добавлять новые компоненты / секции
- ❌ НЕ трогать палитру / spacing tokens
- ❌ НЕ переписывать css-классы
- ❌ НЕ добавлять Tailwind / GSAP / Framer / React (стек заморожен)
- ❌ НЕ запускать `gh run watch` per-trivial-edit (только когда есть push)
- ❌ НЕ делать backend-формы (все channels через external links)

---

## История redesign'a (8 сессий, ~9 ч работы Claude)

См. `REDESIGN-ROADMAP.md` — каждая сессия документирована: цели, what shipped, Lighthouse, research, файлы.

Research отчёты в `D:/DeepReserch/research/2026-05-{06,07}_*`:
- 2026-05-06_tattech-redesign — initial research (1С франчайзи + B2B SaaS эталоны)
- 2026-05-07_tattech-color-research — color refresh (Variant B sandwich)
- 2026-05-07_b2b-animation-patterns — session 6 (25 src)
- 2026-05-07_b2b-services-packaging — session 7 (11 src)
- 2026-05-07_b2b-cases-format — session 8 (18 src)
- 2026-05-07_b2b-testimonials-format — session 9 (24 src)
- 2026-05-07_gemini-image-gen — session 10a (28 src)
- 2026-05-07_b2b-about-section — session 10b (31 src)
- 2026-05-07_b2b-benefit-headlines — session 11 (14 src)

Total research depth: **~196 источников** на 8 сессий.

---

## Memory update после post-redesign session

- `project_tattech_client.md` — статус «redesign DONE + pushed», текущая phase
- `feedback_*.md` — новые learnings если будут (например про CMS интеграцию или revision-loop pattern)
