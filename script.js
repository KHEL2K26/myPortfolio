// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections for fade-in animations
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Observe skill progress bars for animation
document.querySelectorAll('.progress-fill').forEach(fill => {
    observer.observe(fill);
});

// Trigger progress bar animation when in view
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = `${width}%`;
        }
    });
}, observerOptions);

document.querySelectorAll('.progress-fill').forEach(fill => {
    progressObserver.observe(fill);
});

// Dynamic Active Navigation Highlight
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '-50% 0px -50% 0px'
});

sections.forEach(section => {
    navObserver.observe(section);
});

// Smooth Scroll for Nav Links (fallback if CSS doesn't work)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        navList.classList.remove('active'); // Close mobile menu
    });
});