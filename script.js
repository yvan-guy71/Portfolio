document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.querySelector('#main-nav ul');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navList.classList.toggle('open');
        });
    }
    const smoothLinks = Array.from(document.querySelectorAll('a[href^="#"]:not([href="#"])'))
        .filter(a => document.querySelector(a.getAttribute('href')));

    smoothLinks.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const href = anchor.getAttribute('href');
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

            if (anchor.closest('#main-nav') && navList && navList.classList.contains('open')) {
                navList.classList.remove('open');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const fills = document.querySelectorAll('.fill');
    const animateFills = () => {
        fills.forEach(fill => {
            const parent = fill.closest('.skill');
            const rect = parent && parent.getBoundingClientRect();
            if (!rect) return;
            if (rect.top < window.innerHeight - 60) {
                const percent = fill.getAttribute('data-percent') || '0';
                fill.style.width = percent + '%';
                fill.classList.add('animated');
            }
        });
    };
    fills.forEach(f => f.style.width = '0');
    window.addEventListener('scroll', animateFills);
    animateFills();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            if (!name || !email || !message) {
                alert('Merci de remplir votre nom, email et message.');
                return;
            }
            const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
            if (!emailRe.test(email)) {
                alert('Merci d’entrer une adresse email valide.');
                return;
            }
            alert('Merci! Votre message a été envoyé.');
            contactForm.reset();
        });
    }



    const backBtn = document.createElement('button');
    backBtn.id = 'backToTop';
    backBtn.title = 'Remonter en haut';
    backBtn.textContent = '↑';
    document.body.appendChild(backBtn);

    const toggleBackBtn = () => {
        const show = window.scrollY > 400;
        backBtn.classList.toggle('show', show);
    };
    window.addEventListener('scroll', toggleBackBtn);
    toggleBackBtn();
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

const navLinks = Array.from(document.querySelectorAll('a[href^="#"]:not([href="#"])'))
        .filter(a => document.querySelector(a.getAttribute('href')));
    const sections = Array.from(new Set(navLinks.map(a => a.getAttribute('href'))))
        .map(id => document.querySelector(id))
        .filter(Boolean);

    const highlight = () => {
        const position = window.scrollY + window.innerHeight / 3;
        sections.forEach((s) => {
            const id = `#${s.id}`;
            const links = document.querySelectorAll(`a[href="${id}"]`); // all matching anchors
            if (s.offsetTop <= position && (s.offsetTop + s.offsetHeight) > position) {
                links.forEach(l => l.classList.add('active'));
            } else {
                links.forEach(l => l.classList.remove('active'));
            }
        });
    };
    window.addEventListener('scroll', highlight);
    highlight();
});
