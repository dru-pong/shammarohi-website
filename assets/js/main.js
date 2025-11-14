
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
  
 