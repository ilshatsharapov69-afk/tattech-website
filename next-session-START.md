# T-Tech Phase C Session C4 — Aggregator pages

> Этот файл всегда содержит промт для **следующей** запланированной сессии. Сейчас = Phase C Session C4.
>
> Полный план фазы: `D:\tattech-website\PHASE-C-ROADMAP.md`
>
> Завершено: C1 (foundation + /contacts + /privacy + 404 + nav) + C2 (services collection + 3 detail pages: /1s-razrabotka, /obsluzhivanie-1s, /razrabotka-sajtov) + C3 (5 pages: /1s-its parent, /1s-its-tehno, /1s-its-prof, /podbor-i-ustanovka-oborudovaniya, /vnedrenie-bitriks-24 + ItsTable.astro). Live: https://ilshatsharapov69-afk.github.io/tattech-website/. Last commit: `2c103a2`.

## Что сделать в C4

3 aggregator-страницы — обзорные «landing» для категорий контента, ведут на детали:

1. **/uslugi** — grid 6 услуг (re-use `Services.astro` главной как референс layout, но full-page без duplicate hero):
   - 1С Разработка → /1s-razrabotka
   - Обслуживание 1С → /obsluzhivanie-1s
   - Разработка сайтов → /razrabotka-sajtov
   - 1С:ИТС → /1s-its
   - Подбор оборудования → /podbor-i-ustanovka-oborudovaniya
   - Внедрение Битрикс24 → /vnedrenie-bitriks-24
   - Per-card: иконка + h3 + 1-2 sentence lead + 3 буллета "что входит" (взять из first 3 included.title из collection) + "от X ₽" floor + кнопка "Подробнее" → service-detail

2. **/programmy-1s** — grid 5 программ 1С (re-use `Programs.astro` главной как референс):
   - 1С:Бухгалтерия от 4 000 ₽
   - 1С:Управление торговлей от 8 200 ₽
   - 1С:Документооборот 48 500 ₽
   - 1С:Розница от 4 400 ₽
   - 1С:ЗУП от 9 100 ₽
   - Per-card: название + цена + 3 ключевые фичи + CTA "Подробнее в Telegram"

3. **/nashi-kejsi** — full 8-кейсов grid (re-use `Cases.astro` уже принимает tags=undefined → показывает всё). Фильтр по отраслям сверху (8 чипов: ЖКХ, Производство, Строительство, Шины, Инжиниринг, Одежда, Аптеки, Памятники). Click → filter cases via JS (data attribute approach или показать все, hide rest). Если нет state-management — просто статичный grid + якорные ссылки на `#tag-X` секции.

4. **Cross-linking «Похожие услуги»** — добавить блок в конец каждой service-detail page. 3-4 ссылки на смежные услуги. Pattern:
   - 1s-razrabotka → obsluzhivanie-1s, 1s-its, vnedrenie-bitriks-24
   - obsluzhivanie-1s → 1s-its, 1s-razrabotka, podbor-oborudovaniya
   - razrabotka-sajtov → vnedrenie-bitriks-24, 1s-razrabotka
   - 1s-its → obsluzhivanie-1s, 1s-razrabotka
   - 1s-its-tehno → 1s-its-prof, 1s-its parent, obsluzhivanie-1s
   - 1s-its-prof → 1s-its-tehno, 1s-its parent, obsluzhivanie-1s
   - podbor-oborudovaniya → razrabotka-sajtov, obsluzhivanie-1s
   - vnedrenie-bitriks-24 → razrabotka-sajtov, 1s-razrabotka

   - Создать `src/components/service/ServiceCrossLinks.astro` принимающий `currentSlug` + `links: Array<{slug, title, leadShort}>` (или дёргать из коллекции по slug).
   - Альтернатива минимально: hardcode static map `relatedSlugs: string[]` в frontmatter каждой service .md и добавить в schema.

5. **Lighthouse 3×3 на 1 random aggregator page** (например /uslugi).

## Финал

- `npm run build` green
- 1 локальный commit: `phase-c-4: aggregator pages + service crosslinks`
- Push отдельным шагом → `gh run watch` → smoke test live
- Memory update: `project_tattech_client.md`
- Update `next-session-START.md` → Phase C Session C5 (SEO + polish: sitemap, robots, schema.org JSON-LD, og:image, internal linking audit)

## Stack reminder

- Astro 6, plain CSS, branch `main`
- Никаких новых deps
- Karpathy guidelines всегда (auto-loaded)
- Бонус-фичи / refactoring **запрещены** — только то что в скоупе C4

## C3 итоги (что уже задеплоено)

**Done:** 5 service-detail pages + новый компонент `ItsTable.astro` (compare Техно vs ПРОФ, props.highlight) + schema extension (`pricing` optional, `itsHighlight` enum) + dynamic [service].astro routing.

**Lighthouse C3 (/1s-its-tehno):** desktop 100/100/100/100 (3×), mobile 98/100/100/100 (3×). LCP desktop 0.5s, mobile 2.0-2.1s, CLS 0, TBT 0.

**Astro JSX gotcha:** `<>...</>` fragment + ternary внутри `<a>` или `<td>` ломает HTML — Astro компилятор клонирует stray `<a>` за пределы родителя. Fix — разворачивать на отдельные expressions: `{flag && <Icon/>}` + `<span>{flag ? 'A' : 'B'}</span>`. Записано в `feedback_astro_jsx_fragment_a_tag.md` (если ещё не создан).

**Карта на C4:** Cases.astro уже принимает tags-фильтр + sectionId — для /nashi-kejsi пройдёт без новых пропсов. Для /uslugi и /programmy-1s можно либо переиспользовать homepage компоненты целиком (если поведение совпадает), либо сделать тонкие full-page обёртки. **Рекомендация:** сначала проверить `Services.astro` и `Programs.astro` главной — может быть достаточно использовать их as-is внутри InnerLayout.

## Live preview

```bash
cd D:\tattech-website
npm run dev
# открыть http://localhost:4321/tattech-website/uslugi
```

Если порт 4321 занят (zombie astro/vite): `netstat -ano | grep ':4321 ' | grep LISTENING | awk '{print $5}' | xargs -I {} taskkill //PID {} //F`

## Параллельно (Phase A revision-loop по главной)

Phase A (placeholder swap на главной) идёт отдельным commit'ом между сессиями C1-C5, не блокирует Phase C.

---

## Что вставить в новый чат

```
T-Tech Phase C Session C4 — aggregator pages.

Прочитай:
- D:\tattech-website\PHASE-C-ROADMAP.md (план 5 сессий)
- D:\tattech-website\next-session-START.md (детали C4)
- memory project_tattech_client.md (см. блок 2026-05-09 C3 DONE для контекста ItsTable и Astro JSX gotcha)
- D:\DeepReserch\research\2026-05-08_tattech-inner-content\uslugi.md, programmy-1s.md (scraped контент)

Задачи C4:
1. /uslugi — grid 6 услуг с links на детали (re-use Services.astro как референс)
2. /programmy-1s — grid 5 программ 1С (re-use Programs.astro как референс)
3. /nashi-kejsi — full 8-кейсов grid + фильтр по отраслям (re-use Cases.astro с tags)
4. Cross-linking «Похожие услуги» в конец каждой service-detail page (новый ServiceCrossLinks.astro)
5. Lighthouse 3×3 на /uslugi

Финал: build green → 1 commit "phase-c-4: aggregator pages + service crosslinks" → push → memory → next-session-START → C5 (SEO polish).

Stack: Astro 6 + plain CSS, branch main. Никаких новых deps. Karpathy guidelines.

Live: https://ilshatsharapov69-afk.github.io/tattech-website/
Repo: D:\tattech-website
```
