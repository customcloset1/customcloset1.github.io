// ============================================
// CUSTOM CLOSET — Design Studio JS
// No "with person" — color photos only
// Polo replaces Pants
// WhatsApp CTA instead of payment
// ============================================

// ── GARMENT CONFIG ──
const GARMENTS = {
  oversize: {
    name: 'Oversize T-Shirt', price: 699,
    fabric: '100% Cotton', gsm: '240 GSM', fit: 'Boxy / Drop shoulder',
    colors: [
      { key:'black',     label:'Black',          hex:'#1a1a1a' },
      { key:'maroon',    label:'Maroon',          hex:'#7f1d1d' },
      { key:'lavender',  label:'Light Lavender',  hex:'#c4b5fd' },
      { key:'cream',     label:'Cream (Off-White)',hex:'#fef9f0' },
      { key:'beige',     label:'Beige (Sand)',     hex:'#d4c5a9' },
      { key:'white',     label:'White',            hex:'#ffffff' },
      { key:'olive',     label:'Olive Green',      hex:'#4b5320' },
      { key:'brown',     label:'Dark Brown',       hex:'#5c3317' },
      { key:'sky-blue',  label:'Sky Blue',         hex:'#87ceeb' },
      { key:'navy',      label:'Navy Blue',        hex:'#1e3a5f' },
      { key:'red',       label:'Red',              hex:'#dc2626' },
      { key:'charcoal',  label:'Charcoal Grey',    hex:'#374151' }
    ]
  },
  hoodie: {
    name: 'Hoodie', price: 999,
    fabric: '100% Cotton', gsm: '280 GSM', fit: 'Relaxed / Pullover',
    colors: [
      { key:'yellow',      label:'Yellow',          hex:'#fbbf24' },
      { key:'orange',      label:'Orange',           hex:'#f97316' },
      { key:'neon-green',  label:'Neon Green',       hex:'#84cc16' },
      { key:'lavender',    label:'Lavender',         hex:'#c4b5fd' },
      { key:'pink',        label:'Baby Pink',        hex:'#fbb6ce' },
      { key:'sky-blue',    label:'Sky Blue',         hex:'#87ceeb' },
      { key:'royal-blue',  label:'Royal Blue',       hex:'#1d4ed8' },
      { key:'light-grey',  label:'Light Grey',       hex:'#d1d5db' },
      { key:'white',       label:'White',            hex:'#ffffff' },
      { key:'black',       label:'Black',            hex:'#1a1a1a' },
      { key:'navy',        label:'Navy Blue',        hex:'#1e3a5f' },
      { key:'dark-green',  label:'Dark Green',       hex:'#14532d' },
      { key:'maroon',      label:'Maroon',           hex:'#7f1d1d' },
      { key:'red',         label:'Red',              hex:'#dc2626' }
    ]
  },
  tshirt: {
    name: 'Regular Fit T-Shirt', price: 599,
    fabric: '100% Cotton', gsm: '180 GSM', fit: 'Classic / Regular',
    colors: [
      { key:'yellow',      label:'Yellow',           hex:'#fbbf24' },
      { key:'purple',      label:'Purple / Lavender', hex:'#a855f7' },
      { key:'grey',        label:'Grey',             hex:'#9ca3af' },
      { key:'sky-blue',    label:'Sky Blue',         hex:'#87ceeb' },
      { key:'teal',        label:'Dark Teal Green',  hex:'#0f766e' },
      { key:'pink',        label:'Pink',             hex:'#f472b6' },
      { key:'maroon',      label:'Maroon',           hex:'#7f1d1d' },
      { key:'neon-green',  label:'Neon Lime Green',  hex:'#84cc16' },
      { key:'red',         label:'Red',              hex:'#dc2626' },
      { key:'black',       label:'Black',            hex:'#1a1a1a' },
      { key:'cream',       label:'Beige / Cream',    hex:'#fef9f0' },
      { key:'white',       label:'White',            hex:'#ffffff' },
      { key:'orange',      label:'Orange',           hex:'#f97316' },
      { key:'navy',        label:'Navy Blue',        hex:'#1e3a5f' }
    ]
  },
  polo: {
    name: 'Polo T-Shirt', price: 649,
    fabric: '100% Cotton', gsm: '220 GSM', fit: 'Regular / Collar neck',
    colors: [
      { key:'red',         label:'Red',              hex:'#dc2626' },
      { key:'maroon',      label:'Maroon',           hex:'#7f1d1d' },
      { key:'neon-green',  label:'Neon Green',       hex:'#84cc16' },
      { key:'white',       label:'White',            hex:'#ffffff' },
      { key:'light-grey',  label:'Light Grey',       hex:'#d1d5db' },
      { key:'orange',      label:'Orange',           hex:'#f97316' },
      { key:'black',       label:'Black',            hex:'#1a1a1a' },
      { key:'pink',        label:'Light Pink',       hex:'#fbb6ce' },
      { key:'royal-blue',  label:'Royal Blue',       hex:'#1d4ed8' },
      { key:'cream',       label:'Cream / Beige',    hex:'#fef9f0' },
      { key:'yellow',      label:'Yellow',           hex:'#fbbf24' },
      { key:'dark-green',  label:'Dark Green',       hex:'#14532d' },
      { key:'navy',        label:'Navy Blue',        hex:'#1e3a5f' },
      { key:'sky-blue',    label:'Sky Blue',         hex:'#87ceeb' }
    ]
  }
};

// ── WHATSAPP ──
const WA_NUMBER = '918766948989';

// ── STATE ──
let state = {
  garment: 'oversize',
  colorKey: 'white',
  colorLabel: 'White',
  previewView: 'front',
  size: 'M',
  qty: 1,
  activeView: 'front'
};

// ── PER-VIEW CANVAS DATA ──
const views = {
  front: { canvas:null, ready:false, hasDesign:false, fileName:'' },
  back:  { canvas:null, ready:false, hasDesign:false, fileName:'' },
  side:  { canvas:null, ready:false, hasDesign:false, fileName:'' }
};
let visibleView = 'front';

// ── PHOTO PATH (empty color photos only, no person) ──
function getPhotoPath(garment, colorKey, view) {
  return `image/${garment}-${colorKey}-${view}.png`;
}

// ============================================
// SCREEN NAVIGATION
// ============================================
function goToStep(step) {
  document.querySelectorAll('.studio-screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sstep').forEach(s => s.classList.remove('active','done'));
  for (let i=1; i<=4; i++) {
    const el = document.getElementById('sstep-'+i);
    if (!el) continue;
    if (i < step) el.classList.add('done');
    else if (i === step) el.classList.add('active');
  }
  document.getElementById('screen-'+step)?.classList.add('active');

  if (step === 2) {
    buildColorSwatches();
    loadPreviewPhoto();
    updateInfoPanel();
  }
  if (step === 3) {
    ['front','back','side'].forEach(v => initViewCanvas(v));
    // Make front canvas wrapper visible
    ['front','back','side'].forEach(v => {
      const fc = views[v].canvas;
      if (fc?.wrapperEl) fc.wrapperEl.style.display = v==='front' ? 'block' : 'none';
    });
    state.activeView = 'front';
    visibleView = 'front';
    showCanvasView('front');
    updateStudioLabel();
    syncViewDots();
    updateRightPanel();
  }
  window.scrollTo(0,0);
}

// ============================================
// SCREEN 1
// ============================================
function selectGarment(type) {
  state.garment = type;
  // Pick first color as default
  state.colorKey   = GARMENTS[type].colors[0].key;
  state.colorLabel = GARMENTS[type].colors[0].label;
  // Reset view data
  ['front','back','side'].forEach(v => {
    views[v].hasDesign = false; views[v].fileName = '';
    if (views[v].canvas) { views[v].canvas.clear(); views[v].canvas.renderAll(); }
  });
  updateSummary();
  goToStep(2);
}

// ============================================
// SCREEN 2 — PREVIEW
// ============================================
function buildColorSwatches() {
  const grid = document.getElementById('colorSwatchGrid');
  if (!grid) return;
  const colors = GARMENTS[state.garment].colors;
  grid.innerHTML = '';
  colors.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'cswatch' + (c.key === state.colorKey ? ' active' : '');
    btn.style.background = c.hex;
    if (['#ffffff','#fef9f0','#d1d5db','#fbb6ce','#c4b5fd','#87ceeb','#fbbf24','#d4c5a9'].includes(c.hex))
      btn.style.border = '2px solid #ccc';
    btn.title = c.label;
    btn.onclick = () => selectColor(c.key, c.label, btn);
    grid.appendChild(btn);
  });
}

function selectColor(key, label, btn) {
  document.querySelectorAll('.cswatch').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.colorKey   = key;
  state.colorLabel = label;
  document.getElementById('colorLabel').textContent = label;
  loadPreviewPhoto();
  updateSummary();
  updateStudioLabel();
  // Also update canvas garment photo if on screen 3
  if (document.getElementById('screen-3').classList.contains('active')) {
    showCanvasView(visibleView);
  }
}

function switchPreviewView(view, btn) {
  document.querySelectorAll('.vbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.previewView = view;
  loadPreviewPhoto();
}

function loadPreviewPhoto() {
  const img = document.getElementById('previewPhoto');
  const loading = document.getElementById('previewLoading');
  if (!img) return;
  const path = getPhotoPath(state.garment, state.colorKey, state.previewView);
  if (loading) loading.style.display = 'flex';
  img.style.opacity = '0';
  const t = new Image();
  t.onload = () => {
    img.src = path;
    img.style.transition = 'opacity 0.3s';
    img.style.opacity = '1';
    if (loading) loading.style.display = 'none';
  };
  t.onerror = () => {
    // fallback to white
    img.src = getPhotoPath(state.garment, 'white', state.previewView);
    img.style.opacity = '1';
    if (loading) loading.style.display = 'none';
  };
  t.src = path;
  const lbl = document.getElementById('previewPhotoLabel');
  if (lbl) lbl.textContent = `${GARMENTS[state.garment].name} · ${state.colorLabel} · ${state.previewView.charAt(0).toUpperCase()+state.previewView.slice(1)}`;
}

function updateInfoPanel() {
  const g = GARMENTS[state.garment];
  const s = (id,v)=>{ const e=document.getElementById(id); if(e) e.textContent=v; };
  s('pipGarmentName', g.name);
  s('pipFabric',      g.fabric);
  s('pipGSM',         g.gsm);
  s('pipFit',         g.fit);
}

function selectSize(btn) {
  document.querySelectorAll('.sbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.size = btn.textContent.trim();
  updateSummary();
}

// ============================================
// SCREEN 3 — CANVAS STUDIO
// ============================================
function initViewCanvas(view) {
  if (views[view].canvas) return;
  const wrap = document.getElementById('canvasWrap');
  const el = document.createElement('canvas');
  el.id = 'canvas-'+view;
  wrap.appendChild(el);

  const fc = new fabric.Canvas('canvas-'+view, { selection:true, preserveObjectStacking:true });
  views[view].canvas = fc;

  if (fc.wrapperEl) {
    Object.assign(fc.wrapperEl.style, {
      position:'absolute', top:'0', left:'0', zIndex:'10', display:'none'
    });
  }

  fc.on('object:added', () => {
    views[view].hasDesign = true;
    if (visibleView===view) document.getElementById('printZoneGuide')?.classList.add('hidden');
    syncViewDots(); updateStatusList();
  });
  fc.on('object:removed', () => {
    if (fc.getObjects().length===0) {
      views[view].hasDesign = false;
      if (visibleView===view) document.getElementById('printZoneGuide')?.classList.remove('hidden');
      syncViewDots(); updateStatusList();
    }
  });
}

function showCanvasView(view) {
  visibleView = view;
  const img  = document.getElementById('canvasGarmentImg');
  const wrap = document.getElementById('canvasWrap');
  if (!img || !wrap) return;

  const path = getPhotoPath(state.garment, state.colorKey, view);
  views[view].ready = false;
  img.style.opacity = '0';
  img.onload = null; img.onerror = null;

  img.onload = () => {
    img.style.transition = 'opacity 0.3s';
    img.style.opacity = '1';
    function sizeCanvas(tries) {
      const w = img.clientWidth || img.offsetWidth || 480;
      const h = img.clientHeight || img.offsetHeight || Math.round(w*1.2);
      if (w>10 && h>10) {
        ['front','back','side'].forEach(v => {
          const fc = views[v].canvas;
          if (!fc) return;
          fc.setWidth(w); fc.setHeight(h);
          if (fc.wrapperEl) Object.assign(fc.wrapperEl.style,{width:w+'px',height:h+'px',position:'absolute',top:'0',left:'0',zIndex:'10'});
        });
        wrap.style.height = h+'px';
        views[view].ready = true;

        // Show/hide each view's fabric wrapper
        ['front','back','side'].forEach(v => {
          const fc = views[v].canvas;
          if (fc?.wrapperEl) fc.wrapperEl.style.display = v===view ? 'block' : 'none';
        });

        const guide = document.getElementById('printZoneGuide');
        if (guide) {
          if (views[view].hasDesign) guide.classList.add('hidden');
          else guide.classList.remove('hidden');
        }
        views[view].canvas?.renderAll();
      } else if (tries>0) {
        requestAnimationFrame(()=>sizeCanvas(tries-1));
      }
    }
    requestAnimationFrame(()=>sizeCanvas(15));
  };
  img.onerror = () => {
    img.src = getPhotoPath(state.garment, 'white', view);
    img.style.opacity = '1';
  };
  img.src = path;
  updateStudioLabel();
}

// Studio view toggle buttons
function switchStudioView(view, btn) {
  document.querySelectorAll('.mvbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Sync right panel tab
  activateViewTab(view, document.getElementById('vtab-'+view));
}

// Right panel view tabs
function activateViewTab(view, btn) {
  state.activeView = view;
  document.querySelectorAll('.vtab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  // Sync top toggle
  document.querySelectorAll('.mvbtn').forEach(b => b.classList.remove('active'));
  document.getElementById('mvbtn-'+view)?.classList.add('active');
  showCanvasView(view);
  updateRightPanel();
}

// ── UPLOAD ──
function uploadDesign(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 10*1024*1024) { alert('File too large. Max 10MB.'); return; }
  const view = state.activeView;
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    showCanvasView(view);
    function tryPlace(n) {
      const fc = views[view].canvas;
      if (fc && views[view].ready && fc.width>10) {
        placeDesignOnCanvas(fc, dataUrl, view, file.name);
      } else if (n>0) setTimeout(()=>tryPlace(n-1), 120);
      else placeDesignOnCanvas(views[view].canvas, dataUrl, view, file.name);
    }
    tryPlace(20);
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function placeDesignOnCanvas(fc, dataUrl, view, fileName) {
  if (!fc) return;
  fabric.Image.fromURL(dataUrl, img => {
    const maxW = fc.width  * 0.55;
    const maxH = fc.height * 0.45;
    const scale = Math.min(maxW/img.width, maxH/img.height);
    img.set({
      left:fc.width/2, top:fc.height*0.52,
      originX:'center', originY:'center',
      scaleX:scale, scaleY:scale,
      cornerColor:'#b45309', cornerSize:10,
      transparentCorners:false, borderColor:'#b45309', cornerStyle:'circle'
    });
    fc.clear(); fc.add(img); fc.setActiveObject(img); fc.renderAll();
    views[view].hasDesign = true;
    views[view].fileName  = fileName;
    const uz = document.getElementById('uploadZone');
    const uzText = document.getElementById('uploadZoneText');
    if (uz) uz.classList.add('uploaded');
    if (uzText) uzText.innerHTML = `✅ <strong>${fileName}</strong><br><span>Click to replace</span>`;
    syncViewDots(); updateStatusList();
    document.getElementById('sstep-3')?.classList.add('done');
  });
}

// Drag and drop
window.addEventListener('DOMContentLoaded', () => {
  const uz = document.getElementById('uploadZone');
  if (!uz) return;
  uz.addEventListener('dragover', e=>{e.preventDefault();uz.classList.add('drag-over');});
  uz.addEventListener('dragleave', ()=>uz.classList.remove('drag-over'));
  uz.addEventListener('drop', e=>{
    e.preventDefault(); uz.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const dt=new DataTransfer(); dt.items.add(file);
      document.getElementById('fileInput').files=dt.files;
      uploadDesign({target:{files:dt.files}});
    }
  });
});

// ── TOOLS ──
function getActiveCanvas() { return views[visibleView]?.canvas; }
function scaleDesign(f)  { const fc=getActiveCanvas(); if(!fc)return; const o=fc.getActiveObject(); if(o){o.set({scaleX:o.scaleX*f,scaleY:o.scaleY*f});fc.renderAll();} }
function rotateDesign(d) { const fc=getActiveCanvas(); if(!fc)return; const o=fc.getActiveObject(); if(o){o.set('angle',(o.angle||0)+d);fc.renderAll();} }
function flipDesign()    { const fc=getActiveCanvas(); if(!fc)return; const o=fc.getActiveObject(); if(o){o.set('flipX',!o.flipX);fc.renderAll();} }
function deleteDesign()  { const fc=getActiveCanvas(); if(!fc)return; const o=fc.getActiveObject(); if(o){fc.remove(o);fc.renderAll();} }
function clearCurrentView() {
  const fc=getActiveCanvas(); if(!fc||!confirm('Clear design on this view?'))return;
  fc.clear(); fc.renderAll();
  views[visibleView].hasDesign=false; views[visibleView].fileName='';
  updateRightPanel(); syncViewDots(); updateStatusList();
  document.getElementById('printZoneGuide')?.classList.remove('hidden');
}

// ── TEXT ──
function addText() {
  const fc=getActiveCanvas(); if(!fc)return;
  const text=document.getElementById('textInput').value.trim();
  if(!text){alert('Type some text first.');return;}
  const obj=new fabric.Text(text,{
    left:fc.width/2,top:fc.height*0.52,originX:'center',originY:'center',
    fontSize:parseInt(document.getElementById('fontSize').value)||36,
    fontFamily:document.getElementById('fontSelect').value,
    fill:document.getElementById('textColor').value,
    cornerColor:'#b45309',cornerSize:10,transparentCorners:false,borderColor:'#b45309',cornerStyle:'circle'
  });
  fc.add(obj); fc.setActiveObject(obj); fc.renderAll();
  document.getElementById('textInput').value='';
  views[visibleView].hasDesign=true; syncViewDots(); updateStatusList();
}

document.addEventListener('keydown',e=>{
  if((e.key==='Delete'||e.key==='Backspace')&&!e.target.matches('input,textarea,select')) deleteDesign();
});

// ── VIEW DOTS + STATUS ──
function syncViewDots() {
  ['front','back','side'].forEach(v=>{
    const has=views[v].hasDesign;
    document.getElementById('vdot-'+v)?.classList.toggle('has-design',has);
    document.getElementById('vtdot-'+v)?.classList.toggle('has-design',has);
  });
}
function updateStatusList() {
  ['front','back','side'].forEach(v=>{
    const row=document.getElementById('vsl-'+v);
    const dot=document.getElementById('vsldot-'+v);
    const txt=document.getElementById('vsltxt-'+v);
    const has=views[v].hasDesign;
    if(row) row.classList.toggle('has-design',has);
    if(dot) dot.style.background=has?'#16a34a':'#d1d5db';
    if(txt) txt.textContent=has?(views[v].fileName||'Design added'):'No design';
  });
}
function updateRightPanel() {
  const view=state.activeView;
  const vl=view.charAt(0).toUpperCase()+view.slice(1);
  const instr=document.getElementById('viewInstr');
  if(instr) instr.innerHTML=`Add design for <strong>${vl}</strong> view. Skip any view by switching without uploading.`;
  const uz=document.getElementById('uploadZone');
  const uzText=document.getElementById('uploadZoneText');
  if(uz&&uzText){
    const vd=views[view];
    if(vd.hasDesign&&vd.fileName){
      uz.classList.add('uploaded');
      uzText.innerHTML=`✅ <strong>${vd.fileName}</strong><br><span>Click to replace</span>`;
    } else {
      uz.classList.remove('uploaded');
      uzText.innerHTML=`Click or drag to upload<br><span>⚠️ PNG without background — best result<br>JPG also accepted · Max 10MB</span>`;
    }
  }
}

// ── MISC ──
function updateStudioLabel() {
  const lbl=document.getElementById('studioLabel');
  if(lbl) lbl.textContent=`${GARMENTS[state.garment].name} · ${state.colorLabel}`;
}
function changeQty(d){
  state.qty=Math.max(1,state.qty+d);
  document.getElementById('qtyDisplay').textContent=state.qty; updateSummary();
}
function updateSummary(){
  const g=GARMENTS[state.garment];
  const s=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  s('sumGarment',g.name); s('sumColor',state.colorLabel);
  s('sumSize',state.size); s('sumQty',state.qty);
  // Price not shown in design studio — only on trending/shop page
}

// ── WHATSAPP PROCEED (design studio only) ──
function proceedToWhatsApp() {
  const g = GARMENTS[state.garment];
  const viewsSummary = ['front','back','side']
    .filter(v => views[v].hasDesign)
    .map(v => v.charAt(0).toUpperCase()+v.slice(1))
    .join(', ') || 'None uploaded yet';

  const msg = encodeURIComponent(
    `Hi Custom Closet! 👋\n\n` +
    `I've designed a custom garment on your website:\n` +
    `• Garment: ${g.name}\n` +
    `• Color: ${state.colorLabel}\n` +
    `• Size: ${state.size}\n` +
    `• Quantity: ${state.qty}\n` +
    `• Views designed: ${viewsSummary}\n` +
    `\n` +
    `I'll send my final high-res PNG/PDF design without background. Please confirm placement, size details and final price. 🙏`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

// ── INIT ──
window.addEventListener('load',()=>{
  updateSummary(); goToStep(1);
  const type=new URLSearchParams(window.location.search).get('type');
  if(type&&GARMENTS[type]) selectGarment(type);
});