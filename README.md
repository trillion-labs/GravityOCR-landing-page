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

Product images are design previews. Benchmark numbers are development
measurements with the limitations documented on the page.
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
