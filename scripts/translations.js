// translations.js
// Sistema de traducción y datos de ofertas en ES/EN para Talentos Perú

const translations = {
    es: {
        pageTitle: 'Talentos Perú — Lista de Ofertas',
        jobTitle: 'Título de empleo',
        location: 'Lugar',
        search: 'Buscar',
        saved: 'Guardados',
        profile: 'Mi perfil',
        date: 'Fecha de publicación',
        dateAny: 'Cualquier fecha',
        date24h: 'Últimas 24 horas',
        date7d: 'Últimos 7 días',
        date30d: 'Últimos 30 días',
        mode: 'Modalidad',
        modeAll: 'Todas',
        modeRemote: 'Remoto',
        modeHybrid: 'Híbrido',
        modeOnsite: 'Presencial',
        exp: 'Experiencia',
        expAll: 'Todas',
        expJunior: 'Junior',
        expSemi: 'Semi Senior',
        expSenior: 'Senior',
        noResults: 'No hay resultados con los filtros actuales.',
        selectOffer: 'Selecciona una oferta para ver los detalles',
        jobDetail: 'Detalle del empleo',
        apply: 'Postular',
        info: 'Información del empleo',
        requirements: 'Requisitos',
        benefits: 'Beneficios',
        close: 'Cerrar',
        copy: 'Copiar enlace',
        dismiss: 'No quiero este trabajo',
        save: 'Guardar',
        today: 'Hoy',
        week: 'Hace 1 semana',
        days: d => `Hace ${d} días`,
        langES: 'Español',
        langEN: 'English',
    },
    en: {
        pageTitle: 'Talents Peru — Job Listings',
        jobTitle: 'Job title',
        location: 'Location',
        search: 'Search',
        saved: 'Saved',
        profile: 'My profile',
        date: 'Date posted',
        dateAny: 'Any date',
        date24h: 'Last 24 hours',
        date7d: 'Last 7 days',
        date30d: 'Last 30 days',
        mode: 'Modality',
        modeAll: 'All',
        modeRemote: 'Remote',
        modeHybrid: 'Hybrid',
        modeOnsite: 'Onsite',
        exp: 'Experience',
        expAll: 'All',
        expJunior: 'Junior',
        expSemi: 'Semi Senior',
        expSenior: 'Senior',
        noResults: 'No results with current filters.',
        selectOffer: 'Select a job to see details',
        jobDetail: 'Job detail',
        apply: 'Apply',
        info: 'Job information',
        requirements: 'Requirements',
        benefits: 'Benefits',
        close: 'Close',
        copy: 'Copy link',
        dismiss: 'Not interested',
        save: 'Save',
        today: 'Today',
        week: '1 week ago',
        days: d => `${d} days ago`,
        langES: 'Español',
        langEN: 'English',
    }
};

let currentLang = localStorage.getItem('lang') || 'es';

function setLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
}

function t(key, ...args) {
    const tr = translations[currentLang][key];
    if (typeof tr === 'function') return tr(...args);
    return tr || key;
}

// Datos base de ofertas (sin textos traducidos)
const jobOffersBase = [
    {
        id: 1,
        company: "Importador S.A.C",
        location: "San Isidro – Lima",
        postedDays: 2,
        experience: "Junior",
        es: {
            title: "Desarrollador Web",
            modality: "Remoto",
            salary: "Desde S/2,000 – S/2,500",
            ageType: 'days',
            ageValue: 2,
            description: "Buscamos un desarrollador con foco en UI limpia y accesible. Implementarás vistas responsivas con Tailwind.",
            requirements: ["HTML", "CSS (Tailwind)", "JavaScript (Vanilla)", "Accesibilidad"],
            benefits: ["Planilla desde el primer día", "Horarios flexibles", "Bonificación de alimentos"]
        },
        en: {
            title: "Web Developer",
            modality: "Remote",
            salary: "From S/2,000 – S/2,500",
            ageType: 'days',
            ageValue: 2,
            description: "We are looking for a developer focused on clean and accessible UI. You will implement responsive views with Tailwind.",
            requirements: ["HTML", "CSS (Tailwind)", "JavaScript (Vanilla)", "Accessibility"],
            benefits: ["Payroll from day one", "Flexible hours", "Food bonus"]
        }
    },
    {
        id: 2,
        company: "NTT DATA S.A.C",
        location: "San Borja – Lima",
        postedDays: 7,
        experience: "Semi Senior",
        es: {
            title: "Analista Técnico",
            modality: "Híbrido",
            salary: "S/3,500 – S/4,500",
            ageType: 'week',
            description: "Rol de análisis y soporte a equipos de desarrollo. Documentación y validaciones UAT.",
            requirements: ["Requerimientos", "Pruebas UAT", "SQL básico"],
            benefits: ["EPS 70%", "Capacitaciones", "Trabajo híbrido"]
        },
        en: {
            title: "Technical Analyst",
            modality: "Hybrid",
            salary: "S/3,500 – S/4,500",
            ageType: 'week',
            description: "Analysis role and support for development teams. Documentation and UAT validations.",
            requirements: ["Requirements", "UAT Testing", "Basic SQL"],
            benefits: ["EPS 70%", "Training", "Hybrid work"]
        }
    },
    {
        id: 3,
        company: "Tech Perú",
        location: "Remoto",
        postedDays: 0,
        experience: "Senior",
        es: {
            title: "Front-End Developer",
            modality: "Presencial",
            salary: "Hasta S/6,000",
            ageType: 'today',
            description: "UI components, performance y buenas prácticas de accesibilidad. Trabajo 100% remoto.",
            requirements: ["Tailwind", "Performance Web", "Git / PR Flow"],
            benefits: ["Remoto", "Equipo senior", "Horario flexible"]
        },
        en: {
            title: "Front-End Developer",
            modality: "Onsite",
            salary: "Up to S/6,000",
            ageType: 'today',
            description: "UI components, performance and accessibility best practices. 100% remote work.",
            requirements: ["Tailwind", "Web Performance", "Git / PR Flow"],
            benefits: ["Remote", "Senior team", "Flexible schedule"]
        }
    },
    {
        id: 4,
        company: "Andes Digital",
        location: "Miraflores – Lima",
        postedDays: 3,
        experience: "Junior",
        es: {
            title: "QA Tester",
            modality: "Híbrido",
            salary: "S/3,000 – S/3,800",
            ageType: 'days',
            ageValue: 3,
            description: "Ejecución de planes de prueba manuales, reporte de bugs y colaboración con Devs para asegurar la calidad.",
            requirements: ["Casos de prueba", "JIRA/Asana", "Conocimientos de API (básico)"],
            benefits: ["Planilla", "Capacitaciones", "Horario flexible"]
        },
        en: {
            title: "QA Tester",
            modality: "Hybrid",
            salary: "S/3,000 – S/3,800",
            ageType: 'days',
            ageValue: 3,
            description: "Execution of manual test plans, bug reporting and collaboration with Devs to ensure quality.",
            requirements: ["Test cases", "JIRA/Asana", "API knowledge (basic)"],
            benefits: ["Payroll", "Training", "Flexible schedule"]
        }
    }
];

function buildJobOffers(lang) {
    return jobOffersBase.map(base => {
        const data = base[lang];
        return {
            id: base.id,
            title: data.title,
            company: base.company,
            location: base.location,
            modality: data.modality,
            salary: data.salary,
            age: data.ageType === 'days' ? t('days', data.ageValue) : t(data.ageType),
            postedDays: base.postedDays,
            experience: base.experience,
            description: data.description,
            requirements: data.requirements,
            benefits: data.benefits
        };
    });
}

let jobOffersES = buildJobOffers('es');
let jobOffersEN = buildJobOffers('en');

// Exponer helpers y datos globalmente para app.js
window.setLang = function (lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    // Regenerar ofertas en ambos idiomas
    jobOffersES = buildJobOffers('es');
    jobOffersEN = buildJobOffers('en');
    window.jobOffersES = jobOffersES;
    window.jobOffersEN = jobOffersEN;
    window.currentLang = currentLang;
    applyTranslations();
};
window.t = t;
window.jobOffersES = jobOffersES;
window.jobOffersEN = jobOffersEN;
window.currentLang = currentLang;
window.translations = translations;

// applyTranslations debe ser definida aquí para que app.js la invoque
window.applyTranslations = function applyTranslations() {
    // Título de la página
    document.title = t('pageTitle');
    // Inputs y placeholders
    const q = document.getElementById('q');
    if (q) q.placeholder = t('jobTitle');
    const qd = document.getElementById('q-desktop');
    if (qd) qd.placeholder = t('jobTitle');
    const loc = document.getElementById('loc');
    if (loc) loc.placeholder = t('location');
    // Botón buscar
    const btnSearch = document.getElementById('btnSearch');
    if (btnSearch) {
        const span = btnSearch.querySelector('span.sr-only');
        if (span) span.textContent = t('search');
    }
    // Menú desktop
    const nav = document.querySelector('nav.flex.items-center');
    if (nav) {
        const btns = nav.querySelectorAll('button[title],button[aria-label]');
        btns.forEach(btn => {
            if (btn.title === 'Guardados' || btn.getAttribute('aria-label') === 'Guardados') btn.title = btn.setAttribute('aria-label', t('saved'));
            if (btn.title === 'Perfil' || btn.getAttribute('aria-label') === 'Perfil') btn.title = btn.setAttribute('aria-label', t('profile'));
        });
    }
    // Filtros
    const filterDateBtn = document.getElementById('filter-date-btn');
    if (filterDateBtn) filterDateBtn.querySelector('span').textContent = t('date');
    const filterModeBtn = document.getElementById('filter-mode-btn');
    if (filterModeBtn) filterModeBtn.querySelector('span').textContent = t('mode');
    const filterExpBtn = document.getElementById('filter-exp-btn');
    if (filterExpBtn) filterExpBtn.querySelector('span').textContent = t('exp');
    // Filtros menú
    const dateMenu = document.getElementById('filter-date-menu');
    if (dateMenu) {
        const opts = dateMenu.querySelectorAll('button');
        if (opts[0]) opts[0].textContent = t('dateAny');
        if (opts[1]) opts[1].textContent = t('date24h');
        if (opts[2]) opts[2].textContent = t('date7d');
        if (opts[3]) opts[3].textContent = t('date30d');
    }
    const modeMenu = document.getElementById('filter-mode-menu');
    if (modeMenu) {
        const opts = modeMenu.querySelectorAll('button');
        if (opts[0]) opts[0].textContent = t('modeAll');
        if (opts[1]) opts[1].textContent = t('modeRemote');
        if (opts[2]) opts[2].textContent = t('modeHybrid');
        if (opts[3]) opts[3].textContent = t('modeOnsite');
    }
    const expMenu = document.getElementById('filter-exp-menu');
    if (expMenu) {
        const opts = expMenu.querySelectorAll('button');
        if (opts[0]) opts[0].textContent = t('expAll');
        if (opts[1]) opts[1].textContent = t('expJunior');
        if (opts[2]) opts[2].textContent = t('expSemi');
        if (opts[3]) opts[3].textContent = t('expSenior');
    }
    // Menú idioma
    // Desktop
    const langMenu = document.getElementById('langMenu');
    if (langMenu) {
        const btns = langMenu.querySelectorAll('button');
        if (btns[0]) btns[0].innerHTML = '<i class="fa-solid fa-flag mr-2"></i>' + t('langES');
        if (btns[1]) btns[1].innerHTML = '<i class="fa-solid fa-flag-usa mr-2"></i>' + t('langEN');
    }
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.innerHTML = (currentLang === 'es' ? '<i class="fa-solid fa-flag mr-2"></i>ES' : '<i class="fa-solid fa-flag-usa mr-2"></i>EN') + ' <i class="fa-solid fa-chevron-down text-[14px]"></i>';
    }
    // Mobile
    const mobileLangMenu = document.getElementById('mobileLangMenu');
    if (mobileLangMenu) {
        const btns = mobileLangMenu.querySelectorAll('button');
        if (btns[0]) btns[0].innerHTML = '<i class="fa-solid fa-flag mr-2"></i>' + t('langES');
        if (btns[1]) btns[1].innerHTML = '<i class="fa-solid fa-flag-usa mr-2"></i>' + t('langEN');
    }
    const mobileLangBtn = document.getElementById('mobileLangBtn');
    if (mobileLangBtn) {
        mobileLangBtn.querySelector('span').innerHTML = (currentLang === 'es' ? '<i class="fa-solid fa-flag mr-2"></i>ES' : '<i class="fa-solid fa-flag-usa mr-2"></i>EN');
    }
    // Modal y detalle
    const modalTitle = document.querySelector('#mobileModal h3');
    if (modalTitle) modalTitle.textContent = t('jobDetail');
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) closeModalBtn.setAttribute('aria-label', t('close'));
    // Botón postular en modal
    const modalApply = document.querySelector('#mobileModal button.w-full');
    if (modalApply) modalApply.textContent = t('apply');
    // Mensaje detalle vacío
    const detailEl = document.getElementById('jobDetail');
    if (detailEl && detailEl.children.length === 1) {
        const div = detailEl.querySelector('div');
        if (div) div.textContent = t('selectOffer');
    }
    // Renderizar lista y detalle SIEMPRE al cambiar idioma
    if (window.renderList) window.renderList();
    if (window.showDesktopDetailFromSelection) window.showDesktopDetailFromSelection();
};