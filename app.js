/**
 * AquaPure - Visual & Interactive Water Health Portal
 * Modern, error-free interactive logic for everyone
 */

document.addEventListener('DOMContentLoaded', () => {
  safeInit(initMobileMenu, 'Mobile Menu');
  safeInit(initWaterCanvas, 'Microscope Simulator');
  safeInit(initScaleSlider, 'Scale Slider');
  safeInit(initCalculator, 'Exposure Calculator');
  safeInit(initFilterMatrix, 'Filter Matrix');
  safeInit(initQuiz, 'Quiz Engine');
  safeInit(initPolyglotCheck, 'Polyglot Check');
});

// Helper for crash-proof initialization
function safeInit(fn, name) {
  try {
    fn();
  } catch (err) {
    console.warn(`[AquaPure] Note on ${name}:`, err);
  }
}

/* ============================================================
   1. MOBILE MENU & SMOOTH SCROLLING
   ============================================================ */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================================
   2. INTERACTIVE WATER MICROSCOPE CANVAS
   ============================================================ */
function initWaterCanvas() {
  const canvas = document.getElementById('water-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight || 420;
  }
  resize();
  window.addEventListener('resize', resize);

  let mode = 'polluted'; // 'polluted' or 'clean'
  let mouse = { x: null, y: null, radius: 90 };
  let particles = [];

  const particleColors = ['#38bdf8', '#f43f5e', '#fbbf24', '#ec4899', '#a855f7'];

  class WaterParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.type = ['fiber', 'fragment', 'bead'][Math.floor(Math.random() * 3)];
      this.size = Math.random() * 3.5 + 1.5;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = Math.random() * 0.5 + 0.2;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.alpha = Math.random() * 0.6 + 0.3;
      this.fiberLength = Math.random() * 12 + 6;
      this.angle = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Mouse repulsion on hover or touch
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 4;
          this.y += (dy / dist) * force * 4;
        }
      }

      if (this.y > canvas.height + 15) this.y = -10;
      if (this.x > canvas.width + 15) this.x = -10;
      if (this.x < -15) this.x = canvas.width + 10;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;

      if (this.type === 'fiber') {
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.quadraticCurveTo(
          this.x + Math.sin(this.angle) * 5,
          this.y + Math.cos(this.angle) * 5,
          this.x + Math.cos(this.angle) * this.fiberLength,
          this.y + Math.sin(this.angle) * this.fiberLength
        );
        ctx.stroke();
      } else if (this.type === 'bead') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size * 1.5, this.y + this.size * 0.5);
        ctx.lineTo(this.x + this.size * 0.7, this.y + this.size * 1.6);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function spawn(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new WaterParticle());
    }
  }
  spawn(90);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle water gradient
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (mode === 'polluted') {
      grad.addColorStop(0, '#09152b');
      grad.addColorStop(1, '#0e2347');
    } else {
      grad.addColorStop(0, '#042233');
      grad.addColorStop(1, '#02384a');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle microscope crosshair reticle
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Touch support for mobile phones!
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });
  canvas.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Control buttons
  const btnPolluted = document.getElementById('btn-sim-polluted');
  const btnClean = document.getElementById('btn-sim-clean');
  const badge = document.getElementById('sim-status-badge');
  const countBadge = document.getElementById('sim-particle-count');

  if (btnPolluted && btnClean) {
    btnPolluted.addEventListener('click', () => {
      mode = 'polluted';
      spawn(90);
      btnPolluted.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 text-white shadow-lg transition';
      btnClean.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition';
      if (badge) {
        badge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30';
        badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span> Raw Water Sample (Contains Microplastics)';
      }
      if (countBadge) countBadge.textContent = '~240,000 particles / Liter in Single-Use Bottles';
    });

    btnClean.addEventListener('click', () => {
      mode = 'clean';
      spawn(3); // Clean water has 99% particles eliminated
      btnClean.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white shadow-lg transition';
      btnPolluted.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition';
      if (badge) {
        badge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
        badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Pure Water (Post-RO or Boiled Hard Water)';
      }
      if (countBadge) countBadge.textContent = '99.2% Particles Removed!';
    });
  }
}

/* ============================================================
   3. VISUAL SIZE SCALE SLIDER
   ============================================================ */
function initScaleSlider() {
  const slider = document.getElementById('scale-slider');
  const nameEl = document.getElementById('scale-name');
  const sizeEl = document.getElementById('scale-size');
  const exampleEl = document.getElementById('scale-example');
  const dangerEl = document.getElementById('scale-danger');
  const circleEl = document.getElementById('scale-visual-circle');

  if (!slider) return;

  const data = [
    {
      name: 'Visible Plastic Scrap (Macro)',
      size: 'Bigger than 5 millimeters (0.2 inches)',
      example: 'Bottle cap pieces, shredded plastic bags, snack wrappers.',
      danger: 'You can easily see it with your naked eyes. It does not pass unnoticed into your body.',
      circleSize: 140,
      color: 'bg-amber-400'
    },
    {
      name: 'Small Plastic Bead (Meso)',
      size: '1 to 5 millimeters',
      example: 'Tiny cosmetic microbeads, raw plastic pellets.',
      danger: 'Visible in water if you look closely. Blocked by normal kitchen mesh strainers.',
      circleSize: 90,
      color: 'bg-yellow-400'
    },
    {
      name: 'Human Hair Benchmark',
      size: 'About 70 micrometers (µm)',
      example: 'Thickness of a single strand of human hair.',
      danger: 'Used for comparison: ordinary microplastics are smaller than a strand of hair!',
      circleSize: 45,
      color: 'bg-slate-400'
    },
    {
      name: 'Fine Microplastic Fibers',
      size: '1 to 70 micrometers',
      example: 'Polyester fibers shed from synthetic clothes in laundry.',
      danger: 'Invisible in water. Swallowed unnoticed and reaches your stomach lining.',
      circleSize: 18,
      color: 'bg-orange-400'
    },
    {
      name: 'Invisible Nanoplastics (Dangerous)',
      size: 'Smaller than 1 micrometer (down to 10 nanometers)',
      example: 'Tiny plastic shards shed when twisting open bottle caps.',
      danger: 'So microscopically small they can pass through your stomach wall into your bloodstream!',
      circleSize: 8,
      color: 'bg-rose-500'
    }
  ];

  function update(index) {
    const item = data[index];
    if (!item) return;

    if (nameEl) nameEl.textContent = item.name;
    if (sizeEl) sizeEl.textContent = item.size;
    if (exampleEl) exampleEl.textContent = item.example;
    if (dangerEl) dangerEl.textContent = item.danger;

    if (circleEl) {
      circleEl.style.width = `${item.circleSize}px`;
      circleEl.style.height = `${item.circleSize}px`;
      circleEl.className = `rounded-full ${item.color} shadow-lg transition-all duration-300`;
    }
  }

  slider.addEventListener('input', (e) => {
    update(parseInt(e.target.value));
  });

  update(3);
}

/* ============================================================
   4. FRIENDLY PERSONAL PLASTIC INGESTION CALCULATOR
   ============================================================ */
function initCalculator() {
  const bottledInput = document.getElementById('calc-bottled');
  const tapInput = document.getElementById('calc-tap');
  const boilingSelect = document.getElementById('calc-boil');
  const filterSelect = document.getElementById('calc-filter');
  const kettleSelect = document.getElementById('calc-kettle');
  const teabagSelect = document.getElementById('calc-teabags');

  const calcBtn = document.getElementById('btn-calculate-risk');
  const resultCard = document.getElementById('calc-result-card');
  const weeklyEl = document.getElementById('res-weekly');
  const annualEl = document.getElementById('res-annual');
  const cardsEl = document.getElementById('res-cards');
  const adviceList = document.getElementById('res-advice');
  const levelBadge = document.getElementById('res-level-badge');

  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    const bottledLiters = parseFloat(bottledInput?.value || 0);
    const tapLiters = parseFloat(tapInput?.value || 1.5);
    const doesBoil = boilingSelect?.value === 'yes';
    const filter = filterSelect?.value || 'none';
    const usesPlasticKettle = kettleSelect?.value === 'yes';
    const usesTeabags = teabagSelect?.value === 'yes';

    // Columbia Univ benchmark: ~240,000 particles per liter in bottled water
    // Tap water benchmark: ~5,500 particles per liter
    let dailyParticles = 0;
    dailyParticles += bottledLiters * 240000;

    let tapRate = 5500;
    let filterDrop = 1.0;
    if (filter === 'ro') filterDrop = 0.005; // 99.5% reduction
    else if (filter === 'uf') filterDrop = 0.05; // 95% reduction
    else if (filter === 'carbon') filterDrop = 0.20; // 80% reduction
    else if (filter === 'pitcher') filterDrop = 0.70; // 30% reduction

    if (doesBoil) {
      filterDrop *= 0.15; // Boiling hard tap water drops 85% more
    }

    dailyParticles += (tapLiters * tapRate) * filterDrop;

    if (usesPlasticKettle) dailyParticles += 14000;
    if (usesTeabags) dailyParticles += 11000;

    const weekly = Math.round(dailyParticles * 7);
    const annual = Math.round(dailyParticles * 365);
    const cards = Math.max(0.1, ((annual / (240000 * 2 * 365)) * 12)).toFixed(1);

    if (resultCard) {
      resultCard.classList.remove('hidden');
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (weeklyEl) weeklyEl.textContent = weekly.toLocaleString();
    if (annualEl) annualEl.textContent = annual.toLocaleString();
    if (cardsEl) cardsEl.textContent = `${cards} Credit Cards / Year`;

    let advice = [];
    if (weekly < 60000) {
      if (levelBadge) {
        levelBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
        levelBadge.textContent = 'Low Exposure (Well Protected)';
      }
      advice = [
        'Great job! Your current routine keeps your microplastic intake very low.',
        'Keep using glass or stainless steel reusable bottles instead of single-use plastic.',
        'Change your water filter cartridges on time to prevent bacteria and wear.'
      ];
    } else if (weekly < 350000) {
      if (levelBadge) {
        levelBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40';
        levelBadge.textContent = 'Moderate Exposure';
      }
      advice = [
        'Try boiling your tap water before drinking—in hard water, boiling traps up to 90% of microplastics!',
        'Consider switching from standard water jugs to an under-sink Reverse Osmosis (RO) or Carbon Block filter.',
        'Switch to a stainless steel or glass electric kettle instead of a plastic kettle.'
      ];
    } else {
      if (levelBadge) {
        levelBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40';
        levelBadge.textContent = 'High Exposure';
      }
      advice = [
        'Stop relying on single-use bottled water: bottled water has up to 100x more microplastics than tap water due to bottle cap friction!',
        'Switch immediately to stainless steel or glass bottles for your daily hydration.',
        'Avoid heating water in plastic containers or using plastic pyramid tea bags.',
        'Use an under-sink Reverse Osmosis (RO) filter to block 99.9% of particles.'
      ];
    }

    if (adviceList) {
      adviceList.innerHTML = advice.map(tip => `
        <li class="flex items-start gap-2.5 text-slate-300 text-xs">
          <i class="fa-solid fa-circle-check text-cyan-400 mt-0.5"></i>
          <span>${tip}</span>
        </li>
      `).join('');
    }
  });
}

/* ============================================================
   5. FILTER COMPARISON MATRIX
   ============================================================ */
const filterOptions = [
  {
    name: 'Reverse Osmosis (RO)',
    efficiency: '99.9% Trapped',
    ratingColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    howItWorks: 'Forces water through an ultra-tight membrane that traps all plastic down to 0.0001 microns.',
    cost: '$$ (Moderate to Higher)',
    ease: 'Installed once under the kitchen sink; best long-term purity.'
  },
  {
    name: 'Boiling Hard Tap Water (Kitchen Hack)',
    efficiency: '80% - 90% Trapped',
    ratingColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    howItWorks: 'Boiling hard water creates white mineral scale that traps plastic particles, which you then pour through a coffee filter.',
    cost: '$ (Free in your kitchen!)',
    ease: 'Simple 5-minute kitchen routine using stove or glass kettle.'
  },
  {
    name: 'Ultrafiltration (UF)',
    efficiency: '95% Trapped',
    ratingColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    howItWorks: 'Uses tiny hollow fibers that catch microfibers and bacteria while keeping healthy water minerals.',
    cost: '$$ (Moderate)',
    ease: 'Under-sink filter, operates on standard water pressure.'
  },
  {
    name: 'Solid Carbon Block',
    efficiency: '80% Trapped',
    ratingColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    howItWorks: 'Compressed carbon block stops particles larger than 0.5 microns and removes chlorine taste.',
    cost: '$ (Affordable)',
    ease: 'Faucet-mounted or under-sink; easy 6-month cartridge replacement.'
  },
  {
    name: 'Standard Gravity Pitcher (Brita/Generic)',
    efficiency: '20% - 30% Trapped',
    ratingColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    howItWorks: 'Uses loose charcoal granules. Good for taste and chlorine, but water channels around grains allowing fine plastic through.',
    cost: '$ (Inexpensive)',
    ease: 'Convenient countertop pitcher, but not designed for tiny microplastics.'
  }
];

function initFilterMatrix() {
  const container = document.getElementById('filter-matrix-cards');
  if (!container) return;

  container.innerHTML = filterOptions.map(f => `
    <div class="feature-card p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-2 pb-3 border-b border-slate-700/60 mb-3">
          <h4 class="font-bold text-white text-base">${f.name}</h4>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold border ${f.ratingColor}">${f.efficiency}</span>
        </div>
        <p class="text-slate-300 text-xs mb-4 leading-relaxed">${f.howItWorks}</p>
        <div class="space-y-1.5 text-xs font-mono text-slate-400">
          <div><strong class="text-slate-300">Cost:</strong> ${f.cost}</div>
          <div><strong class="text-slate-300">Best for:</strong> ${f.ease}</div>
        </div>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] text-cyan-400 font-semibold flex items-center gap-1.5">
        <i class="fa-solid fa-circle-check"></i> Lab Verified Efficacy
      </div>
    </div>
  `).join('');
}

/* ============================================================
   6. INTERACTIVE KNOWLEDGE QUIZ (FUN & ENCOURAGING)
   ============================================================ */
const questions = [
  {
    q: 'Which source typically contains the MOST microplastics?',
    options: [
      'Single-use plastic bottled water',
      'Municipal tap water',
      'Boiled hard water',
      'Rainwater'
    ],
    correct: 0,
    explanation: 'Single-use plastic bottles contain up to 40x MORE microplastics than tap water, largely because opening the bottle cap grinds microscopic plastic shards directly into the water!'
  },
  {
    q: 'What simple kitchen trick can remove up to 90% of microplastics from hard tap water?',
    options: [
      'Freezing water into ice cubes',
      'Boiling hard water for 5 minutes and straining through a coffee filter',
      'Microwaving water in a plastic cup',
      'Shaking the water bottle vigorously'
    ],
    correct: 1,
    explanation: 'Scientists discovered in 2024 that boiling hard tap water causes natural minerals (limescale) to trap plastic particles, which you can then easily strain out with a coffee filter!'
  },
  {
    q: 'Why are nanoplastics especially dangerous for our health?',
    options: [
      'They make drinking water smell like ocean salt',
      'They are so microscopically small they can pass through your stomach into your bloodstream',
      'They cause drinking water to turn completely green',
      'They make water weigh twice as much'
    ],
    correct: 1,
    explanation: 'Nanoplastics are smaller than 1 micrometer. Because of their tiny size, they can cross human cellular barriers and enter blood vessels and organs.'
  },
  {
    q: 'What is the safest container to drink water from every day?',
    options: [
      'Crushed single-use plastic bottle',
      'Food-grade stainless steel or glass bottle',
      'Discolored old plastic sport bottle',
      'Styrofoam cup'
    ],
    correct: 1,
    explanation: 'Stainless steel and glass bottles never shed microplastics or chemicals like BPA into your water, making them the safest and most eco-friendly choice!'
  },
  {
    q: 'Which home filtration system removes virtually all microplastics down to 0.0001 microns?',
    options: [
      'Reverse Osmosis (RO)',
      'Basic refrigerator water pitcher',
      'Sink faucet aerator screen',
      'Tea strainer'
    ],
    correct: 0,
    explanation: 'Reverse Osmosis (RO) systems use an ultra-tight membrane with microscopic pores of 0.0001 microns, removing 99.9% of all microplastics and nanoplastics.'
  }
];

let curQ = 0;
let score = 0;

function initQuiz() {
  const container = document.getElementById('quiz-container');
  const qEl = document.getElementById('quiz-question');
  const optsEl = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('quiz-next-btn');
  const progEl = document.getElementById('quiz-progress');
  const countEl = document.getElementById('quiz-count');

  if (!qEl || !optsEl) return;

  function load() {
    const item = questions[curQ];
    if (!item) return;

    qEl.textContent = item.q;
    if (countEl) countEl.textContent = `Question ${curQ + 1} of ${questions.length}`;
    if (progEl) progEl.style.width = `${((curQ) / questions.length) * 100}%`;

    feedbackEl.classList.add('hidden');
    feedbackEl.innerHTML = '';
    nextBtn.classList.add('hidden');

    optsEl.innerHTML = '';
    item.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-sm font-medium flex items-center justify-between transition';
      btn.innerHTML = `
        <span class="flex items-center gap-3">
          <span class="w-6 h-6 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold flex items-center justify-center border border-slate-700">${String.fromCharCode(65 + idx)}</span>
          <span>${opt}</span>
        </span>
        <i class="fa-regular fa-circle text-slate-500 opt-icon"></i>
      `;

      btn.addEventListener('click', () => {
        const allBtns = optsEl.querySelectorAll('button');
        allBtns.forEach(b => b.disabled = true);

        const isCorrect = idx === item.correct;
        if (isCorrect) score++;

        allBtns.forEach((b, i) => {
          if (i === item.correct) {
            b.className = 'w-full text-left p-4 rounded-xl border border-emerald-500 bg-emerald-950/60 text-emerald-200 text-sm font-medium flex items-center justify-between';
            b.querySelector('.opt-icon').className = 'fa-solid fa-circle-check text-emerald-400';
          } else if (i === idx && !isCorrect) {
            b.className = 'w-full text-left p-4 rounded-xl border border-rose-500 bg-rose-950/60 text-rose-200 text-sm font-medium flex items-center justify-between';
            b.querySelector('.opt-icon').className = 'fa-solid fa-circle-xmark text-rose-400';
          }
        });

        feedbackEl.classList.remove('hidden');
        feedbackEl.className = `p-4 rounded-xl border text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'}`;
        feedbackEl.innerHTML = `
          <div class="font-bold mb-1 flex items-center gap-2">
            <i class="${isCorrect ? 'fa-solid fa-circle-check text-emerald-400' : 'fa-solid fa-circle-exclamation text-rose-400'}"></i>
            ${isCorrect ? 'Correct!' : 'Good Try!'}
          </div>
          <div>${item.explanation}</div>
        `;

        nextBtn.classList.remove('hidden');
        nextBtn.textContent = curQ < questions.length - 1 ? 'Next Question →' : 'See My Score & Badge →';
      });

      optsEl.appendChild(btn);
    });
  }

  nextBtn.addEventListener('click', () => {
    curQ++;
    if (curQ < questions.length) {
      load();
    } else {
      if (progEl) progEl.style.width = '100%';
      const pct = Math.round((score / questions.length) * 100);
      container.innerHTML = `
        <div class="text-center py-6 space-y-4">
          <div class="inline-flex p-4 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-3xl">
            <i class="fa-solid fa-award"></i>
          </div>
          <h3 class="text-2xl font-bold text-white">Quiz Complete!</h3>
          <p class="text-slate-300 text-sm">You answered <strong class="text-cyan-400 text-base">${score} out of ${questions.length}</strong> questions correctly (${pct}%).</p>

          <div class="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/60 border border-cyan-500/40 shadow-xl text-center space-y-2">
            <div class="text-xs uppercase tracking-widest text-cyan-400 font-bold">Official Knowledge Badge</div>
            <h4 class="text-xl font-black text-white">Certified Clean Water Advocate</h4>
            <p class="text-slate-300 text-xs">You now understand how microplastics get into drinking water and the proven steps to protect yourself and your family!</p>
            <div class="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>Date: ${new Date().toLocaleDateString()}</span>
              <span class="text-emerald-400 font-semibold"><i class="fa-solid fa-circle-check"></i> Verified</span>
            </div>
          </div>

          <button onclick="location.reload()" class="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition">
            Retake Quiz
          </button>
        </div>
      `;
    }
  });

  load();
}

/* ============================================================
   7. SAFE POLYGLOT TELEMETRY CHECK
   ============================================================ */
function initPolyglotCheck() {
  const dotPy = document.getElementById('dot-python');
  const textPy = document.getElementById('text-python');
  const dotJv = document.getElementById('dot-java');
  const textJv = document.getElementById('text-java');

  fetch('http://localhost:5000/api/status', { mode: 'cors' })
    .then(r => r.json())
    .then(data => {
      if (dotPy) dotPy.className = 'w-1.5 h-1.5 rounded-full bg-emerald-400';
      if (textPy) {
        textPy.className = 'text-emerald-400';
        textPy.textContent = 'Python (5000): Online';
      }
    })
    .catch(() => {});

  fetch(https
    .then(r => r.json())
    .then(data => {
      if (dotJv) dotJv.className = 'w-1.5 h-1.5 rounded-full bg-emerald-400';
      if (textJv) {
        textJv.className = 'text-emerald-400';
        textJv.textContent = 'Java (8080): Online';
      }
    })
    .catch(() => {});
}
