(() => {
  'use strict';



  /* Helpers*/

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const on = (el, ev, cb, opts) => el && el.addEventListener(ev, cb, opts);

  const isDesktopMQ = window.matchMedia('(min-width: 1024px)');

  /* Estado de filtros */
  const filters = { date: 'any', mode: 'all', exp: 'all' };
  const defaultFilters = { date: 'any', mode: 'all', exp: 'all' };

  /* Selectores cacheados */
  const listEl = qs('#jobList');
  const detailEl = qs('#jobDetail');
  const modalEl = qs('#mobileModal');
  const mobileDetailEl = qs('#mobileDetail');
  const clearFiltersBtn = qs('#clearFiltersBtn');

  const langBtn = qs('#langBtn');
  const langMenu = qs('#langMenu');

  const mobileMenuBtn = qs('#mobileMenuBtn');
  const mobileMenu = qs('#mobileMenu');
  const mobileLangBtn = qs('#mobileLangBtn');
  const mobileLangMenu = qs('#mobileLangMenu');

  const themeBtn = qs('#themeBtn');
  const mobileThemeBtn = qs('#mobileThemeBtn');


  const applyTheme = (theme) => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    updateThemeIcons();
  };

  const toggleTheme = () => {
    applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
  };

  const initTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  };

  const updateThemeIcons = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const desk = qs('#themeIconDesktop');
    const mob = qs('#themeIconMobile');

    const toSun = el => { el && el.classList.remove('fa-moon'); el && el.classList.add('fa-sun'); };
    const toMoon = el => { el && el.classList.remove('fa-sun'); el && el.classList.add('fa-moon'); };

    isDark ? (toSun(desk), toSun(mob)) : (toMoon(desk), toMoon(mob));
  };

  /* =========================
   * Templates
   * ========================= */
  const jobCardTemplate = (job) => `
    <article class="job-card rounded-xl2 border border-tpBorderAlt hover:border-tpBlue transition-colors p-4 cursor-pointer
                    dark:bg-slate-800 dark:border-slate-600"
            data-id="${job.id}" tabindex="0" role="button" aria-pressed="false">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="font-display text-lg font-semibold dark:text-white">${job.title}</h3>
          <p class="text-tpMuted dark:text-slate-300">${job.company}</p>
          <p class="text-tpMuted dark:text-slate-300">${job.location}</p>
          <p class="text-tpFaint mt-1 dark:text-slate-400">${job.age}</p>
        </div>
        <button title="Guardar" class="p-2 rounded-full hover:bg-tpSky/10" aria-label="Guardar">
          <i class="fa-solid fa-bookmark text-[18px] text-tpYellow"></i>
        </button>
      </div>
      <div class="mt-3">
        <button class="px-4 py-2 rounded-full bg-tpBlue hover:bg-tpBlueHover text-white">Postular</button>
      </div>
    </article>
  `;

  const detailHeader = (job, isMobile = false) => `
    <header class="mb-3 flex items-start justify-between gap-4">
      <div>
        <h2 class="font-display ${isMobile ? 'text-xl' : 'text-2xl'} font-bold dark:text-white">${job.title}</h2>
        <p class="text-tpMuted dark:text-slate-300">${job.company}</p>
        <p class="text-tpMuted dark:text-slate-300">${job.location}</p>
        <p class="text-tpMuted dark:text-slate-300">${job.salary}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="detail-save p-2 rounded-full hover:bg-tpSky/10" title="Guardar" aria-label="Guardar">
          <i class="fa-regular fa-bookmark text-[18px] text-tpIconSecondary dark:text-slate-200"></i>
        </button>
        <button class="detail-dismiss p-2 rounded-full hover:bg-tpSky/10" title="No quiero este trabajo" aria-label="No quiero este trabajo">
          <i class="fa-solid fa-ban text-[18px] text-tpIconSecondary dark:text-slate-200"></i>
        </button>
        <button class="detail-copy p-2 rounded-full hover:bg-tpSky/10" title="Copiar enlace" aria-label="Copiar enlace">
          <i class="fa-solid fa-link text-[16px] text-tpIconSecondary dark:text-slate-200"></i>
        </button>
      </div>
    </header>
  `;

  const detailBody = (job) => `
    <hr class="border-t-2 border-[#102748] dark:border-slate-600 my-4" />
    <section class="space-y-4">
      <div>
        <h3 class="font-semibold dark:text-white">Información del empleo</h3>
        <p class="mt-1 text-tpMuted dark:text-slate-300">${job.description}</p>
      </div>
      <div>
        <h4 class="font-semibold dark:text-white">Requisitos</h4>
        <ul class="list-disc ml-5 mt-1 text-tpMuted dark:text-slate-300">
          ${job.requirements.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
      <div>
        <h4 class="font-semibold dark:text-white">Beneficios</h4>
        <ul class="list-disc ml-5 mt-1 text-tpMuted dark:text-slate-300">
          ${job.benefits.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </section>
  `;

  const detailFooter = `
    <div class="mt-5 flex gap-2">
      <button class="px-5 py-2 rounded-full bg-tpYellow text-tpText font-semibold hover:brightness-95">Postular</button>
    </div>
  `;

  const detailTemplate = (job) => detailHeader(job, false) + detailBody(job) + detailFooter;
  const detailTemplateMobile = (job) => detailHeader(job, true) + detailBody(job);

  /* =========================
   * Render & Filtros
   * ========================= */
  const passesFilters = (job) => {
    const d = job.postedDays;
    if (filters.date === '24h' && d > 1) return false;
    if (filters.date === '7d' && d > 7) return false;
    if (filters.date === '30d' && d > 30) return false;
    if (filters.mode !== 'all' && job.modality !== filters.mode) return false;
    if (filters.exp !== 'all' && job.experience !== filters.exp) return false;
    return true;
  };

  function isAnyFilterActive() {
    return filters.date !== 'any' || filters.mode !== 'all' || filters.exp !== 'all';
  }

  function updateClearFiltersBtn() {
    if (!clearFiltersBtn) return;
    if (isAnyFilterActive()) {
      clearFiltersBtn.classList.remove('hidden');
    } else {
      clearFiltersBtn.classList.add('hidden');
    }
  }


  function updateFilterButtonLabels() {
    // Fecha
    const filterDateBtn = qs('#filter-date-btn');
    if (filterDateBtn) {
      let label = '';
      switch (filters.date) {
        case '24h': label = window.t('date24h'); break;
        case '7d': label = window.t('date7d'); break;
        case '30d': label = window.t('date30d'); break;
        default: label = window.t('date'); break;
      }
      filterDateBtn.querySelector('span').textContent = label;
    }
    // Modalidad
    const filterModeBtn = qs('#filter-mode-btn');
    if (filterModeBtn) {
      let label = '';
      switch (filters.mode) {
        case 'Remoto': label = window.t('modeRemote'); break;
        case 'Híbrido': label = window.t('modeHybrid'); break;
        case 'Presencial': label = window.t('modeOnsite'); break;
        case 'Remote': label = window.t('modeRemote'); break;
        case 'Hybrid': label = window.t('modeHybrid'); break;
        case 'Onsite': label = window.t('modeOnsite'); break;
        case 'all': label = window.t('mode'); break;
        default: label = window.t('mode'); break;
      }
      filterModeBtn.querySelector('span').textContent = label;
    }
    // Experiencia
    const filterExpBtn = qs('#filter-exp-btn');
    if (filterExpBtn) {
      let label = '';
      switch (filters.exp) {
        case 'Junior': label = window.t('expJunior'); break;
        case 'Semi Senior': label = window.t('expSemi'); break;
        case 'Senior': label = window.t('expSenior'); break;
        case 'all': label = window.t('exp'); break;
        default: label = window.t('exp'); break;
      }
      filterExpBtn.querySelector('span').textContent = label;
    }
  }

  window.renderList = function () {
    window.jobOffers = window.currentLang === 'es' ? window.jobOffersES : window.jobOffersEN;
    const data = window.jobOffers.filter(passesFilters);
    listEl.innerHTML = data.map(jobCardTemplate).join('') || `
      <div class="rounded-xl2 border border-tpBorderAlt p-4 text-tpMuted dark:text-slate-300 dark:border-slate-600 dark:bg-slate-800">
        ${window.t('noResults')}
      </div>
    `;
    updateClearFiltersBtn();
    updateFilterButtonLabels();
  };

  const selectCard = (cardEl) => {
    qsa('.job-card').forEach(c => {
      c.classList.remove('ring-2', 'ring-tpBlue');
      c.setAttribute('aria-pressed', 'false');
    });
    cardEl.classList.add('ring-2', 'ring-tpBlue');
    cardEl.setAttribute('aria-pressed', 'true');
  };

  /* =========================
   * Modal helpers
   * ========================= */
  const showModal = () => { modalEl.classList.remove('hidden'); modalEl.classList.add('flex'); };
  const hideModal = () => { modalEl.classList.add('hidden'); modalEl.classList.remove('flex'); };

  /* =========================
   * Dropdowns portalizados
   * ========================= */
  const initDropdown = (btnId, menuId, onSelect) => {
    const btn = qs(`#${btnId}`);
    const menu = qs(`#${menuId}`);
    if (!btn || !menu) return;

    // Guarda el padre original con id seguro
    const parent = menu.parentElement;
    if (!parent.id) parent.id = `parent_${menuId}_${Math.random().toString(36).slice(2, 7)}`;
    menu.dataset.parentId = parent.id;

    const openMenu = () => {
      const r = btn.getBoundingClientRect();
      menu.classList.remove('hidden');
      Object.assign(menu.style, {
        position: 'fixed',
        top: `${Math.round(r.bottom + 8)}px`,
        left: `${Math.round(Math.max(8, Math.min(window.innerWidth - 8 - r.width, r.left)))}px`,
        minWidth: `${Math.max(r.width, 200)}px`,
        zIndex: '1000'
      });
      document.body.appendChild(menu);
      menu.dataset.portaled = '1';
    };

    const closeMenu = () => {
      if (!menu.classList.contains('hidden')) menu.classList.add('hidden');
      if (menu.dataset.portaled === '1') {
        const back = qs(`#${menu.dataset.parentId}`);
        back && back.appendChild(menu);
        Object.assign(menu.style, { position: '', top: '', left: '', minWidth: '', zIndex: '' });
        delete menu.dataset.portaled;
      }
    };

    on(btn, 'click', (e) => {
      e.stopPropagation();
      if (menu.classList.contains('hidden')) {
        // cierra otros
        qsa('[data-portaled="1"]').forEach(m => {
          m.classList.add('hidden');
          const pid = m.dataset.parentId;
          const back = pid && qs(`#${pid}`);
          back && back.appendChild(m);
          Object.assign(m.style, { position: '', top: '', left: '', minWidth: '', zIndex: '' });
          delete m.dataset.portaled;
        });
        openMenu();
      } else {
        closeMenu();
      }
    });

    on(menu, 'click', (e) => {
      const opt = e.target.closest('.filter-opt');
      if (!opt) return;
      const val = opt.dataset.value || opt.textContent.trim();
      onSelect(val);
      closeMenu();
    });

    on(document, 'click', (e) => {
      if (!menu.classList.contains('hidden') &&
        !btn.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
      }
    }, { passive: true });

    on(window, 'scroll', closeMenu, { passive: true });
    on(window, 'resize', closeMenu, { passive: true });
  };

  /* =========================
   * Detalle (acciones) – handler compartido
   * ========================= */
  const handleDetailActions = (container) => (e) => {
    if (e.target.closest('.detail-copy')) {
      const url = location.origin + location.pathname + '#job';
      navigator.clipboard.writeText(url)
        .then(() => alert('Enlace copiado'))
        .catch(() => alert('No se pudo copiar'));
      return;
    }
    if (e.target.closest('.detail-dismiss')) {
      const active = qs('.job-card[aria-pressed="true"]');
      if (active) {
        const id = Number(active.dataset.id);
        const idx = jobOffers.findIndex(j => j.id === id);
        if (idx >= 0) jobOffers.splice(idx, 1);
        renderList();
        if (container === detailEl) {
          detailEl.innerHTML = `<div class="text-tpMuted dark:text-slate-300">Selecciona una oferta para ver los detalles</div>`;
        } else {
          hideModal();
        }
      }
    }
  };

  /* =========================
   * Responsive sync
   * ========================= */
  window.showDesktopDetailFromSelection = function () {
    let selected = qs('.job-card[aria-pressed="true"]') || qs('.job-card');
    if (!selected) return;
    const id = Number(selected.dataset.id);
    const job = window.jobOffers.find(j => j.id === id);
    if (job) detailEl.innerHTML = detailTemplate(job);
  };

  const setupResponsiveSync = () => {
    on(isDesktopMQ, 'change', (e) => {
      if (e.matches) {
        hideModal();
        showDesktopDetailFromSelection();
      }
    });
  };

  /* =========================
   * Eventos
   * ========================= */
  const attachEvents = () => {
    // Click en tarjeta (delegado)
    on(listEl, 'click', (e) => {
      const card = e.target.closest('.job-card');
      if (!card) return;
      const id = Number(card.dataset.id);
      const job = jobOffers.find(j => j.id === id);
      if (!job) return;

      if (isDesktopMQ.matches) {
        selectCard(card);
        detailEl.innerHTML = detailTemplate(job);
      } else {
        selectCard(card);
        mobileDetailEl.innerHTML = detailTemplateMobile(job);
        showModal();
      }
    });

    // Accesibilidad teclado
    on(listEl, 'keydown', (e) => {
      if (!['Enter', ' '].includes(e.key)) return;
      const card = e.target.closest('.job-card');
      if (card) card.click();
    });

    // Cerrar modal móvil
    on(qs('#closeModal'), 'click', hideModal);

    // Acciones detalle (desktop y móvil)
    on(detailEl, 'click', handleDetailActions(detailEl));
    on(mobileDetailEl, 'click', handleDetailActions(mobileDetailEl));

    // Idioma (desktop)
    on(langBtn, 'click', (e) => {
      e.stopPropagation();
      langMenu && langMenu.classList.toggle('hidden');
    });
    if (langMenu) {
      const btns = langMenu.querySelectorAll('button');
      if (btns[0]) on(btns[0], 'click', () => { window.setLang('es'); langMenu.classList.add('hidden'); });
      if (btns[1]) on(btns[1], 'click', () => { window.setLang('en'); langMenu.classList.add('hidden'); });
    }
    on(document, 'click', (e) => {
      if (langMenu && !langMenu.classList.contains('hidden') &&
        !langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.add('hidden');
      }
    });

    // Tema (desktop/móvil)
    on(themeBtn, 'click', toggleTheme);
    on(mobileThemeBtn, 'click', toggleTheme);

    // Menú móvil
    on(mobileMenuBtn, 'click', (e) => {
      e.stopPropagation();
      mobileMenu && mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
    });

    // Idioma móvil: mostrar/ocultar menú
    on(mobileLangBtn, 'click', (e) => {
      e.stopPropagation();
      if (mobileLangMenu) mobileLangMenu.classList.toggle('hidden');
    });
    if (mobileLangMenu) {
      const btns = mobileLangMenu.querySelectorAll('button');
      if (btns[0]) on(btns[0], 'click', () => { window.setLang('es'); mobileLangMenu.classList.add('hidden'); });
      if (btns[1]) on(btns[1], 'click', () => { window.setLang('en'); mobileLangMenu.classList.add('hidden'); });
    }
    on(document, 'click', (e) => {
      // Cerrar menú móvil
      if (mobileMenu && !mobileMenu.classList.contains('hidden') &&
        !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
      // Cerrar menú de idioma móvil
      if (mobileLangMenu && !mobileLangMenu.classList.contains('hidden') &&
        !mobileLangBtn.contains(e.target) && !mobileLangMenu.contains(e.target)) {
        mobileLangMenu.classList.add('hidden');
      }
    });

    // Dropdowns de filtros
    initDropdown('filter-date-btn', 'filter-date-menu', (val) => { filters.date = val; renderList(); });
    initDropdown('filter-mode-btn', 'filter-mode-menu', (val) => { filters.mode = val; renderList(); });
    initDropdown('filter-exp-btn', 'filter-exp-menu', (val) => { filters.exp = val; renderList(); });

    // Botón quitar filtros
    if (clearFiltersBtn) {
      on(clearFiltersBtn, 'click', () => {
        filters.date = 'any';
        filters.mode = 'all';
        filters.exp = 'all';
        renderList();
      });
    }
  };


  /* =========================
   * Init
   * ========================= */
  initTheme();
  attachEvents();
  setupResponsiveSync();
  window.renderList();
  updateClearFiltersBtn();
  updateFilterButtonLabels();
  window.showDesktopDetailFromSelection();
  window.applyTranslations();

  // Detalle por defecto SOLO en desktop
  if (isDesktopMQ.matches && (window.jobOffers && window.jobOffers[0])) {
    detailEl.innerHTML = detailTemplate(window.jobOffers[0]);
    const firstCard = qs('.job-card');
    if (firstCard) selectCard(firstCard);
  }
})();
