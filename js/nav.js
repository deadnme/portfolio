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

/* Document viewer: links with data-viewer open the PDF over a dimmed page instead of
   downloading it or opening a new tab. Desktop browsers with a PDF viewer get the real
   PDF in a frame; phones get the data-preview image. Without JS the link still opens the PDF. */
(function () {
  'use strict';

  if (typeof HTMLDialogElement !== 'function') return;

  var dialog, title, body, download;

  function build() {
    dialog = document.createElement('dialog');
    dialog.className = 'doc-viewer';
    dialog.setAttribute('aria-labelledby', 'doc-viewer-title');
    dialog.innerHTML =
      '<div class="doc-viewer-bar">' +
        '<h2 class="doc-viewer-title" id="doc-viewer-title"></h2>' +
        '<a class="btn btn-secondary btn-small" download>Download PDF</a>' +
        '<button type="button" class="btn btn-secondary btn-small doc-viewer-close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="doc-viewer-body"></div>';
    title = dialog.querySelector('.doc-viewer-title');
    body = dialog.querySelector('.doc-viewer-body');
    download = dialog.querySelector('[download]');

    dialog.querySelector('.doc-viewer-close').addEventListener('click', function () { dialog.close(); });
    // A click on the dimmed area lands on the dialog element itself.
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { body.textContent = ''; });
    document.body.appendChild(dialog);
  }

  function open(link) {
    if (!dialog) build();
    var name = link.getAttribute('data-viewer');
    title.textContent = name;
    download.href = link.href;

    var media;
    if (navigator.pdfViewerEnabled && window.matchMedia('(min-width: 768px)').matches) {
      media = document.createElement('iframe');
      // ?v= skips any cached copy served with the old X-Frame-Options: DENY header.
      media.src = link.href + '?v=2#navpanes=0&view=FitH';
      media.title = name;
    } else {
      media = document.createElement('img');
      media.src = link.getAttribute('data-preview');
      media.alt = name + '. Use Download PDF above for a text version.';
    }
    body.textContent = '';
    body.appendChild(media);
    dialog.showModal();
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[data-viewer]');
    // Leave ctrl/cmd/shift/middle clicks alone so "open in new tab" still works.
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    open(link);
  });
})();
