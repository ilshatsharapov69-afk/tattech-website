// Intersection Observer для появления секций при скролле.
// Применяется ко всем элементам с .reveal или .reveal-stagger.

const init = () => {
  const targets = document.querySelectorAll<HTMLElement>('.reveal, .reveal-stagger');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          // Set --i index on each child for stagger
          if (el.classList.contains('reveal-stagger')) {
            Array.from(el.children).forEach((child, i) => {
              (child as HTMLElement).style.setProperty('--i', String(i));
            });
          }
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach((el) => io.observe(el));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
