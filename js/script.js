// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Thank you for your message!</h3>
            <p>We'll get back to you as soon as possible.</p>
        `;
        
        successMessage.style.backgroundColor = '#4caf50';
        successMessage.style.color = 'white';
        successMessage.style.padding = '1rem';
        successMessage.style.borderRadius = '5px';
        successMessage.style.marginTop = '1rem';
        
        contactForm.reset();
        contactForm.parentNode.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Animation for stats numbers
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statNumbers = statsSection.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(statNumber => {
            const target = parseInt(statNumber.textContent);
            let count = 0;
            const duration = 2000; // ms
            const increment = target / (duration / 16);
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    statNumber.textContent = Math.ceil(count) + (statNumber.textContent.includes('%') ? '%' : '+');
                    requestAnimationFrame(updateCount);
                } else {
                    statNumber.textContent = target + (statNumber.textContent.includes('%') ? '%' : '+');
                }
            };
            
            updateCount();
        });
    };
    
    // Trigger animation when the element is in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}
