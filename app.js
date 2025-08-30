(() => {
  const rail = document.querySelector('.squares-rail');
  if (!rail) return;

  const prev = document.getElementById('prevSquares');
  const next = document.getElementById('nextSquares');

  const items = Array.from(rail.children);
  let startIndex = 0;

  function visibleCount() {
    const railWidth = rail.clientWidth;
    const firstWidth = items[0].clientWidth + parseFloat(getComputedStyle(rail).gap || 16);
    return Math.max(1, Math.min(items.length, Math.floor(railWidth / firstWidth)));
  }

  function update() {
    const vis = visibleCount();
    const gap = parseFloat(getComputedStyle(rail).gap || 16);
    const itemWidth = items[0].clientWidth;
    const x = (itemWidth + gap) * startIndex;
    rail.style.transform = `translateX(${-x}px)`;

    prev.disabled = startIndex === 0;
    next.disabled = startIndex >= items.length - vis;
  }

  next.addEventListener('click', () => {
    const vis = visibleCount();
    if (startIndex < items.length - vis) {
      startIndex += 1;
      update();
    }
  });
  prev.addEventListener('click', () => {
    if (startIndex > 0) {
      startIndex -= 1;
      update();
    }
  });

  window.addEventListener('resize', update, { passive: true });
  update();
})();

document.querySelectorAll('video[autoplay][muted]').forEach(v => {
  v.setAttribute('playsinline', '');
  v.play().catch(() => {});
});

document.querySelectorAll('.vstrip').forEach(s => {
  s.addEventListener('mouseenter', () => s.style.animationPlayState = 'paused');
  s.addEventListener('mouseleave', () => s.style.animationPlayState = 'running');
});
