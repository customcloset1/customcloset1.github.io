// ============================================
// CUSTOM CLOSET — Main JavaScript
// ============================================

const CL = 'https://res.cloudinary.com/bsgynj2j/image/upload';

const SIZE_CHARTS = {
  oversize:{ cols:['Size','Chest (in)','Length (in)'], rows:[['S','40–42','24'],['M','42–44','25'],['L','44–46','26'],['XL','46–48','27'],['XXL','48–50','28']] },
  hoodie:  { cols:['Size','Chest (in)','Length (in)'], rows:[['S','38','25'],['M','40','26'],['L','42','27'],['XL','44','28'],['XXL','46','29']] },
  polo:    { cols:['Size','Chest (in)','Length (in)'], rows:[['S','36','25'],['M','38','26'],['L','40','27'],['XL','42','28'],['XXL','44','29']] },
  tshirt:  { cols:['Size','Chest (in)','Length (in)'], rows:[['S','38','25'],['M','40','26'],['L','42','27'],['XL','44','28'],['XXL','46','29']] }
};

const TRENDING_PRODUCTS = [
  // 1 — Legend in Red (3 images now)
  {
    id:1, category:'oversize', name:'Legend in Red',
    desc:'240 GSM, Drop Shoulder, French Terry Cotton',
    price:599, original:999, badge:'Trending', colors:['#1a1a1a'],
    images:{
      front:`${CL}/F1-1-front.jpg`,
      back:`${CL}/F1-1-back.jpg`,
      both:`${CL}/f1-1-both.jpeg`
    }
  },
  // 2 — NEW: Colosseum Drop (white, 3 images)
  {
    id:2, category:'oversize', name:'Colosseum Drop',
    desc:'240 GSM, Drop Shoulder, French Terry Cotton',
    price:599, original:999, badge:'New', colors:['#ffffff'],
    images:{
      front:`${CL}/rome-front.jpeg`,
      back:`${CL}/rome-back.png`,
      both:`${CL}/rome-both.jpeg`
    }
  },
  // 3 — The GOAT Edition (was 2)
  {
    id:3, category:'oversize', name:'The GOAT Edition',
    desc:'240 GSM, Drop Shoulder, French Terry Cotton',
    price:599, original:999, badge:'Trending', colors:['#1a1a1a'],
    images:{
      front:`${CL}/front new.jpeg`,
      back:`${CL}/F1-2-back.jpg`,
      both:`${CL}/new-both.png`
    }
  },
  // 4 — The Red Legacy (was 3)
  {
    id:4, category:'oversize', name:'The Red Legacy',
    desc:'240 GSM, Drop Shoulder, French Terry Cotton',
    price:599, original:999, badge:'Trending', colors:['#1a1a1a'],
    images:{
      front:`${CL}/F1-2-front.jpg`,
      back:`${CL}/F1-3-back.jpg`,
      both:`${CL}/lewis-both.png`
    }
  },
  // 5 — Spider-Verse (was 4, new images)
  {
    id:5, category:'oversize', name:'Spider-Verse Legacy Tee – Black Edition',
    desc:'240 GSM, Drop Shoulder, French Terry Cotton',
    price:599, original:999, badge:'Trending', colors:['#1a1a1a'],
    images:{
      front:`${CL}/spiderman-new-back.jpeg`,
      back:`${CL}/spiderman-new-front.jpeg`
    }
  },
];

// ══ CART ══
function getCart(){ try{return JSON.parse(localStorage.getItem('cc_cart')||'[]');}catch{return[];} }
function saveCart(cart){ localStorage.setItem('cc_cart',JSON.stringify(cart)); updateCartBadge(); }
function updateCartBadge(){
  const total=getCart().reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('.cart-badge').forEach(b=>{b.textContent=total;b.classList.toggle('show',total>0);});
}
function addToCart(product, size){
  const cart=getCart();
  const key=`${product.id}-${size}`;
  const existing=cart.find(i=>i.key===key);
  if(existing) existing.qty++;
  else cart.push({key,id:product.id,name:product.name,category:product.category,size,price:product.price,original:product.original,img:product.images.front,color:product.colors[0]==='#ffffff'?'White':'Black',qty:1});
  saveCart(cart);
  showCartToast(product.name,size);
}
function showCartToast(name,size){
  let t=document.getElementById('cartToast');
  if(!t){t=document.createElement('div');t.id='cartToast';t.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:12px 20px;border-radius:12px;font-size:13px;font-weight:500;z-index:9999;transition:opacity 0.3s;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,0.2);';document.body.appendChild(t);}
  t.innerHTML=`✅ Added — ${name} (${size}) &nbsp;<a href="cart.html" style="color:#fbbf24;font-weight:700;text-decoration:none;">View cart →</a>`;
  t.style.opacity='1'; clearTimeout(t._t); t._t=setTimeout(()=>t.style.opacity='0',3000);
}

// ══ SIZE CHART ══
function openSizeChart(category){
  renderSizeTable(category);
  document.querySelectorAll('.sc-tab').forEach(t=>t.classList.toggle('active',t.dataset.cat===category));
  document.getElementById('sizeChartOverlay').classList.add('open');
}
function closeSizeChart(){ document.getElementById('sizeChartOverlay').classList.remove('open'); }
function switchSizeTab(cat,btn){ document.querySelectorAll('.sc-tab').forEach(t=>t.classList.remove('active')); btn.classList.add('active'); renderSizeTable(cat); }
function renderSizeTable(cat){
  const chart=SIZE_CHARTS[cat]||SIZE_CHARTS.oversize;
  const thead=document.getElementById('scThead'); const tbody=document.getElementById('scTbody');
  if(!thead||!tbody) return;
  thead.innerHTML=`<tr>${chart.cols.map(c=>`<th>${c}</th>`).join('')}</tr>`;
  tbody.innerHTML=chart.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('');
}

// ══ BUILD CARD — minimal, click to product page ══
function buildCard(p) {
  const discount=Math.round((1-p.price/p.original)*100);
  const badge=p.badge?`<div class="trend-badge ${p.badge==='New'?'new':p.badge==='Hot'?'hot':''}">${p.badge}</div>`:'';
  const src=p.images.front||'';

  return `
  <div class="trend-card minimal-card" data-category="${p.category}" onclick="window.location.href='product.html?id=${p.id}'" style="cursor:pointer;">
    <div class="trend-img-wrap" style="position:relative;">
      ${src
        ?`<img src="${src}" alt="${p.name}" loading="lazy" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:16px 16px 0 0;display:block;"/>`
        :`<div style="width:100%;aspect-ratio:1;background:#f5f5f5;border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:center;font-size:56px;">🩱</div>`
      }
      ${badge}
    </div>
    <div class="trend-info" style="padding:14px 16px 16px;">
      <div class="trend-category">${p.category.charAt(0).toUpperCase()+p.category.slice(1)}</div>
      <h3 class="trend-name" style="margin-bottom:6px;">${p.name}</h3>
      <div class="trend-price-row" style="margin-bottom:0;">
        <span class="trend-price">₹${p.price.toLocaleString('en-IN')}</span>
        <span class="trend-original">₹${p.original.toLocaleString('en-IN')}</span>
        <span class="trend-discount">${discount}% off</span>
      </div>
    </div>
  </div>`;
}

// ══ SLIDER (kept for compatibility) ══
function setSlide(cardId,idx){}
function slideNav(cardId,dir){}

// ══ RENDER / FILTER / PAGINATION ══
const ITEMS_PER_PAGE=15; let currentPage=1; let currentFilter='all'; let filteredProducts=[...TRENDING_PRODUCTS];

function renderProducts(){
  const grid=document.getElementById('trendingGrid'); if(!grid) return;
  if(filteredProducts.length===0){
    grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:64px 24px;color:#888;"><div style="font-size:48px;margin-bottom:16px;">${currentFilter!=='all'?'🔍':'🛍️'}</div><h3 style="font-size:20px;font-weight:600;color:#222;margin-bottom:8px;">${currentFilter!=='all'?'No items in this category yet':'No trending items yet'}</h3></div>`;
    renderPagination(); return;
  }
  const start=(currentPage-1)*ITEMS_PER_PAGE;
  grid.innerHTML=filteredProducts.slice(start,start+ITEMS_PER_PAGE).map(buildCard).join('');
  renderPagination(); setTimeout(setupScrollAnimations,60);
  if(currentPage>1) document.getElementById('trending')?.scrollIntoView({behavior:'smooth'});
}

function renderPagination(){
  const total=Math.ceil(filteredProducts.length/ITEMS_PER_PAGE);
  const pageNums=document.getElementById('pageNumbers'); const prevBtn=document.getElementById('prevBtn'); const nextBtn=document.getElementById('nextBtn'); const pag=document.getElementById('pagination');
  if(!pageNums) return;
  pageNums.innerHTML='';
  for(let i=1;i<=total;i++){const b=document.createElement('button');b.className='page-num-btn'+(i===currentPage?' active':'');b.textContent=i;b.onclick=()=>{currentPage=i;renderProducts();};pageNums.appendChild(b);}
  if(prevBtn) prevBtn.disabled=currentPage===1; if(nextBtn) nextBtn.disabled=currentPage===total;
  if(pag) pag.style.display=total<=1?'none':'flex';
}
function changePage(delta){const total=Math.ceil(filteredProducts.length/ITEMS_PER_PAGE);currentPage=Math.max(1,Math.min(total,currentPage+delta));renderProducts();}
function filterProducts(category,clickedTab){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  clickedTab.classList.add('active'); currentFilter=category; currentPage=1;
  filteredProducts=category==='all'?[...TRENDING_PRODUCTS]:TRENDING_PRODUCTS.filter(p=>p.category===category);
  renderProducts();
}
function toggleWishlist(heart){heart.textContent=heart.textContent==='♡'?'♥':'♡';heart.style.color=heart.textContent==='♥'?'red':'';}
function toggleMenu(){ document.getElementById('mobileMenu')?.classList.toggle('open'); }

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{anchor.addEventListener('click',function(e){const t=document.querySelector(this.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});});
  renderProducts(); animateCounters(); updateCartBadge();
});

function setupScrollAnimations(){
  const obs=new IntersectionObserver((entries)=>{entries.forEach((entry,i)=>{if(entry.isIntersecting){setTimeout(()=>entry.target.classList.add('visible'),i*55);obs.unobserve(entry.target);}});},{threshold:0.04});
  document.querySelectorAll('.trend-card:not(.visible)').forEach(c=>obs.observe(c));
  const secObs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';}});},{threshold:0.08});
  document.querySelectorAll('.why-card,.step').forEach(el=>{if(!el.style.opacity){el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity 0.5s ease,transform 0.5s ease';secObs.observe(el);}});
}
function animateCounters(){
  const obs=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){const el=entry.target;const target=parseInt(el.dataset.target);let current=0;const step=target/(1800/16);const timer=setInterval(()=>{current+=step;if(current>=target){el.textContent=target;clearInterval(timer);}else el.textContent=Math.floor(current);},16);obs.unobserve(el);}});},{threshold:0.5});
  document.querySelectorAll('.stat-num').forEach(c=>obs.observe(c));
}

const HERO_GARMENTS={oversize:{name:'Oversize Tee',gsm:'240 GSM'},hoodie:{name:'Hoodie',gsm:'370 GSM'},polo:{name:'Polo T-Shirt',gsm:'220 GSM'},tshirt:{name:'Regular Tee',gsm:'200 GSM'}};
function switchHeroGarment(type,btn){document.querySelectorAll('.hg-item').forEach(el=>el.classList.remove('active'));const target=document.querySelector(`.hg-item[data-garment="${type}"]`);if(target){target.classList.add('active');setHeroColorOnElement(target,'#f0f0f0','#d0d0d0');}document.querySelectorAll('.hptab').forEach(t=>t.classList.remove('active'));if(btn)btn.classList.add('active');const g=HERO_GARMENTS[type];if(g){document.getElementById('specName').textContent=g.name;document.getElementById('specGSM').textContent=g.gsm;}document.querySelectorAll('.hcolor-dot').forEach((d,i)=>d.classList.toggle('active',i===0));}
function setHeroColor(btn,fill,stroke){const activeItem=document.querySelector('.hg-item.active');if(!activeItem)return;setHeroColorOnElement(activeItem,fill,stroke);document.querySelectorAll('.hcolor-dot').forEach(d=>d.classList.remove('active'));btn.classList.add('active');}
function setHeroColorOnElement(el,fill,stroke){el.querySelectorAll('svg path,svg rect').forEach(shape=>{const f=shape.getAttribute('fill');if(f&&f!=='none'&&!['#bbb','#d8d8d8'].includes(f)){shape.setAttribute('fill',fill);shape.setAttribute('stroke',stroke);}});}