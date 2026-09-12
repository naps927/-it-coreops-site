/* IT-CoreOPS — menu mobile accessible (hamburger) */
(function () {
  var nav = document.querySelector('nav');
  var links = nav && nav.querySelector('.nav-links');
  if (!nav || !links) return;

  var btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Ouvrir le menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
    '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/>' +
    '<line x1="3" y1="18" x2="21" y2="18"/></svg>';
  nav.appendChild(btn);

  function setOpen(open) {
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }

  btn.addEventListener('click', function () {
    setOpen(!links.classList.contains('open'));
  });

  // ferme le menu quand on clique un lien
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // ferme avec Échap
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();
