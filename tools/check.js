// Validates every question bank: node tools/check.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'core.js'), 'utf8'), ctx);
ctx.VAQ = ctx.window.VAQ;
for (let i = 1; i <= 8; i++) {
  const f = path.join(root, 'data', `c${i}.js`);
  if (fs.existsSync(f)) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx); else console.log('missing', f);
}
for (const x of ['c1x', 'c2x', 'c3x', 'c4x', 'c8x']) {
  const f = path.join(root, 'data', x + '.js');
  if (fs.existsSync(f)) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx); else console.log('missing', f);
}
ctx.VAQ.finalize();
vm.runInContext(fs.readFileSync(path.join(root, 'data', 'worlds.js'), 'utf8'), ctx);
for (const d of ctx.VAQ.D) {
  const w = ctx.VAQ.WORLDS[d.id];
  if (!w) { console.log('no world entry for', d.id); continue; }
  const listed = w.areas.flatMap(a => a.ids), real = d.stages.map(s => s.id);
  listed.filter(id => !real.includes(id)).forEach(id => console.log('area lists unknown stage', id));
  real.filter(id => !listed.includes(id)).forEach(id => console.log('stage not in any area (goes to More):', id));
  if (new Set(listed).size !== listed.length) console.log('stage listed twice in', d.id);
  if (listed.join() !== real.filter(id => listed.includes(id)).join()) console.log('area order differs from stage order in', d.id);
}
let errs = 0, total = 0;
const bad = (q, m) => { errs++; console.log(`  ${q.id}: ${m}  [${(q.q || '').slice(0, 50)}]`); };
const ids = new Set();
for (const d of ctx.VAQ.D) {
  let n = 0;
  for (const s of d.stages) {
    if (!s.qs.length) console.log('empty stage', s.id);
    if (!['bug', 'slime', 'ghost', 'robot'].includes(s.enemy)) console.log('bad enemy', s.id);
    for (const q of s.qs) {
      n++; total++;
      if (ids.has(q.id)) bad(q, 'dup id'); ids.add(q.id);
      if (!q.q) bad(q, 'no prompt');
      if (!q.x) bad(q, 'no explanation');
      if (q.t === 'mc') {
        if (!q.a || !Array.isArray(q.w) || q.w.length < 2) bad(q, 'mc needs a + 2+ wrong');
        else if (new Set([q.a, ...q.w]).size !== q.w.length + 1) bad(q, 'duplicate options');
      } else if (q.t === 'tf') { if (typeof q.a !== 'boolean') bad(q, 'tf needs boolean'); }
      else if (q.t === 'match') {
        if (!q.p || q.p.length < 2) bad(q, 'match needs 2+ pairs');
        else if (new Set(q.p.map(p => p[0])).size !== q.p.length || new Set(q.p.map(p => p[1])).size !== q.p.length) bad(q, 'duplicate match sides');
      } else if (q.t === 'ord') { if (!q.s || q.s.length < 3 || new Set(q.s).size !== q.s.length) bad(q, 'ord needs 3+ unique steps'); }
      else if (q.t === 'sort') {
        if (!q.b || q.b.length !== 2 || !q.i || q.i.length < 3) bad(q, 'sort needs 2 bins + 3 items');
        else { if (q.i.some(i => i[1] !== 0 && i[1] !== 1)) bad(q, 'sort bin index'); if (!q.i.some(i => i[1] === 0) || !q.i.some(i => i[1] === 1)) bad(q, 'sort uses one bin only'); }
      } else bad(q, 'unknown type ' + q.t);
    }
  }
  console.log(`${d.id} ${d.name}: ${d.stages.length} stages, ${n} questions`);
}
console.log(`TOTAL ${total} questions, ${errs} problems`);
process.exit(errs ? 1 : 0);
