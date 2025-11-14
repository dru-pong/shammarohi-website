/*
//  Load navbar dynamically
fetch('assets/html/navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;

    // Activate hamburger toggle after navbar is loaded
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }

    // Optional: Highlight the current page
    const currentPage = location.pathname.split("/").pop();
    document.querySelectorAll('.nav-links li a').forEach(link => {
      if(link.getAttribute('href') === currentPage){
        link.classList.add('active');
      }
    });
  })
  .catch(err => console.error('Navbar loading failed:', err));
  */
 /**
* Template Name: BuildRight - Construction Company Template
* Modified from Presento - v3.7.0
* Author: BuildRight Constructors
* License: https://bootstrapmade.com/license/
*/
(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      if (!header.classList.contains('header-scrolled')) {
        offset -= 16
      }
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Partners/Clients Slider for Construction Company
     */
    new Swiper('.partners-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 60
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 80
        },
        992: {
          slidesPerView: 6,
          spaceBetween: 120
        }
      }
    });
  
    /**
     * Projects isotope and filter for Construction Portfolio
     */
    window.addEventListener('load', () => {
      let projectsContainer = select('.projects-container');
      if (projectsContainer) {
        let projectsIsotope = new Isotope(projectsContainer, {
          itemSelector: '.project-item',
          layoutMode: 'fitRows'
        });
  
        let projectFilters = select('#project-filters li', true);
  
        on('click', '#project-filters li', function(e) {
          e.preventDefault();
          projectFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          projectsIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          projectsIsotope.on('arrangeComplete', function() {
            AOS.refresh()
          });
        }, true);
      }
  
    });
  
    /**
     * Initiate project gallery lightbox 
     */
    const projectGallery = GLightbox({
      selector: '.project-gallery'
    });
  
    /**
     * Project details slider
     */
    new Swiper('.project-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  
    /**
     * Testimonials slider for Client Reviews
     */
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  
    /**
     * Construction Progress Timeline
     */
    new Swiper('.timeline-slider', {
      speed: 600,
      loop: false,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  
    /**
     * Safety Standards Gallery
     */
    new Swiper('.safety-gallery', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      slidesPerView: 1,
      effect: 'fade',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  
    /**
     * Quote Calculator Functionality
     */
    const initQuoteCalculator = () => {
      const quoteForm = select('#quote-calculator');
      if (quoteForm) {
        const projectType = select('#project-type');
        const squareFootage = select('#square-footage');
        const duration = select('#project-duration');
        const estimateDisplay = select('#cost-estimate');
        
        const calculateEstimate = () => {
          const baseRates = {
            'residential': 150,
            'commercial': 200,
            'renovation': 120,
            'industrial': 180
          };
          
          const type = projectType.value;
          const area = parseFloat(squareFootage.value) || 0;
          const time = parseFloat(duration.value) || 1;
          
          if (type && area > 0) {
            const baseCost = baseRates[type] * area;
            const timeMultiplier = time < 6 ? 1.2 : time < 12 ? 1 : 0.9;
            const totalEstimate = baseCost * timeMultiplier;
            
            estimateDisplay.textContent = `$${totalEstimate.toLocaleString()}`;
          } else {
            estimateDisplay.textContent = '$0';
          }
        };
        
        on('change', '#project-type', calculateEstimate);
        on('input', '#square-footage', calculateEstimate);
        on('change', '#project-duration', calculateEstimate);
      }
    };
  
    /**
     * Project Counter Animation
     */
    const initProjectCounters = () => {
      const counters = select('.project-counter', true);
      let started = false;
  
      const startCounters = () => {
        if (started) return;
        started = true;
        
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // 2 seconds
          const step = target / (duration / 16); // 60fps
          let current = 0;
          
          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.ceil(current).toLocaleString();
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString();
            }
          };
          
          updateCounter();
        });
      };
  
      // Start counters when they come into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCounters();
          }
        });
      }, { threshold: 0.5 });
  
      if (counters.length > 0) {
        observer.observe(counters[0].closest('.counters-section') || counters[0]);
      }
    };
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
      
      // Initialize construction-specific features
      initQuoteCalculator();
      initProjectCounters();
    });
  
  })();