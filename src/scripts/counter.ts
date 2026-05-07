// Анимированный счётчик для статистики.
// Запускается один раз при попадании в viewport.

type CounterEl = HTMLElement & { dataset: { target: string; suffix?: string; duration?: string } };

const animateCounter = (el: CounterEl) => {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix ?? '';
  const duration = parseInt(el.dataset.duration ?? '1500', 10);
  const start = performance.now();

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toString() + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target.toString() + suffix;
  };

  requestAnimationFrame(tick);
};

const init = () => {
  const counters = document.querySelectorAll<CounterEl>('[data-counter]');
  const grid = document.querySelector<HTMLElement>('.stats-grid');
  if (counters.length === 0 || !grid) return;

  const finalize = () => {
    grid.classList.add('is-visible');
    counters.forEach((el) => setTimeout(() => animateCounter(el), 1100));
  };

  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finalize();
    return;
  }

  // Observe the grid itself (large target) instead of small counter spans,
  // so the trigger reliably fires on mobile viewports too. Modest threshold
  // + tiny negative rootMargin keeps it from firing while still in Hero.
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          finalize();
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
  );

  io.observe(grid);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
