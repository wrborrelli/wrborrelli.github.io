// Scroll-based page navigation: when user scrolls to top/bottom quickly,
// navigate to previous/next top-level nav link on the site.
let scrollCooldown = false;
const SCROLL_COOLDOWN_MS = 900;

function getNavLinks() {
  const links = Array.from(document.querySelectorAll('#site-nav .visible-links a'))
    .map(a => ({href: a.getAttribute('href'), el: a}));
  return links.filter(l => l.href && l.href !== '#');
}

function findCurrentIndex(links) {
  const loc = window.location.pathname.replace(/\/$/, '');
  for (let i = 0; i < links.length; i++) {
    try {
      const u = new URL(links[i].href, window.location.origin);
      const p = u.pathname.replace(/\/$/, '');
      if (p === loc || (p === '' && loc === '')) return i;
    } catch (e) { continue; }
  }
  return -1;
}

function navigateToIndex(i, links) {
  if (i < 0 || i >= links.length) return;
  const href = links[i].href;
  if (!href) return;
  window.location.href = href;
}

function onWheel(e) {
  if (scrollCooldown) return;
  const delta = e.deltaY;
  const links = getNavLinks();
  if (!links.length) return;
  const idx = findCurrentIndex(links);
  if (idx === -1) return;

  // When scrolling down fast near page bottom, go to next page
  if (delta > 0 && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 20)) {
    navigateToIndex(idx + 1, links);
    scrollCooldown = true;
    setTimeout(() => scrollCooldown = false, SCROLL_COOLDOWN_MS);
  }
  // When scrolling up fast near page top, go to previous page
  else if (delta < 0 && window.scrollY <= 20) {
    navigateToIndex(idx - 1, links);
    scrollCooldown = true;
    setTimeout(() => scrollCooldown = false, SCROLL_COOLDOWN_MS);
  }
}

// Keyboard navigation: PageDown/PageUp, j/k
function onKey(e) {
  const links = getNavLinks();
  if (!links.length) return;
  const idx = findCurrentIndex(links);
  if (idx === -1) return;
  if (e.key === 'PageDown' || e.key === 'j') {
    navigateToIndex(idx + 1, links);
  } else if (e.key === 'PageUp' || e.key === 'k') {
    navigateToIndex(idx - 1, links);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('wheel', onWheel, {passive: true});
  window.addEventListener('keydown', onKey);
});

export {};
