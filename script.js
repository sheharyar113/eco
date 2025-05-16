document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Hero Section Text Animation (On Load) ---
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroElements = heroContent.querySelectorAll('.hero-heading, .hero-subheading, .hero-cta-button, .hero-secondary-button');
        heroElements.forEach(el => {
            // Add 'visible' class slightly after page load to trigger transition
            setTimeout(() => {
                el.classList.add('visible');
            }, 100); // Small delay to ensure transition occurs
        });
    }

    // --- 2. Scroll Animations using Intersection Observer ---
    const animatedElements = document.querySelectorAll(
        '.section-title, .category-item, .product-card, .trust-item, .blog-card, #blog .btn, #subscribe .container > *:not(form), #subscribe form, .footer-col'
    );

    // Add the initial hidden state class to all elements meant to be animated
    animatedElements.forEach(el => el.classList.add('hidden-initial'));

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay based on the element's index within its parent row/group if possible,
                // or just apply the visible class. For simplicity here, we add visible directly.
                // More complex staggering could involve checking siblings.
                entry.target.classList.add('visible');

                // Optional: Add stagger delay classes if defined in CSS
                // Example: entry.target.classList.add(`delay-${(index % 5) + 1}`);

                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it's fully in view
    });

    // Observe all elements identified for animation
    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // --- 3. Optional: Navbar Active Link Highlighting (Basic) ---
    // This is a simple version. For more robust highlighting based on scroll position,
    // you might need a library or more complex IntersectionObserver setup.
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust the offset based on navbar height if needed
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section ID
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Special case for home (usually top of page)
        if (window.scrollY < 400 && !current) { // If near top and no section matched
             navLinks.forEach(link => link.classList.remove('active'));
             const homeLink = document.querySelector('.navbar-nav .nav-link[href="#"]');
             if (homeLink) homeLink.classList.add('active');
        }
    });

}); // End DOMContentLoaded