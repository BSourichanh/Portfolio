<script setup>
import { ref, computed } from 'vue';
import { PROJECTS_DATA } from '../data/projectsData.js';
import { useAudio } from '../composables/useAudio.js';
import ProjectModal from './ProjectModal.vue';
import LightboxModal from './LightboxModal.vue';

const selectedCategory = ref('all');
const activeModalProject = ref(null);
const activeLightbox = ref(null);

const { playClick, playHover } = useAudio();

const categories = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'jeux', label: 'Jeux Vidéo & Moteurs' },
  { id: 'web', label: 'Applications & Mobile' }
];

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return PROJECTS_DATA;
  }
  return PROJECTS_DATA.filter(p => p.category === selectedCategory.value);
});

const selectFilter = (catId) => {
  selectedCategory.value = catId;
  playClick();
};

const openProjectModal = (project) => {
  activeModalProject.value = project;
  playClick();
};

const closeProjectModal = () => {
  activeModalProject.value = null;
};

const openLightbox = (data) => {
  activeLightbox.value = data;
};

const closeLightbox = () => {
  activeLightbox.value = null;
};
</script>

<template>
  <section id="projets">
    <div class="container">
      <div class="text-center">
        <h2 class="section-title" id="title-projets">Mes Projets de Jeux & Applications</h2>
        <p class="section-subtitle" id="subtitle-projets">
          Sélection de réalisations majeures en Game Programming, conception logicielle et mobile
        </p>
      </div>

      <!-- Filtres réactifs -->
      <div class="projects-filter-bar" role="tablist" aria-label="Filtrer les projets">
        <button
          v-for="cat in categories"
          :key="cat.id"
          role="tab"
          :aria-selected="selectedCategory === cat.id"
          class="filter-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectFilter(cat.id)"
          @mouseenter="playHover"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Grille des cartes projets -->
      <div class="projects-grid">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card"
        >
          <img
            :src="project.thumb"
            :alt="`${project.title} Miniature`"
            class="project-thumb"
            loading="lazy"
          />
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.desc }}</p>
            <div class="project-footer">
              <span :class="['badge', project.badgeClass]">{{ project.badge }}</span>
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="openProjectModal(project)"
                @mouseenter="playHover"
              >
                Voir la fiche complète →
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Modale du Projet Sélectionné -->
    <Teleport to="body">
      <ProjectModal
        v-if="activeModalProject"
        :project="activeModalProject"
        @close="closeProjectModal"
        @open-lightbox="openLightbox"
      />

      <LightboxModal
        v-if="activeLightbox"
        :src="activeLightbox.src"
        :alt="activeLightbox.alt"
        @close="closeLightbox"
      />
    </Teleport>
  </section>
</template>
