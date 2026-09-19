/* Renders the featured project's metric tiles from window.PORTFOLIO_DATA.
   If the data file is missing the static fallback prose already in the DOM
   stays exactly as authored, so the card never renders empty. */
(function () {
  'use strict';

  var host = document.getElementById('tenr-metrics');
  var data = window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.featured;
  if (!host || !data || !data.metrics || !data.metrics.length) return;

  var html = data.metrics.map(function (m) {
    return '<li class="stat"><strong>' + m.value + '</strong><span>' + m.label + '</span></li>';
  }).join('');

  host.innerHTML = '<ul class="metric-grid">' + html + '</ul>';
})();
