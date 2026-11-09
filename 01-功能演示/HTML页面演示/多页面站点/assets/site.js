/* Aurora Studio 共享脚本
 * 所有页面共用：主题切换、导航高亮、数据渲染、模块搜索。
 * 页面运行在不透明源（opaque origin）的沙箱 iframe 里，所以 Web Storage
 * 一律包在 try / catch 中，页面跳转后主题会回到系统默认值。
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var data = window.SITE_DATA || null;

  /* ---------- 主题 ---------- */

  var STORAGE_KEY = 'aurora-theme';

  function readStoredTheme() {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (error) {
      /* 沙箱 iframe 是不透明源，访问 localStorage 会抛 SecurityError。 */
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* 忽略：本演示只要求页面不因此报错。 */
    }
  }

  function preferredTheme() {
    var stored = readStoredTheme();
    if (stored) return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;
    var dark = theme === 'dark';
    toggle.textContent = dark ? '☀' : '☾';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? '切换到浅色模式' : '切换到深色模式');
  }

  applyTheme(preferredTheme());

  document.querySelectorAll('[data-theme-toggle]').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  });

  /* ---------- 站点上下文（沙箱 iframe） ---------- */

  // 文章沙箱是不透明源，读不到 Wiki 的 data-theme；父页面会通过
  // postMessage 发送 { type: 'powerwiki:context', theme, lang }。
  window.addEventListener('message', function (event) {
    var payload = event.data;
    if (!payload || payload.type !== 'powerwiki:context') return;
    if (payload.theme === 'dark' || payload.theme === 'light') {
      applyTheme(payload.theme);
    }
  });

  // 主动索取一次，尽量在首屏绘制前对齐站点主题。
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'powerwiki:request-context' }, '*');
    }
  } catch (error) {
    /* 独立打开 /full/ 页面时没有父页面，使用系统主题即可。 */
  }

  /* ---------- 导航高亮 ---------- */

  function activeNav() {
    var path;
    try {
      path = decodeURIComponent(window.location.pathname);
    } catch (error) {
      path = window.location.pathname;
    }

    var key = 'home';
    if (/\/guide\/(index\.html)?$/.test(path)) {
      key = 'guide';
    } else if (/\/modules(\.html)?$/.test(path)) {
      key = 'modules';
    } else if (/\/about\.html$/.test(path)) {
      key = 'about';
    }

    document.querySelectorAll('[data-nav]').forEach(function (link) {
      if (link.dataset.nav === key) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  activeNav();

  /* ---------- 数据渲染 ---------- */

  function text(tag, className, value) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value == null ? '' : String(value);
    return node;
  }

  function moduleCard(module) {
    var card = document.createElement('article');
    card.className = 'module';
    card.dataset.search = [module.name, module.version, module.status, module.description]
      .join(' ')
      .toLowerCase();

    var head = document.createElement('div');
    head.className = 'module-head';
    head.appendChild(text('span', 'module-name', module.name));
    head.appendChild(text('span', 'module-version', 'v' + module.version));
    card.appendChild(head);

    card.appendChild(text('p', '', module.description));

    var meter = document.createElement('div');
    meter.className = 'meter';
    meter.setAttribute('role', 'progressbar');
    meter.setAttribute('aria-valuemin', '0');
    meter.setAttribute('aria-valuemax', '100');
    meter.setAttribute('aria-valuenow', String(module.progress));
    meter.setAttribute('aria-label', module.name + ' 完成度');
    var bar = document.createElement('span');
    meter.appendChild(bar);
    card.appendChild(meter);

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        bar.style.width = Math.max(0, Math.min(100, Number(module.progress) || 0)) + '%';
      });
    });

    return card;
  }

  function renderModules() {
    var container = document.querySelector('[data-modules]');
    if (!container) return;

    if (!data || !Array.isArray(data.modules) || !data.modules.length) {
      container.appendChild(text('p', 'empty', '没有读到 static/data.js，模块列表无法渲染。'));
      return;
    }

    data.modules.forEach(function (module) {
      container.appendChild(moduleCard(module));
    });
  }

  function renderPages() {
    var container = document.querySelector('[data-pages]');
    if (!container || !data || !Array.isArray(data.pages)) return;

    data.pages.forEach(function (page) {
      var item = document.createElement('li');
      item.className = 'module';

      var head = document.createElement('div');
      head.className = 'module-head';
      var link = text('a', 'module-name', page.title);
      link.href = page.path;
      head.appendChild(link);
      head.appendChild(text('span', 'module-version', page.path));
      item.appendChild(head);

      item.appendChild(text('p', '', page.note));
      container.appendChild(item);
    });
  }

  renderModules();
  renderPages();

  /* ---------- 模块搜索 ---------- */

  var search = document.querySelector('[data-module-search]');
  if (search) {
    var empty = document.querySelector('[data-module-empty]');

    function filterModules() {
      var query = search.value.trim().toLowerCase();
      var visible = 0;
      document.querySelectorAll('[data-modules] .module').forEach(function (card) {
        var match = !query || (card.dataset.search || '').indexOf(query) !== -1;
        card.hidden = !match;
        if (match) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    }

    search.addEventListener('input', filterModules);
    filterModules();
  }

  /* ---------- 页脚年份 ---------- */

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });
})();
