// VA Quest core: data registry + pixel sprites (drawn from text grids, no image files)
window.VAQ = {
  D: [],
  district(d) {
    this.D.push(d);
    this.D.sort((a, b) => a.n - b.n);
  },
  stage(id) { for (const d of this.D) for (const s of d.stages) if (s.id === id) return s; },
  // add questions / a quick-lesson card to an existing stage (extension files load after the base files)
  extend(stageId, more) {
    const s = this.stage(stageId);
    if (!s) throw new Error('No stage ' + stageId);
    if (more.qs) s.qs.push(...more.qs);
    if (more.learn) s.learn = (s.learn || []).concat(more.learn);
    if (more.lessons) s.lessons.push(...more.lessons);
  },
  // insert a whole new stage into a district, right after stage `after` (or at the end)
  addStage(districtId, after, stage) {
    const d = this.D.find(x => x.id === districtId);
    const i = after ? d.stages.findIndex(s => s.id === after) : d.stages.length - 1;
    d.stages.splice(i + 1, 0, stage);
  },
  // give every question a stable id: <stageId>-<index>. Run once after all data files load.
  finalize() {
    this.D.forEach(d => d.stages.forEach(s => s.qs.forEach((q, i) => { q.id = s.id + '-' + i; q.stage = s.id; })));
  }
};

// Each grid row is the same width. Letters map to palette colours; '.' is transparent.
VAQ.SPR = {
  player: [
    '...kkkkkk...',
    '..khhhhhhk..',
    '.khhhhhhhhk.',
    'mkhsssssshkm',
    'mksesssseskm',
    'mkssskksssk.',
    'ww.kssssk...',
    '..kccccccck.',
    '.kccccccccck',
    '.ksccccccsk.',
    '..kpppppppk.',
    '..kppk.kppk.',
    '..kbbk.kbbk.',
    '..kkkk.kkkk.'
  ],
  bug: [
    '..k......k..',
    '...k....k...',
    '..kkkkkkkk..',
    '.kggggggggk.',
    '.kgweggwegk.',
    '.kggggggggk.',
    'kkgddddddgkk',
    '.kgddddddgk.',
    'k.kggggggk.k',
    '..k.k..k.k..'
  ],
  slime: [
    '....kkkk....',
    '..kkggggkk..',
    '.kggllgggggk',
    '.kglgggggggk',
    'kggwegggwegk',
    'kggggggggggk',
    'kgggggkkgggk',
    'kggggggggggk',
    '.kkkkkkkkkk.'
  ],
  ghost: [
    '...kkkkkk...',
    '..kggggggk..',
    '.kggggggggk.',
    '.kgeeggeegk.',
    '.kggggggggk.',
    '.kgggkkgggk.',
    '.kggggggggk.',
    '.kggggggggk.',
    '.kgk.kgk.kgk',
    '..k...k...k.'
  ],
  robot: [
    '.....rr.....',
    '.....kk.....',
    '..kkkkkkkk..',
    '..kggggggk..',
    '..kgeggegk..',
    '..kggggggk..',
    '..kgkkkkgk..',
    '...kkkkkk...',
    '.kkggggggkk.',
    'kgkgrrrrgkgk',
    '.k.kggggk.k.',
    '...kk..kk...'
  ],
  golem: [
    '...kkkkkk...',
    '..kggggggk..',
    '.kggeggeggk.',
    '.kggggggggk.',
    '.kgkkkkkkgk.',
    'kkkggggggkkk',
    'kggkggggkggk',
    'kggkggggkggk',
    'kkkkggggkkkk',
    '...kggggk...',
    '..kggkkggk..',
    '..kkkk.kkkk.'
  ],
  crown: [
    'y.y.y.y',
    'yyyyyyy',
    'yrryrry'
  ],
  // cosmetics drawn on top of the player (offset in pixels)
  cap: ['..cccccc....', '.cccccccccc.'],
  tophat: ['...tttttt...', '...tcccccc..', '...tttttt...', '.tttttttttt.'],
  halo: ['..yyyyyyyy..', '.y........y.'],
  bot: ['.kkkk.', 'kgeegk', 'kggggk', '.k..k.'],
  cat: ['k...k.', 'kgggk.', 'gegeg.', '.ggg..', '.g.g..']
};

VAQ.PAL = {
  k: '#1b1730', w: '#f7f3ff', e: '#1b1730', h: '#3b2418', s: '#e8b48a',
  m: '#2ec4b6', c: '#ff9f1c', p: '#2b3a67', b: '#14121f', l: '#ffffffaa',
  d: '#00000040', r: '#ff4d6d', y: '#ffd166', t: '#7d6fc9'
};

// Draw a sprite grid onto a canvas context. pal overrides colours; flip mirrors horizontally.
VAQ.drawSprite = function (ctx, name, x, y, scale, pal, flip) {
  const g = typeof name === 'string' ? VAQ.SPR[name] : name;
  if (!g) return;
  const P = Object.assign({}, VAQ.PAL, pal || {});
  const w = g[0].length;
  for (let r = 0; r < g.length; r++) {
    for (let c = 0; c < w; c++) {
      const ch = g[r][c];
      if (ch === '.' || !P[ch]) continue;
      ctx.fillStyle = P[ch];
      const cx = flip ? (w - 1 - c) : c;
      ctx.fillRect(x + cx * scale, y + r * scale, scale, scale);
    }
  }
};

// Make a <canvas> holding one sprite (crisp pixels, sized for CSS)
VAQ.spriteCanvas = function (layers, scale, pad) {
  pad = pad || 0;
  let W = 0, H = 0;
  layers.forEach(l => {
    const g = VAQ.SPR[l.name];
    W = Math.max(W, (l.dx || 0) + g[0].length);
    H = Math.max(H, (l.dy || 0) + g.length);
  });
  const cv = document.createElement('canvas');
  cv.width = (W + pad * 2) * scale; cv.height = (H + pad * 2) * scale;
  const ctx = cv.getContext('2d');
  layers.forEach(l => VAQ.drawSprite(ctx, l.name, ((l.dx || 0) + pad) * scale, ((l.dy || 0) + pad) * scale, scale, l.pal, l.flip));
  cv.className = 'px';
  return cv;
};
