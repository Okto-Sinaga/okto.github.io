/* ============================================
   SCRIPT.JS — Portfolio Okto Esra Sinaga
   Vanilla JS — no frameworks
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ══════════════════════════════════════════
       1. MOBILE MENU TOGGLE
    ══════════════════════════════════════════ */
    const toggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow =
                navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close on link click
        navLinks.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }


    /* ══════════════════════════════════════════
       2. NAVBAR — SCROLL SHADOW + ACTIVE
    ══════════════════════════════════════════ */
    const navbar = document.querySelector('.navbar');

    const handleNavbarScroll = () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();


    /* ══════════════════════════════════════════
       3. SCROLL REVEAL ANIMATION
       Classes: .reveal  .reveal-left  .reveal-right
       Supports .stagger for children delay
    ══════════════════════════════════════════ */
    const revealEls = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right'
    );

    if (revealEls.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => revealObserver.observe(el));
    }

    const marqueeTrack = document.querySelector('.skills-marquee-track');
    if (marqueeTrack) {
        marqueeTrack.style.transform = 'translateX(0)';
        marqueeTrack.innerHTML += marqueeTrack.innerHTML;
    }


    /* ══════════════════════════════════════════
       4. SKILL BARS ANIMATION (About Page)
    ══════════════════════════════════════════ */
    const skillFills = document.querySelectorAll('.skill-fill');

    if (skillFills.length) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const target = fill.getAttribute('data-width') || '70';
                    setTimeout(() => {
                        fill.style.width = target + '%';
                    }, 200);
                    skillObserver.unobserve(fill);
                }
            });
        }, { threshold: 0.4 });

        skillFills.forEach(fill => skillObserver.observe(fill));
    }


    /* ══════════════════════════════════════════
       5. PARALLAX — HERO IMAGE (Light)
    ══════════════════════════════════════════ */
    const heroImg = document.querySelector('.hero-image');

    if (heroImg) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    if (scrollY < window.innerHeight) {
                        heroImg.style.transform =
                            `translateY(${scrollY * 0.04}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }


    /* ══════════════════════════════════════════
       6. BUTTON LETTER-SPACING INTERACTION
    ══════════════════════════════════════════ */
    document.querySelectorAll('.btn-primary, .btn-submit').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.letterSpacing = '0.4px';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.letterSpacing = '';
        });
    });


    /* ══════════════════════════════════════════
       7. CONTACT FORM — Validation + Feedback
    ══════════════════════════════════════════ */
    const form = document.getElementById('portfolioForm');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const submitBtn = form.querySelector('.btn-submit');
            const formFields = form.querySelector('.form-fields');
            const successBox = document.querySelector('.form-success');
            const originalHTML = submitBtn.innerHTML;

            // Loading state
            submitBtn.innerHTML = '<span>Mengirim</span><span class="dot-anim">...</span>';
            submitBtn.disabled = true;
            submitBtn.style.background = '#636E72';

            setTimeout(() => {
                // Show success
                if (formFields) formFields.style.display = 'none';
                if (successBox) successBox.classList.add('show');

                form.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 1400);
        });

        // Input focus visual lift
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', () => {
                input.closest('.form-group').style.transform = 'translateY(-1px)';
            });
            input.addEventListener('blur', () => {
                input.closest('.form-group').style.transform = '';
            });
        });
    }


    /* ══════════════════════════════════════════
       8. PROJECT FILTER (Projects Page)
    ══════════════════════════════════════════ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const tags = card.getAttribute('data-tags') || '';
                    const show = filter === 'all' || tags.includes(filter);

                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                    if (show) {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.display = '';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.96)';
                        setTimeout(() => {
                            if (card.style.opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }


    /* ══════════════════════════════════════════
       9. HERO COUNTER ANIMATION (Home)
    ══════════════════════════════════════════ */
    const counters = document.querySelectorAll('.stat-number[data-target]');

    if (counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    const suffix = el.getAttribute('data-suffix') || '';
                    let count = 0;
                    const step = Math.ceil(target / 40);

                    const tick = setInterval(() => {
                        count = Math.min(count + step, target);
                        el.textContent = count + suffix;
                        if (count >= target) clearInterval(tick);
                    }, 40);

                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }


    /* ══════════════════════════════════════════
       10. NAVBAR ACTIVE LINK (current page)
    ══════════════════════════════════════════ */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

});

/* ============================================================
   NEURAL NETWORK ANIMATION
   ============================================================ */

(function () {

    const canvas = document.getElementById('neural-network');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width;
    let height;

    let particles = [];

    let animationFrame;

    const mouse = {
        x: null,
        y: null,
        radius: 150
    };


    /* ========================================================
       CONFIGURATION
       ======================================================== */

    const config = {

        desktopParticles: 75,

        mobileParticles: 40,

        maxDistance: 145,

        particleSpeed: 0.25,

        particleSize: 1.5,

        mouseDistance: 180

    };


    /* ========================================================
       RESIZE
       ======================================================== */

    function resizeCanvas() {

        const section =
            canvas.parentElement;

        width =
            section.offsetWidth;

        height =
            section.offsetHeight;


        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            width * dpr;

        canvas.height =
            height * dpr;


        canvas.style.width =
            width + 'px';

        canvas.style.height =
            height + 'px';


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        createParticles();

    }


    /* ========================================================
       PARTICLES
       ======================================================== */

    function createParticles() {

        particles = [];


        const isMobile =
            window.innerWidth <= 768;


        const particleCount =
            isMobile
                ? config.mobileParticles
                : config.desktopParticles;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push({

                x:
                    Math.random() *
                    width,

                y:
                    Math.random() *
                    height,

                vx:
                    (
                        Math.random() - 0.5
                    ) *
                    config.particleSpeed,

                vy:
                    (
                        Math.random() - 0.5
                    ) *
                    config.particleSpeed,

                radius:
                    Math.random() *
                    1.5 +
                    0.7,

                pulse:
                    Math.random() *
                    Math.PI *
                    2

            });

        }

    }


    /* ========================================================
       DRAW PARTICLES
       ======================================================== */

    function drawParticles() {

        particles.forEach(
            particle => {

                particle.pulse += 0.015;


                const glow =
                    (
                        Math.sin(
                            particle.pulse
                        ) + 1
                    ) / 2;


                const radius =
                    particle.radius +
                    glow * 0.8;


                /* Glow */

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    radius * 4,
                    0,
                    Math.PI * 2
                );


                const gradient =
                    ctx.createRadialGradient(
                        particle.x,
                        particle.y,
                        0,
                        particle.x,
                        particle.y,
                        radius * 4
                    );


                gradient.addColorStop(
                    0,
                    'rgba(37, 99, 235, 0.45)'
                );


                gradient.addColorStop(
                    1,
                    'rgba(37, 99, 235, 0)'
                );


                ctx.fillStyle =
                    gradient;

                ctx.fill();


                /* Core */

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    radius,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    'rgba(37, 99, 235, 0.85)';

                ctx.fill();

            }
        );

    }


    /* ========================================================
       DRAW CONNECTIONS
       ======================================================== */

    function drawConnections() {

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const p1 =
                    particles[i];

                const p2 =
                    particles[j];


                const dx =
                    p1.x - p2.x;

                const dy =
                    p1.y - p2.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    config.maxDistance
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            config.maxDistance
                        ) *
                        0.20;


                    ctx.beginPath();


                    ctx.moveTo(
                        p1.x,
                        p1.y
                    );


                    ctx.lineTo(
                        p2.x,
                        p2.y
                    );


                    ctx.strokeStyle =
                        `rgba(
                            37,
                            99,
                            235,
                            ${opacity * 1.8}
                        )`;


                    ctx.lineWidth = 0.9;


                    ctx.stroke();

                }

            }

        }

    }


    /* ========================================================
       MOUSE CONNECTION
       ======================================================== */

    function drawMouseConnections() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {
            return;
        }


        particles.forEach(
            particle => {

                const dx =
                    particle.x -
                    mouse.x;

                const dy =
                    particle.y -
                    mouse.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    mouse.radius
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            mouse.radius
                        ) *
                        0.35;


                    ctx.beginPath();


                    ctx.moveTo(
                        particle.x,
                        particle.y
                    );


                    ctx.lineTo(
                        mouse.x,
                        mouse.y
                    );


                    ctx.strokeStyle =
                        `rgba(
                            59,
                            130,
                            246,
                            ${opacity}
                        )`;


                    ctx.lineWidth = 0.8;


                    ctx.stroke();

                }

            }
        );

    }


    /* ========================================================
       UPDATE
       ======================================================== */

    function updateParticles() {

        particles.forEach(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;


                /* Horizontal wrap */

                if (
                    particle.x < -20
                ) {
                    particle.x =
                        width + 20;
                }


                if (
                    particle.x >
                    width + 20
                ) {
                    particle.x = -20;
                }


                /* Vertical wrap */

                if (
                    particle.y < -20
                ) {
                    particle.y =
                        height + 20;
                }


                if (
                    particle.y >
                    height + 20
                ) {
                    particle.y = -20;
                }

            }
        );

    }


    /* ========================================================
       ANIMATION LOOP
       ======================================================== */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        drawConnections();

        drawMouseConnections();

        drawParticles();

        updateParticles();


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    /* ========================================================
       MOUSE
       ======================================================== */

    const section =
        canvas.parentElement;


    section.addEventListener(
        'mousemove',
        function (event) {

            const rect =
                section.getBoundingClientRect();


            mouse.x =
                event.clientX -
                rect.left;

            mouse.y =
                event.clientY -
                rect.top;

        }
    );


    section.addEventListener(
        'mouseleave',
        function () {

            mouse.x = null;

            mouse.y = null;

        }
    );


    /* ========================================================
       INITIALIZE
       ======================================================== */

    window.addEventListener(
        'resize',
        resizeCanvas
    );


    resizeCanvas();

    animate();


})();