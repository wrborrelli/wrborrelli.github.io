// Scrollspy: observe `.page-section` elements and update nav + hero dynamically
document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('.page-section'));
  if (!sections.length) return;

  const options = { root: null, rootMargin: '0px', threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // mark active section
      sections.forEach((s) => s.classList.remove('active'));
      entry.target.classList.add('active');

      // update masthead nav active state
      const id = entry.target.id;
      if (id) {
        document.querySelectorAll('#site-nav .visible-links a').forEach((a) => {
          // consider both absolute and fragment links
          const href = a.getAttribute('href') || '';
          const url = href.split('#')[0];
          const frag = href.startsWith('#') ? href.slice(1) : url.replace(/^\//, '');
          a.classList.toggle('active', href === `#${id}` || href === `/${id}` || frag === id);
        });
      }

      // update hero tagline if the section provides one
      const heroTagEl = document.querySelector('.hero__tagline');
      const newHero = entry.target.dataset.hero;
      if (heroTagEl && newHero) {
        heroTagEl.textContent = newHero;
      }

      // if hero became active, ensure the typed hero starts
      if (entry.target.id === 'hero' && typeof window.startHeroTyping === 'function') {
        try { window.startHeroTyping(); } catch (e) { /* noop */ }
      }
    });
  }, options);

  sections.forEach((s) => observer.observe(s));
});

export {};
