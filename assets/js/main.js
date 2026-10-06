/* Parroquia Nuestra Señora de las Gracias (Onuva) – small interactions.
   Menu, header shadow, scroll reveals, the "Hoy / Today" schedule card,
   and the wedding checklist. No libraries. */
(function () {
  var doc = document.documentElement;
  var isEN = (doc.lang || '').toLowerCase().indexOf('en') === 0;

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
  }

  /* Header shadow on scroll */
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Scroll reveals */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* "Hoy" card: today's masses in El Salvador time */
  var card = document.getElementById('today');
  if (card) {
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/El_Salvador', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
      }).formatToParts(new Date());
      var get = function (t) { var p = parts.find(function (x) { return x.type === t; }); return p ? p.value : ''; };
      var dayIdx = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      var mins = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);

      var T = isEN ? {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        label: 'Today in Onuva', chapel: 'Chapel', temple: 'Main church', conf: 'Confession',
        next: 'next', done: 'No more Masses today. ', tomorrow: 'Tomorrow first Mass: ',
        open: 'Parish office: open now', closed: 'Parish office: closed now'
      } : {
        days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        label: 'Hoy en Onuva', chapel: 'Capilla', temple: 'Templo grande', conf: 'Confesiones',
        next: 'próxima', done: 'Ya no hay más misas hoy. ', tomorrow: 'Mañana, primera misa: ',
        open: 'Oficina parroquial: abierta ahora', closed: 'Oficina parroquial: cerrada ahora'
      };
      var noon = isEN ? '12:00 noon' : '12:00 m.d.';
      var plan = function (d) {
        if (d === 0) return [[390, '6:30 a.m.', T.chapel], [690, '11:30 a.m.', T.temple]];
        var l = [[360, '6:00 a.m.', T.chapel], [720, noon, T.chapel]];
        if (d === 4) l.push([960, '4:00 p.m.', T.conf]);
        return l;
      };
      var list = plan(dayIdx);
      var html = '';
      var marked = false;
      list.forEach(function (m) {
        var past = mins > m[0] + 45;
        var isNext = !past && !marked;
        if (isNext) marked = true;
        html += '<li style="' + (past ? 'opacity:.45' : '') + '"><b>' + m[1] + '</b><span>' + m[2] +
          (isNext ? ' · <em>' + T.next + '</em>' : '') + '</span></li>';
      });
      if (!marked) {
        var tm = plan((dayIdx + 1) % 7)[0];
        html += '<li><span>' + T.done + T.tomorrow + '<b style="min-width:0">' + tm[1] + '</b></span></li>';
      }
      var open = (dayIdx >= 1 && dayIdx <= 5 && ((mins >= 480 && mins < 750) || (mins >= 810 && mins < 960))) ||
                 (dayIdx === 6 && mins >= 480 && mins < 720);
      card.querySelector('.today-label span').textContent = T.label;
      card.querySelector('.today-day').textContent = T.days[dayIdx];
      card.querySelector('ul').innerHTML = html;
      card.querySelector('.today-office').textContent = open ? T.open : T.closed;
    } catch (e) { /* keep the static weekly summary */ }
  }

  /* Wedding checklist progress */
  var boxes = document.querySelectorAll('.checklist input[type=checkbox]');
  var prog = document.getElementById('progress');
  function updateProgress() {
    if (!prog) return;
    var done = 0; boxes.forEach(function (b) { if (b.checked) done++; });
    prog.innerHTML = isEN
      ? '<b>' + done + ' of ' + boxes.length + '</b> documents ready.'
      : '<b>' + done + ' de ' + boxes.length + '</b> documentos listos.';
  }
  boxes.forEach(function (b) { b.addEventListener('change', updateProgress); });
  updateProgress();

  /* Print button */
  var pr = document.querySelector('[data-print]');
  if (pr) pr.addEventListener('click', function () { window.print(); });

  /* Year */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
