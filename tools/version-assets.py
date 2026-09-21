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
