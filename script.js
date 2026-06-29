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

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const translations = {
  en: {
    'nav-about': 'About',
    'nav-experience': 'Experience',
    'nav-skills': 'Skills',
    'nav-contact': 'Contact',
    'nav-resume': 'Resume',
    'hero-eyebrow': 'Data Science · Business Intelligence',
    'hero-sub': 'I turn raw data into decisions that move businesses forward.<br>Currently doing that at LVMH – Moët Hennessy.',
    'hero-cta-primary': 'See my work',
    'hero-cta-ghost': 'Get in touch',
    'stat-label-1': 'Years of experience',
    'stat-label-2': 'Daily records automated',
    'stat-label-3': 'Industries served',
    'about-label': 'About',
    'about-title': 'Bridging data<br>and business impact.',
    'about-p1': "I'm a Data Science student at ESCOM – IPN with hands-on experience building real data infrastructure at companies that actually use it at scale. I started automating and cleaning data at a sponsorship analytics firm, scaled to competitive intelligence pipelines at BP, and now I'm learning what it means to make data decisions that move a billion-dollar brand.",
    'about-p2': 'I care about one thing: making data actionable. Not pretty charts for the sake of it — dashboards that finance teams open every Monday morning because they need them.',
    'detail-label-currently': 'Currently',
    'detail-value-currently': 'BI Intern @ LVMH – Moët Hennessy',
    'detail-label-based': 'Based in',
    'detail-value-based': 'Mexico City, MX',
    'detail-label-education': 'Education',
    'detail-value-education': 'B.S. Data Science — ESCOM IPN (2027)',
    'detail-label-languages': 'Languages',
    'detail-value-languages': 'Spanish (Native) · English (Professional)',
    'exp-label': 'Experience',
    'exp-title': "Where I've built things.",
    'exp-present': 'Present',
    'exp-1-title': 'Business Intelligence Intern',
    'exp-1-tag': 'Wines & Spirits Division',
    'exp-1-desc': "Working inside one of the world's most iconic luxury conglomerates, I consolidate financial and commercial data from multiple sources through ETL pipelines to power corporate reporting. I develop and maintain Power BI dashboards that track financial KPIs and sales performance — dashboards that leadership actually uses to make calls. I'm learning what it means when data stops being an exercise and starts being a decision.",
    'exp-2-title': 'Pricing Intern',
    'exp-2-tag': 'Energy · Competitive Intelligence',
    'exp-2-desc': "Built and deployed a full web scraping pipeline that extracted pricing data from gas stations across Mexico every single day — 16,000 records daily — giving BP's pricing team real-time visibility into competitor pricing nationwide. The pipeline ran on an Azure VM, automated with Power Automate, and saved $200 USD/month compared to the manual process. Also rescued a critical data script that was silently dropping 12,000 records per day.",
    'exp-3-title': 'Data Analyst',
    'exp-3-tag': 'Entertainment · Sports Analytics',
    'exp-3-desc': 'Joined a sponsorship analytics firm that measures how brands actually perform at concerts, festivals, and live events. My job was to bring order to chaos: I designed the relational database architecture from scratch, led the full data migration to a SQL server, cleaned years of historical data, and automated reporting with Python — turning a manual, error-prone process into something the team could rely on.',
    'skills-label': 'Skills',
    'skills-title': 'My tech stack.',
    'skill-cat-1': 'Languages',
    'skill-cat-2': 'Data & ETL',
    'skill-cat-3': 'Visualization',
    'skill-cat-4': 'Cloud & Platforms',
    'resume-label': 'Resume',
    'resume-title': 'The full picture.',
    'resume-download': 'Download PDF',
    'contact-label': 'Contact',
    'contact-title': "Let's build something.",
    'contact-sub': "Open to internships, full-time roles, and interesting data problems.<br>If you're working on something that matters, let's talk.",
    'contact-email-label': 'Email',
    'contact-linkedin-label': 'LinkedIn',
    'contact-github-label': 'GitHub',
    'contact-resume-label': 'Resume',
    'contact-resume-value': 'Download PDF',
    'footer-text': '© 2026 Ulises Hernández Anaya. Built with intention.',
  },
  es: {
    'nav-about': 'Sobre mí',
    'nav-experience': 'Experiencia',
    'nav-skills': 'Habilidades',
    'nav-contact': 'Contacto',
    'nav-resume': 'CV',
    'hero-eyebrow': 'Ciencia de Datos · Inteligencia de Negocios',
    'hero-sub': 'Convierto datos crudos en decisiones que impulsan negocios.<br>Actualmente en LVMH – Moët Hennessy.',
    'hero-cta-primary': 'Ver mi trabajo',
    'hero-cta-ghost': 'Contáctame',
    'stat-label-1': 'Años de experiencia',
    'stat-label-2': 'Registros diarios automatizados',
    'stat-label-3': 'Industrias',
    'about-label': 'Sobre mí',
    'about-title': 'Conectando datos<br>e impacto de negocio.',
    'about-p1': 'Soy estudiante de Ciencia de Datos en ESCOM – IPN con experiencia real construyendo infraestructura de datos en empresas que la usan a escala. Comencé automatizando y limpiando datos en una firma de analytics de patrocinios, escalé a pipelines de inteligencia competitiva en BP, y ahora aprendo lo que significa tomar decisiones de datos que mueven una marca de mil millones de dólares.',
    'about-p2': 'Me importa una sola cosa: hacer los datos accionables. No gráficas bonitas por el gusto — dashboards que los equipos de finanzas abren cada lunes porque los necesitan.',
    'detail-label-currently': 'Actualmente',
    'detail-value-currently': 'Intern de BI @ LVMH – Moët Hennessy',
    'detail-label-based': 'Ubicación',
    'detail-value-based': 'Ciudad de México, MX',
    'detail-label-education': 'Educación',
    'detail-value-education': 'Lic. Ciencia de Datos — ESCOM IPN (2027)',
    'detail-label-languages': 'Idiomas',
    'detail-value-languages': 'Español (Nativo) · Inglés (Profesional)',
    'exp-label': 'Experiencia',
    'exp-title': 'Dónde he construido cosas.',
    'exp-present': 'Presente',
    'exp-1-title': 'Intern de Business Intelligence',
    'exp-1-tag': 'División de Vinos y Espirituosos',
    'exp-1-desc': 'Dentro de uno de los conglomerados de lujo más icónicos del mundo, consolido datos financieros y comerciales de múltiples fuentes a través de pipelines ETL para alimentar el reporting corporativo. Desarrollo y mantengo dashboards en Power BI que rastrean KPIs financieros y de ventas — dashboards que el liderazgo usa realmente para tomar decisiones. Aprendo lo que significa cuando los datos dejan de ser un ejercicio y se convierten en una decisión.',
    'exp-2-title': 'Becario de Pricing',
    'exp-2-tag': 'Energía · Inteligencia Competitiva',
    'exp-2-desc': 'Desarrollé y desplegué un pipeline completo de web scraping que extraía datos de precios de gasolineras en todo México cada día — 16,000 registros diarios — dando al equipo de pricing de BP visibilidad en tiempo real sobre precios de competidores a nivel nacional. El pipeline corría en una VM de Azure, automatizado con Power Automate, y ahorró $200 USD/mes frente al proceso manual. También rescaté un script crítico que descartaba 12,000 registros por día silenciosamente.',
    'exp-3-title': 'Analista de Datos',
    'exp-3-tag': 'Entretenimiento · Analytics de Patrocinios',
    'exp-3-desc': 'Me uní a una firma de analytics de patrocinios que mide cómo las marcas realmente se desempeñan en conciertos, festivales y eventos en vivo. Mi trabajo fue ordenar el caos: diseñé la arquitectura de base de datos relacional desde cero, lideré la migración completa a un servidor SQL, limpié años de datos históricos y automaticé el reporting con Python — convirtiendo un proceso manual y propenso a errores en algo confiable.',
    'skills-label': 'Habilidades',
    'skills-title': 'Mi stack tecnológico.',
    'skill-cat-1': 'Lenguajes',
    'skill-cat-2': 'Data & ETL',
    'skill-cat-3': 'Visualización',
    'skill-cat-4': 'Nube y Plataformas',
    'resume-label': 'CV',
    'resume-title': 'El panorama completo.',
    'resume-download': 'Descargar PDF',
    'contact-label': 'Contacto',
    'contact-title': 'Construyamos algo.',
    'contact-sub': 'Abierto a prácticas, roles de tiempo completo y problemas de datos interesantes.<br>Si estás trabajando en algo que importa, hablemos.',
    'contact-email-label': 'Correo',
    'contact-linkedin-label': 'LinkedIn',
    'contact-github-label': 'GitHub',
    'contact-resume-label': 'CV',
    'contact-resume-value': 'Descargar PDF',
    'footer-text': '© 2026 Ulises Hernández Anaya. Construido con intención.',
  }
};

// ── LANGUAGE SWITCH ───────────────────────────────────────────────────────────
const resumeIframe   = document.getElementById('resume-iframe');
const resumeDownload = document.getElementById('resume-download');
const resumeTabs     = document.querySelectorAll('.resume-tab');
const contactResume  = document.getElementById('contact-resume-link');

function setLanguage(lang) {
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const isEn     = lang === 'en';
  const src      = isEn ? 'Ulises%20Hern%C3%A1ndez%20Resume.pdf' : 'Ulises%20Hern%C3%A1ndez%20CV.pdf';
  const filename = isEn ? 'Ulises Hernández Resume.pdf' : 'Ulises Hernández CV.pdf';

  resumeIframe.src      = src;
  resumeDownload.href   = src;
  resumeDownload.download = filename;
  resumeTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.src === src));

  if (contactResume) {
    contactResume.href     = src;
    contactResume.download = filename;
  }

  document.documentElement.lang = lang;
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
const hamburger   = document.getElementById('nav-hamburger');
const overlay     = document.getElementById('nav-overlay');
const overlayClose = document.getElementById('nav-overlay-close');

function openMenu()  { overlay.classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeMenu() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

hamburger.addEventListener('click', openMenu);
overlayClose.addEventListener('click', closeMenu);
overlay.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
