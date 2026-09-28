// The download the page offers. Every field must be valid or the button
// stays disabled (see app.js). `preview: true` marks a build that is not yet
// Developer ID signed and notarized and whose model download is not open;
// the page then says so instead of promising a ready app. Remove it for the
// first signed, notarized release.
window.GRAVITY_RELEASE = Object.freeze({
  downloadUrl: "https://github.com/trillion-labs/GravityOCR-landing-page/releases/download/v0.1.0/Gravity-0.1.0.dmg",
  version: "0.1.0",
  fileSize: "3.7 MB",
  sha256: "4621582b3012f3f4ff804fd28cbc85add0fe24757dcce78de93a94fb768b46c2",
  preview: true,
  releaseNotesUrl: "https://github.com/trillion-labs/GravityOCR-landing-page/releases/tag/v0.1.0",
  minimumOS: "macOS 14",
  architecture: "Apple Silicon"
});
