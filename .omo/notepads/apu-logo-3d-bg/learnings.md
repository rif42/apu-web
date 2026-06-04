# Learnings: apu-logo-3d-bg

## Hero Parallax Pattern (for reference)
File: src/sections/HeroSectionAPU.astro:356-375
`js
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
});

function animateParallax() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    bgImg.style.transform = 	ranslate(px, px) scale(1.05);
    requestAnimationFrame(animateParallax);
}
animateParallax();
`

## Section Container
- File: src/sections/about/AboutVisionMission.astro
- Section already has: relative overflow-hidden bg-brand-surface-alt
- Content is inside content-max div
- Glass cards use apu-glass-card (semi-transparent)

## Logo Asset
- Path: /images/apu-logo.png
- Located at: public/images/apu-logo.png
