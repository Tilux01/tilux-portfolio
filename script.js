(function(){
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.classList.add('js');

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var clock = document.getElementById('clock');
  if (clock) {
    var tick = function(){
      var d = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000) + 3600000);
      clock.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    };
    tick();
    setInterval(tick, 30000);
  }

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
    if (!el.classList.contains('reveal') || el.classList.contains('is-in')) return;
    var done = function(e){
      if (e.target !== el) return;
      el.removeEventListener('animationend', done);
      el.classList.remove('reveal', 'is-in');
    };
    el.addEventListener('animationend', done);
    el.classList.add('is-in');
  };
  var inView = function(el, pad){
    var r = el.getBoundingClientRect();
    var h = window.innerHeight || root.clientHeight;
    return r.top < (h * (pad || 1)) && r.bottom > 0;
  };

  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function(el){ el.classList.remove('reveal'); });
  } else {
    reveals.forEach(function(el){ if (inView(el, 0.94)) show(el); });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) { show(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -4% 0px' });
    reveals.forEach(function(el){ io.observe(el); });

    window.addEventListener('load', function(){
      reveals.forEach(function(el){ if (inView(el, 0.94)) show(el); });
    });
    [600, 1500].forEach(function(t){
      setTimeout(function(){
        var vh = window.innerHeight || root.clientHeight;
        reveals.forEach(function(el){
          if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < vh) show(el);
        });
      }, t);
    });
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

  var spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = document.querySelectorAll('main > section[id]');
  var setActive = function(id){
    spyLinks.forEach(function(a){ a.classList.toggle('is-current', a.getAttribute('href') === '#' + id); });
  };
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function(s){ spy.observe(s); });
  }

  var scrollTo = function(sel){
    var target = document.querySelector(sel);
    if (!target) return;
    var y = target.getBoundingClientRect().top + window.scrollY - 24;
    if (y < 100) y = 0;
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  };

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      if (!document.querySelector(href)) return;
      e.preventDefault();
      scrollTo(href);
      if (history.replaceState) history.replaceState(null, '', href);
    });
  });

  document.querySelectorAll('[data-scroll]').forEach(function(btn){
    btn.addEventListener('click', function(){ scrollTo(btn.getAttribute('data-scroll')); });
  });

  var heroSlides = [
    {
      eyebrow: 'Designer & Developer',
      label: 'What I do',
      text: 'Interface design, front-end engineering and design systems, taken from a rough brief through to a shipped and tested product.',
      a: 'Product Design',
      b: 'Realtime & Motion'
    },
    {
      eyebrow: 'Mobile & Realtime',
      label: 'LoveCount',
      text: 'A couples app built in Expo and React Native on a Firebase realtime backend. Live sync, chat and WebRTC calling, proven across two real devices.',
      a: 'Expo + React Native',
      b: 'Firebase + WebRTC'
    },
    {
      eyebrow: 'Web & Commerce',
      label: 'Tilux Automotive',
      text: 'A boutique performance dealership. Full-bleed hero, curated inventory, a live carousel and a booking flow built to convert.',
      a: 'Design System',
      b: 'Booking Flow'
    },
    {
      eyebrow: 'Brand & Retail',
      label: 'Fresh & Reddy',
      text: 'A pantry brand spread across seven pages, with a hand-built product carousel, swipe gestures and lead capture.',
      a: 'Carousel Build',
      b: 'Lead Capture'
    },
    {
      eyebrow: 'Studio & Layout',
      label: 'Isafast Venture',
      text: 'A venture studio presence with editorial hierarchy, a structured service grid and clean responsive behaviour.',
      a: 'Editorial Grid',
      b: 'Responsive'
    }
  ];

  var heroEyebrow = document.getElementById('heroEyebrow');
  var heroLabel = document.getElementById('heroLabel');
  var heroText = document.getElementById('heroText');
  var heroCallA = document.getElementById('heroCallA');
  var heroCallB = document.getElementById('heroCallB');
  var pagerNow = document.getElementById('pagerNow');
  var dots = Array.prototype.slice.call(document.querySelectorAll('.pager-dot[data-slide]'));

  var setCallout = function(el, value){
    if (!el) return;
    var t = el.querySelector('.callout-text');
    if (t) t.textContent = value;
  };

  var showSlide = function(i){
    var s = heroSlides[i];
    if (!s) return;
    if (heroEyebrow) heroEyebrow.textContent = s.eyebrow;
    if (heroLabel) heroLabel.textContent = s.label;
    if (heroText) heroText.textContent = s.text;
    setCallout(heroCallA, s.a);
    setCallout(heroCallB, s.b);
    if (pagerNow) pagerNow.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);
    dots.forEach(function(d, idx){
      var on = idx === i;
      d.classList.toggle('is-active', on);
      if (on) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  };

  if (dots.length) {
    dots.forEach(function(d){
      d.addEventListener('click', function(){
        showSlide(parseInt(d.getAttribute('data-slide'), 10));
      });
    });

    var dotsWrap = document.querySelector('.pager-dots');
    var currentIndex = function(){
      for (var i = 0; i < dots.length; i++) {
        if (dots[i].classList.contains('is-active')) return i;
      }
      return 0;
    };
    if (dotsWrap) {
      dotsWrap.addEventListener('keydown', function(e){
        var active = currentIndex();
        var next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % dots.length;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (active - 1 + dots.length) % dots.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = dots.length - 1;
        if (next === null) return;
        e.preventDefault();
        showSlide(next);
        dots[next].focus();
      });
    }
  }

  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');

  var setError = function(id, msg){
    var input = document.getElementById(id);
    if (!input) return true;
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

      var ok = true, firstBad = null;
      Object.keys(validators).forEach(function(id){
        var input = document.getElementById(id);
        if (!input) return;
        if (!setError(id, validators[id](input.value))) {
          ok = false;
          if (!firstBad) firstBad = input;
        }
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
        message: document.getElementById('fMessage').value.trim()
      };

      var body = 'Name: ' + data.name + '\nEmail: ' + data.email + '\nProject type: ' + data.type + '\n\n' + data.message;
      var href = 'mailto:hello@tilux.dev?subject=' + encodeURIComponent('Project enquiry - ' + data.type) + '&body=' + encodeURIComponent(body);

      setTimeout(function(){
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        var sp2 = submitBtn.querySelector('.spinner');
        if (sp2) sp2.remove();
        label.textContent = original;

        if (status) {
          status.className = 'form-status is-success';
          status.textContent = 'Thanks ' + data.name.split(' ')[0] + '. Opening your mail client with the brief.';
        }

        window.location.href = href;
        form.reset();
        form.querySelectorAll('.field').forEach(function(f){ f.classList.remove('is-error', 'is-valid'); });
        form.querySelectorAll('.field-error').forEach(function(fe){ fe.textContent = ''; });
      }, 550);
    });
  }
})();
