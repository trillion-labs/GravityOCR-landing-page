(() => {
  'use strict';
  const english = document.documentElement.lang === 'en';
  const image = document.getElementById('product-image');
  const themeButtons = [...document.querySelectorAll('[data-theme]')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const previewLink = document.getElementById('screenshot-link');
  // At most one fading layer and one pending image load per preview.
  const previousImage = image.cloneNode(false);
  previousImage.removeAttribute('id');
  previousImage.removeAttribute('fetchpriority');
  previousImage.alt = '';
  previousImage.setAttribute('aria-hidden', 'true');
  previousImage.className = 'preview-previous';
  previousImage.hidden = true;
  previewLink.appendChild(previousImage);
  let cancelPending = null;
  let fade = null;
  const finishFade = () => {
    if (fade) { fade.cancel(); fade = null; }
    previousImage.hidden = true;
    previousImage.removeAttribute('src');
  };
  const setTheme = theme => {
    if (cancelPending) cancelPending();
    const light = theme === 'light';
    const url = new URL(`${english ? 'gravity-preview-en' : 'gravity'}-${light ? 'light' : 'dark'}.png`, image.src).href;
    if (image.src === url) return;
    const pending = new Image();
    let settled = false;
    const cleanup = () => {
      settled = true;
      clearTimeout(timeout);
      pending.onload = pending.onerror = null;
      cancelPending = null;
    };
    const cancel = () => { cleanup(); pending.removeAttribute('src'); };
    const timeout = setTimeout(cancel, 5000);
    cancelPending = cancel;
    pending.onerror = cancel;
    pending.onload = () => {
      if (settled) return;
      cleanup();
      finishFade();
      previousImage.src = image.src;
      image.src = url;
      image.alt = english ? `Gravity ${light ? 'light' : 'dark'} English design preview, with Cities in Motion.pdf and its extracted English text side by side.` : `Gravity ${light ? '라이트' : '다크'} 디자인 미리보기. 원본 문서와 추출 텍스트가 나란히 보입니다.`;
      previewLink.href = url;
      themeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === theme)));
      if (!motion.matches && previousImage.animate) {
        previousImage.hidden = false;
        fade = previousImage.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out' });
        fade.onfinish = finishFade;
      } else finishFade();
    };
    pending.src = url;
  };
  themeButtons.forEach(button => button.addEventListener('click', () => setTheme(button.dataset.theme)));

  // Content stays visible without JavaScript, observers, or animation support.
  const reveals = [...document.querySelectorAll('.section-heading, .feature-grid, .speed-heading, .speed-grid, .structured-section .example-label, .structure-grid, .download-inner, .faq')];
  const chart = document.querySelector('.decode-chart');
  let observer = null;
  const stopMotion = () => {
    if (!motion.matches) return;
    finishFade();
    if (observer) { observer.disconnect(); observer = null; }
    document.querySelectorAll('.reveal-once, .chart-enter').forEach(node => {
      node.classList.remove('reveal-once', 'chart-enter');
    });
  };
  if (!motion.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(entry.target === chart ? 'chart-enter' : 'reveal-once');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reveals.forEach(node => observer.observe(node));
    if (chart) observer.observe(chart);
  }
  motion.addEventListener('change', stopMotion);
  window.addEventListener('pagehide', () => {
    if (cancelPending) cancelPending();
    finishFade();
    if (observer) observer.disconnect();
  });
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
      link.textContent = english ? 'Download' : '다운로드';
    });
    anchor.hidden = false;
    anchor.rel = 'noopener';
    document.getElementById('download-button').hidden = true;
    const description = document.getElementById('release-description');
    if (release.preview) {
      // Honest about what a preview build can and cannot do yet.
      description.textContent = english
        ? 'Preview build, not yet notarized: macOS asks you to allow it in System Settings ▸ Privacy & Security the first time. The on-device model download opens soon.'
        : '공증 전 미리보기 빌드입니다. 처음 열 때 시스템 설정 ▸ 개인정보 보호 및 보안에서 허용해야 합니다. 기기 내 모델 다운로드는 곧 열립니다.';
      document.querySelector('.release-status').textContent = english ? 'Preview' : '미리보기';
      anchor.textContent = english ? 'Download preview for Mac' : 'Mac용 미리보기 다운로드';
    } else {
      description.textContent = english ? 'Install Gravity on your Mac and open your first document.' : 'Mac에 설치하고, 첫 문서를 열어보세요.';
      document.querySelector('.release-status').textContent = english ? 'Free download' : '무료 다운로드';
    }
    const metadata = [`v${release.version}`, release.fileSize, `SHA-256 ${release.sha256.slice(0, 12)}…`];
    const details = document.getElementById('release-details');
    details.textContent = metadata.join(' · ');
    let notesURL;
    try { notesURL = new URL(release.releaseNotesUrl); } catch { /* Optional. */ }
    if (notesURL && notesURL.protocol === 'https:') {
      const notes = document.createElement('a');
      notes.href = notesURL.href;
      notes.target = '_blank';
      notes.rel = 'noopener noreferrer';
      notes.textContent = english ? 'Release notes ↗' : '릴리스 노트 ↗';
      details.append(' · ', notes);
    }
    details.hidden = !metadata.length;
  }
  document.getElementById('year').textContent = new Date().getFullYear();
})();
