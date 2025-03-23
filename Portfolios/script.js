// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
        
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        requestAnimationFrame(() => this.animate());
    }
}

// Scroll Animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-card').forEach(card => {
        observer.observe(card);
    });
};

// Typing Effect
class TypingEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Navigation Scroll Effect
const handleNavScroll = () => {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });
};

// Smooth Scrolling
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
};

// Form Validation
const initFormValidation = () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    }
};

// Project Cards Hover Effect
const initProjectCards = () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const info = card.querySelector('.project-info');
            info.style.bottom = '0';
        });

        card.addEventListener('mouseleave', () => {
            const info = card.querySelector('.project-info');
            info.style.bottom = '-100%';
        });
    });
};

// Terminal Text Animation
const animateTerminal = () => {
    const terminalText = document.querySelector('.terminal-text');
    if (terminalText) {
        terminalText.querySelectorAll('p').forEach((line, index) => {
            line.style.animationDelay = `${index * 0.2}s`;
        });
    }
};

// Skills Animation
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill-tag');
    skills.forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.1}s`;
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    new MatrixRain();

    // Initialize other features
    handleNavScroll();
    initSmoothScroll();
    observeElements();
    initFormValidation();
    initProjectCards();
    animateTerminal();
    animateSkills();

    // Initialize typing effect for the hero subtitle
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (subtitleElement) {
        new TypingEffect(subtitleElement, 'Cybersecurity Professional | Ethical Hacker | Security Researcher', 50);
    }

    // Navigation functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navCenter = document.querySelector('.nav-center');
    const themeToggle = document.querySelector('.theme-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navCenter.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navCenter.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Nav scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.classList.remove('nav-scrolled');
            return;
        }

        if (currentScroll > lastScroll && !nav.classList.contains('nav-scrolled')) {
            nav.classList.add('nav-scrolled');
        } else if (currentScroll < lastScroll && nav.classList.contains('nav-scrolled')) {
            nav.classList.remove('nav-scrolled');
        }

        lastScroll = currentScroll;
    });
});

// Particle Effect
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00ff00'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff00',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
}); 