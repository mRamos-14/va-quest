// Test helper: in the browser console, load this file then `await autoAnswer(true)` answers the
// current question correctly through real clicks (false = deliberately wrong). `await autoBattle()`
// plays until the battle ends.
(function () {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const btns = sel => [...document.querySelectorAll(sel)];
  const byText = (sel, t) => btns(sel).find(b => b.textContent.replace(/^\d+/, '').trim() === t || b.textContent.trim() === t);
  window.autoAnswer = async function (right) {
    const q = VAQ_DEBUG.B.cur;
    if (q.t === 'mc') {
      const t = right ? q.a : q.w[0];
      byText('#ans .opts button', t).click();
    } else if (q.t === 'tf') {
      const v = right ? q.a : !q.a;
      document.querySelector(`#ans button[data-v="${v ? 1 : 0}"]`).click();
    } else if (q.t === 'match') {
      for (let i = 0; i < q.p.length; i++) {
        const l = byText('#ml button', q.p[i][0]);
        l.click(); await sleep(20);
        if (!right && i < 2) { const wrongR = btns('#mr button').find(b => !b.disabled && b.textContent.trim() !== q.p[i][1]); if (wrongR) { wrongR.click(); await sleep(20); l.click(); } }
        byText('#mr button', q.p[i][1]).click(); await sleep(20);
      }
    } else if (q.t === 'ord') {
      const order = right ? q.s : q.s.slice().reverse();
      for (const s of order) { byText('#pool button', s).click(); await sleep(20); }
      document.querySelector('#chk').click();
    } else if (q.t === 'sort') {
      for (let k = 0; k < q.i.length; k++) {
        const cur = document.querySelector('#cur').textContent;
        const it = q.i.find(i => i[0] === cur);
        const bin = right || k > 1 ? it[1] : 1 - it[1];
        document.querySelector(`.bins button[data-b="${bin}"]`).click(); await sleep(20);
      }
    }
    await sleep(50);
    return { type: q.t, fb: document.querySelector('.fb .h') && document.querySelector('.fb .h').textContent };
  };
  window.autoBattle = async function (wrongEvery) {
    const log = [];
    for (let n = 0; n < 60; n++) {
      if (!document.querySelector('#ans')) break;
      const r = await autoAnswer(!(wrongEvery && n % wrongEvery === wrongEvery - 1));
      log.push(r.type + ':' + r.fb);
      const nx = document.querySelector('#nx'); if (!nx) { log.push('NO NEXT'); break; }
      nx.click(); await sleep(60);
    }
    return log;
  };
})();
