(() => {
  const points = [
    {
      title: "Industry Specialists",
      desc:
        "We bring together a curated network of experts. This allows us to craft hyper-personalised strategies, moulded from deep analysis of consumer insights—understanding not just what resonates, but why."
    },
    {
      title: "Personalised Approach",
      desc:
        "We embed deeply, moulding your brand from the inside. We only advise on services truly aligned with your goals. Transparent partnership means breaking down what works (and what doesn't) to constantly refine."
    },
    {
      title: "Human-led Creative",
      desc:
        "We delve into human psychology to create content that genuinely connects. Built to feel—and crafted to convert. Purposeful ideas that move people and drive action, not just fleeting trends."
    }
  ];

  const markup = `
<section class="whyus">
  <div class="why-grid">
    <div class="why-left">
      <h2 class="why-title">Why us…</h2>
      <p class="why-desc" hidden></p>
    </div>
    <div class="why-right">
      ${points.map(p => `
        <button class="why-pill" data-desc="${p.desc.replace(/"/g,'&quot;')}">
          <span>${p.title}</span>
        </button>`).join('')}
    </div>
  </div>
</section>`;

  function mount() {
    const anchor = document.getElementById("why") || document.querySelector('[data-component="Why"]');
    if (anchor) anchor.outerHTML = markup; else document.body.insertAdjacentHTML("beforeend", markup);

    const left   = document.querySelector(".why-left");
    const title  = left.querySelector(".why-title");
    const descEl = left.querySelector(".why-desc");
    const pills  = [...document.querySelectorAll(".why-pill")];
    const panel  = document.querySelector(".why-right");

    const HIDE_DELAY_MS = 150;   // <- linger time
    let hideTimer = null;

    const cancelHide = () => { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } };
    const show = txt => {
      cancelHide();
      descEl.textContent = txt;
      title.hidden = true;
      descEl.hidden = false;
    };
    const scheduleHide = () => {
      cancelHide();
      hideTimer = setTimeout(() => {
        title.hidden = false;
        descEl.hidden = true;
      }, HIDE_DELAY_MS);
    };

    // Hover/focus handling with delay on leave
    pills.forEach(btn => {
      btn.addEventListener("mouseenter", () => show(btn.dataset.desc));
      btn.addEventListener("focus",     () => show(btn.dataset.desc));
      // leaving a pill doesn't immediately hide; the panel's mouseenter will cancel if moving to the next pill
      btn.addEventListener("mouseleave", scheduleHide);
      btn.addEventListener("blur",      scheduleHide);
      // Touch: tap toggles
      btn.addEventListener("click", () => {
        if (!descEl.hidden && descEl.textContent === btn.dataset.desc) scheduleHide();
        else show(btn.dataset.desc);
      });
    });

    // Moving between pills keeps description up
    panel.addEventListener("mouseenter", cancelHide);
    panel.addEventListener("mouseleave", scheduleHide);

    // Click outside clears it on touch
    document.querySelector(".whyus").addEventListener("click", e => {
      if (!e.target.closest(".why-pill")) scheduleHide();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
