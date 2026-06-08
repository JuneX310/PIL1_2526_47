// ===========================
// SCROLL FADE-UP ANIMATION
// ===========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// ===========================
// NAV ACTIVE LINK
// ===========================
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.nav-links a').forEach((l) => l.classList.remove('active'));
    this.classList.add('active');
  });
});