/* NEMO site: i18n, latest release, download modal, custom cursor */
(function () {
  'use strict';

  var STR = {
    ru: {
      'nav.features': 'Возможности',
      'nav.req': 'Требования',
      'nav.download': 'Скачать',
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
      'foot.by': 'сделано Nema',
      'modal.title': 'Скачать NEMO {tag}',
      'modal.sub': 'Выбери вариант — скачивание начнётся сразу.',
      'modal.rec': 'рекомендуем',
      'modal.setup_d': 'Установщик для Windows',
      'modal.port_d': 'Один .exe без установки',
      'modal.src_d': 'Исходники .zip с GitHub',
      'modal.close': 'Закрыть',
      'ver.latest': 'последняя: {tag}',
      'ver.none': 'релиз скоро'
    },
    en: {
      'nav.features': 'Features',
      'nav.req': 'Requirements',
      'nav.download': 'Download',
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
      'foot.by': 'made by Nema',
      'modal.title': 'Download NEMO {tag}',
      'modal.sub': 'Pick an option — download starts right away.',
      'modal.rec': 'recommended',
      'modal.setup_d': 'Windows installer',
      'modal.port_d': 'Single .exe, no install',
      'modal.src_d': 'Source .zip from GitHub',
      'modal.close': 'Close',
      'ver.latest': 'latest: {tag}',
      'ver.none': 'release soon'
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

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.getElementById('lang-ru').classList.toggle('on', lang === 'ru');
    document.getElementById('lang-en').classList.toggle('on', lang === 'en');
    document.title = lang === 'ru' ? 'NEMO — Minecraft лаунчер' : 'NEMO — Minecraft launcher';
    refreshBadge();
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem('nemo-site-lang', l); } catch (e) { /* ignore */ }
    applyLang();
  }
  document.getElementById('lang-ru').addEventListener('click', function () { setLang('ru'); });
  document.getElementById('lang-en').addEventListener('click', function () { setLang('en'); });

  /* latest release */
  var latest = null;
  function mb(b) {
    if (!b) return '';
    return (b / 1048576).toFixed(1) + ' MB';
  }
  function refreshBadge() {
    var badge = document.getElementById('ver-badge');
    var title = document.getElementById('modal-title');
    if (latest && latest.tag) {
      badge.textContent = t('ver.latest', { tag: latest.tag });
      title.textContent = t('modal.title', { tag: latest.tag });
    } else {
      badge.textContent = t('ver.none');
      title.textContent = 'NEMO';
    }
  }
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

  /* modal */
  var modal = document.getElementById('modal');
  function openModal() {
    refreshBadge();
    modal.hidden = false;
  }
  function closeModal() { modal.hidden = true; }
  ['dl-top', 'dl-hero', 'dl-bottom'].forEach(function (id) {
    document.getElementById(id).addEventListener('click', openModal);
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* custom cursor */
  var dot = document.getElementById('cur');
  var ring = document.getElementById('cur-ring');
  var mx = -100, my = -100, rx = -100, ry = -100;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button').forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('hot'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('hot'); });
  });

  applyLang();
})();
