# Landing asset provenance

Captured on 2026-09-21.

## Current presentation

The main landing preview now uses the original approved design exports,
`gravity-dark.png` and `gravity-light.png` (1440 × 900), at the user’s request.
These are labeled as product design previews, not actual screenshots.
The actual captures documented below remain reference assets; table/equation
cards retain their actual extraction examples with separate sample PDF links.

## Actual app screenshots

The four `gravity-{ko,en}-{light,dark}.jpg` files are unretouched native-window
captures of the existing Gravity development build. The app processed the sample
PDFs through its real structured OCR backend. Preview mode displays the actual
recognized text, HTML table and LaTeX equation. No OCR output was manually edited.

The English captures use an English PDF and English app localization. Korean
captures use a Korean PDF and Korean localization. Isolated copies of the existing
app bundle were used to avoid replacing the document open in the user’s app.
The app source was not changed for the screenshots.

## Sample selection

Both PDFs were authored specifically for this landing page; the urban-garden
observations and numbers are fictional. They may be downloaded from the page.
These are selected demonstration documents, not an accuracy benchmark.

The Korean sample was simplified during capture QA after recognition errors in
two longer sentences and a street name. The final document omits the last sentence
and uses shorter text and a different street name. Original input was changed and
OCR was rerun; recognized output was not patched. Spacing normalization and the
temperature notation in the screenshots are real model output. The sample footer
is not present in the extracted document body.

## Speed evidence is separate

The displayed 1.18-second figure comes from the existing warm slide-image backend
profile, not from these sample PDFs or screenshot captures. The decoder comparison
uses the existing independent 59-token experiment (877.12 vs 270.87 ms). Conditions,
limitations and the unchanged source data remain accessible from benchmark pages.

## Asset hashes

| File | SHA-256 |
| --- | --- |
| `docs/assets/gravity-en-dark.jpg` | `80fc7c0a9c46dbd259d5de9ca84d8acea96e7de667b51a5a515459ab917861f3` |
| `docs/assets/gravity-en-light.jpg` | `d9bb800cd6c120c03275fdd6c23399509c405b811eb8f425f66c316dec1d6c84` |
| `docs/assets/gravity-ko-dark.jpg` | `ec2cfa12a156b0504d92ad56a35b78e61531e9b215f636f43bf739f501b41781` |
| `docs/assets/gravity-ko-light.jpg` | `9041e6a7aea8992e4d5437b1968ecf7dfbad63475e43b9e6e64668a4459b1760` |
| `docs/assets/examples/gravity-sample-en.pdf` | `f524a1f8282758e24b5ed303a83fef0721ba2ad975bb9686731897f247f87594` |
| `docs/assets/examples/gravity-sample-ko.pdf` | `bdfa3aef1bf7a6e77143563ccc980bc0db6b88ee41f42bf6cef29078ca4870ac` |
