/**
 * NERMINE TOUATI - PHARMACEUTICAL QUALITY PORTFOLIO
 * app.js - Main Application Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Sticky Navbar scroll effect
  const navbar = document.getElementById('main-navbar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 500) {
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

  // 3. Mobile Navigation Menu Toggle
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

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // 4. ScrollSpy for Active Navigation Links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateScrollSpy() {
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
  }

  window.addEventListener('scroll', updateScrollSpy);

  // 5. Scroll Reveal Elements
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Experience Timeline Expand/Collapse Details
  const timelineCards = document.querySelectorAll('.exp-card');
  timelineCards.forEach(card => {
    const expandBtn = card.querySelector('.exp-expand-btn');
    const detailSection = card.querySelector('.exp-details');
    const chevronIcon = card.querySelector('.exp-chevron');

    if (expandBtn && detailSection) {
      expandBtn.addEventListener('click', () => {
        const isExpanded = !detailSection.classList.contains('hidden');
        if (isExpanded) {
          detailSection.classList.add('hidden');
          expandBtn.querySelector('.btn-text').textContent = 'View Technical Details & Tools';
          if (chevronIcon) chevronIcon.style.transform = 'rotate(0deg)';
        } else {
          detailSection.classList.remove('hidden');
          expandBtn.querySelector('.btn-text').textContent = 'Hide Technical Details';
          if (chevronIcon) chevronIcon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 7. Interactive Skills Ecosystem Tabs
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillPanels = document.querySelectorAll('.skill-category-panel');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCategory = tab.getAttribute('data-skill-category');

      // Update active tab button style
      skillTabs.forEach(t => {
        t.classList.remove('bg-white', 'text-sky-700', 'shadow-md', 'border-sky-300');
        t.classList.add('bg-slate-100/80', 'text-slate-600', 'border-transparent');
      });
      tab.classList.add('bg-white', 'text-sky-700', 'shadow-md', 'border-sky-300');
      tab.classList.remove('bg-slate-100/80', 'text-slate-600', 'border-transparent');

      // Show/Hide Skill panels
      skillPanels.forEach(panel => {
        if (targetCategory === 'all' || panel.getAttribute('data-category') === targetCategory) {
          panel.classList.remove('hidden');
          panel.classList.add('fade-in');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });

  // 8. Pharmaceutical Environment Deep Dive Modal Data
  const envData = {
    cleanroom: {
      title: 'Pharmaceutical Cleanrooms (Class A to D)',
      badge: 'Sterile & Non-Sterile Manufacturing',
      icon: 'shield-alert',
      desc: 'Adherence to EU GMP Annex 1 revisions for sterile and solid oral dosage manufacturing. Strict air filtration (HEPA H14), differential pressure cascade control, particle monitoring, and validated cleanroom gowning procedures.',
      keyPoints: [
        'Differential pressure cascades (15 Pa positive pressure containment)',
        'HEPA filtration & laminar airflow (Grade A critical zone: 0.45 m/s ± 20%)',
        'Continuous environmental particle and viable microbial monitoring',
        'Line clearance and sanitation validation protocols (CIP/SIP)'
      ],
      standards: 'GMP Annex 1, ISO 14644-1/2, FDA Sterile Guidance'
    },
    analytics: {
      title: 'Quality Control & Analytical Laboratory',
      badge: 'Physicochemical & Microbiological QC',
      icon: 'microscope',
      desc: 'High-precision pharmaceutical analytical quality control environment ensuring rigorous testing of raw materials, in-process samples, and finished commercial batches.',
      keyPoints: [
        'HPLC & Spectrophotometric assay quantification',
        'Tablet dissolution and disintegration profiling',
        'CHROMAS chromatography analysis data integrity',
        'Microbiological bioburden & endotoxin testing'
      ],
      standards: 'ISO 17025:2017, European Pharmacopoeia (Ph. Eur.), USP'
    },
    batch_release: {
      title: 'Batch Release & Electronic Documentation',
      badge: 'ALCOA+ Data Integrity & Release Planning',
      icon: 'file-check-2',
      desc: 'Comprehensive batch record evaluation, material reconciliations, consumption tracking via SAGE X3/SAP, and certified Quality Assurance release authorized by Qualified Persons (QP).',
      keyPoints: [
        'Master Production & Packaging Record (MPR/BMR) thorough review',
        'Material consumption monitoring & yield reconciliation via SAGE X3',
        'Qualipro QMS deviation closure and investigation sign-offs',
        'Data Integrity governance respecting ALCOA+ standards'
      ],
      standards: 'GMP Chapter 4, 21 CFR Part 11, PIC/S Data Integrity'
    },
    biotech: {
      title: 'Biotechnology & Single-Use Bioprocessing',
      badge: 'Sartorius Stedim Biotech Excellence',
      icon: 'dna',
      desc: 'Specialized quality release and compliance for biopharmaceutical single-use bags, sterile filtration assemblies, fluid management manifolds, and bioreactor consumables.',
      keyPoints: [
        'Raw material and semi-finished component release protocols',
        'Sterile barrier integrity testing (Bacterial Challenge & Bubble Point)',
        'Inter-site non-conformity and customer complaint resolution',
        'Cleanroom Class 10,000 biomanufacturing compliance'
      ],
      standards: 'ISO 13485, ISO 9001, BPF / cGMP'
    }
  };

  const envModal = document.getElementById('env-modal');
  const envModalClose = document.getElementById('env-modal-close');
  const envInspectBtns = document.querySelectorAll('.env-inspect-btn');

  function openEnvModal(envKey) {
    const data = envData[envKey];
    if (!data || !envModal) return;

    document.getElementById('env-modal-title').textContent = data.title;
    document.getElementById('env-modal-badge').textContent = data.badge;
    document.getElementById('env-modal-desc').textContent = data.desc;
    document.getElementById('env-modal-standards').textContent = data.standards;

    const pointsList = document.getElementById('env-modal-points');
    if (pointsList) {
      pointsList.innerHTML = data.keyPoints
        .map(pt => `<li class="flex items-start gap-2 text-sm text-slate-700"><i data-lucide="check-circle-2" class="w-4 h-4 text-teal-600 mt-0.5 shrink-0"></i><span>${pt}</span></li>`)
        .join('');
    }

    if (window.lucide) window.lucide.createIcons();
    envModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeEnvModal() {
    if (!envModal) return;
    envModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  envInspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const envKey = btn.getAttribute('data-env');
      openEnvModal(envKey);
    });
  });

  if (envModalClose) envModalClose.addEventListener('click', closeEnvModal);
  if (envModal) {
    envModal.addEventListener('click', (e) => {
      if (e.target === envModal) closeEnvModal();
    });
  }

  // 9. Executive CV Modal & Print Handler
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

  // 10. Contact Form Submission & Toast
  const contactForm = document.getElementById('contact-form');
  const contactSuccessToast = document.getElementById('contact-success-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span class="inline-flex items-center gap-2"><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Transmitting...</span>`;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        if (window.lucide) window.lucide.createIcons();
        contactForm.reset();

        // Show Toast
        if (contactSuccessToast) {
          contactSuccessToast.classList.remove('hidden', 'opacity-0', 'translate-y-2');
          contactSuccessToast.classList.add('opacity-100', 'translate-y-0');
          setTimeout(() => {
            contactSuccessToast.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => contactSuccessToast.classList.add('hidden'), 300);
          }, 4500);
        }
      }, 900);
    });
  }

  // 11. Download vCard
  const vcardBtns = document.querySelectorAll('.download-vcard-btn');
  vcardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:Touati;Nermine;;;
FN:Nermine Touati
ORG:Pharmaceutical Quality & QHSE
TITLE:Chargée Assurance Qualité & QHSE
EMAIL;type=INTERNET;type=WORK;type=pref:nermine.touati.contact@gmail.com
NOTE:Specialist in Quality Management, QHSE, GMP/BPF, CAPA, SAGE X3, Sartorius Stedim Biotech, SAIPH, TERIAK
URL:https://linkedin.com/in/nermine-touati
END:VCARD`;

      const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Nermine_Touati_Pharmaceutical_Quality.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
});
