(() => {
  const items = [
    { title: "Social and content strategy",
      desc: "Engaging content and a roadmap for social platforms that truly resonate and convert." },
    { title: "Digital Ad Creative",
      desc: "High-impact visuals and copy built specifically for your digital ad campaigns." },
    { title: "Influencer Marketing",
      desc: "Data-driven campaigns crafted to deliver measurable results and tangible ROI." },
    { title: "Brand strategy",
      desc: "We define your purpose, position, and path forward. Your brand’s blueprint for growth." },
    { title: "Brand identity",
      desc: "More than a logo — we craft your brand’s unique visual and verbal presence." },
    { title: "Performance marketing",
      desc: "Data-driven campaigns crafted to deliver measurable results and tangible ROI." },
  ];

  const markup = `
  <section class="squares">
    <div class="sq-wrap">
      <button class="sq-arrow sq-prev" aria-label="Previous" type="button"><span>←</span></button>

      <div class="sq-viewport" role="region" aria-roledescription="carousel">
        <ul class="sq-track">
          ${items.map(it => `
            <li class="sq-card">
              <div class="sq-face sq-title"><h4>${it.title}</h4></div>
              <div class="sq-face sq-desc"><p>${it.desc}</p></div>
            </li>`).join("")}
        </ul>
      </div>

      <button class="sq-arrow sq-next" aria-label="Next" type="button"><span>→</span></button>
    </div>
  </section>`;

  function mount() {
    const anchor = document.getElementById("squares") || document.querySelector('[data-component="Squares"]');
    if (anchor) anchor.outerHTML = markup; else document.body.insertAdjacentHTML("beforeend", markup);

    const track = document.querySelector(".sq-track");
    const prev  = document.querySelector(".sq-prev");
    const next  = document.querySelector(".sq-next");
    const cards = [...document.querySelectorAll(".sq-card")];

    let step = 0;
    let animating = false;

    function measure() {
      const first = track.querySelector(".sq-card");
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.gap || styles.columnGap || 0) || 0;
      step = (first?.getBoundingClientRect().width || 0) + gap;
    }
    measure();
    window.addEventListener("resize", measure);

    const ease = "cubic-bezier(.22,.61,.36,1)";

    function slide(dir) {
      if (animating) return;
      animating = true;

      // PREV: pre-shift last → front, start offset, animate to 0 (smooth)
      if (dir < 0) {
        track.style.transition = "none";
        track.insertBefore(track.lastElementChild, track.firstElementChild);
        track.style.transform = `translateX(${-step}px)`;
        requestAnimationFrame(() => {
          track.style.transition = `transform 450ms ${ease}`;
          track.style.transform = "translateX(0)";
          track.addEventListener("transitionend", () => {
            track.style.transition = "none";
            animating = false;
          }, { once: true });
        });
        return;
      }

      // NEXT: animate to -step, then move first → end and reset (no flash)
      track.style.transition = `transform 450ms ${ease}`;
      track.style.transform = `translateX(${-step}px)`;
      track.addEventListener("transitionend", () => {
        track.style.transition = "none";
        track.appendChild(track.firstElementChild);
        track.style.transform = "translateX(0)";
        // allow next tick
        requestAnimationFrame(() => { animating = false; });
      }, { once: true });
    }

    prev.addEventListener("click", () => slide(-1));
    next.addEventListener("click", () => slide(1));

    // Touch devices: tap toggles description (since there's no hover)
    if (window.matchMedia("(hover: none)").matches) {
      cards.forEach(card => {
        card.addEventListener("click", () => card.classList.toggle("is-desc"));
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
