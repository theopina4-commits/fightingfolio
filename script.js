// ========================================
// NAVIGATION MENU MOBILE (amélioré)
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function setMenuState(isOpen){
  navMenu.classList.toggle('active', isOpen);
  if(hamburger){
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }
}

hamburger?.addEventListener('click', () => {
  const isOpen = navMenu.classList.contains('active');
  setMenuState(!isOpen);
});

navLinks.forEach(link => {
  link.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenuState(false);
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    }

    lastScroll = currentScroll;
});

// ========================================
// PARTICLE CANVAS ANIMATION
// ========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas?.getContext('2d');

if (canvas && ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(204, 0, 0, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Connecter les particules proches
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(204, 0, 0, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Redimensionnement du canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========================================
// INTERSECTION OBSERVER - ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Animation spéciale pour les skill bars
            if (entry.target.classList.contains('skill-card')) {
                const progress = entry.target.querySelector('.skill-progress');
                const progressValue = progress?.getAttribute('data-progress');
                if (progress && progressValue) {
                    progress.style.setProperty('--progress-width', progressValue + '%');
                    setTimeout(() => {
                        progress.style.width = progressValue + '%';
                    }, 200);
                }
            }
        }
    });
}, observerOptions);

// Observer tous les éléments animés
const animatedElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// FORMULAIRE DE CONTACT
// ========================================
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simulation d'envoi (à remplacer par vraie requête)
    console.log('Formulaire soumis:', data);

    // Animation de succès
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = '<span>MESSAGE ENVOYÉ ! ✓</span>';
    submitButton.style.background = '#00cc00';

    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.style.background = '';
        contactForm.reset();
    }, 3000);

    // Alerte de succès
    alert('Message envoyé avec succès ! Je vous répondrai rapidement. 🥊');
});

// ========================================
// CURSEUR PERSONNALISÉ (optionnel)
// ========================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

// Styles pour le curseur (ajoutés dynamiquement)
const cursorStyle = document.createElement('style');
cursorStyle.innerHTML = `
    .custom-cursor {
        width: 10px;
        height: 10px;
        background: var(--primary-red);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    }

    .cursor-follower {
        width: 30px;
        height: 30px;
        border: 2px solid var(--primary-red);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
    }

    @media (max-width: 768px) {
        .custom-cursor,
        .cursor-follower {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;

    followerX += distX * 0.1;
    followerY += distY * 0.1;

    cursorFollower.style.left = (followerX - 15) + 'px';
    cursorFollower.style.top = (followerY - 15) + 'px';

    requestAnimationFrame(animateFollower);
}

animateFollower();

// Effet sur les liens et boutons
const interactiveElements = document.querySelectorAll('a, button, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// ========================================
// COUNTER ANIMATION POUR LES STATS
// ========================================
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const targetText = statNumber.textContent;
                const targetNumber = parseInt(targetText);

                if (!isNaN(targetNumber)) {
                    statNumber.classList.add('animated');
                    animateCounter(statNumber, targetNumber);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(box => {
    statsObserver.observe(box);
});

// ========================================
// TYPING EFFECT POUR LE HERO
// ========================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Démarrer après un court délai
    setTimeout(typeWriter, 500);
}

// ========================================
// PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.boxing-ring');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.05}deg)`;
    });
});

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c🥊 FIGHTFOLIO 🥊', 'color: #CC0000; font-size: 30px; font-weight: bold;');
console.log('%cPortfolio créé avec passion par un étudiant MMI', 'color: #b0b0b0; font-size: 14px;');
console.log('%cChaque ligne de code est un coup porté vers l'excellence !', 'color: #CC0000; font-size: 12px; font-style: italic;');

// ========================================
// PROTECTION CLIC DROIT (optionnel)
// ========================================
// Décommenter si vous voulez désactiver le clic droit
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('Clic droit désactivé sur ce portfolio 🥊');
});
*/

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Lazy loading des images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('✅ Portfolio chargé et prêt au combat !');