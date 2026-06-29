// Nav scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── LANGUAGE SWITCH ───────────────────────────────────────────────────────────
const resumeIframe   = document.getElementById('resume-iframe');
const resumeDownload = document.getElementById('resume-download');
const resumeTabs     = document.querySelectorAll('.resume-tab');
const contactResume  = document.getElementById('contact-resume-link');

function setLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const isEn     = lang === 'en';
  const src      = isEn ? 'Ulises%20Hern%C3%A1ndez%20Resume.pdf' : 'Ulises%20Hern%C3%A1ndez%20CV.pdf';
  const filename = isEn ? 'Ulises Hernández Resume.pdf' : 'Ulises Hernández CV.pdf';

  resumeIframe.src        = src;
  resumeDownload.href     = src;
  resumeDownload.download = filename;
  resumeTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.src === src));

  if (contactResume) {
    contactResume.href     = src;
    contactResume.download = filename;
  }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// ── RESUME TAB TOGGLE ─────────────────────────────────────────────────────────
resumeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    resumeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    resumeIframe.src        = tab.dataset.src;
    resumeDownload.href     = tab.dataset.src;
    resumeDownload.download = tab.dataset.filename;
  });
});

// ── HAMBURGER MENU ────────────────────────────────────────────────────────────
const hamburger    = document.getElementById('nav-hamburger');
const overlay      = document.getElementById('nav-overlay');
const overlayClose = document.getElementById('nav-overlay-close');

function openMenu()  { overlay.classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeMenu() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

hamburger.addEventListener('click', openMenu);
overlayClose.addEventListener('click', closeMenu);
overlay.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
