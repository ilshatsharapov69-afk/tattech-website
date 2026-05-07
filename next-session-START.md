# Session 5.1 kickoff — T-Tech redesign

> Этот файл всегда содержит промт для **следующей** запланированной сессии. После завершения сессии Claude обновляет этот файл, указывая на следующий шаг.

---

## Что вставить в новый чат

```
T-Tech redesign — session 5.1. Открой D:\tattech-website\next-session-START.md и D:\tattech-website\REDESIGN-ROADMAP.md, прочитай оба полностью. Покажи мне план шагов и подтверди scope ДО старта работы. В конце сессии: build + Lighthouse + commit + push, обнови ROADMAP и next-session-START.md, дай handoff-промт для session 6.
```

---

## Контекст для Claude (читай при старте сессии)

### Состояние проекта

- **Repo:** `D:\tattech-website` (Astro 6, plain CSS)
- **Live (старый):** https://ilshatsharapov69-afk.github.io/tattech-website/
- **Last commit:** `0e44d6e` (pre-flight baseline + roadmap, NOT pushed yet)
- **Live deploy ждёт:** push в конце 5.1 одним bundle (rollback + 5.1 changes)

### Финальные решения по дизайну (одобрены клиентом 2026-05-07)

См. таблицу в начале REDESIGN-ROADMAP.md. Для 5.1 актуально решение #1 (синий tonal Header).

---

## Session 5.1 — детальные шаги

### 1. Header → синий tonal (главное)

**Файл:** `src/components/Header.astro`

Сейчас (после session 4):
- `:not(.is-scrolled)` — transparent поверх Hero, белый текст, glassmorphic icon-buttons
- `.is-scrolled` — `rgba(255,255,255,0.85)` blurred, dark text, brand-tinted icons

Делаем:
- `:not(.is-scrolled)` — остаётся transparent (Hero gradient просвечивает), все элементы белые
- `.is-scrolled` — **синий gradient вместо белого**:
  ```css
  background: linear-gradient(180deg, rgba(30, 58, 138, 0.95) 0%, rgba(37, 99, 235, 0.85) 100%);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  box-shadow: 0 2px 24px rgba(30, 58, 138, 0.18);
  ```
- Лого (img + text), nav-links, phone, burger spans — **всегда белые** в обоих состояниях
  - Убрать дуальную логику `.header:not(.is-scrolled) .X { color: #fff }` + противоположную для `.is-scrolled`
  - Просто: `.header X { color: #fff }` всегда

### 2. Telegram + WhatsApp icon-buttons → brand colors

В `.ic-btn` сейчас brand-tinted (`rgba(37,99,235,0.08)` light scrolled / `rgba(255,255,255,0.12)` over Hero).

Делаем — два класса с brand colors, всегда одинаковые в обоих состояниях:

```css
.ic-btn {
  /* base layout */
  width: 40px; height: 40px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff;
  border: none;
  transition: background-color 200ms ease, transform 200ms var(--ease-spring), box-shadow 200ms ease;
}
.ic-btn-tg { background: #229ED9; }
.ic-btn-tg:hover { background: #1B8CC0; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(34, 158, 217, 0.4); }
.ic-btn-wa { background: #25D366; }
.ic-btn-wa:hover { background: #1FAE57; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4); }
```

В разметке: `class="ic-btn ic-btn-tg"` и `class="ic-btn ic-btn-wa"`.

Удалить `.header:not(.is-scrolled) .ic-btn` override (больше не нужен).

### 3. Email icon-button (новый)

- Создать `src/components/icons/email.svg` (Heroicons mail outline или похожий, stroke-current)
- Зарегистрировать в `Icon.astro` как `email`
- Добавить в Header после phone, перед TG:
  ```astro
  <a href="mailto:ttech.kzn.it@gmail.com" class="ic-btn ic-btn-email" aria-label="Написать на email">
    <Icon name="email" size={18} />
  </a>
  ```
- Стиль `.ic-btn-email`:
  ```css
  .ic-btn-email { background: rgba(255, 255, 255, 0.10); color: #fff; }
  .ic-btn-email:hover { background: rgba(255, 255, 255, 0.20); transform: translateY(-2px); }
  ```
- В mobile menu добавить email-btn рядом с TG/WA в `.mobile-channels`

### 4. Hero — удалить дублирующие контакты

**Файл:** `src/components/Hero.astro`

Удалить блок (строки 45-55):
```astro
<div class="hero-contacts">
  <a href="tel:+79520434277" class="contact-link">...</a>
  <span class="contact-sep">•</span>
  <a href="mailto:..." class="contact-link">...</a>
</div>
```

Удалить связанный CSS (строки ~193-218):
- `.hero-contacts`
- `.contact-link`, `.contact-link:hover`
- `.contact-icon`
- `.contact-sep`
- В `@media (max-width: 768px)` блок: `.hero-contacts` overrides + `.contact-sep { display: none }`

### 5. Spacing fix Stats → Services

**Файл:** `src/components/Services.astro`

Найти `.section` или `<section class="...">` и override padding-top:
```css
.services {
  padding-top: var(--space-16); /* override .section padding-block */
}
@media (max-width: 768px) {
  .services {
    padding-top: var(--space-12);
  }
}
```

**Уточнение:** проверить структуру Services — если использует `<section class="section">`, нужно override через свой класс.

### 6. Visual ритм-аудит (опционально, если успеваем)

Пройти по всем секциям (`Stats`, `Services`, `Process`, `Cases`, `Reviews`, `Programs`, `FAQ`, `CTABanner`) — проверить что между ними нет одинаково большого gap'а. Если 2 соседние секции с большим bottom + top padding = ужать одну.

---

## Запреты session 5.1

- ❌ НЕ менять palette tokens / brand variables в global.css
- ❌ НЕ добавлять Tailwind, React, GSAP, Framer
- ❌ НЕ начинать pulse-анимацию на CTA (это session 6)
- ❌ НЕ начинать scroll progress bar (session 6)
- ❌ НЕ начинать mouse-tracking glow (session 6)
- ❌ НЕ трогать тексты Hero, Stats, Services (тексты в session 11)

---

## Чек-лист в конце сессии

1. `npm run build` зелёный
2. `npm run preview` + Chrome визуальная проверка desktop + mobile (DevTools 360w breakpoint)
3. Lighthouse: 3 прогона desktop, 3 mobile, без регрессии (desktop ≥ 95/95/100/95, mobile ≥ 90/95/100/95)
4. Спросить пользователя «всё ОК?» с показом скринов или ссылки превью
5. После OK: `git push origin main`, проверить `gh run watch`
6. Обновить `REDESIGN-ROADMAP.md`: `[x] 5.1` + `[ ] 6 ← NEXT`
7. Перезаписать `next-session-START.md` промтом для session 6 (по шаблону этого файла)
8. Обновить memory `project_tattech_client.md` (статус session 5.1)
9. Вставить в финальный ответ handoff-промт для копирования в новый чат

---

## Если что-то непонятно после прочтения — спросить ДО старта

- Footer оставить чёрным (`#0F172A`) или тоже перекрасить в синий gradient под decision #2?
- Email иконку взять Heroicons или Feather? (рекомендую Heroicons outline mail, stroke-based)
