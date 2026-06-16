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
