# Session 9 kickoff — T-Tech redesign (Отзывы — demo-first)

> Этот файл всегда содержит промт для **следующей** запланированной сессии.

---

## Что вставить в новый чат

```
T-Tech redesign — session 9 (Отзывы demo-first). Открой D:\tattech-website\next-session-START.md и D:\tattech-website\REDESIGN-ROADMAP.md, прочитай оба полностью. ВАЖНО: НЕ ждём реальные отзывы от клиента — demo-first workflow продолжается (см. memory feedback_tattech_demo_first.md). Пишем 2-3 placeholder отзыва в B2B-формате, связанных с кейсами session 8 (один отзыв ↔ один кейс из ЖКХ/пищевки/строительства/розницы). Аватары: инициалы в цветном круге (brand-coloured), без stock-фото. Сейчас Reviews.astro — текущий компонент, переписать. Research ~30 мин: Linear/Vercel/Stripe testimonials format + avatar-as-initials patterns + B2B placeholder testimonial copywriting (избегаем «отлично всё, спасибо» — конкретика boli/решения/цифры). Сохрани в research/2026-MM-DD_b2b-testimonials-format/report.md. Покажи план + подтверди scope ДО старта работы. В конце: build + ЛОКАЛЬНЫЙ commit + Lighthouse 3×3 + обнови ROADMAP/next-session-START.md + handoff session 10a (AI photo generation через Gemini API key — у user'а есть). Push в GitHub — финальный после session 11.
```

---

## Контекст для Claude (читай при старте сессии)

### 🎯 Workflow: demo-first продолжается

С session 8 — формат «делаем полную demo с placeholder контентом, клиент правит позже». Применимо к sessions 9 (Reviews), 10b (About). Session 10a (AI photo generation) — у user'а есть Gemini API key, использовали для барбершопа (см. memory).

### Состояние проекта (после session 8)

- **Repo:** `D:\tattech-website` (Astro 6, plain CSS)
- **Live:** https://ilshatsharapov69-afk.github.io/tattech-website/ (отстаёт — push заморожен до session 11)
- **Last local commit:** session 8 (Cases grid 4×2 + B2B + spotlight + hover-zoom + footer-strip), NOT pushed
- **Lighthouse session 8:** desktop 100/100/100/100 (3×), mobile 98/100/100/100 (3×), LCP 2.2s, SI 1.5s, CLS 0 — лучше session 7 baseline (+1 perf)

### Что закрыто (НЕ ТРОГАТЬ без явной просьбы клиента)

- ✅ 5.1 — Header (blue tonal + glass-morphism + 3 icon-buttons)
- ✅ 6 — Анимации (pulse, scroll progress, mouse-glow, Hero spotlight, Stats redesign)
- ✅ 7 — Services (3D tilt + compact reveal + border-glow + цены + TG-CTA)
- ✅ 8 — Cases (grid 4×2 + B2B-формат + image hover-zoom + per-card spotlight gradient + footer-strip)

### Signature эффекты — для дифференциации НЕ дублировать

- **Hero:** dots spotlight (cursor-tracked mask)
- **Services:** 3D tilt + border-glow conic-gradient
- **Cases:** image hover-zoom + per-card spotlight radial-gradient
- **Reviews (session 9):** что-то новое для дифференциации — либо subtle quote-mark animated cursor, либо progressive disclosure on hover, либо staggered fade-in. **DECISION POINT в начале session 9.**

---

## Session 9 — детальные шаги (demo-first)

### 0. Прочитать Reviews.astro и контекст (~5 мин)

- Открыть `src/components/Reviews.astro` — посмотреть текущую структуру (что есть сейчас).
- Связать с кейсами session 8 (Cases.astro) — один отзыв per industry для целостности.

### 1. Research (~30 мин)

Темы:
- **Linear / Vercel / Stripe testimonials cards** — формат: должность + компания/индустрия + 1-2 строки боль + 1 строка результат с метрикой. Avatar handling.
- **Avatar-as-initials** patterns — circle 48px, brand-coloured background, white text initials. Tabler / Lucide примеры. Avoid stock-фото.
- **Russian B2B testimonial placeholder copywriting** — региональный (Казань / 1С / отрасли клиентов T-Tech), past-tense, конкретный pain → конкретный результат, избегаем «отлично всё, спасибо».
- **Hover-эффект для testimonial card** — subtle, не повторяет Services/Cases (border-glow / spotlight использованы). Варианты: quote-mark fade-in, staggered text reveal, hover-lift only.

Сохранить в `research/2026-MM-DD_b2b-testimonials-format/report.md` (frontmatter, ≥5 источников, 2025-2026 sources only — пользователь не любит устаревшие источники).

### 2. Reviews.astro rewrite — 2-3 placeholder отзыва

**Структура карточки:**
```
[avatar-initials в brand-circle]   [должность]
                                   [компания/отрасль anonymized]
─────── divider ───────
[боль 1 строка]
[результат с конкретной цифрой 1 строка]
```

**3 placeholder отзыва (связь с кейсами session 8):**

1. **ЖКХ:** «Ольга К., главный бухгалтер УК. Управление многоквартирным фондом, Татарстан.»
   - Pain: «Раньше расхождения по платежам выявляли раз в квартал.»
   - Result: «Сейчас контроль ежедневный, отчёт за минуту.»

2. **Аптечная сеть:** «Расул А., руководитель ИТ. Сеть аптек, 35 точек.»
   - Pain: «Уведомления в МДЛП дублировали вручную в две системы.»
   - Result: «Один интерфейс — приёмка и МДЛП за один клик.»

3. **Производство памятников:** «Ильнур М., владелец. 1000+ изделий/год.»
   - Pain: «Каждый заказ — ручная смета в Excel, без связи со складом.»
   - Result: «Заказ-смета-склад в одной системе, время сметы −60%.»

Помечаем в commit message: «PLACEHOLDER TESTIMONIALS — клиент подтверждает в session 11».

### 3. Запреты session 9

- ❌ НЕ трогать Hero / Header / Stats / Services / Cases / ScrollProgress / mouse-glow
- ❌ НЕ начинать About (session 10b) или AI photos (session 10a)
- ❌ НЕ менять palette tokens / spacing scale
- ❌ НЕ ждать клиента — placeholder + commit
- ❌ НЕ повторять signature-эффекты Services (border-glow) или Cases (spotlight + zoom) — для дифференциации

---

## Чек-лист в конце session 9

1. Research отчёт сохранён в `research/2026-MM-DD_b2b-testimonials-format/report.md` + INDEX обновлён (≥5 источников, 2025-2026 only)
2. 2-3 placeholder отзыва в B2B-формате (avatar-initials + должность + компания + боль + результат)
3. `npm run build` зелёный
4. `npm run preview` + Chrome desktop + mobile (DevTools 360w) — отзывы читаются, hover-эффект работает
5. Lighthouse 3×3 desktop + 3×3 mobile — без регрессии vs session 8 baseline (desktop 100, mobile 98)
6. После OK: **ЛОКАЛЬНЫЙ** `git commit` (БЕЗ `git push`)
7. Обновить `REDESIGN-ROADMAP.md`: `[x] 9` + `[ ] 10a ← NEXT`
8. Перезаписать `next-session-START.md` промтом для session 10a (AI photo generation — спросить про Gemini API key, у user'а есть)
9. Обновить memory `project_tattech_client.md` (статус session 9)
10. Вставить в финальный ответ handoff-промт для копирования

---

## Что унаследовали из session 8 (полезный контекст)

- **B2B copywriting tone:** past-tense, named process, конкретный consequence — НЕ generic «процессы были неэффективны». См. research session 8 report (категория «Pain copywriting»).
- **Avatar-as-initials pattern** — 48px circle с brand-color background + white text initials. Используется во всех B2B SaaS (Linear, Vercel) когда нет логотипа компании.
- **Anonymization 2-part descriptor:** `[вертикаль] + [география/масштаб]` — «УК ЖКХ, Татарстан, 240 зданий» лучше чем «УК».
- **Mobile fallback** — 1col grid для testimonials (как Cases на mobile). `@media (hover: hover) and (pointer: fine)` обёртка для hover-эффектов.
- **Research filter — 2025-2026 only** на implementation patterns (top sites). Стабильные web-стандарты (W3C / CSS) — год не критичен. См. session 8 report «Категория A vs B».

---

## Открытые вопросы для user'а в начале session 9

1. **Hover-эффект для testimonials:** quote-mark fade-in / staggered text reveal / просто hover-lift? (для дифференциации с Services border-glow и Cases spotlight)
2. **Сколько отзывов:** 2 (focused) / 3 (вариативность) / 4 (плотнее)? Рекомендую 3 — связаны с топ-3 кейсами.
3. **Avatar initials background:** все brand-blue (consistency) или per-industry (как badge на Cases — разные цвета)? Per-industry даёт визуальную связь с Cases section.
4. **Layout:** grid (как Cases) или slider/carousel (как Programs)? Grid рекомендую — 2-3 testimonials умещаются в одну строку без скрытия.
