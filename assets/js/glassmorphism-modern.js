/**
 * VRdash - Modern Glassmorphism & Liquid Glass Effects JavaScript
 * Enhanced interactions and animations
 */

(function() {
    'use strict';
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initGlassmorphismEffects();
        initAnimations();
        initInteractiveElements();
        initThemeEnhancements();
        initScrollEffects();
        initFloatingElements();
        initModernTooltips();
    });

    /**
     * Initialize glassmorphism effects
     */
    function initGlassmorphismEffects() {
        // Add glassmorphism classes to existing elements
        const elementsToEnhance = [
            { selector: '.card', classes: ['glass-effect', 'modern-hover'] },
            { selector: '.btn', classes: ['interactive'] },
            { selector: '.sidebar', classes: ['glass-effect'] },
            { selector: '.navbar', classes: ['glass-effect'] },
            { selector: '.modal-content', classes: ['glass-effect'] },
            { selector: '.dropdown-menu', classes: ['glass-effect'] },
            { selector: '.alert', classes: ['glass-effect'] },
            { selector: '.list-group-item', classes: ['modern-hover'] }
        ];

        elementsToEnhance.forEach(({ selector, classes }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                classes.forEach(cls => element.classList.add(cls));
            });
        });
    }

    /**
     * Initialize modern animations
     */
    function initAnimations() {
        // Intersection Observer for reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe cards and other elements for reveal animation
        document.querySelectorAll('.card, .list-group-item, .btn').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            observer.observe(el);
        });

        // Add CSS for slideInUp animation
        if (!document.querySelector('#modern-animations-css')) {
            const style = document.createElement('style');
            style.id = 'modern-animations-css';
            style.textContent = `
                @keyframes slideInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .ripple-effect {
                    position: relative;
                    overflow: hidden;
                }
                
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Initialize interactive elements
     */
    function initInteractiveElements() {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn, .card, .list-group-item').forEach(element => {
            element.classList.add('ripple-effect');
            
            element.addEventListener('click', function(e) {
                createRipple(e, this);
            });
        });

        // Enhanced hover effects for sidebar menu items
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(8px) scale(1.02)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
        });

        // Floating action button
        createFloatingActionButton();
    }

    /**
     * Create ripple effect
     */
    function createRipple(event, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        const rect = element.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const ripple = element.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }

        element.appendChild(circle);
    }

    /**
     * Initialize theme enhancements
     */
    function initThemeEnhancements() {
        // Enhanced theme toggle with smooth transition
        const themeToggle = document.querySelector('[data-theme-toggle]') || 
                           document.querySelector('.theme-toggle') ||
                           document.querySelector('#theme-toggle');

        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                // Add transition class
                document.body.classList.add('theme-transition');
                
                // Change theme
                document.documentElement.setAttribute('data-theme', newTheme);
                
                // Store theme preference
                localStorage.setItem('theme', newTheme);
                
                // Remove transition class after animation
                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                }, 300);
                
                // Add visual feedback
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }

        // Add theme transition CSS
        if (!document.querySelector('#theme-transition-css')) {
            const style = document.createElement('style');
            style.id = 'theme-transition-css';
            style.textContent = `
                .theme-transition * {
                    transition: background-color 0.3s ease, 
                               color 0.3s ease, 
                               border-color 0.3s ease,
                               box-shadow 0.3s ease !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Initialize scroll effects
     */
    function initScrollEffects() {
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            let lastScrollTop = 0;
            
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Hide/show navbar on scroll
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            });
        }

        // Parallax effect for background elements
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    /**
     * Initialize floating elements
     */
    function initFloatingElements() {
        // Add floating animation to specific elements
        document.querySelectorAll('.card .card-header, .widget-icon').forEach((element, index) => {
            element.classList.add('floating');
            element.style.animationDelay = `${index * 0.2}s`;
        });

        // Pulse animation for important buttons
        document.querySelectorAll('.btn-primary, .btn-success').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.classList.add('pulse');
            });

            element.addEventListener('mouseleave', function() {
                this.classList.remove('pulse');
            });
        });
    }

    /**
     * Create floating action button
     */
    function createFloatingActionButton() {
        if (!document.querySelector('.fab')) {
            const fab = document.createElement('button');
            fab.className = 'fab';
            fab.innerHTML = '<i class="ri-arrow-up-line"></i>';
            fab.title = 'Back to Top';
            
            fab.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Show/hide FAB based on scroll position
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    fab.style.opacity = '1';
                    fab.style.pointerEvents = 'all';
                } else {
                    fab.style.opacity = '0';
                    fab.style.pointerEvents = 'none';
                }
            });

            fab.style.opacity = '0';
            fab.style.pointerEvents = 'none';
            document.body.appendChild(fab);
        }
    }

    /**
     * Initialize modern tooltips
     */
    function initModernTooltips() {
        // Enhanced tooltips for elements with title attribute
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                showModernTooltip(e.target, e.target.getAttribute('title'));
            });

            element.addEventListener('mouseleave', function() {
                hideModernTooltip();
            });
        });
    }

    /**
     * Show modern tooltip
     */
    function showModernTooltip(element, text) {
        if (!text) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'modern-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--glass-bg);
            backdrop-filter: var(--glass-blur);
            -webkit-backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-md);
            padding: var(--spacing-sm) var(--spacing-md);
            color: var(--text-primary-light);
            font-size: 0.875rem;
            font-weight: 500;
            white-space: nowrap;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            box-shadow: var(--glass-shadow);
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;

        // Animate in
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });
    }

    /**
     * Hide modern tooltip
     */
    function hideModernTooltip() {
        const tooltip = document.querySelector('.modern-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
            setTimeout(() => tooltip.remove(), 300);
        }
    }

    /**
     * Enhanced form interactions
     */
    function initFormEnhancements() {
        // Floating labels
        document.querySelectorAll('.form-control').forEach(input => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.transition = 'all 0.3s ease';
                
                input.addEventListener('focus', function() {
                    label.style.transform = 'translateY(-1.5rem) scale(0.85)';
                    label.style.color = 'var(--primary-500)';
                });

                input.addEventListener('blur', function() {
                    if (!this.value) {
                        label.style.transform = 'translateY(0) scale(1)';
                        label.style.color = 'var(--text-secondary-light)';
                    }
                });
            }
        });
    }

    /**
     * Initialize loading animations
     */
    function initLoadingAnimations() {
        // Add shimmer effect to loading elements
        document.querySelectorAll('.loading, .skeleton').forEach(element => {
            element.classList.add('loading-shimmer');
        });
    }

    /**
     * Initialize micro-interactions
     */
    function initMicroInteractions() {
        // Button press animation
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });

            button.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });

        // Card hover effects
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Initialize additional features
    document.addEventListener('DOMContentLoaded', function() {
        initFormEnhancements();
        initLoadingAnimations();
        initMicroInteractions();
    });

    // Export functions for global access
    window.VRDashModern = {
        initGlassmorphismEffects,
        initAnimations,
        createRipple,
        showModernTooltip,
        hideModernTooltip
    };

})();
