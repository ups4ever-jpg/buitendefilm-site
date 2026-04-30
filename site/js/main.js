/* ═══════════════════════════════════════════════════════
   BUITEN – De Film · JavaScript v2
   Navigatie · Scroll reveal · Formulier (inline hero)
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Nav: scroll effect ─────────────────────────── */
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ─── Nav: actieve link op scroll ───────────────── */
  const sections  = document.querySelectorAll('section[id], footer[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  function updateActiveLink() {
    let current = '';
    sections.forEach(s => {
      if (s.getBoundingClientRect().top <= 130) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ─── Nav: mobiel toggle ────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    navMenu.querySelectorAll('.nav__link').forEach(l => {
      l.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── Scroll Reveal ──────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ─── Smooth scroll anchors ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = (nav ? nav.offsetHeight : 70);
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });

  /* ─── Formulier ──────────────────────────────────── */
  const form        = document.getElementById('signupForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');

  if (form) {
    // Toon/verberg datumgroep — niet meer nodig (nu checkboxes)

    // Live validatie
    form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) validateField(field);
      });
      field.addEventListener('change', () => validateField(field));
    });

    // Checkbox validatie live
    form.querySelectorAll('.form__checkbox').forEach(cb => {
      cb.addEventListener('change', () => validateCheckboxes());
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fieldsOk = validateForm();
      const datesOk  = validateCheckboxes();
      if (!fieldsOk || !datesOk) return;
      setSubmitting(true);

      // Verzamel gekozen data
      const gekozenData = Array.from(form.querySelectorAll('.form__checkbox:checked'))
        .map(cb => cb.value).join(', ');

      const data = {
        voornaam:     form.naam.value.trim(),
        achternaam:   form.achternaam.value.trim(),
        leeftijd:     parseInt(form.leeftijd.value, 10),
        email:        form.email.value.trim(),
        telefoon:     form.telefoon.value.trim(),
        woonplaats:   form.woonplaats.value.trim(),
        aanmelding:   gekozenData,
        socialmedia:  form.socialmedia ? form.socialmedia.value.trim() : '',
        bio:          form.bio.value.trim(),
        datum:        new Date().toISOString(),
      };

      // Stuur naar Formspree (e-mail naar info@buitendefilm.nl)
      const formspreeData = new FormData();
      formspreeData.append('Voornaam',        data.voornaam);
      formspreeData.append('Achternaam',      data.achternaam);
      formspreeData.append('Leeftijd',        data.leeftijd);
      formspreeData.append('Email',           data.email);
      formspreeData.append('Telefoon',        data.telefoon);
      formspreeData.append('Woonplaats',      data.woonplaats);
      formspreeData.append('Gekozen data',    data.aanmelding);
      formspreeData.append('Social media',    data.socialmedia);
      formspreeData.append('Over mezelf',     data.bio);
      formspreeData.append('_subject',        `Nieuwe aanmelding BUITEN – ${data.voornaam} ${data.achternaam}`);
      formspreeData.append('_language',       'nl');
      formspreeData.append('_next',           window.location.origin + '/bedankt.html');

      try {
        const mailRes = await fetch('https://formspree.io/f/mlgarwqw', {
          method: 'POST',
          body: formspreeData,
          headers: { 'Accept': 'application/json' },
        });
        if (!mailRes.ok) throw new Error('Formspree error');

        showSuccess();

      } catch (err) {
        console.warn('Formulier fout:', err);
        setSubmitting(false);
        alert('Er ging iets mis. Probeer het opnieuw of mail naar info@buitendefilm.nl');
      }
    });
  }

  function validateCheckboxes() {
    const checked = form.querySelectorAll('.form__checkbox:checked').length > 0;
    const group   = document.getElementById('datumCheckGroup');
    if (group) group.classList.toggle('has-error', !checked);
    return checked;
  }

  function validateForm() {
    let valid = true;
    form.querySelectorAll('[required]').forEach(f => { if (!validateField(f)) valid = false; });
    return valid;
  }

  function validateField(field) {
    const val = field.value.trim();
    let ok = !!val;
    if (ok && field.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (ok && field.type === 'number') { const n = parseInt(val, 10); ok = !isNaN(n) && n >= 16 && n <= 60; }
    field.classList.toggle('error', !ok);
    // Toon/verberg foutmelding in parent .form__group
    const group = field.closest('.form__group');
    if (group) {
      group.classList.toggle('has-error', !ok);
    }
    return ok;
  }

  function setSubmitting(state) {
    if (!submitBtn) return;
    submitBtn.disabled = state;
    const t = submitBtn.querySelector('.btn__text');
    const l = submitBtn.querySelector('.btn__loading');
    if (t) t.style.display = state ? 'none' : '';
    if (l) l.style.display = state ? 'inline-flex' : 'none';
  }

  function showSuccess() {
    if (form) form.style.display = 'none';
    if (formSuccess) {
      formSuccess.style.display = 'block';
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* ─── Cursor accent (desktop) ────────────────────── */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = document.createElement('div');
    Object.assign(dot.style, {
      position: 'fixed', width: '7px', height: '7px',
      background: '#DAFF0F', borderRadius: '50%',
      pointerEvents: 'none', zIndex: '9999',
      mixBlendMode: 'difference',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.25s ease, height 0.25s ease, opacity 0.3s ease',
      opacity: '0',
    });
    document.body.appendChild(dot);

    let visible = false;
    document.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
      if (!visible) { dot.style.opacity = '1'; visible = true; }
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; visible = false; });

    document.querySelectorAll('a, button, .polaroid').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.style.width = '22px'; dot.style.height = '22px'; });
      el.addEventListener('mouseleave', () => { dot.style.width = '7px';  dot.style.height = '7px'; });
    });
  }

})();
