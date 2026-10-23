const tiltCards = document.querySelectorAll('.tilt-card');

for (const card of tiltCards) {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 14;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(12px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(12px)';
  });
}

const revealTargets = document.querySelectorAll('.glass-card, .project-card, .skill-card, .timeline-item');

const revealOnScroll = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(revealOnScroll, { threshold: 0.15 });

revealTargets.forEach((element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(22px)';
  element.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(element);
});

const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('chirag-portfolio-theme');

const setTheme = (theme) => {
  const isLight = theme === 'light';
  document.body.dataset.theme = isLight ? 'light' : 'dark';
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
  themeToggle.querySelector('.theme-toggle-icon').textContent = isLight ? '☾' : '☼';
  themeToggle.querySelector('.theme-toggle-label').textContent = isLight ? 'Dark theme' : 'Light theme';
};

setTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('chirag-portfolio-theme', nextTheme);
  setTheme(nextTheme);
});
