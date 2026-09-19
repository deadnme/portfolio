/* Renders the featured project's metric rows from window.PORTFOLIO_DATA.
   If the data file is missing the static fallback prose already in the DOM
   stays exactly as authored, so the section never renders empty. */
(function () {
  'use strict';

  var host = document.getElementById('tenr-metrics');
  var data = window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.featured;
  if (!host || !data || !data.metrics || !data.metrics.length) return;

  var html = data.metrics.map(function (m) {
    return '<div><dt>' + m.value + '</dt><dd>' + m.label + '</dd></div>';
  }).join('');

  host.innerHTML = '<dl class="metric-list">' + html + '</dl>';
})();
