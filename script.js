/* ============================================================
   KARLOZ PHOTOGRAPHY — script.js
   Handles: session gallery, lightbox, scroll animations, mobile nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ===== MOBILE NAV =====
  window.toggleMenu = function () {
    document.getElementById('mobileNav').classList.toggle('open');
  };

  // ===== SCROLL FADE-IN =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(
    '.grid-item, .testimonial-card, .about-photo, .about-bio, .contact-card'
  ).forEach(el => observer.observe(el));

  // ===== SESSION GALLERY =====
  const sessionOverlay  = document.getElementById('sessionOverlay');
  const sessionGrid     = document.getElementById('sessionGrid');
  const sessionTitle    = document.getElementById('sessionTitle');
  const sessionCloseBtn = document.getElementById('sessionClose');

  // Build session map from grid items
  function buildSessionMap() {
    const map = {};
    document.querySelectorAll('.grid-item[data-session]').forEach(item => {
      const s = item.dataset.session;
      if (!map[s]) map[s] = [];
      map[s].push({
        src:   item.dataset.full || item.querySelector('img')?.src || '',
        thumb: item.querySelector('img')?.src || '',
        alt:   item.querySelector('img')?.alt || '',
        label: item.dataset.label || ''
      });
    });
    // Update session count badges
    document.querySelectorAll('.grid-item[data-session]').forEach(item => {
      const s = item.dataset.session;
      const count = map[s] ? map[s].length : 0;
      if (count > 1) item.setAttribute('data-count', count + ' photos');
    });
    return map;
  }

  const sessionMap = buildSessionMap();

  // Open session gallery
  document.querySelectorAll('.grid-item[data-session]').forEach(item => {
    item.addEventListener('click', function () {
      const session = this.dataset.session;
      const photos  = sessionMap[session] || [];
      const label   = this.dataset.label || session;

      sessionTitle.textContent = label;
      sessionGrid.innerHTML = '';

      photos.forEach((photo, idx) => {
        const div = document.createElement('div');
        div.className = 'session-grid-item';
        div.innerHTML = `<img src="${photo.src}" alt="${photo.alt}" loading="lazy" />`;
        div.addEventListener('click', () => openLightbox(photos, idx));
        sessionGrid.appendChild(div);
      });

      sessionOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (sessionCloseBtn) {
    sessionCloseBtn.addEventListener('click', closeSession);
  }
  if (sessionOverlay) {
    sessionOverlay.addEventListener('click', function (e) {
      if (e.target === sessionOverlay) closeSession();
    });
  }

  function closeSession() {
    if (sessionOverlay) sessionOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ===== LIGHTBOX =====
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev  = document.getElementById('lightboxPrev');
  const lightboxNext  = document.getElementById('lightboxNext');

  let currentPhotos = [];
  let currentIndex  = 0;

  function openLightbox(photos, idx) {
    currentPhotos = photos;
    currentIndex  = idx;
    showLightboxPhoto();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function showLightboxPhoto() {
    const photo = currentPhotos[currentIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
    if (lightboxPrev) lightboxPrev.style.opacity = currentIndex === 0 ? '0.3' : '1';
    if (lightboxNext) lightboxNext.style.opacity = currentIndex === currentPhotos.length - 1 ? '0.3' : '1';
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('open');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev)  lightboxPrev.addEventListener('click', () => {
    if (currentIndex > 0) { currentIndex--; showLightboxPhoto(); }
  });
  if (lightboxNext)  lightboxNext.addEventListener('click', () => {
    if (currentIndex < currentPhotos.length - 1) { currentIndex++; showLightboxPhoto(); }
  });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard nav
  document.addEventListener('keydown', function (e) {
    if (lightbox && lightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; showLightboxPhoto(); }
      if (e.key === 'ArrowRight' && currentIndex < currentPhotos.length - 1) { currentIndex++; showLightboxPhoto(); }
    } else if (sessionOverlay && sessionOverlay.classList.contains('open')) {
      if (e.key === 'Escape') closeSession();
    }
  });

});
