<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAudio } from '../composables/useAudio.js';
import { useTheme } from '../composables/useTheme.js';

const isMenuOpen = ref(false);
const activeSection = ref('hero');
const isScrolled = ref(false);

const { isMuted, toggleMute, playClick, playHover } = useAudio();
const { isHacked, toggleCyberpunkMode } = useTheme();

const navLinks = [
  { href: '#hero', id: 'hero', label: 'Accueil' },
  { href: '#a-propos', id: 'a-propos', label: 'Parcours' },
  { href: '#competences', id: 'competences', label: 'Compétences' },
  { href: '#projets', id: 'projets', label: 'Jeux & Projets' },
  { href: '#github', id: 'github', label: 'GitHub' },
  { href: '#loisirs', id: 'loisirs', label: 'Loisirs' },
  { href: '#contact', id: 'contact', label: 'Contact' }
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  playClick();
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleNavClick = (id) => {
  activeSection.value = id;
  closeMenu();
  playClick();
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40;

  // ScrollSpy
  const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean);
  const scrollPosition = window.scrollY + 180;

  for (let i = sections.length - 1; i >= 0; i--) {
    const sec = sections[i];
    if (sec.offsetTop <= scrollPosition) {
      activeSection.value = sec.id;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header :class="['site-header', { 'is-scrolled': isScrolled, 'is-open': isMenuOpen }]">
    <div class="nav-container">
      <a href="#hero" class="nav-logo" @click="handleNavClick('hero')" @mouseenter="playHover">
        <span>BERNARD</span> SOURICHANH
      </a>

      <!-- Burger Mobile Button -->
      <button
        class="burger-btn"
        :class="{ active: isMenuOpen }"
        aria-label="Ouvrir le menu de navigation"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Desktop & Drawer Menu -->
      <nav :class="['nav-menu', { active: isMenuOpen }]" aria-label="Navigation principale">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          :class="['nav-link', { active: activeSection === link.id }]"
          @click="handleNavClick(link.id)"
          @mouseenter="playHover"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Controls: Audio Toggle & Mode Blackwall -->
      <div class="nav-controls">
        <button
          type="button"
          class="nav-icon-btn"
          :class="{ muted: isMuted }"
          :aria-label="isMuted ? 'Activer le son' : 'Désactiver le son'"
          :title="isMuted ? 'Audio désactivé' : 'Audio activé'"
          @click="toggleMute"
        >
          <svg v-if="!isMuted" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-2.5 9.77l-4.5-4h-4v6h4l4.5 4v-12l-4.5 4v2zm4-6.29v2.06c1.39.49 2.5 1.76 2.5 3.23s-1.11 2.74-2.5 3.23v2.06c2.51-.57 4.5-2.82 4.5-5.29s-1.99-4.72-4.5-5.29z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09l2.09 2.09V4z"/>
          </svg>
        </button>

        <button
          type="button"
          class="nav-icon-btn hack-toggle"
          :class="{ active: isHacked }"
          :aria-label="isHacked ? 'Quitter le mode Cyberpunk' : 'Activer le mode Cyberpunk'"
          :title="isHacked ? 'Mode Netrunner actif' : 'Mode Aurora actif'"
          @click="toggleCyberpunkMode"
        >
          <span class="hud-status-dot"></span>
          <span class="hud-status-text">{{ isHacked ? 'NETRUNNER' : 'AURORA' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-controls {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.nav-icon-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  color: var(--text-color, #e2e8f0);
  border-radius: 9999px;
  padding: 0.45rem 0.65rem;
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.nav-icon-btn:hover {
  background: rgba(0, 240, 255, 0.12);
  border-color: var(--neon-cyan, #00f0ff);
  color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.35);
}

.nav-icon-btn.muted {
  opacity: 0.5;
}

.nav-icon-btn.hack-toggle.active {
  background: rgba(255, 0, 60, 0.18);
  border-color: var(--neon-crimson, #ff003c);
  color: var(--neon-crimson, #ff003c);
  box-shadow: 0 0 12px rgba(255, 0, 60, 0.4);
}

.hud-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--neon-cyan, #00f0ff);
  box-shadow: 0 0 6px var(--neon-cyan, #00f0ff);
}

.nav-icon-btn.hack-toggle.active .hud-status-dot {
  background: var(--neon-crimson, #ff003c);
  box-shadow: 0 0 6px var(--neon-crimson, #ff003c);
}
</style>
