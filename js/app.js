/**
 * NERMINE TOUATI - PHARMACEUTICAL QUALITY PORTFOLIO
 * app.js - Sleek interaction logic with exact CV data and FR/EN bilingual toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Navbar Scroll Effect & Back-to-Top
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

  // 3. Mobile Navigation Menu
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

  // 4. ScrollSpy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 100;
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

  // 5. Printable CV Modal
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

  // 6. Contact Form validation & toast
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

  // 7. vCard download
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
TITLE:Chargée Qualité / Assurance Qualité
ORG:Industrie Pharmaceutique & QHSE
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

  // 8. Bilingual Language Switcher (FR / EN)
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
      btn_cv: "Consulter le CV",
      btn_contact: "Me Contacter",
      hero_badge: "Industrie Pharmaceutique • QHSE • BPF",
      hero_title: "Professionnelle Qualité & QHSE",
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
      contact_subtitle: "Pour toute opportunité professionnelle ou échange dans le domaine de la qualité pharmaceutique et du QHSE.",
      send_btn: "Envoyer le message"
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
      btn_cv: "View Full CV",
      btn_contact: "Contact Me",
      hero_badge: "Pharmaceutical Industry • QHSE • GMP",
      hero_title: "Pharmaceutical Quality & QHSE Professional",
      hero_summary: "Versatile professional combining technical expertise in the pharmaceutical field with strong human qualities. I thrive in dynamic environments where innovation and continuous improvement are essential. My adaptability enables me to effectively support organizations in their most demanding quality initiatives.",
      exp_badge: "Career Journey",
      exp_title: "Professional Experience",
      edu_badge: "Academic Degrees",
      edu_title: "Education",
      train_badge: "Certifications & Standards",
      train_title: "Professional Training",
      skills_badge: "Systems & Tools",
      skills_title: "Software & Digital Tools",
      lang_badge: "Communication",
      lang_title: "Languages",
      contact_badge: "Get in Touch",
      contact_title: "Contact Information",
      contact_subtitle: "Available for professional opportunities and collaboration in pharmaceutical quality assurance and QHSE.",
      send_btn: "Send Message"
    }
  };

  function setLanguage(lang) {
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

    // Toggle bullet point language visibility if needed
    document.querySelectorAll('[data-lang-content]').forEach(el => {
      if (el.getAttribute('data-lang-content') === lang) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });
});
