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

        // Fonction de spectre dynamique STRICTEMENT bornée au thème Néon Rose / Bleu / Violet (180° à 335°)
        const getCyberHue = (offset = 0, speed = 0.004) => {
            const t = time * speed + offset;
            const norm = (Math.sin(t) + 1) * 0.5; // Oscille en continu entre 0.0 et 1.0
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

        // 2. Ondes abstraites oscillant dans la trilogie Rose / Bleu / Violet
        const waves = [
            { yRatio: 0.28, offset: 0, speed: 0.006, freq: 0.0028, amp: 40 },
            { yRatio: 0.55, offset: Math.PI * 0.65, speed: 0.005, freq: 0.0022, amp: 48 },
            { yRatio: 0.82, offset: Math.PI * 1.35, speed: 0.007, freq: 0.0032, amp: 38 }
        ];

        // 3. Halos de couleur ambiants (Exclusivité Rose / Bleu / Violet)
        const haloColors = [
            '255, 42, 133',  // Rose néon
            '0, 240, 255',   // Cyan néon
            '168, 85, 247',  // Violet électrique
            '59, 130, 246',  // Bleu cobalt
            '217, 70, 239',  // Fuchsia néon
            '99, 102, 241'   // Indigo néon
        ];

        const ambientHalos = [];
        const maxHalos = 6;

        const spawnHalo = () => {
            const colorRgb = haloColors[Math.floor(Math.random() * haloColors.length)];
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
});
