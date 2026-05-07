# Деплой OAuth-прокси для CMS (Sveltia CMS Authenticator)

> **Кому:** Ильшат, для разовой настройки (15 минут).
> **Что:** разворачиваем Cloudflare Worker, который позволит клиенту логиниться кнопкой **Sign In with GitHub** (вместо ручной возни с Personal Access Token).
>
> **Почему именно так:** GitHub Pages не предоставляет OAuth-сервер. Для авторизации Sveltia/Decap CMS нужен внешний прокси, который примет OAuth-callback от GitHub и передаст токен браузеру. Cloudflare Workers — бесплатно, без credit card, без cold start. Альтернатива (PAT mode) уже работает out-of-the-box, эта настройка — для удобства клиента.

## Шаги (15 минут)

### 1. Создать Cloudflare-аккаунт (если нет)

- Зайти на https://dash.cloudflare.com/sign-up
- Подтвердить email
- **Кредитка не нужна** для Workers free tier (3M requests/мес — нам хватит на годы)

### 2. Развернуть Sveltia CMS Authenticator

- Открыть https://github.com/sveltia/sveltia-cms-auth
- Нажать кнопку **Deploy to Cloudflare Workers** в README
- Авторизовать через GitHub (Cloudflare попросит) → fork репозитория в твой аккаунт → выбрать имя Worker (например `tattech-cms-auth`) → Deploy
- После деплоя получишь URL вида: `https://tattech-cms-auth.<твой-subdomain>.workers.dev`. **Скопируй его** — понадобится в шагах 3 и 4.

### 3. Создать GitHub OAuth App

- https://github.com/settings/developers → **New OAuth App**
- **Application name:** `T-Tech CMS`
- **Homepage URL:** `https://ilshatsharapov69-afk.github.io/tattech-website/`
- **Authorization callback URL:** `https://tattech-cms-auth.<твой-subdomain>.workers.dev/callback`
- Нажать **Register application**
- На странице приложения скопируй **Client ID**
- Нажми **Generate a new client secret** → скопируй (показывается один раз — сохрани)

### 4. Задать env-переменные в Cloudflare Worker

- В Cloudflare Dashboard: Workers & Pages → твой `tattech-cms-auth` → **Settings** → **Variables and Secrets**
- Добавить:
  - `GITHUB_CLIENT_ID` (Type: Text) = client_id из шага 3
  - `GITHUB_CLIENT_SECRET` (Type: **Secret** — нажми Encrypt) = client_secret из шага 3
  - `ALLOWED_DOMAINS` (Type: Text, опционально) = `ilshatsharapov69-afk.github.io,tat-tech.ru`
- **Save and deploy**

### 5. Подключить Worker к CMS-конфигу

В файле `D:\tattech-website\public\admin\config.yml` раскомментировать строку с `base_url` и подставить URL Worker'а:

```yaml
backend:
  name: github
  repo: ilshatsharapov69-afk/tattech-website
  branch: main
  base_url: https://tattech-cms-auth.<твой-subdomain>.workers.dev
```

Закоммитить + запушить:

```bash
cd D:\tattech-website
git add public/admin/config.yml
git commit -m "cms: enable GitHub OAuth via Cloudflare Worker"
git push
```

Через 30 сек — проверить https://ilshatsharapov69-afk.github.io/tattech-website/admin/. Должна появиться кнопка **Sign In with GitHub**.

## После переноса на tat-tech.ru (Phase D)

Когда сайт переедет на свой домен:
1. В GitHub OAuth App → **Authorization callback URL** добавь `https://tat-tech.ru/admin/` рядом с старым (или замени)
2. В Worker'е env `ALLOWED_DOMAINS` добавь `tat-tech.ru`

Сам Worker URL менять не нужно.

## Откат

Если что-то пошло не так — закомментировать `base_url` обратно в config.yml. CMS вернётся в режим **Sign In with Token** (PAT). Ничего не сломается.

## Стоимость

- Cloudflare Workers free tier: 100 000 requests/день (3M/мес). OAuth-callback вызывается 1-2 раза за каждую сессию входа в CMS. Мы за лимит никогда не выйдем.
- GitHub OAuth App: бесплатно, без лимитов.
- Итого: **0 ₽ навсегда**.
