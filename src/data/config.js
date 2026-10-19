/**
 * Configuration globale de l'application
 * GitHub API, métadonnées, langages et enrichissements
 */

export const CONFIG = {
  github: {
    username: 'BSourichanh',
    cacheKey: 'bs_github_repos_v4',
    cacheTimeKey: 'bs_github_repos_time_v4',
    cacheTtlMs: 1000 * 60 * 60, // 1 heure
    apiEndpoint: 'https://api.github.com/users/BSourichanh/repos?sort=updated&per_page=100'
  },
  languages: {
    'Java': { badge: 'badge-cyan', dot: 'var(--neon-cyan)', name: 'Java 21' },
    'TypeScript': { badge: 'badge-cyan', dot: 'var(--neon-cyan)', name: 'TypeScript' },
    'JavaScript': { badge: 'badge-pink', dot: 'var(--neon-pink)', name: 'JavaScript' },
    'Python': { badge: 'badge-violet', dot: 'var(--neon-violet)', name: 'Python' },
    'C#': { badge: 'badge-secondary', dot: '#22c55e', name: 'C# (.NET)' },
    'C++': { badge: 'badge-pink', dot: 'var(--neon-pink)', name: 'C++' },
    'C': { badge: 'badge-secondary', dot: '#94a3b8', name: 'C' },
    'HTML': { badge: 'badge-pink', dot: 'var(--neon-pink)', name: 'HTML5 / CSS3' },
    'Processing': { badge: 'badge-secondary', dot: 'var(--neon-yellow)', name: 'Processing' },
    'Hack': { badge: 'badge-violet', dot: 'var(--neon-violet)', name: 'SQL / BDD' },
    'Shell': { badge: 'badge-violet', dot: 'var(--neon-violet)', name: 'Bash / Linux' },
    'Vue': { badge: 'badge-cyan', dot: '#42b883', name: 'Vue.js 3' },
    'PHP': { badge: 'badge-secondary', dot: '#777bb4', name: 'PHP' }
  },
  repoEnrichments: {
    'JavaSpring': {
      desc: "Architecture microservices Java 21 & Spring Boot 3 (API Square Games) : Inversion de Contrôle (IoC), plugins modulaires (TicTacToe, ConnectFour), persistance multi-sources DAO (Mémoire, JDBC, JPA/Hibernate), communication inter-services via RestClient, sécurité Stateless (Spring Security 6, JWT, RBAC) et SPA frontend.",
      tags: 'Java 21 / Spring Boot 3 / Microservices',
      badgeText: 'Spring Boot 3',
      badgeClass: 'badge-cyan',
      dotColor: 'var(--neon-cyan)',
      priority: 1
    },
    'JavaSpringApiUsers': {
      desc: "Microservice autonome d'authentification et de gestion des identités : Spring Boot 3.3.4, Spring Security 6, JJWT, Spring Data JPA et base de données H2 in-memory. Hachage sécurisé BCrypt, validation de claims de jetons et contrôle d'accès basé sur les rôles (RBAC).",
      tags: 'Security 6 / JJWT / JPA / H2',
      badgeText: 'Spring Security',
      badgeClass: 'badge-pink',
      dotColor: 'var(--neon-pink)',
      priority: 2
    },
    'Spicetify_visualizer': {
      desc: "Suite de visualisation audio-réactive pour Spotify via Spicetify : Rendu 60–144 FPS Zero-Allocation, moteur DSP stéréo temps réel, pipeline modulaire Canvas 2D ultra-optimisé et synchronisation dynamique des couleurs avec les pochettes d'albums.",
      tags: 'TypeScript / Canvas 2D / DSP Stéréo',
      badgeText: 'TypeScript',
      badgeClass: 'badge-cyan',
      dotColor: 'var(--neon-cyan)',
      priority: 3
    },
    'Hyprland_Aurora': {
      desc: "Configuration complète et design system pour Hyprland sous Linux / Wayland (Thème Aurora) : effet glassmorphism, bordures néon GPU en dégradé continu 360°, automatisation de scripts Python & Bash, Waybar et gestionnaire Pipewire.",
      tags: 'Hyprland / Python / Bash / Wayland',
      badgeText: 'Linux / Wayland',
      badgeClass: 'badge-violet',
      dotColor: 'var(--neon-violet)',
      priority: 4
    },
    'POO_JAVA': {
      desc: "Jeu de plateau textuel Donjons & Dragons jouable à 1 ou 2 joueurs dans la console (TUI / ANSI). Architecture orientée objet respectant strictement les principes SOLID et Design Patterns (Factory, State, Strategy).",
      tags: 'Java 21 / POO / SOLID / Patterns',
      badgeText: 'Java 21',
      badgeClass: 'badge-cyan',
      dotColor: 'var(--neon-cyan)',
      priority: 5
    },
    'BDD_SQL': {
      desc: "Conception, modélisation MCD/MLD et requêtage avancé de bases de données relationnelles SQL (PostgreSQL, MySQL) et NoSQL (MongoDB, Redis). Procédures stockées, triggers, indexation et conteneurisation Docker.",
      tags: 'SQL / PostgreSQL / MongoDB / Docker',
      badgeText: 'Data / SQL & NoSQL',
      badgeClass: 'badge-violet',
      dotColor: 'var(--neon-violet)',
      priority: 6
    },
    'Jeu_de_loie': {
      desc: "Implémentation du classique Jeu de l'oie en Processing (Java) avec gestion complète des règles de cases, pièges et rendu graphique interactif.",
      tags: 'Processing / Java',
      badgeText: 'Processing',
      badgeClass: 'badge-secondary',
      dotColor: 'var(--neon-yellow)',
      priority: 7
    },
    'Portfolio': {
      desc: "Portfolio cyberpunk one-page immersif : animations Canvas 2D interactives à 60/120 FPS, header HUD flottant, ondes de choc réactives et synchronisation automatique des dépôts GitHub.",
      tags: 'HTML5 / CSS3 / JavaScript',
      badgeText: 'Web / Canvas 2D',
      badgeClass: 'badge-pink',
      dotColor: 'var(--neon-pink)',
      priority: 8
    },
    'JS_Vue': {
      desc: "Application web monopage (SPA) conçue avec Vue.js 3 et Vite : catalogue cinématographique connecté à une API REST sécurisée (authentification JWT, pagination, recherche temps réel avec débouncing) et module météo en direct.",
      tags: 'Vue.js 3 / Vite / Pinia / REST API',
      badgeText: 'Vue.js 3',
      badgeClass: 'badge-cyan',
      dotColor: 'var(--neon-cyan)',
      priority: 9
    },
    'Algo_Avance': {
      desc: "Recueil d'algorithmes avancés, structures de données complexes et résolutions de problèmes d'optimisation et d'efficacité algorithmique.",
      tags: 'Algorithmique / Structures de données',
      badgeText: 'Algorithmique',
      badgeClass: 'badge-violet',
      dotColor: 'var(--neon-violet)',
      priority: 10
    },
    'GIT': {
      desc: "Guide pratique, workflows et conventions de versioning avec Git : gestion de branches, rebase interactif, hooks et automatisation.",
      tags: 'Git / Versioning / CLI',
      badgeText: 'Git / DevOps',
      badgeClass: 'badge-secondary',
      dotColor: '#94a3b8',
      priority: 11
    }
  }
};
