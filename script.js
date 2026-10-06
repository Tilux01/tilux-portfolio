(function(){
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[id="year"]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  var clock = document.getElementById('clock');
  if (clock) {
    var tick = function(){
      var d = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000) + 3600000);
      var hh = String(d.getHours()).padStart(2, '0');
      var mm = String(d.getMinutes()).padStart(2, '0');
      clock.textContent = hh + ':' + mm;
    };
    tick();
    setInterval(tick, 30000);
  }

  var toggle = document.getElementById('themeToggle');
  var applyTheme = function(t){
    root.setAttribute('data-theme', t);
    if (toggle) {
      toggle.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#121212' : '#FAFAFA');
  };
  applyTheme(root.getAttribute('data-theme') || 'light');
  if (toggle) {
    toggle.addEventListener('click', function(){
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('tilux-theme', next); } catch (e) {}
    });
  }

  var nav = document.getElementById('nav');
  var onScroll = function(){
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  var closeMenu = function(){
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobileNav.hidden = true;
  };
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function(){
      var open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      menuToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });
    window.addEventListener('resize', function(){
      if (window.innerWidth >= 900) closeMenu();
    });
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  var show = function(el){
    if (el.classList.contains('is-in')) return;
    el.classList.add('is-in');
  };

  var inView = function(el, pad){
    var r = el.getBoundingClientRect();
    var h = window.innerHeight || root.clientHeight;
    return r.top < (h * (pad || 1)) && r.bottom > 0;
  };

  var revealAll = function(){ reveals.forEach(show); };

  if (reduce || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    reveals.forEach(function(el){
      if (inView(el, 0.94)) show(el);
    });

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          show(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -4% 0px' });

    reveals.forEach(function(el){ io.observe(el); });

    window.addEventListener('load', function(){
      reveals.forEach(function(el){ if (inView(el, 0.94)) show(el); });
    });

    setTimeout(function(){
      if (reveals.some(function(el){ return !el.classList.contains('is-in') && inView(el, 1); })) {
        reveals.forEach(function(el){ if (inView(el, 1)) show(el); });
      }
    }, 600);

    setTimeout(function(){
      var vh = window.innerHeight || root.clientHeight;
      var anyAbove = reveals.some(function(el){
        return !el.classList.contains('is-in') && el.getBoundingClientRect().top < vh;
      });
      if (anyAbove) reveals.forEach(function(el){
        if (el.getBoundingClientRect().top < vh) show(el);
      });
    }, 1500);
  }

  document.querySelectorAll('.acc-head').forEach(function(head){
    head.addEventListener('click', function(){
      var item = head.closest('.acc-item');
      var group = item.parentElement;
      var open = item.classList.contains('is-open');
      group.querySelectorAll('.acc-item').forEach(function(other){
        other.classList.remove('is-open');
        var h = other.querySelector('.acc-head');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('is-open');
        head.setAttribute('aria-expanded', 'true');
      }
    });
  });

  var chips = document.querySelectorAll('.chip[data-filter]');
  var cards = document.querySelectorAll('.work-card');
  var empty = document.getElementById('workEmpty');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      var f = chip.getAttribute('data-filter');
      chips.forEach(function(c){ c.classList.toggle('is-active', c === chip); });
      var shown = 0;
      cards.forEach(function(card){
        var match = f === 'all' || card.getAttribute('data-cat') === f;
        card.hidden = !match;
        if (match) { shown++; show(card); }
      });
      if (empty) empty.hidden = shown > 0;
    });
  });

  document.querySelectorAll('.card-cover').forEach(function(cover){
    var img = cover.querySelector('img');
    if (!img) return;
    var done = function(){ cover.classList.add('is-loaded'); };
    if (img.complete && img.naturalWidth > 0) done();
    else {
      img.addEventListener('load', done);
      img.addEventListener('error', done);
    }
  });

  var sections = document.querySelectorAll('main > section[id]');
  var links = document.querySelectorAll('.nav-links a[href^="#"]');
  if ('IntersectionObserver' in window && sections.length && links.length) {
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function(a){
          a.classList.toggle('is-current', a.getAttribute('href') === '#' + id);
        });
      });
    }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function(s){ spy.observe(s); });
  }

  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');

  var setError = function(id, msg){
    var input = document.getElementById(id);
    if (!input) return;
    var field = input.closest('.field');
    var err = document.getElementById(id + 'Err');
    field.classList.toggle('is-error', !!msg);
    field.classList.toggle('is-valid', !msg && input.value.trim() !== '');
    if (err) err.textContent = msg || '';
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  };

  var validators = {
    fName: function(v){ return v.trim().length >= 2 ? '' : 'Please enter your name.'; },
    fEmail: function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; },
    fType: function(v){ return v ? '' : 'Please choose a project type.'; },
    fMessage: function(v){ return v.trim().length >= 10 ? '' : 'Please add at least 10 characters.'; }
  };

  if (form) {
    Object.keys(validators).forEach(function(id){
      var input = document.getElementById(id);
      if (!input) return;
      var run = function(){ setError(id, validators[id](input.value)); };
      input.addEventListener('blur', run);
      input.addEventListener('input', function(){
        if (input.closest('.field').classList.contains('is-error')) run();
      });
      input.addEventListener('change', run);
    });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (status) { status.className = 'form-status'; status.textContent = ''; }

      var ok = true;
      var firstBad = null;
      Object.keys(validators).forEach(function(id){
        var input = document.getElementById(id);
        if (!input) return;
        var good = setError(id, validators[id](input.value));
        if (!good) { ok = false; if (!firstBad) firstBad = input; }
      });

      if (!ok) {
        if (status) {
          status.className = 'form-status is-error';
          status.textContent = 'Please fix the highlighted fields.';
        }
        if (firstBad) firstBad.focus();
        return;
      }

      var label = submitBtn.querySelector('.btn-label');
      var original = label.textContent;
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      label.textContent = 'Sending';
      if (!submitBtn.querySelector('.spinner')) {
        var sp = document.createElement('span');
        sp.className = 'spinner';
        sp.setAttribute('aria-hidden', 'true');
        submitBtn.insertBefore(sp, submitBtn.firstChild);
      }

      var data = {
        name: document.getElementById('fName').value.trim(),
        email: document.getElementById('fEmail').value.trim(),
        type: document.getElementById('fType').value,
        message: document.getElementById('fMessage').value.trim(),
        at: new Date().toISOString()
      };

      setTimeout(function(){
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        var sp = submitBtn.querySelector('.spinner');
        if (sp) sp.remove();
        label.textContent = original;

        if (status) {
          status.className = 'form-status is-success';
          status.textContent = 'Thanks ' + data.name.split(' ')[0] + '. Opening your mail client with the brief.';
        }

        var body = 'Name: ' + data.name + '\n' +
                   'Email: ' + data.email + '\n' +
                   'Project type: ' + data.type + '\n\n' +
                   data.message;
        var href = 'mailto:hello@tilux.dev?subject=' + encodeURIComponent('Project enquiry - ' + data.type) +
                   '&body=' + encodeURIComponent(body);
        window.location.href = href;

        form.reset();
        form.querySelectorAll('.field').forEach(function(f){
          f.classList.remove('is-error', 'is-valid');
        });
        form.querySelectorAll('.field-error').forEach(function(fe){ fe.textContent = ''; });
      }, 550);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y < 0 ? 0 : y, behavior: reduce ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', href);
    });
  });
})();
