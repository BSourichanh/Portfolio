import { ref, onMounted } from 'vue';
import { CONFIG } from '../data/config.js';

export function useGithub() {
  const repos = ref([]);
  const isLoading = ref(true);
  const isSyncSuccess = ref(false);
  const syncStatusText = ref('Chargement des dépôts...');

  const sanitizeUrl = (url) => {
    if (typeof url !== 'string') return '#';
    // Cybersécurité : validation stricte du domaine GitHub
    return url.startsWith('https://github.com/') ? url : '#';
  };

  const processAndEnrichRepos = (rawRepos) => {
    if (!Array.isArray(rawRepos)) return [];

    const filtered = rawRepos.filter(repo => {
      if (!repo || repo.fork) return false;
      if (repo.name === CONFIG.github.username) return false;
      return true;
    });

    filtered.sort((a, b) => {
      const starsA = Number(a.stargazers_count) || 0;
      const starsB = Number(b.stargazers_count) || 0;
      if (starsB !== starsA) return starsB - starsA;

      const enrichA = CONFIG.repoEnrichments[a.name];
      const enrichB = CONFIG.repoEnrichments[b.name];
      const pA = (enrichA && enrichA.priority) ? enrichA.priority : 99;
      const pB = (enrichB && enrichB.priority) ? enrichB.priority : 99;
      if (pA !== pB) return pA - pB;

      const dateA = new Date(a.pushed_at || a.updated_at || 0).getTime();
      const dateB = new Date(b.pushed_at || b.updated_at || 0).getTime();
      return dateB - dateA;
    });

    return filtered.map(repo => {
      const enrich = CONFIG.repoEnrichments[repo.name] || {};
      const langConf = CONFIG.languages[repo.language] || {
        badge: 'badge-cyan',
        dot: 'var(--neon-cyan)',
        name: repo.language || 'Projet'
      };

      return {
        id: repo.id || repo.name,
        name: repo.name,
        html_url: sanitizeUrl(repo.html_url),
        desc: enrich.desc || repo.description || 'Projet et code source public sur GitHub.',
        badgeText: enrich.badgeText || langConf.name,
        badgeClass: enrich.badgeClass || langConf.badge,
        dotColor: enrich.dotColor || langConf.dot,
        techText: enrich.tags || `${repo.language || 'Code'} / Git`,
        stars: Number(repo.stargazers_count) || 0,
        forks: Number(repo.forks_count) || 0
      };
    });
  };

  const fetchRepos = async () => {
    isLoading.value = true;

    // 1. Cache-Aside Pattern : Lecture locale instantanée
    try {
      const cached = localStorage.getItem(CONFIG.github.cacheKey);
      const cachedTime = localStorage.getItem(CONFIG.github.cacheTimeKey);
      const isFresh = cached && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CONFIG.github.cacheTtlMs);

      if (isFresh) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          repos.value = processAndEnrichRepos(parsed);
          isSyncSuccess.value = true;
          syncStatusText.value = `Synchronisé en direct (${repos.value.length} dépôts actifs)`;
          isLoading.value = false;
        }
      }
    } catch {
      // Ignorer l'erreur de parsing / storage corrompu
    }

    // 2. Appel réseau avec protection rate-limit
    try {
      const res = await fetch(CONFIG.github.apiEndpoint, {
        headers: { Accept: 'application/vnd.github.v3+json' }
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        repos.value = processAndEnrichRepos(data);
        isSyncSuccess.value = true;
        syncStatusText.value = `Synchronisé en direct (${repos.value.length} dépôts actifs)`;

        try {
          localStorage.setItem(CONFIG.github.cacheKey, JSON.stringify(data));
          localStorage.setItem(CONFIG.github.cacheTimeKey, Date.now().toString());
        } catch {
          // LocalStorage quota handling
        }
      }
    } catch (err) {
      if (!repos.value.length) {
        syncStatusText.value = 'Dépôts GitHub (Mode hors-ligne / fallback)';
      }
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchRepos();
  });

  return {
    repos,
    isLoading,
    isSyncSuccess,
    syncStatusText,
    refresh: fetchRepos
  };
}
