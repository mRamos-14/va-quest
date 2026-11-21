"""Builds the playable site into _site/ for GitHub Pages (or any static host).

index.html is written without <!doctype>/<head>, so this wraps it the same way serve.py
does, copies the game files and adds what makes it an installable phone app: a manifest,
icons and an offline service worker.
    python tools/build_site.py
"""
import json
import os
import shutil
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
sys.path.insert(0, ROOT)
from serve import HEAD  # noqa: E402

OUT = os.path.join(ROOT, '_site')
APP_HEAD = (
    '<link rel="manifest" href="manifest.webmanifest">'
    '<meta name="theme-color" content="#15122d">'
    '<link rel="icon" type="image/png" href="icons/icon-192.png">'
    '<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">'
    '<meta name="apple-mobile-web-app-capable" content="yes">'
    '<meta name="apple-mobile-web-app-title" content="VA Quest">'
)
MANIFEST = {
    'id': './',
    'name': 'VA Quest',
    'short_name': 'VA Quest',
    'description': 'Pixel battles for learning AI automation, agents, Claude and HighLevel.',
    'start_url': './',
    'scope': './',
    'display': 'standalone',
    'orientation': 'portrait',
    'background_color': '#15122d',
    'theme_color': '#15122d',
    'icons': [
        {'src': 'icons/icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
        {'src': 'icons/icon-512.png', 'sizes': '512x512', 'type': 'image/png'},
        {'src': 'icons/icon-maskable-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'},
    ],
}
# Network first: whenever you're online you get the newest files (so Update always
# lands), and every file is kept so the game also plays offline.
SW = r"""const CACHE = 'vaquest-' + %(build)s;
const CORE = %(core)s;
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('vaquest-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.pathname.endsWith('/version.json')) return; // always straight from the network
  const font = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !font) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    try {
      const res = await fetch(req, { cache: 'no-cache' });
      if (res.ok || res.type === 'opaque') c.put(req, res.clone());
      return res;
    } catch (err) {
      return (await c.match(req, { ignoreSearch: true })) || (await c.match('./')) || Response.error();
    }
  }));
});
"""
REGISTER = ('<script>if ("serviceWorker" in navigator && location.protocol === "https:")'
            ' navigator.serviceWorker.register("sw.js").catch(() => {});</script>')


def files():
    out = ['core.js', 'scenes.js', 'game.js', 'update.js']
    out += sorted('data/' + n for n in os.listdir(os.path.join(ROOT, 'data')) if n.endswith('.js'))
    return out


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, 'data'))
    build = json.load(open(os.path.join(ROOT, 'version.json'), encoding='utf-8'))['v']
    page = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    with open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(HEAD.replace('</head>', APP_HEAD + '</head>') + page + REGISTER + '</body></html>')
    for name in files():
        shutil.copy2(os.path.join(ROOT, name), os.path.join(OUT, name))
    shutil.copy2(os.path.join(ROOT, 'version.json'), OUT)
    shutil.copytree(os.path.join(ROOT, 'icons'), os.path.join(OUT, 'icons'))
    with open(os.path.join(OUT, 'manifest.webmanifest'), 'w', encoding='utf-8') as f:
        json.dump(MANIFEST, f, indent=2)
    core = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png'] + files()
    with open(os.path.join(OUT, 'sw.js'), 'w', encoding='utf-8') as f:
        f.write(SW % {'build': json.dumps(str(build)), 'core': json.dumps(core)})
    open(os.path.join(OUT, '.nojekyll'), 'w').close()
    print('built', OUT, 'build', build)


if __name__ == '__main__':
    main()
