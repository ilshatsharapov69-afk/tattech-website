# Session 5.1 kickoff — T-Tech redesign

> Этот файл всегда содержит промт для **следующей** запланированной сессии. После завершения сессии Claude обновляет этот файл, указывая на следующий шаг.

---

## Что вставить в новый чат

```
Открой D:\tattech-website\REDESIGN-ROADMAP.md и D:\tattech-website\next-session-START.md, прочитай оба полностью. Делаем session 5.1 (Top-bar revamp + Hero CTA revert + Spacing). Сначала покажи мне план шагов и подтверди что понял scope, потом приступай. В конце сессии: build + Lighthouse + commit + push, обнови ROADMAP статус, обнови этот файл (next-session-START.md) промтом для session 6, и вставь в свой ответ короткий handoff-промт чтобы я скопировал в новый чат.
```

---

## Контекст для Claude (читай при старте сессии)

### Состояние проекта прямо сейчас

- **Repo:** `D:\tattech-website` (Astro 6, plain CSS)
- **Live (старый, до redesign):** https://ilshatsharapov69-afk.github.io/tattech-website/
- **Last commit:** baseline после Variant B rollback (Header иконки + phone.svg оставлены, Hero CTA revert, CallbackModal удалён)
- **Pre-flight применён:** см. ROADMAP «Pre-flight (DONE)»

### Что нужно сделать в session 5.1 (детально)

**1. Hero (Hero.astro)**
- Удалить блок `.hero-contacts` целиком (a phone + sep + email сейчас в строках 45-55) — это контакты переедут в Header
- Удалить связанные CSS: `.hero-contacts`, `.contact-link`, `.contact-icon`, `.contact-sep` + соответствующее в `@media (max-width: 768px)`
- Hero CTA «Написать в Telegram» оставить как есть — анимации в session 6
- НЕ трогать тексты, цвета, gradient, trust pills

**2. Header (Header.astro)**
- Текущее состояние (sсейчас закоммичено): phone-text + Telegram icon-btn + WhatsApp icon-btn (в brand blue glow)
- Поменять цвета icon-btn:
  - Telegram: background `#229ED9`, hover `#1B8CC0`, иконка `#fff` всегда
  - WhatsApp: background `#25D366`, hover `#1FAE57`, иконка `#fff` всегда
- На dark Hero (header не scrolled) — оставить glassmorphic вариант ИЛИ перейти на brand colors прямо. Решить: brand colors даже на dark выглядят узнаваемо, поэтому brand colors в обоих состояниях. Тогда `:not(.is-scrolled)` override убрать, либо ослабить только для бордера.
- Добавить email-кнопку:
  - Опция А: text-link `ttech.kzn.it@gmail.com` рядом с phone (читается, но длинно)
  - Опция Б *(рекомендую)*: маленькая icon-кнопочка ✉ (32×32 или text-tonal), `mailto:ttech.kzn.it@gmail.com`, color = brand-500 на light header / white на dark header
- Mobile menu (`.mobile-actions`): добавить email туда же

**3. Возможно нужен email.svg**
- Если опция Б — добавить `src/components/icons/email.svg` (Feather/Heroicons mail icon) и зарегистрировать в `Icon.astro`

**4. Spacing (Stats.astro / Services.astro)**
- Сейчас Stats имеет `padding-block: var(--space-12) var(--space-16)` desktop / `var(--space-8) var(--space-10)` mobile
- Services наследует `.section { padding-block: var(--space-32) }` → между Stats и Services получается huge gap
- Решение: Services первая секция после Stats — уменьшить её `padding-top` до `var(--space-16)` desktop / `var(--space-12)` mobile
- Опционально: пройти по всем секциям и убедиться что вертикальный ритм consistent

### Запреты session 5.1

- ❌ НЕ менять palette tokens / brand variables в global.css
- ❌ НЕ добавлять backend-форму, Tailwind, React, GSAP
- ❌ НЕ начинать pulse-анимацию на CTA (это session 6)
- ❌ НЕ трогать тексты Hero, Stats, Services (тексты в session 11)

### Чек-лист в конце сессии

1. `npm run build` зелёный
2. `npm run preview` + Chrome визуальная проверка desktop + mobile (DevTools 360w)
3. Lighthouse: 3 прогона desktop, 3 mobile, без регрессии
4. Спросить пользователя «всё ОК?» перед `git push`
5. После OK от пользователя: `git push origin main`, проверить `gh run watch`
6. Обновить `REDESIGN-ROADMAP.md`: `[x] 5.1` + `[ ] 6 ← NEXT`
7. Перезаписать `next-session-START.md` промтом для session 6
8. Обновить memory `project_tattech_client.md` (статус session 5.1)
9. Вставить в финальный ответ handoff-промт для копирования в новый чат

---

## Если scope size мне непонятен после прочтения — спросить пользователя ДО старта

- Опция Б для email или Опция А?
- Brand colors TG/WA на dark header или glassmorphic?
- Email в mobile menu — иконка или текст?
