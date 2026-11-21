"""Makes the generated Android project look and behave exactly like the Chrome install of the
web app (run in CI after `cap add android`):
  - launcher icon: an adaptive icon built from icons/icon-maskable-512.png, the same art and
    shape Chrome uses, instead of an old-style picture the launcher shrinks into a white frame
  - launch screen: the manifest's background colour with the icon in the middle
  - status and navigation bars: the manifest's theme colour, with light icons
  - portrait only, like the manifest's "orientation"
    python tools/android_icons.py android-app/android
"""
import os
import re
import shutil
import sys
from PIL import Image, ImageDraw

THEME = '#15122d'      # manifest theme_color / background_color
ICON_BG = '#15122d'    # edge colour of icons/icon-maskable-512.png

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
main = os.path.join(sys.argv[1], 'app', 'src', 'main')
res = os.path.join(main, 'res')
square = Image.open(os.path.join(ROOT, 'icons', 'icon-maskable-512.png')).convert('RGBA')
rounded = Image.open(os.path.join(ROOT, 'icons', 'icon-512.png')).convert('RGBA')
hexrgb = lambda h: tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))
done = []

# 1. launcher icons. Legacy PNGs for old Android; an adaptive icon for Android 8+.
SIZES = {'mdpi': 48, 'hdpi': 72, 'xhdpi': 96, 'xxhdpi': 144, 'xxxhdpi': 192}
for dpi, s in SIZES.items():
    d = os.path.join(res, 'mipmap-' + dpi)
    os.makedirs(d, exist_ok=True)
    rounded.resize((s, s), Image.LANCZOS).save(os.path.join(d, 'ic_launcher.png'))
    circ = square.resize((s, s), Image.LANCZOS)
    mask = Image.new('L', (s, s), 0); ImageDraw.Draw(mask).ellipse([0, 0, s - 1, s - 1], fill=255)
    out = Image.new('RGBA', (s, s), (0, 0, 0, 0)); out.paste(circ, (0, 0), mask)
    out.save(os.path.join(d, 'ic_launcher_round.png'))
    # adaptive foreground: a 108dp canvas whose middle 72dp is what launchers show; a maskable
    # icon is drawn for exactly that visible area, so it goes there, on its own edge colour
    fg = int(s * 108 / 48)
    vis = int(s * 72 / 48)
    canvas = Image.new('RGBA', (fg, fg), hexrgb(ICON_BG) + (255,))
    art = square.resize((vis, vis), Image.LANCZOS)
    canvas.paste(art, ((fg - vis) // 2, (fg - vis) // 2), art)
    canvas.save(os.path.join(d, 'ic_launcher_foreground.png'))
anydpi = os.path.join(res, 'mipmap-anydpi-v26')
shutil.rmtree(anydpi, ignore_errors=True)
os.makedirs(anydpi)
ADAPTIVE = ('<?xml version="1.0" encoding="utf-8"?>\n'
            '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n'
            '    <background android:drawable="@color/app_icon_bg"/>\n'
            '    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>\n'
            '</adaptive-icon>\n')
for name in ('ic_launcher.xml', 'ic_launcher_round.xml'):
    open(os.path.join(anydpi, name), 'w', encoding='utf-8').write(ADAPTIVE)
os.makedirs(os.path.join(res, 'values'), exist_ok=True)
open(os.path.join(res, 'values', 'app_match_chrome.xml'), 'w', encoding='utf-8').write(
    '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n'
    f'    <color name="app_icon_bg">{ICON_BG}</color>\n'
    f'    <color name="app_theme">{THEME}</color>\n</resources>\n')
done.append('adaptive icon')

# 2. launch screen: the game's background with the icon in the middle
splashes = 0
for root, _, files in os.walk(res):
    for f in files:
        if f == 'splash.png':
            p = os.path.join(root, f)
            w, h = Image.open(p).size
            s = int(min(w, h) * 0.32)
            out = Image.new('RGBA', (w, h), hexrgb(THEME) + (255,))
            icon = rounded.resize((s, s), Image.LANCZOS)
            out.paste(icon, ((w - s) // 2, (h - s) // 2), icon)
            out.convert('RGB').save(p)
            splashes += 1
done.append(f'{splashes} launch screens')

# 3. bar colours, set on every theme the app uses (launch theme and the game's theme)
styles = os.path.join(res, 'values', 'styles.xml')
WANT = {
    'android:statusBarColor': '@color/app_theme',
    'android:navigationBarColor': '@color/app_theme',
    'colorPrimaryDark': '@color/app_theme',
}
LAUNCH_ONLY = {'windowSplashScreenBackground': '@color/app_theme'}
if os.path.exists(styles):
    xml = open(styles, encoding='utf-8').read()

    def fix_style(xml, name, items):
        m = re.search(r'<style name="' + re.escape(name) + r'"[^>]*>(.*?)</style>', xml, re.S)
        if not m:
            print('warning: no style', name)
            return xml
        body = m.group(1)
        for k, v in items.items():
            item = re.compile(r'<item name="' + re.escape(k) + r'"[^>]*>[^<]*</item>')
            if item.search(body):
                body = item.sub(f'<item name="{k}">{v}</item>', body)
            else:
                body = body.rstrip() + f'\n        <item name="{k}">{v}</item>\n    '
        return xml[:m.start(1)] + body + xml[m.end(1):]

    xml = fix_style(xml, 'AppTheme.NoActionBar', WANT)
    xml = fix_style(xml, 'AppTheme.NoActionBarLaunch', {**WANT, **LAUNCH_ONLY})
    open(styles, 'w', encoding='utf-8').write(xml)
    done.append('bar colours')
else:
    print('warning: no styles.xml')

# 4. portrait only, like the web manifest
manifest = os.path.join(main, 'AndroidManifest.xml')
mx = open(manifest, encoding='utf-8').read()
m = re.search(r'<activity\b[^>]*MainActivity[^>]*>', mx, re.S)
if m and 'screenOrientation' not in m.group(0):
    tag = m.group(0)
    mx = mx.replace(tag, tag[:-1].rstrip() + '\n            android:screenOrientation="portrait">', 1)
    open(manifest, 'w', encoding='utf-8').write(mx)
    done.append('portrait')
elif not m:
    print('warning: MainActivity not found in AndroidManifest.xml')

print('matched the Chrome install:', ', '.join(done))
