(function(){
  'use strict';

  var root = document.documentElement;

  var themeBtn = document.getElementById('themeToggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function setTheme(t){
    var dark = t === 'dark';
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeBtn){
      themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (themeMeta) themeMeta.setAttribute('content', dark ? '#121212' : '#FAFAFA');
    try { localStorage.setItem('tilux-theme', dark ? 'dark' : 'light'); } catch(e){}
  }

  if (themeBtn){
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    themeBtn.addEventListener('click', function(){
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  var nav = document.getElementById('nav');
  function onScroll(){
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var menuBtn = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav){
    menuBtn.addEventListener('click', function(){
      var open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
      mobileNav.hidden = open;
    });
    mobileNav.addEventListener('click', function(e){
      if (e.target && e.target.tagName === 'A'){
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      }
    });
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function settle(){
    var vh = window.innerHeight || 800;
    reveals.forEach(function(el){
      if (el.classList.contains('is-in')) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh - 40 && r.bottom > 0) el.classList.add('is-in');
    });
  }

  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function(el){ io.observe(el); });
    window.addEventListener('load', settle);
    window.addEventListener('resize', settle);
    settle();
    setTimeout(settle, 600);
  } else {
    reveals.forEach(function(el){ el.classList.add('is-in'); });
  }

  var ids = ['work', 'services', 'experience', 'contact'];
  var sections = ids.map(function(id){ return document.getElementById(id); }).filter(Boolean);
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));

  if ('IntersectionObserver' in window && sections.length && navLinks.length){
    var so = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){
          navLinks.forEach(function(a){
            a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function(s){ so.observe(s); });
  }

  var items = Array.prototype.slice.call(document.querySelectorAll('.acc-item'));
  items.forEach(function(item){
    var head = item.querySelector('.acc-head');
    if (!head) return;
    head.addEventListener('click', function(){
      var wasOpen = item.classList.contains('is-open');
      items.forEach(function(o){
        o.classList.remove('is-open');
        var h = o.querySelector('.acc-head');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen){
        item.classList.add('is-open');
        head.setAttribute('aria-expanded', 'true');
      }
    });
  });

  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.work-card'));
  var emptyMsg = document.getElementById('workEmpty');

  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var filter = chip.getAttribute('data-filter');
      var shown = 0;
      cards.forEach(function(card){
        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.hidden = !match;
        if (match) shown++;
      });
      if (emptyMsg) emptyMsg.hidden = shown > 0;
      settle();
    });
  });

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var clock = document.getElementById('clock');
  function tick(){
    if (!clock) return;
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }
  tick();
  setInterval(tick, 20000);
})();
