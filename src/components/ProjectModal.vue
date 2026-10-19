<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useAudio } from '../composables/useAudio.js';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'open-lightbox']);
const { playClick, playHover } = useAudio();

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    emit('close');
  }
};

const handleImageClick = (src, alt) => {
  playClick();
  emit('open-lightbox', { src, alt });
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <div
    class="project-modal active"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="`modal-${project.id}-title`"
    @click.self="emit('close')"
  >
    <div class="project-modal-content">
      <button
        class="project-modal-close"
        aria-label="Fermer la boîte de dialogue"
        @click="emit('close')"
      >
        &times;
      </button>

      <span class="project-breadcrumb">{{ project.breadcrumb }}</span>
      <h2 :id="`modal-${project.id}-title`">{{ project.title }}</h2>

      <div class="project-tags mb-md">
        <span
          v-for="(tag, idx) in project.tags"
          :key="idx"
          :class="['badge', tag.class]"
        >
          {{ tag.text }}
        </span>
      </div>

      <img
        :src="project.cover"
        :alt="`${project.title} Cover`"
        class="modal-cover-img clickable-image"
        @click="handleImageClick(project.cover, `${project.title} Cover`)"
        @mouseenter="playHover"
      />

      <h3>📋 {{ project.pitchTitle }}</h3>
      <p>
        <strong>{{ project.title }}</strong> : {{ project.pitch }}
      </p>
      <p v-if="project.team" class="mb-md">
        👥 <strong>{{ project.team }}</strong>
      </p>

      <h3>🛠️ {{ project.tasksTitle }}</h3>
      <ul class="skill-list mb-lg">
        <li
          v-for="(task, i) in project.tasks"
          :key="i"
          class="skill-list-item"
        >
          <strong>{{ task.label }} :</strong> {{ task.detail }}
        </li>
      </ul>

      <h3 v-if="project.gallery && project.gallery.length">🖼️ Galerie de captures d'écran</h3>
      <div v-if="project.gallery && project.gallery.length" class="modal-gallery-grid">
        <div
          v-for="(item, i) in project.gallery"
          :key="i"
          class="modal-gallery-card"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="modal-gallery-img clickable-image"
            @click="handleImageClick(item.src, item.alt)"
            @mouseenter="playHover"
          />
          <p class="modal-gallery-caption">{{ item.caption }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clickable-image {
  cursor: zoom-in;
  transition: transform 0.25s ease, filter 0.25s ease;
}

.clickable-image:hover {
  transform: scale(1.02);
  filter: brightness(1.1);
}
</style>
