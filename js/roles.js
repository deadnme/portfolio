/* Role views: reorder projects and skills for the kind of role a visitor is hiring for.
   The view is kept in the URL (?role=cloud) so a role-specific link can be sent with an application.
   Without JavaScript the page shows the default "Everything" order and the switcher stays hidden. */
(function () {
  'use strict';

  var ROLES = {
    all: 'Systems administration, technical support and cloud, entry level.',
    sysadmin: 'Junior systems administrator: Windows Server, Active Directory and Linux hosting.',
    helpdesk: 'IT support and service desk: tickets, accounts, email and access problems.',
    cloud: 'Junior cloud support and operations: AWS, Terraform and Linux.'
  };

  var switcher = document.querySelector('[data-role-switch]');
  if (!switcher) return;

  var buttons = [].slice.call(switcher.querySelectorAll('button[data-role]'));
  var roleText = document.querySelector('[data-role-text]');
  var share = document.querySelector('[data-role-share]');
  var shareUrl = document.querySelector('[data-role-url]');
  var groups = [].slice.call(document.querySelectorAll('[data-reorder]'));

  function currentFromUrl() {
    var match = /[?&]role=([a-z]+)/.exec(location.search);
    return match && Object.prototype.hasOwnProperty.call(ROLES, match[1]) ? match[1] : 'all';
  }

  function apply(role, push) {
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-role') === role));
    });

    if (roleText) roleText.textContent = ROLES[role];

    groups.forEach(function (group) {
      var items = [].slice.call(group.children).filter(function (el) {
        return el.hasAttribute('data-o-all');
      });
      items.sort(function (a, b) {
        return Number(a.getAttribute('data-o-' + role)) - Number(b.getAttribute('data-o-' + role));
      });
      items.forEach(function (el) { group.appendChild(el); });
    });

    var base = location.origin && location.origin !== 'null' ? location.origin + location.pathname : '';
    var query = role === 'all' ? '' : '?role=' + role;
    if (share && shareUrl) {
      share.hidden = role === 'all';
      shareUrl.textContent = (location.hostname ? location.hostname : 'seanorias.com') + '/' + query;
    }
    if (push && window.history && history.replaceState && base) {
      try { history.replaceState(null, '', base + query + location.hash); } catch (e) { /* file:// */ }
    }
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-role'), true); });
  });

  switcher.hidden = false;
  apply(currentFromUrl(), false);
})();
