// projects.js — Sin imágenes locales
// Previews: thum.io para sitios web · placeholder estilizado para apps

const projectsData = [
  {
    title: "ParDos: Zen Math",
    subtitle: "Puzzle Game · Google Play Store",
    description: "Evolución del clásico 2048 publicada en Google Play con certificación global IARC. Arquitectura 100% Jetpack Compose con animaciones Juicy UI, 80+ logros únicos y soporte para orientación vertical/horizontal.",
    impact: "Publicada · Certificación IARC · 80+ logros",
    tags: ["Kotlin", "Jetpack Compose", "Android", "UX/UI", "Google Play"],
    repoUrl: "https://github.com/KorKoor/ParDos-Puzzle-Game",
    liveUrl: "https://play.google.com/store/apps/details?id=com.korkoor.pardos",
    previewUrl: "https://www.korwork.org/pardos.html", 
    placeholderIcon: "fa-puzzle-piece",
    placeholderLabel: "Android · Google Play",
    badge: "🎮 Publicada",
    badgeColor: "#00875F",
  },
  {
    title: "ACIF — Diabetes Monitor",
    subtitle: "HealthTech · Colaboración UAA",
    description: "App móvil para monitoreo de glucosa en pacientes diabéticos, desarrollada con el Departamento de Enfermería de la UAA. Gestión de fases de tratamiento, reportes y accesibilidad médica.",
    impact: "Colaboración institucional UAA · Sector salud",
    tags: ["Kotlin", "Android", "HealthTech", "SQLite", "UX Médico"],
    repoUrl: "https://github.com/KorKoor/Diabetes_App_ACIF",
    liveUrl: "https://www.mediafire.com/file/j9kd47buqd2lgxw/ACIF-Diabetes.apk/file",
    previewUrl: null, // APK sin sitio web
    placeholderIcon: "fa-tint",
    placeholderLabel: "HealthTech · Android",
    badge: "🏥 HealthTech",
    badgeColor: "#1976D2",
  },
  {
    title: "PLAY-ZONE Social Network",
    subtitle: "Full Stack · API RESTful propia",
    description: "Plataforma social Full Stack para gamers con perfiles, guías interactivas y reseñas. API RESTful propia con autenticación y persistencia de datos. Producto completo end-to-end.",
    impact: "Full Stack end-to-end · API propia",
    tags: ["JavaScript", "React", "Node.js", "REST API", "MongoDB"],
    repoUrl: "https://github.com/KorKoor/PLAY-ZONE",
    liveUrl: null,
    previewUrl: null,
    placeholderIcon: "fa-gamepad",
    placeholderLabel: "Full Stack · Web",
    badge: "🌐 Full Stack",
    badgeColor: "#7B1FA2",
  },
  {
    title: "CV Analyzer — KorWork",
    subtitle: "SaaS Tool · Serverless · JS Puro",
    description: "Analiza CVs en PDF con un motor de clusters en JS puro — sin IA, sin NLP. Detecta perfiles de cualquier carrera y encuentra vacantes reales en LinkedIn, OCC, Indeed y Computrabajo vía funciones serverless en Vercel.",
    impact: "Cualquier carrera · 5 portales · Serverless",
    tags: ["JavaScript", "Vercel", "Serverless", "PDF.js", "Web Scraping"],
    repoUrl: "https://github.com/KorKoor/CV_Analyzer",
    liveUrl: "https://cv.korwork.org",
    previewUrl: "https://cv.korwork.org",
    placeholderIcon: "fa-file-alt",
    placeholderLabel: "SaaS · Live",
    badge: "🚀 Live",
    badgeColor: "#00875F",
  },
  {
    title: "Sudoku Solver ADN",
    subtitle: "Computación Evolutiva · C++",
    description: "Solucionador de sudokus 9×9 con Algoritmos Genéticos: mutación, selección natural y evolución iterativa. Alto rendimiento en C++ con metaheurísticas de optimización.",
    impact: "Algoritmos Genéticos · Optimización NP-Hard",
    tags: ["C++", "Algoritmos Genéticos", "Optimización", "Lógica"],
    repoUrl: "https://github.com/KorKoor/Sudoku_ADN",
    liveUrl: null,
    previewUrl: null,
    placeholderIcon: "fa-brain",
    placeholderLabel: "C++ · Algoritmos",
    badge: "🧬 Algoritmos",
    badgeColor: "#E65100",
  },
  {
    title: "Stream Overlays — KorWork",
    subtitle: "WebSockets · OBS · Twitch",
    description: "Suite de overlays para streaming en tiempo real. Chat de Twitch vía WebSockets, pantalla BRB con marco para video y animación de galaxia de partículas para cierre. HTML/CSS/JS puro.",
    impact: "WebSockets en tiempo real · Producción visual",
    tags: ["JavaScript", "WebSockets", "CSS Animations", "Twitch API"],
    repoUrl: "https://github.com/KorKoor",
    liveUrl: "https://stream.korwork.org/OnlineScreen.html",
    previewUrl: "https://stream.korwork.org/OnlineScreen.html",
    placeholderIcon: "fa-broadcast-tower",
    placeholderLabel: "Live · Twitch",
    badge: "🎙️ Live",
    badgeColor: "#9146FF",
  },
];

// ── Estilos — inyectados una sola vez ─────────────────────────
let _injected = false;
function injectStyles() {
  if (_injected) return;
  _injected = true;
  const s = document.createElement('style');
  s.textContent = `
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
    .project-card {
      background: #fff;
      border: 1px solid #EFEBE9;
      border-radius: 20px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
      position: relative;
      overflow: hidden;
      contain: layout style;
    }
    .project-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      border-radius: 20px 20px 0 0;
      background: var(--pc, #8D6E63);
    }
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 40px rgba(62,39,35,.11);
      border-color: var(--pc, #8D6E63);
    }
    /* Preview */
    .proj-preview {
      width: 100%;
      height: 160px;
      border-radius: 12px;
      overflow: hidden;
      background: #F5F0ED;
      margin-bottom: 16px;
      flex-shrink: 0;
      border: 1px solid #EFEBE9;
      position: relative;
    }
    .proj-preview img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: top center;
      display: block;
      transition: transform .4s ease;
    }
    .project-card:hover .proj-preview img { transform: scale(1.05); }
    /* Placeholder estilizado */
    .proj-placeholder {
      width: 100%; height: 100%;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 10px;
      background: linear-gradient(135deg, var(--pc, #8D6E63)18, #fff 100%);
      background: linear-gradient(135deg,
        color-mix(in srgb, var(--pc, #8D6E63) 12%, white) 0%,
        color-mix(in srgb, var(--pc, #8D6E63) 4%, white) 100%);
    }
    .proj-placeholder i {
      font-size: 2.4rem;
      color: var(--pc, #8D6E63);
      opacity: .7;
    }
    .proj-placeholder span {
      font-size: .68rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .12em;
      color: var(--pc, #8D6E63);
      opacity: .6;
    }
    /* Texto */
    .proj-top { margin-bottom: 6px; }
    .proj-badge {
      font-size: .62rem; font-weight: 800;
      text-transform: uppercase; letter-spacing: .1em;
      padding: 3px 10px; border-radius: 99px; color: white;
    }
    .project-title {
      font-size: 1.05rem; font-weight: 800; color: #3E2723;
      margin: 8px 0 3px; line-height: 1.3;
    }
    .project-subtitle {
      font-size: .68rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .1em;
      color: var(--pc, #8D6E63); margin-bottom: 10px;
    }
    .project-desc {
      font-size: .82rem; color: #5D4037;
      line-height: 1.65; flex: 1; margin-bottom: 12px;
    }
    .project-impact {
      font-size: .7rem; font-weight: 700; color: #8D6E63;
      background: #FFF8F6; border: 1px solid #EFEBE9;
      border-radius: 8px; padding: 5px 11px; margin-bottom: 12px;
    }
    .project-impact::before { content: '→ '; }
    .proj-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 16px; }
    .proj-tag {
      font-size: .68rem; font-weight: 700; padding: 2px 9px;
      border-radius: 99px; background: #EFEBE9; color: #5D4037;
      border: 1px solid transparent; transition: all .15s;
    }
    .proj-tag:hover {
      border-color: var(--pc, #8D6E63);
      color: var(--pc, #8D6E63); background: #fff;
    }
    .proj-actions { display: flex; gap: 8px; margin-top: auto; }
    .proj-btn {
      flex: 1; text-align: center; padding: 9px 10px;
      border-radius: 10px; font-size: .72rem; font-weight: 800;
      text-decoration: none; transition: all .2s;
    }
    .proj-btn-primary { background: #3E2723; color: white; }
    .proj-btn-primary:hover {
      background: var(--pc, #8D6E63); transform: translateY(-2px);
    }
    .proj-btn-secondary {
      background: transparent; color: #5D4037;
      border: 2px solid #EFEBE9;
    }
    .proj-btn-secondary:hover {
      border-color: var(--pc, #8D6E63); color: var(--pc, #8D6E63);
    }
  `;
  document.head.appendChild(s);
}

// ── Preview: thum.io o placeholder estilizado ──────────────────
function buildPreview(proj) {
  if (proj.previewUrl) {
    const url = `https://image.thum.io/get/width/800/crop/450/noanimate/${encodeURIComponent(proj.previewUrl)}`;
    const fallback = `this.closest('.proj-preview').innerHTML='<div class="proj-placeholder"><i class="fas ${proj.placeholderIcon}"></i><span>${proj.placeholderLabel}</span></div>'`;
    return `<div class="proj-preview">
      <img src="${url}" alt="Preview ${proj.title}" loading="lazy" decoding="async" onerror="${fallback}">
    </div>`;
  }
  return `<div class="proj-preview">
    <div class="proj-placeholder">
      <i class="fas ${proj.placeholderIcon}"></i>
      <span>${proj.placeholderLabel}</span>
    </div>
  </div>`;
}

// ── Export ─────────────────────────────────────────────────────
export function loadProjects(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  injectStyles();
  container.innerHTML = '';
  container.className = 'projects-grid';

  const fragment = document.createDocumentFragment();

  projectsData.forEach((proj, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.cssText = `--pc:${proj.badgeColor};animation-delay:${i * 60}ms`;
    card.innerHTML = `
      ${buildPreview(proj)}
      <div class="proj-top">
        <span class="proj-badge" style="background:${proj.badgeColor}">${proj.badge}</span>
      </div>
      <h3 class="project-title">${proj.title}</h3>
      <p class="project-subtitle">${proj.subtitle}</p>
      <p class="project-desc">${proj.description}</p>
      <div class="project-impact">${proj.impact}</div>
      <div class="proj-tags">${proj.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
      <div class="proj-actions">
        <a href="${proj.repoUrl}" target="_blank" rel="noopener" class="proj-btn proj-btn-primary">
          <i class="fab fa-github"></i> Código
        </a>
        ${proj.liveUrl ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener" class="proj-btn proj-btn-secondary">Demo →</a>` : ''}
      </div>`;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}