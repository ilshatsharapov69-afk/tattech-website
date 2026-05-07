// Mouse-tracking: writes pointer position into --mx/--my CSS variables.
// Used by:
//   - .has-glow sections (Services / Programs / FAQ) → radial-gradient overlay in global.css
//   - .hero → mask-image spotlight on .dots layer in Hero.astro
//
// Skipped on touch devices and when prefers-reduced-motion is set.

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!reduced && canHover) {
  const targets = document.querySelectorAll<HTMLElement>('.has-glow, .hero');
  targets.forEach((target) => {
    target.addEventListener(
      'pointermove',
      (event) => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        target.style.setProperty('--my', `${event.clientY - rect.top}px`);
      },
      { passive: true }
    );
  });
}
