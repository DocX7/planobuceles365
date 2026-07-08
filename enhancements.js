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
    /* Visual consolidado em theme.css. Esta função permanece para preservar o fluxo. */
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
