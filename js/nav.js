// nav.js — Menú móvil (hamburguesa) y efecto de scroll en la navbar.
// Compartido entre index.html (vía main.js) y personal.html.

export function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    };

    hamburger.addEventListener('click', () => {
        const willOpen = !hamburger.classList.contains('active');
        hamburger.classList.toggle('active', willOpen);
        navMenu.classList.toggle('active', willOpen);
        hamburger.setAttribute('aria-expanded', String(willOpen));
        document.body.classList.toggle('nav-open', willOpen);
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

export function setupNavScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const update = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
}

// Activa los elementos .reveal / .scale-up / .slide-left / .slide-right
// cuando entran al viewport. Cualquier página que use esas clases debe
// llamar esta función — si no, el elemento se queda en opacity:0 para siempre.
export function setupRevealAnimations() {
    const targets = document.querySelectorAll('.reveal, .scale-up, .slide-left, .slide-right');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(el => observer.observe(el));
}
