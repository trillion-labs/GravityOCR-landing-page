# Gravity OCR landing page

Official Gravity OCR product landing page by Trillion Labs.

**Website:** https://trillion-labs.github.io/GravityOCR-landing-page/

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

The page currently says **public release pending** and the download is disabled.
Publishing this website does not mean the macOS application is release-ready.
Only after licensing, Developer ID signing, notarization and clean-machine
release gates pass, configure `docs/release.js` with an HTTPS download URL,
strict SemVer version, file size and the exact 64-character SHA-256.
Incomplete metadata keeps downloads disabled.

The main product images are approved design previews: Korean uses
`gravity-{dark,light}.png`; English uses the localized Figma exports
`gravity-preview-en-{dark,light}.png`.
The table and equation cards show actual extraction from the sample PDFs in
`docs/assets/examples/`. Earlier app captures are retained as reference assets.
See `ASSET_PROVENANCE.md` for their capture details.
Benchmark numbers are selected development measurements; full conditions live
in `docs/benchmarks.html` and `docs/en/benchmarks.html`.
Do not commit app binaries, model weights, credentials or private documents.

## Origin and ownership

Initially extracted from `apps/landing/dist` in `trillion-labs/ocr-monorepo`.
Future landing-page edits and publishing belong in this repository;
the application repository continues to own app code and release artifacts.
There is no automatic synchronization with the original landing copy.

## Languages

Korean lives in `docs/index.html`; English lives in `docs/en/index.html`.
Each language includes its own privacy, terms and open-source pages.
Use the visible language switch to change languages. Shared CSS, JavaScript,
release metadata and assets stay in `docs/`; `app.js` uses the HTML language
to localize dynamic text. Update both languages together.
Each page has its own canonical URL and reciprocal hreflang links.

## Color hierarchy

- Primary white: complete headings, key results, and primary download actions.
- Body gray: explanations that support the headings.
- Muted gray: captions, units, requirements, sources, and secondary navigation.
- Dark surfaces: group cards and the download area without switching color themes.
- Charts: gray denotes the reference, white the Gravity result. Labels retain the comparison meaning without relying on color alone.
- Selection uses a raised dark surface and an outline; a solid white fill is reserved for primary actions. Unavailable downloads remain outlined and muted.

The shared stylesheet applies these roles to both Korean and English pages.

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
