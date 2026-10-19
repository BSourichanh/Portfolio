<script setup>
import { useAudio } from '../composables/useAudio.js';

const { playClick, playHover } = useAudio();
const baseUrl = import.meta.env.BASE_URL;

const scrollToTop = () => {
  playClick();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h2>Bernard Sourichanh</h2>
          <p>
            Concepteur & Développeur pratique IA / Game Programmer en recherche d'alternance. Conception de
            mécaniques de gameplay, d'architectures logicielles et d'applications modernes.
          </p>
        </div>

        <div>
          <h3 class="footer-nav-title">Navigation</h3>
          <div class="footer-links">
            <a href="#hero" @mouseenter="playHover">Accueil</a>
            <a href="#a-propos" @mouseenter="playHover">Parcours & CV</a>
            <a href="#competences" @mouseenter="playHover">Compétences</a>
            <a href="#projets" @mouseenter="playHover">Jeux & Projets</a>
            <a href="#github" @mouseenter="playHover">GitHub</a>
            <a href="#loisirs" @mouseenter="playHover">Loisirs</a>
            <a href="#contact" @mouseenter="playHover">Contact</a>
          </div>
        </div>

        <div>
          <h3 class="footer-nav-title">Réseaux & Téléchargements</h3>
          <div class="footer-links">
            <a :href="`${baseUrl}CV.pdf`" target="_blank" rel="noopener noreferrer" class="footer-cv-link" @mouseenter="playHover">
              📄 Télécharger mon CV (PDF) ↗
            </a>
            <a href="https://github.com/BSourichanh" target="_blank" rel="noopener noreferrer" @mouseenter="playHover">
              GitHub (@BSourichanh) ↗
            </a>
            <a href="mailto:bernard.sourichanh@gmail.com" @mouseenter="playHover">
              Email (bernard.sourichanh@gmail.com) ↗
            </a>
            <a href="tel:0652767215" @mouseenter="playHover">
              Téléphone : 06 52 76 72 15 ↗
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 Bernard Sourichanh. Tous droits réservés.</p>
        <p>
          <a href="#hero" class="footer-back-top" @click.prevent="scrollToTop" @mouseenter="playHover">
            ↑ Retour en haut de page
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
