(() => {
  const markup = `
<section class="whatwedo">
  <div class="wwd-grid">
    <!-- LEFT: copy -->
    <div class="do-copy">
      <h2>What we DO do…</h2>
      <ul>
        <li>We DO rebuild brands with custom, targeted strategies.</li>
        <li>We DO deliver transparent results — the good, the bad, and the actionable.</li>
        <li>We DO craft campaigns that stick, designed to convert (real ROI, not just ‘likes’).</li>
      </ul>
    </div>

    <!-- RIGHT: media -->
    <div class="media-panel">
      <div class="comments">
        <img src="images/comments/c4.png" alt="comment 1">
        <img src="images/comments/c5.png" alt="comment 2">
        <img src="images/comments/c6.png" alt="comment 3">
      </div>

      <div class="phone-shell">
        <div class="phone-bezel">
          <div class="notch"></div>
          <video class="screen" src="videos/2.mp4" autoplay muted loop playsinline></video>
        </div>

        <!-- pills hang half over the LEFT edge of the phone -->
        <div class="pill-stack">
          <div class="pill">1.5M views</div>
          <div class="pill">251% growth</div>
          <div class="pill">24% ER</div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  function mount() {
    const anchor = document.getElementById('whatwedo') || document.querySelector('[data-component="WhatWeDo"]');
    if (anchor) anchor.outerHTML = markup; else document.body.insertAdjacentHTML('beforeend', markup);

    const vid = document.querySelector('.whatwedo video');
    if (vid) { vid.muted = true; vid.play().catch(() => {}); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
