/* 72: one mission, 72 hours, Christians everywhere.
   The whole app is this one file. Words and dates for each mission live in the Supabase "missions" table, not here. */
(function () {
'use strict';

var C = window.CONFIG || {};
var ICONS = {"mission": "<path d=\"M5 21V4\"></path><path d=\"M5 4h12l-2.5 4 2.5 4H5\"></path>", "impact": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M3 12h18\"></path><path d=\"M12 3c3.2 3.2 3.2 14.8 0 18c-3.2-3.2-3.2-14.8 0-18\"></path>", "stories": "<path d=\"M4 5h16v11H9.5L4 20z\"></path><path d=\"M8 9h8\"></path><path d=\"M8 12.5h5\"></path>", "person": "<circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7\"></path>", "two": "<circle cx=\"8\" cy=\"8\" r=\"3.5\"></circle><circle cx=\"17\" cy=\"9\" r=\"3\"></circle><path d=\"M2 20c0-3.6 2.7-6 6-6s6 2.4 6 6\"></path><path d=\"M16.5 14.2c3 .1 5.5 2 5.5 5.8\"></path>", "group": "<circle cx=\"12\" cy=\"7\" r=\"3\"></circle><circle cx=\"5\" cy=\"10\" r=\"2.5\"></circle><circle cx=\"19\" cy=\"10\" r=\"2.5\"></circle><path d=\"M6.5 20c0-3.3 2.4-5.5 5.5-5.5s5.5 2.2 5.5 5.5\"></path><path d=\"M1.5 19c0-2.4 1.5-4 3.5-4\"></path><path d=\"M22.5 19c0-2.4-1.5-4-3.5-4\"></path>", "share": "<path d=\"M12 15V3\"></path><path d=\"M8 7l4-4 4 4\"></path><path d=\"M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8\"></path>", "bell": "<path d=\"M6 16v-5a6 6 0 1 1 12 0v5l2 2H4z\"></path><path d=\"M10 21h4\"></path>", "check": "<path d=\"M5 12.5l4.5 4.5L19 7.5\"></path>", "heart": "<path d=\"M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z\"></path>", "next": "<path d=\"M9 5l7 7-7 7\"></path>", "back": "<path d=\"M15 5l-7 7 7 7\"></path>", "plus": "<path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path>", "play": "<path d=\"M8 5l11 7-11 7z\"></path>", "pin": "<path d=\"M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.2 12 21 12 21z\"></path><circle cx=\"12\" cy=\"10\" r=\"2.5\"></circle>", "idea": "<path d=\"M9 18h6\"></path><path d=\"M10 21h4\"></path><path d=\"M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z\"></path>", "camera": "<path d=\"M4 8h3l1.5-2h7L17 8h3v11H4z\"></path><circle cx=\"12\" cy=\"13\" r=\"3.5\"></circle>", "lock": "<rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"></rect><path d=\"M8 11V8a4 4 0 0 1 8 0v3\"></path>", "message": "<path d=\"M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z\"></path>", "link": "<path d=\"M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1\"></path><path d=\"M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1\"></path>", "close": "<path d=\"M6 6l12 12\"></path><path d=\"M18 6L6 18\"></path>", "home": "<path d=\"M4 11l8-7 8 7\"></path><path d=\"M6 10v10h12V10\"></path>", "more": "<circle cx=\"5\" cy=\"12\" r=\"1.4\"></circle><circle cx=\"12\" cy=\"12\" r=\"1.4\"></circle><circle cx=\"19\" cy=\"12\" r=\"1.4\"></circle>", "save": "<path d=\"M12 4v11\"></path><path d=\"M8 11l4 4 4-4\"></path><path d=\"M5 20h14\"></path>", "mail": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"></rect><path d=\"M3 7l9 6 9-6\"></path>", "arrow": "<path d=\"M5 12h14\"></path><path d=\"M13 6l6 6-6 6\"></path>", "tabimpact": "<rect x=\"4\" y=\"5\" width=\"16\" height=\"15\" rx=\"2.5\"></rect><path d=\"M8 3v4\"></path><path d=\"M16 3v4\"></path><path d=\"M9 13l2.2 2.2L15.5 11\"></path>", "book": "<path d=\"M12 6.5C10.5 5.2 8.3 4.5 5 4.5v13c3.3 0 5.5.7 7 2 1.5-1.3 3.7-2 7-2v-13c-3.3 0-5.5.7-7 2z\"></path><path d=\"M12 6.5v13\"></path>", "whatsapp": "<path d=\"M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 20.5 11.8z\"></path><path d=\"M9.2 8.3c-.4.5-.7 1.2-.4 2.1.5 1.6 2.300 3.500 4.300 4.200.9.3 1.600 0 2.100-.5\"></path>", "megaphone": "<path d=\"M4 10v4h3l7 4V6l-7 4H4z\"></path><path d=\"M17.500 9.500a4 4 0 0 1 0 5\"></path><path d=\"M7.500 14.500l1.200 4.500\"></path>", "clock": "<circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M12 7.500V12l3 2\"></path>", "bars": "<path d=\"M6 19v-5\"></path><path d=\"M12 19V9\"></path><path d=\"M18 19V5\"></path>", "menu": "<path d=\"M5 7.500h14\"></path><path d=\"M5 12h14\"></path><path d=\"M5 16.500h14\"></path>", "doc": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"16\" rx=\"2\"></rect><path d=\"M9 9h6\"></path><path d=\"M9 12.500h6\"></path><path d=\"M9 16h3.500\"></path>", "pen": "<path d=\"M4 20l1-4L16.500 4.500l3 3L8 19l-4 1z\"></path><path d=\"M14 7l3 3\"></path>"};
var view = document.getElementById('view');
var stage = document.getElementById('stage');

// ------------------------------------------------------------------ small helpers
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function ic(n, size, extra) {
  var st = size ? ' style="width: ' + size + 'px; height: ' + size + 'px' + (extra || '') + '"' : (extra ? ' style="' + extra + '"' : '');
  return '<svg class="s72-icon" viewBox="0 0 24 24" aria-hidden="true"' + st + '>' + ICONS[n] + '</svg>';
}
function logo(h, white) { return '<img src="/assets/' + (white ? 'logo-white' : 'logo') + '.svg" alt="72" style="display: block; height: ' + h + 'px; width: auto; max-width: none">'; }
function num(n) { return Number(n || 0).toLocaleString('en-US'); }
function people(n) { return Number(n) === 1 ? '1 person' : num(n) + ' people'; }
function compact(n) { n = Number(n || 0); return n >= 1e6 ? (n / 1e6).toFixed(1).replace('.0', '') + 'M' : n >= 1e4 ? Math.round(n / 1e3) + 'K' : num(n); }
function mnum(m) { return 'Mission ' + String(m.number).padStart(3, '0'); }
function lines(t) { return String(t || '').split('\n').map(function (x) { return x.trim(); }).filter(Boolean); }
function photo(f) { return /^https?:/.test(f) ? f : '/assets/' + f; }
var regionNames = null;
try { regionNames = new Intl.DisplayNames(['en'], { type: 'region' }); } catch (e) {}
function countryName(code) { if (!code) return ''; try { return (regionNames && regionNames.of(code)) || code; } catch (e) { return code; } }

var mem = {};
var LS = {
  get: function (k) { try { var v = localStorage.getItem('72.' + k); return v == null ? mem[k] : v; } catch (e) { return mem[k]; } },
  set: function (k, v) { mem[k] = v; try { localStorage.setItem('72.' + k, v); } catch (e) {} },
  del: function (k) { delete mem[k]; try { localStorage.removeItem('72.' + k); } catch (e) {} }
};
function uuid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
}

// test mode: open the app once with ?test=1 to see the test mission, ?test=0 to leave
var qs = new URLSearchParams(location.search);
if (qs.get('test') === '1') LS.set('test', '1');
if (qs.get('test') === '0') LS.del('test');
var TEST = LS.get('test') === '1';
if (qs.has('test')) { try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {} }

var PID = LS.get('pid');
if (!PID) { PID = uuid(); LS.set('pid', PID); }

var SITE = (C.siteUrl || location.origin) + (TEST ? '/?test=1' : '/');
var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
var standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;

// ------------------------------------------------------------------ talking to the database
function rpc(fn, args) {
  return fetch(C.supabaseUrl + '/rest/v1/rpc/' + fn, {
    method: 'POST',
    headers: { apikey: C.supabaseKey, Authorization: 'Bearer ' + C.supabaseKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(args || {})
  }).then(function (r) {
    return r.json().catch(function () { return null; }).then(function (j) {
      if (!r.ok) throw new Error((j && j.message) || 'Something went wrong. Try again.');
      return j;
    });
  });
}

var S = { live: null, last: null, next_at: null, me: {}, join: null, last_join: null, stats: null, last_stats: null };
var offset = 0; // server clock minus this phone's clock
function now() { return Date.now() + offset; }
function phaseKey() { return [S.live && S.live.id, !!S.join, S.join && S.join.completed_at, S.last && S.last.id].join('|'); }
var nextTimer = null;
function refresh() {
  return rpc('get_state', { p_pid: PID, p_test: TEST }).then(function (d) {
    var before = phaseKey();
    S = d; offset = new Date(d.now).getTime() - Date.now();
    clearTimeout(nextTimer);
    if (S.next_at) {
      var wait = new Date(S.next_at).getTime() - now() + 1500;
      if (wait < 2e9) nextTimer = setTimeout(softRefresh, Math.max(wait, 1000));
    }
    return before !== phaseKey();
  });
}
function softRefresh() { refresh().then(function (changed) { if (changed) route(); }).catch(function () {}); }

var geo = null;
function getGeo() {
  if (geo) return Promise.resolve(geo);
  var ctl = window.AbortController ? new AbortController() : null;
  var t = setTimeout(function () { if (ctl) ctl.abort(); }, 3500);
  return fetch('/api/geo', ctl ? { signal: ctl.signal } : {}).then(function (r) { return r.ok ? r.json() : {}; })
    .catch(function () { return {}; }).then(function (g) { clearTimeout(t); geo = g || {}; return geo; });
}
function myPlace() {
  var j = S.live ? S.join : S.last_join;
  if (j && j.country) return Promise.resolve({ country: j.country, city: j.city });
  return getGeo();
}

// ------------------------------------------------------------------ toast and sheet
var toastTimer = null;
function toast(msg) {
  var t = document.getElementById('toast');
  t.innerHTML = '<span role="status">' + esc(msg) + '</span>'; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.hidden = true; }, 3800);
}
function sheet(html) { var s = document.getElementById('sheet'); s.innerHTML = '<div role="dialog" aria-modal="true">' + html + '</div>'; s.hidden = false; }
function closeSheet() { document.getElementById('sheet').hidden = true; }
function busy(el, on) { if (el) el.classList.toggle('is-busy', !!on); }

// ------------------------------------------------------------------ shared pieces of screens
function top(left, mid, right, extra) {
  return '<header class="s72-top"' + (extra || '') + '>' + (left || '<span></span>') + (mid == null ? '<span>' + logo(20) + '</span>' : (mid || '<span></span>')) + (right || '<span></span>') + '</header>';
}
function backBtn(icon, color) { return '<button type="button" class="s72-iconbtn" data-act="back" aria-label="' + (icon === 'close' ? 'Close' : 'Back') + '" style="color: ' + (color || 'var(--ink)') + '">' + ic(icon || 'back') + '</button>'; }
function impactHref() { return S.live ? '#Impact' : (S.last ? '#Results' : '#Impact'); }
function tabbar(active) {
  var tabs = [['home', 'Home', '#Home'], ['impact', 'Impact', impactHref()], ['doc', 'Stories', '#Stories'], ['more', 'More', '#My72']];
  return '<nav class="s72-tabbar" style="position: relative; flex: none" aria-label="Sections">' + tabs.map(function (t) {
    return '<a class="s72-tab' + (t[1] === active ? ' is-active' : '') + '" href="' + t[2] + '"' + (t[1] === active ? ' aria-current="page"' : '') + '>' + ic(t[0]) + t[1] + '</a>';
  }).join('') + '</nav>';
}
function countdown() {
  function seg(k, l) { return '<span class="s72-count__seg"><span class="s72-count__n" data-cd="' + k + '">--</span><span class="s72-count__l">' + l + '</span></span>'; }
  var sep = '<span class="s72-count__sep">:</span>';
  return '<div class="s72-count s72-countbox" role="timer" aria-label="Time left">' + seg('h', 'Hours') + sep + seg('m', 'Minutes') + sep + seg('s', 'Seconds') + '</div>';
}
var CHECK14 = ic('check', 14, '; stroke-width: 2.5');
var NEXT18 = ic('next', 18);
var CARD = 'box-shadow: var(--shadow-card), inset 0 0 0 1px var(--line)';
function mapBox(dark, id) {
  return '<div class="s72-map" style="margin-top: ' + (dark ? 14 : 30) + 'px"><img src="/assets/map-light.svg" alt=""><svg id="' + id + '" viewBox="0 0 700 260" role="img" aria-label="World map. Blue lights mark where people are taking part."></svg></div>';
}
function drawPoints(id, pts, dark) {
  var el = document.getElementById(id); if (!el) return;
  var col = '#FC5B17';
  el.innerHTML = (pts || []).map(function (p) {
    var x = 330 + 1.94 * p.lon, y = 148 - 2 * p.lat;
    if (x < 4 || x > 696 || y < 4 || y > 256) return '';
    var r = Math.min(7, 3 + Math.log(p.n + 1) / Math.LN10 * 2.2);
    return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (r * 2.8).toFixed(1) + '" fill="' + col + '" opacity=".22"></circle><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="' + col + '"></circle>';
  }).join('');
}

var ui = { notifyCtx: null, notifyNext: null, dtab: 'mission', itab: 'global', sfilter: 'all', cnt: '1', way: null, aud: 'public' };
function storyMission() { return S.live || S.last; }
function storyJoin() { return S.live ? S.join : S.last_join; }

// ------------------------------------------------------------------ the screens
var SCREENS = {};
var AFTER = {};

SCREENS.Loading = function () {
  return '<div class="s72-screen s72-on-black" style="align-items: center; justify-content: center"><img src="/assets/lockup-white.svg" alt="72. Go together." style="width: 46%; max-width: 200px"></div>';
};
SCREENS.Offline = function () {
  return '<div class="s72-screen s72-on-black"><main class="s72-pad" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 16px">' +
    logo(56, true) + '<h1 class="s72-title" style="margin-top: 12px">Can’t reach 72.</h1><p class="body">Check your connection and try again.</p>' +
    '<button type="button" class="s72-btn s72-btn--primary" data-act="retry" style="margin-top: 12px">Try again</button></main></div>';
};

function heroZone(img) {
  return '<div class="s72-herozone"><div class="s72-72fade"><div class="s72-big72" style="left: -5%; top: 15%; width: 116%"></div></div>' +
    '<img class="s72-hero__person" src="/assets/' + img + '" alt=""><div class="s72-hero__fade"></div></div>';
}
SCREENS.Welcome = function () {
  return '<div class="s72-screen s72-on-black s72-welcome">' + heroZone('hero-woman.webp') +
    '<header class="s72-bar"><span>' + logo(24) + '</span><button type="button" class="s72-skip" data-act="skipIntro">Skip</button></header>' +
    '<div style="flex: 1"></div>' +
    '<main class="s72-pad" style="position: relative; flex: none; display: flex; flex-direction: column; padding-bottom: 26px; color: #fff">' +
    '<h1 class="s72-cond" style="font-size: 50px">One mission.<br>72 hours.<br>Christians<br>everywhere.</h1>' +
    '<p style="font: 500 17px/24px var(--font-sans); margin-top: 12px">One simple act of good.<br>All of us. At the same time.</p>' +
    '<div class="s72-dots" aria-hidden="true"><i class="on"></i><i></i></div>' +
    '<a class="s72-btn s72-btn--primary" href="#How">See how it works ' + ic('arrow', 20) + '</a></main></div>';
};

SCREENS.How = function () {
  function step(icon, b, t) {
    return '<div style="display: flex; gap: 16px; align-items: center"><span class="s72-disc s72-disc--orange">' + ic(icon, 26) + '</span>' +
      '<p style="font: 400 15px/21px var(--font-sans); color: var(--ink-muted)"><span style="display: block; font: 800 17px/22px var(--font-sans); letter-spacing: -0.01em; color: var(--ink); margin-bottom: 3px">' + b + '</span>' + t + '</p></div>';
  }
  return '<div class="s72-screen">' +
    '<header class="s72-bar"><button type="button" class="s72-iconbtn" data-act="back" aria-label="Back" style="color: var(--ink); margin-left: -10px">' + ic('back') + '</button><button type="button" class="s72-skip" data-act="skipIntro">Skip</button></header>' +
    '<main class="s72-pad" style="flex: 1; display: flex; flex-direction: column; padding-top: 14px">' +
    '<span class="s72-eyebrow" style="color: var(--blue-ink)">How 72 works</span>' +
    '<h1 class="s72-h" style="margin-top: 10px; font-size: 38px">Three steps.<br>Three days.</h1>' +
    '<div style="display: flex; flex-direction: column; gap: 26px; margin: 36px 0 24px">' +
    step('megaphone', 'A mission goes live.', 'One simple act of good. The same one for all of us.') +
    step('clock', 'You have 72 hours.', 'Do it on your own, with a friend, or with your group.') +
    step('bars', 'We see what we did together.', 'Real numbers and real stories from around the world.') +
    '</div><div style="flex: 1"></div>' +
    '<div class="s72-dots s72-dots--ink" aria-hidden="true"><i></i><i class="on"></i></div>' +
    '<button type="button" class="s72-btn s72-btn--primary" data-act="introDone">' + (S.live ? 'See the mission' : 'Continue') + ' ' + ic('arrow', 20) + '</button></main></div>';
};

SCREENS.Notify = function () {
  var me = S.me || {}, ctx = ui.notifyCtx || 'intro', on = pushState() === 'granted';
  function row(icon, k, label) {
    var v = me[k] !== false;
    return '<div class="s72-box" style="display: flex; align-items: center; gap: 14px; padding: 12px 16px"><span class="s72-disc" style="width: 46px; height: 46px">' + ic(icon, 22) + '</span>' +
      '<span style="flex: 1; font: 700 16px/21px var(--font-sans); letter-spacing: -0.01em">' + label + '</span>' +
      '<button type="button" class="s72-switch' + (v ? ' is-on' : '') + '" role="switch" aria-checked="' + v + '" aria-label="' + label + '" data-act="alert" data-k="' + k + '"></button></div>';
  }
  var copy = {
    intro: ['Know the moment it’s live.', 'Missions start without warning. A notification is how you’ll know.'],
    joined: ['Don’t miss<br>how it ends.', 'We’ll tell you when 12 hours are left and when the results land.'],
    settings: ['Notifications', 'Choose what we tell you about, and how.']
  }[ctx];
  return '<div class="s72-screen">' + top(ctx === 'joined' ? '<span></span>' : backBtn()) +
    '<main class="s72-pad" style="flex: 1; display: flex; flex-direction: column; padding-top: 16px">' +
    (ctx === 'joined' ? '<span class="s72-chip s72-chip--blue" style="align-self: flex-start; margin-bottom: 14px">You’re in ' + CHECK14 + '</span>' : '') +
    '<h1 class="s72-h" style="font-size: ' + (ctx === 'settings' ? 34 : 38) + 'px">' + copy[0] + '</h1>' +
    '<p style="font: 400 17px/25px var(--font-sans); margin-top: 12px; color: var(--ink-muted)">' + copy[1] + '</p>' +
    '<div style="flex: none; display: flex; flex-direction: column; gap: 10px; margin-top: 20px">' +
    row('megaphone', 'alert_live', 'When a mission goes live') + row('clock', 'alert_last', 'When 12 hours are left') + row('bars', 'alert_done', 'When the results are in') + '</div>' +
    '<p class="body-sm" style="margin-top: 14px; color: var(--ink-muted)">Three messages a mission. Nothing else, ever.</p>' +
    '<label class="s72-label" for="email" style="margin-top: 18px">Prefer email? <span style="font-weight: 400; color: var(--ink-muted)">We’ll send the same three.</span></label>' +
    '<input id="email" class="s72-input" type="email" inputmode="email" autocomplete="email" autocapitalize="off" placeholder="you@example.com" value="' + esc(me.email || '') + '" style="flex: none">' +
    '<div style="flex: 1; min-height: 18px"></div>' +
    '<button type="button" class="s72-btn s72-btn--primary" data-act="' + (on ? 'notifySkip' : 'notifyOn') + '" style="position: static">' + (on ? 'Save' : 'Turn on notifications') + '</button>' +
    (on ? '' : '<button type="button" class="s72-btn s72-btn--quiet" data-act="notifySkip" style="flex: none; margin-top: 4px">' + (ctx === 'settings' ? 'Save and close' : 'Not now') + '</button>') +
    '</main></div>';
};

SCREENS.Main = function () {
  var l = S.last, st = S.last_stats || {}, me = S.me || {};
  var reachable = pushState() === 'granted' || !!me.email;
  var head = l
    ? '<span class="s72-eyebrow" style="color: #fff; opacity: 1">' + mnum(l) + ' · ' + esc(l.name) + '</span><h1 class="s72-cond" style="font-size: 54px; margin-top: 8px">Mission<br>complete.</h1><p style="font: 500 17px/24px var(--font-sans); margin-top: 10px">' + people(st.going) + ' took part.</p>' +
      '<a class="s72-btn s72-btn--primary" href="#Results" style="flex: none; margin-top: 18px; position: static">See what happened ' + ic('arrow', 20) + '</a>'
    : '<span class="s72-eyebrow" style="color: #fff; opacity: 1">Mission 001</span><h1 class="s72-cond" style="font-size: 54px; margin-top: 8px">The first 72<br>is coming.</h1><p style="font: 500 17px/24px var(--font-sans); margin-top: 10px">One simple act of good. All of us. At the same time.</p>';
  var next = '<span class="s72-eyebrow" style="color: var(--blue-ink); opacity: 1">Next 72</span><span style="font: 900 24px/28px var(--font-sans); letter-spacing: -0.03em">Coming soon.</span>' +
    '<span class="body-sm" style="color: var(--ink-muted); margin-top: 2px">' + (reachable ? 'We’ll tell you the moment it starts.' : 'Missions start without warning. Tap to get the alert.') + '</span>';
  return '<div class="s72-screen s72-on-black">' +
    '<img class="s72-photo" src="/assets/' + (l ? 'group' : 'lookup') + '.jpg" alt="" style="object-position: 50% 20%">' +
    '<div style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(12,12,12,0.5) 0%, rgba(12,12,12,0.1) 24%, rgba(12,12,12,0.55) 48%, rgba(12,12,12,0.94) 70%, #0c0c0c 86%)"></div>' +
    '<header class="s72-bar" style="color: #fff"><span>' + logo(24, true) + '</span><span></span></header>' +
    '<div style="flex: 1"></div>' +
    '<main class="s72-pad" style="position: relative; flex: none; display: flex; flex-direction: column; padding-bottom: 18px">' + head +
    (reachable ? '<div class="s72-nextcard">' + next + '</div>' : '<button type="button" class="s72-nextcard" data-act="openNotify" data-ctx="intro" data-next="Home">' + next + '<span class="s72-nextcard__go">' + ic('bell', 22) + '</span></button>') +
    '</main>' + tabbar('Home') + '</div>';
};

SCREENS.Reveal = function () {
  var m = S.live, st = S.stats || {}, n = Number(st.going);
  var going = n > 0 ? people(n) + (n === 1 ? ' is' : ' are') + ' already going.' : 'Be one of the first to go.';
  return '<div class="s72-screen s72-on-black s72-reveal">' +
    '<img class="s72-photo" src="' + esc(photo(m.photo_reveal)) + '" alt="">' +
    '<div style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(12,12,12,0.5) 0%, rgba(12,12,12,0.05) 22%, rgba(12,12,12,0.3) 40%, rgba(12,12,12,0.9) 62%, #0c0c0c 80%)"></div>' +
    '<header class="s72-bar" style="color: #fff"><span>' + logo(24, true) + '</span><span class="s72-livetag"><i></i>Live now</span></header>' +
    '<div style="flex: 1"></div>' +
    '<main class="s72-pad" style="position: relative; flex: none; display: flex; flex-direction: column; padding-bottom: 20px">' +
    '<span class="s72-eyebrow" style="color: #fff; opacity: 1">' + mnum(m) + '</span>' +
    '<h1 class="s72-cond" style="font-size: 58px; margin-top: 6px">' + esc(m.name).split(' ').join('<br>') + '</h1>' +
    '<p style="font: 400 17px/25px var(--font-sans); margin-top: 12px">' + esc(m.action) + '</p>' +
    '<div style="margin-top: 16px">' + countdown() + '</div>' +
    '<a class="s72-btn s72-btn--primary" href="#HowGo" style="margin-top: 12px; position: static">I’m in</a>' +
    '<p class="body-sm" style="margin-top: 12px; text-align: center; opacity: 0.85">' + going + '</p>' +
    '</main></div>';
};

SCREENS.HowGo = function () {
  var cur = S.join && S.join.how;
  function choice(how, icon, t, sub) {
    var on = cur === how;
    return '<button type="button" class="s72-choice' + (on ? ' is-selected' : '') + '" data-act="join" data-how="' + how + '" aria-pressed="' + on + '"><span class="s72-choice__icon">' + ic(icon, 28) + '</span>' +
      '<span class="s72-choice__body"><span class="s72-choice__title" style="display: block">' + t + '</span><span class="s72-choice__sub" style="display: block">' + sub + '</span></span>' +
      '<span class="s72-choice__go">' + ic(on ? 'check' : 'next', 20) + '</span></button>';
  }
  return '<div class="s72-screen">' +
    '<div style="position: absolute; left: 0; right: 0; top: 84px; height: 232px; overflow: hidden"><div class="s72-big72" style="left: 0; top: 0; width: 116%"></div></div>' +
    top(backBtn(), '<span>' + logo(24) + '</span>', '', ' style="position: relative"') +
    '<main class="s72-pad" style="position: relative; flex: 1; display: flex; flex-direction: column; padding-top: 152px; padding-bottom: 26px">' +
    '<h1 class="s72-h" style="font-size: 40px">How will<br>you go?</h1>' +
    '<p class="body" style="margin-top: 26px; color: var(--ink-muted)">There’s no wrong way. Pick what fits.</p>' +
    '<div style="display: flex; flex-direction: column; gap: 12px; margin-top: 14px">' +
    choice('solo', 'person', 'On my own', 'I’ll make this happen myself.') +
    choice('two', 'two', 'With a friend', 'I’m bringing someone with me.') +
    choice('group', 'group', 'As a group', 'Family, small group, church or team.') +
    '</div><div style="flex: 1; min-height: 16px"></div>' +
    '<button type="button" class="s72-btn s72-btn--soft" data-act="ideas">' + ic('idea', 24) + 'Need an idea?</button></main></div>';
};

function inviteText() { return S.live.invite_text || ('I’m doing ' + S.live.name + ' with 72. Come do it with me.'); }
SCREENS.Invite = function () {
  var m = S.live, full = encodeURIComponent(inviteText() + ' ' + SITE);
  function inner(icon, bg, label, chev) { return '<span class="s72-app" style="background: ' + bg + '">' + ic(icon, 24) + '</span><span style="flex: 1">' + label + '</span>' + (chev ? ic('next', 20) : ''); }
  return '<div class="s72-screen s72-on-black">' +
    '<div style="position: absolute; left: 0; top: 0; right: 0; height: 66%; overflow: hidden"><img class="s72-photo" src="' + esc(photo(m.photo_invite)) + '" alt="" style="object-position: 50% 25%">' +
    '<div style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(12,12,12,0.4) 0%, rgba(12,12,12,0) 26%, rgba(12,12,12,0.55) 58%, #0c0c0c 96%)"></div></div>' +
    '<header class="s72-top" style="position: relative"><a class="s72-iconbtn" href="#Home" aria-label="Close" style="color: #fff">' + ic('close') + '</a><span></span><span></span></header>' +
    '<main style="position: relative; flex: 1; display: flex; flex-direction: column; padding: 0 12px 14px">' +
    '<div style="flex: 1; min-height: 12px"></div>' +
    '<h1 class="s72-h" style="font-size: 36px; padding: 0 12px">Bring someone<br>with you.</h1>' +
    '<p style="font: 400 17px/25px var(--font-sans); margin-top: 10px; padding: 0 12px">Good is better together. Send the invite and go as one.</p>' +
    '<div class="s72-sheet">' +
    '<a class="s72-sheetrow" href="sms:?&body=' + full + '" data-then="Home">' + inner('message', '#34C759', 'Messages', 1) + '</a>' +
    '<a class="s72-sheetrow" href="https://wa.me/?text=' + full + '" target="_blank" rel="noopener" data-then="Home">' + inner('whatsapp', '#25D366', 'WhatsApp', 1) + '</a>' +
    '<button type="button" class="s72-sheetrow" data-act="inviteCopy">' + inner('link', '#6B6760', 'Copy link', 1) + '</button>' +
    '<button type="button" class="s72-sheetrow" data-act="inviteShare">' + inner('more', '#E9E4DA; color: #111', 'More options', 0) + '</button>' +
    '<a href="#Home" style="align-self: center; padding: 12px 10px 6px; font: 600 14px/20px var(--font-sans); color: var(--ink-muted); text-decoration: underline; text-underline-offset: 3px">I’ll do this later</a>' +
    '</div></main></div>';
};

SCREENS.Mission = function () {
  var m = S.live, st = S.stats || {}, done = S.join && S.join.completed_at, n = Number(st.going), c = Number(st.countries);
  var live = '<a class="s72-box s72-liverow" href="#Impact"><span class="s72-disc" style="width: 46px; height: 46px">' + ic('impact', 22) + '</span>' +
    '<span style="flex: 1"><span style="display: block; font: 800 17px/22px var(--font-sans); letter-spacing: -0.015em">' + people(n) + (n === 1 ? ' is going' : ' are going') + '</span>' +
    '<span style="display: block; font: 400 14px/19px var(--font-sans); color: var(--ink-muted)">' + (c > 1 ? 'in ' + num(c) + ' countries. See the map.' : 'See the map.') + '</span></span>' + ic('next', 20) + '</a>';
  var actions = done
    ? '<a class="s72-btn s72-btn--primary" href="#Share" style="position: static">Share your card</a><div class="s72-row2"><a class="s72-btn s72-btn--soft" href="#Story">' + ic('pen', 20) + 'Tell your story</a><a class="s72-btn s72-btn--soft" href="#Invite">' + ic('two', 20) + 'Invite</a></div>'
    : '<a class="s72-btn s72-btn--primary" href="#Complete" style="position: static">I did it</a><div class="s72-row2"><button type="button" class="s72-btn s72-btn--soft" data-act="ideas">' + ic('idea', 20) + 'Ideas</button><a class="s72-btn s72-btn--soft" href="#Invite">' + ic('two', 20) + 'Invite</a></div>';
  return '<div class="s72-screen s72-missionhome">' +
    '<section class="s72-homehero">' +
    '<img class="s72-photo" src="' + esc(photo(m.photo_home)) + '" alt="">' +
    '<div style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(12,12,12,0.5) 0%, rgba(12,12,12,0.12) 26%, rgba(12,12,12,0.45) 50%, rgba(12,12,12,0.92) 82%, #0c0c0c 100%)"></div>' +
    '<header class="s72-bar" style="color: #fff"><span>' + logo(24, true) + '</span><span class="s72-chip s72-chip--blue">' + (done ? 'You did it ' : 'You’re in ') + CHECK14 + '</span></header>' +
    '<div style="flex: 1; min-height: 8px"></div>' +
    '<div class="s72-pad" style="position: relative; flex: none; display: flex; flex-direction: column; padding-bottom: 18px">' +
    '<span class="s72-eyebrow" style="color: #fff; opacity: 1">' + mnum(m) + '</span>' +
    '<h1 class="s72-cond" style="font-size: 46px; margin-top: 6px">' + esc(m.name) + '</h1>' +
    '<p style="font: 400 16px/23px var(--font-sans); margin-top: 8px">' + esc(m.action) + '</p>' +
    '<div style="margin-top: 14px">' + countdown() + '</div></div></section>' +
    '<main class="s72-pad" style="flex: none; display: flex; flex-direction: column; gap: 10px; padding-top: 14px; padding-bottom: 14px">' +
    live + actions +
    '</main>' + tabbar('Home') + '</div>';
};

SCREENS.Details = function () {
  var m = S.live, t = ui.dtab;
  var verse = m.scripture ? '<blockquote class="s72-verse"><p>' + esc(m.scripture) + '</p><cite>' + esc(m.scripture_ref) + '</cite></blockquote>' : '';
  var pMission = '<img src="/assets/quiet.jpg" alt="" style="flex: none; display: block; width: 100%; height: 150px; object-fit: cover; object-position: 50% 30%; border-radius: 18px; margin-bottom: 20px"><h2 class="heading">The mission</h2><p class="body" style="margin-top: 6px">' + esc(m.action) + '</p>' + verse +
    (lines(m.could_be).length ? '<h2 class="heading" style="margin-top: 20px">This could be:</h2><ul class="body" style="margin: 8px 0 0; padding: 0 0 0 20px; display: flex; flex-direction: column; gap: 4px">' + lines(m.could_be).map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>' : '') +
    (m.bar_title ? '<div style="flex: none; display: flex; gap: 12px; align-items: flex-start; margin-top: 20px; padding: 14px 16px; border-radius: var(--radius-md); background: var(--surface-sunk)"><span style="flex: none; color: var(--blue-ink)">' + ic('idea') + '</span><p class="body-sm"><span style="font-weight: 700">' + esc(m.bar_title) + '</span> ' + esc(m.bar_body) + '</p></div>' : '');
  var pIdeas = '<h2 class="heading">' + esc(m.ideas_title) + '</h2><div class="s72-card" style="flex: none; margin-top: 12px; padding: 4px 16px; ' + CARD + '">' +
    lines(m.ideas).map(function (x, i) { return '<div class="s72-row" style="justify-content: flex-start"><span style="flex: none; width: 20px; font-weight: 700; color: var(--blue-ink)">' + (i + 1) + '</span><span class="s72-row__text">' + esc(x) + '</span></div>'; }).join('') + '</div>';
  return '<div class="s72-screen">' + top(backBtn()) +
    '<main style="flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; padding: 4px 20px 24px">' +
    '<span class="body-sm" style="text-align: center; color: var(--ink-muted)">' + mnum(m) + '</span>' +
    '<h1 class="s72-mission-title s72-caps" style="text-align: center; font-size: 26px; margin-top: 2px">' + esc(m.name) + '</h1>' +
    '<div class="s72-seg" style="flex: none; margin: 16px 0 20px"><button type="button" class="' + (t === 'mission' ? 'is-active' : '') + '" data-act="dtab" data-v="mission" aria-pressed="' + (t === 'mission') + '">Mission</button><button type="button" class="' + (t === 'ideas' ? 'is-active' : '') + '" data-act="dtab" data-v="ideas" aria-pressed="' + (t === 'ideas') + '">Ideas</button></div>' +
    '<div style="flex: none; display: flex; flex-direction: column">' + (t === 'mission' ? pMission : pIdeas) + '</div></main>' +
    '<div class="s72-pad" style="flex: none; padding-top: 12px; padding-bottom: max(20px, env(safe-area-inset-bottom)); background: var(--ground); border-top: 1px solid var(--line)">' +
    '<button type="button" class="s72-btn s72-btn--primary" data-act="back">Got it</button></div></div>';
};

SCREENS.Impact = function () {
  var m = S.live || S.last;
  var head = '<header class="s72-bar"><span>' + logo(24) + '</span><span class="s72-pagetag">Impact</span></header>';
  if (!m) {
    return '<div class="s72-screen">' + head +
      '<div class="s72-pad" style="flex: 1; text-align: center; padding-top: 80px"><p class="s72-h" style="font-size: 32px">Nothing live yet.</p><p class="body" style="margin-top: 10px; color: var(--ink-muted)">When a mission starts, you’ll watch it spread here.</p></div>' + tabbar('Impact') + '</div>';
  }
  function seg(v, l) { return '<button type="button" class="' + (ui.itab === v ? 'is-active' : '') + '" data-act="itab" data-v="' + v + '" aria-pressed="' + (ui.itab === v) + '">' + l + '</button>'; }
  return '<div class="s72-screen">' + head +
    '<main class="s72-pad" style="flex: 1; display: flex; flex-direction: column; padding-top: 8px; padding-bottom: 16px">' +
    '<div class="s72-seg" style="flex: none">' + seg('global', 'Global') + seg('country', 'By country') + seg('city', 'By city') + '</div>' +
    '<p id="i-going" style="font: 900 76px/1 var(--font-sans); letter-spacing: -0.05em; text-align: center; margin-top: 22px; font-variant-numeric: tabular-nums">–</p>' +
    '<p id="i-label" style="font: 700 17px/24px var(--font-sans); letter-spacing: -0.01em; text-align: center">&nbsp;</p>' +
    '<div id="i-body" style="display: flex; flex-direction: column; gap: 12px; margin-top: 6px"></div></main>' +
    tabbar('Impact') + '</div>';
};
function timeAgo(ts) {
  var s = Math.max(0, Math.round((now() - new Date(ts).getTime()) / 1000));
  if (s < 60) return 'Just now';
  var m = Math.round(s / 60); if (m < 60) return m + (m === 1 ? ' minute ago' : ' minutes ago');
  var h = Math.round(m / 60); if (h < 48) return h + (h === 1 ? ' hour ago' : ' hours ago');
  return Math.round(h / 24) + ' days ago';
}
var impactData = null, impactTimer = null;
function paintImpact() {
  var d = impactData; if (!d || !document.getElementById('i-body')) return;
  var live = !!S.live, n = Number(d.going);
  document.getElementById('i-going').textContent = num(n);
  document.getElementById('i-label').textContent = (n === 1 ? 'person ' : 'people ') + (live ? (n === 1 ? 'is going.' : 'are going.') : 'took part.');
  function stat(v, l) { return '<div class="s72-stat" style="align-items: center"><span class="s72-stat__n">' + v + '</span><span class="s72-stat__l">' + l + '</span></div>'; }
  function row(icon, place, c, to) {
    var inner = '<span style="flex: none; color: var(--ink)">' + ic(icon, 26) + '</span><span class="s72-row__text" style="font-weight: 600">' + esc(place) + '</span><span style="font: 800 16px/20px var(--font-sans); font-variant-numeric: tabular-nums">' + num(c) + '</span>' + (to ? '<span style="flex: none; color: var(--ink-muted)">' + ic('next', 18) + '</span>' : '');
    return to ? '<button type="button" class="s72-row" data-act="itab" data-v="' + to + '">' + inner + '</button>' : '<div class="s72-row">' + inner + '</div>';
  }
  var html;
  if (ui.itab === 'global') {
    var rows = row('impact', 'Worldwide', d.going, 'country');
    if (d.place && d.place.country) rows += row('pin', countryName(d.place.country), d.my_country, 'city');
    if (d.place && d.place.city) rows += row('pin', d.place.city, d.my_city, 'city');
    html = '<div class="s72-map" style="flex: none"><img src="/assets/map-light.svg" alt=""><svg id="i-map" viewBox="0 0 700 260" role="img" aria-label="World map. Orange lights mark where people are taking part."></svg></div>' +
      '<div class="s72-box s72-statrow" style="flex: none; padding: 16px 4px">' + stat(num(d.countries), 'Countries') + stat(num(d.cities), 'Cities') + stat(compact(d.going), 'People') + '</div>' +
      '<div class="s72-box" style="flex: none; padding: 2px 16px">' + rows + '</div>';
  } else {
    var list = ui.itab === 'country' ? d.by_country.map(function (x) { return row('pin', countryName(x.country), x.n); }) : d.by_city.map(function (x) { return row('pin', x.city + ', ' + countryName(x.country), x.n); });
    html = list.length ? '<div class="s72-box" style="flex: none; padding: 2px 16px; margin-top: 12px">' + list.join('') + '</div>' : '<div class="s72-empty" style="margin-top: 12px">No one on the map yet. Be the first.</div>';
  }
  document.getElementById('i-body').innerHTML = html;
  drawPoints('i-map', d.points, false);
}
function loadImpact() {
  var m = S.live || S.last; if (!m) return Promise.resolve();
  return myPlace().then(function (p) {
    return rpc('get_impact', { p_mission: m.id, p_country: p.country || null, p_city: p.city || null }).then(function (d) { d.place = p; impactData = d; paintImpact(); });
  }).catch(function () {});
}
AFTER.Impact = function () {
  if (impactData) paintImpact();
  loadImpact();
  impactTimer = setInterval(function () { if (!document.hidden) loadImpact(); }, 30000);
};

SCREENS.Stories = function () {
  var m = storyMission(), can = m && storyJoin();
  function pill(v, l) { return '<button type="button" class="s72-pill' + (ui.sfilter === v ? ' is-active' : '') + '" data-act="sfilter" data-v="' + v + '" aria-pressed="' + (ui.sfilter === v) + '">' + l + '</button>'; }
  var body = !m ? '<div class="s72-empty">Stories appear here once a mission is live.</div>'
    : '<div style="flex: none; display: flex; gap: 8px; margin: 4px 0 6px">' + pill('all', 'All') + pill('mine', 'My country') + '</div><div id="s-list" style="display: flex; flex-direction: column; gap: 12px"><div class="s72-empty">Loading…</div></div>' +
      (can ? '<a class="s72-btn s72-btn--done" href="#Story" style="flex: none; margin-top: 4px">' + ic('pen', 20) + 'Tell your story</a>' : '');
  return '<div class="s72-screen">' +
    '<header class="s72-bar"><span>' + logo(24) + '</span><span class="s72-pagetag">Stories</span></header>' +
    '<main style="flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding: 14px 20px 24px">' +
    '<h1 class="s72-h" style="font-size: 36px">' + (m ? 'Stories from<br>' + esc(m.name) : 'Stories') + '</h1>' + body + '</main>' + tabbar('Stories') + '</div>';
};
function storyCard(s) {
  var place = [s.city, countryName(s.country)].filter(Boolean).join(', ');
  var who = [s.first_name, place].filter(Boolean).join(' · ') || 'Somewhere';
  var foot = s.pending ? '<span class="s72-chip" style="background: rgba(255,255,255,0.16); color: #fff">Waiting for review</span>'
    : '<button type="button" class="s72-encourage' + (s.i_did ? ' is-on' : '') + '" data-act="enc" data-id="' + s.id + '" aria-pressed="' + !!s.i_did + '">' + ic('heart', 18) + '<span data-n>' + num(s.n) + '</span> encouraged</button>';
  return '<article class="s72-storycard"><p>“' + esc(s.body) + '”</p>' +
    '<div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 16px"><span style="display: flex; align-items: center; gap: 8px; font: 500 14px/20px var(--font-sans)"><span style="flex: none; width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.16); display: grid; place-items: center">' + ic('pin', 16) + '</span>' + esc(who) + '</span>' + foot + '</div></article>';
}
AFTER.Stories = function () {
  var m = storyMission(); if (!m) return;
  var want = ui.sfilter === 'mine' ? myPlace().then(function (p) { return p.country || null; }) : Promise.resolve(null);
  want.then(function (country) {
    if (ui.sfilter === 'mine' && !country) return [];
    return rpc('list_stories', { p_pid: PID, p_mission: m.id, p_country: country });
  }).then(function (list) {
    var el = document.getElementById('s-list'); if (!el) return;
    el.innerHTML = list.length ? list.map(storyCard).join('') : '<div class="s72-empty">' + (ui.sfilter === 'mine' ? 'No stories from your country yet.' : 'No stories yet. Yours could be the first.') + '</div>';
  }).catch(function (e) { var el = document.getElementById('s-list'); if (el) el.innerHTML = '<div class="s72-empty">' + esc(e.message) + '</div>'; });
};

SCREENS.Story = function () {
  function radio(v, l, h) { return '<button type="button" class="s72-radio' + (ui.aud === v ? ' is-selected' : '') + '" data-act="aud" data-v="' + v + '" aria-pressed="' + (ui.aud === v) + '"><span class="s72-radio__dot"></span><span>' + l + ' <span class="s72-radio__hint">' + h + '</span></span></button>'; }
  return '<div class="s72-screen">' + top(backBtn('close'), '') +
    '<main class="s72-pad" style="flex: 1; display: flex; flex-direction: column; padding-top: 4px">' +
    '<h1 class="s72-h" style="font-size: 36px">Tell your story.</h1>' +
    '<p class="body" style="margin-top: 10px; color: var(--ink-muted)">A few honest lines. It might be the reason someone else goes.</p>' +
    '<label class="s72-label" for="story" style="margin-top: 20px">What happened?</label>' +
    '<textarea id="story" class="s72-field" maxlength="500" placeholder="Who did you go to? What surprised you?" style="flex: none; min-height: 132px"></textarea>' +
    '<span class="body-sm" style="align-self: flex-end; color: var(--ink-muted); margin-top: 4px"><span id="story-count">0</span>/500</span>' +
    '<label class="s72-label" for="fname" style="margin-top: 8px">Your first name <span style="font-weight: 400; color: var(--ink-muted)">(optional)</span></label>' +
    '<input id="fname" class="s72-input" type="text" maxlength="40" autocomplete="given-name" value="' + esc(LS.get('name') || '') + '" style="flex: none">' +
    '<span class="s72-label" style="margin-top: 16px; margin-bottom: 2px">How should it appear?</span>' +
    '<div style="flex: none; display: flex; flex-direction: column">' + radio('public', 'With my name', 'First name and city') + radio('anon', 'Anonymous', 'Country only') + '</div>' +
    '<div style="flex: 1; min-height: 16px"></div>' +
    '<button type="button" class="s72-btn s72-btn--primary" data-act="storySend">Send my story</button>' +
    '<p class="body-sm" style="margin-top: 12px; text-align: center; color: var(--ink-muted)">A person reads every story before it appears. Please don’t name anyone without asking them.</p>' +
    '</main></div>';
};

SCREENS.Complete = function () {
  var m = S.live, ways = lines(m.ways);
  if (!ui.way || ways.indexOf(ui.way) < 0) ui.way = ways[0] || 'Other';
  var nums = ['1', '2', '3', '4', '5+'].map(function (c) { return '<button type="button" class="s72-num' + (ui.cnt === c ? ' is-active' : '') + '" data-act="cnt" data-v="' + c + '" aria-pressed="' + (ui.cnt === c) + '">' + c + '</button>'; }).join('');
  var wrows = ways.map(function (w) { return '<button type="button" class="s72-radio' + (ui.way === w ? ' is-selected' : '') + '" data-act="way" data-v="' + esc(w) + '" aria-pressed="' + (ui.way === w) + '"><span class="s72-radio__dot"></span>' + esc(w) + '</button>'; }).join('');
  return '<div class="s72-screen">' + top(backBtn()) +
    '<main style="flex: 1; display: flex; flex-direction: column; padding-bottom: max(18px, env(safe-area-inset-bottom))">' +
    '<span class="s72-eyebrow" style="display: flex; align-items: center; justify-content: center; gap: 6px; color: var(--ink)">Mission complete ' + CHECK14 + '</span>' +
    '<div style="flex: none; display: flex; align-items: flex-end; margin-top: 10px"><h1 class="s72-h" style="flex: 1; font-size: 38px; padding: 0 0 14px 20px">' + esc(m.complete_title) + '</h1><span style="flex: none; width: 52px; height: 60px; background: var(--blue)"></span></div>' +
    '<img src="/assets/together.jpg" alt="" style="flex: none; display: block; width: 100%; height: 132px; object-fit: cover; object-position: 50% 28%">' +
    '<div class="s72-pad" style="flex: 1; display: flex; flex-direction: column">' +
    '<h2 class="heading" style="margin-top: 18px">' + esc(m.count_question) + '</h2>' +
    '<div style="flex: none; display: flex; gap: 10px; margin-top: 12px">' + nums + '</div>' +
    '<h2 class="heading" style="margin-top: 20px">' + esc(m.ways_question) + '</h2>' +
    '<div style="flex: none; display: flex; flex-direction: column; margin-top: 2px">' + wrows + '</div>' +
    '<div style="flex: 1; min-height: 12px"></div>' +
    '<button type="button" class="s72-btn s72-btn--primary" data-act="finish" data-next="Share" style="flex: none">Finish</button>' +
    '<button type="button" class="s72-btn s72-btn--quiet" data-act="finish" data-next="Story" style="flex: none; margin-top: 2px">Finish and tell my story</button>' +
    '</div></main></div>';
};

function hoursLeft() { return Math.max(0, Math.ceil((new Date(S.live.ends_at).getTime() - now()) / 3600000)); }
function shareLine() { var n = Number((S.stats || {}).going) || 1; return people(n) + (n === 1 ? ' is ' : ' are ') + S.live.share_phrase + '.'; }
SCREENS.Share = function () {
  return '<div class="s72-screen s72-on-black">' +
    top('<a class="s72-iconbtn" href="#Home" aria-label="Close" style="color: #fff">' + ic('close') + '</a>', '<span>' + logo(22, true) + '</span>', '') +
    '<main class="s72-pad" style="flex: 1; display: flex; flex-direction: column; padding-top: 6px; padding-bottom: 14px">' +
    '<h1 class="s72-h" style="font-size: 30px; text-align: center">Your card is ready.</h1>' +
    '<p class="body-sm" style="text-align: center; margin-top: 8px; opacity: 0.8">Post it or send it. It’s how the next person hears about this.</p>' +
    '<div class="s72-cardbox" id="card-box"><span class="body-sm" style="opacity: 0.6">Making your card…</span></div>' +
    '<button type="button" class="s72-btn s72-btn--primary" data-act="cardShare" style="flex: none; position: static">' + ic('share', 20) + 'Share</button>' +
    '<div class="s72-row2" style="margin-top: 10px"><button type="button" class="s72-btn s72-btn--ghost" data-act="cardSave">' + ic('save', 20) + 'Save image</button><button type="button" class="s72-btn s72-btn--ghost" data-act="cardCopy">' + ic('link', 20) + 'Copy link</button></div>' +
    '<a class="s72-btn s72-btn--quiet" href="#Home" style="flex: none; color: #fff; margin-top: 2px">Done</a>' +
    '</main></div>';
};
var cardFile = null;
function loadImg(src) { return new Promise(function (res, rej) { var i = new Image(); i.crossOrigin = 'anonymous'; i.onload = function () { res(i); }; i.onerror = rej; i.src = src; }); }
function makeCard() {
  var m = S.live, W = 1080, H = 1350;
  var fonts = document.fonts ? Promise.all([document.fonts.load('120px Anton'), document.fonts.load('500 46px Inter'), document.fonts.load('700 28px Inter')]).catch(function () {}) : Promise.resolve();
  return Promise.all([loadImg('/assets/hero-man.webp'), loadImg('/assets/logo-mask.svg'), fonts]).then(function (r) {
    var man = r[0], lg = r[1], cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    var x = cv.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
    var lw = 1180, lh = lw * 760.7 / 1133.3, t = document.createElement('canvas'); t.width = lw; t.height = lh;
    var tx = t.getContext('2d'); tx.drawImage(lg, 0, 0, lw, lh); tx.globalCompositeOperation = 'source-in'; tx.fillStyle = '#FC5B17'; tx.fillRect(0, 0, lw, lh);
    x.drawImage(t, (W - lw) / 2 + 10, 60);
    var mh = 900, mw = mh * man.width / man.height; x.drawImage(man, (W - mw) / 2, 190, mw, mh);
    var g = x.createLinearGradient(0, 600, 0, 860); g.addColorStop(0, 'rgba(12,12,12,0)'); g.addColorStop(0.55, 'rgba(12,12,12,0.82)'); g.addColorStop(1, '#0c0c0c');
    x.fillStyle = g; x.fillRect(0, 600, W, 262); x.fillStyle = '#0c0c0c'; x.fillRect(0, 860, W, H - 860);
    x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'alphabetic';
    x.font = '136px Anton, "Arial Narrow", sans-serif';
    var y = 940; x.fillText(m.name.toUpperCase(), 70, y, W - 140);
    x.font = '500 44px Inter, sans-serif';
    var words = shareLine().split(' '), line = '', out = []; y += 76;
    words.forEach(function (w) { var tt = line ? line + ' ' + w : w; if (x.measureText(tt).width > W - 140 && line) { out.push(line); line = w; } else line = tt; }); out.push(line);
    out.forEach(function (l) { x.fillText(l, 70, y); y += 58; });
    x.font = '88px Anton, "Arial Narrow", sans-serif'; x.fillStyle = '#FC5B17'; x.fillText(S.join ? 'I’M ONE OF THEM.' : 'COME WITH US.', 70, y + 62);
    x.fillStyle = '#fff'; x.font = '700 26px Inter, sans-serif'; try { x.letterSpacing = '4px'; } catch (e) {}
    x.fillText('ONE MISSION. 72 HOURS. CHRISTIANS EVERYWHERE.', 70, H - 96);
    try { x.letterSpacing = '0px'; } catch (e) {}
    x.font = '500 28px Inter, sans-serif'; x.globalAlpha = 0.8; x.fillText((C.siteUrl || location.origin).replace(/^https?:\/\//, ''), 70, H - 52); x.globalAlpha = 1;
    return new Promise(function (res) { cv.toBlob(function (b) { res(b); }, 'image/jpeg', 0.92); });
  }).then(function (blob) {
    cardFile = blob ? new File([blob], '72-' + m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg', { type: 'image/jpeg' }) : null;
    return cardFile;
  });
}
AFTER.Share = function () {
  cardFile = null;
  makeCard().then(function (f) {
    var box = document.getElementById('card-box'); if (!box || !f) return;
    box.innerHTML = '<img src="' + URL.createObjectURL(f) + '" alt="Your share card: ' + esc(S.live.name) + '. ' + esc(shareLine()) + ' I’m one of them.">';
  }).catch(function () { var box = document.getElementById('card-box'); if (box) box.innerHTML = '<span class="body-sm" style="opacity: 0.7">Couldn’t draw the card. You can still share the link.</span>'; });
};
function shareMsg() { return shareLine() + ' ' + (S.join ? 'I’m one of them. ' : '') + 'Join ' + mnum(S.live) + ': ' + S.live.name + '.'; }
function copyText(t) {
  if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t);
  return new Promise(function (res, rej) { var a = document.createElement('textarea'); a.value = t; a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); try { document.execCommand('copy') ? res() : rej(); } catch (e) { rej(e); } a.remove(); });
}

SCREENS.Results = function () {
  var m = S.last, st = S.last_stats || {};
  function rstat(icon, n, l) { return '<div class="s72-stat" style="align-items: center; padding: 0 4px"><span style="color: var(--blue-ink)">' + ic(icon) + '</span><span class="s72-stat__n" style="font-size: 20px; line-height: 26px">' + n + '</span><span class="s72-stat__l" style="text-align: center; letter-spacing: 0.06em">' + l + '</span></div>'; }
  return '<div class="s72-screen">' + top('<a class="s72-iconbtn" href="#Home" aria-label="Close" style="color: var(--ink)">' + ic('close') + '</a>') +
    '<main class="s72-pad" style="flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; padding-bottom: 28px">' +
    '<span class="s72-eyebrow">' + mnum(m) + ' · ' + esc(m.name) + '</span>' +
    '<p style="font: 800 56px/60px var(--font-display); letter-spacing: -0.02em; margin-top: 16px; font-variant-numeric: tabular-nums">' + num(st.going) + '</p>' +
    '<p class="body">' + (Number(st.going) === 1 ? 'person' : 'people') + ' took part</p>' +
    '<div style="flex: none; align-self: stretch; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 28px">' +
    rstat('impact', num(st.countries), 'Countries') + rstat('doc', num(st.stories), 'Stories shared') + rstat('group', num(st.people), esc(m.total_label)) + '</div>' +
    mapBox(false, 'r-map') +
    '<img src="/assets/sunset.jpg" alt="" style="flex: none; display: block; width: 100%; height: 170px; object-fit: cover; object-position: 50% 62%; border-radius: 20px; margin-top: 22px">' +
    '<p class="body" style="margin-top: 26px">' + esc(m.closing_line) + '</p>' +
    '<a class="s72-btn s72-btn--primary" href="#Stories" style="flex: none; margin-top: 24px; position: static">Read the stories ' + ic('arrow', 20) + '</a>' +
    '<div style="flex: 1; min-height: 24px"></div><span class="s72-rule" style="flex: none"></span>' +
    '<div style="display: flex; flex-direction: column; gap: 4px; margin-top: 16px"><span class="s72-title">We’ll go again.</span><span class="body-sm" style="color: var(--ink-muted)">Next 72: coming soon.</span></div>' +
    '</main></div>';
};
AFTER.Results = function () {
  rpc('get_impact', { p_mission: S.last.id }).then(function (d) { drawPoints('r-map', d.points, false); }).catch(function () {});
};

function pushState() { return ('Notification' in window) ? Notification.permission : 'unsupported'; }
SCREENS.My72 = function () {
  var m = S.live, j = S.join, me = S.me || {};
  function lrow(t, href, val) { return '<a class="s72-row" href="' + href + '"><span class="s72-row__text">' + t + '</span><span class="s72-row__value">' + (val || '') + NEXT18 + '</span></a>'; }
  function nrow(t, val) { return '<button type="button" class="s72-row" data-act="openNotify" data-ctx="settings" data-next="My72"><span class="s72-row__text">' + t + '</span><span class="s72-row__value">' + val + NEXT18 + '</span></button>'; }
  var howLabel = { solo: 'On my own', two: 'With a friend', group: 'As a group' };
  var missionCard;
  if (m && j) {
    missionCard = '<div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-bottom: 8px"><span style="font: 900 20px/26px var(--font-sans); letter-spacing: -0.03em">' + esc(m.name) + '</span>' +
      '<span class="s72-chip s72-chip--in">' + CHECK14 + (j.completed_at ? 'You did it' : 'You’re in') + '</span></div>' +
      lrow('How you’re going', '#HowGo', howLabel[j.how] || '') + lrow('Invite someone', '#Invite') + lrow('Tell your story', '#Story');
  } else if (m) {
    missionCard = '<div style="padding-bottom: 8px"><span style="font: 900 20px/26px var(--font-sans); letter-spacing: -0.03em">' + esc(m.name) + '</span></div>' + lrow('See the mission', '#Home');
  } else {
    missionCard = '<p class="body" style="padding-bottom: 12px; color: var(--ink-muted)">No mission is live right now. We’ll tell you the moment one starts.</p>';
  }
  var ps = pushState();
  return '<div class="s72-screen">' +
    '<header class="s72-bar"><span>' + logo(24) + '</span><span class="s72-pagetag">More</span></header>' +
    '<main style="flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; padding: 14px 20px 24px">' +
    '<h1 class="s72-h" style="font-size: 36px">My 72</h1>' +
    '<span class="s72-eyebrow" style="margin-top: 22px">This mission</span>' +
    '<div class="s72-card" style="flex: none; margin-top: 8px; padding: 16px 16px 4px">' + missionCard + '</div>' +
    '<span class="s72-eyebrow" style="margin-top: 22px">Notifications</span>' +
    '<div class="s72-card" style="flex: none; margin-top: 8px; padding: 4px 16px">' + nrow('On this phone', ps === 'granted' ? 'On' : 'Off') + nrow('By email', me.email ? esc(me.email.length > 22 ? me.email.slice(0, 20) + '…' : me.email) : 'Add') + '</div>' +
    '<span class="s72-eyebrow" style="margin-top: 22px">About</span>' +
    '<div class="s72-card" style="flex: none; margin-top: 8px; padding: 4px 16px">' + lrow('How 72 works', '#How') + lrow('Privacy', '#Privacy') +
    (TEST ? '<button type="button" class="s72-row" data-act="leaveTest"><span class="s72-row__text">Test mode is on<span class="s72-row__sub">You’re seeing the test mission, not the real one.</span></span><span class="s72-row__value">Leave</span></button>' : '') +
    '</div></main>' + tabbar('More') + '</div>';
};

SCREENS.Privacy = function () {
  function p(t) { return '<p class="body" style="margin-top: 12px">' + t + '</p>'; }
  function li(a) { return '<ul class="body" style="margin: 8px 0 0; padding: 0 0 0 20px; display: flex; flex-direction: column; gap: 6px">' + a.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>'; }
  return '<div class="s72-screen">' + top(backBtn()) +
    '<main style="flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; padding: 8px 20px 32px">' +
    '<h1 class="s72-mission-title" style="font-size: 30px">Privacy</h1>' +
    p('72 doesn’t ask you to create an account. Here is everything we keep.') +
    '<h2 class="heading" style="margin-top: 22px">What we keep</h2>' +
    li(['A random ID for this phone, so we count you once.', 'The missions you join, how you went, and what you tell us when you finish.', 'Your city and country, worked out from your internet connection. We never use GPS.', 'Your story, if you share one. Stories are reviewed before anyone else sees them.', 'Your email, only if you give it to us. We use it for mission alerts and nothing else.']) +
    '<h2 class="heading" style="margin-top: 22px">What we don’t do</h2>' +
    li(['We don’t sell or share your information.', 'We don’t track you across other apps or websites.', 'We don’t show your name unless you add it to a story yourself.']) +
    '</main></div>';
};

// ------------------------------------------------------------------ moving between screens
var NEED_LIVE = ['Reveal', 'HowGo', 'Invite', 'Mission', 'Details', 'Complete', 'Share'];
var NEED_JOIN = ['Invite', 'Mission', 'Complete', 'Share'];
function homeName() { return S.live ? (S.join ? 'Mission' : 'Reveal') : 'Main'; }
var current = null;
function route() {
  var name = decodeURIComponent((location.hash || '').slice(1)) || 'Home';
  if (name === 'Home' || !SCREENS[name] || name === 'Loading' || name === 'Offline') name = homeName();
  if (!LS.get('onboarded') && ['Welcome', 'How', 'Notify', 'Privacy'].indexOf(name) < 0) name = 'Welcome';
  if (NEED_LIVE.indexOf(name) >= 0 && !S.live) name = homeName();
  if (NEED_JOIN.indexOf(name) >= 0 && !S.join) name = homeName();
  if (name === 'Reveal' && S.join) name = 'Mission';
  if (name === 'Results' && !S.last) name = homeName();
  if (name === 'Story' && !(storyMission() && storyJoin())) name = 'Stories';
  show(name);
}
function show(name) {
  clearInterval(impactTimer); closeSheet();
  current = name;
  view.innerHTML = SCREENS[name]();
  tick();
  if (AFTER[name]) AFTER[name]();
  document.title = '72';
}
function go(name, replace) {
  var h = '#' + name;
  if (replace) { try { history.replaceState(null, '', h); } catch (e) {} route(); }
  else if (location.hash === h) route();
  else location.hash = h;
}
window.addEventListener('hashchange', route);

function tick() {
  if (!S.live) return;
  var t = Math.max(0, Math.floor((new Date(S.live.ends_at).getTime() - now()) / 1000));
  var v = { h: Math.floor(t / 3600), m: Math.floor(t / 60) % 60, s: t % 60 };
  var els = view.querySelectorAll('[data-cd]');
  for (var i = 0; i < els.length; i++) els[i].textContent = String(v[els[i].getAttribute('data-cd')]).padStart(2, '0');
  if (t === 0 && !tick.ended) { tick.ended = true; setTimeout(function () { softRefresh(); tick.ended = false; }, 2000); }
}
setInterval(tick, 1000);
setInterval(function () { if (!document.hidden && current !== 'Offline') softRefresh(); }, 60000);
document.addEventListener('visibilitychange', function () { if (!document.hidden && current && current !== 'Offline' && current !== 'Loading') softRefresh(); });

// ------------------------------------------------------------------ notifications
function finishOnboard() { LS.set('onboarded', '1'); }
function notifyDone() { LS.set('asked', '1'); finishOnboard(); var n = ui.notifyNext || 'Home'; ui.notifyNext = null; ui.notifyCtx = null; go(n, true); }
function b64ToBytes(b64) { var p = '='.repeat((4 - b64.length % 4) % 4), s = atob((b64 + p).replace(/-/g, '+').replace(/_/g, '/')), a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i); return a; }
function subscribePush() {
  if (!C.vapidPublicKey || !('serviceWorker' in navigator) || !('PushManager' in window) || pushState() !== 'granted') return Promise.resolve(false);
  return navigator.serviceWorker.ready.then(function (reg) {
    return reg.pushManager.getSubscription().then(function (sub) { return sub || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(C.vapidPublicKey) }); });
  }).then(function (sub) { return rpc('save_push', { p_pid: PID, p_sub: sub.toJSON() }); }).then(function () { return true; }).catch(function () { return false; });
}
function saveEmailField() {
  var el = document.getElementById('email'); if (!el) return Promise.resolve(true);
  var v = el.value.trim();
  if (v === (S.me.email || '')) return Promise.resolve(true);
  return rpc('save_contact', { p_pid: PID, p_email: v || null }).then(function () { S.me.email = v || null; return true; });
}
function installSheet() {
  sheet('<h2 class="s72-title">Add 72 to your home screen</h2>' +
    '<p class="body" style="color: var(--ink-muted)">On iPhone, notifications only work once 72 is on your home screen.</p>' +
    '<ol class="body" style="margin: 0; padding-left: 22px; display: flex; flex-direction: column; gap: 8px"><li>Tap the <b>Share</b> button in Safari.</li><li>Choose <b>Add to Home Screen</b>.</li><li>Open 72 from your home screen. Go to <b>More</b>, then <b>Notifications</b>.</li></ol>' +
    '<button type="button" class="s72-btn s72-btn--primary" data-act="sheetDone" style="margin-top: 8px">Got it</button>');
}

// ------------------------------------------------------------------ what buttons do
var ACT = {
  back: function () { if (history.length > 1) history.back(); else go('Home', true); },
  retry: function () { boot(); },
  dtab: function (el) { ui.dtab = el.dataset.v; show('Details'); },
  itab: function (el) { ui.itab = el.dataset.v; var b = view.querySelectorAll('.s72-seg [data-act="itab"]'); for (var i = 0; i < b.length; i++) { var on = b[i].dataset.v === ui.itab; b[i].classList.toggle('is-active', on); b[i].setAttribute('aria-pressed', on); } paintImpact(); },
  sfilter: function (el) { ui.sfilter = el.dataset.v; show('Stories'); },
  cnt: function (el) { ui.cnt = el.dataset.v; pick(el, 'cnt', 'is-active'); },
  way: function (el) { ui.way = el.dataset.v; pick(el, 'way', 'is-selected'); },
  aud: function (el) { ui.aud = el.dataset.v; pick(el, 'aud', 'is-selected'); },
  join: function (el) {
    var how = el.dataset.how, first = !S.join; busy(el, true);
    getGeo().then(function (g) {
      return rpc('join_mission', { p_pid: PID, p_mission: S.live.id, p_how: how, p_country: g.country || null, p_region: g.region || null, p_city: g.city || null, p_lat: g.lat == null ? null : g.lat, p_lon: g.lon == null ? null : g.lon });
    }).then(refresh).then(function () {
      impactData = null;
      var next = how === 'solo' ? 'Home' : 'Invite';
      if (!first) { go('My72', true); return; }
      if (!LS.get('asked') && pushState() !== 'granted') { ui.notifyCtx = 'joined'; ui.notifyNext = next; go('Notify', true); }
      else go(next, true);
    }).catch(function (e) { busy(el, false); toast(e.message); });
  },
  ideas: function () { ui.dtab = 'ideas'; go('Details'); },
  skipIntro: function () { finishOnboard(); go('Home', true); },
  introDone: function () { if (S.live) { finishOnboard(); go('Home', true); } else { ui.notifyCtx = 'intro'; ui.notifyNext = 'Home'; go('Notify'); } },
  openNotify: function (el) { ui.notifyCtx = el.dataset.ctx; ui.notifyNext = el.dataset.next; go('Notify'); },
  inviteShare: function () {
    var data = { text: inviteText(), url: SITE };
    if (navigator.share) navigator.share(data).then(function () { go('Home', true); }).catch(function () {});
    else copyText(inviteText() + ' ' + SITE).then(function () { toast('Invite copied. Paste it anywhere.'); go('Home', true); }).catch(function () { toast('Couldn’t copy. Try Messages or WhatsApp.'); });
  },
  inviteCopy: function () { copyText(inviteText() + ' ' + SITE).then(function () { toast('Invite copied. Paste it anywhere.'); }).catch(function () { toast('Couldn’t copy on this phone.'); }); },
  finish: function (el) {
    var next = el.dataset.next; busy(el, true);
    rpc('complete_mission', { p_pid: PID, p_mission: S.live.id, p_people: ui.cnt === '5+' ? 5 : Number(ui.cnt), p_way: ui.way })
      .then(refresh).then(function () { go(next, true); }).catch(function (e) { busy(el, false); toast(e.message); });
  },
  storySend: function (el) {
    var body = document.getElementById('story').value.trim(), name = document.getElementById('fname').value.trim();
    if (!body) { toast('Write a line or two first.'); return; }
    busy(el, true); LS.set('name', name);
    rpc('add_story', { p_pid: PID, p_mission: storyMission().id, p_body: body, p_name: name || null, p_anonymous: ui.aud === 'anon' })
      .then(function () { go('Stories', true); toast('Thank you. Your story will appear once it’s been read.'); })
      .catch(function (e) { busy(el, false); toast(e.message); });
  },
  enc: function (el) {
    rpc('toggle_encourage', { p_pid: PID, p_story: Number(el.dataset.id) }).then(function (r) {
      el.classList.toggle('is-on', r.on); el.setAttribute('aria-pressed', r.on); el.querySelector('[data-n]').textContent = num(r.n);
    }).catch(function (e) { toast(e.message); });
  },
  alert: function (el) {
    var k = el.dataset.k, on = !el.classList.contains('is-on');
    el.classList.toggle('is-on', on); el.setAttribute('aria-checked', on); S.me[k] = on;
    rpc('save_alerts', { p_pid: PID, p_live: S.me.alert_live !== false, p_last: S.me.alert_last !== false, p_done: S.me.alert_done !== false })
      .catch(function (e) { S.me[k] = !on; el.classList.toggle('is-on', !on); el.setAttribute('aria-checked', !on); toast(e.message); });
  },
  notifyOn: function (el) {
    busy(el, true);
    saveEmailField().then(function () {
      if (!('Notification' in window)) {
        busy(el, false);
        if (isIOS && !standalone) { installSheet(); return; }
        toast(S.me.email ? 'This browser can’t show notifications. We’ll email you.' : 'This browser can’t show notifications. Add your email and we’ll write to you.');
        if (S.me.email) notifyDone();
        return;
      }
      if (Notification.permission === 'denied') {
        busy(el, false);
        toast(S.me.email ? 'Notifications are blocked for this site. We’ll email you.' : 'Notifications are blocked for this site in your phone’s settings. Add your email and we’ll write to you.');
        if (S.me.email) notifyDone();
        return;
      }
      return Notification.requestPermission().then(function (perm) {
        if (perm === 'granted') { LS.set('wantPush', '1'); return subscribePush().then(function () { toast('Notifications are on.'); notifyDone(); }); }
        notifyDone();
      });
    }).catch(function (e) { busy(el, false); toast(e.message); });
  },
  notifySkip: function (el) {
    busy(el, true);
    saveEmailField().then(notifyDone).catch(function (e) { busy(el, false); toast(e.message); });
  },
  sheetDone: function () { closeSheet(); notifyDone(); },
  cardShare: function () {
    var data = { text: shareMsg(), url: SITE };
    if (cardFile && navigator.canShare && navigator.canShare({ files: [cardFile] })) data.files = [cardFile];
    if (navigator.share) navigator.share(data).catch(function () {});
    else copyText(shareMsg() + ' ' + SITE).then(function () { toast('Copied. Paste it anywhere.'); }).catch(function () { toast('Couldn’t share from this browser.'); });
  },
  cardSave: function () {
    (cardFile ? Promise.resolve(cardFile) : makeCard()).then(function (f) {
      if (!f) throw new Error('x');
      var a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000); toast('Card saved.');
    }).catch(function () { toast('Couldn’t make the card. Try Share.'); });
  },
  cardCopy: function () { copyText(SITE).then(function () { toast('Link copied.'); }).catch(function () { toast('Couldn’t copy on this phone.'); }); },
  leaveTest: function () { LS.del('test'); location.href = '/?test=0'; }
};
function pick(el, act, cls) {
  var all = view.querySelectorAll('[data-act="' + act + '"]');
  for (var i = 0; i < all.length; i++) { var on = all[i] === el; all[i].classList.toggle(cls, on); all[i].setAttribute('aria-pressed', on); }
}
document.addEventListener('click', function (e) {
  var a = e.target.closest('[data-act]');
  if (a) { e.preventDefault(); if (ACT[a.dataset.act]) ACT[a.dataset.act](a, e); return; }
  var t = e.target.closest('[data-then]');
  if (t) { var to = t.dataset.then; setTimeout(function () { go(to, true); }, 600); }
});
document.addEventListener('input', function (e) {
  if (e.target.id === 'story') { var c = document.getElementById('story-count'); if (c) c.textContent = e.target.value.length; }
});

// ------------------------------------------------------------------ start
function boot() {
  show('Loading');
  refresh().then(function () {
    route();
    if (LS.get('wantPush') === '1' && !S.me.has_push) subscribePush();
  }).catch(function () { show('Offline'); });
}
try { if (location.hash) history.replaceState(null, '', location.pathname); } catch (e) {}
if (TEST) { var tag = document.createElement('span'); tag.className = 's72-testtag'; tag.textContent = 'TEST'; stage.appendChild(tag); }
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('/sw.js').catch(function () {});
}
boot();
})();
