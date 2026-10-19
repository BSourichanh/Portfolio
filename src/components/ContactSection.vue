<script setup>
import { reactive, ref } from 'vue';
import { useAudio } from '../composables/useAudio.js';

const { playClick, playSuccess, playHover } = useAudio();
const baseUrl = import.meta.env.BASE_URL;

const form = reactive({
  nom: '',
  email: '',
  sujet: '',
  message: ''
});

const isSubmitted = ref(false);
const errorMsg = ref('');

const sanitize = (str) => {
  if (!str) return '';
  return str.replace(/[<>]/g, '').trim();
};

const handleSubmit = () => {
  errorMsg.value = '';

  const cleanNom = sanitize(form.nom);
  const cleanEmail = sanitize(form.email);
  const cleanSujet = sanitize(form.sujet) || "Contact Portfolio";
  const cleanMessage = sanitize(form.message);

  if (!cleanNom || !cleanEmail || !cleanMessage) {
    errorMsg.value = 'Veuillez remplir tous les champs obligatoires.';
    return;
  }

  // Validation email basique sécurisée
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    errorMsg.value = 'Veuillez saisir une adresse email valide.';
    return;
  }

  playSuccess();
  isSubmitted.value = true;

  // Envoi via mailto pré-rempli encodé en toute sécurité
  const mailtoLink = `mailto:bernard.sourichanh@gmail.com?subject=${encodeURIComponent(cleanSujet)}&body=${encodeURIComponent(
    `Nom: ${cleanNom}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`
  )}`;

  window.location.href = mailtoLink;

  setTimeout(() => {
    isSubmitted.value = false;
    form.nom = '';
    form.email = '';
    form.sujet = '';
    form.message = '';
  }, 4000);
};
</script>

<template>
  <section id="contact">
    <div class="container">
      <div class="text-center">
        <h2 class="section-title" id="title-contact">Contactez-Moi</h2>
        <p class="section-subtitle" id="subtitle-contact">
          Une opportunité d'alternance, un projet ou une question ? Écrivez-moi directement
        </p>
      </div>

      <div class="contact-layout">
        <!-- Formulaire de contact Cyberpunk -->
        <div class="contact-card-box">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="nom">Nom & Prénom</label>
              <input
                type="text"
                id="nom"
                v-model="form.nom"
                class="form-control"
                placeholder="ex: Jean Dupont"
                autocomplete="name"
                required
                maxlength="100"
              />
            </div>

            <div class="form-group">
              <label for="email">Adresse Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="form-control"
                placeholder="ex: jean.dupont@email.com"
                autocomplete="email"
                required
                maxlength="120"
              />
            </div>

            <div class="form-group">
              <label for="sujet">Sujet</label>
              <input
                type="text"
                id="sujet"
                v-model="form.sujet"
                class="form-control"
                placeholder="ex: Opportunité d'alternance / Développeur Full-Stack"
                autocomplete="off"
                maxlength="150"
              />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-control"
                rows="5"
                placeholder="Écrivez votre message ici..."
                required
                maxlength="2000"
              ></textarea>
            </div>

            <p v-if="errorMsg" class="form-error" role="alert">
              {{ errorMsg }}
            </p>

            <button
              type="submit"
              class="btn btn-primary btn-block"
              :disabled="isSubmitted"
              @mouseenter="playHover"
            >
              {{ isSubmitted ? 'Message Transmis !' : 'Transmettre le message' }}
            </button>
          </form>
        </div>

        <!-- Coordonnées & Liens -->
        <div class="contact-info-list">
          <div class="contact-info-item">
            <div class="contact-icon-wrapper">
              <img :src="`${baseUrl}Images/env.png`" alt="Icône Email" class="contact-icon-img" />
            </div>
            <div class="contact-details">
              <h4>Email Direct</h4>
              <a href="mailto:bernard.sourichanh@gmail.com">bernard.sourichanh@gmail.com</a>
              <br />
              <a href="mailto:bernard.sourichanh@le-campus-numerique.fr" class="contact-sub-email">
                bernard.sourichanh@le-campus-numerique.fr
              </a>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-icon-wrapper">
              <img :src="`${baseUrl}Images/phone.png`" alt="Icône Téléphone" class="contact-icon-img" />
            </div>
            <div class="contact-details">
              <h4>Téléphone</h4>
              <a href="tel:0652767215">06 52 76 72 15</a>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-icon-wrapper">📄</div>
            <div class="contact-details">
              <h4>Curriculum Vitae</h4>
              <a :href="`${baseUrl}CV.pdf`" target="_blank" rel="noopener noreferrer">Consulter mon CV (PDF) ↗</a>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-icon-wrapper">
              <svg class="contact-social-svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </div>
            <div class="contact-details">
              <h4>GitHub</h4>
              <a href="https://github.com/BSourichanh" target="_blank" rel="noopener noreferrer">
                github.com/BSourichanh ↗
              </a>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-icon-wrapper">💼</div>
            <div class="contact-details">
              <h4>Disponibilité</h4>
              <p>En recherche active d'une <strong>alternance</strong> (Full-Stack / IA / Game Dev)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.form-error {
  color: var(--neon-pink, #ff2a85);
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  margin-bottom: 1rem;
}
</style>
