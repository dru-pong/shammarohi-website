// Load navbar
document.addEventListener('DOMContentLoaded', function() {
  // Load header
  fetch('assets/html/navbar.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('header').innerHTML = data;
          initializeNavbar();
          initializeSmoothScrolling();
      })
      .catch(error => console.error('Error loading navbar:', error));

  // Header scroll effect
  window.addEventListener('scroll', function() {
      const header = document.querySelector('.header');
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
      
      // Update active navigation link based on scroll position
      updateActiveNavLink();
  });

  // Initialize navbar functionality
  function initializeNavbar() {
      const hamburger = document.querySelector('.hamburger');
      const navList = document.querySelector('.nav-list');
      
      if (hamburger) {
          hamburger.addEventListener('click', function() {
              navList.classList.toggle('active');
              hamburger.classList.toggle('active');
          });
      }

      // Close mobile menu when clicking on a link
      document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', function() {
              navList.classList.remove('active');
              hamburger.classList.remove('active');
          });
      });
  }

  // Initialize smooth scrolling for all navigation links
  function initializeSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const targetId = this.getAttribute('href');
              
              if (targetId === '#') return;
              
              const target = document.querySelector(targetId);
              if (target) {
                  const headerHeight = document.querySelector('.header').offsetHeight;
                  const targetPosition = target.offsetTop - headerHeight;
                  
                  window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                  });
              }
          });
      });
  }

  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let currentSection = '';
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          const headerHeight = document.querySelector('.header').offsetHeight;
          
          if (window.scrollY >= (sectionTop - headerHeight - 50)) {
              currentSection = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSection}`) {
              link.classList.add('active');
          }
      });
  }

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form data
          const formData = new FormData(this);
          const name = formData.get('name');
          const email = formData.get('email');
          const subject = formData.get('subject');
          const message = formData.get('message');
          
          // Simple validation
          if (!name || !email || !subject || !message) {
              alert('Please fill in all fields');
              return;
          }
          
          // Here you would typically send the data to a server
          // For now, we'll just show a success message
          alert('Thank you for your message! We will get back to you soon.');
          this.reset();
      });
  }

  // Simple counter animation for stats
  function animateStats() {
      const stats = document.querySelectorAll('.stat-number');
      stats.forEach(stat => {
          const target = parseInt(stat.textContent);
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                  current = target;
                  clearInterval(timer);
              }
              stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
          }, 30);
      });
  }

  // Intersection Observer for animations
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              if (entry.target.classList.contains('stats')) {
                  animateStats();
              }
          }
      });
  }, observerOptions);

  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll('.service-card, .project-card, .about-preview-content, .testimonial-card');
  elementsToAnimate.forEach(el => observer.observe(el));
});

// Load footer
fetch('assets/html/footer.html')
.then(response => response.text())
.then(data => {
    // Create footer element if it doesn't exist
    let footerElement = document.querySelector('.footer');
    if (!footerElement) {
        footerElement = document.createElement('footer');
        footerElement.className = 'footer';
        document.body.appendChild(footerElement);
    }
    footerElement.innerHTML = data;
    
    // Initialize footer functionality
    initializeFooter();
})
.catch(error => console.error('Error loading footer:', error));
