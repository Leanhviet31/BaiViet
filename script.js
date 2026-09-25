document.addEventListener('DOMContentLoaded', function() {

  // 1. Reading Progress Bar
  const progressBar = document.getElementById('reading-progress');
  window.addEventListener('scroll', updateProgress);
  function updateProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }

  // 2. Sticky Header
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // 3. Back to Top
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // 4. Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-close');
  if (hamburger) hamburger.addEventListener('click', () => overlay.classList.add('active'));
  if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });

  // 5. TOC: smooth scroll + active highlight
  const tocLinks = document.querySelectorAll('.toc-list a');
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
               top: offsetPosition,
               behavior: "smooth"
          });
      }
    });
  });

  // TOC active state on scroll
  const sections = document.querySelectorAll('.article-section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
    });
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // 6. FAQ toggle (expand/collapse)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (q && a) {
      // Start with answers hidden initially from CSS but allow toggle
      q.style.cursor = 'pointer';
      q.addEventListener('click', () => {
        const isHidden = window.getComputedStyle(a).display === 'none';
        a.style.display = isHidden ? 'block' : 'none';
      });
    }
  });

});
