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
  if (counters.length === 0) return;

  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      el.textContent = target.toString() + (el.dataset.suffix ?? '');
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as CounterEl);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  counters.forEach((el) => io.observe(el));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
