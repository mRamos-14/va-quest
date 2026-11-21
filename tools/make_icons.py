"""Draws the app icons (the pixel VA on a night panel) into icons/.
    python tools/make_icons.py
"""
import os
import re
from PIL import Image, ImageDraw

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
core = open(os.path.join(ROOT, 'core.js'), encoding='utf-8').read()
grid = re.findall(r"'([^']*)'", core[core.index('player: ['):core.index('],', core.index('player: ['))])
pal_src = core[core.index('VAQ.PAL = {'):core.index('};', core.index('VAQ.PAL = {'))]
PAL = {k: v for k, v in re.findall(r"(\w): '(#[0-9a-fA-F]{6})", pal_src)}
OUT = os.path.join(ROOT, 'icons')
os.makedirs(OUT, exist_ok=True)


def icon(size, pad_ratio, rounded):
    import random
    img = Image.new('RGBA', (size, size), '#15122d')
    d = ImageDraw.Draw(img)
    rnd = random.Random(7)
    x, base = 0, int(size * .86)
    while x < size:
        w = rnd.randint(size // 14, size // 7); h = rnd.randint(size // 10, size // 4)
        d.rectangle([x, base - h, x + w, base], fill='#221d47')
        x += w + max(1, size // 64)
    d.rectangle([0, base, size, size], fill='#0d0b20')
    rows, cols = len(grid), len(grid[0])
    px = int(size * (1 - 2 * pad_ratio) // max(rows, cols))
    ox, oy = (size - cols * px) // 2, (size - rows * px) // 2 + px // 2
    for r, row in enumerate(grid):
        for c, ch in enumerate(row):
            if ch in PAL:
                d.rectangle([ox + c * px, oy + r * px, ox + (c + 1) * px - 1, oy + (r + 1) * px - 1], fill=PAL[ch])
    if rounded:
        mask = Image.new('L', (size, size), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], radius=size // 6, fill=255)
        out = Image.new('RGBA', (size, size), (0, 0, 0, 0)); out.paste(img, (0, 0), mask)
        b = max(2, size // 40)
        ImageDraw.Draw(out).rounded_rectangle([b // 2, b // 2, size - 1 - b // 2, size - 1 - b // 2], radius=size // 6, outline='#ffb547', width=b)
        return out
    return img


icon(192, .16, True).save(os.path.join(OUT, 'icon-192.png'))
icon(512, .16, True).save(os.path.join(OUT, 'icon-512.png'))
icon(512, .26, False).save(os.path.join(OUT, 'icon-maskable-512.png'))
icon(180, .14, False).convert('RGB').save(os.path.join(OUT, 'apple-touch-icon.png'))
print('icons written to', OUT)
