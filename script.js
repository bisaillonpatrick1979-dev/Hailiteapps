const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const langButton = document.getElementById('langBtn');
const year = document.getElementById('year');

let currentLanguage = localStorage.getItem('hailiteapps-language') || 'fr';

function closeMenu() {
  nav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

function applyLanguage(language) {
  currentLanguage = language === 'en' ? 'en' : 'fr';
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-fr][data-en]').forEach((element) => {
    const value = element.dataset[currentLanguage];
    if (value) element.textContent = value;
  });

  if (langButton) {
    langButton.textContent = currentLanguage === 'fr' ? 'EN' : 'FR';
    langButton.setAttribute(
      'aria-label',
      currentLanguage === 'fr' ? 'Switch to English' : 'Passer au français'
    );
  }

  localStorage.setItem('hailiteapps-language', currentLanguage);
}

menuButton?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open') || false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

langButton?.addEventListener('click', () => {
  applyLanguage(currentLanguage === 'fr' ? 'en' : 'fr');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});

if (year) year.textContent = String(new Date().getFullYear());
applyLanguage(currentLanguage);