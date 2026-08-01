// ============================================
// CUSTOM CLOSET — Main JavaScript
// ============================================

// ============================================
// TRENDING PRODUCTS — ADD YOUR LISTINGS HERE
// ============================================
// HOW TO USE:
//   • Only products you add below appear on the site.
//   • Add as many or as few as you like (max 15 shown per page).
//   • To add a product, copy the template below and fill in the details.
//   • To remove a product, delete its { ... } block.
//   • The site automatically shows only what's here — no placeholders.
//
// TEMPLATE:
//   { id: <unique number>,
//     category: 'tshirt' | 'hoodie' | 'polo' | 'oversize',
//     name: 'Product Name',
//     desc: 'Short description',
//     price: 599,
//     original: 849,
//     badge: 'Bestseller' | 'New' | 'Hot' | 'Trending' | '',
//     colors: ['#hexcode', '#hexcode'],
//     images: { front: 'CLOUDINARY_URL', back: 'CLOUDINARY_URL' }
//   },
//
// ──────────────────────────────────────────────
// ADD YOUR PRODUCTS BELOW THIS LINE:
// ──────────────────────────────────────────────
const CL = 'https://res.cloudinary.com/bsgynj2j/image/upload/f_auto,q_auto/garments';

const TRENDING_PRODUCTS = [
  {
    id: 1,
    category: 'oversize',
    name: 'Legend in Red',
    desc: '240 GSM, Drop Shoulder, French Terry Cotton',
    price: 499,
    original: 999,
    badge: 'Trending',
    colors: ['#1a1a1a'],
    images: {
      front: `${CL}/F1-1-front.png`,
      back:  `${CL}/F1-1-back.png`
    }
  },
  {
    id: 2,
    category: 'oversize',
    name: 'The GOAT Edition',
    desc: '240 GSM, Drop Shoulder, French Terry Cotton',
    price: 499,
    original: 999,
    badge: 'Trending',
    colors: ['#1a1a1a'],
    images: {
      front: `${CL}/F1-2-front.png`,
      back:  `${CL}/F1-2-back.png`
    }
  },
  {
    id: 3,
    category: 'oversize',
    name: 'The Red Legacy',
    desc: '240 GSM, Drop Shoulder, French Terry Cotton',
    price: 499,
    original: 999,
    badge: 'Trending',
    colors: ['#1a1a1a'],
    images: {
      front: `${CL}/F1-2-front.png`,
      back:  `${CL}/F1-3-back.png`
    }
  },
  {
    id: 4,
    category: 'oversize',
    name: 'Spider-Verse Legacy Tee – Black Edition',
    desc: '240 GSM, Drop Shoulder, French Terry Cotton',
    price: 499,
    original: 999,
    badge: 'Trending',
    colors: ['#1a1a1a'],
    images: {
      front: `${CL}/spiderman1-front.png`,
      back:  `${CL}/spiderman1-back.png`
    }
  },
];
// ──────────────────────────────────────────────

const ITEMS_PER_PAGE = 15;
let currentPage = 1;
let currentFilter = 'all';
let filteredProducts = [...TRENDING_PRODUCTS];

// ── BUILD PRODUCT CARD HTML ──
function buildCard(p) {
  const discount = Math.round((1 - p.price / p.original) * 100);
  const badge = p.badge
    ? `<div class="trend-badge ${p.badge==='New'?'new':p.badge==='Hot'?'hot':''}">${p.badge}</div>`
    : '';
  const colors = p.colors.map(c =>
    `<span class="color-dot" style="background:${c};${['#fff','#fef9f0'].includes(c)?'border:1.5px solid #ddd;':''}" title="${c}"></span>`
  ).join('');

  const emoji = p.category==='hoodie'?'🧥':p.category==='polo'?'👔':p.category==='oversize'?'🩱':'👕';
  const cardId = `card-${p.id}`;
  const imgs = p.images || {};

  // Two slides only: Front and Back — no labels shown
  const slides = [
    { key: 'front', icon: emoji, hint: 'Front view' },
    { key: 'back',  icon: '🔄',  hint: 'Back view'  },
  ];

  const slidesHtml = slides.map((s, i) => {
    const src = imgs[s.key];
    const inner = src
      ? `<img src="${src}" alt="${p.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;"/>`
      : `<div class="trend-placeholder-icon">${s.icon}</div><span class="img-hint">${s.hint} · Photo coming soon</span>`;
    return `
    <div class="tslide ${i===0?'active':''}" data-slide="${i}">
      <div class="trend-img ${src?'':'placeholder-img'}">${inner}</div>
    </div>`;
  }).join('');

  const dotsHtml = slides.map((s, i) => `
    <button class="tslide-dot ${i===0?'active':''}" onclick="setSlide('${cardId}',${i})"></button>`
  ).join('');

  return `
  <div class="trend-card" data-category="${p.category}" id="${cardId}">
    <div class="trend-img-wrap">
      <div class="tslider">
        <div class="tslider-track">${slidesHtml}</div>
        <button class="tslider-prev" onclick="slideNav('${cardId}',-1)">&#8249;</button>
        <button class="tslider-next" onclick="slideNav('${cardId}',1)">&#8250;</button>
      </div>
      ${badge}
      <div class="trend-wishlist" onclick="toggleWishlist(this)">♡</div>
      <div class="tslide-dots">${dotsHtml}</div>
    </div>
    <div class="trend-info">
      <div class="trend-category">${p.category.charAt(0).toUpperCase()+p.category.slice(1)}</div>
      <h3 class="trend-name">${p.name}</h3>
      <p class="trend-desc">${p.desc}</p>
      <div class="trend-colors">${colors}</div>
      <div class="trend-price-row">
        <span class="trend-price">₹${p.price.toLocaleString('en-IN')}</span>
        <span class="trend-original">₹${p.original.toLocaleString('en-IN')}</span>
        <span class="trend-discount">${discount}% off</span>
      </div>
      <div class="trend-actions">
        <a href="confirm.html?item=${encodeURIComponent(p.name)}&price=${p.price}&cat=${p.category}" class="btn-buy">Buy now</a>
        <a href="design.html?type=${p.category}" class="btn-customise">Customise</a>
      </div>
    </div>
  </div>`;
}

// ── SLIDER HELPERS ──
function getSlideCount(cardId) { return 2; }

function setSlide(cardId, idx) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const total = getSlideCount(cardId);
  idx = ((idx % total) + total) % total;
  card.querySelectorAll('.tslide').forEach((s, i) => s.classList.toggle('active', i === idx));
  card.querySelectorAll('.tslide-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  card.dataset.currentSlide = idx;
}

function slideNav(cardId, dir) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const current = parseInt(card.dataset.currentSlide || 0);
  setSlide(cardId, current + dir);
}

// ── RENDER PRODUCTS ──
function renderProducts() {
  const grid = document.getElementById('trendingGrid');
  if (!grid) return;

  // Empty state — no products added yet (or none in this category)
  if (filteredProducts.length === 0) {
    const isFiltered = currentFilter !== 'all';
    grid.innerHTML = `
      <div class="trending-empty" style="
        grid-column: 1 / -1;
        text-align: center;
        padding: 64px 24px;
        color: #888;
      ">
        <div style="font-size:48px;margin-bottom:16px;">${isFiltered ? '🔍' : '🛍️'}</div>
        <h3 style="font-size:20px;font-weight:600;color:#222;margin-bottom:8px;">
          ${isFiltered ? 'No items in this category yet' : 'No trending items yet'}
        </h3>
        <p style="font-size:14px;line-height:1.6;max-width:360px;margin:0 auto;">
          ${isFiltered
            ? 'Switch to <strong>All</strong> or check back soon — new items are on the way.'
            : 'Products will appear here as you add them. Add your first listing to get started!'}
        </p>
      </div>`;
    renderPagination();
    return;
  }

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  grid.innerHTML = pageItems.map(buildCard).join('');
  renderPagination();
  // Re-run scroll animations on new cards
  setTimeout(setupScrollAnimations, 60);
  if (currentPage > 1) {
    document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' });
  }
}

// ── PAGINATION ──
function renderPagination() {
  const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const pageNums = document.getElementById('pageNumbers');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const pag      = document.getElementById('pagination');
  if (!pageNums) return;

  pageNums.innerHTML = '';
  for (let i = 1; i <= total; i++) {
    const b = document.createElement('button');
    b.className = 'page-num-btn' + (i === currentPage ? ' active' : '');
    b.textContent = i;
    b.onclick = () => { currentPage = i; renderProducts(); };
    pageNums.appendChild(b);
  }
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === total;
  if (pag) pag.style.display = total <= 1 ? 'none' : 'flex';
}

function changePage(delta) {
  const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  currentPage = Math.max(1, Math.min(total, currentPage + delta));
  renderProducts();
}

// ── FILTER TABS ──
function filterProducts(category, clickedTab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  clickedTab.classList.add('active');
  currentFilter = category;
  currentPage = 1;
  filteredProducts = category === 'all'
    ? [...TRENDING_PRODUCTS]
    : TRENDING_PRODUCTS.filter(p => p.category === category);
  renderProducts();
}

// ── WISHLIST ──
function toggleWishlist(heart) {
  heart.textContent = heart.textContent === '♡' ? '♥' : '♡';
  heart.style.color = heart.textContent === '♥' ? 'red' : '';
}

// ── MOBILE MENU ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

// ── SMOOTH SCROLL ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });
  renderProducts();
  animateCounters();
});

// ── SCROLL ANIMATIONS ──
function setupScrollAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 55);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.04 });
  document.querySelectorAll('.trend-card:not(.visible)').forEach(c => obs.observe(c));

  const secObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.why-card, .step').forEach(el => {
    if (!el.style.opacity) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      secObs.observe(el);
    }
  });
}

// ── COUNTER ANIMATION ──
function animateCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = target / (1800 / 16);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { el.textContent = target; clearInterval(timer); }
          else el.textContent = Math.floor(current);
        }, 16);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(c => obs.observe(c));
}

// ── HERO GARMENT PICKER ──
const HERO_GARMENTS = {
  oversize: { name: 'Oversize Tee',  gsm: '240 GSM' },
  hoodie:   { name: 'Hoodie',        gsm: '370 GSM' },
  polo:     { name: 'Polo T-Shirt',  gsm: '220 GSM' },
  tshirt:   { name: 'Regular Tee',   gsm: '200 GSM' },
};

function switchHeroGarment(type, btn) {
  document.querySelectorAll('.hg-item').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`.hg-item[data-garment="${type}"]`);
  if (target) {
    target.classList.add('active');
    setHeroColorOnElement(target, '#f0f0f0', '#d0d0d0');
  }
  document.querySelectorAll('.hptab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const g = HERO_GARMENTS[type];
  if (g) {
    document.getElementById('specName').textContent = g.name;
    document.getElementById('specGSM').textContent  = g.gsm;
  }
  document.querySelectorAll('.hcolor-dot').forEach((d,i) => d.classList.toggle('active', i===0));
}

function setHeroColor(btn, fill, stroke) {
  const activeItem = document.querySelector('.hg-item.active');
  if (!activeItem) return;
  setHeroColorOnElement(activeItem, fill, stroke);
  document.querySelectorAll('.hcolor-dot').forEach(d => d.classList.remove('active'));
  btn.classList.add('active');
}

function setHeroColorOnElement(el, fill, stroke) {
  el.querySelectorAll('svg path, svg rect').forEach(shape => {
    const f = shape.getAttribute('fill');
    if (f && f !== 'none' && !['#bbb','#d8d8d8'].includes(f)) {
      shape.setAttribute('fill', fill);
      shape.setAttribute('stroke', stroke);
    }
  });
}