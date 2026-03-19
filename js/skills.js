const skillsData = [
  {
    category: "Mobile — Android Nativo",
    icon: "fab fa-android",
    accent: "#3DDC84",
    items: [
      { name: "Kotlin", level: 82 },
      { name: "Jetpack Compose", level: 80 },
      { name: "Android SDK", level: 78 },
      { name: "MVVM / MVI", level: 75 },
      { name: "Coroutines & Flow", level: 72 },
      { name: "Room · Hilt · Retrofit", level: 70 },
    ]
  },
  {
    category: "Frontend & Web",
    icon: "fas fa-layer-group",
    accent: "#61DAFB",
    items: [
      { name: "React.js / Next.js", level: 72 },
      { name: "JavaScript (ES6+)", level: 75 },
      { name: "TypeScript", level: 65 },
      { name: "HTML5 & CSS3", level: 78 },
      { name: "Tailwind CSS", level: 70 },
      { name: "APIs RESTful", level: 75 },
    ]
  },
  {
    category: "Backend & Core",
    icon: "fas fa-server",
    accent: "#FFD700",
    items: [
      { name: "Python (Django / FastAPI)", level: 70 },
      { name: "Node.js / Express", level: 65 },
      { name: "C# (.NET)", level: 60 },
      { name: "C / C++", level: 55 },
      { name: "Arquitectura Limpia", level: 72 },
      { name: "GraphQL", level: 50 },
    ]
  },
  {
    category: "Data, Cloud & DevOps",
    icon: "fas fa-database",
    accent: "#FF6B6B",
    items: [
      { name: "SQL (PostgreSQL / MySQL)", level: 72 },
      { name: "MongoDB / Firebase", level: 70 },
      { name: "Git / GitHub", level: 80 },
      { name: "Docker", level: 55 },
      { name: "Algoritmos & Estructuras", level: 75 },
      { name: "Google Play Store", level: 78 },
    ]
  },
  {
    category: "Cross-Platform & Extras",
    icon: "fas fa-mobile-alt",
    accent: "#A78BFA",
    items: [
      { name: "React Native", level: 65 },
      { name: "WebSockets / Tiempo real", level: 65 },
      { name: "Figma / UI Design", level: 60 },
      { name: "HealthTech Apps", level: 75 },
      { name: "Twitch / OBS Overlays", level: 68 },
      { name: "Serverless (Vercel)", level: 70 },
    ]
  },
];


export function loadSkills(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  container.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  `;

  const style = document.createElement('style');
  style.textContent = `
    .skill-category-card {
      background: #fff;
      border: 1px solid #EFEBE9;
      border-radius: 20px;
      padding: 28px;
      transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
      position: relative;
      overflow: hidden;
    }
    .skill-category-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      border-radius: 20px 20px 0 0;
      background: var(--accent);
    }
    .skill-category-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 40px rgba(62,39,35,.1);
      border-color: var(--accent);
    }
    .skill-cat-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    .skill-cat-icon {
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 10px;
      background: color-mix(in srgb, var(--accent) 15%, white);
      color: var(--accent);
      font-size: .95rem;
    }
    .skill-cat-title {
      font-size: .8rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .1em;
      color: #3E2723;
    }
    .skill-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 12px;
    }
    .skill-row-name {
      font-size: .82rem;
      font-weight: 600;
      color: #5D4037;
      white-space: nowrap;
      min-width: 140px;
    }
    .skill-bar-bg {
      flex: 1;
      height: 6px;
      background: #EFEBE9;
      border-radius: 99px;
      overflow: hidden;
    }
    .skill-bar-fill {
      height: 100%;
      border-radius: 99px;
      background: var(--accent);
      width: 0%;
      transition: width 1.2s cubic-bezier(.4,0,.2,1);
    }
    .skill-pct {
      font-size: .7rem;
      font-weight: 700;
      color: #9E9E9E;
      min-width: 30px;
      text-align: right;
    }
  `;
  document.head.appendChild(style);

  skillsData.forEach((group, gi) => {
    const card = document.createElement('div');
    card.className = 'skill-category-card';
    card.style.setProperty('--accent', group.accent);
    card.style.animationDelay = `${gi * 80}ms`;

    const header = document.createElement('div');
    header.className = 'skill-cat-header';
    header.innerHTML = `
      <div class="skill-cat-icon"><i class="${group.icon}"></i></div>
      <span class="skill-cat-title">${group.category}</span>
    `;

    card.appendChild(header);

    group.items.forEach(skill => {
      const row = document.createElement('div');
      row.className = 'skill-row';
      row.innerHTML = `
        <span class="skill-row-name">${skill.name}</span>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" data-level="${skill.level}"></div>
        </div>
        <span class="skill-pct">${skill.level}%</span>
      `;
      card.appendChild(row);
    });

    container.appendChild(card);
  });

  // Animar barras cuando entran al viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.level + '%';
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  container.querySelectorAll('.skill-category-card').forEach(c => observer.observe(c));
}