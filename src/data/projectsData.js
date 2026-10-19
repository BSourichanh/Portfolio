/**
 * Données complètes des projets du portfolio
 * Modèle de données normalisé, typé et sécurisé
 */

export const PROJECTS_DATA = [
  {
    id: 'cyber-strike',
    category: 'jeux',
    title: 'Cyber Strike',
    tagline: 'FPS Rogue-lite dynamique sous Unreal Engine',
    desc: 'Projet de fin d\'études solo à la Human Academy : FPS Rogue-lite dans une arène cybernétique avec arsenal balistique, IA dynamique (Behavior Trees) et vagues procédurales.',
    badge: 'Unreal Engine 4',
    badgeClass: 'badge-cyan',
    thumb: 'Images/cyber_strike_thumb.png',
    cover: 'Images/cyber_strike_mockup.png',
    breadcrumb: '[PROJET SOLO] // CYBER STRIKE',
    tags: [
      { text: 'Unreal Engine 4', class: 'badge-cyan' },
      { text: 'FPS / Rogue-lite', class: 'badge-secondary' },
      { text: 'Projet de fin d\'études solo', class: 'badge-secondary' },
      { text: 'PC', class: 'badge-secondary' }
    ],
    pitchTitle: 'Contexte & Pitch du Projet',
    pitch: 'Cyber Strike est un FPS Rogue-lite nerveux développé en solo comme projet de fin d\'études à la Human Academy sous Unreal Engine 4. Plongé dans une arène cybernétique hostile, le joueur doit repousser des vagues successives d\'ennemis robotiques en gérant son arsenal dynamique et ses munitions.',
    tasksTitle: 'Tâches & Réalisations Techniques',
    tasks: [
      { label: 'Programmation de l\'arsenal de tir', detail: 'Mécaniques de tirs, recul des armes, temps de rechargement et dispersion balistique (Fusil d\'assaut, Fusil à pompe, Pistolet).' },
      { label: 'Intelligence Artificielle ennemie', detail: 'Arbre de comportements (Behavior Trees), détection du joueur par champ de vision, navigation dynamique NavMesh et tirs prédictifs.' },
      { label: 'Système de vagues & difficulté', detail: 'Algorithme de spawn procédural d\'ennemis avec courbe de difficulté croissante par manche.' },
      { label: 'Rendu & Immersion', detail: 'Intégration d\'effets visuels néon et particules sous Unreal Engine, feedbacks sonores immersifs et HUD interactif.' }
    ],
    gallery: [
      { src: 'Images/cyber_strike_prez.png', alt: 'Cyber Strike Gameplay Prez', caption: 'Gameplay, Réticule & Interface In-Game' },
      { src: 'Images/cyber_strike_cover.png', alt: 'Cyber Strike Cover Arène', caption: 'Arène Cybernétique & Ambiance Néon' }
    ]
  },
  {
    id: 'hungry-cat',
    category: 'jeux',
    title: 'Hungry Cat',
    tagline: 'Jeu d\'aventure narratif atmosphérique',
    desc: 'Projet d\'équipe de 3ème année (4 mois, 5 personnes) sous Unreal Engine 4 : exploration d\'un village côtier dans la peau d\'un chat, énigmes, infiltration et IA patrouilleur.',
    badge: 'Projet Équipe',
    badgeClass: 'badge-pink',
    thumb: 'Images/hungry_cat_thumb.png',
    cover: 'Images/hungry_cat_logo.png',
    breadcrumb: '[PROJET ÉQUIPE] // HUNGRY CAT',
    tags: [
      { text: 'Unreal Engine 4', class: 'badge-cyan' },
      { text: 'Aventure - Narratif', class: 'badge-secondary' },
      { text: 'Projet de 3ème année', class: 'badge-secondary' },
      { text: 'Durée : 4 mois', class: 'badge-secondary' },
      { text: 'PC', class: 'badge-secondary' }
    ],
    pitchTitle: 'Contexte, Durée & Équipe',
    pitch: 'Hungry Cat est un jeu d\'aventure narratif atmosphérique développé sur une durée de 4 mois sous Unreal Engine 4 pour PC. Le joueur y incarne un chat agile explorant un village côtier plein de secrets à la recherche de poissons.',
    team: 'Membres de l\'équipe (5 personnes) : Léa Frayssinhes, Florian Gras, Julien Maindron, François Sourichanh, Bernard Sourichanh.',
    tasksTitle: 'Ce que j\'ai fait sur le projet (Rôle de Bernard Sourichanh)',
    tasks: [
      { label: 'Programmation du tutoriel', detail: 'Conception et implémentation du tutoriel d\'apprentissage interactif pour guider le joueur dans les contrôles du chat.' },
      { label: 'Programmation de l\'IA du pêcheur', detail: 'Création de l\'Intelligence Artificielle ennemie sous UE4 (cônes de vision, zones de patrouille, détection du chat, états de vigilance et alertes).' },
      { label: 'Game Design & Level Design', detail: 'Conception des énigmes environnementales et modélisation/blockout des zones du tutoriel et des rives du lac.' },
      { label: 'Intégration VFX / SFX', detail: 'Implémentation des effets visuels (eau, poussières) et mixage audio complet (bruitages de pas, miaulements, ambiance côtière).' }
    ],
    gallery: [
      { src: 'Images/hungry_cat_hgc2.png', alt: 'Hungry Cat HGC2 Village', caption: 'Village Côtier & Exploration' },
      { src: 'Images/hungry_cat_hgc5.png', alt: 'Hungry Cat HGC5 Chat et Pêcheur', caption: 'Infiltration : Chat vs IA Pêcheur' },
      { src: 'Images/hungry_cat_hgc7.png', alt: 'Hungry Cat HGC7 Bord de Mer', caption: 'Bord de Mer & Pontons du Lac' }
    ]
  },
  {
    id: 'air-race',
    category: 'jeux',
    title: 'Air Race',
    tagline: 'Course 3D futuriste multijoueur',
    desc: 'Projet d\'équipe de 2ème année (4 mois) sous Unity 3D : jeu de course aérien développé en équipe de 4 sans graphiste 3D. Contrôleur physique C#, synchro réseau et circuits modulaires.',
    badge: 'Multijoueur',
    badgeClass: 'badge-violet',
    thumb: 'Images/air_race_thumb.png',
    cover: 'Images/air_race_main.png',
    breadcrumb: '[PROJET ÉQUIPE] // AIR RACE',
    tags: [
      { text: 'Unity 3D', class: 'badge-cyan' },
      { text: 'Jeu de Course 3D - Multijoueur', class: 'badge-secondary' },
      { text: 'Projet de 2ème année', class: 'badge-secondary' },
      { text: 'Durée : 4 mois', class: 'badge-secondary' },
      { text: 'PC', class: 'badge-secondary' }
    ],
    pitchTitle: 'Contexte, Contraintes & Équipe',
    pitch: 'Air Race est un jeu de course 3D multijoueur futuriste développé sur PC sous Unity 3D en 4 mois. Contraintes techniques majeures : Réaliser un jeu 3D complet en 4 mois au sein d\'une petite équipe et sans graphistes 3D (équipe composée de 4 Game Designers / Programmeurs).',
    team: 'Membres de l\'équipe (4 personnes) : Léa Frayssinhes, Clément Lavievic, Diwan Chouc, Bernard Sourichanh.',
    tasksTitle: 'Ce que j\'ai fait sur le projet (Rôle de Bernard Sourichanh)',
    tasks: [
      { label: 'Programmation Gameplay en C#', detail: 'Contrôleur physique des vaisseaux aériens (accélération, inclinaisons dynamiques, freinage d\'urgence, système de boosts et sensation de vitesse).' },
      { label: 'Programmation Réseau Multijoueur', detail: 'Architecture client-serveur pour la synchronisation en temps réel de la position des vaisseaux et gestion des collisions réseau.' },
      { label: 'Game Design & Système de Course', detail: 'Détection automatique des checkpoints, calcul des tours, gestion du classement en temps réel et chronométrage précis.' },
      { label: 'Level Design modulaire', detail: 'Création et assemblage des pistes aériennes avec obstacles et boucles acrobatiques.' }
    ],
    gallery: [
      { src: 'Images/air_race_main.png', alt: 'Air Race Artwork', caption: 'Circuits 3D & Vaisseaux Futuristes' },
      { src: 'Images/air_race_thumb.png', alt: 'Air Race Gameplay Thumb', caption: 'Gameplay Multijoueur & Checkpoints' }
    ]
  },
  {
    id: 'seven-fallen',
    category: 'web',
    title: 'Seven Fallen',
    tagline: 'Compagnon mobile officiel (Stage + 1 an pro)',
    desc: 'Application d\'apprentissage et compagnon mobile sous Unity / C# (.NET) pour le TCG Seven Fallen : tutoriels interactifs étape par étape, mécaniques tactiles adaptatives et base de cartes.',
    badge: 'Professionnel',
    badgeClass: 'badge-cyan',
    thumb: 'Images/seven_fallen_thumb.png',
    cover: 'Images/seven_fallen_cards.jpg',
    breadcrumb: '[PROJET PRO / STAGE] // SEVEN FALLEN',
    tags: [
      { text: 'Unity Mobile', class: 'badge-cyan' },
      { text: 'C# (.NET)', class: 'badge-secondary' },
      { text: 'Stage de fin d\'études (3 mois) & Entreprise', class: 'badge-secondary' },
      { text: 'Android / iOS', class: 'badge-secondary' }
    ],
    pitchTitle: 'Contexte & Objectif',
    pitch: 'Seven Fallen est une application mobile officielle d\'apprentissage et compagnon développée pour le jeu de cartes à collectionner physique Seven Fallen. Réalisée dans le cadre d\'un stage de fin d\'études de 3 mois puis prolongée par une expérience de 1 an en entreprise en tant que développeur d\'applications mobiles.',
    tasksTitle: 'Ce que j\'ai fait sur le projet (Rôle : Co-développeur)',
    tasks: [
      { label: 'Module d\'apprentissage interactif', detail: 'Développement complet des scénarios didactiques étape par étape pour enseigner les règles de duel aux nouveaux joueurs.' },
      { label: 'Développement Mobile C#', detail: 'Programmation des mécaniques tactiles adaptatives pour smartphones et tablettes sous Android et iOS sous Unity.' },
      { label: 'Base de données des cartes', detail: 'Intégration et structuration de la collection de cartes, statistiques, effets d\'invocation et règles du jeu.' }
    ],
    gallery: [
      { src: 'Images/seven_fallen_screen1.png', alt: 'Seven Fallen Screen 1', caption: 'Interface de Duel Interactive' },
      { src: 'Images/seven_fallen_screen2.jpg', alt: 'Seven Fallen Screen 2', caption: 'Tutoriel Guidé Étape par Étape' },
      { src: 'Images/seven_fallen_screen3.jpg', alt: 'Seven Fallen Screen 3', caption: 'Gestion du Deck & Cartes Joueur' }
    ]
  }
];
