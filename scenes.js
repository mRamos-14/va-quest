// Pixel scenes for every world and area, drawn in code (no image files).
// VAQ.scene(canvas, theme, color, seed). Themes: quarter, tower, valley, forest, mine, harbor,
// lighthouse, heights, plaza, pier, cafe.
(function () {
  const V = window.VAQ;
  const NIGHT = '#15122d', DEEP = '#0d0b20', SIL = '#1d1840', WOOD = '#3b2a1f', PAPER = '#f5f2ff';
  const hex = c => { c = c.replace('#', '').slice(0, 6); return [0, 2, 4].map(i => parseInt(c.slice(i, i + 2), 16)); };
  const mix = (a, b, t) => { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
  const R = (g, x, y, w, h, c) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(h))); };
  function disc(g, cx, cy, r, c) { g.fillStyle = c; for (let y = -Math.round(r); y <= Math.round(r); y++) { const hw = Math.round(Math.sqrt(Math.max(0, r * r - y * y))); g.fillRect(Math.round(cx - hw), Math.round(cy + y), hw * 2 || 1, 1); } }
  function line(g, x0, y0, x1, y1, c) { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) | 0; g.fillStyle = c; for (let i = 0; i <= n; i++) g.fillRect(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), 1, 1); }
  function sky(g, w, h, c, rnd, o) {
    o = o || {};
    R(g, 0, 0, w, h, NIGHT);
    const grd = g.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, o.top || '#120f29'); grd.addColorStop(1, o.bot || mix(c, NIGHT, .55));
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
    for (let i = 0; i < (o.n == null ? 36 : o.n); i++) R(g, rnd() * w, rnd() * h * (o.sy || .55), 1, 1, rnd() > .7 ? '#ffd166' : '#ffffff99');
  }
  function ridge(g, w, h, y0, amp, f, ph, c) { g.fillStyle = c; for (let x = 0; x < w; x += 2) { const y = y0 + Math.sin(x * f + ph) * amp + Math.sin(x * f * 2.7 + ph * 1.3) * amp * .35; g.fillRect(x, Math.round(y), 2, h); } }
  function peak(g, cx, top, hw, bot, c, snow) { for (let y = top; y < bot; y++) { const k = (y - top) / Math.max(1, bot - top), half = Math.round(hw * k); R(g, cx - half, y, half * 2 + 1, 1, snow && k < .2 ? snow : c); } }
  function pine(g, x, by, ht, c) {
    const tier = Math.max(3, ht / 3);
    for (let i = 0; i < ht; i++) { const half = Math.round(((i % tier) / tier) * ht * .16 + (i / ht) * ht * .14); R(g, x - half, by - ht + i, half * 2 + 1, 1, c); }
    R(g, x, by, 1, 3, c);
  }
  function water(g, w, h, y0, c, rnd) {
    R(g, 0, y0, w, h - y0, mix(c, DEEP, .8));
    for (let i = 0; i < 28; i++) R(g, rnd() * w, y0 + 2 + rnd() * (h - y0 - 2), 3 + rnd() * 8, 1, mix(c, '#ffffff', .25) + '55');
  }
  function gear(g, cx, cy, r, c, hole) {
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; R(g, cx + Math.cos(a) * (r + 1) - 1.5, cy + Math.sin(a) * (r + 1) - 1.5, 3, 3, c); }
    disc(g, cx, cy, r, c); disc(g, cx, cy, Math.max(1, r * .4), hole);
  }
  function boat(g, x, y, s, c, light) {
    for (let k = 0; k < 4; k++) R(g, x + k, y + k, s * 1.1 - 2 * k, 1, '#2a2356');
    R(g, x + s * .5, y - s, 1, s, '#c9c2ef');
    for (let k = 0; k < s * .8; k++) R(g, x + s * .5 + 1, y - s + k, k * .55, 1, light ? PAPER : mix(c, '#ffffff', .3));
    R(g, x + s * .5, y - s - 2, 2, 2, c);
  }

  const T = {};
  // city of lit office towers (the original skyline)
  T.quarter = (g, w, h, c, rnd) => {
    sky(g, w, h, c, rnd, { bot: mix(c, NIGHT, .6), n: 40, sy: .6 });
    R(g, w * .72, h * .12, 12, 12, mix(c, NIGHT, .55));
    let x = 0;
    while (x < w) {
      const bw = 14 + Math.floor(rnd() * 26), bh = Math.floor(h * (.25 + rnd() * .45));
      R(g, x, h - bh, bw, bh, SIL);
      for (let yy = h - bh + 4; yy < h - 6; yy += 6) for (let xx = x + 3; xx < x + bw - 3; xx += 5) if (rnd() > .62) R(g, xx, yy, 2, 2, rnd() > .5 ? c : '#ffd16699');
      x += bw + 1;
    }
    R(g, 0, h - 6, w, 6, DEEP);
  };
  T.tower = (g, w, h, c, rnd) => {
    T.quarter(g, w, h, c, rnd);
    const tw = 22, tx = w * .5 - tw / 2, th = h * .86;
    R(g, tx, h - th, tw, th, '#2a2356'); R(g, tx - 2, h - th, tw + 4, 3, '#3a3170');
    for (let y = h - th + 6; y < h - 8; y += 6) for (let k = 0; k < 3; k++) if (rnd() > .3) R(g, tx + 4 + k * 6, y, 2, 3, rnd() > .5 ? c : '#ffd166');
    R(g, w * .5 - 1, h - th - 9, 2, 9, '#c9c2ef'); R(g, w * .5 - 2, h - th - 11, 4, 3, c);
  };
  // automation: hills, a humming factory, gears and a conveyor
  T.valley = (g, w, h, c, rnd) => {
    sky(g, w, h, c, rnd, { n: 22, sy: .4 });
    disc(g, w * .82, h * .2, Math.max(5, h * .09), mix(c, '#ffffff', .5) + 'aa');
    ridge(g, w, h, h * .55, h * .07, .035, rnd() * 6, mix(c, SIL, .72));
    const fx = w * (.14 + rnd() * .18), fw = w * .36, fy = h * .58, body = '#251e52';
    R(g, fx, fy, fw, h - fy, body);
    for (let x = 0; x + 12 <= fw; x += 12) for (let j = 0; j < 12; j++) { const t = Math.round(j / 11 * 7); R(g, fx + x + j, fy - t, 1, t + 1, body); }
    const ch = fx + fw * .72; R(g, ch, fy - h * .24, 5, h * .24, body);
    for (let i = 0; i < 3; i++) disc(g, ch + 3 + i * 4, fy - h * .24 - 4 - i * 5, 2 + i, '#ffffff22');
    for (let y = fy + 5; y < h - 12; y += 6) for (let x = fx + 4; x < fx + fw - 4; x += 7) if (rnd() > .35) R(g, x, y, 3, 2, rnd() > .4 ? c : '#ffd16699');
    gear(g, fx + fw + 14, fy + h * .06, Math.max(4, h * .07), mix(c, SIL, .35), mix(c, SIL, .72));
    gear(g, fx + fw + 25, fy + h * .16, Math.max(3, h * .045), mix(c, SIL, .5), mix(c, SIL, .72));
    ridge(g, w, h, h * .84, h * .03, .05, rnd() * 6, SIL);
    R(g, 0, h - 9, w, 3, '#2a2356');
    for (let x = (rnd() * 10) | 0; x < w; x += 22) R(g, x, h - 14, 7, 5, mix(c, '#ffb547', .45));
    R(g, 0, h - 6, w, 6, DEEP);
  };
  // n8n: a deep pine forest with fireflies
  T.forest = (g, w, h, c, rnd) => {
    sky(g, w, h, c, rnd, { n: 30, sy: .45 });
    disc(g, w * .2, h * .2, Math.max(4, h * .08), '#fff6d5cc');
    for (let x = -4; x < w + 8; x += 8 + rnd() * 6) pine(g, x | 0, h * .74, (h * (.3 + rnd() * .16)) | 0, mix(c, SIL, .72));
    for (let x = -6; x < w + 8; x += 11 + rnd() * 8) pine(g, x | 0, h - 5, (h * (.42 + rnd() * .2)) | 0, SIL);
    for (let i = 0; i < 16; i++) R(g, rnd() * w, h * .4 + rnd() * h * .5, 1, 1, i % 3 ? c : '#ffd166');
    R(g, 0, h - 5, w, 5, DEEP);
  };
  // Make / the forge: a glowing mine with rails, beams and crystals
  T.mine = (g, w, h, c, rnd) => {
    R(g, 0, 0, w, h, '#120f24');
    const grd = g.createRadialGradient(w * .5, h * .65, 4, w * .5, h * .65, w * .6);
    grd.addColorStop(0, mix(c, NIGHT, .55)); grd.addColorStop(1, '#120f24');
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 3) R(g, x, 0, 3, h * .07 + rnd() * h * .09 + (rnd() > .86 ? h * .12 : 0), '#1b1636');
    for (let x = w * .06; x < w - 20; x += w * .32) {
      const bw = w * .2, top = h * .26;
      R(g, x, top, 4, h - top, WOOD); R(g, x + bw, top, 4, h - top, WOOD); R(g, x, top, bw + 4, 4, '#4a3526');
      const lx = x + bw / 2 + 2; R(g, lx, top + 4, 1, 5, '#9aa3c7');
      disc(g, lx, top + 12, 9, c + '33'); R(g, lx - 2, top + 9, 5, 6, c); R(g, lx - 1, top + 10, 3, 3, '#fff6d5');
    }
    for (let i = 0; i < 7; i++) {
      const cx = rnd() * w, cy = h * .3 + rnd() * h * .45, s = 2 + (rnd() * 3 | 0);
      for (let k = 0; k <= s; k++) R(g, cx - k, cy - s + k, k * 2 + 1, 1, k < 2 ? mix(c, '#ffffff', .5) : c);
      for (let k = s - 1; k >= 0; k--) R(g, cx - k, cy + s - k, k * 2 + 1, 1, mix(c, SIL, .3));
    }
    R(g, 0, h - 11, w, 11, '#191433');
    for (let x = 0; x < w; x += 6) R(g, x, h - 10, 2, 6, WOOD);
    R(g, 0, h - 9, w, 1, '#9aa3c7'); R(g, 0, h - 5, w, 1, '#9aa3c7');
    const cx = w * (.55 + rnd() * .2);
    R(g, cx, h - 19, 20, 9, '#4a4470'); R(g, cx + 1, h - 18, 18, 1, '#5d578a');
    for (let k = 0; k < 4; k++) disc(g, cx + 4 + k * 4, h - 20, 2, k % 2 ? c : mix(c, '#ffffff', .4));
    disc(g, cx + 4, h - 9, 2, '#2a2356'); disc(g, cx + 16, h - 9, 2, '#2a2356');
  };
  // agents: a night harbour with boats, a crane and docks
  T.harbor = (g, w, h, c, rnd) => {
    sky(g, w, h, c, rnd, { sy: .45 });
    disc(g, w * .8, h * .18, Math.max(4, h * .08), '#f4efffcc');
    const sea = h * .64;
    for (let x = 0; x < w;) { const bw = 8 + rnd() * 14, bh = h * (.06 + rnd() * .12); R(g, x, sea - bh, bw, bh, mix(c, SIL, .75)); if (rnd() > .5) R(g, x + 3, sea - bh + 3, 2, 2, '#ffd16699'); x += bw + 1; }
    const cx = w * .84, ct = sea - h * .42;
    R(g, cx, ct, 3, sea - ct, '#2a2356'); R(g, cx - w * .14, ct, w * .2, 3, '#2a2356');
    R(g, cx - w * .12, ct + 3, 1, h * .14, '#9aa3c7'); R(g, cx - w * .12 - 3, ct + 3 + h * .14, 7, 5, c);
    water(g, w, h, sea, c, rnd);
    R(g, w * .82 - 1, sea + 2, 6, 1, mix(c, '#ffffff', .3) + '88');
    boat(g, w * .3 + rnd() * 10, sea + h * .1, Math.max(8, h * .2), c, false);
    boat(g, w * .58 + rnd() * 10, sea + h * .2, Math.max(7, h * .16), c, true);
    const dy = sea + h * .12;
    R(g, 0, dy, w * .22, 3, '#5a3d2b'); for (let x = 2; x < w * .22; x += 8) R(g, x, dy + 3, 2, h - dy, '#2a1f17');
    R(g, w * .05, dy - 5, 3, 5, '#2a2356'); R(g, w * .05, dy - 7, 3, 2, c);
    R(g, 0, h - 3, w, 3, DEEP);
  };
  // Claude: a lighthouse on a cliff at sunset, beam over the sea
  T.lighthouse = (g, w, h, c, rnd) => {
    sky(g, w, h, c, rnd, { top: '#1a1238', bot: mix(c, '#ffd166', .2), n: 18, sy: .3 });
    const sea = h * .7;
    disc(g, w * .64, sea, h * .16, mix(c, '#ffd166', .45));
    water(g, w, h, sea, c, rnd);
    for (let i = 0; i < 5; i++) R(g, w * .64 - h * .12 + i * 2, sea + 3 + i * 3, h * .24 - i * 4, 1, mix(c, '#ffd166', .5) + '88');
    g.fillStyle = SIL;
    for (let x = 0; x < w * .42; x += 2) { const top = sea - h * .22 + Math.max(0, x - w * .26) * 1.1 + Math.sin(x * .3) * 1.5; g.fillRect(x, Math.round(top), 2, h); }
    const lx = w * .12, base = sea - h * .22, th = h * .3;
    for (let i = 0; i < th; i++) { const half = Math.round(7 - 3 * (i / th)); R(g, lx - half, base - i, half * 2, 1, Math.floor(i / (th / 5)) % 2 ? PAPER : c); }
    const top = base - th;
    g.fillStyle = '#ffd16630'; g.beginPath(); g.moveTo(lx + 4, top - 3); g.lineTo(w, top - 3 - h * .16); g.lineTo(w, top - 3 + h * .14); g.closePath(); g.fill();
    R(g, lx - 5, top - 6, 10, 6, '#ffd166'); R(g, lx - 1, top - 5, 2, 4, '#fff6d5');
    for (let k = 0; k < 4; k++) R(g, lx - 5 + k, top - 7 - k, 10 - 2 * k, 1, '#2a2356');
    R(g, 0, h - 3, w, 3, DEEP);
  };
  // HighLevel: snowy peaks to climb, pines at the base, a summit flag
  T.heights = (g, w, h, c, rnd) => {
    sky(g, w, h, c, rnd, { n: 30, sy: .4 });
    const far = mix(c, SIL, .72), snow = mix(c, '#ffffff', .7);
    [[.2, .3, .3], [.55, .1, .38], [.88, .28, .28]].forEach(([px, py, hw]) => peak(g, (w * px) | 0, (h * py) | 0, (w * hw) | 0, h, far, snow));
    R(g, w * .55, h * .1 - 9, 1, 9, PAPER); R(g, w * .55 + 1, h * .1 - 9, 7, 4, c);
    ridge(g, w, h, h * .72, h * .04, .04, rnd() * 6, mix(c, SIL, .86));
    for (let x = -4; x < w + 6; x += 9 + rnd() * 10) pine(g, x | 0, h - 4, (h * (.16 + rnd() * .14)) | 0, SIL);
    R(g, 0, h - 4, w, 4, DEEP);
  };
  // Upwork: a market square with striped stalls and lamps
  T.plaza = (g, w, h, c, rnd) => {
    sky(g, w, h, c, rnd, { n: 20, sy: .3 });
    const gy = h * .76;
    for (let x = 0; x < w;) { const bw = 16 + rnd() * 20, bh = h * (.24 + rnd() * .2); R(g, x, gy - bh, bw, bh, SIL); for (let y = gy - bh + 4; y < gy - 4; y += 7) for (let xx = x + 3; xx < x + bw - 3; xx += 6) if (rnd() > .6) R(g, xx, y, 2, 2, '#ffd16677'); x += bw + 2; }
    R(g, 0, gy, w, h - gy, '#211b45');
    for (let i = 0; i < 70; i++) R(g, rnd() * w, gy + 1 + rnd() * (h - gy), 3, 1, '#2c2560');
    const goods = ['#ffd166', '#ef476f', c, '#3ddc97', '#ff9f1c'];
    for (let i = 0; i < 3; i++) {
      const sx = w * (.05 + i * .33), sw = w * .23, top = h * .4, ah = h * .09;
      for (let k = 0; k < sw; k += 4) { const col = (k / 4) % 2 ? PAPER : c; R(g, sx + k, top, 4, ah, col); R(g, sx + k + 1, top + ah, 2, 2, col); }
      R(g, sx + 1, top + ah, 2, gy - top - ah, WOOD); R(g, sx + sw - 3, top + ah, 2, gy - top - ah, WOOD);
      R(g, sx, h * .64, sw, h * .1, '#4a3526');
      for (let k = 0; k < 5; k++) disc(g, sx + 4 + k * (sw - 8) / 4, h * .64 - 1, 1.6, goods[(k + i) % 5]);
    }
    for (const lx of [w * .31, w * .64]) { R(g, lx, h * .36, 1, gy - h * .36, '#2a2356'); disc(g, lx, h * .35, 6, '#ffd16622'); R(g, lx - 1, h * .33, 3, 3, '#ffd166'); }
  };
  // portfolio: a sunset pier with framed work and a ferris wheel
  T.pier = (g, w, h, c, rnd) => {
    sky(g, w, h, c, rnd, { top: '#1f1240', bot: mix(c, '#ffb547', .25), n: 14, sy: .3 });
    const sea = h * .62;
    disc(g, w * .3, sea, h * .14, mix(c, '#ffd166', .5));
    const fx = w * .78, fy = sea - h * .27, fr = Math.max(8, h * .21), rim = mix(c, '#ffffff', .35);
    line(g, fx, fy, fx - fr * .6, sea, '#2a2356'); line(g, fx, fy, fx + fr * .6, sea, '#2a2356');
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; line(g, fx, fy, fx + Math.cos(a) * fr, fy + Math.sin(a) * fr, '#3a3170'); }
    for (let a = 0; a < Math.PI * 2; a += .04) R(g, fx + Math.cos(a) * fr, fy + Math.sin(a) * fr, 1, 1, rim);
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + .39; R(g, fx + Math.cos(a) * fr - 1, fy + Math.sin(a) * fr, 3, 3, k % 2 ? c : '#ffd166'); }
    water(g, w, h, sea, c, rnd);
    const py = h * .8;
    R(g, 0, py, w, 3, '#5a3d2b'); R(g, 0, py + 3, w, 1, WOOD);
    for (let x = 3; x < w; x += 10) R(g, x, py + 4, 2, h - py, '#2a1f17');
    const fs = Math.max(10, h * .17), cols = [c, '#4cc9f0', '#ffd166'];
    for (let i = 0; i < 3; i++) {
      const ex = w * (.06 + i * .17), ey = py - fs * 1.25;
      R(g, ex + 2, ey + fs * .75, 1, fs * .5, WOOD); R(g, ex + fs - 3, ey + fs * .75, 1, fs * .5, WOOD);
      R(g, ex, ey, fs, fs * .75, PAPER); R(g, ex + 1, ey + 1, fs - 2, fs * .75 - 2, cols[i]);
      R(g, ex + 3, ey + fs * .4, fs * .4, 1, '#ffffffaa');
    }
  };
  // Zoom calls: a warm café front with steaming cups
  T.cafe = (g, w, h, c, rnd) => {
    sky(g, w, h, c, rnd, { n: 12, sy: .14 });
    const top = h * .14;
    R(g, 0, top, w, h - top, '#2a1d3d');
    for (let i = 0; i < 60; i++) R(g, rnd() * w, top + rnd() * (h - top), 4, 1, '#33244a');
    const ay = top + h * .06, ah = h * .1;
    for (let x = 0; x < w; x += 6) { const col = (x / 6) % 2 ? PAPER : c; R(g, x, ay, 6, ah, col); R(g, x + 1, ay + ah, 4, 2, col); }
    const wy = ay + ah + h * .07, wh = h * .38;
    for (let i = 0; i < 3; i++) {
      const wx = w * (.05 + i * .33), ww = w * .24;
      R(g, wx - 2, wy - 2, ww + 4, wh + 4, WOOD);
      const gr = g.createLinearGradient(0, wy, 0, wy + wh); gr.addColorStop(0, '#ffd166aa'); gr.addColorStop(1, mix(c, '#ff9f1c', .5) + 'dd');
      g.fillStyle = gr; g.fillRect(Math.round(wx), Math.round(wy), Math.round(ww), Math.round(wh));
      R(g, wx + ww / 2, wy, 1, wh, WOOD);
      const hx = wx + ww * (.25 + rnd() * .5);
      disc(g, hx, wy + wh * .5, wh * .14, '#2a1d3daa'); R(g, hx - wh * .2, wy + wh * .66, wh * .4, wh * .34, '#2a1d3daa');
    }
    R(g, 0, h * .85, w, h * .15, '#1a1430');
    for (let i = 0; i < 3; i++) {
      const tx = w * (.21 + i * .31), ty = h * .82;
      R(g, tx - 7, ty, 14, 2, '#c9c2ef'); R(g, tx, ty, 1, h - ty, '#c9c2ef');
      R(g, tx - 3, ty - 3, 4, 3, PAPER); R(g, tx + 1, ty - 2, 1, 1, PAPER);
      R(g, tx - 2, ty - 6, 1, 2, '#ffffff66'); R(g, tx - 1, ty - 9, 1, 2, '#ffffff44');
    }
  };

  const MIRROR = { lighthouse: true };
  V.SCENES = Object.keys(T);
  V.scene = function (cv, theme, color, seed) {
    const w = cv.width = 240;
    const h = cv.height = Math.max(40, Math.round(240 * cv.clientHeight / Math.max(1, cv.clientWidth)) || 120);
    const g = cv.getContext('2d');
    let r = Math.abs(seed || 7) % 233280;
    const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    if (MIRROR[theme]) g.setTransform(-1, 0, 0, 1, w, 0); // keep the landmark on the right, clear of the text
    (T[theme] || T.quarter)(g, w, h, color || '#9b5de5', rnd);
    g.setTransform(1, 0, 0, 1, 0, 0);
  };
})();
