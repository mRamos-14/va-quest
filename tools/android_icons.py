"""Puts the VA Quest icon and launch screen into the generated Android project (run in CI after `cap add android`).
    python tools/android_icons.py android-app/android
"""
import os
import shutil
import sys
from PIL import Image, ImageDraw

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
res = os.path.join(sys.argv[1], 'app', 'src', 'main', 'res')
square = Image.open(os.path.join(ROOT, 'icons', 'icon-maskable-512.png')).convert('RGBA')
rounded = Image.open(os.path.join(ROOT, 'icons', 'icon-512.png')).convert('RGBA')
SIZES = {'mdpi': 48, 'hdpi': 72, 'xhdpi': 96, 'xxhdpi': 144, 'xxxhdpi': 192}
# use plain PNG launcher icons (drop the adaptive XML that points at Capacitor's default art)
shutil.rmtree(os.path.join(res, 'mipmap-anydpi-v26'), ignore_errors=True)
for dpi, s in SIZES.items():
    d = os.path.join(res, 'mipmap-' + dpi)
    os.makedirs(d, exist_ok=True)
    rounded.resize((s, s), Image.LANCZOS).save(os.path.join(d, 'ic_launcher.png'))
    circ = square.resize((s, s), Image.LANCZOS)
    mask = Image.new('L', (s, s), 0); ImageDraw.Draw(mask).ellipse([0, 0, s - 1, s - 1], fill=255)
    out = Image.new('RGBA', (s, s), (0, 0, 0, 0)); out.paste(circ, (0, 0), mask)
    out.save(os.path.join(d, 'ic_launcher_round.png'))
    fg = int(s * 108 / 48)
    square.resize((fg, fg), Image.LANCZOS).save(os.path.join(d, 'ic_launcher_foreground.png'))
# launch screen: the game's dark background with the icon in the middle, instead of
# Capacitor's default white screen and logo
BG = (0x15, 0x12, 0x2d, 255)
splashes = 0
for root, _, files in os.walk(res):
    for f in files:
        if f == 'splash.png':
            p = os.path.join(root, f)
            w, h = Image.open(p).size
            s = int(min(w, h) * 0.32)
            out = Image.new('RGBA', (w, h), BG)
            icon = rounded.resize((s, s), Image.LANCZOS)
            out.paste(icon, ((w - s) // 2, (h - s) // 2), icon)
            out.convert('RGB').save(p)
            splashes += 1
# Android 12+ draws its own launch screen from the theme: make its background dark too
styles = os.path.join(res, 'values', 'styles.xml')
if os.path.exists(styles):
    xml = open(styles, encoding='utf-8').read()
    if 'windowSplashScreenBackground' not in xml and 'AppTheme.NoActionBarLaunch' in xml:
        start = xml.index('AppTheme.NoActionBarLaunch')
        end = xml.index('</style>', start)
        xml = xml[:end] + '    <item name="windowSplashScreenBackground">#15122d</item>\n    ' + xml[end:]
        open(styles, 'w', encoding='utf-8').write(xml)
print('android icons written to', res, '| launch screens replaced:', splashes)
