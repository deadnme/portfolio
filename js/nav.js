/* Nav niceties: mark the section currently in view, and stamp the footer year. */
(function () {
  'use strict';

  var year = document.getElementById('footer-year');
  if (year) year.textContent = String(new Date().getFullYear());

  var links = [].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var map = {};
  var sections = [];
  links.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (!section) return;
    map[id] = link;
    sections.push(section);
  });
  if (!sections.length) return;

  function clear() {
    links.forEach(function (l) { l.removeAttribute('aria-current'); });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var link = map[entry.target.id];
      if (!link) return;
      clear();
      link.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();
