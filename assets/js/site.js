/* site.js — navigation toggle */

(function () {
  'use strict';

  var hamburger = document.getElementById('hamburger');
  var navMenu   = document.getElementById('nav-menu');
  var dropdowns = document.querySelectorAll('.has-dropdown');

  /* ---- Mobile: hamburger toggle ---- */
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var open = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', open);
    });
  }

  /* ---- Mobile: dropdown accordion ---- */
  dropdowns.forEach(function (item) {
    var toggle = item.querySelector('.nav-link');
    if (!toggle) return;

    toggle.addEventListener('click', function (e) {
      // Only intercept on mobile (hamburger visible)
      if (window.innerWidth > 820) return;
      e.preventDefault();
      item.classList.toggle('open');
    });
  });

  /* ---- Close menu when a real link is clicked ---- */
  document.addEventListener('click', function (e) {
    if (!navMenu) return;
    // Click outside the whole navbar → close
    var navbar = document.getElementById('navbar');
    if (navbar && !navbar.contains(e.target)) {
      navMenu.classList.remove('open');
      if (hamburger) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
      dropdowns.forEach(function (d) { d.classList.remove('open'); });
    }
  });

  /* ---- Highlight active page in nav ---- */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.style.opacity = '1';
      a.style.fontWeight = '600';
    }
  });
})();
