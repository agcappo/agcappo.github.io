/* site.js — Agostino Capponi */

(function () {
  'use strict';

  var hamburger = document.getElementById('hamburger');
  var navMenu   = document.getElementById('nav-menu');
  var navbar    = document.getElementById('navbar');
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
      if (window.innerWidth > 820) return;
      e.preventDefault();
      item.classList.toggle('open');
    });
  });

  /* ---- Close menu when clicking outside ---- */
  document.addEventListener('click', function (e) {
    if (!navMenu) return;
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
      a.classList.add('active-page');
    }
  });

  /* ---- Navbar: glass blur on scroll ---- */
  if (navbar) {
    var onScroll = function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ---- Scroll-triggered fade-in ---- */
  var fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el, i) {
      el.style.transitionDelay = (i * 0.08) + 's';
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

})();
