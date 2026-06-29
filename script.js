gsap.registerPlugin(ScrollTrigger);

// ── NAV SCROLL BORDER ─────────────────────────────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── NAV ENTRANCE ──────────────────────────────────────────────────────────────
gsap.from('.nav', { y: -20, opacity: 0, duration: 0.6, ease: 'power2.out' });

// ── LOGO ANIMATION ────────────────────────────────────────────────────────────
const logoImg  = document.getElementById('nav-logo-img');
const logoLink = document.getElementById('nav-logo-link');

if (logoImg && logoLink) {
  gsap.timeline({ delay: 0.55 })
    .fromTo(logoImg,
      { autoAlpha: 0, scale: 0, rotation: -180 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.65, ease: 'back.out(2.8)' }
    )
    .to(logoImg, { scale: 1.22, duration: 0.1,  ease: 'power3.in' })
    .to(logoImg, { scale: 1,    duration: 0.55, ease: 'elastic.out(1.6, 0.45)' })
    .to(logoImg, { y: -5, duration: 1.9, ease: 'sine.inOut', yoyo: true, repeat: -1 });

  let flipping = false;
  logoLink.addEventListener('mouseenter', () => {
    if (flipping) return;
    flipping = true;
    gsap.to(logoImg, {
      rotationY: 360,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete() {
        gsap.set(logoImg, { rotationY: 0 });
        flipping = false;
      },
    });
  });
}

// ── HERO SEQUENCE ─────────────────────────────────────────────────────────────
gsap.from(['.hero-eyebrow', '.hero-name', '.hero-sub', '.hero-cta', '.hero-stat-row'], {
  opacity: 0, y: 22, duration: 0.7, ease: 'power2.out',
  stagger: 0.12, delay: 0.2,
  onComplete: startStatCounters,
});

// ── REVEAL ON SCROLL ──────────────────────────────────────────────────────────
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
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

// ── STAT COUNTERS ─────────────────────────────────────────────────────────────
function startStatCounters() {
  gsap.utils.toArray('.stat-number').forEach(el => {
    const raw     = el.textContent.trim();
    const num     = parseFloat(raw);
    const suffix  = raw.replace(/[\d.]/g, '');
    const isFloat = raw.includes('.');
    const obj     = { val: 0 };

    gsap.to(obj, {
      val: num, duration: 1.8, ease: 'power2.out',
      onUpdate() {
        el.textContent = (isFloat ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
      },
    });
  });
}

// ── LANGUAGE SWITCH ───────────────────────────────────────────────────────────
const resumeImg      = document.getElementById('resume-img');
const resumeDownload = document.getElementById('resume-download');
const resumeTabs     = document.querySelectorAll('.resume-tab');
const contactResume  = document.getElementById('contact-resume-link');

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  const isEn     = lang === 'en';
  const img      = isEn ? 'assets/cv-en-page-1.jpg' : 'assets/cv-es-page-1.jpg';
  const pdf      = isEn ? 'Ulises%20Hern%C3%A1ndez%20Resume.pdf' : 'Ulises%20Hern%C3%A1ndez%20CV.pdf';
  const filename = isEn ? 'Ulises Hernández Resume.pdf' : 'Ulises Hernández CV.pdf';
  if (resumeImg)      resumeImg.src           = img;
  if (resumeDownload) resumeDownload.href     = pdf;
  if (resumeDownload) resumeDownload.download = filename;
  resumeTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.pdf === pdf));
  if (contactResume) { contactResume.href = pdf; contactResume.download = filename; }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// ── RESUME TAB TOGGLE ─────────────────────────────────────────────────────────
resumeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    resumeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    if (resumeImg)      resumeImg.src           = tab.dataset.img;
    if (resumeDownload) resumeDownload.href     = tab.dataset.pdf;
    if (resumeDownload) resumeDownload.download = tab.dataset.filename;
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

// ── OCEAN WAVE ────────────────────────────────────────────────────────────────
const waveContainer = document.querySelector('.ocean-divider');
const waveSvg       = waveContainer && waveContainer.querySelector('.ocean-wave-svg');

if (waveSvg) {
  function startWave() {
    const w = waveContainer.offsetWidth;
    gsap.killTweensOf(waveSvg);
    gsap.fromTo(waveSvg, { x: 0 }, { x: -w, duration: 10, ease: 'none', repeat: -1 });
  }
  startWave();
  window.addEventListener('resize', startWave);
}

// ── HERO WAVES (canvas) ───────────────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('hero-waves');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = canvas.offsetWidth  * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();

  // Capas: [fracción_y, amplitud, frecuencia, fase, velocidad, opacidad, grosor, blur]
  // De fondo (borrosas) → primer plano (nítidas)
  const layers = [
    [0.40, 60, 0.0032, 0.0,  0.16, 0.055, 2.0, 6],
    [0.60, 50, 0.0038, 1.5,  0.13, 0.045, 2.0, 7],
    [0.45, 38, 0.0052, 2.8,  0.22, 0.08,  1.2, 3],
    [0.55, 30, 0.0058, 4.1,  0.20, 0.07,  1.2, 3.5],
    [0.50, 24, 0.0072, 0.9,  0.28, 0.10,  1.0, 1.5],
    [0.47, 18, 0.0088, 3.3,  0.36, 0.14,  0.8, 0.5],
    [0.53, 15, 0.0096, 5.7,  0.38, 0.12,  0.8, 0.5],
    [0.50, 11, 0.0118, 2.1,  0.46, 0.18,  0.6, 0],
    [0.48,  8, 0.0140, 4.6,  0.52, 0.15,  0.5, 0],
  ];

  function waveY(x, t, amp, freq, phase, speed) {
    return amp * Math.sin(x * freq + t * speed + phase)
         + amp * 0.28 * Math.sin(x * freq * 2.3 + t * speed * 1.4 + phase)
         + amp * 0.10 * Math.sin(x * freq * 4.1 + t * speed * 0.7 + phase);
  }

  let t = 0;
  function draw() {
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    ctx.clearRect(0, 0, W, H);

    layers.forEach(([yFrac, amp, freq, phase, speed, opacity, lw, blur]) => {
      ctx.save();
      ctx.filter = blur > 0 ? `blur(${blur}px)` : 'none';
      ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
      ctx.lineWidth = lw;
      ctx.beginPath();
      const cy = H * yFrac;
      for (let x = 0; x <= W; x += 1.5) {
        const y = cy + waveY(x, t, amp, freq, phase, speed);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    });

    t += 0.010;
    if (!document.hidden) requestAnimationFrame(draw);
    else setTimeout(() => requestAnimationFrame(draw), 500);
  }

  requestAnimationFrame(draw);
})();

// ── OCEAN RIPPLES ─────────────────────────────────────────────────────────────
document.addEventListener('pointerdown', (e) => {
  [0, 1, 2].forEach(i => {
    const ring = document.createElement('div');
    ring.className = 'ocean-ripple';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
    document.body.appendChild(ring);
    gsap.fromTo(ring,
      { scale: 0, opacity: 0.8 - i * 0.2 },
      {
        scale: 3 + i * 2, opacity: 0,
        duration: 1.0 + i * 0.28, delay: i * 0.13,
        ease: 'power2.out',
        onComplete: () => ring.remove(),
      }
    );
  });
});
