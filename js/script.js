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

    /* ══════════════════════════════════════════
       11. SCROLL SPY — navbar anchor (#home, #about,
       #projects, #contact) mengikuti section yang lagi
       kelihatan saat halaman di-scroll. Hanya aktif
       kalau navbar-nya pakai link anchor (href="#...").
    ══════════════════════════════════════════ */
    const anchorLinks = document.querySelectorAll('.nav-item[href^="#"]');

    if (anchorLinks.length) {
        const spySections = Array.from(anchorLinks)
            .map(link => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

        const setActiveAnchor = () => {
            const offset = (navbar ? navbar.offsetHeight : 72) + 24;
            let currentId = spySections[0] ? spySections[0].id : null;

            spySections.forEach(section => {
                if (section.getBoundingClientRect().top - offset <= 0) {
                    currentId = section.id;
                }
            });

            anchorLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === '#' + currentId
                );
            });
        };

        window.addEventListener('scroll', setActiveAnchor, { passive: true });
        setActiveAnchor();
    }

    /* ══════════════════════════════════════════
       8. CERTIFICATE LIGHTBOX / MODAL
    ══════════════════════════════════════════ */
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateImg');
    const closeBtn = document.querySelector('.certificate-close');
    const lightboxImages = document.querySelectorAll('[data-lightbox]');

    if (lightboxImages.length && modal) {
        // Open modal on image click
        lightboxImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.classList.add('show');
                modalImg.src = this.src;
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close when clicking outside the image
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    /* ══════════════════════════════════════════
       12. LANGUAGE TOGGLE
    ══════════════════════════════════════════ */
    const languageButton = document.createElement('button');
    const socialNav = document.querySelector('.nav-social');
    const savedLanguage = localStorage.getItem('portfolio-language') || 'id';

    languageButton.type = 'button';
    languageButton.className = 'language-toggle';
    languageButton.setAttribute('aria-label', 'Ganti bahasa');
    languageButton.title = 'Ganti bahasa';

    if (socialNav) {
        socialNav.appendChild(languageButton);
    }

    const languagePairs = [
        { selector: '.nav-links li:nth-child(1) .nav-item', en: 'Home', id: 'Beranda' },
        { selector: '.nav-links li:nth-child(2) .nav-item', en: 'About', id: 'Tentang' },
        { selector: '.nav-links li:nth-child(3) .nav-item', en: 'Projects', id: 'Proyek' },
        { selector: '.nav-links li:nth-child(4) .nav-item', en: 'Contact', id: 'Kontak' },
        { selector: '.profession', en: 'Computer Technology Student & Web Developer', id: 'Mahasiswa Teknologi Komputer & Web Developer' },
        { selector: '.hero-buttons .btn-primary', en: '↓ Download CV', id: '↓ Unduh CV' },
        { selector: '.hero-buttons .btn-secondary', en: 'View Projects →', id: 'Lihat Proyek →' },
        { selector: '.timeline-col-header h3', en: ['Education', 'Experience'], id: ['Pendidikan', 'Pengalaman'] },
        { selector: '.timeline-section .section-header h2', en: 'Education & Experience', id: 'Pendidikan & Pengalaman' },
        { selector: '.projects-section .section-header h2', en: 'Completed Projects', id: 'Proyek yang Telah Selesai' },
        { selector: '.contact-section .section-header h2', en: "Let's Work Together", id: 'Mari Mulai Kerja Sama' },
        { selector: '.filter-btn[data-filter="all"]', en: 'All', id: 'Semua' },
        { selector: '.filter-btn[data-filter="algoritma"]', en: 'Algorithms', id: 'Algoritma' },
        { selector: '.btn-view', en: 'View Project →', id: 'Lihat Proyek →' },
        { selector: '.form-title', en: 'Send Message', id: 'Kirim Pesan' },
        { selector: '.social-title', en: 'Find Me On', id: 'Temukan Saya Di' },
        { selector: 'label[for="name"]', en: 'Full Name', id: 'Nama Lengkap' },
        { selector: 'label[for="subject"]', en: 'Subject', id: 'Subjek' },
        { selector: 'label[for="message"]', en: 'Message', id: 'Pesan' }
    ];

    const sectionTranslations = {
        index: [
            ['Profil', 'Profile'],
            ['Perjalanan', 'Journey'],
            ['KEAHLIAN UTAMA', 'CORE SKILLS'],
            ['Showcase', 'Showcase'],
            ['Sertifikat', 'Certificates'],
            ['Hubungi Saya', 'Contact Me']
        ],
        about: [['Profil', 'Profile'], ['Perjalanan', 'Journey']],
        projects: [['Showcase', 'Showcase']],
        contact: [['Hubungi Saya', 'Contact Me']]
    };

    const fullContentTranslations = [
        { selector: '.description', id: 'Membangun solusi digital yang fungsional, bersih, dan bermakna dengan pendekatan minimalis serta performa yang optimal.', en: 'Building functional, clean, and meaningful digital solutions with a minimalist approach and optimal performance.' },
        { selector: '.bio-text', id: [
            'I am a Computer Technology student with a background in computer networking, hardware, operating systems, and website development. Throughout my studies, I have developed a strong interest in software development, web development, and UI/UX design. Although these areas fall outside my primary field of study, I continue to explore and hone my skills in them.',
            'Currently, I am expanding my capabilities by combining the technical knowledge gained from Computer Technology with my passion for software development and digital design. I view this intersection as an opportunity to keep learning, experimenting, and creating digital solutions that are both functional and user-centric.'
        ], en: [
            'I am a Computer Technology student with a background in computer networking, hardware, operating systems, and website development. Throughout my studies, I have developed a strong interest in software development, web development, and UI/UX design. Although these areas fall outside my primary field of study, I continue to explore and hone my skills in them.',
            'Currently, I am expanding my capabilities by combining the technical knowledge gained from Computer Technology with my passion for software development and digital design. I view this intersection as an opportunity to keep learning, experimenting, and creating digital solutions that are both functional and user-centric.'
        ] },
        { selector: '.glass-box p', id: '"Kesederhanaan adalah kecanggihan tertinggi. Fokus pada fungsionalitas murni tanpa mengorbankan estetika."', en: '"Simplicity is the ultimate sophistication. Focus on pure functionality without sacrificing aesthetics."' },
        { selector: '.edu-sub', id: ['D3 Teknologi Komputer', 'Jurusan MIPA'], en: ['Computer Technology Diploma', 'Science and Mathematics'], },
        { selector: '.edu-period', id: ['2024 – 2027 | Belum Selesai', '2024 | Selesai'], en: ['2024 – 2027 | In Progress', '2024 | Completed'] },
        { selector: '.time-period', id: ['Mei 2026', 'AGUST 2025 — MEI 2026', 'AGUST 2025', '2025'], en: ['May 2026', 'AUG 2025 — MAY 2026', 'AUG 2025', '2025'] },
        { selector: '.timeline-item h4', id: ['Peserta AI Bootcamp', 'Leader & Mentor Mahasiswa Baru', 'Divisi Events, PCA IT Del 2025', 'Web Developer — Proyek Akademik'], en: ['AI Bootcamp Participant', 'New Student Leader & Mentor', 'Events Division, PCA IT Del 2025', 'Web Developer — Academic Project'] },
        { selector: '.institution', id: ['AI Bootcamp — On Site', 'Institut Teknologi Del', 'Institut Teknologi Del', 'Studi Kasus SMAN 1 Siborong-borong'], en: ['AI Bootcamp — On Site', 'Institut Teknologi Del', 'Institut Teknologi Del', 'SMAN 1 Siborong-borong Case Study'] },
        { selector: '.timeline-desc', id: [
            'Mengikuti pelatihan intensif seputar kecerdasan buatan, machine learning, dan pemrosesan bahasa alami. Memahami bagaimana kode dan data dapat dianalisis secara interaktif, terstruktur, dan mudah didokumentasikan dalam satu workspace menggunakan jupyterlab',
            'Membimbing mahasiswa baru angkatan 2025. Memastikan adaptasi lingkungan kampus, membimbing akademik, etika kampus, dan fasilitas IT Del.',
            'Mengelola perencanaan dan pelaksanaan rangkaian kegiatan penerimaan mahasiswa baru, koordinasi antar divisi, yang diarahkan Koordinator.',
            'Mengembangkan portal informasi berbasis Website Informasi menggunakan WordPress dengan dokumentasi pengembangan menggunakan metodologi Agile. Dipresentasikan sebagai jurnal ilmiah akademik.'
        ], en: [
            'Participated in intensive training on artificial intelligence, machine learning, and natural language processing. Learned how code and data can be analyzed interactively, structurally, and documented easily in one workspace using JupyterLab.',
            'Mentored the 2025 freshman cohort, supporting their campus adaptation, academic guidance, campus ethics, and understanding of IT Del facilities.',
            'Managed the planning and execution of new student admission activities and coordinated multiple divisions under the coordinator\'s direction.',
            'Developed an information portal using WordPress and documented the development with the Agile methodology. Presented as an academic scientific journal.'
        ] },
        { selector: '.project-card p', id: [
            'Sistem manajemen informasi sekolah berbasis WordPress CMS dengan tata letak responsif. Dikembangkan menggunakan metodologi Agile dan didokumentasikan sebagai jurnal ilmiah.',
            'Aplikasi Command Line Interface (CLI) perbankan yang mensimulasikan penyimpanan data akun multi-user serta alur transaksi yang aman menggunakan bahasa C.',
            'Sistem embedded untuk mendeteksi Tegangan Baterai & Suhu Lingkungan Menggunakan Sensor Tegangan & Sensor DHT11 Berbasis Arduino Uno Dengan Aktuator LCD & Buzzer.',
            'Pengembangan Platform Digital MySamosi untuk Pemesanan Pemandu Wisata Lokal di Pulau Samosir.',
            'Implementasi otomatisasi konfigurasi server Linux menggunakan Ansible untuk mengelola DNS Server (BIND9), Web Server (Apache), Mail Server (Postfix & Dovecot), dan Load Balancer (HAProxy) pada domain flutter.local dan supabase.local.',
            'Implementasi sistem ujian online terdistribusi menggunakan API Gateway, Microservices, RabbitMQ, dan Database Replication untuk meningkatkan skalabilitas dan ketersediaan layanan.',
            'Website pariwisata Pulau Samosir berbasis WordPress CMS, menampilkan destinasi wisata, budaya Batak, dan informasi perjalanan dengan desain visual menarik.',
            'Website informasi rumah sakit berbasis WordPress dengan fitur layanan, jadwal dokter, dan informasi fasilitas yang didesain dengan tampilan profesional dan bersih.'
        ], en: [
            'A WordPress CMS-based school information management system with a responsive layout. Developed using the Agile methodology and documented as a scientific journal.',
            'A banking Command Line Interface (CLI) application that simulates multi-user account storage and secure transaction flows using C.',
            'An embedded system for detecting battery voltage and environmental temperature using voltage and DHT11 sensors with an Arduino Uno, LCD, and buzzer actuators.',
            'Development of the MySamosir digital platform for booking local tour guides on Samosir Island.',
            'Automated Linux server configuration using Ansible to manage DNS, web, mail, and load balancer servers on the flutter.local and supabase.local domains.',
            'A distributed online examination system using an API Gateway, microservices, RabbitMQ, and database replication to improve scalability and service availability.',
            'A WordPress-based tourism website for Samosir Island featuring destinations, Batak culture, and travel information with an engaging visual design.',
            'A professional and clean WordPress hospital information website featuring services, doctor schedules, and facility information.'
        ] },
        { selector: '.project-card h3', id: [
            'Portal Informasi SMAN 1 Siborong-borong',
            'Simulasi ATM Multi-Akun',
            'Monitoring Tegangan Baterai & Suhu Lingkungan',
            'MySamosir Tour Guide',
            'Ansible Automation: Infrastruktur Server Otomatis untuk DNS, Web, Mail & Load Balancer',
            'ExamApp Distributed Microservices Examination Platform',
            'Samosir Island Website',
            'Website RS Putri Hijau Medan'
        ], en: [
            'SMAN 1 Siborong-borong Information Portal',
            'Multi-Account ATM Simulation',
            'Battery Voltage & Environmental Temperature Monitoring',
            'MySamosir Tour Guide',
            'Ansible Automation: Automated Server Infrastructure for DNS, Web, Mail & Load Balancer',
            'ExamApp Distributed Microservices Examination Platform',
            'Samosir Island Website',
            'Putri Hijau Medan Hospital Website'
        ] },
        { selector: '.certificate-card p', id: [
            'Sertifikat penghargaan atas pemahaman mendalam tentang artificial intelligence,bahasa pemograman Python, memahami bagaimana kode dan data dapat dianalisis secara interaktif, terstruktur, dan mudah didokumentasikan dalam satu workspace menggunakan jupyterlab',
            'Memperoleh sertifikat Web Design Competition 2026 sebagai bentuk apresiasi atas partisipasi dan kemampuan saya dalam mengembangkan desain website yang kreatif, inovatif dan sesuai kebutuhan pengguna',
            'Berhasil menyelesaikan program **Self-Paced Azure AI Basic Fundamental** yang diselenggarakan oleh Microsoft, ElevAIte, dan GreatNusa',
            'Berhasil menyelesaikan kursus Management Information System yang diselenggarakan oleh GreatNusa berkolaborasi dengan BINUS University.',
            'Menyelesaikan pelatihan dan ujian HCIA-Datacom V1.0 Course yang diselenggarakan oleh Huawei ICT Academy, sebagai bentuk pengembangan kompetensi saya di bidang jaringan dan teknologi informasi',
            'Menyelesaikan pelatihan dan ujian HCIA-Storage V5.0 Course yang diselenggarakan oleh Huawei ICT Academy, sebagai bentuk pengembangan kompetensi saya di bidang jaringan dan teknologi informasi',
            'Mengikuti Webinar Automation: UiPath x IOH, yang memberikan wawasan mengenai penerapan automation dan Robotic Process Automation (RPA) dalam meningkatkan efisiensi serta produktivitas di dunia kerja',
            'Menyelesaikan pelatihan Data Analytics Essentials melalui Cisco Networking Academy yang membekali saya dengan pemahaman dasar mengenai analisis data',
            'Berhasil menyelesaikan dan memperoleh Sertifikasi Google Analytics, yang membuktikan pemahaman dan kemampuan saya dalam menggunakan Google Analytics untuk menganalisis data serta memahami performa dan perilaku pengguna',
            'Membekali saya dengan pemahaman dan keterampilan dalam memanfaatkan platform Creatio untuk mendukung strategi serta aktivitas pemasaran.',
            'Pengembangan Skill dalam industri teknologi dan menambah pengalaman untuk berkontribusi dalam perkembangan Artificial Intelligence.'
        ], en: [
            'A certificate recognizing an in-depth understanding of artificial intelligence and Python programming, including how code and data can be analyzed interactively, structurally, and documented in one workspace using JupyterLab.',
            'Received the Web Design Competition 2026 certificate in recognition of participation and ability to develop creative, innovative, and user-focused website designs.',
            'Successfully completed the Self-Paced Azure AI Basic Fundamental program organized by Microsoft, ElevAIte, and GreatNusa.',
            'Successfully completed the Management Information System course organized by GreatNusa in collaboration with BINUS University.',
            'Completed the HCIA-Datacom V1.0 training and examination organized by Huawei ICT Academy to develop networking and information technology competencies.',
            'Completed the HCIA-Storage V5.0 training and examination organized by Huawei ICT Academy to develop networking and information technology competencies.',
            'Attended the UiPath x IOH Automation Webinar, gaining insight into Robotic Process Automation (RPA) and improving workplace efficiency and productivity.',
            'Completed Data Analytics Essentials training through Cisco Networking Academy, gaining a foundation in data analysis.',
            'Successfully completed Google Analytics certification, demonstrating the ability to analyze data and understand user performance and behavior.',
            'Developed an understanding and skills in using the Creatio platform to support marketing strategies and activities.',
            'Developed skills in the technology industry and gained experience to contribute to the growth of Artificial Intelligence.'
        ] },
        { selector: '.detail-label', id: ['Email', 'Phone / WhatsApp', 'Lokasi', 'Institusi'], en: ['Email', 'Phone / WhatsApp', 'Location', 'Institution'] },
        { selector: '.btn-submit span:first-child', id: 'Kirim Pesan', en: 'Send Message' },
        { selector: '#name', attr: 'placeholder', id: 'Nama Anda', en: 'Your Name' },
        { selector: '#subject', attr: 'placeholder', id: 'Topik pesan Anda', en: 'Message subject' },
        { selector: '#message', attr: 'placeholder', id: 'Tuliskan pesan, pertanyaan, atau tawaran proyek Anda di sini...', en: 'Write your message, question, or project proposal here...' },
        { selector: '.form-success h3', id: 'Pesan Terkirim!', en: 'Message Sent!' },
        { selector: '.form-success p', id: 'Terima kasih telah menghubungi saya. Saya akan membalas secepatnya.', en: 'Thank you for contacting me. I will reply as soon as possible.' },
        { selector: 'footer p', id: '© 2025 Okto Esra Sinaga. Dibuat dengan ketelitian & semangat belajar.', en: '© 2025 Okto Esra Sinaga. Made with care and a passion for learning.' }
    ];

    const pageName = (window.location.pathname.split('/').pop() || 'index.html').split('.')[0];
    const setLanguage = language => {
        languagePairs.forEach(pair => {
            document.querySelectorAll(pair.selector).forEach(element => {
                const translation = pair[language];
                const index = Array.from(document.querySelectorAll(pair.selector)).indexOf(element);
                element.textContent = Array.isArray(translation) ? translation[index] : translation;
            });
        });

        (sectionTranslations[pageName] || []).forEach((pair, index) => {
            const sectionTag = document.querySelectorAll('.section-tag')[index];
            if (sectionTag) sectionTag.textContent = pair[language === 'id' ? 0 : 1];
        });

        fullContentTranslations.forEach(pair => {
            document.querySelectorAll(pair.selector).forEach((element, index) => {
                const value = pair[language];
                const translated = Array.isArray(value) ? value[index] : value;
                if (translated === undefined) return;
                if (pair.attr) {
                    element.setAttribute(pair.attr, translated);
                } else {
                    element.textContent = translated;
                }
            });
        });

        const pillLabels = language === 'id'
            ? [' Medan, North Sumatra', ' D3 Teknologi Komputer', ' Institut Teknologi Del']
            : [' Medan, North Sumatra', ' Computer Technology Diploma', ' Institut Teknologi Del'];
        document.querySelectorAll('.pill').forEach((pill, index) => {
            const textNode = Array.from(pill.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
            if (textNode && pillLabels[index]) textNode.textContent = pillLabels[index];
        });

        const footer = document.querySelector('footer p');
        if (footer) {
            footer.innerHTML = language === 'id'
                ? '© 2025 <span>Okto Esra Sinaga</span>. Dibuat dengan ketelitian &amp; semangat belajar.'
                : '© 2025 <span>Okto Esra Sinaga</span>. Made with care and a passion for learning.';
        }

        document.documentElement.lang = language;
        languageButton.textContent = language === 'id' ? 'EN' : 'ID';
        languageButton.title = language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia';
        languageButton.setAttribute('aria-label', languageButton.title);
    };

    setLanguage(savedLanguage);
    languageButton.addEventListener('click', () => {
        const nextLanguage = (localStorage.getItem('portfolio-language') || 'id') === 'id' ? 'en' : 'id';
        localStorage.setItem('portfolio-language', nextLanguage);
        setLanguage(nextLanguage);
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