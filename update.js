// Update checks: compares this build with version.json (published next to the page).
// Checks shortly after opening, every 5 minutes, when the tab comes back into view and when
// the connection returns. A newer build shows a banner with an Update button.
// Bump both numbers with: python tools/bump_version.py "what changed"
(function () {
  const BUILD = 7;
  const APP_LINK = 'https://mramos-14.github.io/va-quest/';
  const EVERY = 5 * 60 * 1000;
  const ss = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { } }
  };
  const U = { build: BUILD, latest: null, notes: '', lastCheck: 0, status: 'idle' };
  let busy = false;

  async function check(manual) {
    if (busy) return U;
    busy = true; U.status = 'checking'; emit();
    try {
      const r = await fetch('version.json?ts=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      U.latest = Number(j.v) || BUILD; U.notes = String(j.notes || '');
      U.lastCheck = Date.now(); U.status = U.latest > BUILD ? 'available' : 'current';
      if (U.status === 'available') showBanner(manual);
      else if (manual) toastMsg("You're on the latest version (v" + BUILD + ').');
    } catch (e) {
      U.status = 'offline';
      if (manual) toastMsg("Couldn't check right now. Are you online?");
    }
    busy = false; emit();
    return U;
  }

  function showBanner(manual) {
    const tried = Number(ss.get('vaq-upd-tried')) === U.latest;
    if (!manual && !tried && Number(ss.get('vaq-upd-later')) === U.latest) return; // "Later" for this version, this session
    let b = document.getElementById('updbar');
    if (!b) { b = document.createElement('div'); b.id = 'updbar'; b.className = 'updbar'; b.setAttribute('role', 'status'); document.body.appendChild(b); }
    b.innerHTML = tried
      ? `<div class="grow"><b class="disp">Almost there</b><div class="small">This window is still on v${BUILD}. Close the game and open its link again to get v${U.latest}.</div></div>
         <div class="col" style="gap:6px"><a class="btnlink" href="${APP_LINK}" target="_blank" rel="noopener">Open latest</a><button id="upd-x" class="ghost">Close</button></div>`
      : `<div class="grow"><b class="disp">✨ Update ready: v${U.latest}</b><div class="small">${esc(U.notes) || 'A newer version of VA Quest is out.'} Your progress is kept.</div></div>
         <div class="col" style="gap:6px"><button id="upd-go" class="primary">Update</button><button id="upd-x" class="ghost">Later</button></div>`;
    b.hidden = false;
    const go = b.querySelector('#upd-go');
    if (go) go.onclick = apply;
    b.querySelector('#upd-x').onclick = () => { ss.set('vaq-upd-later', String(U.latest)); b.hidden = true; };
  }

  function apply() {
    try { if (window.VAQ && VAQ.saveNow) VAQ.saveNow(); } catch (e) { }
    ss.set('vaq-upd-tried', String(U.latest));
    const b = document.getElementById('updbar');
    if (b) b.innerHTML = '<div class="grow"><b class="disp">Updating…</b></div>';
    location.reload();
  }

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function toastMsg(m) { const t = document.getElementById('toast'); if (!t) return; t.textContent = m; t.className = 'toast'; t.hidden = false; clearTimeout(toastMsg.t); toastMsg.t = setTimeout(() => { t.hidden = true; }, 2600); }
  const subs = [];
  function emit() { subs.forEach(f => { try { f(U); } catch (e) { } }); }

  // after a successful update, say so once
  const tried = Number(ss.get('vaq-upd-tried'));
  if (tried && tried <= BUILD) { ss.set('vaq-upd-tried', ''); setTimeout(() => toastMsg('Updated to v' + BUILD + '. Progress kept.'), 600); }

  setTimeout(() => check(false), 3000);
  setInterval(() => { if (!document.hidden) check(false); }, EVERY);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && Date.now() - U.lastCheck > 60000) check(false); });
  window.addEventListener('online', () => check(false));

  window.VAQ.update = { state: U, check: () => check(true), apply, onChange: f => subs.push(f), link: APP_LINK };
})();
