/* Navbar mobile toggle */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/* Active link highlighting on scroll */
const sections = ['hero','other','graphics','resume','blog','photography','about','portfolio','contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));

function setActiveLink() {
  let currentId = '';
  const scrollY = window.scrollY + 120; // offset below sticky nav
  for (const section of sections) {
    if (section.offsetTop <= scrollY && (section.offsetTop + section.offsetHeight) > scrollY) {
      currentId = section.id;
      break;
    }
  }
  navAnchors.forEach(a => {
    const href = a.getAttribute('href') || '';
    const id = href.startsWith('#') ? href.slice(1) : '';
    a.classList.toggle('active', id === currentId);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', setActiveLink);

/* Footer year */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* Contact form (client-side only) */
const form = document.querySelector('.contact-form');
const statusEl = document.querySelector('.form-status');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    if (!name || !email || !message) {
      if (statusEl) statusEl.textContent = 'Please complete all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (statusEl) statusEl.textContent = 'Please enter a valid email.';
      return;
    }
    if (statusEl) statusEl.textContent = 'Thanks! Your message has been noted.';
    form.reset();
  });
}

/* GSAP Scroll-triggered animations */
window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero leaves sprout
    const leaves = gsap.utils.toArray('.leaf');
    gsap.set(leaves, { opacity: 0, scale: 0.4, rotate: -25, y: 20 });
    gsap.to(leaves, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: 0.08,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top 70%',
      }
    });

    // Section reveal animations
    const revealEls = gsap.utils.toArray('.section, .card, .section-header');
    revealEls.forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        }
      });
    });

    // Subtle parallax in hero 3/4 circle
    const circle = document.querySelector('.three-quarter-circle');
    if (circle) {
      gsap.to(circle, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }
});


