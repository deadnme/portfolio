/* Intro overlay — ACCELERATOR ONLY.
   The 2.5s auto-dismiss lives in css/intro.css as an animation with `forwards`
   fill, so if this file is blocked, 404s or throws, the overlay still clears
   itself and content is never permanently obscured. This script only makes the
   dismissal immediate on interaction. */
(function () {
  'use strict';

  var root = document.documentElement;
  if (!root.classList.contains('intro-active')) return;

  var el = document.getElementById('intro');
  if (!el) { root.classList.remove('intro-active'); return; }

  var done = false;
  var EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchmove'];
  var OPTS = { passive: true, capture: true };

  function remove() {
    root.classList.remove('intro-active');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function detach() {
    EVENTS.forEach(function (name) { window.removeEventListener(name, dismiss, OPTS); });
  }

  function dismiss() {
    if (done) return;
    done = true;
    detach();
    el.classList.add('is-dismissing');
    setTimeout(remove, 450);
  }

  el.addEventListener('animationend', function (e) {
    if (e.animationName === 'intro-out') { done = true; detach(); remove(); }
  });

  EVENTS.forEach(function (name) { window.addEventListener(name, dismiss, OPTS); });
})();
