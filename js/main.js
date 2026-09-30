// Portfolio - JavaScript interactif, ScrollSpy One-Page, Modales & Fond Animé
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. FOND ANIMÉ DE LIGNES ABSTRAITES NÉON INTERACTIVES
    // ==========================================================================
    const initAbstractNeonLinesBackground = () => {
        let canvas = document.getElementById('bg-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'bg-canvas';
            document.body.prepend(canvas);
        }

        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const mouse = {
            x: width / 2,
            y: height / 2,
            targetX: width / 2,
            targetY: height / 2,
            active: false,
            radius: 200
        };

        const ripples = [];

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        });

        window.addEventListener('mousemove', (e) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
            mouse.active = true;
        });

        window.addEventListener('mouseleave', () => {
            mouse.active = false;
        });

        const createRipple = (x, y) => {
            ripples.push({
                x: x,
                y: y,
                radius: 5,
                maxRadius: Math.max(width, height) * 1.5,
                speed: 18,
                strength: 110,
                alpha: 1.0,
                color: Math.random() > 0.5 ? '#ff2a85' : '#00f0ff'
            });
        };

        // Déclenchement d'une onde néon au premier survol (hover) de chaque carte
        const interactiveCards = document.querySelectorAll('.project-card, .skill-card, .github-card, .hobby-card, .contact-card-box, .hero-avatar-frame');
        interactiveCards.forEach(card => {
            let waveCooldown = false;
            card.addEventListener('mouseenter', (e) => {
                if (!waveCooldown) {
                    waveCooldown = true;
                    const rect = card.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    createRipple(centerX, centerY);
                    setTimeout(() => {
                        waveCooldown = false;
                    }, 3500); // Prêt pour une nouvelle onde après cooldown
                }
            });
        });

        // Déclenchement au clic sur le fond
        window.addEventListener('click', (e) => {
            if (e.target.closest('a, button, input, textarea, .clickable-image')) return;
            createRipple(e.clientX, e.clientY);
        });

        // Déclenchement au toucher tactile sur mobile
        window.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches[0]) {
                const touch = e.touches[0];
                if (e.target.closest('a, button, input, textarea, .clickable-image')) return;
                createRipple(touch.clientX, touch.clientY);
            }
        }, { passive: true });

        // État du mode piraté rouge (Easter egg)
        let isHacked = false;

        // Fonction de spectre dynamique (Cyberpunk Rose/Bleu/Violet ou Rouge Sang si piraté)
        const getCyberHue = (offset = 0, speed = 0.004) => {
            const t = time * speed + offset;
            const norm = (Math.sin(t) + 1) * 0.5;
            if (isHacked) {
                return (norm * 22 + 348) % 360; // Spectre Rouge Sang / Crimson Alerte
            }
            return 180 + norm * 155; // 180° (Cyan/Bleu) -> 265° (Violet) -> 335° (Rose néon)
        };

        // 1. Initialisation des orbes avec durée de vie (Lifespan) et régénération dynamique
        const nodes = [];
        const createNode = (staggered = false) => {
            const maxLife = 260 + Math.random() * 260; // 4.5 à 9 secondes
            const life = staggered ? Math.random() * maxLife * 0.8 : 0;
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.85,
                vy: (Math.random() - 0.5) * 0.85,
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
            const nodeCount = Math.min(26, Math.max(16, Math.floor(width / 70)));
            for (let i = 0; i < nodeCount; i++) {
                nodes.push(createNode(true));
            }
        };

        initNodes();

        // 2. Ondes abstraites oscillant dans la trilogie Rose / Bleu / Violet (ou Rouge si piraté)
        const waves = [
            { yRatio: 0.28, offset: 0, speed: 0.006, freq: 0.0028, amp: 40 },
            { yRatio: 0.55, offset: Math.PI * 0.65, speed: 0.005, freq: 0.0022, amp: 48 },
            { yRatio: 0.82, offset: Math.PI * 1.35, speed: 0.007, freq: 0.0032, amp: 38 }
        ];

        // 3. Halos de couleur ambiants
        const getHaloColors = () => {
            if (isHacked) {
                return [
                    '255, 0, 60',   // Rouge néon vif
                    '220, 38, 38',  // Crimson d'alerte
                    '185, 28, 28',  // Rouge profond
                    '255, 20, 20',  // Rouge électrique
                    '153, 27, 27'   // Rouge foncé
                ];
            }
            return [
                '255, 42, 133',  // Rose néon
                '0, 240, 255',   // Cyan néon
                '168, 85, 247',  // Violet électrique
                '59, 130, 246',  // Bleu cobalt
                '217, 70, 239',  // Fuchsia néon
                '99, 102, 241'   // Indigo néon
            ];
        };

        const ambientHalos = [];
        const maxHalos = 6;

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

        // Initialiser 4 halos équilibrés
        for (let i = 0; i < 4; i++) {
            spawnHalo();
            if (ambientHalos[i]) {
                ambientHalos[i].life = Math.random() * ambientHalos[i].maxLife * 0.6;
                ambientHalos[i].alpha = Math.random() * ambientHalos[i].maxAlpha;
            }
        }

        let time = 0;
        let isTabVisible = true;
        document.addEventListener('visibilitychange', () => {
            isTabVisible = !document.hidden;
        });

        const animate = () => {
            if (!isTabVisible) {
                requestAnimationFrame(animate);
                return;
            }

            time += 1;

            // Smooth mouse easing
            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;

            ctx.clearRect(0, 0, width, height);

            // Deep Obsidian Background
            ctx.fillStyle = '#05060b';
            ctx.fillRect(0, 0, width, height);

            // Rendu des Halos Ambiants Aléatoires en Fondu Transparent (Derrière les lignes)
            ctx.globalCompositeOperation = 'screen';

            if (ambientHalos.length < maxHalos && Math.random() < 0.05) {
                spawnHalo();
            }

            for (let i = ambientHalos.length - 1; i >= 0; i--) {
                const h = ambientHalos[i];
                h.life++;
                h.x += h.vx;
                h.y += h.vy;

                // Fondu doux d'apparition et de disparition
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

            // Halo dynamique au niveau de la souris
            if (mouse.active) {
                const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 350);
                mouseGrad.addColorStop(0, 'rgba(255, 42, 133, 0.08)');
                mouseGrad.addColorStop(0.6, 'rgba(0, 240, 255, 0.03)');
                mouseGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = mouseGrad;
                ctx.fillRect(0, 0, width, height);
            }

            // Rendu des ondes néon (Spectre exclusif Rose / Bleu / Violet)
            ctx.globalCompositeOperation = 'lighter';
            const step = 28;

            for (let w of waves) {
                const baseY = height * w.yRatio;
                const waveHue1 = getCyberHue(w.offset, 0.0035);
                const waveHue2 = getCyberHue(w.offset + 1.2, 0.0035);

                const waveGrad = ctx.createLinearGradient(0, baseY, width, baseY);
                waveGrad.addColorStop(0, `hsla(${waveHue1}, 100%, 65%, 0.8)`);
                waveGrad.addColorStop(0.5, `hsla(${waveHue2}, 100%, 60%, 0.85)`);
                waveGrad.addColorStop(1, `hsla(${waveHue1}, 100%, 65%, 0.8)`);

                const points = [];

                for (let x = 0; x <= width + step; x += step) {
                    let y = baseY + Math.sin(x * w.freq + time * w.speed) * w.amp;
                    let force = 0;

                    // Déformation et incandescence sous les ondes de choc dynamiques (sans force constante de la souris)
                    for (let r of ripples) {
                        const rdx = x - r.x;
                        const rdy = y - r.y;
                        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
                        const distFromRing = Math.abs(rdist - r.radius);
                        const ringWidth = 140;
                        if (distFromRing < ringWidth) {
                            const waveProfile = Math.sin((1 - distFromRing / ringWidth) * Math.PI);
                            const rippleForce = waveProfile * r.alpha * 2.4;
                            force += rippleForce;
                            y += (rdy / (rdist || 1)) * waveProfile * r.strength * r.alpha;
                        }
                    }

                    points.push({ x, y, force });
                }

                // 1. Passe de base de l'onde néon
                ctx.save();
                ctx.strokeStyle = waveGrad;
                ctx.shadowColor = `hsl(${waveHue1}, 100%, 60%)`;
                ctx.shadowBlur = 10;
                ctx.lineWidth = 2.0;

                ctx.beginPath();
                for (let i = 0; i < points.length; i++) {
                    if (i === 0) ctx.moveTo(points[i].x, points[i].y);
                    else ctx.lineTo(points[i].x, points[i].y);
                }
                ctx.stroke();
                ctx.restore();

                // 2. Passe de Surpuissance & Incandescence Blanche sous la Force (Overdrive)
                for (let i = 0; i < points.length - 1; i++) {
                    const p1 = points[i];
                    const p2 = points[i + 1];
                    const avgForce = (p1.force + p2.force) * 0.5;

                    if (avgForce > 0.06) {
                        const cappedForce = Math.min(2.5, avgForce);

                        // Épaississement et lueur néon intense sous la force
                        ctx.save();
                        ctx.strokeStyle = `hsla(${waveHue1}, 100%, ${65 + cappedForce * 12}%, ${Math.min(1.0, 0.45 + cappedForce * 0.35)})`;
                        ctx.lineWidth = 2.0 + cappedForce * 3.5;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();

                        // Cœur blanc incandescent au point d'impact
                        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1.0, 0.5 + cappedForce * 0.45)})`;
                        ctx.lineWidth = 1.0 + cappedForce * 1.6;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }

            // Rendu du maillage géométrique avec spectre Rose / Bleu / Violet (Portée élargie)
            const maxDist = 210; // Portée étendue de liaison entre les boules
            const maxDistSq = maxDist * maxDist;
            const mouseRange = 270; // Portée étendue d'attraction et de liaison à la souris
            const mouseRangeSq = mouseRange * mouseRange;

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                // Vérification de la connexion interactive avec la souris (Portée étendue)
                let isConnectedToMouse = false;
                let mouseDist = 9999;
                if (mouse.active) {
                    const dx = mouse.x - node.x;
                    const dy = mouse.y - node.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < mouseRangeSq) { // Rayon étendu à 270px
                        isConnectedToMouse = true;
                        mouseDist = Math.sqrt(distSq);
                    }
                }

                // Gestion de la durée de vie (ILLIMITÉE si connectée à la souris)
                if (isConnectedToMouse) {
                    // Maintien actif et recharge de l'énergie au maximum
                    node.life = Math.min(node.life, node.maxLife * 0.45);
                    node.fadeAlpha = Math.min(1.0, node.fadeAlpha + 0.08);
                } else {
                    // Consommation de vie standard et proportionnelle à la vitesse
                    const currentSpeed = Math.hypot(node.vx, node.vy);
                    const speedBurnFactor = 1 + Math.max(0, (currentSpeed - 0.7) * 2.2);
                    node.life += speedBurnFactor;

                    // Calcul du cycle de vie et du fondu (Fade-in -> Pleine intensité -> Fade-out)
                    const fadeInFrames = node.maxLife * 0.18;
                    const fadeOutStart = node.maxLife * 0.78;

                    if (node.life < fadeInFrames) {
                        node.fadeAlpha = node.life / fadeInFrames;
                    } else if (node.life > fadeOutStart) {
                        node.fadeAlpha = Math.max(0, (node.maxLife - node.life) / (node.maxLife - fadeOutStart));
                    } else {
                        node.fadeAlpha = 1.0;
                    }

                    // Régénération dynamique de l'orbe à un nouvel emplacement dès expiration
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

                // Pulsation d'intensité lumineuse et calcul de teinte cyberpunk
                node.pulsePhase += node.pulseSpeed;
                node.hue = getCyberHue(node.baseOffset, 0.003);
                const intensity = 0.5 + Math.sin(node.pulsePhase) * 0.5;
                const currentRadius = node.baseSize * (0.8 + intensity * 0.55);

                // Enregistrement des positions pour le tracé néon
                node.trail.unshift({ x: node.x, y: node.y });
                if (node.trail.length > 12) node.trail.pop();

                // Aimantation douce et naturelle vers la souris
                if (isConnectedToMouse && mouseDist > 25) {
                    const pull = (1 - mouseDist / mouseRange) * 0.28;
                    const dx = mouse.x - node.x;
                    const dy = mouse.y - node.y;
                    node.x += (dx / mouseDist) * pull;
                    node.y += (dy / mouseDist) * pull;
                }

                // Onde de choc puissante sur les nœuds
                for (let r of ripples) {
                    const rdx = node.x - r.x;
                    const rdy = node.y - r.y;
                    const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
                    const distFromRing = Math.abs(rdist - r.radius);
                    if (distFromRing < 95) {
                        const push = (1 - distFromRing / 95) * r.alpha * 6.5;
                        node.vx += (rdx / (rdist || 1)) * push;
                        node.vy += (rdy / (rdist || 1)) * push;
                    }
                }

                // 1. Rendu du Tracé Néon Lumineux (avec fondu de cycle de vie)
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

                // 2. Rendu de la Boule Néon (avec fondu de cycle de vie)
                const sphereAlpha = (0.65 + intensity * 0.35) * node.fadeAlpha;
                ctx.fillStyle = `hsla(${node.hue}, 100%, 65%, ${sphereAlpha})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
                ctx.fill();

                // Cœur blanc incandescent (avec fondu)
                const coreAlpha = (0.75 + intensity * 0.25) * node.fadeAlpha;
                ctx.fillStyle = `rgba(255, 255, 255, ${coreAlpha})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentRadius * 0.45, 0, Math.PI * 2);
                ctx.fill();

                // Lignes de connexion avec portée étendue à 210px
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

                // Faisceau laser reliant la souris (Portée étendue à 270px)
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

            // Rendu des ondes de choc se propageant sur l'ensemble de l'écran
            for (let k = ripples.length - 1; k >= 0; k--) {
                const r = ripples[k];
                r.radius += r.speed;
                r.alpha -= 0.009;

                if (r.alpha <= 0 || r.radius >= r.maxRadius) {
                    ripples.splice(k, 1);
                    continue;
                }

                ctx.save();
                ctx.strokeStyle = r.color;
                ctx.shadowColor = r.color;
                ctx.shadowBlur = 12;
                ctx.lineWidth = 3.0 * r.alpha;
                ctx.globalAlpha = r.alpha;
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            requestAnimationFrame(animate);
        };

        // ======================================================================
        // EASTER EGG : 10 Clics sur l'avatar de profil -> HACK ROUGE CYBERPUNK
        // ======================================================================
        const avatarFrame = document.querySelector('.hero-avatar-frame');
        const rebootBtn = document.getElementById('hack-reboot-btn');
        let avatarClicks = 0;
        let clickTimer = null;

        const toggleHackMode = (enable) => {
            isHacked = enable;
            if (isHacked) {
                document.body.classList.add('system-hacked');
                // Salve d'ondes de choc rouges explosives
                const centerX = width / 2;
                const centerY = height / 2;
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        ripples.push({
                            x: centerX + (Math.random() - 0.5) * 260,
                            y: centerY + (Math.random() - 0.5) * 260,
                            radius: 5,
                            maxRadius: Math.max(width, height) * 1.6,
                            speed: 22,
                            strength: 140,
                            alpha: 1.0,
                            color: '#ff003c'
                        });
                    }, i * 140);
                }
            } else {
                document.body.classList.remove('system-hacked');
                avatarClicks = 0;
                createRipple(width / 2, height / 2);
            }
        };

        if (avatarFrame) {
            avatarFrame.style.cursor = 'pointer';
            avatarFrame.setAttribute('title', 'Bernard Sourichanh [Click me]');
            avatarFrame.addEventListener('click', () => {
                avatarClicks++;
                clearTimeout(clickTimer);

                const rect = avatarFrame.getBoundingClientRect();
                const ax = rect.left + rect.width / 2;
                const ay = rect.top + rect.height / 2;

                // Ondulation dynamique à chaque clic
                ripples.push({
                    x: ax,
                    y: ay,
                    radius: 5,
                    maxRadius: 160 + avatarClicks * 18,
                    speed: 14,
                    strength: 45 + avatarClicks * 8,
                    alpha: 0.9,
                    color: avatarClicks >= 7 ? '#ff003c' : (isHacked ? '#ff003c' : '#00f0ff')
                });

                if (avatarClicks >= 10) {
                    toggleHackMode(!isHacked);
                    avatarClicks = 0;
                } else {
                    clickTimer = setTimeout(() => {
                        avatarClicks = 0;
                    }, 4000);
                }
            });
        }

        if (rebootBtn) {
            rebootBtn.addEventListener('click', () => {
                toggleHackMode(false);
            });
        }

        requestAnimationFrame(animate);
    };

    initAbstractNeonLinesBackground();

    // ==========================================================================
    // 2. SCROLLSPY & NAVIGATION ONE-PAGE
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateScrollSpy = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateScrollSpy);
    updateScrollSpy();

    // ==========================================================================
    // 3. NAVIGATION MOBILE BURGER
    // ==========================================================================
    const burgerBtn = document.querySelector('.burger-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // ==========================================================================
    // 4. MODALES DE PROJETS INTERACTIVES (ONE-PAGE DETAILS)
    // ==========================================================================
    const modalButtons = document.querySelectorAll('.open-modal-btn');
    const modals = document.querySelectorAll('.project-modal');

    modalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.project-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ==========================================================================
    // 5. IMAGE LIGHTBOX MODAL (ZOOM SCREENSHOTS)
    // ==========================================================================
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Fermer la vue agrandie">&times;</button>
        <img class="lightbox-content" src="" alt="Agrandissement capture d'écran">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    const openLightbox = (src, alt) => {
        lightboxImg.src = src;
        lightboxImg.alt = alt || "Capture d'écran du projet";
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        // Si aucune modale de projet n'est active, on réactive le scroll
        const isProjectModalOpen = document.querySelector('.project-modal.active');
        if (!isProjectModalOpen) {
            document.body.style.overflow = '';
        }
    };

    document.querySelectorAll('.clickable-image').forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox.classList.contains('active')) {
                closeLightbox();
            } else {
                modals.forEach(m => m.classList.remove('active'));
                document.body.style.overflow = '';
            }
        }
    });

    // ==========================================================================
    // 6. FILTRES INTERACTIFS DE PROJETS
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================================================
    // 7. FORMULAIRE DE CONTACT
    // ==========================================================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '[ TRANSMITTING... ]';
            }
        });
    }

    // ==========================================================================
    // 8. SYNCHRONISATION & AUTOMATISATION DES DÉPÔTS GITHUB (API + CACHE)
    // ==========================================================================
    const initGitHubReposAutomation = () => {
        const grid = document.getElementById('github-repos-grid');
        const syncText = document.getElementById('github-sync-text');
        if (!grid) return;

        const GITHUB_USERNAME = 'BSourichanh';
        const GITHUB_CACHE_KEY = 'bs_github_repos_v2';
        const GITHUB_CACHE_TIME_KEY = 'bs_github_repos_time_v2';
        const GITHUB_CACHE_TTL = 1000 * 60 * 60; // 1 heure de cache

        // Couleurs des langages et badges
        const LANGUAGE_CONFIG = {
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
        };

        // Métadonnées enrichies par défaut pour les projets majeurs
        const REPO_ENRICHMENTS = {
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
        };

        const renderRepos = (reposList) => {
            if (!reposList || !reposList.length) return;

            // Filtrer les dépôts (ignorer les forks vides ou dépôts spéciaux de profil readme)
            const filtered = reposList.filter(repo => {
                if (repo.fork) return false;
                if (repo.name === GITHUB_USERNAME) return false;
                return true;
            });

            // Trier par priorité définie, puis par date de mise à jour récente
            filtered.sort((a, b) => {
                const pA = REPO_ENRICHMENTS[a.name]?.priority || 99;
                const pB = REPO_ENRICHMENTS[b.name]?.priority || 99;
                if (pA !== pB) return pA - pB;
                return new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at);
            });

            const displayRepos = filtered.slice(0, 8);

            const githubSvg = `<svg class="github-icon-svg" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;
            const starSvg = `<svg viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>`;
            const forkSvg = `<svg viewBox="0 0 16 16"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h4.5A2.25 2.25 0 0 0 12.5 6.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878ZM11 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM5.75 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.25.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z"/></svg>`;

            grid.innerHTML = displayRepos.map(repo => {
                const enrich = REPO_ENRICHMENTS[repo.name] || {};
                const langConf = LANGUAGE_CONFIG[repo.language] || {
                    badge: 'badge-cyan',
                    dot: 'var(--neon-cyan)',
                    name: repo.language || 'Projet'
                };

                const desc = enrich.desc || repo.description || 'Projet et code source public sur GitHub.';
                const badgeText = enrich.badgeText || langConf.name;
                const badgeClass = enrich.badgeClass || langConf.badge;
                const dotColor = enrich.dotColor || langConf.dot;
                const techText = enrich.tags || `${repo.language || 'Code'} / Git`;

                const stars = repo.stargazers_count ? `<span class="github-stat-item">${starSvg} ${repo.stargazers_count}</span>` : '';
                const forks = repo.forks_count ? `<span class="github-stat-item">${forkSvg} ${repo.forks_count}</span>` : '';
                const statsHtml = (stars || forks) ? `<div class="github-stats">${stars}${forks}</div>` : '';

                return `
                    <article class="github-card">
                        <div>
                            <div class="github-card-header">
                                <h3 class="github-repo-title">
                                    ${githubSvg}
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

        // 1. Lecture du cache local si valide (chargement instantané 0ms)
        const cachedData = localStorage.getItem(GITHUB_CACHE_KEY);
        const cachedTime = localStorage.getItem(GITHUB_CACHE_TIME_KEY);
        const isCacheValid = cachedData && cachedTime && (Date.now() - parseInt(cachedTime, 10) < GITHUB_CACHE_TTL);

        if (isCacheValid) {
            try {
                const repos = JSON.parse(cachedData);
                renderRepos(repos);
            } catch (e) {
                console.warn('Erreur lecture cache GitHub:', e);
            }
        }

        // 2. Requête API GitHub en tâche de fond pour mettre à jour les données
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(repos => {
            if (Array.isArray(repos) && repos.length > 0) {
                localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify(repos));
                localStorage.setItem(GITHUB_CACHE_TIME_KEY, Date.now().toString());
                renderRepos(repos);
            }
        })
        .catch(err => {
            console.info('Utilisation du cache ou rendu HTML par défaut.');
        });
    };

    initGitHubReposAutomation();
});
