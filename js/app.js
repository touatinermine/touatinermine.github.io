/**
 * NERMINE TOUATI - ULTRA-MODERN PHARMACEUTICAL PORTFOLIO
 * app.js - Advanced Interactions, 3D Tilt, Role Cycler, Stats Counter, & Bilingual Support
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Dynamic Tagline Cycler
  const taglineEl = document.getElementById('hero-tagline-cycler');
  const rolesFr = [
    "Chargée Qualité / Assurance Qualité",
    "Management Intégré QHSE & BPF (GMP)",
    "Libération des Lots & Dossiers de Fabrication",
    "Ingénierie Biotechnologique & Moléculaire",
    "Amélioration Continue & CAPA (RCA)"
  ];
  const rolesEn = [
    "Quality & Quality Assurance Professional",
    "Integrated QHSE & GMP Compliance Specialist",
    "Batch Release & Master Production Records",
    "Medical Biotechnology & Molecular Engineering",
    "Continuous Improvement & CAPA (RCA)"
  ];

  let currentRoleIdx = 0;
  let currentLang = 'fr';

  function cycleTagline() {
    if (!taglineEl) return;
    taglineEl.classList.add('opacity-0', '-translate-y-2');
    setTimeout(() => {
      const list = currentLang === 'fr' ? rolesFr : rolesEn;
      currentRoleIdx = (currentRoleIdx + 1) % list.length;
      taglineEl.textContent = list[currentRoleIdx];
      taglineEl.classList.remove('opacity-0', '-translate-y-2');
    }, 350);
  }

  setInterval(cycleTagline, 3200);

  // 3. Navbar Scroll Effect & Back-to-Top
  const navbar = document.getElementById('main-navbar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu(open) {
    if (!mobileMenuDrawer) return;
    if (open) {
      mobileMenuDrawer.classList.remove('translate-x-full', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenuDrawer.classList.add('translate-x-full', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // 5. ScrollSpy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 6. Scroll Reveal Observer & Counter Animations
  const revealElements = document.querySelectorAll('.reveal');
  const counterElements = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const suffix = counter.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 25));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(interval);
        } else {
          counter.textContent = current + suffix;
        }
      }, 40);
    });
    countersAnimated = true;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.querySelector('.stat-counter') || entry.target.classList.contains('stat-counter-container')) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  // 7. Interactive 3D Card Parallax Tilt on Hover
  const tiltCards = document.querySelectorAll('.interactive-tilt');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 8. Printable Official CV Modal
  const cvModal = document.getElementById('cv-modal');
  const cvModalOpenBtns = document.querySelectorAll('.open-cv-modal-btn');
  const cvModalClose = document.getElementById('cv-modal-close');
  const cvPrintBtn = document.getElementById('cv-print-btn');

  function toggleCvModal(open) {
    if (!cvModal) return;
    if (open) {
      cvModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (window.lucide) window.lucide.createIcons();
    } else {
      cvModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  cvModalOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCvModal(true);
    });
  });

  if (cvModalClose) cvModalClose.addEventListener('click', () => toggleCvModal(false));
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) toggleCvModal(false);
    });
  }

  if (cvPrintBtn) {
    cvPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 9. Contact Form Validation & Toast
  const contactForm = document.getElementById('contact-form');
  const contactSuccessToast = document.getElementById('contact-success-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;
      
      submitBtn.innerHTML = `<span class="inline-flex items-center gap-2"><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Transmission...</span>`;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        submitBtn.innerHTML = originalHtml;
        if (window.lucide) window.lucide.createIcons();
        contactForm.reset();

        if (contactSuccessToast) {
          contactSuccessToast.classList.remove('hidden', 'opacity-0', 'translate-y-2');
          contactSuccessToast.classList.add('opacity-100', 'translate-y-0');
          setTimeout(() => {
            contactSuccessToast.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => contactSuccessToast.classList.add('hidden'), 300);
          }, 4000);
        }
      }, 700);
    });
  }

  // 10. vCard Download
  const vcardBtns = document.querySelectorAll('.download-vcard-btn');
  vcardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:Touati;Nermine;;;
FN:Nermine Touati
TEL;TYPE=CELL:+21695179894
EMAIL;TYPE=INTERNET;TYPE=HOME:twetinermine@gmail.com
URL:https://www.linkedin.com/in/nermine-touati
TITLE:Chargée Qualité / Assurance Qualité & QHSE
ORG:Industrie Pharmaceutique & Biotechnologie
END:VCARD`;

      const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Nermine_Touati_CV.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });

  // 11. Bilingual Language Switcher (FR / EN)
  const langBtns = document.querySelectorAll('.lang-toggle-btn');
  
  const translations = {
    fr: {
      nav_home: "Accueil",
      nav_profil: "Profil",
      nav_exp: "Expériences",
      nav_edu: "Cursus",
      nav_train: "Formations",
      nav_skills: "Logiciels",
      nav_lang: "Langues",
      nav_contact: "Contact",
      btn_cv: "Format CV Officiel",
      btn_contact: "Me Contacter",
      hero_badge: "INNOVATION PHARMACEUTIQUE • QUALITÉ & QHSE • BPF/GMP",
      hero_status: "Disponible pour opportunités QA / QHSE",
      hero_summary: "Professionnelle polyvalente combinant expertise technique dans le domaine pharmaceutique et qualités humaines, je m'épanouis dans des environnements dynamiques où l'innovation et l'amélioration continue sont au cœur des enjeux. Ma capacité d'adaptation me permet d'accompagner efficacement les organisations dans leurs démarches qualité les plus exigeantes.",
      exp_badge: "Parcours Professionnel",
      exp_title: "Expériences Professionnelles",
      edu_badge: "Diplômes & Études",
      edu_title: "Cursus Académique",
      train_badge: "Certifications & Normes",
      train_title: "Formations",
      skills_badge: "Systèmes & Outils",
      skills_title: "Logiciels Maîtrisés",
      lang_badge: "Communication",
      lang_title: "Langues",
      contact_badge: "Coordonnées",
      contact_title: "Contact & Coordonnées",
      send_btn: "Transmettre le message"
    },
    en: {
      nav_home: "Home",
      nav_profil: "Profile",
      nav_exp: "Experience",
      nav_edu: "Education",
      nav_train: "Certifications",
      nav_skills: "Software",
      nav_lang: "Languages",
      nav_contact: "Contact",
      btn_cv: "Official Resume Format",
      btn_contact: "Contact Me",
      hero_badge: "PHARMACEUTICAL INNOVATION • QUALITY & QHSE • GMP",
      hero_status: "Available for QA / QHSE Roles",
      hero_summary: "Versatile professional combining technical expertise in the pharmaceutical field with strong human qualities. I thrive in dynamic environments where innovation and continuous improvement are essential. My adaptability enables me to effectively support organizations in their most demanding quality initiatives.",
      exp_badge: "Career Journey",
      exp_title: "Professional Experience",
      edu_badge: "Academic Degrees",
      edu_title: "Education",
      train_badge: "Certifications & Standards",
      train_title: "Professional Training",
      skills_badge: "Systems & Tools",
      skills_title: "Software & Digital Systems",
      lang_badge: "Communication",
      lang_title: "Languages",
      contact_badge: "Get in Touch",
      contact_title: "Contact Information",
      send_btn: "Send Message"
    }
  };

  function setLanguage(lang) {
    currentLang = lang;
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const dict = translations[lang] || translations.fr;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Toggle content items
    document.querySelectorAll('[data-lang-content]').forEach(el => {
      if (el.getAttribute('data-lang-content') === lang) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Refresh dynamic tagline immediately
    if (taglineEl) {
      const list = currentLang === 'fr' ? rolesFr : rolesEn;
      taglineEl.textContent = list[currentRoleIdx % list.length];
    }
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });
});
