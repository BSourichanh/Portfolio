<script setup>
import { useAudio } from '../composables/useAudio.js';

const { playHover, playClick } = useAudio();

const formations = [
  {
    year: '2026 - En cours',
    title: 'RNCP Niveau 6 — Concepteur & Développeur Pratique IA',
    place: 'Le Campus Numérique in the Alps',
    body: 'Formation approfondie en conception logicielle, architectures d\'applications, intégration de modèles d\'IA, développement full-stack et gestion de projets agiles.'
  },
  {
    year: '2017 - 2021',
    title: 'Bachelor Game Developer & Game Designer',
    place: 'Human Academy — Angoulême',
    body: 'Formation intensive en programmation de jeux vidéo (C#, C++, UE4, Unity), game design, level design, mathématiques appliquées aux jeux et gestion de projets en équipe.'
  },
  {
    year: '2013 - 2015',
    title: 'Expert Informatique',
    place: 'Epitech — Lyon',
    body: 'Apprentissage approfondi de la programmation en C, algorithmique avancée, structures de données et méthodologie par projets en autonomie.'
  },
  {
    year: '2010 - 2013',
    title: 'BAC Pro SEN (Systèmes Électroniques Numériques)',
    place: 'Option Télécommunications & Réseaux — Lycée Saint-Vincent de Paul',
    body: 'Fondamentaux des architectures réseaux, protocoles de communication et maintenance des systèmes numériques.'
  }
];

const experiences = [
  {
    year: '2021 - 2022 (1 an)',
    title: 'Développeur Application Mobile',
    place: 'Seven Fallen — Lyon',
    body: 'Développement de l\'application mobile officielle et tutoriel interactif pour le jeu de cartes Seven Fallen sous Unity. Programmation C#, interfaces tactiles Android/iOS et optimisation.'
  },
  {
    year: '2025',
    title: 'Employé Polyvalent',
    place: 'Carrefour (Intérim)',
    body: 'Ravitaillement rayon épicerie, gestion des flux et organisation logistique en équipe.'
  },
  {
    year: '2011 - 2013 (12 mois)',
    title: 'Technicien de Maintenance Informatique',
    place: 'Fust — Meyrin (Suisse)',
    body: 'Diagnostic matériel et logiciel, dépannage de systèmes, maintenance préventive et curative de parcs informatiques, conseil multimédia.'
  },
  {
    year: '2009 (2 mois)',
    title: 'Technicien de Maintenance',
    place: 'S.N.C — Épagny',
    body: 'Support utilisateur, installation d\'ordinateurs et réseaux, gestion et sauvegarde des données informatiques.'
  }
];

const skillCategories = [
  {
    icon: '⚡',
    title: 'Langages & Backend',
    items: [
      'Java 21 & Spring Boot 3 (JPA, Security 6, JWT)',
      'C# (.NET) / C / C++',
      'TypeScript / JavaScript (Vue.js 3 / Canvas 2D)',
      'Architectures Microservices & API RESTful',
      'Scripting Python & Bash (Wayland / Linux)'
    ]
  },
  {
    icon: '🕹️',
    title: 'Moteurs & Jeux',
    items: [
      'Unreal Engine 4 & 5',
      'Unity 3D & 2D',
      'Physique, Collisions & Checkpoints',
      'Gameplay & Contrôleurs Joueur',
      'Intelligence Artificielle (Behavior Trees)'
    ]
  },
  {
    icon: '🗄️',
    title: 'Data & Systèmes',
    items: [
      'Bases de données SQL & NoSQL',
      'MongoDB, Docker & Spark',
      'IA Vectorielle & Pratique IA',
      'OS Windows / Android / Unix & Réseaux',
      'Hardware & Maintenance Informatique'
    ]
  },
  {
    icon: '🌐',
    title: 'Méthodes & Langues',
    items: [
      'Méthodes Agiles (Scrum, Kanban)',
      'Git, GitHub & Versioning',
      'Virtualisation & Environnements',
      'Français (Langue maternelle)',
      'Anglais & Notions de Japonais'
    ]
  }
];

const hobbies = [
  {
    icon: '🎮',
    title: 'Jeux Vidéo & Game Design',
    desc: 'Passionné par l\'analyse des mécaniques de gameplay, les jeux indépendants inventifs, les RPG, les FPS compétitifs et l\'évolution historique des jeux vidéo.'
  },
  {
    icon: '🚀',
    title: 'High-Tech & Spatial',
    desc: 'Veille technologique active sur l\'exploration spatiale, l\'intelligence artificielle, le rendu graphique temps réel et le hardware informatique.'
  },
  {
    icon: '🛡️',
    title: 'Cybersécurité & Finance',
    desc: 'Intérêt poussé pour les architectures réseaux sécurisées, la protection des données, les technologies financières et la cryptographie.'
  },
  {
    icon: '🍳',
    title: 'Cuisine & Créativité',
    desc: 'Expérimentation culinaire, précision dans les recettes et esprit créatif appliqué aux arts du quotidien.'
  }
];
</script>

<template>
  <div>
    <!-- Section À Propos & Parcours -->
    <section id="a-propos">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title" id="title-apropos">Parcours & Formations</h2>
          <p class="section-subtitle" id="subtitle-apropos">
            Mon expérience professionnelle, mes diplômes académiques et mon curriculum vitae
          </p>
        </div>

        <div class="timeline-grid">
          <!-- Formations -->
          <div class="timeline-column">
            <h3>🎓 Formations & Diplômes</h3>
            <div class="timeline">
              <div v-for="(f, i) in formations" :key="i" class="timeline-item">
                <span class="timeline-year">{{ f.year }}</span>
                <h4 class="timeline-title">{{ f.title }}</h4>
                <div class="timeline-subtitle">{{ f.place }}</div>
                <p class="timeline-body">{{ f.body }}</p>
              </div>
            </div>
          </div>

          <!-- Expériences -->
          <div class="timeline-column">
            <h3>💼 Expériences Professionnelles</h3>
            <div class="timeline">
              <div v-for="(exp, i) in experiences" :key="i" class="timeline-item">
                <span class="timeline-year">{{ exp.year }}</span>
                <h4 class="timeline-title">{{ exp.title }}</h4>
                <div class="timeline-subtitle">{{ exp.place }}</div>
                <p class="timeline-body">{{ exp.body }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-lg">
          <a
            href="CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary btn-lg"
            @mouseenter="playHover"
            @click="playClick"
          >
            Consulter / Télécharger mon CV complet (PDF)
          </a>
        </div>
      </div>
    </section>

    <!-- Section Compétences Techniques -->
    <section id="competences">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title" id="title-competences">Compétences Techniques</h2>
          <p class="section-subtitle" id="subtitle-competences">
            Outils, technologies, frameworks et domaines d'expertise
          </p>
        </div>

        <div class="skills-grid">
          <div
            v-for="(cat, idx) in skillCategories"
            :key="idx"
            class="skill-card"
          >
            <div class="skill-card-icon">{{ cat.icon }}</div>
            <h3 class="skill-card-title">{{ cat.title }}</h3>
            <div class="skill-list">
              <div v-for="(item, i) in cat.items" :key="i" class="skill-list-item">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Loisirs -->
    <section id="loisirs">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title" id="title-loisirs">Loisirs & Passions</h2>
          <p class="section-subtitle" id="subtitle-loisirs">
            Ce qui m'inspire et m'anime au quotidien en dehors du code
          </p>
        </div>

        <div class="hobbies-grid">
          <div v-for="(h, idx) in hobbies" :key="idx" class="hobby-card">
            <div class="hobby-icon">{{ h.icon }}</div>
            <h3>{{ h.title }}</h3>
            <p>{{ h.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
