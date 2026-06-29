gsap.registerPlugin(ScrollTrigger);

// ── NAV SCROLL BORDER ─────────────────────────────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── NAV ENTRANCE ──────────────────────────────────────────────────────────────
gsap.from('.nav', {
  y: -20,
  opacity: 0,
  duration: 0.6,
  ease: 'power2.out',
});

// ── HERO SEQUENCE ─────────────────────────────────────────────────────────────
gsap.set(['.hero-eyebrow', '.hero-name', '.hero-sub', '.hero-cta', '.hero-stat-row'], {
  opacity: 0,
  y: 22,
});

gsap.timeline({ delay: 0.15 })
  .to('.hero-eyebrow',  { opacity: 1, y: 0, duration: 0.7,  ease: 'power2.out' })
  .to('.hero-name',     { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, '-=0.45')
  .to('.hero-sub',      { opacity: 1, y: 0, duration: 0.7,  ease: 'power2.out' }, '-=0.45')
  .to('.hero-cta',      { opacity: 1, y: 0, duration: 0.6,  ease: 'power2.out' }, '-=0.35')
  .to('.hero-stat-row', { opacity: 1, y: 0, duration: 0.6,  ease: 'power2.out' }, '-=0.25')
  .add(() => startStatCounters());

// ── REVEAL ON SCROLL ──────────────────────────────────────────────────────────
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    }
  );
});

// ── TIMELINE LINE DRAW ────────────────────────────────────────────────────────
gsap.utils.toArray('.timeline-line').forEach(line => {
  gsap.from(line, {
    scaleY: 0,
    transformOrigin: 'top center',
    ease: 'none',
    scrollTrigger: {
      trigger: line.closest('.timeline-item'),
      start: 'top 72%',
      end: 'bottom 35%',
      scrub: 1,
    },
  });
});

// ── STAT COUNTERS (se disparan al terminar la animación del hero) ─────────────
function startStatCounters() {
  gsap.utils.toArray('.stat-number').forEach(el => {
    const raw     = el.textContent.trim();
    const num     = parseFloat(raw);
    const suffix  = raw.replace(/[\d.]/g, '');
    const isFloat = raw.includes('.');
    const obj     = { val: 0 };

    gsap.to(obj, {
      val: num,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate() {
        el.textContent = (isFloat ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
      },
    });
  });
}

// ── LANGUAGE SWITCH ───────────────────────────────────────────────────────────
const resumeImg    = document.getElementById('resume-img');
const resumeDownload = document.getElementById('resume-download');
const resumeTabs   = document.querySelectorAll('.resume-tab');
const contactResume = document.getElementById('contact-resume-link');

function setLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const isEn     = lang === 'en';
  const img      = isEn ? 'assets/cv-en-page-1.jpg' : 'assets/cv-es-page-1.jpg';
  const pdf      = isEn ? 'Ulises%20Hern%C3%A1ndez%20Resume.pdf' : 'Ulises%20Hern%C3%A1ndez%20CV.pdf';
  const filename = isEn ? 'Ulises Hernández Resume.pdf' : 'Ulises Hernández CV.pdf';

  resumeImg.src           = img;
  resumeDownload.href     = pdf;
  resumeDownload.download = filename;
  resumeTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.pdf === pdf));

  if (contactResume) {
    contactResume.href     = pdf;
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
    resumeImg.src           = tab.dataset.img;
    resumeDownload.href     = tab.dataset.pdf;
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
