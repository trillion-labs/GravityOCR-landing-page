// Run with node tools/check-routing.cjs. No browser or network dependencies.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '../docs');
const base = 'https://gravityocr.trillionlabs.co/';
const pages = ['index.html', 'privacy.html', 'terms.html', 'third-party.html', 'benchmarks.html'];
for (const name of pages) {
  const html = fs.readFileSync(path.join(root, name), 'utf8');
  assert.match(html, /<html lang="en">/);
  assert.doesNotMatch(html, /gravity-lang|navigator\.language|language-switch|hreflang="ko"|[가-힣]/);
  const canonical = name === 'index.html' ? base : base + name;
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
  // Verify root pages have no locale redirect even with a Korean browser/preference.
  for (const [, attrs, source] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(attrs)) continue;
    vm.runInNewContext(source, {
      navigator: {language: 'ko-KR', languages: ['ko-KR']},
      localStorage: {getItem: () => 'ko'},
      location: {replace: () => assert.fail('Root page redirected')}
    });
  }
  const english = fs.readFileSync(path.join(root, 'en', name), 'utf8');
  assert.match(english, /<html lang="en">/);
  assert.doesNotMatch(english, /location\.replace|http-equiv="refresh"|gravity-lang|[가-힣]/);
  assert.equal(english, html.replace(/((?:href|src)=")((?:assets\/|styles\.css|app\.js|release\.js)[^"]*)(")/g, '$1../$2$3'));
  for (const lang of ['ko']) {
    const legacy = fs.readFileSync(path.join(root, lang, name), 'utf8');
    const destination = name === 'index.html' ? '../en/' : `../en/${name}`;
    assert.ok(legacy.includes(`content="0; url=${destination}"`)); // JS-disabled fallback.
    assert.ok(legacy.includes(`<a href="${destination}">`));
    assert.ok(legacy.includes(`rel="canonical" href="${base}en/${name === 'index.html' ? '' : name}"`));
    assert.match(legacy, /name="robots" content="noindex"/);
    for (const blocked of [false, true]) {
      let redirected, preference = 'ko';
      const ctx = {
        localStorage: {setItem: (key, value) => {if (blocked) throw Error('Storage unavailable'); preference = value;}},
        location: {search: '?from=qr', hash: '#download', replace: value => {redirected = value;}}
      };
      for (const [, source] of legacy.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) vm.runInNewContext(source, ctx);
      assert.equal(redirected, destination + '?from=qr#download');
      const target = new URL(redirected, base + lang + '/' + name);
      assert.equal(target.href, base + 'en/' + (name === 'index.html' ? '' : name) + '?from=qr#download');
      if (!blocked) assert.equal(preference, 'en');
    }
  }
}
assert.equal(fs.readFileSync(path.join(root,'CNAME'),'utf8').trim(),'gravityocr.trillionlabs.co');
console.log('Five /ko/ → /en/ redirects passed; query/hash, storage failure and no-JS fallbacks covered.');
