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
        
        // In a real application, you would send the form data to a server
        // For this demo, we'll just show a success message
        const formData = new FormData(contactForm);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        console.log('Form data:', formDataObj);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Thank you for your message!</h3>
            <p>We'll get back to you as soon as possible.</p>
        `;
        
        successMessage.style.backgroundColor = 'var(--success)';
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
    
    // Intersection Observer to trigger animations when element is in view
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

// Testimonial slider (if needed in the future)
function setupTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length <= 3) return; // No need for slider if 3 or fewer testimonials
    
    let currentIndex = 0;
    const totalSlides = testimonials.length;
    const sliderContainer = document.querySelector('.testimonial-cards');
    
    // Create navigation buttons
    const sliderNav = document.createElement('div');
    sliderNav.className = 'slider-nav';
    sliderNav.innerHTML = `
        <button class="prev-btn">&lt;</button>
        <div class="slider-dots"></div>
        <button class="next-btn">&gt;</button>
    `;
    
    const dotsContainer = sliderNav.querySelector('.slider-dots');
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    }
    
    // Add navigation after the slider
    sliderContainer.parentNode.insertBefore(sliderNav, sliderContainer.nextSibling);
    
    // Style the slider for sliding functionality
    sliderContainer.style.display = 'flex';
    sliderContainer.style.overflow = 'hidden';
    
    testimonials.forEach(slide => {
        slide.style.flex = '0 0 100%';
    });
    
    // Function to go to a specific slide
    function goToSlide(index) {
        currentIndex = index;
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Event listeners for navigation
    sliderNav.querySelector('.prev-btn').addEventListener('click', () => {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    });
    
    sliderNav.querySelector('.next-btn').addEventListener('click', () => {
        goToSlide((currentIndex + 1) % totalSlides);
    });
    
    // Event listeners for dots
    dotsContainer.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
        });
    });
    
    // Auto slide (optional)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide((currentIndex + 1) % totalSlides);
        }, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto slide
    startAutoSlide();
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
}

// Call testimonial slider setup if there are more than 3 testimonials
// Uncomment this when needed
// setupTestimonialSlider();