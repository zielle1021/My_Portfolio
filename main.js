// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation functionality
    initNavigation();
    
    // Initialize skill progress animation
    initSkillProgressAnimation();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize contact form
    initContactForm();
});

// Handle navigation functionality
function initNavigation() {
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const navbarLinks = document.querySelectorAll('#navbar a');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    
    // Handle scrolling effect on header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle
    mobileNavToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        mobileNavToggle.querySelector('i').classList.toggle('fa-bars');
        mobileNavToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Handle navigation click
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only for internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Get the target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile nav if open
                    if (navbar.classList.contains('active')) {
                        navbar.classList.remove('active');
                        mobileNavToggle.querySelector('i').classList.remove('fa-times');
                        mobileNavToggle.querySelector('i').classList.add('fa-bars');
                    }
                    
                    // Smooth scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Call initially to set active link on page load
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for better UX
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Animate skill progress bars when in viewport
function initSkillProgressAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to animate skill bars
    function animateSkillBars() {
        skillBars.forEach(bar => {
            if (isInViewport(bar)) {
                const width = bar.style.width || bar.getAttribute('style')?.match(/width: (\d+)%/) || [0, 0];
                if (!width[1] || parseInt(width[1]) === 0) {
                    const targetWidth = bar.parentElement.previousElementSibling.querySelector('.skill-percentage').textContent;
                    bar.style.width = targetWidth;
                }
            }
        });
    }
    
    // Call on scroll and initial page load
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);
}

// Handle back to top button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Handle contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

function openModal(id) {
    document.getElementById(id).style.display = 'block';
  }

  function closeModal(id) {
    document.getElementById(id).style.display = 'none';
  }

  // Optional: Close modal when clicking outside or pressing ESC
  window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
      document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
    }
  });