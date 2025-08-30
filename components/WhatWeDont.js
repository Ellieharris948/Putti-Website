(() => {
  const markup = `
<section class="whatwedont">
  <div class="wwd-grid">
    <!-- LEFT: media -->
    <div class="media-panel">
      <div class="comments">
        <img src="images/comments/c1.png" alt="comment 1">
        <img src="images/comments/c2.png" alt="comment 2">
        <img src="images/comments/c3.png" alt="comment 3">
      </div>

      <div class="phone-shell">
        <div class="phone-bezel">
          <div class="notch"></div>
          <video class="screen" src="videos/1.mov" autoplay muted loop playsinline></video>
        </div>

        <div class="pill-stack">
          <div class="pill">1.1M views</div>
          <div class="pill">Sold out</div>
          <div class="pill">22% ER</div>
        </div>
      </div>
    </div>

    <!-- RIGHT: copy -->
    <div class="dont-copy">
      <h2>What we DON’T do…</h2>
      <ul>
        <li>We DON’T just swap out logos on generic playbooks.</li>
        <li>We DON’T inflate results or present empty, 'shiny' numbers.</li>
        <li>We DON’T waste your budget on flashy creatives.</li>
      </ul>
    </div>
  </div>
</section>`;

  function mount() {
    // If there’s a chosen anchor, replace it. Otherwise append to <body>.
    const anchor =
      document.getElementById('whatwedont') ||
      document.querySelector('[data-component="WhatWeDont"]');
    if (anchor) {
      anchor.outerHTML = markup;
    } else {
      document.body.insertAdjacentHTML('beforeend', markup);
    }

    // Make sure video actually starts (some browsers need an explicit play call)
    const vid = document.querySelector('.whatwedont video');
    if (vid) { vid.muted = true; vid.play().catch(() => {}); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
