(() => {
  'use strict';
  const image = document.getElementById('product-image');
  const themeButtons = [...document.querySelectorAll('[data-theme]')];
  const setTheme = theme => {
    const light = theme === 'light';
    image.src = `assets/gravity-${light ? 'light' : 'dark'}.png`;
    image.alt = `Gravity ${light ? '라이트' : '다크'} 화면. 왼쪽에 페이지 목록, 가운데에 원본 PDF, 오른쪽에 추출 텍스트가 나란히 보입니다.`;
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
    anchor.hidden = false;
    anchor.rel = 'noopener';
    document.getElementById('download-button').hidden = true;
    document.getElementById('release-description').textContent = 'Mac에 설치하고, 첫 문서를 열어보세요.';
    document.querySelector('.release-status').textContent = '무료 다운로드';
    const metadata = [`v${release.version}`, release.fileSize, `SHA-256 ${release.sha256.slice(0, 12)}…`];
    const details = document.getElementById('release-details');
    details.textContent = metadata.join(' · ');
    details.hidden = !metadata.length;
  }
  document.getElementById('year').textContent = new Date().getFullYear();
})();
