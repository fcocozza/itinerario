(function () {
  'use strict';
  var R = window.ROUTES || {};
  var TEAL = '#0b6e78', CORAL = '#c8473f', FERRY = '#2463b0', WALK = '#7a4fb5';

  // ---------- Lugares ----------
  var P = {
    // NZ
    ZQN: [-45.0211, 168.7392, 'Aeropuerto de Queenstown', 'apt'],
    Queenstown: [-45.0312, 168.6626, 'Queenstown', 'stop', 1, '2 noches (vie 19, sáb 20)'],
    Glenorchy: [-44.8511, 168.3880, 'Glenorchy', 'poi', null, 'Escenarios de El Señor de los Anillos'],
    TeAnau: [-45.4144, 167.7180, 'Te Anau', 'stop', 2, '2 noches (dom 21, lun 22)'],
    Milford: [-44.6717, 167.9254, 'Milford Sound', 'poi', null, 'Crucero de ~2 h · lun 22'],
    Wanaka: [-44.6990, 169.1360, 'Wanaka', 'stop', 3, '1 noche (mar 23)'],
    Hooker: [-43.7186, 170.0925, 'Hooker Valley Track', 'poi', null, '10 km ida y vuelta · ~3 h'],
    Salmon: [-44.1900, 170.1550, 'Mt Cook Alpine Salmon', 'poi', null, 'Lago Pukaki'],
    Tekapo: [-44.0047, 170.4772, 'Lago Tekapo', 'stop', 4, '1 noche (mié 24)'],
    CHC: [-43.4894, 172.5322, 'Aeropuerto de Christchurch', 'apt'],
    ROT: [-38.1092, 176.3172, 'Aeropuerto de Rotorua', 'apt'],
    Rotorua: [-38.1368, 176.2497, 'Rotorua', 'stop', 5, '2 noches (jue 25, vie 26)'],
    WaiOTapu: [-38.3570, 176.3690, 'Wai-O-Tapu', 'poi', null, 'Géiser Lady Knox a las 10:15'],
    Hobbiton: [-37.8578, 175.6800, 'Hobbiton', 'poi', null, 'Signature Tour · sáb 27'],
    Auckland: [-36.8485, 174.7633, 'Auckland', 'stop', 6, '1 noche (sáb 27)'],
    AKL: [-37.0082, 174.7850, 'Aeropuerto de Auckland', 'apt', null, 'Dom 28 · llegar a las 13:00'],
    // AU
    SYD: [-33.9399, 151.1753, 'Aeropuerto de Sídney', 'apt'],
    Sydney: [-33.8625, 151.2085, 'Centro de Sídney (Circular Quay)', 'stop', 1, '3 noches (jue 11 – sáb 13)'],
    Opera: [-33.8568, 151.2153, 'Ópera de Sídney', 'poi', null, 'Por fuera, al atardecer'],
    Macq: [-33.8597, 151.2225, "Mrs Macquarie's Chair", 'poi', null, 'La Ópera y el puente juntos'],
    Featherdale: [-33.7703, 150.8838, 'Featherdale Wildlife Park', 'poi', null, 'Koalas y canguros · AUD 49'],
    Katoomba: [-33.7320, 150.3120, 'Blue Mountains (Echo Point)', 'poi', null, 'Three Sisters'],
    Manly: [-33.8003, 151.2844, 'Manly', 'poi', null, 'Ferry de ~30 min'],
    Bondi: [-33.8915, 151.2767, 'Bondi Beach', 'poi', null, 'Caminata a Coogee, 6 km'],
    Coogee: [-33.9205, 151.2577, 'Coogee', 'poi'],
    OOL: [-28.1644, 153.5047, 'Aeropuerto de Gold Coast', 'apt'],
    Sheraton: [-27.9650, 153.4270, 'Sheraton Grand Mirage', 'stop', 2, 'Main Beach · dom 14 – vie 19'],
    Currumbin: [-28.1350, 153.4880, 'Currumbin Wildlife Sanctuary', 'poi', null, 'Koalas y canguros · lun 15'],
    Burleigh: [-28.0870, 153.4530, 'Burleigh Heads', 'poi', null, 'Almuerzo · lun 15'],
    Broadbeach: [-28.0270, 153.4330, 'Broadbeach', 'poi', null, 'Cena · jue 18']
  };
  var FERRY_LINE = [[-33.8595,151.2111],[-33.8585,151.2135],[-33.8555,151.2260],[-33.8545,151.2400],[-33.8500,151.2560],[-33.8420,151.2660],[-33.8300,151.2760],[-33.8150,151.2820],[-33.8003,151.2844]];
  var WALK_LINE = [[-33.8915,151.2767],[-33.8960,151.2745],[-33.9010,151.2727],[-33.9045,151.2680],[-33.9100,151.2655],[-33.9140,151.2630],[-33.9180,151.2590],[-33.9205,151.2577]];

  // ---------- Días ----------
  // r: rutas en auto · f: vuelos [desde, hasta] · x: líneas extra · p: lugares a encuadrar
  var DAYS = {
    nz: [
      { k: 'nz_1', l: 'Vie 19', r: ['nz_d1'], f: [[[-30.5, 160.5], 'ZQN', 'Desde Gold Coast']], p: ['ZQN', 'Queenstown'] },
      { k: 'nz_2', l: 'Sáb 20', r: ['nz_d2'], p: ['Queenstown', 'Glenorchy'] },
      { k: 'nz_3', l: 'Dom 21', r: ['nz_d3'], p: ['Queenstown', 'TeAnau'] },
      { k: 'nz_4', l: 'Lun 22', r: ['nz_d4'], p: ['TeAnau', 'Milford'] },
      { k: 'nz_5', l: 'Mar 23', r: ['nz_d5'], p: ['TeAnau', 'Queenstown', 'Wanaka'] },
      { k: 'nz_6', l: 'Mié 24', r: ['nz_d6a', 'nz_d6b'], p: ['Wanaka', 'Hooker', 'Salmon', 'Tekapo'] },
      { k: 'nz_7', l: 'Jue 25', r: ['nz_d7', 'nz_d7b'], f: [['CHC', 'ROT', 'Christchurch → Rotorua']], p: ['Tekapo', 'CHC', 'ROT', 'Rotorua'] },
      { k: 'nz_8', l: 'Vie 26', r: ['nz_d8'], p: ['Rotorua', 'WaiOTapu'] },
      { k: 'nz_9', l: 'Sáb 27', r: ['nz_d9'], p: ['Rotorua', 'Hobbiton', 'Auckland'] },
      { k: 'nz_10', l: 'Dom 28', r: ['nz_d10'], f: [['AKL', [-34.0, 179.5], 'Hacia Costa Rica']], p: ['Auckland', 'AKL'] }
    ],
    au: [
      { k: 'au_d0', l: 'Mar 9', f: [[[-31.5, 160.0], 'SYD', 'Desde Costa Rica']], p: ['SYD', 'Sydney'] },
      { k: 'au_d1', l: 'Jue 11', r: ['au_d1'], p: ['SYD', 'Sydney', 'Opera', 'Macq'] },
      { k: 'au_d2', l: 'Vie 12', r: ['au_d2'], p: ['Sydney', 'Featherdale', 'Katoomba'] },
      { k: 'au_d3', l: 'Sáb 13', x: ['ferry', 'walk'], p: ['Sydney', 'Manly', 'Bondi', 'Coogee'] },
      { k: 'au_d4', l: 'Dom 14', r: ['au_d4'], f: [['SYD', 'OOL', 'Sídney → Gold Coast']], p: ['SYD', 'OOL', 'Sheraton'] },
      { k: 'au_d5', l: 'Lun 15', r: ['au_d5'], p: ['Sheraton', 'Currumbin', 'Burleigh'] },
      { k: 'au_d6', l: 'Mar 16 – Mié 17', p: ['Sheraton'], z: 13 },
      { k: 'au_d7', l: 'Jue 18', p: ['Sheraton', 'Broadbeach'] },
      { k: 'au_d8', l: 'Vie 19', r: ['au_d9'], f: [['OOL', [-34.5, 159.0], 'Hacia Queenstown']], p: ['Sheraton', 'OOL'] }
    ]
  };
  var PLACES = {
    nz: ['ZQN','Queenstown','Glenorchy','TeAnau','Milford','Wanaka','Hooker','Salmon','Tekapo','CHC','ROT','Rotorua','WaiOTapu','Hobbiton','Auckland','AKL'],
    au: ['SYD','Sydney','Opera','Macq','Featherdale','Katoomba','Manly','Bondi','Coogee','OOL','Sheraton','Currumbin','Burleigh','Broadbeach']
  };
  var LABELED = { Queenstown:1, TeAnau:1, Wanaka:1, Tekapo:1, Rotorua:1, Auckland:1, Milford:1, Hobbiton:1, Hooker:1, Sydney:1, Sheraton:1, Featherdale:1, Katoomba:1 };

  function ll(x) { return typeof x === 'string' ? [P[x][0], P[x][1]] : x; }
  function geo(key) { return (R[key] || []).map(function (c) { return [c[1], c[0]]; }); }
  function arc(a, b) {
    a = ll(a); b = ll(b);
    var pts = [], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    var dx = b[1] - a[1], dy = b[0] - a[0];
    var cx = mx + dx * 0.15, cy = my - dy * 0.15;
    for (var i = 0; i <= 40; i++) {
      var t = i / 40;
      pts.push([(1-t)*(1-t)*a[0] + 2*(1-t)*t*cx + t*t*b[0], (1-t)*(1-t)*a[1] + 2*(1-t)*t*cy + t*t*b[1]]);
    }
    return pts;
  }

  var maps = {};
  function build(country) {
    if (maps[country] || typeof L === 'undefined') return maps[country];
    var el = document.getElementById('map-' + country);
    var m = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25 });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: 'Mapa base &copy; Esri, HERE, Garmin, &copy; colaboradores de OpenStreetMap · Rutas: OSRM'
    }).addTo(m);

    var dayLayers = {}, all = L.featureGroup().addTo(m);
    DAYS[country].forEach(function (d) {
      var g = L.featureGroup();
      (d.r || []).forEach(function (rk) {
        var pts = geo(rk); if (!pts.length) return;
        L.polyline(pts, { color: '#fff', weight: 7, opacity: 0.85 }).addTo(g);
        L.polyline(pts, { color: TEAL, weight: 4 }).bindTooltip(d.l, { sticky: true }).addTo(g);
      });
      (d.f || []).forEach(function (f) {
        L.polyline(arc(f[0], f[1]), { color: CORAL, weight: 3, dashArray: '8 7' }).bindTooltip('Vuelo · ' + f[2] + ' · ' + d.l, { sticky: true }).addTo(g);
      });
      (d.x || []).forEach(function (x) {
        if (x === 'ferry') L.polyline(FERRY_LINE, { color: FERRY, weight: 4, dashArray: '4 5' }).bindTooltip('Ferry a Manly · ~30 min', { sticky: true }).addTo(g);
        if (x === 'walk') L.polyline(WALK_LINE, { color: WALK, weight: 4, dashArray: '2 6' }).bindTooltip('Bondi → Coogee · 6 km a pie', { sticky: true }).addTo(g);
      });
      g.addTo(all);
      dayLayers[d.k] = g;
    });

    var markers = L.featureGroup().addTo(m);
    PLACES[country].forEach(function (k) {
      var p = P[k], type = p[3];
      var html = type === 'stop' ? '<div class="pin">' + p[4] + '</div>' : '<div class="pin ' + type + '"></div>';
      var size = type === 'stop' ? 28 : (type === 'poi' ? 16 : 14);
      var mk = L.marker([p[0], p[1]], {
        icon: L.divIcon({ className: '', html: html, iconSize: [size, size], iconAnchor: [size / 2, size / 2] }),
        zIndexOffset: type === 'stop' ? 500 : 0, keyboard: true, title: p[2]
      }).bindPopup('<strong>' + p[2] + '</strong>' + (p[5] || ''));
      if (LABELED[k]) mk.bindTooltip(p[2].replace(' (Circular Quay)', ''), { permanent: true, direction: 'right', offset: [size / 2 + 2, 0], className: 'lbl' });
      mk.addTo(markers);
    });

    maps[country] = { map: m, days: dayLayers, all: all, markers: markers };
    fitAll(country);
    return maps[country];
  }

  function fitAll(country) {
    var M = maps[country]; if (!M) return;
    var b = L.latLngBounds(PLACES[country].map(function (k) { return ll(k); }));
    M.map.fitBounds(b, { padding: [30, 30] });
  }

  function select(country, key) {
    var M = build(country); if (!M) return;
    Object.keys(M.days).forEach(function (k) {
      var on = !key || k === key;
      M.days[k].eachLayer(function (l) {
        var base = l.options._w || (l.options._w = { o: l.options.opacity == null ? 1 : l.options.opacity });
        l.setStyle({ opacity: on ? base.o : 0.18 });
      });
      if (key && k === key) M.days[k].bringToFront();
    });
    document.querySelectorAll('.chips[data-map="' + country + '"] .chip').forEach(function (c) {
      c.setAttribute('aria-pressed', String((c.dataset.key || '') === (key || '')));
    });
    if (!key) { fitAll(country); return; }
    var d = DAYS[country].filter(function (x) { return x.k === key; })[0];
    var pts = (d.p || []).map(ll);
    (d.r || []).forEach(function (rk) { pts = pts.concat(geo(rk)); });
    (d.x || []).forEach(function (x) { pts = pts.concat(x === 'ferry' ? FERRY_LINE : WALK_LINE); });
    if (pts.length === 1 || d.z) M.map.setView(pts[0], d.z || 12);
    else M.map.fitBounds(L.latLngBounds(pts), { padding: [50, 50], maxZoom: 13 });
  }

  // ---------- Chips ----------
  Object.keys(DAYS).forEach(function (country) {
    var wrap = document.querySelector('.chips[data-map="' + country + '"]');
    if (!wrap) return;
    var mk = function (label, key) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = label; b.dataset.key = key || '';
      b.setAttribute('aria-pressed', key ? 'false' : 'true');
      b.addEventListener('click', function () { select(country, key); });
      wrap.appendChild(b);
    };
    mk('Todo el recorrido', '');
    DAYS[country].forEach(function (d) { mk(d.l, d.k); });
  });

  // ---------- Pestañas ----------
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function showTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    var country = tab.id === 'tab-au' ? 'au' : 'nz';
    var M = build(country);
    if (M) setTimeout(function () { M.map.invalidateSize(); }, 30);
    return country;
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { showTab(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        showTab(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true);
      }
    });
  });

  // ---------- "Ver en el mapa" desde cada día ----------
  document.querySelectorAll('.see-map').forEach(function (b) {
    b.addEventListener('click', function () {
      var key = b.dataset.key, country = key.indexOf('au_') === 0 ? 'au' : 'nz';
      showTab(document.getElementById('tab-' + country));
      document.getElementById('mapas').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      setTimeout(function () { select(country, key); }, 350);
    });
  });

  // Mapa inicial (NZ, el más importante)
  build('nz');
  if (typeof L === 'undefined') {
    document.querySelectorAll('.map').forEach(function (el) {
      el.innerHTML = '<p style="padding:1.5rem">No se pudo cargar el mapa interactivo. Usen el mapa imprimible de abajo.</p>';
    });
  }

  // ---------- Navegación activa ----------
  var links = {};
  document.querySelectorAll('.topbar nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
          links[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
