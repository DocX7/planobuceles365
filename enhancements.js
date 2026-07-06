(() => {
  const STORAGE_KEY = 'familiaNaPalavraAjustes.v1';
  const defaults = { fontScale: 1, night: false, autoScroll: false };
  let settings = loadSettings();
  let autoScrollTimer = null;

  function loadSettings() {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
    catch { return { ...defaults }; }
  }

  function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .loading-screen{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:radial-gradient(circle at 20% 10%,rgba(255,255,255,.94),transparent 35%),linear-gradient(160deg,#fff8ec,#ecd1ad);transition:opacity .45s ease,visibility .45s ease;padding:28px;text-align:center;color:#2b1d13}.loading-screen.hide{opacity:0;visibility:hidden}.loading-card{width:min(340px,92vw);border:1px solid rgba(107,74,43,.15);background:rgba(255,253,248,.74);border-radius:32px;padding:30px 22px;box-shadow:0 26px 80px rgba(76,45,20,.18);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px)}.loading-mark{width:68px;height:68px;margin:0 auto 18px;border-radius:24px;display:grid;place-items:center;background:linear-gradient(145deg,#5f3f24,#c89243);color:white;font-size:30px;animation:pulseMark 1.8s ease-in-out infinite}.loading-card h2{margin:0 0 8px;font-size:1.45rem}.loading-card p{margin:0;color:#6d5541;line-height:1.55}.loading-bar{height:9px;background:#ead8bd;border-radius:999px;overflow:hidden;margin-top:20px}.loading-bar span{display:block;width:42%;height:100%;border-radius:999px;background:linear-gradient(90deg,#604024,#d6a451);animation:loadingMove 1.35s ease-in-out infinite}@keyframes loadingMove{0%{transform:translateX(-100%)}100%{transform:translateX(260%)}}@keyframes pulseMark{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
      .reading-tools{position:sticky;top:8px;z-index:20;display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:16px 0 0;padding:8px;border-radius:24px;background:rgba(255,250,242,.86);border:1px solid rgba(107,74,43,.14);box-shadow:0 12px 34px rgba(76,45,20,.12);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}.tool-btn{border:0;border-radius:17px;background:#f2dfc4;color:#6b4a2b;font-weight:950;min-height:45px;padding:9px 6px}.tool-btn.active{background:linear-gradient(145deg,#604024,#9b6a35);color:white}.toast-done{position:fixed;left:max(16px,env(safe-area-inset-left));right:max(16px,env(safe-area-inset-right));bottom:calc(155px + env(safe-area-inset-bottom));z-index:80;transform:translateY(24px);opacity:0;pointer-events:none;transition:opacity .35s ease,transform .35s ease}.toast-done.show{opacity:1;transform:translateY(0)}.toast-card{border-radius:25px;background:linear-gradient(145deg,#fffaf2,#f4dfbf);border:1px solid rgba(107,74,43,.16);box-shadow:0 20px 60px rgba(76,45,20,.22);padding:17px 18px;color:#342314;font-weight:900;line-height:1.45;text-align:center}.toast-card span{display:block;font-size:1.4rem;margin-bottom:5px}.bible-text{font-size:calc(1rem * var(--reader-scale, 1))}.chapter{transition:background .25s ease,color .25s ease}.reading-box,.story-box,.card{transition:background .25s ease,color .25s ease,border-color .25s ease}.night-mode{--bg:#17120d;--bg2:#21170f;--card:rgba(36,27,20,.88);--paper:#20160f;--ink:#f8ead5;--muted:#c8ad91;--brand:#f0c989;--brand2:#d9a958;--line:rgba(255,232,196,.13);background:#17120d;color:#f8ead5}.night-mode body,.night-mode{background:#17120d!important}.night-mode .card,.night-mode .chapter,.night-mode .reading-box,.night-mode .story-box{background:linear-gradient(145deg,#261b13,#18110c)!important;border-color:rgba(255,232,196,.13)!important;color:#f8ead5!important}.night-mode .chapter h3{background:rgba(33,23,16,.94)!important;color:#f0c989!important}.night-mode .verse,.night-mode .arthur-grid p,.night-mode .story-box p,.night-mode .subtitle,.night-mode .install-card p{color:#f2dfc4!important}.night-mode .note{background:#2d2117!important;border-color:rgba(240,201,137,.24)!important;color:#f2dfc4!important}.night-mode .chip,.night-mode .secondary,.night-mode .ghost,.night-mode .tool-btn{background:#342417!important;color:#f0c989!important}.night-mode .chip.active,.night-mode .tool-btn.active,.night-mode .primary{background:linear-gradient(135deg,#8b612c,#d9a958)!important;color:#17120d!important}.night-mode .bottom-tabs,.night-mode .reading-tools{background:rgba(32,22,15,.86)!important;border-color:rgba(255,232,196,.13)!important}.night-mode .tab-btn{color:#d8bea2!important}.night-mode .tab-btn.active{color:#17120d!important;background:linear-gradient(145deg,#d9a958,#f0c989)!important}.night-mode .danger{background:#3a1f1a!important;color:#ffb5a7!important}
      @media(max-width:420px){.reading-tools{grid-template-columns:repeat(4,1fr);gap:6px}.tool-btn{font-size:.84rem;min-height:43px}.toast-done{bottom:calc(150px + env(safe-area-inset-bottom))}.loading-card{padding:26px 18px}}
    `;
    document.head.appendChild(style);
  }

  function createLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-screen';
    loader.innerHTML = `<div class="loading-card"><div class="loading-mark">✦</div><h2>Preparando sua leitura de hoje...</h2><p>A Palavra está sendo organizada para a sua família.</p><div class="loading-bar"><span></span></div></div>`;
    document.body.appendChild(loader);
    const hide = () => loader.classList.add('hide');
    window.addEventListener('load', () => setTimeout(hide, 800));
    setTimeout(hide, 2200);
  }

  function createTools() {
    const bibleCard = document.querySelector('.bible-card');
    if (!bibleCard || document.querySelector('.reading-tools')) return;
    const tools = document.createElement('div');
    tools.className = 'reading-tools';
    tools.innerHTML = `
      <button class="tool-btn" id="font-minus" type="button">A-</button>
      <button class="tool-btn" id="font-plus" type="button">A+</button>
      <button class="tool-btn" id="night-toggle" type="button">Noite</button>
      <button class="tool-btn" id="scroll-toggle" type="button">Rolar</button>
    `;
    const message = document.getElementById('bible-message');
    bibleCard.insertBefore(tools, message || bibleCard.firstChild.nextSibling);
    document.getElementById('font-minus').addEventListener('click', () => changeFont(-0.08));
    document.getElementById('font-plus').addEventListener('click', () => changeFont(0.08));
    document.getElementById('night-toggle').addEventListener('click', toggleNight);
    document.getElementById('scroll-toggle').addEventListener('click', toggleAutoScroll);
  }

  function createToast() {
    if (document.querySelector('.toast-done')) return;
    const toast = document.createElement('div');
    toast.className = 'toast-done';
    toast.innerHTML = `<div class="toast-card"><span>✓</span>Leitura concluída. Que a Palavra frutifique no coração da sua família.</div>`;
    document.body.appendChild(toast);
  }

  function applySettings() {
    document.documentElement.style.setProperty('--reader-scale', settings.fontScale.toFixed(2));
    document.documentElement.classList.toggle('night-mode', settings.night);
    document.body.classList.toggle('night-mode', settings.night);
    const night = document.getElementById('night-toggle');
    if (night) {
      night.classList.toggle('active', settings.night);
      night.textContent = settings.night ? 'Dia' : 'Noite';
    }
    const scroll = document.getElementById('scroll-toggle');
    if (scroll) scroll.classList.toggle('active', settings.autoScroll);
    saveSettings();
  }

  function changeFont(delta) {
    settings.fontScale = Math.max(0.92, Math.min(1.35, settings.fontScale + delta));
    applySettings();
  }

  function toggleNight() {
    settings.night = !settings.night;
    applySettings();
  }

  function toggleAutoScroll() {
    settings.autoScroll = !settings.autoScroll;
    if (settings.autoScroll) startAutoScroll(); else stopAutoScroll();
    applySettings();
  }

  function startAutoScroll() {
    stopAutoScroll();
    autoScrollTimer = setInterval(() => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 120;
      if (nearBottom) {
        settings.autoScroll = false;
        stopAutoScroll();
        applySettings();
        return;
      }
      window.scrollBy({ top: 1, behavior: 'smooth' });
    }, 95);
  }

  function stopAutoScroll() {
    if (autoScrollTimer) clearInterval(autoScrollTimer);
    autoScrollTimer = null;
  }

  function hookCompletion() {
    document.addEventListener('click', (event) => {
      const btn = event.target.closest('#complete-btn, #sticky-complete-btn');
      if (!btn) return;
      setTimeout(() => {
        const status = document.getElementById('status-pill');
        if (status && /conclu/i.test(status.textContent || '')) showToast();
      }, 120);
    });
  }

  function showToast() {
    const toast = document.querySelector('.toast-done');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3400);
  }

  function init() {
    injectStyles();
    createLoading();
    createTools();
    createToast();
    hookCompletion();
    applySettings();
    if (settings.autoScroll) startAutoScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
