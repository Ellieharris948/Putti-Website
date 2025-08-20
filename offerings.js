(() => {
  const offersWrap = document.getElementById('offers');
  const list = offersWrap?.querySelector('.offer-list');
  const detail = offersWrap?.querySelector('.offer-detail');
  const titleEl = offersWrap?.querySelector('.offer-title');
  const textEl  = offersWrap?.querySelector('.offer-text');

  if (!offersWrap || !list || !detail || !titleEl || !textEl) return;

  let activeLi = null;
  let touchToggle = false;

  function show(li) {
    if (!li) return;
    titleEl.textContent = li.getAttribute('data-title') || li.textContent.trim();
    textEl.textContent  = li.getAttribute('data-copy')  || '';
    list.querySelectorAll('li').forEach(el => el.classList.remove('is-active'));
    li.classList.add('is-active');
    offersWrap.classList.add('show-detail');
    activeLi = li;
  }

  function hide() {
    offersWrap.classList.remove('show-detail');
    list.querySelectorAll('li').forEach(el => el.classList.remove('is-active'));
    activeLi = null;
  }

  list.querySelectorAll('li').forEach(li => {
    li.setAttribute('tabindex', '0');

    li.addEventListener('mouseenter', () => { if (!touchToggle) show(li); });
    li.addEventListener('focus', () => show(li));

    li.addEventListener('mouseleave', () => { if (!touchToggle) hide(); });
    li.addEventListener('blur', hide);

    // Tap to toggle on touch devices
    li.addEventListener('click', (e) => {
      e.preventDefault();
      touchToggle = true;
      if (activeLi === li && offersWrap.classList.contains('show-detail')) {
        hide();
      } else {
        show(li);
      }
    });
  });

  offersWrap.addEventListener('mouseleave', () => { if (!touchToggle) hide(); });

  document.addEventListener('click', (e) => {
    if (!offersWrap.contains(e.target)) { touchToggle = false; hide(); }
  }, true);
})();
