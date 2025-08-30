(() => {
  const anchor = document.getElementById("letstalk") || document.querySelector('[data-component="LetsTalk"]');
  const ctaUrl = anchor?.dataset?.url || "mailto:hello@puttistudio.com";

  const markup = `
<section class="lets">
  <div class="lets-inner">
    <h2>Let’s talk…</h2>
    <p class="lets-lede">No obligation. Just a candid chat about your brand challenges and growth goals.</p>
    <a class="lets-cta" href="${ctaUrl}" target="_blank" rel="noopener">Tell us about your project</a>
    <p class="lets-email">Or email us directly <a href="mailto:hello@puttistudio.com">hello@puttistudio.com</a></p>
  </div>
</section>`;

  if (anchor) anchor.outerHTML = markup; else document.body.insertAdjacentHTML("beforeend", markup);
})();
