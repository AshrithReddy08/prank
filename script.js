/* ============================================================
   ROMANTIC PRANK WEBSITE – script.js
   ============================================================ */

/* ──────────────────────────────────────────
   1. FLOATING HEARTS (Page 1 background) — subtle
   ────────────────────────────────────────── */
const heartEmojis = ['💗','💕','💖','💝','💞','💓','❤️','🩷','💘'];

function createHeart(containerId) {
  const el = document.createElement('span');
  el.classList.add('heart-float');
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  el.style.left              = Math.random() * 100 + 'vw';
  el.style.fontSize          = (0.7 + Math.random() * 1.0) + 'rem';
  el.style.animationDuration = (9 + Math.random() * 12) + 's';
  el.style.animationDelay    = (Math.random() * 5) + 's';
  el.style.opacity = 0;
  document.getElementById(containerId || 'heartsBg').appendChild(el);
  setTimeout(() => el.remove(), 25000);
}
setInterval(() => createHeart('heartsBg'), 500);
for (let i = 0; i < 12; i++) setTimeout(() => createHeart('heartsBg'), i * 120);


/* ──────────────────────────────────────────
   2. SPARKLES (Page 1)
   ────────────────────────────────────────── */
function createSparkle(containerId) {
  const el = document.createElement('div');
  el.classList.add('sparkle');
  const size = 2 + Math.random() * 5;
  el.style.width  = size + 'px';
  el.style.height = size + 'px';
  el.style.left   = Math.random() * 100 + 'vw';
  el.style.top    = Math.random() * 100 + 'vh';
  el.style.animationDuration = (2 + Math.random() * 4) + 's';
  el.style.animationDelay   = (Math.random() * 4) + 's';
  document.getElementById(containerId || 'sparkles').appendChild(el);
  setTimeout(() => el.remove(), 10000);
}
setInterval(() => createSparkle('sparkles'), 350);
for (let i = 0; i < 25; i++) setTimeout(() => createSparkle('sparkles'), i * 80);


/* ──────────────────────────────────────────
   3. ROSE PETALS (Page 1) — very faint
   ────────────────────────────────────────── */
const petalEmojis = ['🌸','🌺','🌹'];

function createPetal() {
  const el = document.createElement('span');
  el.classList.add('petal');
  el.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  el.style.left              = Math.random() * 100 + 'vw';
  el.style.fontSize          = (0.6 + Math.random() * 0.8) + 'rem';
  el.style.animationDuration = (12 + Math.random() * 14) + 's';
  el.style.animationDelay    = (Math.random() * 8) + 's';
  document.getElementById('petalsLayer').appendChild(el);
  setTimeout(() => el.remove(), 30000);
}
setInterval(createPetal, 1200);
for (let i = 0; i < 8; i++) setTimeout(createPetal, i * 400);


/* ──────────────────────────────────────────
   4. "NO" BUTTON — starts inline, dodges on hover
   ────────────────────────────────────────── */
const btnNo  = document.getElementById('btnNo');
const btnYes = document.getElementById('btnYes');
let noDodging = false;

function activateDodge() {
  if (noDodging) return;
  noDodging = true;
  // Capture inline position before switching to fixed
  const rect = btnNo.getBoundingClientRect();
  btnNo.classList.add('dodging');
  btnNo.style.left   = rect.left   + 'px';
  btnNo.style.top    = rect.top    + 'px';
  btnNo.style.width  = rect.width  + 'px';
  btnNo.style.height = rect.height + 'px';
  setTimeout(() => dodgeAway(), 10);
}

function dodgeAway() {
  const margin  = 20;
  const bw      = btnNo.offsetWidth;
  const bh      = btnNo.offsetHeight;
  const maxX    = window.innerWidth  - bw - margin;
  const maxY    = window.innerHeight - bh - margin;
  const yesRect = btnYes.getBoundingClientRect();

  let x, y, tries = 0;
  do {
    x = margin + Math.random() * (maxX - margin);
    y = margin + Math.random() * (maxY - margin);
    tries++;
    const tooClose = x < yesRect.right + 60 && x + bw > yesRect.left - 60
                  && y < yesRect.bottom + 40 && y + bh > yesRect.top - 40;
    if (!tooClose) break;
  } while (tries < 30);

  btnNo.style.left = Math.max(margin, Math.min(maxX, x)) + 'px';
  btnNo.style.top  = Math.max(margin, Math.min(maxY, y)) + 'px';

  btnNo.animate([
    { transform: 'rotate(-8deg) scale(0.92)' },
    { transform: 'rotate(8deg)  scale(1.04)' },
    { transform: 'rotate(0deg)  scale(1)'    }
  ], { duration: 280, easing: 'ease-out' });
}

btnNo.addEventListener('mouseenter', () => {
  if (!noDodging) activateDodge(); else dodgeAway();
});
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (!noDodging) activateDodge(); else dodgeAway();
}, { passive: false });
btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  if (!noDodging) activateDodge(); else dodgeAway();
});


/* ──────────────────────────────────────────
   5. YES BUTTON
   ────────────────────────────────────────── */
function handleYes() {
  for (let i = 0; i < 18; i++) setTimeout(() => createHeart('heartsBg'), i * 40);
  setTimeout(() => {
    document.getElementById('page-proposal').classList.remove('active');
    document.getElementById('page-yes').classList.add('active');
    startYesPage();
  }, 350);
}


/* ──────────────────────────────────────────
   6. YES PAGE — ambient orbs + sparkles
   ────────────────────────────────────────── */
function startYesPage() {
  startAmbientOrbs();
  startYesSparkles();
  launchConfetti();
}

const orbColors = [
  'rgba(255,45,107,0.22)',
  'rgba(247,200,115,0.16)',
  'rgba(255,107,157,0.18)',
  'rgba(192,0,90,0.16)',
  'rgba(255,220,235,0.13)',
];

function startAmbientOrbs() {
  const layer = document.getElementById('orbsLayer');

  function spawnOrb() {
    const el = document.createElement('div');
    el.classList.add('orb');
    const size = 180 + Math.random() * 280;
    el.style.width  = size + 'px';
    el.style.height = size + 'px';
    el.style.left   = (Math.random() * 110 - 10) + 'vw';
    el.style.top    = (Math.random() * 110 - 10) + 'vh';
    el.style.background = orbColors[Math.floor(Math.random() * orbColors.length)];
    el.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    el.style.setProperty('--dy', (Math.random() * 120 - 60) + 'px');
    el.style.animationDuration = (8 + Math.random() * 14) + 's';
    el.style.animationDelay   = (Math.random() * 4) + 's';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 25000);
  }

  for (let i = 0; i < 8; i++) spawnOrb();
  setInterval(spawnOrb, 3000);
}

function startYesSparkles() {
  const layer = document.getElementById('yesSparkles');

  function spawnSparkle() {
    const el = document.createElement('div');
    el.classList.add('sparkle');
    const size = 3 + Math.random() * 7;
    el.style.width      = size + 'px';
    el.style.height     = size + 'px';
    el.style.background = `radial-gradient(circle, ${Math.random() > 0.5 ? '#ffe8a1' : '#ff9bc4'}, transparent)`;
    el.style.left       = Math.random() * 100 + 'vw';
    el.style.top        = Math.random() * 100 + 'vh';
    el.style.animationDuration = (1.5 + Math.random() * 3) + 's';
    el.style.animationDelay   = (Math.random() * 2) + 's';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 7000);
  }

  for (let i = 0; i < 40; i++) setTimeout(spawnSparkle, i * 60);
  setInterval(spawnSparkle, 200);
}

function launchConfetti() {
  const colors = ['#ff2d6b','#f7c873','#ff9bc4','#c0005a','#fff','#ffd6e8','#ffe066'];
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.classList.add('confetti-particle');
      el.style.left             = Math.random() * 100 + 'vw';
      el.style.top              = '-12px';
      el.style.background       = colors[Math.floor(Math.random() * colors.length)];
      el.style.width            = (6 + Math.random() * 8) + 'px';
      el.style.height           = (6 + Math.random() * 8) + 'px';
      el.style.borderRadius     = Math.random() > 0.5 ? '50%' : '2px';
      el.style.animationDuration = (2 + Math.random() * 3) + 's';
      el.style.animationDelay   = (Math.random() * 1.5) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }, i * 28);
  }
}


/* ──────────────────────────────────────────
   7. GIFT BOX OPEN
   ────────────────────────────────────────── */
let giftOpened = false;

function openGift() {
  if (giftOpened) return;
  giftOpened = true;

  document.getElementById('giftLid').classList.add('open');
  document.querySelector('.gift-hint').style.opacity = '0';

  const giftRect = document.getElementById('giftBox').getBoundingClientRect();
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const h = document.createElement('span');
      h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      h.style.cssText = `
        position: fixed;
        left: ${giftRect.left + giftRect.width / 2}px;
        top: ${giftRect.top}px;
        font-size: ${1 + Math.random() * 1.5}rem;
        pointer-events: none;
        z-index: 9999;
        animation: floatUp 2s ease-out forwards;
      `;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 2500);
    }, i * 60);
  }

  setTimeout(() => {
    document.getElementById('giftWrapper').style.display = 'none';
    const fm = document.getElementById('finalMsg');
    fm.classList.add('visible');
    launchConfetti();
  }, 700);
}
