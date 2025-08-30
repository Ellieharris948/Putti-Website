(() => {
  const markup = `
  <div class="howitworks">
    <div class="hiw-grid">
      <!-- LEFT: big title + bonus -->
      <div class="hiw-left">
        <h2>How it works…</h2>
        <p class="hiw-bonus"><strong>Bonus:</strong> Your audit is free when you sign up for execution.</p>
      </div>

      <!-- Center divider -->
      <div class="hiw-divider" aria-hidden="true"></div>

      <!-- RIGHT: two paths -->
      <div class="hiw-right">
        <div class="hiw-block">
          <h3>No Strategy?</h3>
          <p><strong>No Problem.</strong> We build your core brand strategy, then execute it flawlessly.</p>
        </div>

        <div class="hiw-block">
          <h3>Strategy in Place?</h3>
          <p><strong>Great.</strong> We audit your current approach, tighten your core, and launch straight into execution.</p>
        </div>
      </div>
    </div>
  </div>`;

  function mount() {
    const anchor = document.getElementById('howitworks');
    if (anchor) anchor.outerHTML = markup;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
