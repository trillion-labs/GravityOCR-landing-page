(() => {
  'use strict';
  const english = document.documentElement.lang === 'en';
  const image = document.getElementById('product-image');
  const themeButtons = [...document.querySelectorAll('[data-theme]')];
  const setTheme = theme => {
    const light = theme === 'light';
    image.src = new URL(`gravity-${light ? 'light' : 'dark'}.png`, image.src).href;
    image.alt = english ? `Gravity ${light ? 'light' : 'dark'} design preview, with the original document and extracted text side by side.` : `Gravity ${light ? '라이트' : '다크'} 디자인 미리보기. 원본 문서와 추출 텍스트가 나란히 보입니다.`;
    document.getElementById('screenshot-link').href = image.src;
    themeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === theme)));
  };
  themeButtons.forEach(button => button.addEventListener('click', () => setTheme(button.dataset.theme)));
  const release = window.GRAVITY_RELEASE || {};
  let downloadURL;
  try { downloadURL = new URL(release.downloadUrl); } catch { /* Pre-release is intentional. */ }
  const versionValid = /^\d+\.\d+\.\d+$/.test(release.version || '');
  const sizeValid = typeof release.fileSize === 'string' && release.fileSize.trim().length > 0;
  const shaValid = /^[0-9a-f]{64}$/.test(release.sha256 || '');
  if (downloadURL && downloadURL.protocol === 'https:' && versionValid && sizeValid && shaValid) {
    const anchor = document.getElementById('release-download');
    anchor.href = downloadURL.href;
    document.querySelectorAll('[data-release-cta]').forEach(link => {
      link.textContent = english ? 'Download for Mac →' : 'Mac용 다운로드 →';
    });
    anchor.hidden = false;
    anchor.rel = 'noopener';
    document.getElementById('download-button').hidden = true;
    document.getElementById('release-description').textContent = english ? 'Install Gravity on your Mac and open your first document.' : 'Mac에 설치하고, 첫 문서를 열어보세요.';
    document.querySelector('.release-status').textContent = english ? 'Free download' : '무료 다운로드';
    const metadata = [`v${release.version}`, release.fileSize, `SHA-256 ${release.sha256.slice(0, 12)}…`];
    const details = document.getElementById('release-details');
    details.textContent = metadata.join(' · ');
    details.hidden = !metadata.length;
  }
  document.getElementById('year').textContent = new Date().getFullYear();
})();
