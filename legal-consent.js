// ============================================
// LEGAL CONSENT BANNER — Custom Closet
// Shows once per visitor (any entry page), links to Terms + Privacy.
// ============================================
(function () {
  if (localStorage.getItem('cc_legal_ack') === '1') return;

  const style = document.createElement('style');
  style.textContent = `
    .cc-legal-banner{position:fixed;left:0;right:0;bottom:0;z-index:5000;background:#111;color:#fff;
      padding:16px 20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;
      box-shadow:0 -4px 24px rgba(0,0,0,0.25);font-family:'Inter',sans-serif;}
    .cc-legal-banner p{margin:0;font-size:13px;line-height:1.6;flex:1;min-width:220px;color:rgba(255,255,255,0.9);}
    .cc-legal-banner a{color:#fff;text-decoration:underline;}
    .cc-legal-banner button{background:#fff;color:#111;border:none;padding:10px 20px;border-radius:8px;
      font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;font-family:'Inter',sans-serif;}
    .cc-legal-banner button:hover{background:#f0f0f0;}
    @media(max-width:600px){.cc-legal-banner{padding:14px 16px;} .cc-legal-banner button{width:100%;}}
  `;
  document.head.appendChild(style);

  const banner = document.createElement('div');
  banner.className = 'cc-legal-banner';
  banner.innerHTML = `
    <p>We use cookies-free local storage to remember your cart. By using CustomCloset, you agree to our
      <a href="terms.html">Terms of Service</a> and <a href="privacy.html">Privacy Policy</a>.</p>
    <button id="ccLegalAckBtn">Got it</button>
  `;
  document.body.appendChild(banner);

  document.getElementById('ccLegalAckBtn').addEventListener('click', () => {
    localStorage.setItem('cc_legal_ack', '1');
    banner.remove();
  });
})();