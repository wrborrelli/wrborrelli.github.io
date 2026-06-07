const phrases = [
  'Research Software Developer',
  'Quantitative Modeler',
  'Python/C++ Programmer',
  'Data Scientist',
  'Simulation Engineer'
];

let el = null;
let cursor = null;
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let typingScheduled = false;

function tick() {
  if (!el) return;
  const current = phrases[phraseIndex];
  if (!deleting) {
    el.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(tick, 900);
      return;
    }
  } else {
    el.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(tick, deleting ? 40 : 80);
}

function startTyping() {
  el = document.getElementById('typed');
  cursor = document.querySelector('.hero .cursor');
  if (!el) {
    if (document.readyState === 'complete') {
      return;
    }
    setTimeout(startTyping, 100);
    return;
  }
  if (typingScheduled) return;
  typingScheduled = true;
  charIndex = 0;
  deleting = false;
  phraseIndex = 0;
  el.textContent = '';
  setTimeout(tick, 400);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startTyping);
} else {
  startTyping();
}

window.addEventListener('load', startTyping);
window.addEventListener('pageshow', startTyping);
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    startTyping();
  }
});

// Start typing when hero is visible using IntersectionObserver for robust first-load behavior
(() => {
  const tryInit = () => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return false;
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startTyping();
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });
      io.observe(heroEl);
    } else {
      startTyping();
    }
    return true;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { if (!tryInit()) startTyping(); });
  } else {
    if (!tryInit()) startTyping();
  }
})();

// make CTA buttons smooth-scroll when available
document.addEventListener('click', (e) => {
  const t = e.target.closest('a');
  if (!t) return;
  if (t.getAttribute('href') && t.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    const target = document.querySelector(t.getAttribute('href'));
    if (!target) return;
    // account for fixed masthead height so target sits flush beneath it
    const mast = document.querySelector('.masthead');
    const mastH = mast ? mast.getBoundingClientRect().height : 0;
    const docTop = window.scrollY || window.pageYOffset;
    const targetTop = docTop + target.getBoundingClientRect().top - mastH - 8; // small offset
    window.scrollTo({ top: Math.max(0, Math.round(targetTop)), behavior: 'smooth' });
  }
});

// expose for other modules to trigger typing reliably
window.startHeroTyping = startTyping;

export {};
