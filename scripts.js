
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinkItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); 


const skillBars = document.querySelectorAll('.skill-progress');

window.addEventListener('scroll', () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            bar.style.width = bar.classList.contains('html') ? '95%' :
                              bar.classList.contains('css') ? '90%' :
                              bar.classList.contains('js') ? '85%' : '80%';
        }
    });
});


const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});
