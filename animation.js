(function () {
  const green = '#c7ff61';
  const black = '#000000';

  const slides = [
    { bg: green, textColor: black, text: { h1: 'Putti Studio', p: '' } },
    { bg: black, textColor: green, text: { h1: 'Your strategic brand & marketing agency.', p: '' } },
    { bg: green, textColor: black, text: { h1: 'Designed to feel.', p: '' } },
    { bg: black, textColor: green, text: { h1: 'Crafted to convert.', p: '' } },
    { bg: green, textColor: black, text: { h1: 'Putti Studio.', p: 'Modelling Brands from the inside out.' } }
  ];

  const bgCurrent = document.querySelector('.paint-bg.current');
  const paintLayer = document.getElementById('paintLayer');
  const paintH1 = document.getElementById('paintH1');
  const paintP = document.getElementById('paintP');
  const paintH1Next = document.getElementById('paintH1Next');
  const paintPNext = document.getElementById('paintPNext');
  const svg = document.getElementById('paint-svg');

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function setSlide(slide) {
    bgCurrent.style.background = slide.bg;
    paintH1.textContent = slide.text.h1;
    paintP.textContent = slide.text.p;
    paintH1.style.color = slide.textColor;
    paintP.style.color = slide.textColor;
  }

  async function runSequence() {
    setSlide(slides[0]);
    for (let i = 1; i < slides.length; i++) {
      await wait(300);
      await paintWipe(slides[i]);
    }
  }

  function paintWipe(nextSlide) {
    return new Promise(resolve => {
      paintH1Next.textContent = nextSlide.text.h1;
      paintPNext.textContent = nextSlide.text.p;
      paintH1Next.style.color = nextSlide.textColor;
      paintPNext.style.color = nextSlide.textColor;

      paintLayer.innerHTML = '';

      const visualPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      visualPath.setAttribute('fill', nextSlide.bg);
      paintLayer.appendChild(visualPath);

      const duration = 1800; // slightly faster
      const start = performance.now();
      const vertical = Math.random() > 0.5;

      function wave(progress01) {
        const cols = 20;
        const amp = 0.05;
        const freq = 5;
        let d = vertical ? `M0,0 V${progress01.toFixed(4)} ` : `M0,0 H${progress01.toFixed(4)} `;
        for (let i = 0; i <= cols; i++) {
          const pos = i / cols;
          const wobble = Math.sin((pos * freq) + performance.now() / 900) * amp;
          const main = Math.max(0, Math.min(1, progress01 + wobble));
          d += vertical
            ? `L${pos.toFixed(4)},${main.toFixed(4)} `
            : `L${main.toFixed(4)},${pos.toFixed(4)} `;
        }
        d += vertical ? 'L1,0 Z' : 'L0,1 Z';
        return d;
      }

      function visual(progress01) {
        const w = svg.viewBox.baseVal.width || 100;
        const h = svg.viewBox.baseVal.height || 100;
        const cols = 30;
        const ampPx = (vertical ? w : h) * 0.05;
        const freq = 5;
        let d = vertical
          ? `M0,0 V${(progress01 * h).toFixed(2)} `
          : `M0,0 H${(progress01 * w).toFixed(2)} `;
        for (let i = 0; i <= cols; i++) {
          const pos = (i / cols) * (vertical ? w : h);
          const wobble = Math.sin((pos / (vertical ? w : h) * freq) + performance.now() / 900) * ampPx;
          const main = Math.max(0, Math.min(vertical ? h : w, (progress01 * (vertical ? h : w)) + wobble));
          d += vertical
            ? `L${pos.toFixed(2)},${main.toFixed(2)} `
            : `L${main.toFixed(2)},${pos.toFixed(2)} `;
        }
        d += vertical ? `L${w},0 Z` : `L0,${h} Z`;
        return d;
      }

      function step(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);

        visualPath.setAttribute('d', visual(eased));

        // sync text reveal with wipe
        const revealPercent = eased * 100;
        document.querySelector('.text-reveal').style.clipPath =
          vertical
            ? `inset(0 0 ${100 - revealPercent}% 0)`
            : `inset(0 ${100 - revealPercent}% 0 0)`;

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          setSlide(nextSlide);
          document.querySelector('.text-reveal').style.clipPath = 'none';
          paintLayer.innerHTML = '';
          resolve();
        }
      }

      document.querySelector('.text-reveal').style.clipPath =
        vertical ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)';
      requestAnimationFrame(step);
    });
  }

  runSequence();
})();
