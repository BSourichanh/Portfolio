<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useTheme } from '../composables/useTheme.js';

const canvasRef = ref(null);
const { isHacked } = useTheme();

let animationFrameId = null;
let isTabVisible = true;
let width = 0;
let height = 0;
let time = 0;

const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

const mouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  active: false,
  radius: 200
};

const ripples = [];
const nodes = [];
const ambientHalos = [];
const maxHalos = 6;

// Matrix rain parameters
const CYBER_MATRIX_CHARS = '01XYZABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ░▒▓█▄▀Ø§≠±√∂∆0101';
const matrixStreams = [];
const burstGlyphs = [];
const matrixColWidth = 28;
let glitchActive = false;
let glitchOffset = 0;

const waves = [
  { yRatio: 0.28, offset: 0, speed: 0.006, freq: 0.0028, amp: 40 },
  { yRatio: 0.55, offset: Math.PI * 0.65, speed: 0.005, freq: 0.0022, amp: 48 },
  { yRatio: 0.82, offset: Math.PI * 1.35, speed: 0.007, freq: 0.0032, amp: 38 }
];

const getCyberHue = (offset = 0, speed = 0.0035) => {
  const t = time * speed + offset;
  const norm = (Math.sin(t) + 1) * 0.5;
  if (isHacked.value) {
    return (norm * 22 + 348) % 360; // Cyberpunk Crimson Alert
  }
  return 145 + norm * 130; // Aurora Borealis: Emerald -> Polar Cyan -> Arctic Blue -> Aurora Violet
};

const getHaloColors = () => {
  if (isHacked.value) {
    return [
      '255, 0, 60',
      '220, 38, 38',
      '185, 28, 28',
      '255, 20, 20',
      '153, 27, 27'
    ];
  }
  return [
    '0, 245, 180',
    '0, 240, 255',
    '56, 189, 248',
    '168, 85, 247',
    '129, 140, 248',
    '236, 72, 153'
  ];
};

const createNode = (staggered = false) => {
  const maxLife = 260 + Math.random() * 260;
  const life = staggered ? Math.random() * maxLife * 0.8 : 0;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.3 : 0.85),
    vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.3 : 0.85),
    baseSize: 2.2 + Math.random() * 1.6,
    baseOffset: Math.random() * Math.PI * 2,
    hue: 330,
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.035 + Math.random() * 0.035,
    life,
    maxLife,
    fadeAlpha: 0
  };
};

const initNodes = () => {
  nodes.length = 0;
  const baseCount = Math.floor(width / 70);
  const count = prefersReducedMotion ? 8 : Math.min(26, Math.max(16, baseCount));
  for (let i = 0; i < count; i++) {
    nodes.push(createNode(true));
  }
};

const initHalos = () => {
  ambientHalos.length = 0;
  const colors = getHaloColors();
  for (let i = 0; i < maxHalos; i++) {
    ambientHalos.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      baseRadius: Math.min(width, height) * (0.24 + Math.random() * 0.18),
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.007 + Math.random() * 0.007,
      color: colors[i % colors.length],
      alpha: 0.03 + Math.random() * 0.03
    });
  }
};

const initMatrixStreams = () => {
  matrixStreams.length = 0;
  const cols = Math.floor(width / matrixColWidth) + 1;
  for (let i = 0; i < cols; i++) {
    const streamLen = Math.floor(10 + Math.random() * 22);
    const chars = [];
    for (let c = 0; c < streamLen; c++) {
      chars.push(CYBER_MATRIX_CHARS[Math.floor(Math.random() * CYBER_MATRIX_CHARS.length)]);
    }
    matrixStreams.push({
      x: i * matrixColWidth + (Math.random() - 0.5) * 4,
      y: (Math.random() - 1.2) * height,
      speed: 3.5 + Math.random() * 6.5,
      chars,
      streamLen,
      changeInterval: Math.floor(4 + Math.random() * 12),
      timer: 0,
      headAlpha: 0.85 + Math.random() * 0.15,
      tailAlpha: 0.18 + Math.random() * 0.22,
      fontSize: 13 + Math.floor(Math.random() * 3)
    });
  }
};

const addRipple = (x, y, maxR = 170, color = null) => {
  if (prefersReducedMotion) return;
  const rippleColor = color || (isHacked.value ? '255, 0, 60' : '0, 240, 255');
  ripples.push({
    x,
    y,
    radius: 5,
    maxRadius: maxR,
    alpha: 0.85,
    speed: 3.8,
    color: rippleColor,
    lineWidth: 1.8
  });
};

const triggerGlitch = () => {
  glitchActive = true;
  glitchOffset = (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 24);
  setTimeout(() => {
    glitchActive = false;
  }, 110);
};

const onResize = () => {
  if (!canvasRef.value) return;
  width = window.innerWidth;
  height = window.innerHeight;
  canvasRef.value.width = width;
  canvasRef.value.height = height;
  initNodes();
  initHalos();
  if (isHacked.value) initMatrixStreams();
};

const onPointerMove = (e) => {
  mouse.targetX = e.clientX;
  mouse.targetY = e.clientY;
  mouse.active = true;

  if (Math.random() < 0.05) {
    addRipple(e.clientX, e.clientY, 85);
  }
};

const onPointerLeave = () => {
  mouse.active = false;
};

const onPointerDown = (e) => {
  addRipple(e.clientX, e.clientY, 260, isHacked.value ? '255, 0, 60' : '0, 240, 255');
  if (isHacked.value) triggerGlitch();
};

const onVisibilityChange = () => {
  isTabVisible = !document.hidden;
};

const draw = () => {
  if (!canvasRef.value || !isTabVisible) {
    animationFrameId = requestAnimationFrame(draw);
    return;
  }

  const ctx = canvasRef.value.getContext('2d');
  if (!ctx) return;

  time++;

  mouse.x += (mouse.targetX - mouse.x) * 0.15;
  mouse.y += (mouse.targetY - mouse.y) * 0.15;

  ctx.clearRect(0, 0, width, height);

  // 1. Ambient Halos
  for (let i = 0; i < ambientHalos.length; i++) {
    const halo = ambientHalos[i];
    halo.pulsePhase += halo.pulseSpeed;
    const pulseFactor = 0.88 + Math.sin(halo.pulsePhase) * 0.12;
    const radius = halo.baseRadius * pulseFactor;

    halo.x += halo.vx;
    halo.y += halo.vy;

    if (halo.x < -radius) halo.x = width + radius;
    if (halo.x > width + radius) halo.x = -radius;
    if (halo.y < -radius) halo.y = height + radius;
    if (halo.y > height + radius) halo.y = -radius;

    const grad = ctx.createRadialGradient(halo.x, halo.y, 0, halo.x, halo.y, radius);
    grad.addColorStop(0, `rgba(${halo.color}, ${halo.alpha * pulseFactor})`);
    grad.addColorStop(0.5, `rgba(${halo.color}, ${halo.alpha * 0.35 * pulseFactor})`);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(halo.x, halo.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i];
    r.radius += r.speed;
    r.alpha = Math.max(0, 1 - r.radius / r.maxRadius);

    if (r.alpha <= 0.01 || r.radius >= r.maxRadius) {
      ripples.splice(i, 1);
      continue;
    }

    ctx.strokeStyle = `rgba(${r.color}, ${r.alpha * 0.55})`;
    ctx.lineWidth = r.lineWidth * (1 - r.radius / r.maxRadius);
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 3. Cyberpunk Matrix Streams (Hacked Mode)
  if (isHacked.value) {
    ctx.save();
    ctx.font = '14px "Share Tech Mono", monospace';

    for (let i = 0; i < matrixStreams.length; i++) {
      const s = matrixStreams[i];
      s.y += s.speed;
      s.timer++;
      if (s.timer % s.changeInterval === 0) {
        const replaceIdx = Math.floor(Math.random() * s.chars.length);
        s.chars[replaceIdx] = CYBER_MATRIX_CHARS[Math.floor(Math.random() * CYBER_MATRIX_CHARS.length)];
      }

      if (s.y - s.chars.length * 16 > height) {
        s.y = -s.chars.length * 16 - Math.random() * 200;
        s.speed = 3.5 + Math.random() * 6.5;
      }

      for (let j = 0; j < s.chars.length; j++) {
        const charY = s.y + j * 16;
        if (charY < -20 || charY > height + 20) continue;

        const isHead = (j === s.chars.length - 1);
        if (isHead) {
          ctx.fillStyle = `rgba(255, 255, 255, ${s.headAlpha})`;
          ctx.shadowColor = '#ff003c';
          ctx.shadowBlur = 10;
        } else {
          const ratio = j / s.chars.length;
          const a = s.tailAlpha * ratio;
          ctx.fillStyle = `rgba(255, 20, 60, ${a})`;
          ctx.shadowBlur = 0;
        }
        ctx.fillText(s.chars[j], s.x, charY);
      }
    }
    ctx.restore();
  }

  // 4. Floating Nodes (Aurora Theme ONLY)
  if (!isHacked.value) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const currentSpeed = Math.hypot(node.vx, node.vy);
      const speedBurnFactor = 1 + Math.max(0, (currentSpeed - 0.7) * 2.2);
      node.life += speedBurnFactor;

      const fadeInFrames = node.maxLife * 0.18;
      const fadeOutStart = node.maxLife * 0.78;

      if (node.life < fadeInFrames) {
        node.fadeAlpha = node.life / fadeInFrames;
      } else if (node.life > fadeOutStart) {
        node.fadeAlpha = Math.max(0, (node.maxLife - node.life) / (node.maxLife - fadeOutStart));
      } else {
        node.fadeAlpha = 1.0;
      }

      if (node.life >= node.maxLife || node.fadeAlpha <= 0.001) {
        Object.assign(node, createNode(false));
      }

      node.x += node.vx;
      node.y += node.vy;

      node.vx *= 0.985;
      node.vy *= 0.985;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      node.pulsePhase += node.pulseSpeed;
      node.hue = getCyberHue(node.baseOffset, 0.003);
      const intensity = 0.5 + Math.sin(node.pulsePhase) * 0.5;
      const currentRadius = node.baseSize * (0.8 + intensity * 0.55);

      // Render node sphere
      const sphereAlpha = (0.65 + intensity * 0.35) * node.fadeAlpha;
      ctx.fillStyle = `hsla(${node.hue}, 100%, 65%, ${sphereAlpha})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core incandescent point
      const coreAlpha = (0.75 + intensity * 0.25) * node.fadeAlpha;
      ctx.fillStyle = `rgba(255, 255, 255, ${coreAlpha})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentRadius * 0.45, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 5. Reticle in Hacked Mode
  if (isHacked.value && mouse.active) {
    const mx = mouse.x;
    const my = mouse.y;
    ctx.save();
    const boxSize = 16;
    ctx.strokeStyle = 'rgba(255, 0, 60, 0.85)';
    ctx.lineWidth = 1.5;

    // Corner brackets
    ctx.beginPath();
    ctx.moveTo(mx - boxSize, my - boxSize + 6);
    ctx.lineTo(mx - boxSize, my - boxSize);
    ctx.lineTo(mx - boxSize + 6, my - boxSize);

    ctx.moveTo(mx + boxSize - 6, my - boxSize);
    ctx.lineTo(mx + boxSize, my - boxSize);
    ctx.lineTo(mx + boxSize, my - boxSize + 6);

    ctx.moveTo(mx - boxSize, my + boxSize - 6);
    ctx.lineTo(mx - boxSize, my + boxSize);
    ctx.lineTo(mx - boxSize + 6, my + boxSize);

    ctx.moveTo(mx + boxSize - 6, my + boxSize);
    ctx.lineTo(mx + boxSize, my + boxSize);
    ctx.lineTo(mx + boxSize, my + boxSize - 6);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '10px "Share Tech Mono", monospace';
    ctx.fillText(`LOC: ${Math.round(mx)},${Math.round(my)}`, mx + boxSize + 6, my - 2);
    ctx.restore();
  }

  animationFrameId = requestAnimationFrame(draw);
};

onMounted(() => {
  onResize();
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerleave', onPointerLeave, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);

  animationFrameId = requestAnimationFrame(draw);
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerleave', onPointerLeave);
  window.removeEventListener('pointerdown', onPointerDown);
  document.removeEventListener('visibilitychange', onVisibilityChange);
});
</script>

<template>
  <canvas
    ref="canvasRef"
    id="bg-canvas"
    class="bg-canvas"
    aria-hidden="true"
  />
</template>

<style scoped>
.bg-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  background-color: var(--bg-dark, #060913);
}
</style>
