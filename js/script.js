// Mobile menu toggle functionality
function initPage() {
    const menuToggle = document.querySelector('.menu-toggle');

    // ================================
    // Create Mobile Navigation
    // ================================
    if (menuToggle && !document.querySelector('.mobile-nav')) {
        createMobileNav();
    }

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }

    function createMobileNav() {
        // Create mobile nav overlay
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';

        // Create nav content
        const navContent = document.createElement('nav');
        navContent.className = 'mobile-nav-content';

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-nav-close';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Close menu');

        // Create nav links
        const navLinks = document.createElement('ul');
        navLinks.className = 'mobile-nav-links';

        // Add links
        const links = [
            { text: 'Works', href: 'works.html' },
            { text: 'About', href: 'about.html' },
            { text: 'Contact', href: 'contact.html' },
            { text: 'Resume', href: 'files/KailaWongResume.pdf', target: '_blank' }
        ];

        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = link.text;
            a.href = link.href;
            if (link.target) {
                a.target = link.target;
            }
            a.addEventListener('click', function() {
                closeMobileMenu();
            });
            li.appendChild(a);
            navLinks.appendChild(li);
        });

        // Assemble the mobile nav
        navContent.appendChild(closeBtn);
        navContent.appendChild(navLinks);
        mobileNav.appendChild(navContent);
        document.body.appendChild(mobileNav);

        // Close button functionality
        closeBtn.addEventListener('click', function() {
            closeMobileMenu();
        });

        // Close when clicking outside
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                closeMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        const mobileNav = document.querySelector('.mobile-nav');
        if (!mobileNav) return;

        if (mobileNav.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        const mobileNav = document.querySelector('.mobile-nav');
        const menuToggle = document.querySelector('.menu-toggle');
        if (!mobileNav) return;

        mobileNav.classList.add('active');
        if (menuToggle) menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        const mobileNav = document.querySelector('.mobile-nav');
        const menuToggle = document.querySelector('.menu-toggle');
        if (!mobileNav) return;

        mobileNav.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ================================
    // Hero Parallax (About Page)
    // ================================
    const heroImg = document.querySelector('.hero-image-container img, .hero-background img');
    if (heroImg) {
        let ticking = false;
        function updateParallax() {
            heroImg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
            ticking = false;
        }
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
        updateParallax();
    }

    // ================================
    // Polaroid Wiggle on Scroll
    // ================================
    var polaroids = document.querySelectorAll('.page-polaroid');
    if (polaroids.length > 0 && 'IntersectionObserver' in window) {
        var polaroidObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var pol = entry.target;
                    pol.classList.add('wiggling');
                    pol.addEventListener('animationend', function() {
                        pol.classList.remove('wiggling');
                    }, { once: true });
                    polaroidObserver.unobserve(pol);
                }
            });
        }, { threshold: 0.4 });
        polaroids.forEach(function(pol) {
            polaroidObserver.observe(pol);
        });
    }

    // ================================
    // Skills Box Toggle (Homepage)
    // ================================
    const skillsBox = document.querySelector('.skills-box');

    if (skillsBox) {
        skillsBox.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    }

    // ================================
    // Clickable Items - Lightbox Functionality
    // ================================
    const clickableItems = document.querySelectorAll('.clickable-item, .thumbnail-item');

    clickableItems.forEach(item => {
        // Make keyboard-accessible if not already a focusable element
        if (!item.getAttribute('tabindex')) {
            item.setAttribute('tabindex', '0');
        }
        if (!item.getAttribute('role')) {
            item.setAttribute('role', 'button');
        }
        const img = item.querySelector('img');
        if (img && img.alt && !item.getAttribute('aria-label')) {
            item.setAttribute('aria-label', 'View image: ' + img.alt);
        }

        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                createLightbox(img.src, img.alt);
            }
        });

        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = this.querySelector('img');
                if (img) {
                    createLightbox(img.src, img.alt);
                }
            }
        });
    });

    // ================================
    // Lightbox Modal Creation
    // ================================
    function createLightbox(imageSrc, imageAlt) {
        let lightbox = document.getElementById('lightbox');

        if (!lightbox) {
            // Create lightbox
            lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.className = 'lightbox';

            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';

            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '×';
            closeBtn.onclick = function() {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300);
            };

            const img = document.createElement('img');
            img.className = 'lightbox-image';

            lightboxContent.appendChild(closeBtn);
            lightboxContent.appendChild(img);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);

            // Close on background click
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        lightbox.style.display = 'none';
                    }, 300);
                }
            });

        }

        // Show lightbox with image
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
    }

}

// Run immediately if DOM is ready, otherwise wait for DOMContentLoaded.
// Scripts at end of <body> sometimes run after DOMContentLoaded has already
// fired (e.g. on cached pages), so we can't rely on the event alone.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
