/**
 * ==============================================================================
 * Bernard Sourichanh - Portfolio Application
 * Architecture : Namespace & Modular Design Pattern
 * Standards    : ES6+, WCAG 2.2 Accessibility, Progressive Enhancement, 60-120 FPS
 * ==============================================================================
 */

'use strict';

const PortfolioApp = (() => {

    // ==========================================================================
    // 1. CONFIGURATION & CONSTANTS (Parameter Object Pattern)
    // ==========================================================================
    const Config = {
        github: {
            username: 'BSourichanh',
            cacheKey: 'bs_github_repos_v2',
            cacheTimeKey: 'bs_github_repos_time_v2',
            cacheTtlMs: 1000 * 60 * 60, // 1 hour
            apiEndpoint: 'https://api.github.com/users/BSourichanh/repos?sort=updated&per_page=100',
            maxDisplayRepos: 8
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
            'Shell': { badge: 'badge-violet', dot: 'var(--neon-violet)', name: 'Bash / Linux' }
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
            }
        },
        icons: {
            github: '<svg class="github-icon-svg" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
            star: '<svg viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>',
            fork: '<svg viewBox="0 0 16 16"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h4.5A2.25 2.25 0 0 0 12.5 6.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878ZM11 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM5.75 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.25.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z"/></svg>'
        }
    };

    // ==========================================================================
    // 2. CANVAS NEON PHYSICS ENGINE (Flyweight & Object Pool Patterns)
    // ==========================================================================
    const NeonCanvas = (() => {
        let canvas = null;
        let ctx = null;
        let width = 0;
        let height = 0;
        let animationFrameId = null;
        let isTabVisible = true;
        let isHacked = false;
        let time = 0;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const mouse = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            active: false,
            radius: 200
        };

        const ripples = [];
        const nodes = [];
        const ambientHalos = [];
        const maxHalos = 6;
        // Deep Net Corrupted Matrix Rain Engine (Option Blackwall Cyberspace)
        const CYBER_MATRIX_CHARS = '01XYZABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ░▒▓█▄▀Ø§≠±√∂∆0101';
        const matrixStreams = [];
        const burstGlyphs = [];
        const matrixColWidth = 28;
        let glitchActive = false;
        let glitchOffset = 0;

        const initMatrixStreams = () => {
            matrixStreams.length = 0;
            const colCount = Math.floor(width / matrixColWidth);
            for (let i = 0; i < colCount; i++) {
                const x = i * matrixColWidth + matrixColWidth * 0.5;
                const streamLength = 12 + Math.floor(Math.random() * 18);
                const chars = [];
                for (let c = 0; c < streamLength; c++) {
                    chars.push(CYBER_MATRIX_CHARS[Math.floor(Math.random() * CYBER_MATRIX_CHARS.length)]);
                }
                matrixStreams.push({
                    x: x,
                    baseX: x,
                    y: (Math.random() - 1.2) * height * 1.5,
                    speed: 3.5 + Math.random() * 5.5,
                    length: streamLength,
                    chars: chars,
                    mutateRate: 0.06 + Math.random() * 0.08,
                    depth: 0.55 + Math.random() * 0.45,
                    distortionX: 0
                });
            }
        };

        const triggerDataBurst = (x, y) => {
            if (prefersReducedMotion) return;

            // Burst of exploding corrupted glyph shards
            for (let i = 0; i < 28; i++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = 4 + Math.random() * 9;
                const char = CYBER_MATRIX_CHARS[Math.floor(Math.random() * CYBER_MATRIX_CHARS.length)];
                burstGlyphs.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * spd,
                    vy: Math.sin(angle) * spd,
                    char: char,
                    size: 13 + Math.random() * 7,
                    alpha: 1.0,
                    decay: 0.022 + Math.random() * 0.024,
                    isWhite: Math.random() < 0.4
                });
            }

            // Screen datamosh glitch twitch
            glitchActive = true;
            glitchOffset = (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 24);
            setTimeout(() => { glitchActive = false; }, 110);
        };

        const waves = [
            { yRatio: 0.28, offset: 0, speed: 0.006, freq: 0.0028, amp: 40 },
            { yRatio: 0.55, offset: Math.PI * 0.65, speed: 0.005, freq: 0.0022, amp: 48 },
            { yRatio: 0.82, offset: Math.PI * 1.35, speed: 0.007, freq: 0.0032, amp: 38 }
        ];

        const getCyberHue = (offset = 0, speed = 0.0035) => {
            const t = time * speed + offset;
            const norm = (Math.sin(t) + 1) * 0.5;
            if (isHacked) {
                return (norm * 22 + 348) % 360; // Cyberpunk Crimson Alert spectrum
            }
            // Aurora Borealis spectrum: Emerald Green (145°) -> Polar Cyan (180°) -> Arctic Blue (215°) -> Aurora Violet (275°)
            return 145 + norm * 130;
        };

        const getHaloColors = () => {
            if (isHacked) {
                return [
                    '255, 0, 60',
                    '220, 38, 38',
                    '185, 28, 28',
                    '255, 20, 20',
                    '153, 27, 27'
                ];
            }
            // Aurora celestial glowing gaseous nebulas
            return [
                '0, 245, 180',   // Aurora Emerald / Mint
                '0, 240, 255',   // Polar Cyan
                '56, 189, 248',  // Arctic Sky Blue
                '168, 85, 247',  // Aurora Violet
                '129, 140, 248', // Celestial Indigo
                '236, 72, 153'   // Aurora Magenta
            ];
        };

        const createNode = (staggered = false) => {
            const maxLife = 260 + Math.random() * 260;
            const life = staggered ? Math.random() * maxLife * 0.8 : 0;
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.3 : 0.85),
                vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.3 : 0.85),
                baseSize: 2.2 + Math.random() * 1.6,
                baseOffset: Math.random() * Math.PI * 2,
                hue: 330,
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.035 + Math.random() * 0.035,
                life: life,
                maxLife: maxLife,
                fadeAlpha: 0,
                trail: []
            };
        };

        const initNodes = () => {
            nodes.length = 0;
            const baseCount = Math.floor(width / 70);
            const count = prefersReducedMotion ? 8 : Math.min(26, Math.max(16, baseCount));
            for (let i = 0; i < count; i++) {
                nodes.push(createNode(true));
            }
        };

        const spawnHalo = () => {
            const haloPalette = getHaloColors();
            const colorRgb = haloPalette[Math.floor(Math.random() * haloPalette.length)];
            ambientHalos.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                radius: 200 + Math.random() * 220,
                colorRgb: colorRgb,
                alpha: 0,
                maxAlpha: 0.13 + Math.random() * 0.10,
                life: 0,
                maxLife: 240 + Math.random() * 200
            });
        };

        const createRipple = (x, y, customColor = null, customSpeed = null) => {
            if (prefersReducedMotion || isHacked) return;
            // Performance: limit concurrent ripples to at most 2
            if (ripples.length >= 2) {
                ripples.shift();
            }
            ripples.push({
                x: x,
                y: y,
                radius: 4,
                maxRadius: 260,
                speed: customSpeed || 7,
                alpha: 0.85,
                color: customColor || (Math.random() > 0.5 ? '#00f5b4' : '#00f0ff')
            });
        };

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
            initMatrixStreams();
        };

        const renderFrame = () => {
            if (!isTabVisible) return;

            time += 1;

            // Mouse smoothing
            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;

            ctx.clearRect(0, 0, width, height);

            // Deep obsidian background (Blackwall deep void in hacked mode)
            ctx.fillStyle = isHacked ? '#020003' : '#05060b';
            ctx.fillRect(0, 0, width, height);

            // 1. Ambient Halos (Aurora halos OR Blackwall deep blood-red nebulae)
            ctx.globalCompositeOperation = 'screen';
            if (ambientHalos.length < maxHalos && Math.random() < 0.05) {
                spawnHalo();
            }

                for (let i = ambientHalos.length - 1; i >= 0; i--) {
                    const h = ambientHalos[i];
                    h.life++;
                    h.x += h.vx;
                    h.y += h.vy;

                    const fadeInTime = h.maxLife * 0.25;
                    const fadeOutTime = h.maxLife * 0.70;

                    if (h.life < fadeInTime) {
                        h.alpha = (h.life / fadeInTime) * h.maxAlpha;
                    } else if (h.life > fadeOutTime) {
                        h.alpha = Math.max(0, ((h.maxLife - h.life) / (h.maxLife - fadeOutTime)) * h.maxAlpha);
                    } else {
                        h.alpha = h.maxAlpha;
                    }

                    if (h.life >= h.maxLife || h.alpha <= 0.001) {
                        ambientHalos.splice(i, 1);
                        continue;
                    }

                    const grad = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.radius);
                    grad.addColorStop(0, `rgba(${h.colorRgb}, ${h.alpha})`);
                    grad.addColorStop(0.5, `rgba(${h.colorRgb}, ${h.alpha * 0.4})`);
                    grad.addColorStop(1, 'rgba(0,0,0,0)');

                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(h.x, h.y, h.radius, 0, Math.PI * 2);
                    ctx.fill();
                }

            // 2. Dynamic mouse ambient glow
            if (mouse.active) {
                const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 350);
                if (isHacked) {
                    mouseGrad.addColorStop(0, 'rgba(255, 0, 60, 0.12)');
                    mouseGrad.addColorStop(0.6, 'rgba(252, 238, 10, 0.04)');
                } else {
                    mouseGrad.addColorStop(0, 'rgba(255, 42, 133, 0.08)');
                    mouseGrad.addColorStop(0.6, 'rgba(0, 240, 255, 0.03)');
                }
                mouseGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = mouseGrad;
                ctx.fillRect(0, 0, width, height);
            }

            // 3. Background: Neon Waves (Standard Theme) OR Cyber Matrix Lines (Cyberpunk Theme)
            ctx.globalCompositeOperation = 'lighter';

            if (!isHacked) {
                // STANDARD THEME: Organic Undulating Waves (Optimized Single-Pass)
                const step = 32;

                for (let w of waves) {
                    const baseY = height * w.yRatio;
                    const waveHue1 = getCyberHue(w.offset, 0.0035);
                    const waveHue2 = getCyberHue(w.offset + 1.2, 0.0035);

                    const waveGrad = ctx.createLinearGradient(0, baseY, width, baseY);
                    waveGrad.addColorStop(0, `hsla(${waveHue1}, 100%, 65%, 0.75)`);
                    waveGrad.addColorStop(0.5, `hsla(${waveHue2}, 100%, 60%, 0.85)`);
                    waveGrad.addColorStop(1, `hsla(${waveHue1}, 100%, 65%, 0.75)`);

                    ctx.save();
                    ctx.strokeStyle = waveGrad;
                    ctx.lineWidth = 2.0;

                    ctx.beginPath();
                    for (let x = 0; x <= width + step; x += step) {
                        const y = baseY + Math.sin(x * w.freq + time * w.speed) * w.amp;
                        if (x === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                    ctx.restore();
                }
            } else {
                // CYBERPUNK THEME: PLUIE DE DONNÉES CORROMPUES (Deep Net Matrix)
                // Cascade of Corrupted Deep Net Data Streams
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = 'bold 14px "JetBrains Mono", monospace';

                for (let s = 0; s < matrixStreams.length; s++) {
                    const stream = matrixStreams[s];
                    stream.y += stream.speed;

                    // Mouse distortion & lateral repulsion field
                    if (mouse.active) {
                        const mdx = stream.baseX - mouse.x;
                        const distM = Math.abs(mdx);
                        if (distM < 160) {
                            const force = (1 - distM / 160);
                            const dir = mdx >= 0 ? 1 : -1;
                            stream.distortionX += (dir * force * 38 - stream.distortionX) * 0.22;
                        } else {
                            stream.distortionX *= 0.86;
                        }
                    } else {
                        stream.distortionX *= 0.86;
                    }

                    const renderX = stream.baseX + stream.distortionX;

                    // Loop over characters in stream
                    for (let c = 0; c < stream.length; c++) {
                        const charY = stream.y - c * 17;
                        if (charY < -20 || charY > height + 20) continue;

                        // Dynamic character mutation (cipher scramble)
                        if (Math.random() < stream.mutateRate) {
                            stream.chars[c] = CYBER_MATRIX_CHARS[Math.floor(Math.random() * CYBER_MATRIX_CHARS.length)];
                        }

                        const char = stream.chars[c];

                        // Leading character: incandescent white with chromatic glitch on mouse
                        if (c === 0) {
                            if (mouse.active && Math.hypot(renderX - mouse.x, charY - mouse.y) < 140) {
                                ctx.fillStyle = 'rgba(0, 240, 255, 0.9)';
                                ctx.fillText(char, renderX - 2, charY);
                                ctx.fillStyle = 'rgba(255, 0, 60, 0.9)';
                                ctx.fillText(char, renderX + 2, charY);
                            }
                            ctx.fillStyle = '#ffffff';
                            ctx.fillText(char, renderX, charY);
                        } else if (c === 1 || c === 2) {
                            // Sub-lead hot scarlet / crimson
                            ctx.fillStyle = '#ff1a40';
                            ctx.fillText(char, renderX, charY);
                        } else {
                            // Fading tail of corrupted red data
                            const alpha = (1 - c / stream.length) * stream.depth * 0.85;
                            // Random subtle white glitch flicker in the tail
                            if (Math.random() < 0.03) {
                                ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, alpha + 0.3)})`;
                            } else {
                                ctx.fillStyle = `rgba(255, 0, 60, ${alpha})`;
                            }
                            ctx.fillText(char, renderX, charY);
                        }
                    }

                    // Reset stream when it has scrolled completely below viewport
                    if (stream.y - stream.length * 17 > height) {
                        stream.y = -(Math.random() * 120 + 20);
                        stream.speed = 3.5 + Math.random() * 5.5;
                        stream.distortionX = 0;
                    }
                }
                ctx.restore();

                // 3. Exploding Corrupted Glyph Shards from Clicks
                for (let b = burstGlyphs.length - 1; b >= 0; b--) {
                    const bg = burstGlyphs[b];
                    bg.x += bg.vx;
                    bg.y += bg.vy;
                    bg.vx *= 0.96;
                    bg.vy *= 0.96;
                    bg.alpha -= bg.decay;

                    if (bg.alpha <= 0) {
                        burstGlyphs.splice(b, 1);
                        continue;
                    }

                    ctx.save();
                    ctx.font = `bold ${bg.size}px "JetBrains Mono", monospace`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.globalAlpha = Math.max(0, bg.alpha);
                    if (bg.isWhite) {
                        ctx.fillStyle = '#ffffff';
                        ctx.shadowColor = '#ffffff';
                        ctx.shadowBlur = 10;
                    } else {
                        ctx.fillStyle = '#ff003c';
                        ctx.shadowColor = '#ff003c';
                        ctx.shadowBlur = 12;
                    }
                    ctx.fillText(bg.char, bg.x, bg.y);
                    ctx.restore();
                }
            }

            // 4. Mesh Nodes & Connections (Aurora Borealis Theme ONLY)
            // In Cyberpunk Mode (isHacked): NO nodes/balls/chips swarming or attracted to the cursor!
            if (!isHacked) {
                const maxDist = 210;
                const maxDistSq = maxDist * maxDist;
                const mouseRange = 270;
                const mouseRangeSq = mouseRange * mouseRange;

                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i];
                    let isConnectedToMouse = false;
                    let mouseDist = 9999;

                    if (mouse.active) {
                        const dx = mouse.x - node.x;
                        const dy = mouse.y - node.y;
                        const distSq = dx * dx + dy * dy;
                        if (distSq < mouseRangeSq) {
                            isConnectedToMouse = true;
                            mouseDist = Math.sqrt(distSq);
                        }
                    }

                    if (isConnectedToMouse) {
                        node.life = Math.min(node.life, node.maxLife * 0.45);
                        node.fadeAlpha = Math.min(1.0, node.fadeAlpha + 0.08);
                    } else {
                        const currentSpeed = Math.hypot(node.vx, node.vy);
                        const speedBurnFactor = 1 + Math.max(0, (currentSpeed - 0.7) * 2.2);
                        node.life += speedBurnFactor;

                        const fadeInFrames = node.maxLife * 0.18;
                        const fadeOutStart = node.maxLife * 0.78;

                        if (node.life < fadeInFrames) {
                            node.fadeAlpha = node.life / fadeInFrames;
                        } else if (node.life > fadeOutStart) {
                            node.fadeAlpha = Math.max(0, (node.maxLife - node.life) / (node.maxLife - fadeOutStart));
                        } else {
                            node.fadeAlpha = 1.0;
                        }

                        if (node.life >= node.maxLife || node.fadeAlpha <= 0.001) {
                            Object.assign(node, createNode(false));
                        }
                    }

                    node.x += node.vx;
                    node.y += node.vy;

                    node.vx *= 0.985;
                    node.vy *= 0.985;

                    if (node.x < 0 || node.x > width) node.vx *= -1;
                    if (node.y < 0 || node.y > height) node.vy *= -1;

                    node.pulsePhase += node.pulseSpeed;
                    node.hue = getCyberHue(node.baseOffset, 0.003);
                    const intensity = 0.5 + Math.sin(node.pulsePhase) * 0.5;
                    const currentRadius = node.baseSize * (0.8 + intensity * 0.55);

                    node.trail.unshift({ x: node.x, y: node.y });
                    if (node.trail.length > 12) node.trail.pop();

                    if (isConnectedToMouse && mouseDist > 25) {
                        const pull = (1 - mouseDist / mouseRange) * 0.28;
                        node.x += ((mouse.x - node.x) / mouseDist) * pull;
                        node.y += ((mouse.y - node.y) / mouseDist) * pull;
                    }

                    // Render node trails
                    if (node.trail.length > 1) {
                        const trailAlpha = (0.28 + intensity * 0.28) * node.fadeAlpha;
                        ctx.strokeStyle = `hsla(${node.hue}, 100%, 65%, ${trailAlpha})`;
                        ctx.lineWidth = Math.max(1, node.baseSize * 0.9);
                        ctx.beginPath();
                        ctx.moveTo(node.trail[0].x, node.trail[0].y);
                        for (let t = 1; t < node.trail.length; t++) {
                            ctx.lineTo(node.trail[t].x, node.trail[t].y);
                        }
                        ctx.stroke();
                    }

                    // Render node sphere
                    const sphereAlpha = (0.65 + intensity * 0.35) * node.fadeAlpha;
                    ctx.fillStyle = `hsla(${node.hue}, 100%, 65%, ${sphereAlpha})`;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
                    ctx.fill();

                    // Core incandescent point
                    const coreAlpha = (0.75 + intensity * 0.25) * node.fadeAlpha;
                    ctx.fillStyle = `rgba(255, 255, 255, ${coreAlpha})`;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, currentRadius * 0.45, 0, Math.PI * 2);
                    ctx.fill();

                    // Inter-node connections
                    for (let j = i + 1; j < nodes.length; j++) {
                        const node2 = nodes[j];
                        const dx = node.x - node2.x;
                        const dy = node.y - node2.y;
                        const distSq = dx * dx + dy * dy;

                        if (distSq < maxDistSq) {
                            const dist = Math.sqrt(distSq);
                            const nodeSpeed = (Math.hypot(node.vx, node.vy) + Math.hypot(node2.vx, node2.vy)) * 0.5;
                            const speedBoost = Math.min(1.8, Math.max(0, (nodeSpeed - 0.7) * 1.6));
                            const alpha = Math.min(1.0, (1 - dist / maxDist) * (0.42 + speedBoost * 0.35) * Math.min(node.fadeAlpha, node2.fadeAlpha));
                            const lineHue = getCyberHue(i * 0.35, 0.0035);
                            ctx.strokeStyle = `hsla(${lineHue}, 100%, ${65 + speedBoost * 15}%, ${alpha})`;
                            ctx.lineWidth = alpha * (1.6 + speedBoost * 2.0);

                            ctx.beginPath();
                            ctx.moveTo(node.x, node.y);
                            ctx.lineTo(node2.x, node2.y);
                            ctx.stroke();
                        }
                    }

                    // Laser beam to mouse (Aurora theme only)
                    if (isConnectedToMouse) {
                        const beamAlpha = (1 - mouseDist / mouseRange) * 0.85 * node.fadeAlpha;
                        const mouseHue = getCyberHue(0, 0.005);
                        ctx.strokeStyle = `hsla(${mouseHue}, 100%, 65%, ${beamAlpha})`;
                        ctx.lineWidth = beamAlpha * 2.0;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            // 4.5. Tactical Netrunner Breach Reticle (Cyberpunk Mode Only)
            if (isHacked && mouse.active) {
                const mx = mouse.x;
                const my = mouse.y;
                ctx.save();

                const boxSize = 16;
                const cornerLen = 5;

                // Cyber brackets [ ] around mouse
                ctx.strokeStyle = '#ff003c';
                ctx.lineWidth = 1.5;
                ctx.shadowColor = '#ff003c';
                ctx.shadowBlur = 8;

                // Top-left
                ctx.beginPath();
                ctx.moveTo(mx - boxSize, my - boxSize + cornerLen);
                ctx.lineTo(mx - boxSize, my - boxSize);
                ctx.lineTo(mx - boxSize + cornerLen, my - boxSize);
                ctx.stroke();

                // Top-right
                ctx.beginPath();
                ctx.moveTo(mx + boxSize - cornerLen, my - boxSize);
                ctx.lineTo(mx + boxSize, my - boxSize);
                ctx.lineTo(mx + boxSize, my - boxSize + cornerLen);
                ctx.stroke();

                // Bottom-left
                ctx.beginPath();
                ctx.moveTo(mx - boxSize, my + boxSize - cornerLen);
                ctx.lineTo(mx - boxSize, my + boxSize);
                ctx.lineTo(mx - boxSize + cornerLen, my + boxSize);
                ctx.stroke();

                // Bottom-right
                ctx.beginPath();
                ctx.moveTo(mx + boxSize - cornerLen, my + boxSize);
                ctx.lineTo(mx + boxSize, my + boxSize);
                ctx.lineTo(mx + boxSize, my + boxSize - cornerLen);
                ctx.stroke();

                // Center red breach dot
                ctx.fillStyle = '#ff003c';
                ctx.beginPath();
                ctx.arc(mx, my, 2.0, 0, Math.PI * 2);
                ctx.fill();

                // Small discreet Netrunner tag
                ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
                ctx.fillStyle = '#ff003c';
                ctx.shadowColor = '#ff003c';
                ctx.shadowBlur = 6;
                ctx.fillText('NET_BREACH', mx + boxSize + 6, my + 3);

                ctx.restore();
            }

            // 5. Click Reactions: Circular Ripples (Standard Theme only)
            if (!isHacked) {
                for (let k = ripples.length - 1; k >= 0; k--) {
                    const r = ripples[k];
                    r.radius += r.speed;
                    r.alpha -= 0.024;

                    if (r.alpha <= 0 || r.radius >= r.maxRadius) {
                        ripples.splice(k, 1);
                        continue;
                    }

                    ctx.save();
                    ctx.strokeStyle = r.color;
                    ctx.globalAlpha = Math.max(0, r.alpha);
                    ctx.lineWidth = 2.0;
                    ctx.beginPath();
                    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                    ctx.stroke();

                    // Subtle inner accent ring for high-tech pulse feel
                    if (r.radius > 25) {
                        ctx.strokeStyle = '#ffffff';
                        ctx.globalAlpha = Math.max(0, r.alpha * 0.45);
                        ctx.lineWidth = 1.0;
                        ctx.beginPath();
                        ctx.arc(r.x, r.y, r.radius * 0.72, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
            }

            // 6. Chromatic Aberration Glitch Slices (Cyberpunk Mode)
            if (isHacked && !prefersReducedMotion && (glitchActive || Math.random() < 0.14)) {
                const sliceH = 4 + Math.random() * 22;
                const sliceY = Math.random() * height;
                const shift = (Math.random() - 0.5) * 32;

                ctx.save();
                // Cyan slice displacement
                ctx.fillStyle = 'rgba(0, 240, 255, 0.22)';
                ctx.fillRect(shift, sliceY, width, sliceH);

                // Red slice displacement
                ctx.fillStyle = 'rgba(255, 0, 60, 0.24)';
                ctx.fillRect(-shift * 0.7, sliceY + 2, width, sliceH * 0.75);

                // High-contrast white horizontal laser glitch line
                if (Math.random() < 0.35) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, sliceY + sliceH * 0.5, width, 1.5);
                }
                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(renderFrame);
        };

        const setupEvents = () => {
            window.addEventListener('resize', handleResize, { passive: true });

            window.addEventListener('mousemove', (e) => {
                mouse.targetX = e.clientX;
                mouse.targetY = e.clientY;
                mouse.active = true;
            }, { passive: true });

            window.addEventListener('mouseleave', () => {
                mouse.active = false;
            });

            window.addEventListener('click', (e) => {
                if (e.target.closest('a, button, input, textarea, .clickable-image')) return;
                createRipple(e.clientX, e.clientY);
            });

            window.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches[0]) {
                    const touch = e.touches[0];
                    if (e.target.closest('a, button, input, textarea, .clickable-image')) return;
                    createRipple(touch.clientX, touch.clientY);
                }
            }, { passive: true });

            // Tactile audio feedback & EMP blast for interactive clicks in Cyberpunk mode (EXCLUDING avatar image)
            document.addEventListener('click', (e) => {
                if (e.target.closest('.hero-avatar-frame')) return;
                if (isHacked && e.target.closest('a, button, .project-card, .skill-card, .github-card, .hobby-card, .contact-card-box, .filter-btn')) {
                    SoundEngine.playClick();
                    triggerDataBurst(e.clientX, e.clientY);
                }
            }, { passive: true });

            // Tactile audio micro-glitch feedback on hovering interactive elements in Cyberpunk mode
            document.addEventListener('mouseover', (e) => {
                if (!isHacked) return;
                const interactive = e.target.closest('a, button, .project-card, .skill-card, .github-card, .hobby-card, .contact-card-box, .filter-btn, .hero-avatar-frame');
                if (interactive && !interactive._cyberGlitchHovered) {
                    interactive._cyberGlitchHovered = true;
                    SoundEngine.playGlitch();
                    setTimeout(() => { interactive._cyberGlitchHovered = false; }, 320);
                }
            }, { passive: true });


            // Pause/Resume rendering on visibility change
            document.addEventListener('visibilitychange', () => {
                isTabVisible = !document.hidden;
                if (isTabVisible && !animationFrameId) {
                    animationFrameId = requestAnimationFrame(renderFrame);
                } else if (!isTabVisible && animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            });
        };

        const init = () => {
            canvas = document.getElementById('bg-canvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.id = 'bg-canvas';
                document.body.prepend(canvas);
            }

            ctx = canvas.getContext('2d');
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            mouse.x = mouse.targetX = width / 2;
            mouse.y = mouse.targetY = height / 2;

            initNodes();
            initMatrixStreams();

            for (let i = 0; i < 4; i++) {
                spawnHalo();
                if (ambientHalos[i]) {
                    ambientHalos[i].life = Math.random() * ambientHalos[i].maxLife * 0.6;
                    ambientHalos[i].alpha = Math.random() * ambientHalos[i].maxAlpha;
                }
            }

            setupEvents();
            animationFrameId = requestAnimationFrame(renderFrame);
        };

        const setHacked = (hackedState) => {
            isHacked = hackedState;
        };

        return {
            init: init,
            createRipple: createRipple,
            setHacked: setHacked
        };
    })();

    // ==========================================================================
    // 3. SCROLLSPY (Observer Pattern - Zero Layout Thrashing)
    // ==========================================================================
    const ScrollSpy = (() => {
        const init = () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            if (!sections.length || !navLinks.length) return;

            const setActiveLink = (id) => {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            };

            // Use IntersectionObserver when available for 60-120FPS performance
            if ('IntersectionObserver' in window) {
                const observerOptions = {
                    root: null,
                    rootMargin: '-20% 0px -60% 0px',
                    threshold: 0
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setActiveLink(entry.target.id);
                        }
                    });
                }, observerOptions);

                sections.forEach(section => observer.observe(section));
            } else {
                // Fallback throttled scroll listener for legacy browsers
                let ticking = false;
                window.addEventListener('scroll', () => {
                    if (!ticking) {
                        window.requestAnimationFrame(() => {
                            const scrollY = window.pageYOffset;
                            sections.forEach(section => {
                                const sectionHeight = section.offsetHeight;
                                const sectionTop = section.offsetTop - 120;
                                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                                    setActiveLink(section.getAttribute('id'));
                                }
                            });
                            ticking = false;
                        });
                        ticking = true;
                    }
                }, { passive: true });
            }
        };

        return { init: init };
    })();

    // ==========================================================================
    // 4. NAVIGATION & MOBILE BURGER MENU (Controller Pattern)
    // ==========================================================================
    const Navigation = (() => {
        const init = () => {
            const burgerBtn = document.querySelector('.burger-btn');
            const navMenu = document.querySelector('.nav-menu');
            const navLinks = document.querySelectorAll('.nav-link, .nav-btn-cv');

            if (!burgerBtn || !navMenu) return;

            const toggleMenu = (open) => {
                const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
                burgerBtn.classList.toggle('open', isOpen);
                navMenu.classList.toggle('open', isOpen);
                burgerBtn.setAttribute('aria-expanded', isOpen.toString());
                document.body.classList.toggle('no-scroll', isOpen);
            };

            burgerBtn.addEventListener('click', () => toggleMenu());

            navLinks.forEach(link => {
                link.addEventListener('click', () => toggleMenu(false));
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                    toggleMenu(false);
                    burgerBtn.focus();
                }
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                if (navMenu.classList.contains('open') &&
                    !navMenu.contains(e.target) &&
                    !burgerBtn.contains(e.target)) {
                    toggleMenu(false);
                }
            });
        };

        return { init: init };
    })();

    // ==========================================================================
    // 5. MODAL MANAGER (Singleton & Facade Pattern)
    // ==========================================================================
    const ModalManager = (() => {
        let lastFocusedElement = null;

        const open = (modalId, triggerElement = null) => {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            lastFocusedElement = triggerElement || document.activeElement;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            const closeBtn = modal.querySelector('.project-modal-close');
            if (closeBtn) closeBtn.focus();
        };

        const close = (modal) => {
            if (!modal) return;
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');

            // Restore scroll if no lightbox is active
            const isLightboxOpen = document.querySelector('.lightbox.active');
            if (!isLightboxOpen) {
                document.body.style.overflow = '';
            }

            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        };

        const closeAll = () => {
            document.querySelectorAll('.project-modal.active').forEach(modal => close(modal));
        };

        const init = () => {
            const modalButtons = document.querySelectorAll('.open-modal-btn');
            const modals = document.querySelectorAll('.project-modal');

            modalButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const modalId = btn.getAttribute('data-modal');
                    open(modalId, btn);
                });
            });

            modals.forEach(modal => {
                const closeBtn = modal.querySelector('.project-modal-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => close(modal));
                }

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        close(modal);
                    }
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const activeModal = document.querySelector('.project-modal.active');
                    if (activeModal && !document.querySelector('.lightbox.active')) {
                        close(activeModal);
                    }
                }
            });
        };

        return {
            init: init,
            open: open,
            close: close,
            closeAll: closeAll
        };
    })();

    // ==========================================================================
    // 6. IMAGE LIGHTBOX VIEWER (Singleton Pattern)
    // ==========================================================================
    const Lightbox = (() => {
        let lightboxElement = null;
        let lightboxImg = null;
        let lastTrigger = null;

        const open = (src, alt, trigger) => {
            if (!lightboxElement) return;
            lastTrigger = trigger || document.activeElement;
            lightboxImg.src = src;
            lightboxImg.alt = alt || "Capture d'écran du projet";
            lightboxElement.classList.add('active');
            lightboxElement.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            const closeBtn = lightboxElement.querySelector('.lightbox-close');
            if (closeBtn) closeBtn.focus();
        };

        const close = () => {
            if (!lightboxElement) return;
            lightboxElement.classList.remove('active');
            lightboxElement.setAttribute('aria-hidden', 'true');

            const isProjectModalOpen = document.querySelector('.project-modal.active');
            if (!isProjectModalOpen) {
                document.body.style.overflow = '';
            }

            if (lastTrigger && typeof lastTrigger.focus === 'function') {
                lastTrigger.focus();
            }
        };

        const init = () => {
            lightboxElement = document.createElement('div');
            lightboxElement.className = 'lightbox';
            lightboxElement.setAttribute('role', 'dialog');
            lightboxElement.setAttribute('aria-modal', 'true');
            lightboxElement.setAttribute('aria-hidden', 'true');
            lightboxElement.setAttribute('aria-label', "Visionneuse d'image agrandie");
            lightboxElement.innerHTML = `
                <button class="lightbox-close" aria-label="Fermer la vue agrandie">&times;</button>
                <img class="lightbox-content" src="" alt="Agrandissement capture d'écran">
            `;
            document.body.appendChild(lightboxElement);

            lightboxImg = lightboxElement.querySelector('.lightbox-content');
            const closeBtn = lightboxElement.querySelector('.lightbox-close');

            if (closeBtn) {
                closeBtn.addEventListener('click', close);
            }

            lightboxElement.addEventListener('click', (e) => {
                if (e.target === lightboxElement) close();
            });

            document.querySelectorAll('.clickable-image').forEach(img => {
                img.addEventListener('click', () => open(img.src, img.alt, img));
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightboxElement.classList.contains('active')) {
                    close();
                }
            });
        };

        return {
            init: init,
            open: open,
            close: close
        };
    })();

    // ==========================================================================
    // 7. PROJECT FILTERING (Strategy Pattern)
    // ==========================================================================
    const ProjectFilter = (() => {
        const init = () => {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');

            if (!filterButtons.length || !projectCards.length) return;

            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => {
                        b.classList.remove('active');
                        b.setAttribute('aria-pressed', 'false');
                    });

                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');

                    const filterValue = btn.getAttribute('data-filter') || 'all';

                    projectCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category') || '';
                        const matches = filterValue === 'all' || cardCategory.includes(filterValue);

                        if (matches) {
                            card.style.display = 'flex';
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(12px)';
                            window.requestAnimationFrame(() => {
                                card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            });
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        };

        return { init: init };
    })();

    // ==========================================================================
    // 8. GITHUB REPOSITORIES SERVICE (Repository & Cache-Aside Pattern)
    // ==========================================================================
    const GitHubService = (() => {
        const renderRepos = (reposList) => {
            const grid = document.getElementById('github-repos-grid');
            const syncText = document.getElementById('github-sync-text');
            if (!grid || !Array.isArray(reposList) || !reposList.length) return;

            const filtered = reposList.filter(repo => {
                if (!repo || repo.fork) return false;
                if (repo.name === Config.github.username) return false;
                return true;
            });

            filtered.sort((a, b) => {
                const enrichA = Config.repoEnrichments[a.name];
                const enrichB = Config.repoEnrichments[b.name];
                const pA = (enrichA && enrichA.priority) ? enrichA.priority : 99;
                const pB = (enrichB && enrichB.priority) ? enrichB.priority : 99;
                if (pA !== pB) return pA - pB;
                const dateA = new Date(a.pushed_at || a.updated_at || 0).getTime();
                const dateB = new Date(b.pushed_at || b.updated_at || 0).getTime();
                return dateB - dateA;
            });

            const displayRepos = filtered.slice(0, Config.github.maxDisplayRepos);

            grid.innerHTML = displayRepos.map(repo => {
                const enrich = Config.repoEnrichments[repo.name] || {};
                const langConf = Config.languages[repo.language] || {
                    badge: 'badge-cyan',
                    dot: 'var(--neon-cyan)',
                    name: repo.language || 'Projet'
                };

                const desc = enrich.desc || repo.description || 'Projet et code source public sur GitHub.';
                const badgeText = enrich.badgeText || langConf.name;
                const badgeClass = enrich.badgeClass || langConf.badge;
                const dotColor = enrich.dotColor || langConf.dot;
                const techText = enrich.tags || `${repo.language || 'Code'} / Git`;

                const stars = repo.stargazers_count ? `<span class="github-stat-item">${Config.icons.star} ${repo.stargazers_count}</span>` : '';
                const forks = repo.forks_count ? `<span class="github-stat-item">${Config.icons.fork} ${repo.forks_count}</span>` : '';
                const statsHtml = (stars || forks) ? `<div class="github-stats">${stars}${forks}</div>` : '';

                return `
                    <article class="github-card">
                        <div>
                            <div class="github-card-header">
                                <h3 class="github-repo-title">
                                    ${Config.icons.github}
                                    ${repo.name}
                                </h3>
                                <span class="badge ${badgeClass}">${badgeText}</span>
                            </div>
                            <p>${desc}</p>
                            ${statsHtml}
                        </div>
                        <div class="github-card-footer">
                            <div class="github-tech">
                                <span class="github-tech-dot" style="background: ${dotColor}; box-shadow: 0 0 8px ${dotColor};"></span>
                                <span>${techText}</span>
                            </div>
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-link-btn">Code source ↗</a>
                        </div>
                    </article>
                `;
            }).join('');

            if (syncText) {
                syncText.textContent = `Synchronisé en direct (${displayRepos.length} dépôts actifs)`;
            }
        };

        const fetchRepos = () => {
            const grid = document.getElementById('github-repos-grid');
            if (!grid) return;

            // 1. Cache-Aside: Try reading local storage first for 0ms instant display
            try {
                const cachedData = localStorage.getItem(Config.github.cacheKey);
                const cachedTime = localStorage.getItem(Config.github.cacheTimeKey);
                const isCacheValid = cachedData && cachedTime && (Date.now() - parseInt(cachedTime, 10) < Config.github.cacheTtlMs);

                if (isCacheValid) {
                    const repos = JSON.parse(cachedData);
                    renderRepos(repos);
                }
            } catch (storageErr) {
                console.warn('Erreur lecture cache local:', storageErr);
            }

            // 2. Fetch fresh data from GitHub REST API
            fetch(Config.github.apiEndpoint, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(repos => {
                if (Array.isArray(repos) && repos.length > 0) {
                    try {
                        localStorage.setItem(Config.github.cacheKey, JSON.stringify(repos));
                        localStorage.setItem(Config.github.cacheTimeKey, Date.now().toString());
                    } catch (e) {
                        console.warn('Quota localStorage dépassé:', e);
                    }
                    renderRepos(repos);
                }
            })
            .catch(() => {
                // Progressive enhancement: Keeps pre-rendered HTML cards on network failure or rate limit
                console.info('Utilisation du rendu HTML ou cache local par défaut.');
            });
        };

        return { init: fetchRepos };
    })();

    // ==========================================================================
    // 9. AUDIO SYNTHESIS ENGINE (Web Audio API - Procedural SFX)
    // ==========================================================================
    const SoundEngine = (() => {
        let audioCtx = null;

        const getContext = () => {
            if (!audioCtx) {
                const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
                if (AudioCtxClass) {
                    audioCtx = new AudioCtxClass();
                }
            }
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume().catch(() => {});
            }
            return audioCtx;
        };

        const playBlip = (step) => {
            try {
                const ctx = getContext();
                if (!ctx) return;

                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = step >= 7 ? 'sawtooth' : 'sine';
                const baseFreq = 260 + (step * 75);
                osc.frequency.setValueAtTime(baseFreq, now);
                osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);

                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now);
                osc.stop(now + 0.09);
            } catch (e) {
                // Silent fallback if audio is blocked or unsupported
            }
        };

        const playBreachAlarm = () => {
            try {
                const ctx = getContext();
                if (!ctx) return;

                const now = ctx.currentTime;

                // 1. Sub-bass drop
                const subOsc = ctx.createOscillator();
                const subGain = ctx.createGain();
                subOsc.type = 'triangle';
                subOsc.frequency.setValueAtTime(140, now);
                subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.9);

                subGain.gain.setValueAtTime(0.3, now);
                subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

                subOsc.connect(subGain);
                subGain.connect(ctx.destination);
                subOsc.start(now);
                subOsc.stop(now + 0.95);

                // 2. Dissonant alert siren
                const alarmOsc = ctx.createOscillator();
                const alarmGain = ctx.createGain();
                alarmOsc.type = 'sawtooth';
                alarmOsc.frequency.setValueAtTime(540, now + 0.05);
                alarmOsc.frequency.linearRampToValueAtTime(880, now + 0.28);
                alarmOsc.frequency.linearRampToValueAtTime(420, now + 0.55);
                alarmOsc.frequency.linearRampToValueAtTime(920, now + 0.85);

                alarmGain.gain.setValueAtTime(0.001, now);
                alarmGain.gain.linearRampToValueAtTime(0.14, now + 0.08);
                alarmGain.gain.linearRampToValueAtTime(0.14, now + 0.75);
                alarmGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

                alarmOsc.connect(alarmGain);
                alarmGain.connect(ctx.destination);
                alarmOsc.start(now + 0.05);
                alarmOsc.stop(now + 0.95);
            } catch (e) {}
        };

        const playReboot = () => {
            try {
                const ctx = getContext();
                if (!ctx) return;

                const now = ctx.currentTime;
                // Harmonic ascending arpeggio: C4, E4, G4, C5, E5
                const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
                notes.forEach((freq, idx) => {
                    const noteTime = now + (idx * 0.09);
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, noteTime);

                    gain.gain.setValueAtTime(0.001, noteTime);
                    gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.32);

                    osc.connect(gain);
                    gain.connect(ctx.destination);

                    osc.start(noteTime);
                    osc.stop(noteTime + 0.35);
                });
            } catch (e) {}
        };

        const playClick = () => {
            try {
                const ctx = getContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.035);
            } catch (e) {}
        };

        const playGlitch = () => {
            try {
                const ctx = getContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(1400 + Math.random() * 600, now);
                osc.frequency.setValueAtTime(340 + Math.random() * 200, now + 0.015);
                gain.gain.setValueAtTime(0.022, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.038);
            } catch (e) {}
        };

        return {
            playBlip: playBlip,
            playBreachAlarm: playBreachAlarm,
            playReboot: playReboot,
            playClick: playClick,
            playGlitch: playGlitch
        };
    })();

    // ==========================================================================
    // 10. TEXT DECRYPTION / SCRAMBLER ENGINE (Matrix & Glitch Effect on ALL Texts)
    // ==========================================================================
    const TextScrambler = (() => {
        const glyphs = '!<>-_\\/[]{}—=+*^?#________01%&$';

        const textSelectors = [
            'main h1', 'main h2', 'main h3', 'main h4', 'main h5', 'main h6',
            'main p',
            'main .hero-tagline',
            'main .hero-subtitle',
            'main .hero-description',
            'main .stat-item h3', 'main .stat-item p',
            'main .section-title', 'main .section-subtitle',
            'main .timeline-title', 'main .timeline-org', 'main .timeline-date', 'main .timeline-badge', 'main .timeline-year',
            'main .skill-category-title', 'main .skill-card-title', 'main .skill-card-desc', 'main .skill-item-name',
            'main .project-title', 'main .project-desc', 'main .project-badge-top',
            'main .repo-title', 'main .repo-desc',
            'main .hobby-title', 'main .hobby-desc',
            'main .contact-card h3', 'main .contact-card p', 'main .contact-item-title', 'main .contact-item-value',
            'main .badge', 'main .tech-tag', 'main .hobby-tag', 'main .project-breadcrumb',
            'main label',
            'main .filter-btn',
            'main .btn',
            'footer p', 'footer .footer-copy', 'footer .footer-text'
        ];

        let cyberObserver = null;
        let isCyberActive = false;
        let trackedElements = [];

        const collectTextElements = () => {
            const raw = Array.from(document.querySelectorAll(textSelectors.join(', ')));
            return raw.filter(el => {
                const text = el.textContent ? el.textContent.trim() : '';
                if (!text || text.length === 0) return false;

                // Never scramble controls, navbar, forms, counters
                if (el.closest('#avatar-hack-counter, .navbar, nav, form input, form textarea, form select, .modal-close')) {
                    return false;
                }

                // If an ancestor is already in raw, skip this descendant to prevent nested double-scrambling
                let parent = el.parentElement;
                while (parent) {
                    if (raw.includes(parent)) return false;
                    parent = parent.parentElement;
                }

                return true;
            });
        };

        const generateEncryptedText = (length) => {
            const count = Math.max(1, length || 1);
            let str = '';
            for (let i = 0; i < count; i++) {
                str += glyphs[Math.floor(Math.random() * glyphs.length)];
            }
            return str;
        };

        const isElementInViewport = (el) => {
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const vw = window.innerWidth || document.documentElement.clientWidth;
            return (
                rect.top < vh &&
                rect.bottom > 0 &&
                rect.left < vw &&
                rect.right > 0
            );
        };

        const storeBaseData = (el) => {
            if (!el._cyberBaseHtml) {
                const svg = el.querySelector('svg');
                el._cyberBaseHtml = el.innerHTML;
                el._cyberPlainText = el.textContent ? el.textContent.trim() : '';
                el._cyberSvgHtml = svg ? svg.outerHTML : null;
                el._cyberHasSvg = !!svg;
            }
        };

        const setScrambledText = (el) => {
            storeBaseData(el);
            const cipher = generateEncryptedText(el._cyberPlainText.length);
            if (el._cyberHasSvg && el._cyberSvgHtml) {
                el.innerHTML = el._cyberSvgHtml + ' ' + cipher;
            } else {
                el.textContent = cipher;
            }
        };

        const scrambleElement = (el, onComplete = null) => {
            if (!el) return;
            storeBaseData(el);

            if (el._scrambleRaf) {
                cancelAnimationFrame(el._scrambleRaf);
                el._scrambleRaf = null;
            }

            const targetText = el._cyberPlainText;
            const length = targetText.length;
            const duration = Math.min(650, Math.max(350, length * 10));
            const startTime = performance.now();

            const update = (now) => {
                const progress = Math.min(1, (now - startTime) / duration);
                const revealedCount = Math.floor(progress * length);

                let output = '';
                for (let i = 0; i < length; i++) {
                    if (i < revealedCount) {
                        output += targetText[i];
                    } else {
                        output += glyphs[Math.floor(Math.random() * glyphs.length)];
                    }
                }

                if (progress < 1) {
                    if (el._cyberHasSvg && el._cyberSvgHtml) {
                        el.innerHTML = el._cyberSvgHtml + ' ' + output;
                    } else {
                        el.textContent = output;
                    }
                    el._scrambleRaf = requestAnimationFrame(update);
                } else {
                    el._scrambleRaf = null;
                    // Restore original HTML (preserves inner tags like <span>, <strong>, etc.)
                    el.innerHTML = el._cyberBaseHtml;
                    if (typeof onComplete === 'function') {
                        onComplete();
                    }
                }
            };

            el._scrambleRaf = requestAnimationFrame(update);
        };

        const initObserver = () => {
            if (cyberObserver) {
                cyberObserver.disconnect();
            }

            if ('IntersectionObserver' in window) {
                cyberObserver = new IntersectionObserver((entries) => {
                    if (!isCyberActive) return;

                    entries.forEach(entry => {
                        const el = entry.target;
                        if (!el) return;

                        if (entry.isIntersecting) {
                            // Element enters viewport: decode into base text
                            if (el._scrambleState !== 'decoded' && el._scrambleState !== 'animating') {
                                el._scrambleState = 'animating';
                                scrambleElement(el, () => {
                                    el._scrambleState = 'decoded';
                                });
                            }
                        } else {
                            // Element leaves viewport: re-encrypt so it is scripted again off-screen
                            if (el._scrambleState !== 'scrambled') {
                                if (el._scrambleRaf) {
                                    cancelAnimationFrame(el._scrambleRaf);
                                    el._scrambleRaf = null;
                                }
                                el._scrambleState = 'scrambled';
                                setScrambledText(el);
                            }
                        }
                    });
                }, {
                    root: null,
                    rootMargin: '0px 0px 0px 0px',
                    threshold: 0.05
                });
            }
        };

        const scrambleAll = (toCyber = true) => {
            isCyberActive = toCyber;

            if (cyberObserver) {
                cyberObserver.disconnect();
            }

            trackedElements = collectTextElements();

            if (toCyber) {
                initObserver();

                trackedElements.forEach(el => {
                    storeBaseData(el);

                    if (isElementInViewport(el)) {
                        // In viewport: decode immediately
                        el._scrambleState = 'animating';
                        scrambleElement(el, () => {
                            el._scrambleState = 'decoded';
                        });
                    } else {
                        // Off-screen: script with encrypted matrix glyphs
                        el._scrambleState = 'scrambled';
                        setScrambledText(el);
                    }

                    if (cyberObserver) {
                        cyberObserver.observe(el);
                    }
                });
            } else {
                // Restore Aurora theme: clean base texts, reset state
                trackedElements.forEach(el => {
                    if (el._scrambleRaf) {
                        cancelAnimationFrame(el._scrambleRaf);
                        el._scrambleRaf = null;
                    }
                    el._scrambleState = 'decoded';
                    if (el._cyberBaseHtml) {
                        el.innerHTML = el._cyberBaseHtml;
                    }
                });
            }
        };

        return {
            scrambleAll: scrambleAll
        };
    })();

    // ==========================================================================
    // 11. THEME MANAGER & CYBERPUNK EASTER EGG (Dual Distinct Themes)
    // ==========================================================================
    const ThemeManager = (() => {
        let avatarClicks = 0;
        let clickTimer = null;
        let isHacked = false;

        const updateThemeUI = (hackedState) => {
            const avatarFrame = document.querySelector('.hero-avatar-frame');
            const heroBadgeText = document.getElementById('hero-badge-text');

            if (avatarFrame) {
                avatarFrame.setAttribute(
                    'title',
                    hackedState
                        ? 'Bernard Sourichanh [10 clics sur l\'image pour restaurer le thème normal]'
                        : 'Bernard Sourichanh [10 clics sur l\'image pour activer le thème Cyberpunk]'
                );
            }

            if (heroBadgeText) {
                const targetText = hackedState ? 'I told you' : "Don't click me";
                const glyphs = '!<>-_\\/[]{}—=+*^?#01';
                let step = 0;
                const totalSteps = 10;
                const interval = setInterval(() => {
                    step++;
                    if (step >= totalSteps) {
                        clearInterval(interval);
                        heroBadgeText.textContent = targetText;
                    } else {
                        let scram = '';
                        for (let i = 0; i < targetText.length; i++) {
                            if (i < (step / totalSteps) * targetText.length) {
                                scram += targetText[i];
                            } else {
                                scram += glyphs[Math.floor(Math.random() * glyphs.length)];
                            }
                        }
                        heroBadgeText.textContent = scram;
                    }
                }, 35);
            }
        };

        const toggleTheme = (enable, playAudio = true) => {
            isHacked = enable;
            NeonCanvas.setHacked(isHacked);
            updateThemeUI(isHacked);

            const counterBadge = document.getElementById('avatar-hack-counter');
            const crtFlash = document.getElementById('hack-crt-flash');

            if (isHacked) {
                try {
                    localStorage.setItem('portfolio_theme', 'cyberpunk');
                } catch (e) {}

                if (playAudio) {
                    SoundEngine.playBreachAlarm();
                }
                document.body.classList.add('system-hacked');

                if (counterBadge) {
                    counterBadge.textContent = '[CYBERPUNK ACTIF]';
                    counterBadge.classList.add('visible', 'bump');
                }

                TextScrambler.scrambleAll(true);
            } else {
                try {
                    localStorage.setItem('portfolio_theme', 'aurora');
                } catch (e) {}

                if (playAudio) {
                    SoundEngine.playReboot();
                }

                if (crtFlash) {
                    crtFlash.classList.add('flash-active');
                }

                setTimeout(() => {
                    document.body.classList.remove('system-hacked');
                    avatarClicks = 0;

                    if (counterBadge) {
                        counterBadge.classList.remove('visible', 'bump');
                        counterBadge.textContent = '';
                    }

                    TextScrambler.scrambleAll(false);
                    NeonCanvas.createRipple(window.innerWidth / 2, window.innerHeight / 2, '#00f5b4', 16);
                }, 250);

                setTimeout(() => {
                    if (crtFlash) {
                        crtFlash.classList.remove('flash-active');
                    }
                }, 750);
            }
        };

        const init = () => {
            const avatarFrame = document.querySelector('.hero-avatar-frame');
            const counterBadge = document.getElementById('avatar-hack-counter');

            // Easter Egg Avatar Clicks Trigger (10 clicks to toggle / 10 clicks to restore)
            if (avatarFrame) {
                avatarFrame.style.cursor = 'pointer';
                avatarFrame.setAttribute('title', 'Bernard Sourichanh [10 clics sur l\'image pour activer le thème Cyberpunk]');
                avatarFrame.setAttribute('role', 'button');
                avatarFrame.setAttribute('tabindex', '0');

                const handleAvatarClick = () => {
                    avatarClicks++;
                    clearTimeout(clickTimer);

                    // Trigger tactile digital glitch animation on avatar image
                    avatarFrame.classList.remove('avatar-glitch-active');
                    void avatarFrame.offsetWidth;
                    avatarFrame.classList.add('avatar-glitch-active');
                    setTimeout(() => {
                        avatarFrame.classList.remove('avatar-glitch-active');
                    }, 240);

                    if (isHacked) {
                        // In Cyberpunk Mode: 10 clicks to restore default Aurora theme
                        SoundEngine.playGlitch();

                        if (counterBadge) {
                            counterBadge.textContent = `[RESTORE: ${avatarClicks}/10]`;
                            counterBadge.classList.add('visible');
                            counterBadge.classList.remove('bump');
                            void counterBadge.offsetWidth;
                            counterBadge.classList.add('bump');
                        }

                        if (avatarClicks >= 10) {
                            toggleTheme(false, true);
                            avatarClicks = 0;
                        } else {
                            clickTimer = setTimeout(() => {
                                avatarClicks = 0;
                                if (counterBadge && isHacked) {
                                    counterBadge.textContent = '[CYBERPUNK ACTIF]';
                                    counterBadge.classList.add('visible');
                                }
                            }, 3500);
                        }
                    } else {
                        // In Aurora Mode: 10 clicks to activate Cyberpunk theme
                        SoundEngine.playBlip(avatarClicks);

                        if (counterBadge) {
                            counterBadge.textContent = `[CYBERPUNK: ${avatarClicks}/10]`;
                            counterBadge.classList.add('visible');
                            counterBadge.classList.remove('bump');
                            void counterBadge.offsetWidth;
                            counterBadge.classList.add('bump');
                        }

                        if (avatarClicks >= 10) {
                            toggleTheme(true, true);
                            avatarClicks = 0;
                        } else {
                            clickTimer = setTimeout(() => {
                                avatarClicks = 0;
                                if (counterBadge && !isHacked) {
                                    counterBadge.classList.remove('visible', 'bump');
                                    counterBadge.textContent = '';
                                }
                            }, 3500);
                        }
                    }
                };

                avatarFrame.addEventListener('click', handleAvatarClick);
                avatarFrame.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleAvatarClick();
                    }
                });
            }

            // Check saved preference in localStorage
            try {
                if (localStorage.getItem('portfolio_theme') === 'cyberpunk') {
                    // Activate without playing alarm sound on reload
                    toggleTheme(true, false);
                }
            } catch (e) {}
        };

        return {
            init: init,
            toggleTheme: toggleTheme
        };
    })();

    // ==========================================================================
    // 12. CONTACT FORM HANDLER (Command Pattern)
    // ==========================================================================
    const ContactForm = (() => {
        const init = () => {
            const form = document.querySelector('.contact-form');
            if (!form) return;

            form.addEventListener('submit', () => {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = '[ TRANSMITTING... ]';
                }
            });
        };

        return { init: init };
    })();

    // ==========================================================================
    // 13. APPLICATION FACADE (Master Orchestrator)
    // ==========================================================================
    const init = () => {
        const modules = [
            { name: 'NeonCanvas', fn: NeonCanvas.init },
            { name: 'ScrollSpy', fn: ScrollSpy.init },
            { name: 'Navigation', fn: Navigation.init },
            { name: 'ModalManager', fn: ModalManager.init },
            { name: 'Lightbox', fn: Lightbox.init },
            { name: 'ProjectFilter', fn: ProjectFilter.init },
            { name: 'GitHubService', fn: GitHubService.init },
            { name: 'ThemeManager', fn: ThemeManager.init },
            { name: 'ContactForm', fn: ContactForm.init }
        ];

        modules.forEach(mod => {
            try {
                mod.fn();
            } catch (err) {
                console.error(`[PortfolioApp] Erreur lors de l'initialisation du module ${mod.name}:`, err);
            }
        });
    };

    return {
        init: init,
        NeonCanvas: NeonCanvas,
        ModalManager: ModalManager,
        Lightbox: Lightbox,
        ThemeManager: ThemeManager
    };
})();

// Boot application upon DOM ready
document.addEventListener('DOMContentLoaded', PortfolioApp.init);
