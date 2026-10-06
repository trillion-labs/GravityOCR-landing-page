#!/usr/bin/env python3
"""Refresh content-based asset versions so browsers fetch each changed release.

Run before committing static asset changes. No generated asset copies or cache
are created; only references in HTML are updated. Running twice is a no-op.
"""
from pathlib import Path
import hashlib
import re

root = Path(__file__).resolve().parents[1] / 'docs'
versions = {name: hashlib.sha256((root / name).read_bytes()).hexdigest()[:12]
            for name in ('styles.css', 'app.js', 'release.js')}
pattern = re.compile(r'(?P<prefix>(?:href|src)="(?:\.\./)?)(?P<name>styles\.css|app\.js|release\.js)(?:\?v=[a-f0-9]+)?(?P<end>")')
changed = 0
for page in sorted(root.rglob('*.html')):
    old = page.read_text()
    new = pattern.sub(lambda m: f'{m["prefix"]}{m["name"]}?v={versions[m["name"]]}{m["end"]}', old)
    if new != old:
        page.write_text(new)
        changed += 1
print(f'Updated {changed} HTML files; asset versions: {versions}')

# Keep /en/ as a real English page, using the root copy as the content source.
# Only asset paths need a parent prefix; page links stay within /en/.
asset_reference = re.compile(r'((?:href|src)=")((?:assets/|styles\.css|app\.js|release\.js)[^"]*)(")')
for page in sorted(root.glob('*.html')):
    english = asset_reference.sub(lambda m: m[1] + '../' + m[2] + m[3], page.read_text())
    target = root / 'en' / page.name
    if not target.exists() or target.read_text() != english:
        target.write_text(english)
print('English /en/ pages synchronized from the root content.')
