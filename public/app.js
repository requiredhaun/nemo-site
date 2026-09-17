/* NEMO site: i18n, latest release, download modal/page, custom cursor */
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }
  function on(el, ev, fn) { if (el) el.addEventListener(ev, fn); }

  var STR = {
    ru: {
      'nav.main': 'Главная',
      'nav.features': 'Возможности',
      'nav.req': 'Требования',
      'nav.download': 'Скачать',
      'nav.politics': 'Политика',
      'nav.faq': 'FAQ',
      'hero.sub': 'Minecraft лаунчер: сборки, моды, шейдеры и темы. Java ставит сам.',
      'hero.download': 'Скачать лаунчер',
      'hero.note': 'Windows 10/11 x64 · бесплатно · открытый код',
      'feat.title': 'Возможности',
      'feat.1t': 'Сборки и загрузчики',
      'feat.1d': 'Изолированные сборки: Vanilla, Fabric, Quilt, Forge, NeoForge. У каждой своя папка, RAM и версия Java.',
      'feat.2t': 'Каталог Modrinth',
      'feat.2d': 'Моды, шейдеры, текстурпаки и модпаки — поиск и установка в один клик, плюс импорт .mrpack.',
      'feat.3t': 'Темы',
      'feat.3d': 'Тёмная и светлая темы, акцентные цвета, dot-сетка и русский/английский интерфейс.',
      'feat.4t': 'Discord RPC',
      'feat.4d': 'Статус «сидит в NEMO / запускает / играет» виден в профиле Discord из коробки.',
      'feat.5t': 'Автообновление',
      'feat.5d': 'Лаунчер сам находит новый релиз на GitHub и предлагает обновиться. Пропуск версии — в один клик.',
      'feat.6t': 'Без Java-заморочек',
      'feat.6d': 'Нужный рантайм Mojang (8/16/17/21) качается автоматически под каждую версию игры.',
      'req.title': 'Системные требования',
      'req.1': 'Windows 10/11, x64',
      'req.2': '~200 МБ на диске (+ место под сборки)',
      'req.3': 'Java не нужна — лаунчер скачает сам',
      'foot.by': 'сделано requiredhaun',
      'foot.star': '★ Оставь звезду',
      'modal.title': 'Скачать NEMO {tag}',
      'modal.sub': 'Выбери вариант — скачивание начнётся сразу.',
      'modal.rec': 'рекомендуем',
      'modal.setup_d': 'Установщик для Windows',
      'modal.port_d': 'Один .exe без установки',
      'modal.src_d': 'Исходники .zip с GitHub',
      'modal.close': 'Закрыть',
      'ver.latest': 'последняя: {tag}',
      'ver.none': 'релиз скоро',
      'dl.title': 'Скачать NEMO',
      'dl.sub': 'Файлы тянутся напрямую с GitHub-релизов. Выбери вариант:',
      'dl.all': 'Все релизы на GitHub',
      'pol.title': 'Политика',
      'pol.sub': 'Коротко и честно: что за проект и что он делает с твоими данными.',
      'pol.1t': 'Открытый код',
      'pol.1d': 'Исходники лаунчера и этого сайта лежат на GitHub. Каждый релиз собирается из открытого кода — можешь проверить или собрать сам.',
      'pol.2t': 'Без телеметрии',
      'pol.2d': 'Лаунчер никуда не отправляет твои данные: ни статистики, ни аналитики, ни трекеров. Сеть используется только для загрузок, которые ты сам запросил.',
      'pol.3t': 'Откуда качается',
      'pol.3d': 'Игра и Java — с серверов Mojang. Моды — с Modrinth. Authlib-injector — с GitHub. Обновления лаунчера — с GitHub-релизов. Никаких пересборок и зеркал.',
      'pol.4t': 'Аккаунты',
      'pol.4d': 'Офлайн-ник хранится только у тебя. Токены Ely.by лежат в локальном файле и уходят только на серверы Ely.by для входа. Пароли нигде не сохраняются.',
      'pol.5t': 'Discord',
      'pol.5d': 'Rich Presence показывает твой статус только если включено в настройках. Выключается в один клик, соединения рвутся сразу.',
      'pol.6t': 'Бесплатно',
      'pol.6d': 'NEMO бесплатен целиком: все функции, без премиума и рекламы. Minecraft — отдельная игра Mojang, лаунчер её не раздаёт.',
      'faq.title': 'Частые вопросы',
      'faq.1q': 'Нужна ли Java?',
      'faq.1a': 'Нет. Лаунчер сам скачивает нужный рантайм Mojang (8/16/17/21) под каждую версию игры. Свою Java можно указать в настройках, но это необязательно.',
      'faq.2q': 'Антивирус ругается. Это вирус?',
      'faq.2a': 'Нет. Exe не подписан цифровой подписью (она платная), поэтому SmartScreen и антивирусы ворчат на любой неподписанный файл. Код открыт — проверь и собери сам, если сомневаешься.',
      'faq.3q': 'Что за вход через Ely.by?',
      'faq.3a': 'Ely.by — бесплатный сервис аккаунтов со скинами и плащами. Войди — и в игре будут твои скин и ник на серверах. Можно играть и без него, с офлайн-ником.',
      'faq.4q': 'Setup или Portable?',
      'faq.4a': 'Setup ставит лаунчер как обычную программу. Portable — один .exe, который можно таскать на флешке: настройки живут рядом. Функции одинаковые.',
      'faq.5q': 'Как обновиться?',
      'faq.5a': 'Лаунчер сам проверяет GitHub-релизы и предлагает обнову баннером: скачать и установить, пропустить версию или напомнить позже. Автопроверка отключается в настройках.',
      'faq.6q': 'Где мои сборки и миры?',
      'faq.6a': 'Каждая сборка живёт в своей папке внутри данных лаунчера, миры — в saves/ сборки. Кнопка «Папка игры» в настройках открывает её сразу.'
    },
    en: {
      'nav.main': 'Home',
      'nav.features': 'Features',
      'nav.req': 'Requirements',
      'nav.download': 'Download',
      'nav.politics': 'Policy',
      'nav.faq': 'FAQ',
      'hero.sub': 'Minecraft launcher: packs, mods, shaders and themes. Java included automatically.',
      'hero.download': 'Download launcher',
      'hero.note': 'Windows 10/11 x64 · free · open source',
      'feat.title': 'Features',
      'feat.1t': 'Packs & loaders',
      'feat.1d': 'Isolated instances: Vanilla, Fabric, Quilt, Forge, NeoForge. Each with own folder, RAM and Java version.',
      'feat.2t': 'Modrinth catalog',
      'feat.2d': 'Mods, shaders, resource packs and modpacks — one-click search and install, plus .mrpack import.',
      'feat.3t': 'Themes',
      'feat.3d': 'Dark and light themes, accent colors, dot grid and Russian/English interface.',
      'feat.4t': 'Discord RPC',
      'feat.4d': '"Hanging in NEMO / launching / playing" status in your Discord profile out of the box.',
      'feat.5t': 'Auto-update',
      'feat.5d': 'The launcher finds new GitHub releases itself and offers to update. Skipping a version takes one click.',
      'feat.6t': 'No Java hassle',
      'feat.6d': 'The right Mojang runtime (8/16/17/21) downloads automatically for each game version.',
      'req.title': 'Requirements',
      'req.1': 'Windows 10/11, x64',
      'req.2': '~200 MB disk (+ room for packs)',
      'req.3': 'No Java needed — the launcher fetches it',
      'foot.by': 'made by requiredhaun',
      'foot.star': '★ Star us',
      'modal.title': 'Download NEMO {tag}',
      'modal.sub': 'Pick an option — download starts right away.',
      'modal.rec': 'recommended',
      'modal.setup_d': 'Windows installer',
      'modal.port_d': 'Single .exe, no install',
      'modal.src_d': 'Source .zip from GitHub',
      'modal.close': 'Close',
      'ver.latest': 'latest: {tag}',
      'ver.none': 'release soon',
      'dl.title': 'Download NEMO',
      'dl.sub': 'Files come straight from GitHub releases. Pick an option:',
      'dl.all': 'All releases on GitHub',
      'pol.title': 'Policy',
      'pol.sub': 'Short and honest: what this project is and what it does with your data.',
      'pol.1t': 'Open source',
      'pol.1d': 'The launcher and this site live on GitHub. Every release is built from open code — inspect or build it yourself.',
      'pol.2t': 'No telemetry',
      'pol.2d': 'The launcher sends your data nowhere: no stats, no analytics, no trackers. Network is only used for downloads you requested.',
      'pol.3t': 'Download sources',
      'pol.3d': 'Game and Java come from Mojang servers. Mods from Modrinth. Authlib-injector from GitHub. Launcher updates from GitHub releases. No repacks or mirrors.',
      'pol.4t': 'Accounts',
      'pol.4d': 'Your offline nick stays with you. Ely.by tokens live in a local file and only go to Ely.by servers to log in. Passwords are never stored.',
      'pol.5t': 'Discord',
      'pol.5d': 'Rich Presence shows your status only when enabled in settings. One click to disable, connections drop immediately.',
      'pol.6t': 'Free',
      'pol.6d': 'NEMO is fully free: every feature, no premium, no ads. Minecraft is a separate Mojang game — the launcher does not distribute it.',
      'faq.title': 'FAQ',
      'faq.1q': 'Do I need Java?',
      'faq.1a': 'No. The launcher downloads the right Mojang runtime (8/16/17/21) for each game version. You can point it at your own Java in settings, but that is optional.',
      'faq.2q': 'My antivirus complains. Is it a virus?',
      'faq.2a': 'No. The exe is not code-signed (signing costs money), so SmartScreen and antiviruses grumble at any unsigned file. The code is open — check and build it yourself if in doubt.',
      'faq.3q': 'What is Ely.by login?',
      'faq.3a': 'Ely.by is a free account service with skins and capes. Log in and your skin and nick show up in game on servers. You can also play without it, using an offline nick.',
      'faq.4q': 'Setup or Portable?',
      'faq.4a': 'Setup installs the launcher like a regular program. Portable is a single .exe you can carry on a flash drive, settings live next to it. Same features.',
      'faq.5q': 'How do I update?',
      'faq.5a': 'The launcher checks GitHub releases itself and offers updates via banner: download & install, skip the version, or remind later. Auto-check can be disabled in settings.',
      'faq.6q': 'Where are my packs and worlds?',
      'faq.6a': 'Each pack lives in its own folder inside launcher data, worlds in the pack saves/ folder. The "Game folder" button in settings opens it right away.'
    }
  };

  var lang = 'ru';
  try {
    var q = new URLSearchParams(location.search).get('lang');
    var s = localStorage.getItem('nemo-site-lang');
    if (q === 'ru' || q === 'en') lang = q;
    else if (s === 'ru' || s === 'en') lang = s;
  } catch (e) { /* default */ }

  function t(key, vars) {
    var d = STR[lang] || STR.ru;
    var s = d[key] || STR.ru[key] || key;
    if (vars) for (var k in vars) s = s.split('{' + k + '}').join(String(vars[k]));
    return s;
  }

  var latest = null;
  function mb(b) {
    if (!b) return '';
    return (b / 1048576).toFixed(1) + ' MB';
  }
  function refreshBadge() {
    var badge = $('ver-badge');
    var title = $('modal-title');
    if (latest && latest.tag) {
      if (badge) badge.textContent = t('ver.latest', { tag: latest.tag });
      if (title) title.textContent = t('modal.title', { tag: latest.tag });
    } else {
      if (badge) badge.textContent = t('ver.none');
      if (title) title.textContent = 'NEMO';
    }
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    var ru = $('lang-ru'), en = $('lang-en');
    if (ru) ru.classList.toggle('on', lang === 'ru');
    if (en) en.classList.toggle('on', lang === 'en');
    document.title = lang === 'ru' ? 'NEMO — Minecraft лаунчер' : 'NEMO — Minecraft launcher';
    refreshBadge();
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem('nemo-site-lang', l); } catch (e) { /* ignore */ }
    applyLang();
  }
  on($('lang-ru'), 'click', function () { setLang('ru'); });
  on($('lang-en'), 'click', function () { setLang('en'); });

  /* latest release */
  fetch('/api/latest').then(function (r) { return r.json(); }).then(function (j) {
    if (!j || !j.tag) { refreshBadge(); return; }
    latest = j;
    (j.assets || []).forEach(function (a) {
      document.querySelectorAll('[data-size="' + a.kind + '"]').forEach(function (el) {
        el.textContent = mb(a.size);
      });
    });
    refreshBadge();
  }).catch(function () { refreshBadge(); });

  /* modal (main page only) */
  var modal = $('modal');
  function openModal() {
    if (!modal) return;
    refreshBadge();
    modal.hidden = false;
  }
  function closeModal() { if (modal) modal.hidden = true; }
  ['dl-top', 'dl-hero', 'dl-bottom'].forEach(function (id) {
    on($(id), 'click', openModal);
  });
  on($('modal-close'), 'click', closeModal);
  on(modal, 'click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* custom cursor: только кружок */
  var ring = $('cur-ring');
  if (ring) {
    var mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
    });
    (function loop() {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseleave', function () {
      mx = my = rx = ry = -100;
    });
    document.querySelectorAll('a, button, summary').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('hot'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('hot'); });
    });
  }

  applyLang();
})();
