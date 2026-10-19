<script setup>
import { computed } from 'vue';
import { useTheme } from '../composables/useTheme.js';
import { useAudio } from '../composables/useAudio.js';

const { isHacked, clickCount, registerAvatarClick } = useTheme();
const { playHover, playClick } = useAudio();

const baseUrl = import.meta.env.BASE_URL;

const avatarTitle = computed(() => {
  return isHacked.value
    ? 'Bernard Sourichanh [Mode Cyberpunk Blackwall]'
    : 'Bernard Sourichanh [Thème Aurora]';
});

const hackCounterText = computed(() => {
  return `[CYBERPUNK: ${clickCount.value}/10]`;
});
</script>

<template>
  <section id="hero" class="hero">
    <div class="container hero-grid">
      <div class="hero-content">
        <p class="hero-tagline" id="hero-tagline">
          Recherche Alternance — Concepteur & Développeur IA / Full-Stack
        </p>

        <h1 class="hero-title" id="hero-title">
          BERNARD <span>SOURICHANH</span>
        </h1>

        <h2 class="hero-subtitle" id="hero-subtitle">
          Concepteur & Développeur Pratique IA / Game Programmer
        </h2>

        <p class="hero-description">
          En formation <strong>RNCP Niveau 6</strong> au <em>Campus Numérique in the Alps</em>, je
          recherche une <strong>alternance</strong> en tant que développeur full-stack (Web / Application
          / IA) ou en Game Programming. Passionné par la conception d'architectures logicielles, les
          moteurs temps réel (<strong>Unreal Engine</strong>, <strong>Unity</strong>) et la programmation
          <strong>Java</strong>, <strong>C# (.NET)</strong>, <strong>C++</strong> et <strong>SQL</strong>.
        </p>

        <div class="hero-cta">
          <a
            :href="`${baseUrl}CV.pdf`"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
            @mouseenter="playHover"
            @click="playClick"
          >
            Télécharger mon CV (PDF)
          </a>
          <a
            href="#projets"
            class="btn btn-outline"
            @mouseenter="playHover"
            @click="playClick"
          >
            Explorer mes projets
          </a>
          <a
            href="#contact"
            class="btn btn-secondary"
            @mouseenter="playHover"
            @click="playClick"
          >
            Me contacter
          </a>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <h3>RNCP 6</h3>
            <p>Titre en cours</p>
          </div>
          <div class="stat-item">
            <h3>4+</h3>
            <p>Jeux Majeurs</p>
          </div>
          <div class="stat-item">
            <h3>Java / C# / C++</h3>
            <p>Full-Stack & Game Dev</p>
          </div>
        </div>
      </div>

      <div class="hero-image-wrapper">
        <div
          class="hero-avatar-frame"
          id="hero-avatar-frame"
          role="button"
          tabindex="0"
          :title="avatarTitle"
          aria-label="Avatar interactif - Cliquer pour déclencher le mode Cyberpunk"
          @click="registerAvatarClick"
          @keydown.enter="registerAvatarClick"
          @keydown.space.prevent="registerAvatarClick"
        >
          <img :src="`${baseUrl}Images/pp.jpeg`" alt="Bernard Sourichanh Photo" class="hero-avatar" />
          <div class="hero-badge-float">
            <span class="dot"></span>
            <span id="hero-badge-text">{{ isHacked ? 'OVERDRIVE ACTIVE' : "Don't click me" }}</span>
          </div>
          <div class="avatar-hack-counter" aria-hidden="true">
            {{ hackCounterText }}
          </div>
          <div class="avatar-reticle" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </section>
</template>
