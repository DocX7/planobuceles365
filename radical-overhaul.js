(() => {
  function syncOrbit() {
    const txt = document.getElementById('progress-text');
    if (!txt) return;
    const value = parseInt((txt.textContent || '0').replace(/[^0-9]/g, ''), 10) || 0;
    document.documentElement.style.setProperty('--orbit-progress', `'${value}%'`);
    document.documentElement.style.setProperty('--orbit-deg', `${Math.min(100, value) * 3.6}deg`);
  }

  function addMicroCopy() {
    const box = document.querySelector('.reading-box');
    if (box && !box.querySelector('.journey-label')) {
      const label = document.createElement('div');
      label.className = 'journey-label';
      label.textContent = 'Ponto da jornada de hoje';
      box.prepend(label);
    }
    const bible = document.querySelector('.bible-card .card-top h2');
    if (bible) bible.textContent = 'Portal da Palavra';
  }

  function init() {
    document.body.classList.add('radical-overhaul');
    addMicroCopy();
    syncOrbit();
    const target = document.getElementById('progress-text');
    if (target) new MutationObserver(syncOrbit).observe(target, { childList: true, subtree: true, characterData: true });
    document.addEventListener('click', () => setTimeout(syncOrbit, 80));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
