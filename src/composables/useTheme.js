import { ref, onMounted } from 'vue';
import { useAudio } from './useAudio.js';

const isHacked = ref(false);
const clickCount = ref(0);
const remainingClicks = ref(10);
const crtFlashActive = ref(false);
let clickTimer = null;

export function useTheme() {
  const { playGlitch, playSuccess } = useAudio();

  const triggerCRTFlash = () => {
    crtFlashActive.value = true;
    setTimeout(() => {
      crtFlashActive.value = false;
    }, 450);
  };

  const toggleCyberpunkMode = () => {
    isHacked.value = !isHacked.value;
    triggerCRTFlash();

    if (isHacked.value) {
      document.body.classList.add('hacked-mode');
      document.documentElement.classList.add('hacked-mode');
      playGlitch();
    } else {
      document.body.classList.remove('hacked-mode');
      document.documentElement.classList.remove('hacked-mode');
      playSuccess();
    }
    clickCount.value = 0;
    remainingClicks.value = 10;
  };

  const registerAvatarClick = () => {
    clearTimeout(clickTimer);
    clickCount.value++;
    remainingClicks.value = Math.max(0, 10 - clickCount.value);

    if (clickCount.value >= 10) {
      toggleCyberpunkMode();
    } else {
      playGlitch();
      clickTimer = setTimeout(() => {
        clickCount.value = 0;
        remainingClicks.value = 10;
      }, 3500);
    }
  };

  onMounted(() => {
    if (isHacked.value) {
      document.body.classList.add('hacked-mode');
    }
  });

  return {
    isHacked,
    clickCount,
    remainingClicks,
    crtFlashActive,
    toggleCyberpunkMode,
    registerAvatarClick
  };
}
