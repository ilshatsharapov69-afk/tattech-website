// Magnetic CTA effect: button gently follows cursor on hover.
// Skipped on touch devices and when prefers-reduced-motion is set.
// Apply by adding data-magnetic to any button/anchor.

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover)').matches;

if (!reduced && canHover) {
  const buttons = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  const tracked: Array<{ el: HTMLElement; rect: DOMRect | null }> = [];

  buttons.forEach((el) => {
    const entry = { el, rect: null as DOMRect | null };
    tracked.push(entry);

    let frame = 0;

    el.addEventListener('mouseenter', () => {
      entry.rect = el.getBoundingClientRect();
    });

    el.addEventListener('mouseleave', () => {
      entry.rect = null;
      cancelAnimationFrame(frame);
      el.style.transform = '';
    });

    el.addEventListener('mousemove', (event) => {
      const rect = entry.rect;
      if (!rect) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX - rect.left - rect.width / 2) * 0.2;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  });

  window.addEventListener(
    'resize',
    () => {
      tracked.forEach((t) => {
        t.rect = null;
      });
    },
    { passive: true }
  );
}
