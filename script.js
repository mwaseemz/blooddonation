// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials
// Get your credentials from https://www.emailjs.com/
const EMAILJS_CONFIG = {
    serviceID: 'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
    templateID: 'YOUR_TEMPLATE_ID',    // Replace with your EmailJS template ID
    publicKey: 'YOUR_PUBLIC_KEY'       // Replace with your EmailJS public key
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Announcement Bar functionality
document.addEventListener('DOMContentLoaded', function() {
    const announcementBar = document.getElementById('announcementBar');
    const closeButton = document.getElementById('closeAnnouncement');
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');

    // Check if announcement was previously closed
    const announcementClosed = localStorage.getItem('announcementClosed');

    if (announcementClosed === 'true') {
        hideAnnouncement(true);
    }

    // Close button functionality
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            hideAnnouncement(false);
            localStorage.setItem('announcementClosed', 'true');
        });
    }

    function hideAnnouncement(immediate) {
        if (immediate) {
            announcementBar.style.display = 'none';
        } else {
            announcementBar.classList.add('hidden');
            setTimeout(() => {
                announcementBar.style.display = 'none';
            }, 300);
        }

        navbar.classList.add('announcement-hidden');
        if (hero) {
            hero.classList.add('announcement-hidden');
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (optional field)
const phoneRegex = /^[\d\s\-\+\(\)]+$/;

// Form field validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    // Name validation
    if (name.length < 2) {
        showMessage('Please enter a valid name (at least 2 characters)', 'error');
        return false;
    }

    // Email validation
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return false;
    }

    // Phone validation (if provided)
    if (phone && !phoneRegex.test(phone)) {
        showMessage('Please enter a valid phone number', 'error');
        return false;
    }

    // Subject validation
    if (!subject) {
        showMessage('Please select a subject', 'error');
        return false;
    }

    // Message validation
    if (message.length < 10) {
        showMessage('Please enter a message (at least 10 characters)', 'error');
        return false;
    }

    return true;
}

// Show message function
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Form submission handler
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous messages
    formMessage.style.display = 'none';

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    // Prepare template parameters
    const templateParams = {
        from_name: document.getElementById('name').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim() || 'Not provided',
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim(),
        to_name: 'LifeBlood Team'
    };

    // Send email using EmailJS
    emailjs.send(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.templateID,
        templateParams
    )
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);

        // Show success message
        showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;

    }, function(error) {
        console.error('FAILED...', error);

        // Show error message
        showMessage('Oops! Something went wrong. Please try again later or contact us directly.', 'error');

        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    });
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe about cards and steps
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.about-card, .step');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add hover effect for statistics
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const finalValue = stat.textContent;
    stat.textContent = '0';

    let hasAnimated = false;

    const animateValue = () => {
        if (hasAnimated) return;
        hasAnimated = true;

        const value = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/[\d,]/g, '');
        const duration = 2000;
        const increment = value / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                current = value;
                clearInterval(timer);
            }

            if (value >= 1000) {
                stat.textContent = Math.floor(current / 1000) + 'K' + suffix;
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue();
            }
        });
    }, { threshold: 0.5 });

    statObserver.observe(stat.parentElement);
});
