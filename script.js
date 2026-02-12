// Wait for DOM to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // Typing effect for name
    function typeWriter(element, text, speed = 150) {
        let i = 0;
        element.innerHTML = ''; // Clear the element first
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect and home section animation when the page loads
    const homeSection = document.getElementById('home');
    if (homeSection) {
        // Run immediately for the home section since it's visible on page load
        const nameElement = document.getElementById('typewriter-name');
        if (nameElement) {
            typeWriter(nameElement, 'Annus Ahmed', 150);
        }
        
        // Add animation to home section after a short delay
        setTimeout(() => {
            homeSection.classList.remove('opacity-0');
            homeSection.classList.add('animate-fadeIn');
        }, 300);
    }
    // Burger menu functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Check if theme toggle functionality has already been initialized to avoid duplicates
    if (themeToggleBtn && themeToggleDarkIcon && themeToggleLightIcon && !themeToggleBtn.hasAttribute('data-initialized')) {
        // Initialize theme based on saved preference or system preference
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
            document.documentElement.classList.add('dark');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        }

        themeToggleBtn.addEventListener('click', function() {
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });

        // Mark as initialized to prevent duplicate event listeners
        themeToggleBtn.setAttribute('data-initialized', 'true');
    } else if (themeToggleBtn && themeToggleDarkIcon && themeToggleLightIcon) {
        // If already initialized, make sure correct icon is shown based on current theme
        if (document.documentElement.classList.contains('dark')) {
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        }
    } else if (themeToggleBtn) {
        // If elements are missing, at least ensure the button is visible
        console.error('Theme toggle icons not found. Please check HTML structure.');
    }

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (name.length < 2) {
                showMessage('Name must be at least 2 characters long', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            if (message.length < 10) {
                showMessage('Message must be at least 10 characters long', 'error');
                return;
            }

            // For demo purposes, show success message and suggest contacting via email
            showMessage('Thank you for your message! For immediate response, feel free to contact me directly at annusmughal@icloud.com or +923471590845', 'success');
            contactForm.reset();

            // In a real implementation, you would submit to your backend server
            /*
            try {
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, message })
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showMessage(data.error || 'Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                showMessage('Failed to send message. Please try again later.', 'error');
            }
            */
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = `form-message ${type}`;
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }

    // Enhanced Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove initial animation classes
                entry.target.classList.remove('opacity-0', 'translate-y-10', 'translate-y-5');
                
                // Add enhanced animation classes based on section
                switch(entry.target.id) {
                    case 'about':
                        entry.target.classList.remove('opacity-0', 'translate-y-10');
                        entry.target.classList.add('animate-fadeInUp');
                        // Add subtle floating effect to elements within about section
                        const aboutElements = entry.target.querySelectorAll('h2, p');
                        aboutElements.forEach((el, index) => {
                            setTimeout(() => {
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                        break;
                    case 'skills':
                        entry.target.classList.remove('opacity-0', 'translate-y-10');
                        entry.target.classList.add('animate-fadeInUp');
                        // Animate the heading first
                        const skillsHeading = entry.target.querySelector('h2');
                        if (skillsHeading) {
                            skillsHeading.style.opacity = '1';
                            skillsHeading.style.transform = 'translateY(0)';
                        }
                        // Animate individual skills with stagger
                        setTimeout(() => {
                            const skills = entry.target.querySelectorAll('.bg-gray-100');
                            skills.forEach((skill, index) => {
                                setTimeout(() => {
                                    skill.classList.remove('opacity-0', 'translate-y-5');
                                    skill.classList.add('animate-fadeIn');
                                    // Add floating effect to skill items
                                    skill.classList.add('float-element');
                                    // Reset the scale transformation
                                    skill.style.transform = 'scale(1)';
                                }, index * 100);
                            });
                        }, 200);
                        break;
                    case 'projects':
                        entry.target.classList.remove('opacity-0', 'translate-y-10');
                        entry.target.classList.add('animate-fadeInUp');
                        // Animate the heading first
                        const projectsHeading = entry.target.querySelector('h2');
                        if (projectsHeading) {
                            projectsHeading.style.opacity = '1';
                            projectsHeading.style.transform = 'translateY(0)';
                        }
                        // Animate project cards with stagger
                        setTimeout(() => {
                            const projects = entry.target.querySelectorAll('.project-card-item');
                            projects.forEach((project, index) => {
                                setTimeout(() => {
                                    project.classList.remove('translate-y-10');
                                    project.classList.add('animate-fadeIn');
                                    
                                    // Animate inner elements of the project card
                                    const mediaDiv = project.querySelector('.project-card-media');
                                    const numberDiv = project.querySelector('.project-card-number');
                                    const contentDiv = project.querySelector('.project-card-content');
                                    let linkDiv = project.querySelector('.project-card-link'); // From index.html
                                    if (!linkDiv) {
                                        linkDiv = project.querySelector('.project-card-links'); // From projects.html
                                    }
                                    
                                    if (mediaDiv) {
                                        setTimeout(() => {
                                            mediaDiv.style.opacity = '1';
                                            mediaDiv.style.transform = 'translateY(0)';
                                        }, 100);
                                    }
                                    
                                    if (numberDiv) {
                                        setTimeout(() => {
                                            numberDiv.style.opacity = '1';
                                            numberDiv.style.transform = 'translateY(0)';
                                        }, 200);
                                    }
                                    
                                    if (contentDiv) {
                                        setTimeout(() => {
                                            contentDiv.style.opacity = '1';
                                            contentDiv.style.transform = 'translateY(0)';
                                        }, 300);
                                    }
                                    
                                    if (linkDiv) {
                                        setTimeout(() => {
                                            linkDiv.style.opacity = '1';
                                            linkDiv.style.transform = 'translateY(0)';
                                        }, 400);
                                    }
                                    
                                    // Add parallax effect to project images
                                    const projectImage = project.querySelector('img');
                                    if (projectImage) {
                                        projectImage.classList.add('parallax-scroll');
                                    }
                                }, index * 150);
                            });
                        }, 200);
                        break;
                    case 'contact':
                        entry.target.classList.add('animate-fadeInUp');
                        // Animate form elements with stagger
                        setTimeout(() => {
                            const formElements = entry.target.querySelectorAll('h2, input, textarea, button');
                            formElements.forEach((element, index) => {
                                setTimeout(() => {
                                    element.classList.remove('opacity-0', 'translate-y-5');
                                    element.classList.add('animate-fadeIn');
                                }, index * 100);
                            });
                        }, 200);
                        break;
                    default:
                        entry.target.classList.add('animate-fadeIn');
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('#about, #skills, #projects, #contact').forEach(el => {
        sectionObserver.observe(el);
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Project Card Hover Effects
    const projectCards = document.querySelectorAll('.project-card-item');

    // Add hover effects to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            this.style.transform = 'translateY(0)';
        });
    });
});