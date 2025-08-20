(function () {
  const root = document.querySelector('#why');
  if (!root) return;

  const pills  = Array.from(root.querySelectorAll('.why-pills .pill'));
  const cards  = Array.from(root.querySelectorAll('.why-card'));
  const stage  = root.querySelector('.why-stage');

  let current = 0;

  // Place cards for the first time
  function init() {
    stage.classList.add('why-stage--measured');
    setActive(0);
    // Resize stage to tallest card (so layout doesn't jump)
    requestAnimationFrame(resizeStage);
    window.addEventListener('resize', resizeStage);
  }

  function resizeStage() {
    const h = Math.max(...cards.map(c => c.offsetHeight));
    stage.style.height = h + 'px';
  }

  function posOf(idx) {
    const total = pills.length;
    if (idx === current) return 'center';
    const diff = (idx - current + total) % total;
    if (diff === 1) return 'right';
    if (diff === total - 1) return 'left';
    return 'off';
  }

  function setActive(i) {
    current = i;

    pills.forEach((p, idx) => {
      p.setAttribute('aria-selected', String(idx === i));
    });

    cards.forEach((c, idx) => {
      const pos = posOf(idx);
      c.hidden = false; // ensure visible for positioning
      c.classList.remove('is-left', 'is-right', 'is-center');
      if (pos === 'center') c.classList.add('is-center');
      else if (pos === 'left') c.classList.add('is-left');
      else if (pos === 'right') c.classList.add('is-right');
      // hide non-center for screen readers
      c.setAttribute('aria-hidden', String(pos !== 'center'));
      if (window.matchMedia('(max-width: 640px)').matches) {
        c.hidden = pos !== 'center';
      }
    });

    resizeStage();
  }

  pills.forEach((p, idx) => {
    p.addEventListener('click', () => setActive(idx));
    p.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') setActive((current + 1) % pills.length);
      if (e.key === 'ArrowLeft')  setActive((current - 1 + pills.length) % pills.length);
    });
  });

  init();
})();
