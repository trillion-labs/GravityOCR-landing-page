# Gravity OCR landing page

Official Gravity OCR product landing page by Trillion Labs.

**Website:** https://gravityocr.trillionlabs.co/

## Editing and deployment

This repository owns the public landing page. Edit the static HTML, CSS,
JavaScript and images in `docs/`. No build step or dependencies are required.
GitHub Pages publishes `main` → `/docs` automatically after each push.
Deployment status appears in the repository Actions tab and Settings → Pages.

For a local preview, run `python3 -m http.server 8000 --directory docs`
and open http://localhost:8000. Stop the server with Ctrl-C when finished.
Keep asset and page links relative so they work under the repository URL.
If the public address changes, update canonical and og:url in `docs/index.html`.

## Release state

`docs/release.js` points at the **0.1.0 preview** DMG on this repository's
GitHub Releases (`v0.1.0`, marked pre-release). It is ad-hoc signed only: no
Developer ID signature and no notarization yet, and the on-device model
download is not open, so the app stops at its setup screen. With
`preview: true` the page says both things and labels the button as a
preview. After licensing, Developer ID signing, notarization and
clean-machine release gates pass, publish the signed DMG, update the URL,
version, file size and exact 64-character SHA-256, and remove `preview`.
Incomplete metadata keeps downloads disabled.

The main product images are approved design previews: the site uses localized Figma exports
`gravity-preview-en-{dark,light}.png`. Original Korean assets are retained as
reference files, not rendered by the site.
The table and equation cards show actual extraction from the sample PDFs in
`docs/assets/examples/`. Earlier app captures are retained as reference assets.
See `ASSET_PROVENANCE.md` for their capture details.
Benchmark numbers are selected development measurements; full conditions live
in `docs/benchmarks.html`.
Do not commit app binaries, model weights, credentials or private documents.

## Origin and ownership

Initially extracted from `apps/landing/dist` in `trillion-labs/ocr-monorepo`.
Future landing-page edits and publishing belong in this repository;
the application repository continues to own app code and release artifacts.
There is no automatic synchronization with the original landing copy.

## Language and legacy addresses

The site is English-only. The homepage and supporting pages live directly in
`docs/`. Browser language and previous language choices do not affect routing.
There is no language switch or Korean content page to maintain.

`docs/ko/` redirects directly to the corresponding `/en/` page, preserving
query strings and fragments. `/en/` serves actual English content and does not
redirect to `/`. The root continues to serve English for the existing QR URL.
`tools/version-assets.py` also synchronizes `/en/` from the root pages with
adjusted asset paths, so there is only one content source to edit.

The Korean redirects include a normal link and meta refresh for browsers
without JavaScript. They set the old `gravity-lang` preference to `en` only for
compatibility with cached older pages; current English pages ignore it.

`docs/CNAME` keeps `gravityocr.trillionlabs.co` attached to this GitHub Pages
site. Preserve the repository name and Pages configuration: the printed QR
points at the old GitHub Pages root, which GitHub redirects to this domain.
Canonical and Open Graph URLs use the custom domain.

## Color hierarchy

- Primary white: complete headings, key results, and primary download actions.
- Body gray: explanations that support the headings.
- Muted gray: captions, units, requirements, sources, and secondary navigation.
- Dark surfaces: group cards and the download area without switching color themes.
- Charts: gray denotes the reference, white the Gravity result. Labels retain the comparison meaning without relying on color alone.
- Selection uses a raised dark surface and an outline; a solid white fill is reserved for primary actions. Unavailable downloads remain outlined and muted.

The shared stylesheet applies these roles throughout the English site.

The hero has one accent exception: the image-to-text line slowly shifts between
pale blue and lavender over 12 seconds; the local-processing line stays near-white.
Reduced-motion uses a static gradient, forced-colors uses system text, and browsers
without text clipping keep a readable solid color. Other headings stay white.

## Browser cache versions

Before committing changes to CSS, JavaScript, or release metadata, run:

```sh
python3 tools/version-assets.py
```

This updates all HTML asset references with content hashes. GitHub Pages can
cache an unchanged asset URL for ten minutes; versioned URLs ensure a newly
loaded page requests the matching assets. No copied assets or local cache are
created. Pages already open still need a normal reload to load a new version.

## Product motion

The preview has a static blue/lavender glow and a 320 ms theme crossfade.
Only one image load and one fading layer are owned by the preview at a time;
new choices cancel pending loads, each load has a five-second timeout, and
errors keep the currently visible image. Pending work is cleaned up on pagehide.
Sections enter once in 550 ms; chart bars grow once in 750 ms. IntersectionObserver
unobserves each element after entry. Content stays visible if JavaScript or the
observer is unavailable. Reduced-motion disables these animations and also
cancels an active crossfade when the setting changes.

## Routing verification

Run `node tools/check-routing.cjs` before changing locale compatibility routes.
It checks all English pages, the `/ko/` redirects and real `/en/` pages, blocked storage,
query/fragment preservation, and the no-JavaScript fallback.
