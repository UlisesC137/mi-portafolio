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

// ── HERO WAVES (WebGL shader — agua realista) ─────────────────────────────────
(function () {
  const canvas = document.getElementById('hero-waves');
  if (!canvas) return;

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  const vert = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const frag = `
    precision highp float;
    uniform float u_time;
    uniform vec2  u_res;

    float waterH(vec2 p, float t) {
      float h = 0.0;
      h += sin(p.x * 2.10 + t * 0.65) * 0.32;
      h += sin(p.x * 3.80 - p.y * 0.60 + t * 1.05) * 0.22;
      h += sin(p.x * 1.45 + p.y * 0.90 - t * 0.48) * 0.28;
      h += sin(p.x * 5.30 + t * 1.38) * 0.11;
      h += sin(p.x * 8.20 - t * 0.82) * 0.065;
      h += sin(p.y * 4.40 + p.x * 0.35 + t * 0.93) * 0.085;
      h += sin(p.x * 12.1 + p.y * 1.20 - t * 1.60) * 0.038;
      return h;
    }

    void main() {
      vec2 uv  = gl_FragCoord.xy / u_res;
      uv.y     = 1.0 - uv.y;

      float pf = 1.0 + (1.0 - uv.y) * 2.5;
      vec2  p  = vec2(uv.x * pf * 4.5, uv.y * 3.2);

      float eps = 0.025;
      float h   = waterH(p, u_time);
      float hx  = waterH(p + vec2(eps, 0.0), u_time);
      float hy  = waterH(p + vec2(0.0, eps), u_time);

      /* normal con escala pronunciada para shading visible */
      vec3  N = normalize(vec3(-(hx - h) / eps * 4.0, -(hy - h) / eps * 4.0, 1.0));

      vec3  L = normalize(vec3(0.30,  0.55, 0.78));
      vec3  V = normalize(vec3(0.00, -0.40, 1.00));
      vec3  R = reflect(-L, N);

      float diffuse  = max(dot(N, L), 0.0);
      float specular = pow(max(dot(R, V), 0.0), 40.0);
      float fresnel  = pow(1.0 - max(dot(N, V), 0.0), 2.0);

      /* agua oscura base + cara iluminada + destellos especulares */
      float col = 0.05
                + diffuse  * 0.30
                + specular * 0.95 * fresnel
                + fresnel  * 0.20;
      col = clamp(col, 0.0, 1.0);

      float fadeX = smoothstep(0.0, 0.08, uv.x) * smoothstep(0.0, 0.08, 1.0 - uv.x);
      float fadeY = smoothstep(0.0, 0.06, uv.y) * smoothstep(0.0, 0.05, 1.0 - uv.y);

      /* alpha: zonas oscuras casi transparentes, destellos opacos */
      float alpha = clamp(0.25 + col * 0.75, 0.0, 0.92) * fadeX * fadeY;
      gl_FragColor = vec4(vec3(col), alpha);
    }
  `;

  function mkShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }

  const vs = mkShader(gl.VERTEX_SHADER, vert);
  const fs = mkShader(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

  gl.useProgram(prog);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes  = gl.getUniformLocation(prog, 'u_res');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  const t0 = performance.now();
  function render() {
    gl.uniform1f(uTime, (performance.now() - t0) * 0.001);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
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
