# Session 11 kickoff — T-Tech redesign (финальный copywriting pass + push)

> Этот файл всегда содержит промт для **следующей** запланированной сессии.

---

## Что вставить в новый чат

```
T-Tech redesign — session 11 (финальный copywriting pass + ПЕРВЫЙ push на GitHub Pages). Открой D:\tattech-website\next-session-START.md и D:\tattech-website\REDESIGN-ROADMAP.md, прочитай оба полностью. Цель: бизнес-текст ВСЕХ H2/H3/lead-параграфов = benefit-driven (что получит читатель), not feature-driven. Также: real bio + role от клиента (если получили) для About.astro. После — финальный bundle push на GitHub Pages, gh run watch, smoke-test live URL. Lighthouse финальный 3×3 desktop + 3×3 mobile. Baseline session 10b: desktop 100/100/100/100, mobile 96-98/100/100/100 (LCP 2.18-2.26s, CLS 0).
```

---

## Контекст для Claude (читай при старте)

### Состояние проекта (после session 10b)

- **Repo:** `D:\tattech-website` (Astro 6, plain CSS, no Tailwind)
- **Live:** https://ilshatsharapov69-afk.github.io/tattech-website/ (отстаёт на 7 локальных коммитов: pre-flight + 5.1 + 6 + 7 + 8 + 9 + 10a + 10b — push frozen с 2026-05-07 до session 11)
- **Last local commit:** session 10b (About.astro founder-spotlight + Ленар selfie + bio placeholder)
- **Lighthouse session 10b baseline:** desktop 100/100/100/100, mobile 96-98/100/100/100 (LCP 2.18-2.26s, CLS 0, TBT 0)

### Что закрыто (НЕ ТРОГАТЬ без явной просьбы клиента)

- ✅ 5.1 — Header (blue tonal + glass-morphism + 3 icon-buttons)
- ✅ 6 — Анимации (pulse, scroll progress, mouse-glow, Hero spotlight, Stats redesign)
- ✅ 7 — Services (3D tilt + compact reveal + border-glow + цены + TG-CTA)
- ✅ 8 — Cases (grid 4×2 + B2B-формат + image hover-zoom + spotlight gradient + footer-strip)
- ✅ 9 — Reviews (B2B + per-industry avatar-initials + quote-mark hover)
- ✅ 10a — AI photo generation: 8 case-photos B2B-publication style
- ✅ 10b — About: Ленар selfie 1:1 sq 180×180 + 38-word bio (PLACEHOLDER) + 3 trust pills, between FAQ↔CTA

### Open client-input items (если user прислал ответы — применить, иначе оставить placeholder)

1. **Real bio для About.astro** — клиент должен был дать 1-2 предложения от первого лица. Текущий placeholder: «За 8 лет в автоматизации 1С я понял: главная боль клиентов — не в программе, а в подрядчиках, которые пропадают после сдачи. Команда у нас небольшая — значит, за каждым проектом стоит конкретный человек, который остаётся на связи и после запуска.»
2. **Real role** — текущее «Основатель T-Tech». Если клиент скажет «руководитель/директор/CEO/etc.» — заменить.
3. **Trust pill «8 лет на рынке»** — личная founder-tenure Ленара (НЕ company-age). Клиент должен подтвердить число.
4. **Real pain-описания в Cases** — placeholder, клиент уточняет (см. session 8 «Возможные доработки»)
5. **Real deadline в Cases** — placeholder, клиент уточняет
6. **Реальные имена/метрики Reviews** — placeholder, клиент уточняет
7. **Точные цены Services + Programs** — placeholder, клиент подтверждает (4 990 ₽/мес обслуживание, 50 000 ₽ сайты, etc.)

---

## Session 11 — детальные шаги

### 0. Открыть с user'а (~3 мин)

- Спросить про **client input** на 7 пунктов выше. Если приходит — применить точечно. Если ничего — оставить placeholder, помечено в commit.
- Решение по push (default = да, после copy-pass): «гонять `git push origin master` финальным bundle, gh run watch deploy, smoke-test live URL»? Если клиент хочет review перед push — пауза.

### 1. Research (~30 мин)

- B2B benefit-headlines формулы: PAS, AIDA, JTBD adaptated for landing H2
- Tone-references: tat-tech.ru конкуренты (Рарус, БИТ, WiseAdvice) + Stripe/Linear (EN B2B эталоны для structure)
- RU B2B copywriting checklist: проверить наши H2 на «многолетний опыт / индивидуальный подход / команда профессионалов» (banned phrases от petr-panda + Котов)

### 2. Copywriting pass — все H2/H3/leads

| Component | Текущий H2/H3 | Проверить |
|---|---|---|
| Hero | (TBD — посмотреть Hero.astro) | benefit-headline, не feature |
| Stats | TBD | конкретика, не вода |
| Services | «Услуги» / «Что делаем для бизнеса» | benefit, что получит клиент |
| Process | TBD | пропустить если уже benefit-driven |
| Cases | «Реальные внедрения» | подзаголовок-lead |
| Reviews | «Что говорят клиенты» | OK как есть, lead проверить |
| Programs | «Популярные программы 1С» | benefit-driven? |
| FAQ | «Часто задают» (TBD) | leading question, не feature |
| About | «О компании» (eyebrow) — Ленар без H2 | оставить minimal |
| CTABanner | (final CTA) | benefit close |
| Footer | n/a | n/a |

### 3. Final bundle push

```bash
git push origin master  # ВСЕ локальные коммиты от pre-flight до session 11
gh run watch              # дождаться GitHub Pages deploy
# Smoke test: https://ilshatsharapov69-afk.github.io/tattech-website/
```

### 4. Lighthouse финальный 3×3 на LIVE URL (не localhost)

- 3 desktop + 3 mobile через `npx lighthouse <live-url>`
- Сохранить `.lighthouse/lh-final-*` (gitignored)
- Compare vs session 10b baseline

### 5. Запреты session 11

- ❌ НЕ менять структуру компонентов (только text)
- ❌ НЕ добавлять новые компоненты / секции
- ❌ НЕ трогать палитру / spacing tokens
- ❌ НЕ переписывать css-классы — только innerText / props
- ❌ НЕ амендить ранее сделанные коммиты (создать новый, push bundle)

---

## Чек-лист в конце session 11

1. Research отчёт сохранён в `research/2026-MM-DD_b2b-benefit-headlines/report.md` (≥5 источников 2025-2026) + INDEX обновлён
2. Все H2/H3/lead-параграфы прошли benefit-driven audit
3. About.astro bio/role/trust обновлены если клиент дал input (иначе placeholder помечен)
4. `npm run build` зелёный
5. **`git push origin master`** — финальный bundle (7-8 локальных коммитов)
6. `gh run watch` — deploy зелёный
7. Smoke test: live URL открыт, About-секция видна, фото 180×180 квадрат, нет broken-images
8. Lighthouse 3×3 на LIVE — без регрессии vs 10b baseline
9. Обновить `REDESIGN-ROADMAP.md`: `[x] 11` + `[x] DONE redesign`
10. Перезаписать `next-session-START.md` промтом для post-redesign следующей фазы (что-то по client-feedback, или другой проект)
11. Обновить memory `project_tattech_client.md` — финальный статус «redesign DONE, pushed»

---

## LOC и budgets

- LOC delta ≤ 30 (text-only changes mostly)
- Может потребовать ревью-чекпоинт перед push
- ≤ 8 файлов компонентов (text-only changes)

---

## Mid-session lessons learned (важно для будущих text-pass'ов)

1. **Browser cache на mid-session aspect-changes** — если меняется image aspect-ratio в одной сессии, делать filename rename + explicit pixel dimensions сразу. CSS `aspect-ratio` + browser cache = час времени на debug. См. `feedback_browser_cache_aspect.md` (создать в session 11 если ещё актуально, или drop).
2. **Demo-first работает** — все 4 placeholder-сессии (8/9/10a/10b) шипались без ожидания client input'а. Bio/photo Ленара пришли в session 10b прямо в чате через Telegram-папку (`C:\Users\GigaByte\Downloads\Telegram Desktop\photo_2026-05-07_*.jpg`). Паттерн «спроси про путь к файлу через Telegram Desktop downloads» работает быстрее чем drop в проектную папку.

---

## После session 11 (post-redesign)

- Возможна client revision-loop (1-2 раунда мелких правок) — допустимо
- Опциональная followup-фаза: оптимизация LCP < 2.0s mobile (текущее 2.20s) — defer по client-приоритету
- Decap CMS подключение (изначальная клиентская задача — wire CMS для самостоятельного контент-управления) — отдельная phase, не в redesign-roadmap
