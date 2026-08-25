/**
 * NERMINE TOUATI - ULTRA-MODERN PHARMACEUTICAL CANVAS ENGINE
 * canvas-molecules.js
 * High-performance, futuristic canvas rendering:
 * - 3D-projected rotating Benzene rings with glowing aromatic clouds
 * - 3D pharmaceutical capsules with specular light reflection
 * - Dynamic DNA double-helix spiral with cyan/violet nucleotide base pairs
 * - Interconnected quality data network with cursor repulsion/attraction
 */

(function () {
  'use strict';

  const canvas = document.getElementById('bg-molecules-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let width, height, dpr;
  let animationFrameId;
  let mouse = { x: null, y: null, radius: 140 };

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

  const PARTICLE_COUNT = 36;
  const MOLECULE_COUNT = 7;
  const CAPSULE_COUNT = 6;
  const CROSS_COUNT = 6;
  const MAX_CONNECT_DISTANCE = 130;

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

  // 1. Futuristic Data Node Particle
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.28;
      this.vy = (Math.random() - 0.5) * 0.28;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.25 + 0.15;
      this.color = Math.random() > 0.5 ? '2, 132, 199' : '6, 182, 212';
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
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
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

  // 2. Benzene Ring Molecule with 3D Depth & Glowing Bonds
  class Molecule {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.18;
      this.vy = (Math.random() - 0.5) * 0.18;
      this.radius = Math.random() * 12 + 18;
      this.angle = Math.random() * Math.PI * 2;
      this.vAngle = (Math.random() - 0.5) * 0.004;
      this.alpha = Math.random() * 0.2 + 0.12;
      this.isCyan = Math.random() > 0.4;
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

      // Outer hexagon
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < sides; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.strokeStyle = this.isCyan
        ? `rgba(6, 182, 212, ${this.alpha * 1.1})`
        : `rgba(99, 102, 241, ${this.alpha * 1.1})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Inner aromatic electron circle
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 0.52, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(2, 132, 199, ${this.alpha * 0.75})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Carbon/Nitrogen atom vertices
      points.forEach((p, index) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = index % 2 === 0
          ? `rgba(6, 182, 212, ${this.alpha + 0.25})`
          : `rgba(99, 102, 241, ${this.alpha + 0.25})`;
        ctx.fill();
      });

      // Radiating covalent branch
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[0].x * 1.45, points[0].y * 1.45);
      ctx.strokeStyle = `rgba(2, 132, 199, ${this.alpha * 0.9})`;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(points[0].x * 1.45, points[0].y * 1.45, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 185, 129, ${this.alpha + 0.3})`;
      ctx.fill();

      ctx.restore();
    }
  }

  // 3. 3D Pharmaceutical Capsule with Light Specular Reflection
  class Capsule {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.16;
      this.vy = (Math.random() - 0.5) * 0.16;
      this.length = Math.random() * 8 + 22;
      this.width = Math.random() * 3 + 10;
      this.angle = Math.random() * Math.PI * 2;
      this.vAngle = (Math.random() - 0.5) * 0.0035;
      this.alpha = Math.random() * 0.18 + 0.12;
      this.colorType = Math.random() > 0.5 ? 'cyan' : 'violet';
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

      // Full Capsule Shape
      ctx.beginPath();
      ctx.arc(-l + r, 0, r, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(l - r, -r);
      ctx.arc(l - r, 0, r, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.lineTo(-l + r, r);
      ctx.closePath();

      // Clinical glass fill
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.95})`;
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
      ctx.fillStyle = this.colorType === 'cyan'
        ? `rgba(6, 182, 212, ${this.alpha * 0.75})`
        : `rgba(99, 102, 241, ${this.alpha * 0.65})`;
      ctx.fill();

      // Divider band
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(0, r);
      ctx.strokeStyle = `rgba(2, 132, 199, ${this.alpha * 1.3})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    }
  }

  // 4. Subtle Medical Cross
  class MedicalCross {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.12;
      this.vy = (Math.random() - 0.5) * 0.12;
      this.size = Math.random() * 4 + 8;
      this.alpha = Math.random() * 0.14 + 0.06;
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
      ctx.fillStyle = `rgba(6, 182, 212, ${this.alpha})`;
      ctx.fill();

      ctx.restore();
    }
  }

  // 5. DNA Double-Helix Strand
  let dnaTimer = 0;
  function drawDnaHelix() {
    dnaTimer += 0.012;
    const strandWidth = Math.min(width * 0.85, 1100);
    const startX = (width - strandWidth) / 2;
    const centerY = height * 0.84;
    const steps = 22;

    for (let i = 0; i < steps; i++) {
      const progress = i / steps;
      const x = startX + progress * strandWidth;
      const phase = dnaTimer + progress * Math.PI * 4;
      const yOffset = Math.sin(phase) * 18;
      const zOffset = Math.cos(phase);

      const y1 = centerY + yOffset;
      const y2 = centerY - yOffset;

      const alpha1 = (zOffset + 1.2) * 0.08;
      const alpha2 = (-zOffset + 1.2) * 0.08;

      // Base pair hydrogen bond
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.strokeStyle = `rgba(2, 132, 199, ${(alpha1 + alpha2) * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Strand 1 Nucleotide (Cyan)
      ctx.beginPath();
      ctx.arc(x, y1, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${alpha1 + 0.08})`;
      ctx.fill();

      // Strand 2 Nucleotide (Violet)
      ctx.beginPath();
      ctx.arc(x, y2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${alpha2 + 0.08})`;
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
          const alpha = (1 - dist / MAX_CONNECT_DISTANCE) * 0.16;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
          ctx.lineWidth = 0.9;
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
