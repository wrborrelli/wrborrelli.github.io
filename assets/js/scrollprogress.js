// Scroll progress sidebar: shows progress through page sections and allows jumping
document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('.page-section'));
  if (!sections.length) return;

  const container = document.createElement('div');
  container.className = 'scroll-progress';

  sections.forEach((s, i) => {
    const seg = document.createElement('button');
    seg.className = 'scroll-progress__seg';
    seg.setAttribute('aria-label', `Go to section ${i+1}`);
    seg.addEventListener('click', () => s.scrollIntoView({ behavior: 'smooth' }));
    const fill = document.createElement('span');
    fill.className = 'scroll-progress__fill';
    seg.appendChild(fill);
    container.appendChild(seg);
  });

  document.body.appendChild(container);

  function update() {
    let activeIndex = 0;
    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      if (rect.top <= mid && rect.bottom >= mid) activeIndex = i;
    });

    sections.forEach((s, i) => {
      const seg = container.children[i];
      seg.classList.toggle('active', i === activeIndex);
      // compute progress within section
      const rect = sections[activeIndex].getBoundingClientRect();
      const height = rect.height || 1;
      const offset = Math.min(Math.max((window.innerHeight - rect.top) / height, 0), 1);
      const fill = container.children[activeIndex].querySelector('.scroll-progress__fill');
      if (fill) fill.style.height = `${Math.round(offset * 100)}%`;
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  // initial
  update();
});

export {};
