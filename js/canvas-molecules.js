/**
 * NERMINE TOUATI - PHARMACEUTICAL QUALITY PORTFOLIO
 * canvas-molecules.js
 * Enhanced Pharmaceutical & Biotech Canvas:
 * - Benzene hexagonal molecular rings with aromatic core
 * - Smooth 3D-drifting pharmaceutical capsules
 * - DNA double-helix spiral nodes with rotating base pairs
 * - Connected quality data streams
 * - Subtle lab particle physics
 */

(function () {
  'use strict';

  const canvas = document.getElementById('bg-molecules-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let width, height, dpr;
  let animationFrameId;
  let mouse = { x: null, y: null, radius: 130 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particles = [];
  const molecules = [];
  const capsules = [];
  const crosses = [];

  const PARTICLE_COUNT = 38;
  const MOLECULE_COUNT = 7;
  const CAPSULE_COUNT = 6;
  const CROSS_COUNT = 6;
  const MAX_CONNECT_DISTANCE = 120;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    initEntities();
  }

  // 1. Quality Data Node / Lab Particle
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.25 + 0.12;
      this.color = Math.random() > 0.5 ? '2, 132, 199' : '13, 148, 136';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  // 2. Benzene Ring Molecule
  class Molecule {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.18;
      this.vy = (Math.random() - 0.5) * 0.18;
      this.radius = Math.random() * 14 + 18;
      this.angle = Math.random() * Math.PI * 2;
      this.vAngle = (Math.random() - 0.5) * 0.003;
      this.alpha = Math.random() * 0.18 + 0.12;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.vAngle;

      if (this.x < -50) this.x = width + 50;
      if (this.x > width + 50) this.x = -50;
      if (this.y < -50) this.y = height + 50;
      if (this.y > height + 50) this.y = -50;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      const sides = 6;
      const points = [];
      for (let i = 0; i < sides; i++) {
        const a = (i * 2 * Math.PI) / sides;
        points.push({
          x: Math.cos(a) * this.radius,
          y: Math.sin(a) * this.radius
        });
      }

      // Draw outer hexagon
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < sides; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(2, 132, 199, ${this.alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Inner aromatic ring
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 0.55, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(13, 148, 136, ${this.alpha * 0.8})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Atoms at vertices
      points.forEach((p, index) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = index % 2 === 0 ? `rgba(2, 132, 199, ${this.alpha + 0.2})` : `rgba(13, 148, 136, ${this.alpha + 0.2})`;
        ctx.fill();
      });

      // Functional group line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[0].x * 1.45, points[0].y * 1.45);
      ctx.strokeStyle = `rgba(2, 132, 199, ${this.alpha * 0.8})`;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(points[0].x * 1.45, points[0].y * 1.45, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(5, 150, 105, ${this.alpha + 0.25})`;
      ctx.fill();

      ctx.restore();
    }
  }

  // 3. Pharmaceutical Two-Tone Capsule
  class Capsule {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.15;
      this.vy = (Math.random() - 0.5) * 0.15;
      this.length = Math.random() * 8 + 24;
      this.width = Math.random() * 3 + 10;
      this.angle = Math.random() * Math.PI * 2;
      this.vAngle = (Math.random() - 0.5) * 0.003;
      this.alpha = Math.random() * 0.16 + 0.1;
      this.isTeal = Math.random() > 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.vAngle;

      if (this.x < -40) this.x = width + 40;
      if (this.x > width + 40) this.x = -40;
      if (this.y < -40) this.y = height + 40;
      if (this.y > height + 40) this.y = -40;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      const r = this.width / 2;
      const l = this.length / 2;

      // Full Capsule shape
      ctx.beginPath();
      ctx.arc(-l + r, 0, r, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(l - r, -r);
      ctx.arc(l - r, 0, r, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.lineTo(-l + r, r);
      ctx.closePath();

      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.9})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(2, 132, 199, ${this.alpha * 0.9})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Half colored side
      ctx.beginPath();
      ctx.arc(l - r, 0, r, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.lineTo(0, r);
      ctx.lineTo(0, -r);
      ctx.closePath();
      ctx.fillStyle = this.isTeal
        ? `rgba(13, 148, 136, ${this.alpha * 0.7})`
        : `rgba(2, 132, 199, ${this.alpha * 0.7})`;
      ctx.fill();

      // Divider line
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(0, r);
      ctx.strokeStyle = `rgba(2, 132, 199, ${this.alpha * 1.2})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }
  }

  // 4. Medical Cross Icon
  class MedicalCross {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.12;
      this.vy = (Math.random() - 0.5) * 0.12;
      this.size = Math.random() * 4 + 8;
      this.alpha = Math.random() * 0.12 + 0.06;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);

      const s = this.size;
      const t = s / 3;

      ctx.beginPath();
      ctx.rect(-t / 2, -s / 2, t, s);
      ctx.rect(-s / 2, -t / 2, s, t);
      ctx.fillStyle = `rgba(13, 148, 136, ${this.alpha})`;
      ctx.fill();

      ctx.restore();
    }
  }

  // 5. DNA Helix Wave
  let dnaTimer = 0;
  function drawDnaHelix() {
    dnaTimer += 0.01;
    const strandWidth = Math.min(width * 0.8, 1000);
    const startX = (width - strandWidth) / 2;
    const centerY = height * 0.82;
    const steps = 20;

    for (let i = 0; i < steps; i++) {
      const progress = i / steps;
      const x = startX + progress * strandWidth;
      const phase = dnaTimer + progress * Math.PI * 3.5;
      const yOffset = Math.sin(phase) * 16;
      const zOffset = Math.cos(phase);

      const y1 = centerY + yOffset;
      const y2 = centerY - yOffset;

      const alpha1 = (zOffset + 1.2) * 0.07;
      const alpha2 = (-zOffset + 1.2) * 0.07;

      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.strokeStyle = `rgba(2, 132, 199, ${(alpha1 + alpha2) * 0.5})`;
      ctx.lineWidth = 0.9;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y1, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(2, 132, 199, ${alpha1 + 0.05})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y2, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(13, 148, 136, ${alpha2 + 0.05})`;
      ctx.fill();
    }
  }

  function initEntities() {
    particles.length = 0;
    molecules.length = 0;
    capsules.length = 0;
    crosses.length = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    for (let i = 0; i < MOLECULE_COUNT; i++) molecules.push(new Molecule());
    for (let i = 0; i < CAPSULE_COUNT; i++) capsules.push(new Capsule());
    for (let i = 0; i < CROSS_COUNT; i++) crosses.push(new MedicalCross());
  }

  function drawConnections() {
    const len = particles.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_CONNECT_DISTANCE) {
          const alpha = (1 - dist / MAX_CONNECT_DISTANCE) * 0.14;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    drawDnaHelix();

    crosses.forEach((c) => { c.update(); c.draw(); });
    capsules.forEach((cap) => { cap.update(); cap.draw(); });
    molecules.forEach((m) => { m.update(); m.draw(); });
    particles.forEach((p) => { p.update(); p.draw(); });
    drawConnections();

    animationFrameId = requestAnimationFrame(animate);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animationFrameId = requestAnimationFrame(animate);
    }
  });

  window.addEventListener('resize', resize);
  resize();
  animate();
})();
