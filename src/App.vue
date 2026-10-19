<script setup>
import { useTheme } from './composables/useTheme.js';
import CanvasBackground from './components/CanvasBackground.vue';
import HeaderHUD from './components/HeaderHUD.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import GithubReposSection from './components/GithubReposSection.vue';
import ContactSection from './components/ContactSection.vue';
import FooterHUD from './components/FooterHUD.vue';

const { crtFlashActive } = useTheme();
</script>

<template>
  <div class="app-root">
    <!-- CRT Glitch Screen Flash for Netrunner Hack Mode -->
    <div
      v-if="crtFlashActive"
      id="hack-crt-flash"
      class="hack-crt-flash active"
      aria-hidden="true"
    ></div>

    <!-- SVG Filters for Cyberpunk Glitch & Wave Distortion -->
    <svg style="position: absolute; width: 0; height: 0; pointer-events: none;" aria-hidden="true">
      <defs>
        <filter id="cyber-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.95" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="cyber-distortion-strong">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.8" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </defs>
    </svg>

    <!-- Interactive Canvas 2D Neon Background Engine -->
    <CanvasBackground />

    <!-- Navigation Header HUD Capsule -->
    <HeaderHUD />

    <!-- Main Content -->
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <GithubReposSection />
      <ContactSection />
    </main>

    <!-- Footer HUD -->
    <FooterHUD />
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
</style>
