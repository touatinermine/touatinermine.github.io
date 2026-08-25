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
    "Quality & Quality Assurance Specialist",
    "Integrated QHSE & GMP Compliance Lead",
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

  // 8. Contact Form Validation & Toast
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

  // 9. vCard Download
  const vcardBtns = document.querySelectorAll('.download-vcard-btn');
  vcardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:Touati;Nermine;;;
FN:Nermine Touati
EMAIL;TYPE=INTERNET;TYPE=HOME:twetinermine@gmail.com
URL:https://www.linkedin.com/in/nermine-touati-b371b5202/
TITLE:Chargée Qualité / Assurance Qualité & QHSE
ORG:Industrie Pharmaceutique & Biotechnologie
END:VCARD`;

      const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Nermine_Touati.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });

  // 10. Comprehensive Bilingual Translation Dictionary (FR / EN)
  const translations = {
    fr: {
      brand_sub: "Qualité Pharmaceutique • QHSE",
      nav_home: "Accueil",
      nav_profil: "Profil",
      nav_exp: "Expériences",
      nav_edu: "Cursus",
      nav_train: "Formations",
      nav_skills: "Logiciels & Langues",
      nav_contact: "Contact",
      btn_exp: "Consulter les Expériences",
      btn_contact: "Me Contacter",
      hero_badge: "INNOVATION PHARMACEUTIQUE • QUALITÉ & QHSE • BPF/GMP",
      hero_scope: "Périmètre :",
      hero_tools: "Outils QMS & ERP :",
      stat_entities: "Laboratoires & Biotech",
      stat_compliance: "Conformité BPF / GMP",
      stat_tools: "Logiciels ERP & QMS",
      stat_degrees: "Mastère & Ing. Moléculaire",
      profil_title: "PROFIL",
      exp_title: "EXPÉRIENCES PROFESSIONNELLES",
      exp_teriak_title: "Chargée qualité production",
      exp_teriak_company: "Les laboratoires TERIAK",
      exp_teriak_dates: "Août 2022 – présent",
      exp_saiph_title: "Chargée Assurance qualité",
      exp_saiph_company: "Société Arabe des Industries Pharmaceutiques SAIPH",
      exp_saiph_dates: "Août 2021 – Août 2022",
      exp_sartorius_title: "Chargée qualité libération produits",
      exp_sartorius_company: "Sartorius Stedim BIOTECH",
      exp_sartorius_dates: "Février 2019 – Février 2021",
      edu_title: "CURSUS ACADÉMIQUE",
      train_title: "FORMATIONS",
      train_1_title: "Management des laboratoires ISO17025 V 2017",
      train_1_sub: "Exigences de compétence & systèmes d'essais",
      train_2_title: "Formation sur les outils à valeur contribuant au cycle de recherche scientifique",
      train_2_sub: "Par le centre CNUDST",
      train_3_title: "Formations sur les bonnes pratiques de fabrication et bonnes pratiques documentaires",
      train_3_sub: "BPF (GMP) & BPD (GDP)",
      train_4_title: "Formation sur l’intégrité des données",
      train_4_sub: "Data Integrity (ALCOA+)",
      skills_title: "LOGICIELS MAÎTRISÉS",
      badge_mastered: "Maîtrisé",
      lang_title: "LANGUES",
      lang_fr_name: "Français",
      lang_fr_level: "Lu, parlé et écrit",
      lang_en_name: "Anglais",
      lang_en_level: "Lu, parlé et écrit",
      lang_de_name: "Allemand",
      lang_de_level: "A1",
      lang_doc_label: "Rédaction BPF & Documentation",
      lang_doc_val: "Français / Anglais",
      lang_coord_label: "Coordination Inter-Sites & Audits",
      lang_coord_val: "Professionnel",
      contact_title: "CONTACT & COORDONNÉES",
      contact_email_label: "Email Professionnel",
      contact_linkedin_label: "Profil LinkedIn",
      input_name_placeholder: "Votre nom",
      input_email_placeholder: "Votre email",
      input_msg_placeholder: "Votre message...",
      vcard_btn: "Enregistrer le contact (vCard)",
      send_btn: "Transmettre le message",
      toast_success: "Message préparé avec succès !",
      footer_tag: "Qualité Pharmaceutique • QHSE • BPF (GMP) • Amélioration Continue",
      footer_rights: "Tous droits réservés."
    },
    en: {
      brand_sub: "Pharmaceutical Quality • QHSE",
      nav_home: "Home",
      nav_profil: "Profile",
      nav_exp: "Experience",
      nav_edu: "Education",
      nav_train: "Certifications",
      nav_skills: "Skills & Languages",
      nav_contact: "Contact",
      btn_exp: "View Experience",
      btn_contact: "Contact Me",
      hero_badge: "PHARMACEUTICAL INNOVATION • QUALITY & QHSE • GMP",
      hero_scope: "Scope:",
      hero_tools: "QMS & ERP Tools:",
      stat_entities: "Pharma Labs & Biotech",
      stat_compliance: "GMP / BPF Compliance",
      stat_tools: "ERP & QMS Software",
      stat_degrees: "Master's & Molecular Eng.",
      profil_title: "PROFILE",
      exp_title: "PROFESSIONAL EXPERIENCE",
      exp_teriak_title: "Production Quality Officer",
      exp_teriak_company: "TERIAK Laboratories",
      exp_teriak_dates: "August 2022 – Present",
      exp_saiph_title: "Quality Assurance Officer",
      exp_saiph_company: "SAIPH (Arab Pharmaceutical Industries)",
      exp_saiph_dates: "August 2021 – August 2022",
      exp_sartorius_title: "Product Release Quality Officer",
      exp_sartorius_company: "Sartorius Stedim BIOTECH",
      exp_sartorius_dates: "February 2019 – February 2021",
      edu_title: "ACADEMIC BACKGROUND",
      train_title: "TRAINING & CERTIFICATIONS",
      train_1_title: "Laboratory Management ISO17025 V 2017",
      train_1_sub: "Competence requirements & testing systems",
      train_2_title: "Training on scientific research tools contributing to research lifecycle",
      train_2_sub: "By CNUDST Center",
      train_3_title: "Good Manufacturing Practices & Good Documentation Practices",
      train_3_sub: "GMP & GDP Compliance",
      train_4_title: "Data Integrity Training",
      train_4_sub: "Data Integrity (ALCOA+)",
      skills_title: "SOFTWARE & DIGITAL TOOLS",
      badge_mastered: "Proficient",
      lang_title: "LANGUAGES",
      lang_fr_name: "French",
      lang_fr_level: "Read, spoken & written (Fluent)",
      lang_en_name: "English",
      lang_en_level: "Read, spoken & written (Fluent)",
      lang_de_name: "German",
      lang_de_level: "A1 (Elementary)",
      lang_doc_label: "GMP & Technical Documentation",
      lang_doc_val: "French / English",
      lang_coord_label: "Inter-Site Coordination & Audits",
      lang_coord_val: "Professional",
      contact_title: "CONTACT INFORMATION",
      contact_email_label: "Professional Email",
      contact_linkedin_label: "LinkedIn Profile",
      input_name_placeholder: "Your name",
      input_email_placeholder: "Your email",
      input_msg_placeholder: "Your message...",
      vcard_btn: "Save Contact Card (vCard)",
      send_btn: "Send Message",
      toast_success: "Message prepared successfully!",
      footer_tag: "Pharmaceutical Quality • QHSE • GMP • Continuous Improvement",
      footer_rights: "All rights reserved."
    }
  };

  function setLanguage(lang) {
    currentLang = lang;
    
    // Update active button state
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const dict = translations[lang] || translations.fr;

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update form placeholders
    const nameInput = document.getElementById('contact-name-input');
    const emailInput = document.getElementById('contact-email-input');
    const msgInput = document.getElementById('contact-msg-input');

    if (nameInput && dict.input_name_placeholder) nameInput.placeholder = dict.input_name_placeholder;
    if (emailInput && dict.input_email_placeholder) emailInput.placeholder = dict.input_email_placeholder;
    if (msgInput && dict.input_msg_placeholder) msgInput.placeholder = dict.input_msg_placeholder;

    // Toggle content blocks (paragraphs and bullet lists)
    document.querySelectorAll('[data-lang-content]').forEach(el => {
      if (el.getAttribute('data-lang-content') === lang) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Update dynamic tagline text immediately
    if (taglineEl) {
      const list = currentLang === 'fr' ? rolesFr : rolesEn;
      taglineEl.textContent = list[currentRoleIdx % list.length];
    }
  }

  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

  // Default to French
  setLanguage('fr');
});
