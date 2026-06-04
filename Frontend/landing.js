// ── NAVBAR AU SCROLL ──
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(13, 13, 13, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 53, 0.15)';
  } else {
    navbar.style.background = 'rgba(13, 13, 13, 0.9)';
    navbar.style.boxShadow = 'none';
  }
});
// ── ANIMATION CARDS AU SCROLL ──
const cards = document.querySelectorAll('.feature-card');

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach(function(card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});