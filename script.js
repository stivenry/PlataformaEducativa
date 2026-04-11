// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// ========== PARTICLES BACKGROUND ==========
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.15 + 0.03;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76, 175, 80, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 60; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ========== CURSOR ==========
const cursor = document.querySelector('.cursor');
const dot = document.querySelector('.cursor-dot');
const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (!isMobile && cursor && dot) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 18,
            y: e.clientY - 18,
            duration: 0.5,
            ease: "power3.out"
        });
        gsap.to(dot, {
            x: e.clientX - 2.5,
            y: e.clientY - 2.5,
            duration: 0.12
        });
    });

    // Hover animations
    document.querySelectorAll('a, iframe, .window, .video-wrapper').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.8, borderColor: 'rgba(76, 175, 80, 0.5)', duration: 0.3 });
            gsap.to(dot, { scale: 2.5, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, borderColor: 'rgba(255,255,255,0.1)', duration: 0.3 });
            gsap.to(dot, { scale: 1, duration: 0.3 });
        });
    });
}

// ========== CONTINUOUS ANIMATIONS (Loop Forever) ==========

// Logo sutil floating
gsap.to('.logo', {
    y: -8,
    duration: 2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
});

// Hero tag pulse
gsap.to('.hero-tag', {
    scale: 1.03,
    duration: 2.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
});

// Dots in window bar pulse
gsap.to('.dots span', {
    opacity: 0.5,
    duration: 1.5,
    stagger: 0.2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
});

// ========== PAGE ENTRY ANIMATIONS ==========
window.addEventListener('load', () => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from('.header-row', {
        opacity: 0,
        y: -30,
        duration: 1
    })
        .from('.logo', {
            opacity: 0,
            scale: 0.7,
            rotation: -10,
            duration: 1
        }, "-=0.8")
        .from('.hero-tag', {
            opacity: 0,
            scale: 0.8,
            duration: 0.6
        }, "-=0.5")
        .from('.t-word', {
            y: 150,
            opacity: 0,
            stagger: 0.15,
            duration: 1.2
        }, "-=0.4")
        .from('.hero-desc', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, "-=0.5")
        .from('.scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 0.6
        }, "-=0.3");
});

// ========== SCROLL ANIMATIONS (REPEATABLE) ==========

// Tags - slide in every time they enter viewport
gsap.utils.toArray('.anim-tag').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'bottom 20%',
            toggleActions: "play reverse play reverse"
        },
        opacity: 0,
        x: -30,
        duration: 0.7,
        ease: "power3.out"
    });
});

// Headings - reveal up with replay
gsap.utils.toArray('.anim-heading').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'bottom 20%',
            toggleActions: "play reverse play reverse"
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out"
    });
});

// Text paragraphs - fade in with replay
gsap.utils.toArray('.anim-text').forEach((el, i) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'bottom 20%',
            toggleActions: "play reverse play reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Media blocks - scale in with replay
gsap.utils.toArray('.anim-media').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: "play reverse play reverse"
        },
        opacity: 0,
        scale: 0.92,
        y: 40,
        duration: 1.2,
        ease: "power2.out"
    });
});

// Divider lines - grow with replay
gsap.utils.toArray('.divider-line').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'bottom 20%',
            toggleActions: "play reverse play reverse"
        },
        width: 0,
        duration: 1,
        ease: "power2.inOut"
    });
});

// Footer names - stagger with replay
gsap.utils.toArray('.anim-name').forEach((el, i) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: '.footer-top',
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: "play reverse play reverse"
        },
        opacity: 0,
        x: -20,
        duration: 0.6,
        delay: i * 0.12,
        ease: "power3.out"
    });
});

// Teacher info animation
gsap.from('.teacher-info', {
    scrollTrigger: {
        trigger: '.footer-top',
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: "play reverse play reverse"
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.5,
    ease: "power3.out"
});

// Footer bottom - with replay
gsap.from('.footer-bottom', {
    scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 95%',
        end: 'bottom 20%',
        toggleActions: "play reverse play reverse"
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power3.out"
});

// Parallax on Hero (scrub is continuous)
gsap.to('.hero-title', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 80,
    opacity: 0.3
});

// Window hover interaction animations
document.querySelectorAll('.window, .video-wrapper').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(el, {
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    });
});
