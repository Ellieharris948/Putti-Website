(() => {
  const anchor = document.getElementById("footer") || document.querySelector('[data-component="Footer"]');
  const markup = `
<footer class="site-footer">
  <div class="foot-inner">
    <p class="foot-tagline">Designed to feel. Crafted to Convert.</p>
    <nav class="foot-social" aria-label="Social">
      <a class="icon-btn" href="https://www.linkedin.com/in/katie-harris-2b5857148/" target="_blank" rel="noopener" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="2" width="20" height="20" rx="4"></rect>
          <path d="M8 17v-6"></path><circle cx="8" cy="8" r="1.5"></circle>
          <path d="M12 17v-3a3 3 0 0 1 6 0v3"></path>
        </svg>
      </a>
      <a class="icon-btn" href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="2" width="20" height="20" rx="6"></rect>
          <circle cx="12" cy="12" r="4.2"></circle>
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"></circle>
        </svg>
      </a>
    </nav>
  </div>
</footer>`;

  if (anchor) anchor.outerHTML = markup; else document.body.insertAdjacentHTML("beforeend", markup);
})();
