<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: "Agrandissement capture d'écran"
  }
});

const emit = defineEmits(['close']);

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    emit('close');
  }
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
    class="lightbox active"
    role="dialog"
    aria-modal="true"
    aria-label="Visionneuse d'image agrandie"
    @click.self="emit('close')"
  >
    <button
      class="lightbox-close"
      aria-label="Fermer la vue agrandie"
      @click="emit('close')"
    >
      &times;
    </button>
    <img
      class="lightbox-content"
      :src="props.src"
      :alt="props.alt"
    />
  </div>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(12px);
  padding: 1.5rem;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--border-color, rgba(0, 240, 255, 0.3));
  box-shadow: 0 0 35px rgba(0, 240, 255, 0.25);
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  font-size: 2.5rem;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease;
}

.lightbox-close:hover {
  color: var(--neon-pink, #ff2a85);
}
</style>
