/* IT-CoreOPS — animations d'apparition au scroll (partagé) */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  // Injecte le style d'apparition (via JS = pas de contenu caché si le JS ne charge pas)
  var css =
    '.reveal{opacity:0;transform:translateY(26px);' +
    'transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1);}' +
    '.reveal.in{opacity:1;transform:none;}' +
    // dégradé animé sur les mots en couleur
    '.g{background-size:220% 220%;animation:itcGrad 9s ease infinite;}' +
    '@keyframes itcGrad{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function run() {
    var sel = '.eyebrow,.section-h,.section-sub,.scard,.pcard,.step,' +
              '.feature-card,.video-placeholder,.devis-left,.devis-form,.cform,' +
              '.trust-item,[data-reveal]';
    var targets = Array.prototype.slice.call(document.querySelectorAll(sel));
    targets.forEach(function (el) { el.classList.add('reveal'); });

    // cascade pour les enfants des grilles
    document.querySelectorAll(
      '.services-grid,.projects-grid,.steps,.features-grid,.demo-grid,.trust-inner'
    ).forEach(function (par) {
      Array.prototype.slice.call(par.children).forEach(function (ch, i) {
        if (ch.classList.contains('reveal')) ch.style.transitionDelay = (i * 85) + 'ms';
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(function (t) { io.observe(t); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
