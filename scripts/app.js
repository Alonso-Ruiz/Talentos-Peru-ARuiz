(() => {
  'use strict';

  /* =========================
   * Datos demo
   * ========================= */
  const jobOffers = [
    {
      id: 1,
      title: "Desarrollador Web",
      company: "Importador S.A.C",
      location: "San Isidro – Lima",
      modality: "Remoto",
      salary: "Desde S/2,000 – S/2,500",
      age: "Hace 2 días",
      postedDays: 2,
      experience: "Junior",
      description:
        "Buscamos un desarrollador con foco en UI limpia y accesible. Implementarás vistas responsivas con Tailwind.",
      requirements: ["HTML", "CSS (Tailwind)", "JavaScript (Vanilla)", "Accesibilidad"],
      benefits: ["Planilla desde el primer día", "Horarios flexibles", "Bonificación de alimentos"]
    },
    {
      id: 2,
      title: "Analista Técnico",
      company: "NTT DATA S.A.C",
      location: "San Borja – Lima",
      modality: "Híbrido",
      salary: "S/3,500 – S/4,500",
      age: "Hace 1 semana",
      postedDays: 7,
      experience: "Semi Senior",
      description:
        "Rol de análisis y soporte a equipos de desarrollo. Documentación y validaciones UAT.",
      requirements: ["Requerimientos", "Pruebas UAT", "SQL básico"],
      benefits: ["EPS 70%", "Capacitaciones", "Trabajo híbrido"]
    },
    {
      id: 3,
      title: "Front-End Developer",
      company: "Tech Perú",
      location: "Remoto",
      modality: "Presencial",
      salary: "Hasta S/6,000",
      age: "Hoy",
      postedDays: 0,
      experience: "Senior",
      description:
        "UI components, performance y buenas prácticas de accesibilidad. Trabajo 100% remoto.",
      requirements: ["Tailwind", "Performance Web", "Git / PR Flow"],
      benefits: ["Remoto", "Equipo senior", "Horario flexible"]
    },
    {
      id: 4,
      title: "QA Tester",
      company: "Andes Digital",
      location: "Miraflores – Lima",
      modality: "Híbrido",
      salary: "S/3,000 – S/3,800",
      age: "Hace 3 días",
      postedDays: 3,
      experience: "Junior",
      description:
        "Ejecución de planes de prueba manuales, reporte de bugs y colaboración con Devs para asegurar la calidad.",
      requirements: ["Casos de prueba", "JIRA/Asana", "Conocimientos de API (básico)"],
      benefits: ["Planilla", "Capacitaciones", "Horario flexible"]
    }
  ];

  /* =========================
   * Helpers
   * ========================= */
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const on = (el, ev, cb, opts) => el && el.addEventListener(ev, cb, opts);

  const isDesktopMQ = window.matchMedia('(min-width: 1024px)');

  /* =========================
   * Estado de filtros
   * ========================= */
  const filters = { date: 'any', mode: 'all', exp: 'all' };

  /* =========================
   * Selectores cacheados
   * ========================= */
  const listEl         = qs('#jobList');
  const detailEl       = qs('#jobDetail');
  const modalEl        = qs('#mobileModal');
  const mobileDetailEl = qs('#mobileDetail');

  const langBtn        = qs('#langBtn');
  const langMenu       = qs('#langMenu');

  const mobileMenuBtn  = qs('#mobileMenuBtn');
  const mobileMenu     = qs('#mobileMenu');
  const mobileLangBtn  = qs('#mobileLangBtn');
  const mobileLangMenu = qs('#mobileLangMenu');

  const themeBtn       = qs('#themeBtn');
  const mobileThemeBtn = qs('#mobileThemeBtn');

  /* =========================
   * Tema (persistencia + iconos)
   * ========================= */
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
    const mob  = qs('#themeIconMobile');

    const toSun  = el => { el && el.classList.remove('fa-moon'); el && el.classList.add('fa-sun'); };
    const toMoon = el => { el && el.classList.remove('fa-sun');  el && el.classList.add('fa-moon'); };

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

  const detailTemplate        = (job) => detailHeader(job, false) + detailBody(job) + detailFooter;
  const detailTemplateMobile  = (job) => detailHeader(job, true)  + detailBody(job);

  /* =========================
   * Render & Filtros
   * ========================= */
  const passesFilters = (job) => {
    const d = job.postedDays;
    if (filters.date === '24h' && d > 1)  return false;
    if (filters.date === '7d'  && d > 7)  return false;
    if (filters.date === '30d' && d > 30) return false;
    if (filters.mode !== 'all' && job.modality   !== filters.mode) return false;
    if (filters.exp  !== 'all' && job.experience !== filters.exp)  return false;
    return true;
  };

  const renderList = () => {
    const data = jobOffers.filter(passesFilters);
    listEl.innerHTML = data.map(jobCardTemplate).join('') || `
      <div class="rounded-xl2 border border-tpBorderAlt p-4 text-tpMuted dark:text-slate-300 dark:border-slate-600 dark:bg-slate-800">
        No hay resultados con los filtros actuales.
      </div>
    `;
  };

  const selectCard = (cardEl) => {
    qsa('.job-card').forEach(c => {
      c.classList.remove('ring-2','ring-tpBlue');
      c.setAttribute('aria-pressed','false');
    });
    cardEl.classList.add('ring-2','ring-tpBlue');
    cardEl.setAttribute('aria-pressed','true');
  };

  /* =========================
   * Modal helpers
   * ========================= */
  const showModal = () => { modalEl.classList.remove('hidden'); modalEl.classList.add('flex'); };
  const hideModal = () => { modalEl.classList.add('hidden');   modalEl.classList.remove('flex'); };

  /* =========================
   * Dropdowns portalizados
   * ========================= */
  const initDropdown = (btnId, menuId, onSelect) => {
    const btn  = qs(`#${btnId}`);
    const menu = qs(`#${menuId}`);
    if (!btn || !menu) return;

    // Guarda el padre original con id seguro
    const parent = menu.parentElement;
    if (!parent.id) parent.id = `parent_${menuId}_${Math.random().toString(36).slice(2,7)}`;
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
        Object.assign(menu.style, { position:'', top:'', left:'', minWidth:'', zIndex:'' });
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
          Object.assign(m.style, { position:'', top:'', left:'', minWidth:'', zIndex:'' });
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
  const showDesktopDetailFromSelection = () => {
    let selected = qs('.job-card[aria-pressed="true"]') || qs('.job-card');
    if (!selected) return;
    const id = Number(selected.dataset.id);
    const job = jobOffers.find(j => j.id === id);
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
      if (!['Enter',' '].includes(e.key)) return;
      const card = e.target.closest('.job-card');
      if (card) card.click();
    });

    // Cerrar modal móvil
    on(qs('#closeModal'), 'click', hideModal);

    // Acciones detalle (desktop y móvil)
    on(detailEl,       'click', handleDetailActions(detailEl));
    on(mobileDetailEl, 'click', handleDetailActions(mobileDetailEl));

    // Idioma (desktop)
    on(langBtn, 'click', (e) => {
      e.stopPropagation();
      langMenu && langMenu.classList.toggle('hidden');
    });
    on(document, 'click', (e) => {
      if (langMenu && !langMenu.classList.contains('hidden') &&
          !langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.add('hidden');
      }
    });

    // Tema (desktop/móvil)
    on(themeBtn,       'click', toggleTheme);
    on(mobileThemeBtn, 'click', toggleTheme);

    // Menú móvil
    on(mobileMenuBtn, 'click', (e) => {
      e.stopPropagation();
      mobileMenu && mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
    });
    on(document, 'click', (e) => {
      if (mobileMenu && !mobileMenu.classList.contains('hidden') &&
          !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Dropdowns de filtros
    initDropdown('filter-date-btn', 'filter-date-menu', (val) => { filters.date = val; renderList(); });
    initDropdown('filter-mode-btn', 'filter-mode-menu', (val) => { filters.mode = val; renderList(); });
    initDropdown('filter-exp-btn',  'filter-exp-menu',  (val) => { filters.exp  = val; renderList(); });
  };

  /* =========================
   * Init
   * ========================= */
  initTheme();
  renderList();
  attachEvents();
  setupResponsiveSync();

  // Detalle por defecto SOLO en desktop
  if (isDesktopMQ.matches && jobOffers[0]) {
    detailEl.innerHTML = detailTemplate(jobOffers[0]);
    const firstCard = qs('.job-card');
    if (firstCard) selectCard(firstCard);
  }
})();
