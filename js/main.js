// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for internal page links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to navbar when scrolled
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add hover effects to interactive elements
    const cards = document.querySelectorAll('.stat-card, .step, .benefit-item, .case-study-card.interactive');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add loading animation for better UX
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
    
    // Observe all major content sections for scroll animations
    const animatedElements = document.querySelectorAll('.stat-card, .step, .benefit-item, .case-study-card, .service-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Enhanced CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Mobile menu toggle (if needed for smaller screens)
    const createMobileMenuToggle = () => {
        if (window.innerWidth <= 768) {
            const navMenu = document.querySelector('.nav-menu');
            const navContainer = document.querySelector('.nav-container');
            
            // Create mobile menu button if it doesn't exist
            let mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (!mobileToggle) {
                mobileToggle = document.createElement('button');
                mobileToggle.classList.add('mobile-menu-toggle');
                mobileToggle.innerHTML = '☰';
                mobileToggle.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--text-primary);
                    cursor: pointer;
                    display: none;
                `;
                
                // Show toggle button on mobile
                if (window.innerWidth <= 768) {
                    mobileToggle.style.display = 'block';
                }
                
                navContainer.appendChild(mobileToggle);
                
                mobileToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('mobile-open');
                    if (navMenu.classList.contains('mobile-open')) {
                        navMenu.style.display = 'flex';
                        navMenu.style.position = 'absolute';
                        navMenu.style.top = '100%';
                        navMenu.style.left = '0';
                        navMenu.style.right = '0';
                        navMenu.style.backgroundColor = 'var(--background-primary)';
                        navMenu.style.flexDirection = 'column';
                        navMenu.style.padding = 'var(--spacing-md)';
                        navMenu.style.boxShadow = 'var(--shadow-md)';
                        navMenu.style.borderTop = '1px solid var(--border-color)';
                    } else {
                        navMenu.style.display = 'flex';
                        navMenu.style.position = 'static';
                        navMenu.style.flexDirection = 'row';
                        navMenu.style.backgroundColor = 'transparent';
                        navMenu.style.padding = '0';
                        navMenu.style.boxShadow = 'none';
                        navMenu.style.borderTop = 'none';
                    }
                });
            }
        }
    };
    
    // Initialize mobile menu on load and resize
    createMobileMenuToggle();
    window.addEventListener('resize', createMobileMenuToggle);
    
    // Performance optimization: Debounce scroll events
    let ticking = false;
    
    function updateOnScroll() {
        updateActiveNavLink();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            gap: var(--spacing-sm);
        }
        
        .mobile-menu-toggle {
            display: block !important;
        }
    }
`;
document.head.appendChild(style);

// Theme Toggle Functionality
class ThemeToggle {
    constructor() {
        this.themeKey = 'preferred-theme';
        this.init();
    }
    
    init() {
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem(this.themeKey);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = savedTheme || (prefersDark ? 'cyber-theme' : 'light-theme');
        
        this.setTheme(defaultTheme);
        this.bindEvents();
        this.updateToggleIcon();
    }
    
    bindEvents() {
        // Bind theme toggle buttons on all pages
        const toggleButtons = document.querySelectorAll('#themeToggle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => this.toggleTheme());
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.themeKey)) {
                this.setTheme(e.matches ? 'cyber-theme' : 'light-theme');
                this.updateToggleIcon();
            }
        });
    }
    
    getCurrentTheme() {
        return document.body.classList.contains('light-theme') ? 'light-theme' : 'cyber-theme';
    }
    
    setTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('cyber-theme', 'light-theme');
        
        // Add the new theme class
        document.body.classList.add(theme);
        
        // Update navigation classes to match theme
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.remove('cyber-nav', 'light-nav');
            nav.classList.add(theme === 'light-theme' ? 'light-nav' : 'cyber-nav');
        }
        
        // Update main container classes to match theme
        const main = document.querySelector('main');
        if (main) {
            main.classList.remove('cyber-main', 'light-main');
            main.classList.add(theme === 'light-theme' ? 'light-main' : 'cyber-main');
        }
        
        // Update all sections to match theme
        this.updateSectionClasses(theme);
        
        // Save theme preference
        localStorage.setItem(this.themeKey, theme);
        
        // Update toggle icon
        this.updateToggleIcon();
    }
    
    updateSectionClasses(theme) {
        const isLight = theme === 'light-theme';
        const prefix = isLight ? 'light-' : 'cyber-';
        
        // Map of section class conversions
        const sectionMappings = [
            'hero', 'services', 'about', 'portfolio', 'contact', 'cta', 
            'why-matters', 'beyond-software', 'partner', 'footer'
        ];
        
        sectionMappings.forEach(section => {
            const elements = document.querySelectorAll(`.${isLight ? 'cyber-' : 'light-'}${section}`);
            elements.forEach(el => {
                el.classList.remove(`cyber-${section}`, `light-${section}`);
                el.classList.add(`${prefix}${section}`);
            });
        });
    }
    
    toggleTheme() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'cyber-theme' ? 'light-theme' : 'cyber-theme';
        this.setTheme(newTheme);
    }
    
    updateToggleIcon() {
        const currentTheme = this.getCurrentTheme();
        const toggleButtons = document.querySelectorAll('#themeToggle');
        
        toggleButtons.forEach(button => {
            const sunIcon = button.querySelector('.sun-icon');
            const moonIcon = button.querySelector('.moon-icon');
            
            if (currentTheme === 'light-theme') {
                // Show moon icon (dark mode option)
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
                button.title = 'Switch to dark theme';
            } else {
                // Show sun icon (light mode option)  
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
                button.title = 'Switch to light theme';
            }
        });
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});