/* ===== Portfolio - Gokul P | Full Stack Developer ===== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroNameLetters();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initTestimonialSlider();
  initContactForm();
  initParallaxShapes();
  initSmoothScroll();
});

/* Split hero name into animated letters */
function initHeroNameLetters() {
  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;
  const text = heroName.textContent;
  heroName.innerHTML = text.split('').map((char, i) => 
    `<span class="char" style="animation-delay: ${0.3 + i * 0.08}s">${char}</span>`
  ).join('');
}

/* Navbar scroll effect */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* Mobile menu toggle */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu?.classList.toggle('active');
    document.body.style.overflow = menu?.classList.contains('active') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      toggle?.classList.remove('active');
      menu?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* Scroll-triggered reveal animations */
function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        section.querySelectorAll('.reveal').forEach((el, i) => {
          el.classList.add('visible');
        });
        
        if (section.querySelector('.skills-grid')) {
          section.querySelectorAll('.skill-card').forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.1}s`;
          });
        }
        
        if (section.querySelector('.projects-grid')) {
          section.querySelectorAll('.project-card').forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.15}s`;
          });
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-title').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.about-grid').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.skills-grid').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.classList.add(`reveal-delay-${(i % 4) + 1}`);
  });
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${i * 0.15}s`;
  });
  document.querySelectorAll('.projects-grid').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.services-grid').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.education-grid').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.education-card').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.testimonials-slider').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.contact-content').forEach(el => el.classList.add('reveal'));

  document.querySelectorAll('section').forEach(section => observer.observe(section));
}

/* Skill bar fill animation */
function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const percent = entry.target.dataset.skill;
        const bar = entry.target.querySelector('.skill-bar');
        if (bar) bar.style.width = `${percent}%`;
      }
    });
  }, { threshold: 0.3 });

  skillCards.forEach(card => skillObserver.observe(card));
}

/* Counter animation for stats */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target, 10);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}

function animateCounter(element, target) {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);
    element.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = target;
  }

  requestAnimationFrame(update);
}

/* Testimonial slider */
function initTestimonialSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (cards.length < 2) return;

  let currentIndex = 0;

  setInterval(() => {
    cards[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % cards.length;
    cards[currentIndex].classList.add('active');
  }, 5000);
}

/* Contact form submission */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

/* Parallax effect on hero shapes */
function initParallaxShapes() {
  const shapes = document.querySelectorAll('.shape');
  const hero = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = hero?.offsetHeight || 800;
    
    if (scrolled < heroHeight) {
      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 0.05;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }
  }, { passive: true });
}

/* Smooth scroll for anchor links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}