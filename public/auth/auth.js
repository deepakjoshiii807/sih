/**
 * SkillBridge Auth — Interactions
 * Handles login/signup switching, role selection,
 * multi-step signup, password strength, and validation.
 */
(function () {
  'use strict';

  /* ───────── DOM refs ───────── */
  const root    = document.querySelector('.bento');
  const tabs    = document.querySelectorAll('.auth-tab');
  const formL   = document.getElementById('form-login');
  const formS   = document.getElementById('form-signup');
  const step1   = document.getElementById('signup-step1');
  const step2   = document.getElementById('signup-step2');
  const roleCards = document.querySelectorAll('.role-card');
  const roleFields = document.querySelectorAll('.role-fields');
  const btnStep2 = document.getElementById('btn-to-step2');
  const btnBack  = document.getElementById('btn-back-role');
  const step2Title = document.getElementById('step2-title');
  const step2Sub  = document.getElementById('step2-sub');
  const pwToggles = document.querySelectorAll('.pw-toggle');

  let currentMode = root?.dataset.initialMode || 'login';
  let selectedRole = null;

  /* ───────── Tab / Mode Switching ───────── */
  function setMode(mode) {
    currentMode = mode;
    tabs.forEach(t => {
      const active = t.dataset.mode === mode;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active);
    });
    if (mode === 'login') {
      formL.classList.remove('hidden');
      formS.classList.add('hidden');
      resetSignup();
    } else {
      formL.classList.add('hidden');
      formS.classList.remove('hidden');
    }
  }

  tabs.forEach(t => t.addEventListener('click', () => setMode(t.dataset.mode)));

  // "Create one" / "Sign in" links
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => setMode(el.dataset.goto));
  });

  /* ───────── Role Selection ───────── */
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedRole = card.dataset.role;
      btnStep2.disabled = false;
    });
  });

  // Go to step 2
  btnStep2.addEventListener('click', () => {
    if (!selectedRole) return;
    step1.classList.add('hidden');
    step2.classList.remove('hidden');

    // Show relevant fields
    roleFields.forEach(f => {
      f.classList.toggle('hidden', f.dataset.for !== selectedRole);
    });

    const names = { student: 'Student', industry: 'Industry', academician: 'Academician', admin: 'Institution Admin' };
    step2Title.textContent = names[selectedRole] + ' Registration';
    step2Sub.textContent = 'Fill in your details to create a ' + names[selectedRole].toLowerCase() + ' account';
  });

  // Back to role selection
  btnBack.addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
  });

  function resetSignup() {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    roleCards.forEach(c => c.classList.remove('selected'));
    roleFields.forEach(f => f.classList.add('hidden'));
    selectedRole = null;
    btnStep2.disabled = true;
    formS.reset();
    document.querySelectorAll('.pw-strength').forEach(s => s.classList.remove('visible'));
  }

  /* ───────── Password Visibility Toggle ───────── */
  pwToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.querySelector('.eye-open').classList.toggle('hidden', !isPassword);
      btn.querySelector('.eye-closed').classList.toggle('hidden', isPassword);
    });
  });

  /* ───────── Password Strength ───────── */
  function calcStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  function getStrengthInfo(score) {
    const levels = [
      { label: 'Very weak', color: '#C0392B', bg: '#C0392B' },
      { label: 'Weak',      color: '#E67E22', bg: '#E67E22' },
      { label: 'Fair',      color: '#E8D36B', bg: '#E8D36B' },
      { label: 'Good',      color: '#2D6144', bg: '#2D6144' },
      { label: 'Strong',    color: '#244B35', bg: '#244B35' },
    ];
    return levels[Math.min(score, levels.length) - 1] || levels[0];
  }

  function updateStrength(input) {
    const pw = input.value;
    const group = input.closest('.form-group');
    const strengthEl = group?.querySelector('.pw-strength');
    if (!strengthEl) return;

    if (pw.length === 0) {
      strengthEl.classList.remove('visible');
      return;
    }
    strengthEl.classList.add('visible');

    const score = calcStrength(pw);
    const info = getStrengthInfo(score);
    const pct = (score / 5) * 100;

    const barFill = strengthEl.querySelector('.pw-bar-fill');
    const label = strengthEl.querySelector('.pw-label');
    barFill.style.width = pct + '%';
    barFill.style.background = info.bg;
    label.textContent = info.label;
    label.style.color = info.color;

    // Requirements
    const reqsEl = strengthEl.querySelector('.pw-reqs');
    const reqs = [
      { text: '8+ characters',   met: pw.length >= 8 },
      { text: 'Uppercase letter', met: /[A-Z]/.test(pw) },
      { text: 'Lowercase letter', met: /[a-z]/.test(pw) },
      { text: 'A number',         met: /\d/.test(pw) },
      { text: 'Special character', met: /[^A-Za-z0-9]/.test(pw) },
    ];
    reqsEl.innerHTML = reqs.map(r =>
      '<span class="pw-req' + (r.met ? ' met' : '') + '">' +
      '<svg viewBox="0 0 24 24">' + (r.met
        ? '<polyline points="20 6 9 17 4 12"/>'
        : '<circle cx="12" cy="12" r="10"/>') +
      '</svg>' + r.text + '</span>'
    ).join('');
  }

  // Bind password inputs for strength
  document.querySelectorAll('input[type="password"]').forEach(input => {
    input.addEventListener('input', () => updateStrength(input));
  });

  /* ───────── Form Validation ───────── */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, errorEl) {
    input.classList.add('error');
    if (errorEl) errorEl.classList.add('visible');
  }

  function clearError(input, errorEl) {
    input.classList.remove('error');
    if (errorEl) errorEl.classList.remove('visible');
  }

  // Login form
  formL.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email');
    const pw    = document.getElementById('login-password');
    const emailErr = document.getElementById('login-email-err');
    const pwErr    = document.getElementById('login-pw-err');
    let valid = true;

    clearError(email, emailErr);
    clearError(pw, pwErr);

    if (!validateEmail(email.value)) { showError(email, emailErr); valid = false; }
    if (!pw.value) { showError(pw, pwErr); valid = false; }

    if (valid) {
      const btn = formL.querySelector('.btn-primary');
      btn.textContent = 'Signing in...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = 'Sign In <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        btn.disabled = false;
        alert('Demo: Login successful for ' + email.value);
      }, 1200);
    }
  });

  // Signup form
  formS.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!selectedRole) return;

    // Validate visible required inputs
    const visibleFields = formS.querySelectorAll('.role-fields:not(.hidden) input[required], .role-fields:not(.hidden) select');
    let valid = true;

    visibleFields.forEach(input => {
      input.classList.remove('error');
      if (input.required && !input.value.trim()) {
        input.classList.add('error');
        valid = false;
      }
      if (input.type === 'email' && !validateEmail(input.value)) {
        input.classList.add('error');
        valid = false;
      }
    });

    // Check password strength
    const pwInput = formS.querySelector('.role-fields:not(.hidden) input[type="password"]');
    if (pwInput && calcStrength(pwInput.value) < 3) {
      pwInput.classList.add('error');
      valid = false;
    }

    if (valid) {
      const btn = document.getElementById('btn-create-account');
      btn.textContent = 'Creating account...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = 'Create Account <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        btn.disabled = false;
        alert('Demo: ' + selectedRole + ' account created successfully!');
      }, 1500);
    }
  });

  // Clear errors on input
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errEl = input.closest('.form-group')?.querySelector('.form-error');
      if (errEl) errEl.classList.remove('visible');
    });
  });

  /* ───────── Match Bar Animation ───────── */
  function animateMatchBar() {
    const fill = document.querySelector('.match-fill');
    if (!fill) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fill.style.width = fill.style.getPropertyValue('--fill-w') || '92%';
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    fill.style.width = '0%';
    observer.observe(fill.closest('.bento-card'));
  }

  /* ───────── Pipeline Animation ───────── */
  function animatePipeline() {
    const nodes = document.querySelectorAll('.pipeline-node');
    nodes.forEach((node, i) => {
      setTimeout(() => {
        if (!node.classList.contains('active')) {
          // Animate upcoming nodes: briefly flash
          node.style.transition = 'opacity 400ms ease';
          node.style.opacity = '0.4';
          setTimeout(() => { node.style.opacity = '1'; }, 400);
        }
      }, 300 + i * 200);
    });
  }

  /* ───────── Init ───────── */
  document.addEventListener('DOMContentLoaded', () => {
    setMode(currentMode);
    animateMatchBar();
    animatePipeline();
  });

  // If DOM already loaded
  if (document.readyState !== 'loading') {
    setMode(currentMode);
    animateMatchBar();
    animatePipeline();
  }
})();
