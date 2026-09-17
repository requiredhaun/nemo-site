# NEMO site

Лендинг NEMO в стиле лаунчера (тёмный dot-стиль, красный акцент, кастомный курсор, RU/EN).
Живёт на Cloudflare Workers, файлы тянет с GitHub-релизов `NEMO-Launcher`.

## Маршруты

| Путь | Что делает |
|---|---|
| `/` | лендинг |
| `/api/latest` | JSON последнего релиза (тег, ассеты, размеры), кэш 10 мин |
| `/dl/setup` | 302 на Setup.exe последнего релиза |
| `/dl/portable` | 302 на portable.exe последнего релиза |
| `/dl/source` | 302 на source .zip тега (codeload) |

Бинарники качаются с GitHub напрямую — трафик воркера не тратится.
Нет релизов / ошибка API — редирект на страницу релизов, сайт не падает.

## Деплой

```sh
npm install
npx wrangler login
npm run deploy
```

Первый деплой выдаст адрес вида `nemo-site.<твой-сабдомен>.workers.dev`.
Свой домен: `npx wrangler domains add <домен>` (после переноса NS на Cloudflare)
или через дашборд Workers → Custom Domains.

## Локально

```sh
npm install
npm run dev
```
