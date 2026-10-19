<script setup>
import { useGithub } from '../composables/useGithub.js';
import { useAudio } from '../composables/useAudio.js';

const { repos, isLoading, syncStatusText } = useGithub();
const { playHover, playClick } = useAudio();
</script>

<template>
  <section id="github">
    <div class="container">
      <div class="text-center">
        <h2 class="section-title" id="title-github">Dépôts & Code Source GitHub</h2>
        <p class="section-subtitle" id="subtitle-github">
          Exploration de mes architectures logicielles, algorithmes et projets publics
        </p>

        <!-- Indicateur de synchronisation en direct -->
        <div class="github-sync-indicator" id="github-sync-indicator">
          <span class="github-live-dot"></span>
          <span id="github-sync-text">{{ syncStatusText }}</span>
        </div>
      </div>

      <!-- Grille réactive des dépôts GitHub -->
      <div class="github-grid" id="github-repos-grid">
        <a
          v-for="repo in repos"
          :key="repo.id"
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="github-card"
          @mouseenter="playHover"
          @click="playClick"
        >
          <div>
            <div class="github-card-header">
              <h3 class="github-repo-title">
                <svg class="github-icon-svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>{{ repo.name }}</span>
              </h3>
              <span :class="['badge', repo.badgeClass]">{{ repo.badgeText }}</span>
            </div>

            <p>{{ repo.desc }}</p>

            <!-- Étoiles & Forks GitHub -->
            <div v-if="repo.stars > 0 || repo.forks > 0" class="github-stats">
              <span v-if="repo.stars > 0" class="github-stat-item">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
                </svg>
                {{ repo.stars }}
              </span>
              <span v-if="repo.forks > 0" class="github-stat-item">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h4.5A2.25 2.25 0 0 0 12.5 6.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878ZM11 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM5.75 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.25.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z"/>
                </svg>
                {{ repo.forks }}
              </span>
            </div>
          </div>

          <!-- Footer sans bouton "Code source" conformément à votre consigne -->
          <div class="github-card-footer">
            <div class="github-tech">
              <span class="github-tech-dot" :style="{ background: repo.dotColor, boxShadow: `0 0 8px ${repo.dotColor}` }"></span>
              <span>{{ repo.techText }}</span>
            </div>
          </div>
        </a>
      </div>

      <div class="text-center mt-lg">
        <a
          href="https://github.com/BSourichanh?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline btn-md"
          @mouseenter="playHover"
          @click="playClick"
        >
          <svg class="github-icon-svg github-btn-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Explorer tous mes dépôts sur GitHub (@BSourichanh) ↗
        </a>
      </div>
    </div>
  </section>
</template>
