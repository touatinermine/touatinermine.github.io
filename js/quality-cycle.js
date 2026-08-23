/**
 * NERMINE TOUATI - PHARMACEUTICAL QUALITY PORTFOLIO
 * quality-cycle.js
 * Interactive Continuous Improvement Cycle & Quality Dashboard
 * Cycle: Identify -> Investigate -> Analyze -> Correct -> Prevent -> Improve
 */

(function () {
  'use strict';

  const stagesData = [
    {
      id: 'identify',
      stepNumber: '01',
      title: 'Identify & Capture',
      subtitle: 'Deviation & Incident Detection',
      icon: 'search',
      color: 'blue',
      badge: 'Initial Anomaly Logging',
      objective: 'Timely and rigorous identification of deviations, out-of-specification (OOS) results, customer complaints, or batch discrepancies.',
      tools: ['Qualipro QMS', 'SAGE X3 Monitoring', 'Batch Record Review', 'Deviation Logbook'],
      standards: ['GMP / BPF Chapter 1', 'Good Documentation Practices (GDP)', 'ISO 9001:2015 §8.7'],
      deliverable: 'Formally registered Deviation Dossier / Complaint Record with initial impact assessment within 24 hours.',
      scenario: {
        title: 'Packaging Line Discrepancy Case',
        detail: 'Identification of label alignment deviation during blister cartoning of solid dosage forms at SAIPH.'
      },
      kpi: 'Deviation Capture Speed: < 24h from occurrence'
    },
    {
      id: 'investigate',
      stepNumber: '02',
      title: 'Investigate & Contain',
      subtitle: 'Immediate Quarantine & Evidence Gathering',
      icon: 'clipboard-check',
      color: 'teal',
      badge: 'Immediate Containment',
      objective: 'Immediate containment of affected batches or materials, cross-functional physical inspections, and systematic data gathering.',
      tools: ['Quarantine Status in SAGE X3', 'Line Clearance Check', 'ALCOA+ Audit Trail', 'Operator Interviews'],
      standards: ['EudraLex Vol 4 GMP', 'ICH Q10 Quality System', 'ISO 17025:2017 Lab Protocols'],
      deliverable: 'Quarantine Certificate, Immediate Containment Plan, and Detailed Investigation Timeline.',
      scenario: {
        title: 'Raw Material Lot Verification',
        detail: 'Containment of active pharmaceutical ingredient (API) drums pending microbiological verification.'
      },
      kpi: 'Containment Execution: 100% immediate lot quarantine'
    },
    {
      id: 'analyze',
      stepNumber: '03',
      title: 'Analyze & Root Cause',
      subtitle: 'Systemic Root Cause Analysis (RCA)',
      icon: 'git-branch',
      color: 'emerald',
      badge: 'Deep Root-Cause Tools',
      objective: 'Uncovering systemic, human, equipment, and environmental root causes rather than merely addressing superficial symptoms.',
      tools: ['Ishikawa (5M/6M Diagram)', '5 Whys Methodology', '8D Problem Solving', 'FMEA Risk Matrix'],
      standards: ['ICH Q9 Quality Risk Management', 'WHO Technical Report Series', 'FDA 21 CFR Part 211'],
      deliverable: 'Comprehensive Root Cause Investigation Dossier confirming primary root causes and contributing factors.',
      scenario: {
        title: 'Biotech Single-Use Filtration Analysis',
        detail: 'Root-cause analysis on pressure fluctuations during sterile filtration at Sartorius Stedim BIOTECH.'
      },
      kpi: 'RCA Precision: Zero repeat deviations from identified causes'
    },
    {
      id: 'correct',
      stepNumber: '04',
      title: 'Correct & Implement',
      subtitle: 'Targeted Corrective Actions',
      icon: 'shield-check',
      color: 'blue',
      badge: 'Immediate Remediation',
      objective: 'Execution of immediate, validated corrective measures to rectify non-conformities and ensure product safety.',
      tools: ['Action Plan Follow-up in Qualipro', 'Technical Adjustments', 'Batch Dossier Rectification', 'SOP Revision'],
      standards: ['GMP Batch Release Protocols', 'Annex 1 Sterile Manufacturing', 'ISO 9001 §10.2'],
      deliverable: 'Executed Correction Dossier with multi-department sign-offs and verified technical remediation.',
      scenario: {
        title: 'Production Equipment Recalibration',
        detail: 'Immediate recalibration and seal replacement on tablet compression tooling at TERIAK.'
      },
      kpi: 'CAPA On-Time Implementation: > 98%'
    },
    {
      id: 'prevent',
      stepNumber: '05',
      title: 'Prevent & Control',
      subtitle: 'Preventive Measures & Change Control',
      icon: 'lock',
      color: 'teal',
      badge: 'Change Management & Safeguards',
      objective: 'Implementing systemic preventive safeguards, formal Change Control, SOP upgrades, and workforce training to prevent recurrence.',
      tools: ['Formal Change Control Request', 'Qualipro Training Matrix', 'Poka-Yoke Error Proofing', 'Supplier Quality Audits'],
      standards: ['ICH Q10 Change Management', 'GMP Annex 15 Qualification', 'ISO 17025 Data Control'],
      deliverable: 'Approved Change Control File, Updated Standard Operating Procedures (SOPs), and Training Records.',
      scenario: {
        title: 'Standard Operating Procedure Overhaul',
        detail: 'Updating batch release checklists and training 40+ operators on visual inspection criteria.'
      },
      kpi: 'Preventive Effectiveness: 100% verified post-30/90 days'
    },
    {
      id: 'improve',
      stepNumber: '06',
      title: 'Improve & Optimize',
      subtitle: 'Continuous Improvement & PDCA',
      icon: 'trending-up',
      color: 'emerald',
      badge: 'Kaizen & Quality Excellence',
      objective: 'Closing the loop via management reviews, periodic quality reviews (PQR), internal audits, and Kaizen process optimization.',
      tools: ['Management Review Dashboards', 'Periodic Product Quality Review (PQR)', 'Internal Audits', 'Process Capability (Cp/Cpk)'],
      standards: ['Integrated QHSE Framework', 'ISO 14001 / ISO 45001 Synergies', 'Lean Six Sigma Principles'],
      deliverable: 'Annual Quality Review Summary, Performance KPI Dashboards, and Continuous Improvement Roadmap.',
      scenario: {
        title: 'Cross-Site Quality Harmonization',
        detail: 'Streamlined batch documentation flow reducing dossier review lead times by 25%.'
      },
      kpi: 'Cycle Efficiency: Measurable reduction in QA cycle time'
    }
  ];

  let currentStageIndex = 0;
  let autoPlayTimer = null;
  let isAutoPlay = false; // user interaction driven by default

  function renderStage(index) {
    const stage = stagesData[index];
    if (!stage) return;

    // Update active button classes
    const buttons = document.querySelectorAll('.quality-step-btn');
    buttons.forEach((btn, idx) => {
      if (idx === index) {
        btn.classList.add('active', 'border-sky-500', 'bg-white', 'shadow-lg');
        btn.classList.remove('border-slate-200', 'bg-white/70');
      } else {
        btn.classList.remove('active', 'border-sky-500', 'bg-white', 'shadow-lg');
        btn.classList.add('border-slate-200', 'bg-white/70');
      }
    });

    // Update Dashboard Elements
    const stepNumEl = document.getElementById('qc-step-number');
    const badgeEl = document.getElementById('qc-stage-badge');
    const titleEl = document.getElementById('qc-stage-title');
    const subtitleEl = document.getElementById('qc-stage-subtitle');
    const objectiveEl = document.getElementById('qc-stage-objective');
    const toolsContainer = document.getElementById('qc-stage-tools');
    const standardsContainer = document.getElementById('qc-stage-standards');
    const deliverableEl = document.getElementById('qc-stage-deliverable');
    const scenarioTitleEl = document.getElementById('qc-scenario-title');
    const scenarioDetailEl = document.getElementById('qc-scenario-detail');
    const kpiEl = document.getElementById('qc-stage-kpi');

    if (stepNumEl) stepNumEl.textContent = `PHASE ${stage.stepNumber} / 06`;
    if (badgeEl) badgeEl.textContent = stage.badge;
    if (titleEl) titleEl.textContent = stage.title;
    if (subtitleEl) subtitleEl.textContent = stage.subtitle;
    if (objectiveEl) objectiveEl.textContent = stage.objective;
    if (deliverableEl) deliverableEl.textContent = stage.deliverable;
    if (scenarioTitleEl) scenarioTitleEl.textContent = stage.scenario.title;
    if (scenarioDetailEl) scenarioDetailEl.textContent = stage.scenario.detail;
    if (kpiEl) kpiEl.textContent = stage.kpi;

    if (toolsContainer) {
      toolsContainer.innerHTML = stage.tools
        .map(tool => `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-sky-50 text-sky-800 border border-sky-200/70"><i data-lucide="check" class="w-3 h-3 text-sky-600"></i>${tool}</span>`)
        .join('');
    }

    if (standardsContainer) {
      standardsContainer.innerHTML = stage.standards
        .map(std => `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200/70"><i data-lucide="award" class="w-3 h-3 text-teal-600"></i>${std}</span>`)
        .join('');
    }

    // Refresh Lucide icons inside dynamic container
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function setupQualityCycle() {
    const buttons = document.querySelectorAll('.quality-step-btn');
    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        currentStageIndex = idx;
        renderStage(currentStageIndex);
      });
    });

    const prevBtn = document.getElementById('qc-prev-btn');
    const nextBtn = document.getElementById('qc-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentStageIndex = (currentStageIndex - 1 + stagesData.length) % stagesData.length;
        renderStage(currentStageIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentStageIndex = (currentStageIndex + 1) % stagesData.length;
        renderStage(currentStageIndex);
      });
    }

    // Initial render
    renderStage(0);
  }

  document.addEventListener('DOMContentLoaded', setupQualityCycle);
})();
