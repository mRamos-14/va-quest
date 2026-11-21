// VA Quest: game logic (screens, battles, saves). Data comes from data/c*.js via VAQ.district();
// worlds, areas and scenes come from data/worlds.js and scenes.js.
(function () {
  const $ = (s, el) => (el || document).querySelector(s);
  const view = $('#view'), hud = $('#hud');
  VAQ.finalize();
  const D = VAQ.D;
  const KEY = 'vaquest-save-v1';
  const DEF = () => ({
    name: '', xp: 0, coins: 0, stars: {}, boss: {}, seen: {}, weak: {},
    owned: ['shirt-orange'], equip: { shirt: 'shirt-orange', hat: '', pet: '' },
    set: { sound: true, chill: false, free: false },
    streak: 0, last: '', answered: 0, correct: 0, bestCombo: 0,
    hard: {}, tower: { day: '', best: 0, allBest: 0, hist: {}, run: null }
  });
  let S = load();

  function load() {
    const d = DEF();
    try {
      const j = JSON.parse(localStorage.getItem(KEY));
      if (j) return Object.assign(d, j, { equip: Object.assign(d.equip, j.equip), set: Object.assign(d.set, j.set) });
    } catch (e) { }
    return d;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }

  // ---------- helpers ----------
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const stageById = id => { for (const d of D) for (const s of d.stages) if (s.id === id) return [d, s]; return []; };
  const qById = id => { const [, s] = stageById(id.split('-')[0]); return s && s.qs.find(q => q.id === id); };
  const allQs = d => d.stages.flatMap(s => s.qs);
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2200);
  }

  // ---------- levels & titles ----------
  const TITLES = [[1, 'Rookie VA'], [3, 'Junior Tech VA'], [5, 'Automation Apprentice'], [8, 'Workflow Wizard'], [12, 'Agent Architect'], [16, 'AI Automation Pro'], [20, 'Agency Owner']];
  function lvl(xp) { let n = 1, need = 100; while (xp >= need) { xp -= need; n++; need = 100 + (n - 1) * 40; } return { n, into: xp, need }; }
  const title = n => TITLES.filter(t => n >= t[0]).pop()[1];

  // ---------- sound (WebAudio bleeps, only after a tap) ----------
  let AC = null;
  function tone(f, d, type, when) {
    if (!S.set.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      const o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime + (when || 0);
      o.type = type || 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(.06, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + d);
    } catch (e) { }
  }
  const sfx = {
    ok() { tone(660, .08); tone(880, .1, 'square', .08); },
    crit() { tone(660, .07); tone(880, .07, 'square', .07); tone(1320, .14, 'square', .14); },
    no() { tone(160, .25, 'sawtooth'); },
    win() { [523, 659, 784, 1046].forEach((f, i) => tone(f, .16, 'square', i * .12)); },
    lose() { [392, 330, 262].forEach((f, i) => tone(f, .25, 'triangle', i * .18)); },
    tap() { tone(440, .04, 'triangle'); }
  };

  // ---------- art ----------
  const SHOP = [
    { id: 'shirt-orange', type: 'shirt', name: 'Sunset Polo', price: 0, c: '#ff9f1c' },
    { id: 'shirt-teal', type: 'shirt', name: 'Teal Hoodie', price: 60, c: '#2ec4b6' },
    { id: 'shirt-violet', type: 'shirt', name: 'Violet Blazer', price: 120, c: '#9b5de5' },
    { id: 'shirt-red', type: 'shirt', name: 'Client-Call Red', price: 160, c: '#ef476f' },
    { id: 'hat-cap', type: 'hat', name: 'Builder Cap', price: 90, spr: 'cap', dy: 4 },
    { id: 'hat-top', type: 'hat', name: 'Agency Top Hat', price: 260, spr: 'tophat', dy: 2 },
    { id: 'hat-halo', type: 'hat', name: 'Zero-Bug Halo', price: 420, spr: 'halo', dy: 0 },
    { id: 'pet-bot', type: 'pet', name: 'Mini Bot', price: 220, spr: 'bot' },
    { id: 'pet-cat', type: 'pet', name: 'Office Cat', price: 320, spr: 'cat' }
  ];
  const item = id => SHOP.find(i => i.id === id);
  function playerCanvas(scale, equip) {
    equip = equip || S.equip;
    const sh = item(equip.shirt), hat = item(equip.hat);
    const L = [{ name: 'player', dy: 4, pal: { c: sh ? sh.c : '#ff9f1c' } }];
    if (hat) L.push({ name: hat.spr, dy: hat.dy, pal: { c: sh ? sh.c : '#ff9f1c' } });
    return VAQ.spriteCanvas(L, scale);
  }
  function petCanvas(scale) { const p = item(S.equip.pet); return p ? VAQ.spriteCanvas([{ name: p.spr, pal: { g: '#9aa3c7' } }], scale) : null; }
  const ENEMY = {
    bug: { name: 'Bug', pal: { g: '#7bd389' } },
    slime: { name: 'Duplicate Slime', pal: { g: '#5ec8f2' } },
    ghost: { name: 'Hallucination Ghost', pal: { g: '#d9d2ff' } },
    robot: { name: 'Broken Bot', pal: { g: '#9aa3c7', e: '#2ec4b6' } }
  };
  const BOSSBASE = { golem: 'golem', rogue: 'robot', kraken: 'ghost', titan: 'golem', hydra: 'slime', mimic: 'bug', gremlin: 'bug', phantom: 'ghost' };
  function enemyCanvas(kind, scale, color, boss) {
    const base = boss ? (BOSSBASE[kind] || 'golem') : kind;
    const pal = boss ? { g: color, e: '#1b1730' } : ENEMY[kind].pal;
    const L = [{ name: base, dy: boss ? 3 : 0, pal, flip: true }];
    if (boss) L.push({ name: 'crown', dx: Math.floor((VAQ.SPR[base][0].length - 7) / 2), dy: 0 });
    return VAQ.spriteCanvas(L, scale);
  }

  // pixel scenes live in scenes.js; every world and area has its own theme
  const WORLD = d => (VAQ.WORLDS && VAQ.WORLDS[d.id]) || { theme: 'quarter', group: 'tech', icon: '', areas: [] };
  const areaCache = {};
  function areasOf(d) {
    if (areaCache[d.id]) return areaCache[d.id];
    const used = new Set(), out = [];
    WORLD(d).areas.forEach(a => {
      const st = a.ids.map(id => d.stages.find(s => s.id === id)).filter(Boolean);
      st.forEach(s => used.add(s.id));
      if (st.length) out.push(Object.assign({}, a, { stages: st }));
    });
    const rest = d.stages.filter(s => !used.has(s.id));
    if (rest.length) out.push({ name: 'More', theme: WORLD(d).theme, color: d.color, stages: rest });
    return (areaCache[d.id] = out);
  }
  const areaOfStage = (d, s) => areasOf(d).find(a => a.stages.includes(s)) || { theme: WORLD(d).theme, color: d.color, name: '' };
  function battleScene(o) {
    if (o.review) return o.world ? { theme: WORLD(o.world).theme, color: o.world.color, seed: seedOf(o.world.id) + 3 } : { theme: 'cafe', color: '#5ec8f2', seed: 31 };
    if (o.boss) return { theme: WORLD(o.d).theme, color: o.d.color, seed: seedOf(o.d.id) + 5 };
    const a = areaOfStage(o.d, o.s);
    return { theme: a.theme, color: a.color, seed: seedOf(o.s.id) };
  }
  const seedOf = s => [...s].reduce((a, c) => a + c.charCodeAt(0) * 31, 11);

  // ---------- progress rules ----------
  // worlds never lock each other; inside a world, stages open one after another (area by area)
  const order = d => areasOf(d).flatMap(a => a.stages);
  const stageUnlocked = (d, s) => { const o = order(d), i = o.indexOf(s); return S.set.free || i <= 0 || (S.stars[o[i - 1].id] || 0) > 0; };
  const bossUnlocked = d => S.set.free || d.stages.every(s => (S.stars[s.id] || 0) > 0);
  const nextStage = d => order(d).find(s => !S.stars[s.id] && stageUnlocked(d, s));
  const districtStars = d => d.stages.reduce((a, s) => a + (S.stars[s.id] || 0), 0);
  function touchStreak() {
    const day = new Date(); const k = day.toDateString();
    if (S.last === k) return;
    const y = new Date(day - 864e5).toDateString();
    S.streak = S.last === y ? S.streak + 1 : 1; S.last = k;
  }

  // ---------- HUD ----------
  function drawHud(show) {
    if (show === false) { hud.innerHTML = ''; return; }
    const L = lvl(S.xp);
    hud.innerHTML = `<div class="hud">
      <div class="who"><span id="hudav"></span><div class="grow"><div class="name">${esc(S.name || 'Rookie')} <span class="muted small">Lv ${L.n}</span></div>
      <div class="small muted">${title(L.n)}</div><div class="bar" title="XP to next level"><i style="width:${Math.round(100 * L.into / L.need)}%"></i></div></div></div>
      <span class="pill coin" title="Coins">● ${S.coins}</span>
      <span class="pill" title="Days in a row">🔥 ${S.streak}</span></div>`;
    $('#hudav').appendChild(playerCanvas(3));
  }

  // ---------- screens ----------
  function go(fn, ...a) { stopTimer(); window.scrollTo(0, 0); fn(...a); }

  function scrTitle() {
    drawHud(false);
    const fresh = !S.name;
    view.innerHTML = `<div class="title-wrap"><canvas class="sky"></canvas><div class="title-over">
        <span class="tag">TECH VA ACADEMY</span><h1>VA Quest</h1>
        <p class="muted">Beat the bugs. Learn the tools. Build the agency.</p></div></div>
      <div class="card col">
        ${fresh ? `<label for="nm" class="disp">What should clients call you?</label>
          <input id="nm" type="text" maxlength="16" placeholder="Your VA name" autocomplete="off">` : `<p>Welcome back, <b>${esc(S.name)}</b>. ${countCleared()} of ${totalStages()} stages cleared.</p>`}
        <button class="primary" id="start">${fresh ? 'Start my quest' : 'Continue'}</button>
        <p class="small muted">8 worlds, one per course, all open from the start: AI Automation, AI Agents, Claude, HighLevel, Profiles, Portfolio, Client Playbook and Zoom. Stick with one topic as long as you like. Answer right to attack. Miss and the question comes back later, so you always finish knowing it.</p>
      </div>`;
    const cv = $('canvas.sky'); VAQ.scene(cv, 'quarter', '#ff9f1c', 42);
    $('.title-over').appendChild(playerCanvas(6));
    $('#start').onclick = () => {
      sfx.tap();
      if (fresh) { S.name = ($('#nm').value || '').trim() || 'Rookie'; save(); }
      go(scrMap);
    };
    if (fresh) $('#nm').onkeydown = e => { if (e.key === 'Enter') $('#start').click(); };
  }
  const totalStages = () => D.reduce((a, d) => a + d.stages.length, 0);
  const countCleared = () => D.reduce((a, d) => a + d.stages.filter(s => S.stars[s.id]).length, 0);

  function worldCard(d) {
    const st = districtStars(d), max = d.stages.length * 3, qs = allQs(d), learned = qs.filter(q => S.seen[q.id]).length;
    const nx = nextStage(d), pct = Math.round(100 * learned / qs.length), na = areasOf(d).length;
    const b = document.createElement('button');
    b.className = 'worldbtn';
    b.style.borderColor = d.color;
    b.innerHTML = `<canvas></canvas><span class="wt"><span class="disp">${WORLD(d).icon} ${esc(d.name)}${S.boss[d.id] ? ' 👑' : ''}${S.hard[d.id + '-boss'] ? ' 💀' : ''}</span>
      <small class="crs">${esc(d.course.replace(/^\d+ - /, ''))} · ${na} area${na > 1 ? 's' : ''} · ${d.stages.length} stages</small>
      <span class="wbar"><i style="width:${pct}%;background:${d.color}"></i></span>
      <small>★ ${st}/${max} · ${learned}/${qs.length} learned · ${nx ? 'next: ' + esc(nx.name) : S.boss[d.id] ? 'world cleared' : 'boss is waiting'}</small></span>`;
    b.onclick = () => { sfx.tap(); go(scrDistrict, d); };
    return b;
  }

  function scrMap() {
    drawHud();
    const weakN = Object.keys(S.weak).filter(k => qById(k)).length;
    towerDay();
    const T = S.tower, last = D.find(d => d.id === S.lastWorld);
    view.innerHTML = `${last ? `<button id="t-cont" class="primary">▶ Continue in ${esc(last.name)}${nextStage(last) ? ': ' + esc(nextStage(last).name) : ''}</button>` : ''}
      <h2>Choose a world</h2>
      <p class="muted small" style="margin-top:-6px">Every course is its own world and they're all open. Progress in one never locks another, so stay in the one you want.</p>
      <h3 class="grp">🛠 Tech skill worlds</h3><div class="col" id="wl-tech"></div>
      <h3 class="grp">💼 Career worlds</h3><div class="col" id="wl-career"></div>
      <h3 class="grp">🎮 Extras</h3>
      <button id="t-tower" class="towerbtn"><canvas></canvas><span class="tt"><span class="disp">🗼 Endless Tower</span>
        <small>Every world mixed, new order every day · ${T.run ? 'your run: floor ' + T.run.floor : T.best ? "today's best: floor " + T.best : 'not climbed today'}${T.allBest ? ' · all-time best: floor ' + T.allBest : ''}</small></span></button>
      <div class="tools">
        <button id="t-review"><span class="disp">☕ Coffee Break</span><small>${weakN ? weakN + ' tricky questions, all worlds' : 'Quick mixed review'}</small></button>
        <button id="t-notes"><span class="disp">📒 Field Notes</span><small>Everything you've learned</small></button>
        <button id="t-shop"><span class="disp">🛍 Shop</span><small>Outfits, hats, pets</small></button>
        <button id="t-set"><span class="disp">⚙ Settings</span><small>Sound, chill mode, backup</small></button>
      </div>`;
    D.forEach(d => {
      const b = worldCard(d);
      $(WORLD(d).group === 'career' ? '#wl-career' : '#wl-tech').appendChild(b);
      VAQ.scene(b.querySelector('canvas'), WORLD(d).theme, d.color, seedOf(d.id));
    });
    if (last) $('#t-cont').onclick = () => { sfx.tap(); go(scrDistrict, last); };
    VAQ.scene($('#t-tower canvas'), 'tower', '#9b5de5', 777);
    $('#t-tower').onclick = () => { sfx.tap(); go(scrTower); };
    $('#t-review').onclick = () => { sfx.tap(); startReview(); };
    $('#t-notes').onclick = () => { sfx.tap(); go(scrNotes); };
    $('#t-shop').onclick = () => { sfx.tap(); go(scrShop); };
    $('#t-set').onclick = () => { sfx.tap(); go(scrSettings); };
  }

  function scrDistrict(d) {
    drawHud();
    if (S.lastWorld !== d.id) { S.lastWorld = d.id; save(); }
    const ids = new Set(d.stages.map(s => s.id));
    const worldWeak = Object.keys(S.weak).filter(k => ids.has(k.split('-')[0]) && qById(k)).length;
    view.innerHTML = `<div class="row"><button class="ghost" id="back">← All worlds</button></div>
      <div class="title-wrap"><canvas class="sky" style="height:140px"></canvas><div class="title-over"><span class="tag">WORLD · ${esc(d.course.replace(/^\d+ - /, ''))}</span><h2>${WORLD(d).icon} ${esc(d.name)}</h2></div></div>
      <div class="tools"><button id="w-review"><span class="disp">☕ Review this world</span><small>${worldWeak ? worldWeak + ' tricky questions here' : 'Questions from here you have seen'}</small></button>
        <button id="w-notes"><span class="disp">📒 World notes</span><small>${allQs(d).filter(q => S.seen[q.id]).length}/${allQs(d).length} learned</small></button></div>
      <div id="areas" class="col"></div>`;
    VAQ.scene($('canvas.sky'), WORLD(d).theme, d.color, seedOf(d.id));
    $('#back').onclick = () => go(scrMap);
    $('#w-review').onclick = () => { sfx.tap(); startReview(d); };
    $('#w-notes').onclick = () => go(scrNotes, d.id);
    const box = $('#areas'), nx = nextStage(d), multi = areasOf(d).length > 1;
    areasOf(d).forEach((a, ai) => {
      const cleared = a.stages.filter(s => S.stars[s.id]).length;
      const ab = document.createElement('section'); ab.className = 'area';
      ab.innerHTML = `<div class="areahead" style="border-color:${a.color}"><canvas></canvas><span class="at"><span class="tag" style="color:${a.color}">${multi ? 'AREA ' + (ai + 1) : 'AREA'}</span><span class="disp">${esc(a.name)}</span><small>${cleared}/${a.stages.length} cleared${cleared === a.stages.length ? ' ✓' : ''}</small></span></div><div class="path"></div>`;
      box.appendChild(ab);
      VAQ.scene(ab.querySelector('canvas'), a.theme, a.color, seedOf(d.id + a.name));
      const path = ab.querySelector('.path');
      a.stages.forEach(s => {
        const open = stageUnlocked(d, s), st = S.stars[s.id] || 0, num = order(d).indexOf(s) + 1;
        const n = document.createElement('div');
        n.className = 'node' + (st ? ' done' : '') + (s === nx ? ' next' : '');
        n.innerHTML = `<button class="dot" ${open ? '' : 'disabled'} ${open && !st && s !== nx ? `style="border-color:${a.color}"` : ''} aria-label="Stage ${num}: ${esc(s.name)}">${open ? num : '🔒'}</button>
          <div class="grow"><div class="lbl">${s.bonus ? '⭐ ' : ''}${esc(s.name)}</div><div class="st">${'★'.repeat(st)}${'☆'.repeat(3 - st)}${S.hard[s.id] ? ' 💀' : ''} <span class="muted small">${s.qs.filter(q => S.seen[q.id]).length}/${s.qs.length} learned</span></div></div>`;
        path.appendChild(n);
        n.querySelector('button').onclick = () => { sfx.tap(); go(scrBrief, d, s); };
      });
    });
    const bOpen = bossUnlocked(d);
    const bn = document.createElement('div');
    bn.className = 'node boss' + (S.boss[d.id] ? ' done' : '') + (bOpen && !S.boss[d.id] ? ' next' : '');
    bn.innerHTML = `<button class="dot" ${bOpen ? '' : 'disabled'} aria-label="World boss: ${esc(d.boss.name)}"></button>
      <div class="grow"><div class="lbl">WORLD BOSS: ${esc(d.boss.name)}</div><div class="small muted">${S.boss[d.id] ? 'Defeated 👑' + (S.hard[d.id + '-boss'] ? ' 💀' : '') : bOpen ? 'Mixed questions from the whole world' : 'Clear every stage in this world to face the boss'}</div></div>`;
    bn.querySelector('.dot').appendChild(enemyCanvas(d.boss.sprite, 3, d.color, true));
    const bp = document.createElement('div'); bp.className = 'path'; bp.appendChild(bn); box.appendChild(bp);
    bn.querySelector('button').onclick = () => { sfx.tap(); go(scrBossBrief, d); };
  }

  function scrBrief(d, s) {
    drawHud();
    const seen = s.qs.filter(q => S.seen[q.id]).length;
    view.innerHTML = `<div class="row"><button class="ghost" id="back">← ${esc(d.name)}</button></div>
      <div class="card col"><span class="tag">STAGE ${order(d).indexOf(s) + 1} · ${esc(areaOfStage(d, s).name || d.name)}</span><h2>${esc(s.name)}</h2>
        <p class="muted small">Lessons this stage covers:</p>
        <ul class="small" style="margin:0;padding-left:20px">${s.lessons.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
        ${s.bonus ? '<p class="tip">⭐ Bonus stage: extra lessons added to go deeper than the portal. Not from the course itself.</p>' : s.general ? '<p class="tip">These lessons are video-only on the portal, so this stage is built from the lesson topics. Watch the videos for the full detail.</p>' : ''}
        ${s.learn ? `<details class="lesson" ${seen ? '' : 'open'}><summary>📖 Quick lesson (${s.learn.length} points)</summary><ul>${s.learn.map(l => `<li>${esc(l)}</li>`).join('')}</ul></details>` : ''}
        <p class="small muted">${s.qs.length} questions in this stage · ${seen} seen · Best: ${'★'.repeat(S.stars[s.id] || 0) || 'not cleared yet'}</p>
        <button class="primary" id="fight">Fight the ${ENEMY[s.enemy].name}</button>
        ${hardBtn(!!S.stars[s.id], S.hard[s.id], 'Clear this stage once to unlock hard mode.')}
        ${seen ? '<button id="study">📒 Study my notes first</button>' : ''}
      </div>`;
    $('#back').onclick = () => go(scrDistrict, d);
    $('#fight').onclick = () => { sfx.tap(); startBattle({ d, s }); };
    $('#hard').onclick = () => { sfx.tap(); startBattle({ d, s, hard: true }); };
    if (seen) $('#study').onclick = () => go(scrNotes, d.id);
  }
  const hardBtn = (open, done, lockedMsg) => `<button id="hard" class="hardbtn" ${open ? '' : 'disabled'}>
      <span class="disp">💀 Hard mode${done ? ' · cleared ✓' : ''}</span><small>2 hearts · timer · no hints · no slips · tougher enemy · 2x rewards</small></button>
      ${open ? '' : `<p class="small muted">${lockedMsg}</p>`}`;

  function scrBossBrief(d) {
    drawHud();
    const beaten = !!S.boss[d.id];
    view.innerHTML = `<div class="row"><button class="ghost" id="back">← ${esc(d.name)}</button></div>
      <div class="card col" style="align-items:center;text-align:center"><span class="tag">BOSS · ${esc(d.name)}</span><span id="bart"></span><h2>${esc(d.boss.name)}</h2>
        <p class="muted small">Mixed questions from all ${d.stages.length} stages. Questions you missed before come first.</p>
        <p class="small">${beaten ? 'Defeated 👑' : 'Not defeated yet'}${S.hard[d.id + '-boss'] ? ' · 💀 Hard cleared' : ''}</p></div>
      <div class="col"><button class="primary" id="fight">Fight the boss</button>
        ${hardBtn(beaten, S.hard[d.id + '-boss'], 'Beat the boss once to unlock hard mode.')}
        <button id="study">📒 Study my notes first</button></div>`;
    $('#bart').appendChild(enemyCanvas(d.boss.sprite, 7, d.color, true));
    $('#back').onclick = () => go(scrDistrict, d);
    $('#fight').onclick = () => { sfx.tap(); startBattle({ d, boss: true }); };
    $('#hard').onclick = () => { sfx.tap(); startBattle({ d, boss: true, hard: true }); };
    $('#study').onclick = () => go(scrNotes, d.id);
  }

  // ---------- battle ----------
  let B = null;
  // question order: ones you missed first, then ones you've never seen, then the rest
  function priority(qs) {
    const weak = shuffle(qs.filter(q => S.weak[q.id]));
    const fresh = shuffle(qs.filter(q => !S.weak[q.id] && !S.seen[q.id]));
    const old = shuffle(qs.filter(q => !S.weak[q.id] && S.seen[q.id]));
    return weak.concat(fresh, old);
  }
  function startBattle(o) {
    touchStreak();
    const d = o.d;
    let pool, hp, foe;
    if (o.review) {
      pool = o.pool; hp = Math.min(6, pool.length); foe = { kind: 'slime', name: 'Procrastination Blob', color: '#5ec8f2' };
    } else if (o.boss) {
      const all = allQs(d);
      const weak = shuffle(all.filter(q => S.weak[q.id]));
      pool = priority(all);
      hp = Math.round(d.boss.hp * 1.5); foe = { kind: d.boss.sprite, name: d.boss.name, color: d.color, boss: true };
    } else {
      const s = o.s;
      pool = priority(s.qs);
      hp = Math.min(s.qs.length, s.qs.length > 20 ? 10 : 8); foe = { kind: s.enemy, name: ENEMY[s.enemy].name };
    }
    if (o.hard) { hp = Math.round(hp * 1.4); foe = Object.assign({}, foe, { name: '💀 ' + foe.name }); }
    const hearts = o.hard ? 2 : 3;
    B = { o, d, queue: pool.slice(), all: pool.slice(), hp, maxhp: hp, hearts, maxHearts: hearts, chill: S.set.chill && !o.hard,
      combo: 0, misses: 0, missed: [], got: 0, coins: 0, xp: 0, foe, scene: battleScene(o) };
    go(scrBattle);
  }

  function scrBattle() {
    drawHud(false);
    const f = B.foe;
    view.innerHTML = `<div class="row"><button class="ghost" id="flee">← Leave</button><span class="grow"></span><span class="pill coin">● ${S.coins + B.coins}</span></div>
      <div class="arena" id="arena"><canvas class="sky"></canvas>
        <div class="hpbox me"><span class="nm">${esc(S.name || 'Rookie')}</span><span class="hearts" id="hearts"></span></div>
        <div class="hpbox foe"><span class="nm">${esc(f.name)}</span><div class="hp"><i id="foehp" style="width:100%"></i></div></div>
        <div class="fighter me" id="me"></div><div class="pet" id="pet"></div>
        <div class="fighter foe${f.boss ? ' boss' : ''}" id="foe"></div>
        <div class="combo" id="combo"></div>
      </div>
      <div class="card qcard" id="q"></div>`;
    VAQ.scene($('#arena canvas'), B.scene.theme, B.scene.color, B.scene.seed);
    $('#me').appendChild(playerCanvas(6));
    const pc = petCanvas(4); if (pc) $('#pet').appendChild(pc);
    $('#foe').appendChild(f.boss ? enemyCanvas(f.kind, 7, f.color, true) : enemyCanvas(f.kind, 7));
    $('#flee').onclick = () => {
      if (B.o.tower) { S.tower.run.hearts = B.hearts; save(); return go(scrTower); } // the floor restarts, hearts lost so far stay lost
      go(B.o.review ? (B.o.world ? () => scrDistrict(B.o.world) : scrMap) : B.o.boss ? () => scrBossBrief(B.d) : () => scrBrief(B.d, B.o.s));
    };
    updBars(); nextQ();
  }
  function updBars() {
    $('#hearts').textContent = B.chill ? '♥ chill mode' : '♥'.repeat(Math.max(0, B.hearts)) + '♡'.repeat(Math.max(0, B.maxHearts - B.hearts));
    $('#foehp').style.width = Math.max(0, 100 * B.hp / B.maxhp) + '%';
    $('#combo').textContent = B.combo >= 3 ? `COMBO x${B.combo}` : '';
  }
  function floatTxt(txt, side) {
    const a = $('#arena'), el = document.createElement('div');
    el.className = 'float'; el.textContent = txt;
    el.style[side === 'foe' ? 'right' : 'left'] = '18%'; el.style.top = '30%';
    a.appendChild(el); setTimeout(() => el.remove(), 900);
  }
  function anim(id, cls) { const el = $('#' + id); el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), 450); }

  const TYPE_LABEL = { mc: 'Pick one', tf: 'True or false', match: 'Match the pairs', ord: 'Put in order', sort: 'Sort them' };
  function nextQ() {
    let q;
    if (B.o.tower) q = towerNext();
    else { if (!B.queue.length) B.queue = shuffle(B.all); q = B.queue.shift(); } // never run dry
    B.cur = q; B.answered = false;
    const box = $('#q');
    box.innerHTML = `<div class="qfoot"><span class="qtype">${TYPE_LABEL[q.t]}</span><span class="timer" id="timer" hidden></span><button class="ghost small" id="hint" ${B.o.hard ? 'hidden' : ''}>💡 Hint (10 ●)</button></div>
      <div class="qtext">${esc(q.q)}</div><div id="ans"></div>`;
    startTimer(timeFor(q));
    $('#hint').onclick = () => {
      if (S.coins + B.coins < 10) { toast('Not enough coins yet'); return; }
      if (B.hint && B.hint()) { B.coins -= 10; sfx.tap(); }
    };
    B.hint = null;
    ({ mc: askMC, tf: askTF, match: askMatch, ord: askOrd, sort: askSort })[q.t](q, $('#ans'));
  }

  function askMC(q, el) {
    const opts = shuffle([q.a].concat(q.w));
    el.innerHTML = `<div class="opts">${opts.map((o, i) => `<button data-i="${i}">${esc(o)}</button>`).join('')}</div>`;
    const btns = [...el.querySelectorAll('button')];
    btns.forEach(b => b.onclick = () => {
      const ok = opts[+b.dataset.i] === q.a;
      btns.forEach(x => { x.disabled = true; if (opts[+x.dataset.i] === q.a) x.classList.add('good'); });
      if (!ok) b.classList.add('bad');
      answer(ok, ok ? '' : 'Answer: ' + q.a);
    });
    B.hint = () => {
      const wrong = btns.filter(b => !b.disabled && opts[+b.dataset.i] !== q.a && b.style.visibility !== 'hidden');
      if (wrong.length < 2) { toast('Hint already used'); return false; }
      shuffle(wrong).slice(0, 2).forEach(b => { b.style.visibility = 'hidden'; });
      return true;
    };
  }
  function askTF(q, el) {
    el.innerHTML = `<div class="tfrow"><button data-v="1">True</button><button data-v="0">False</button></div>`;
    const btns = [...el.querySelectorAll('button')];
    btns.forEach(b => b.onclick = () => {
      const v = b.dataset.v === '1', ok = v === q.a;
      btns.forEach(x => { x.disabled = true; if ((x.dataset.v === '1') === q.a) x.classList.add('good'); });
      if (!ok) b.classList.add('bad');
      answer(ok, ok ? '' : 'It is ' + (q.a ? 'TRUE' : 'FALSE') + '.');
    });
    B.hint = () => { toast('Think: ' + (q.a ? 'there is no catch here.' : 'one word in it is wrong.')); return true; };
  }
  function askMatch(q, el) {
    const L = shuffle(q.p.map((p, i) => ({ t: p[0], i }))), R = shuffle(q.p.map((p, i) => ({ t: p[1], i })));
    el.innerHTML = `<div class="match"><div class="colm" id="ml">${L.map(x => `<button data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div>
      <div class="colm" id="mr">${R.map(x => `<button data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div></div>`;
    let sel = null, miss = 0, done = 0;
    const lb = [...el.querySelectorAll('#ml button')], rb = [...el.querySelectorAll('#mr button')];
    const pair = (l, r) => {
      if (l.dataset.i === r.dataset.i) {
        [l, r].forEach(b => { b.classList.remove('sel'); b.classList.add('ok'); b.disabled = true; });
        done++; sel = null; sfx.tap();
        if (done === q.p.length) answer(miss <= 1, miss ? `${miss} wrong pairing${miss > 1 ? 's' : ''}.` : '', miss === 1);
      } else {
        miss++; r.classList.add('bad'); setTimeout(() => r.classList.remove('bad'), 400); tone(200, .1, 'sawtooth');
      }
    };
    lb.forEach(b => b.onclick = () => { lb.forEach(x => x.classList.remove('sel')); sel = b; b.classList.add('sel'); });
    rb.forEach(b => b.onclick = () => { if (!sel) { toast('Tap a left item first'); return; } pair(sel, b); });
    B.hint = () => {
      const l = lb.find(b => !b.disabled); if (!l) return false;
      pair(l, rb.find(b => b.dataset.i === l.dataset.i)); return true;
    };
  }
  function askOrd(q, el) {
    let pool = shuffle(q.s.map((t, i) => ({ t, i })));
    if (pool.every((p, k) => p.i === k)) pool.reverse();
    const picked = [];
    el.innerHTML = `<div class="slots" id="slots"></div><div class="chips" id="pool"></div><button class="primary" id="chk" disabled>Check order</button>`;
    const draw = () => {
      $('#slots', el).innerHTML = picked.length ? picked.map((p, k) => `<button data-k="${k}"><span class="n">${k + 1}</span>${esc(p.t)}</button>`).join('') : '<span class="muted small">Tap the steps below in the right order. Tap a placed step to take it back.</span>';
      $('#pool', el).innerHTML = pool.map((p, k) => `<button data-k="${k}">${esc(p.t)}</button>`).join('');
      el.querySelectorAll('#slots button').forEach(b => b.onclick = () => { pool.push(picked.splice(+b.dataset.k, 1)[0]); draw(); });
      el.querySelectorAll('#pool button').forEach(b => b.onclick = () => { picked.push(pool.splice(+b.dataset.k, 1)[0]); sfx.tap(); draw(); });
      $('#chk', el).disabled = pool.length > 0;
    };
    draw();
    $('#chk', el).onclick = () => {
      const ok = picked.every((p, k) => p.i === k);
      el.querySelectorAll('#slots button').forEach((b, k) => { b.disabled = true; b.classList.add(picked[k].i === k ? 'good' : 'bad'); });
      $('#chk', el).disabled = true;
      answer(ok, ok ? '' : 'Right order: ' + q.s.map((s, k) => (k + 1) + '. ' + s).join('  '));
    };
    B.hint = () => {
      let k = 0; while (k < picked.length && picked[k].i === k) k++;
      if (k >= q.s.length) return false;
      pool = pool.concat(picked.splice(k));
      const j = pool.findIndex(p => p.i === k); picked.push(pool.splice(j, 1)[0]); draw(); return true;
    };
  }
  function askSort(q, el) {
    const items = shuffle(q.i);
    let k = 0, miss = 0;
    const lists = [[], []];
    el.innerHTML = `<div class="sortitem" id="cur"></div><div class="bins">${q.b.map((b, i) => `<button data-b="${i}">${esc(b)}</button>`).join('')}</div>
      <div class="binlists"><ul id="l0"></ul><ul id="l1"></ul></div><p class="small muted" id="left"></p>`;
    const show = () => { $('#cur', el).textContent = items[k][0]; $('#left', el).textContent = `${items.length - k} left`; };
    const bins = [...el.querySelectorAll('.bins button')];
    bins.forEach(b => b.onclick = () => {
      const [txt, right] = items[k], pick = +b.dataset.b;
      const li = document.createElement('li'); li.textContent = txt;
      if (pick !== right) { miss++; li.className = 'miss'; b.classList.add('bad'); setTimeout(() => b.classList.remove('bad'), 400); tone(200, .1, 'sawtooth'); toast(`"${txt}" goes in ${q.b[right]}`); }
      else sfx.tap();
      $('#l' + right, el).appendChild(li);
      bins.forEach(x => x.classList.remove('good'));
      k++;
      if (k >= items.length) { bins.forEach(x => x.disabled = true); $('#cur', el).textContent = 'All sorted!'; $('#left', el).textContent = ''; answer(miss <= 1, miss ? `${miss} in the wrong pile (shown in red).` : '', miss === 1); }
      else show();
    });
    show();
    B.hint = () => { if (k >= items.length) return false; bins[items[k][1]].classList.add('good'); return true; };
  }

  // resolve an answer: damage, hearts, feedback panel
  function answer(ok, extra, close) {
    const q = B.cur;
    if (B.answered) return; // timer and click can't both count
    B.answered = true; stopTimer();
    if (ok && close && strict()) { ok = false; extra = (extra ? extra + ' ' : '') + 'No slips allowed at this level.'; }
    B.hint = null; $('#hint').disabled = true;
    S.seen[q.id] = 1; S.answered++;
    if (ok) {
      S.correct++; B.got++; B.combo++; S.bestCombo = Math.max(S.bestCombo, B.combo);
      const crit = B.combo >= 3, dmg = crit ? 2 : 1;
      B.hp -= dmg; B.coins += crit ? 4 : 2; B.xp += crit ? 15 : 10;
      if (S.weak[q.id]) { S.weak[q.id]--; if (S.weak[q.id] <= 0) delete S.weak[q.id]; }
      anim('me', 'lunge'); setTimeout(() => anim('foe', 'hit'), 150);
      floatTxt(crit ? 'CRIT -2' : '-1', 'foe'); crit ? sfx.crit() : sfx.ok();
    } else {
      B.combo = 0; B.misses++; B.missed.push(q);
      if (!B.chill) B.hearts--;
      S.weak[q.id] = (S.weak[q.id] || 0) + 1;
      if (!B.o.tower) B.queue.push(q); // it comes back later in this battle (the tower keeps climbing)
      anim('foe', 'lunge'); setTimeout(() => anim('me', 'hit'), 150);
      floatTxt(B.chill ? 'oops' : '-♥', 'me'); sfx.no();
    }
    updBars(); save();
    const end = B.hp <= 0 ? 'win' : B.hearts <= 0 ? 'lose' : '';
    const fb = document.createElement('div');
    fb.className = 'fb ' + (ok ? 'ok' : 'no');
    const heads = ok ? (close ? ['Close enough!', 'Got it (1 slip)'] : ['Nice!', 'Correct!', 'Clean hit!', 'Nailed it!', 'Client impressed!']) : ['Not quite', 'Missed!', 'Oof'];
    fb.innerHTML = `<span class="h">${heads[Math.floor(Math.random() * heads.length)]}</span>
      ${extra ? `<p class="small"><b>${esc(extra)}</b></p>` : ''}<p>${esc(q.x || '')}</p>
      ${!ok && !B.o.tower ? '<p class="small muted">This one will come back before the battle ends.</p>' : ''}
      ${!ok && B.o.tower ? '<p class="small muted">Saved to Coffee Break so you can fix it later.</p>' : ''}
      <button class="primary" id="nx">${end === 'win' ? (B.o.tower ? 'Clear the floor!' : 'Finish them!') : end === 'lose' ? 'See results' : 'Next'}</button>`;
    $('#q').appendChild(fb);
    fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    $('#nx').focus({ preventScroll: true });
    $('#nx').onclick = () => { if (end) endBattle(end === 'win'); else nextQ(); };
  }

  function endBattle(won) {
    const o = B.o;
    if (o.tower) return towerEnd(won);
    let stars = 0, bonusXp = 0, bonusCoins = 0, msg = '';
    if (won) {
      stars = B.misses === 0 ? 3 : B.misses === 1 ? 2 : 1;
      if (o.review) { bonusXp = 25; bonusCoins = 10; msg = 'Review done. Those questions are stronger now.'; }
      else if (o.hard) {
        const key = o.boss ? B.d.id + '-boss' : o.s.id, first = !S.hard[key];
        S.hard[key] = true;
        if (!o.boss && stars > (S.stars[o.s.id] || 0)) S.stars[o.s.id] = stars;
        bonusXp = first ? (o.boss ? 300 : 80) : 30; bonusCoins = first ? (o.boss ? 120 : 40) : 15;
        msg = first ? '💀 Hard mode cleared! Badge earned.' : 'Hard mode cleared again.';
        B.xp *= 2; B.coins = Math.max(0, B.coins) * 2;
      }
      else if (o.boss) {
        const first = !S.boss[B.d.id]; S.boss[B.d.id] = true;
        bonusXp = first ? 150 : 40; bonusCoins = first ? 60 : 15;
        const allDone = D.every(x => S.boss[x.id]);
        msg = first ? (allDone ? 'Every world cleared. Agency Owner energy.' : `${B.d.name} cleared! 👑 Hard mode for the boss is now open.`) : 'Boss beaten again.';
      } else {
        const prev = S.stars[o.s.id] || 0;
        if (stars > prev) S.stars[o.s.id] = stars;
        bonusXp = prev ? 10 : 30; bonusCoins = prev ? 5 : 15;
        msg = prev ? '' : 'New stage cleared!';
      }
      sfx.win();
    } else sfx.lose();
    const before = lvl(S.xp).n;
    S.xp += B.xp + bonusXp; S.coins = Math.max(0, S.coins + B.coins + bonusCoins);
    const after = lvl(S.xp).n;
    save();
    drawHud();
    const uniqMissed = [...new Map(B.missed.map(q => [q.id, q])).values()];
    view.innerHTML = `<div class="card col" style="text-align:center;align-items:center">
        <span class="tag">${o.hard ? '💀 HARD · ' : ''}${won ? (o.boss ? 'BOSS DEFEATED' : 'VICTORY') : 'OUT OF HEARTS'}</span>
        ${won ? `<div class="big">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>` : '<h2>The ' + esc(B.foe.name) + ' got you this time</h2>'}
        <p>${won ? esc(msg) : 'You kept everything you earned. The questions you missed now show up first next time.'}</p>
        <div class="row" style="justify-content:center"><span class="pill">+${B.xp + bonusXp} XP</span><span class="pill coin">+${B.coins + bonusCoins} ●</span><span class="pill">${B.got} correct</span></div>
        ${after > before ? `<p class="tag">LEVEL UP! You're now Lv ${after}: ${title(after)}</p>` : ''}
      </div>
      ${uniqMissed.length ? `<div class="card col"><h3>Lock these in</h3><div class="notes">${uniqMissed.map(noteHtml).join('')}</div></div>` : ''}
      <div class="col"><button class="primary" id="again">${won ? 'Play again' : 'Try again'}</button><button id="out">Back</button></div>`;
    $('#again').onclick = () => { sfx.tap(); o.review ? startReview(o.world) : startBattle(o); };
    $('#out').onclick = () => go(o.review ? (o.world ? () => scrDistrict(o.world) : scrMap) : () => scrDistrict(B.d));
  }

  // ---------- timer (hard mode and upper tower floors) ----------
  const strict = () => !!(B && (B.o.hard || (B.o.tower && B.floor >= 10)));
  function timeFor(q) {
    let base = 0;
    if (B.o.hard) base = 25;
    else if (B.o.tower && B.floor >= 6) base = Math.max(12, 32 - B.floor);
    if (!base) return 0;
    return q.t === 'mc' || q.t === 'tf' ? base : base + 20;
  }
  function stopTimer() { if (B && B.tInt) { clearInterval(B.tInt); B.tInt = null; } }
  function startTimer(sec) {
    stopTimer();
    const el = $('#timer'); if (!sec || !el) return;
    B.tLeft = sec; el.textContent = '⏱ ' + sec; el.hidden = false;
    B.tInt = setInterval(() => {
      B.tLeft--; el.textContent = '⏱ ' + B.tLeft; el.classList.toggle('low', B.tLeft <= 5);
      if (B.tLeft <= 5 && B.tLeft > 0) tone(880, .03, 'square');
      if (B.tLeft <= 0) {
        stopTimer();
        if (B.answered) return;
        document.querySelectorAll('#ans button').forEach(b => b.disabled = true);
        answer(false, "Time's up! Answer: " + answerText(B.cur));
      }
    }, 1000);
  }

  // ---------- Endless Tower (new question order every day, gets harder each floor) ----------
  const today = () => new Date().toDateString();
  function towerDay() {
    const k = today(), T = S.tower;
    if (T.day === k) return;
    if (T.day && T.best) { T.hist[T.day] = T.best; const keys = Object.keys(T.hist); if (keys.length > 7) delete T.hist[keys[0]]; }
    T.day = k; T.best = 0; T.run = null; save();
  }
  let TL = null;
  function towerList() {
    if (TL && TL.day === today()) return TL.qs;
    let h = 2166136261; for (const c of today()) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    const rnd = () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const W = { tf: 1, mc: 2, sort: 3, match: 3.5, ord: 4 };
    const scored = [];
    D.forEach((d, di) => d.stages.forEach(s => s.qs.forEach(q => scored.push({ q, k: W[q.t] + di * 0.45 + (s.bonus ? 1 : 0) + rnd() * 4 }))));
    scored.sort((a, b) => a.k - b.k);
    TL = { day: today(), qs: scored.map(x => x.q) };
    return TL.qs;
  }
  const towerHp = f => f % 5 === 0 ? 8 : Math.min(7, 4 + Math.floor((f - 1) / 5));
  function startTower() {
    towerDay(); touchStreak();
    const T = S.tower;
    if (!T.run) T.run = { floor: 1, hearts: 3, pos: 0 };
    const f = T.run.floor, guard = f % 5 === 0;
    const gd = D[(f / 5 - 1) % D.length];
    const kinds = ['bug', 'slime', 'ghost', 'robot'];
    const foe = guard ? { kind: gd.boss.sprite, name: `Floor ${f} Guardian`, color: gd.color, boss: true } : { kind: kinds[f % 4], name: `Floor ${f}: ${ENEMY[kinds[f % 4]].name}` };
    const hp = towerHp(f);
    B = { o: { tower: true }, d: null, floor: f, queue: [], all: [], hp, maxhp: hp, hearts: T.run.hearts, maxHearts: 3, chill: false,
      combo: 0, misses: 0, missed: [], got: 0, coins: 0, xp: 0, foe, scene: { theme: 'tower', color: '#9b5de5', seed: 99 + f } };
    save(); go(scrBattle);
  }
  function towerNext() {
    const list = towerList(), run = S.tower.run;
    const q = list[run.pos % list.length]; run.pos++;
    return q;
  }
  function towerEnd(won) {
    const T = S.tower, f = B.floor;
    let html;
    if (won) {
      const coins = 5 + f * 2 + B.coins, xp = 15 + f * 3 + B.xp;
      S.coins = Math.max(0, S.coins + coins); S.xp += xp;
      T.run.floor = f + 1;
      T.run.hearts = Math.min(3, B.hearts + (f % 5 === 0 ? 1 : 0));
      const newBest = f > T.best; T.best = Math.max(T.best, f);
      const newAll = f > T.allBest; T.allBest = Math.max(T.allBest, f);
      sfx.win(); save(); drawHud();
      html = `<div class="card col" style="text-align:center;align-items:center">
        <span class="tag">🗼 FLOOR ${f} CLEARED${newAll ? ' · NEW ALL-TIME BEST' : newBest ? ' · NEW BEST TODAY' : ''}</span>
        <h2>Next up: Floor ${f + 1}${(f + 1) % 5 === 0 ? ' (Guardian!)' : ''}</h2>
        <p class="hearts" style="font-size:1.6rem">${'♥'.repeat(T.run.hearts)}${'♡'.repeat(3 - T.run.hearts)}</p>
        ${f % 5 === 0 ? '<p>Guardian down: +1 heart restored.</p>' : ''}
        ${f + 1 >= 6 && f < 6 ? '<p class="tip">⏱ From floor 6 every question has a timer.</p>' : ''}
        ${f + 1 >= 10 && f < 10 ? '<p class="tip">From floor 10: no slips on match and sort.</p>' : ''}
        <div class="row" style="justify-content:center"><span class="pill">+${xp} XP</span><span class="pill coin">+${coins} ●</span></div></div>
        <div class="col"><button class="primary" id="up">Climb to floor ${f + 1}</button><button id="rest">Take a break (your run is saved for today)</button></div>`;
    } else {
      const reached = f - 1;
      T.run = null; sfx.lose(); save(); drawHud();
      html = `<div class="card col" style="text-align:center;align-items:center">
        <span class="tag">🗼 RUN OVER</span><h2>You cleared ${reached} floor${reached === 1 ? '' : 's'}</h2>
        <p>Today's best: floor ${T.best} · All-time best: floor ${T.allBest}</p>
        <p class="small muted">Today's tower keeps the same order until midnight, so a retry lets you fix what you missed. Tomorrow it reshuffles.</p></div>
        ${B.missed.length ? `<div class="card col"><h3>What stopped you</h3><div class="notes">${B.missed.map(noteHtml).join('')}</div></div>` : ''}
        <div class="col"><button class="primary" id="up">Climb again from floor 1</button><button id="rest">Back to the tower</button></div>`;
    }
    view.innerHTML = html;
    $('#up').onclick = () => { sfx.tap(); startTower(); };
    $('#rest').onclick = () => go(scrTower);
  }
  function scrTower() {
    towerDay(); drawHud();
    const T = S.tower, run = T.run, f = run ? run.floor : 1;
    const hist = Object.entries(T.hist).slice(-6);
    view.innerHTML = `<div class="row"><button class="ghost" id="back">← Map</button></div>
      <div class="title-wrap"><canvas class="sky" style="height:150px"></canvas><div class="title-over"><span class="tag">ENDLESS TOWER · RESETS EVERY DAY</span><h2>${run ? 'Your run: floor ' + f : "Today's tower"}</h2></div></div>
      <div class="row" style="justify-content:center"><span class="pill">Today's best: ${T.best ? 'floor ' + T.best : '-'}</span><span class="pill">All-time: ${T.allBest ? 'floor ' + T.allBest : '-'}</span></div>
      <div class="card col">
        ${run ? `<p>Floor ${f} · ${'♥'.repeat(run.hearts)}${'♡'.repeat(3 - run.hearts)}</p>` : ''}
        <button class="primary" id="go">${run ? 'Continue to floor ' + f : 'Start climbing'}</button>
        ${run ? '<button id="restart">Restart from floor 1</button><div id="rc"></div>' : ''}
        <ul class="small" style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px">
          <li>All ${D.reduce((a, d) => a + allQs(d).length, 0)} questions from every world, in a new order each day.</li>
          <li>Floors get harder: easy true/false first, then trickier types and later worlds.</li>
          <li>3 hearts for the whole climb. Guardian every 5 floors (+1 heart back).</li>
          <li>⏱ Timer from floor 6, getting faster. From floor 10, no slips on match and sort.</li>
          <li>Leave any time: your run is saved until midnight.</li>
        </ul></div>
      ${hist.length ? `<div class="card col"><h3>Recent days</h3>${hist.map(([d, b]) => `<p class="small">${esc(d)}: floor ${b}</p>`).join('')}</div>` : ''}`;
    VAQ.scene($('canvas.sky'), 'tower', '#9b5de5', 777);
    $('#back').onclick = () => go(scrMap);
    $('#go').onclick = () => { sfx.tap(); startTower(); };
    if (run) $('#restart').onclick = () => {
      $('#rc').innerHTML = `<p class="small">Throw away this run (floor ${f})?</p><div class="row"><button id="ry" class="bad">Yes, restart</button><button id="rn">Keep it</button></div>`;
      $('#ry').onclick = () => { T.run = null; save(); scrTower(); };
      $('#rn').onclick = () => { $('#rc').innerHTML = ''; };
    };
  }

  function answerText(q) {
    if (q.t === 'mc') return q.a;
    if (q.t === 'tf') return q.a ? 'True' : 'False';
    if (q.t === 'match') return q.p.map(p => p[0] + ' = ' + p[1]).join(' · ');
    if (q.t === 'ord') return q.s.map((s, k) => (k + 1) + '. ' + s).join('  ');
    if (q.t === 'sort') return q.b.map((b, bi) => b + ': ' + q.i.filter(i => i[1] === bi).map(i => i[0]).join(', ')).join(' | ');
  }
  const noteHtml = q => `<div class="note${S.weak[q.id] ? ' weak' : ''}"><div class="q">${esc(q.q)}</div><div class="a">${esc(answerText(q))}</div>${q.x ? `<div class="x">${esc(q.x)}</div>` : ''}</div>`;

  function startReview(world) {
    const inW = q => !world || world.stages.some(s => s.id === q.stage);
    const weak = Object.keys(S.weak).map(qById).filter(q => q && inW(q));
    let pool = shuffle(weak);
    if (pool.length < 6) {
      const seen = shuffle(Object.keys(S.seen).map(qById).filter(q => q && !S.weak[q.id] && inW(q)));
      pool = pool.concat(seen.slice(0, 8 - pool.length));
    }
    if (!pool.length) { toast(world ? 'Play a stage in ' + world.name + ' first' : 'Play a stage first, then come back for review'); return; }
    startBattle({ review: true, pool, d: null, world: world || null });
  }

  // ---------- field notes ----------
  function scrNotes(openId) {
    drawHud();
    const from = D.find(d => d.id === openId);
    view.innerHTML = `<div class="row"><button class="ghost" id="back">← ${from ? esc(from.name) : 'All worlds'}</button></div>
      <h2>Field Notes</h2><p class="muted small">Every question you've answered, with the answer and why. Red lines are ones you've missed recently.</p><div class="col" id="nl"></div>`;
    $('#back').onclick = () => go(from ? () => scrDistrict(from) : scrMap);
    const nl = $('#nl');
    D.forEach(d => {
      const seen = allQs(d).filter(q => S.seen[q.id]);
      const det = document.createElement('details'); det.className = 'card';
      if (openId === d.id) det.open = true;
      det.innerHTML = `<summary><span>${d.n}. ${esc(d.name)}</span><span class="muted small">${seen.length}/${allQs(d).length}</span></summary>
        <div class="col">${d.stages.map(s => {
          const sq = s.qs.filter(q => S.seen[q.id]);
          return `<div class="col"><h3>${esc(s.name)}</h3>${sq.length ? `<div class="notes">${sq.map(noteHtml).join('')}</div>` : '<p class="small muted">Play this stage to fill in these notes.</p>'}</div>`;
        }).join('')}</div>`;
      nl.appendChild(det);
    });
  }

  // ---------- shop ----------
  function scrShop() {
    drawHud();
    view.innerHTML = `<div class="row"><button class="ghost" id="back">← Map</button><span class="grow"></span><span class="pill coin">● ${S.coins}</span></div>
      <h2>Shop</h2><p class="muted small">Coins come from correct answers, combos and clearing stages.</p><div class="shop" id="sh"></div>`;
    $('#back').onclick = () => go(scrMap);
    SHOP.forEach(it => {
      const own = S.owned.includes(it.id), on = S.equip[it.type] === it.id;
      const c = document.createElement('div'); c.className = 'card item' + (on ? ' on' : '');
      const eq = Object.assign({}, S.equip); if (it.type !== 'pet') eq[it.type] = it.id;
      const art = it.type === 'pet' ? VAQ.spriteCanvas([{ name: it.spr, pal: { g: '#9aa3c7' } }], 6) : playerCanvas(4, eq);
      c.appendChild(art);
      c.insertAdjacentHTML('beforeend', `<b>${esc(it.name)}</b><button>${on ? (it.type === 'shirt' ? 'Wearing' : 'Take off') : own ? 'Wear' : `Buy ● ${it.price}`}</button>`);
      const b = c.querySelector('button');
      if (on && it.type === 'shirt') b.disabled = true;
      b.onclick = () => {
        if (!own) {
          if (S.coins < it.price) { toast(`Need ${it.price - S.coins} more coins`); return; }
          S.coins -= it.price; S.owned.push(it.id); S.equip[it.type] = it.id; sfx.win(); toast('Bought ' + it.name);
        } else S.equip[it.type] = on ? '' : it.id;
        save(); scrShop();
      };
      $('#sh').appendChild(c);
    });
  }

  // ---------- settings ----------
  function scrSettings() {
    drawHud();
    const acc = S.answered ? Math.round(100 * S.correct / S.answered) : 0;
    view.innerHTML = `<div class="row"><button class="ghost" id="back">← Map</button></div><h2>Settings</h2>
      <div class="card col">
        <div class="switch"><div><b>Sound</b><div class="small muted">Retro bleeps on answers</div></div><button id="s-sound">${S.set.sound ? 'On' : 'Off'}</button></div>
        <div class="switch"><div><b>Chill mode</b><div class="small muted">Wrong answers don't cost hearts. You can't lose.</div></div><button id="s-chill">${S.set.chill ? 'On' : 'Off'}</button></div>
        <div class="switch"><div><b>Free roam</b><div class="small muted">Open every stage and boss in every world now</div></div><button id="s-free">${S.set.free ? 'On' : 'Off'}</button></div>
      </div>
      <div class="card col"><h3>Updates</h3>
        <p class="small" id="u-line"></p>
        <button id="u-check">Check for updates</button></div>
      <div class="card col"><h3>Your stats</h3>
        <p class="small">${S.answered} answers · ${acc}% correct · best combo ${S.bestCombo} · ${countCleared()}/${totalStages()} stages · ${Object.keys(S.boss).length}/${D.length} bosses</p></div>
      <div class="card col"><h3>Back up or move your save</h3>
        <p class="small muted">Saves live in this browser. Copy the code to keep it safe or move it to another device.</p>
        <button id="b-copy">Copy save code</button>
        <textarea id="b-in" rows="3" placeholder="Paste a save code here"></textarea><button id="b-load">Restore from code</button></div>
      <div class="card col"><h3>Start over</h3><button id="b-reset">Reset all progress</button><div id="b-confirm"></div></div>`;
    const U = VAQ.update;
    const uLine = () => {
      const el = $('#u-line'); if (!el || !U) return;
      const st = U.state, t = st.lastCheck ? new Date(st.lastCheck).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';
      el.textContent = `You're on v${st.build}. ` + ({ checking: 'Checking…', available: `v${st.latest} is ready. Tap Update in the banner.`, current: 'This is the latest version.', offline: "Couldn't reach the update check." }[st.status] || '') +
        (t && st.status !== 'checking' ? ` Last checked ${t}.` : '') + ' The game also checks by itself every few minutes.';
    };
    if (U) { uLine(); U.onChange(uLine); $('#u-check').onclick = () => { sfx.tap(); U.check(); }; } else $('#u-check').hidden = true;
    $('#back').onclick = () => go(scrMap);
    const flip = k => () => { S.set[k] = !S.set[k]; save(); scrSettings(); };
    $('#s-sound').onclick = flip('sound'); $('#s-chill').onclick = flip('chill'); $('#s-free').onclick = flip('free');
    const code = () => 'VAQ1:' + btoa(unescape(encodeURIComponent(JSON.stringify(S))));
    $('#b-copy').onclick = () => {
      const c = code();
      navigator.clipboard.writeText(c).then(() => toast('Save code copied'), () => { $('#b-in').value = c; $('#b-in').select(); toast('Select and copy the code in the box'); });
    };
    $('#b-load').onclick = () => {
      try {
        const v = $('#b-in').value.trim(); if (!v.startsWith('VAQ1:')) throw 0;
        const j = JSON.parse(decodeURIComponent(escape(atob(v.slice(5)))));
        S = Object.assign(DEF(), j); save(); toast('Save restored'); go(scrMap);
      } catch (e) { toast("That code didn't work. Check you copied all of it."); }
    };
    $('#b-reset').onclick = () => {
      $('#b-confirm').innerHTML = `<p class="small">This wipes every star, coin and note. Sure?</p><div class="row"><button id="b-yes" class="bad">Yes, reset</button><button id="b-no">Cancel</button></div>`;
      $('#b-yes').onclick = () => { S = DEF(); save(); go(scrTitle); };
      $('#b-no').onclick = () => { $('#b-confirm').innerHTML = ''; };
    };
  }

  // ---------- boot ----------
  function start(data) {
    if (data && data.S) S = Object.assign(DEF(), data.S);
    scrTitle();
  }
  if (window.claude && window.claude.hot) window.claude.hot.snapshot(() => ({ S }));
  window.claude && window.claude.hot && window.claude.hot.ready ? window.claude.hot.ready(start) : start((window.claude && window.claude.hot && window.claude.hot.data) || {});
  VAQ.saveNow = save;
  window.VAQ_DEBUG = { get S() { return S; }, get B() { return B; }, D };
})();
