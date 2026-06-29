// Nav scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Resume language toggle
const resumeTabs = document.querySelectorAll('.resume-tab');
const resumeIframe = document.getElementById('resume-iframe');
const resumeDownload = document.getElementById('resume-download');

resumeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    resumeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    resumeIframe.src = tab.dataset.src;
    resumeDownload.href = tab.dataset.src;
    resumeDownload.download = tab.dataset.filename;
  });
});

// Hamburger menu
const hamburger = document.getElementById('nav-hamburger');
const overlay = document.getElementById('nav-overlay');
const overlayClose = document.getElementById('nav-overlay-close');

function openMenu() {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
overlayClose.addEventListener('click', closeMenu);
overlay.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));