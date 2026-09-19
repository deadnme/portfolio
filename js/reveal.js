/* Scroll-reveal.
   Classic script (no ES modules) so the page also works from file://.
   Three backstops guarantee content can never stay hidden:
     1. the CSS only hides .reveal under html.js-reveal,
     2. a load-event sweep reveals anything already in view,
     3. a 2s timer force-reveals everything regardless. */
(function () {
  'use strict';

  var root = document.documentElement;
  if (!root.classList.contains('js-reveal')) return;

  var items = [].slice.call(document.querySelectorAll('.reveal'));
  if (!items.length) return;

  function showAll() {
    for (var i = 0; i < items.length; i++) items[i].classList.add('visible');
  }

  if (!('IntersectionObserver' in window)) { showAll(); return; }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });

  window.addEventListener('load', function () {
    items.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
    });
  });

  setTimeout(showAll, 2000);
})();
