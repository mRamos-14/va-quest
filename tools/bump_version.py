"""Bump the VA Quest build number before republishing.

    python tools/bump_version.py "What changed, in one short sentence"

Raises BUILD in update.js and writes the same number plus the notes to version.json,
so players who have the game open see the Update banner.
"""
import json
import os
import re
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
up = os.path.join(ROOT, 'update.js')
src = open(up, encoding='utf-8').read()
m = re.search(r'const BUILD = (\d+);', src)
new = int(m.group(1)) + 1
open(up, 'w', encoding='utf-8').write(src.replace(m.group(0), f'const BUILD = {new};', 1))
notes = sys.argv[1] if len(sys.argv) > 1 else 'Fixes and improvements.'
with open(os.path.join(ROOT, 'version.json'), 'w', encoding='utf-8') as f:
    f.write(json.dumps({'v': new, 'notes': notes}) + '\n')
print('Now on build', new)
