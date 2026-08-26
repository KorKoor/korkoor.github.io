/* --- DATOS PERSONALES (Bento Grid) --- */
const personalData = [
    // ── Mi Esencia ──────────────────────────────────────────────
    {
        id: 'core',
        group: 'Mi Esencia',
        icon: 'fas fa-heart',
        title: 'Sensibilidad',
        desc: 'No es fragilidad, es mi motor. Percibo matices que otros ignoran. Mi filosofía es "Todo o Nada": prefiero pocos intereses profundos y reales antes que muchos superficiales. Lo mío es verdad, incluso cuando duele.',
        stat: ' Esencia'
    },
    {
        id: 'tea',
        group: 'Mi Esencia',
        icon: 'fas fa-infinity',
        title: 'Neurodivergente',
        desc: 'Formo parte del espectro autista y no lo escondo: explica mi hiperfoco, mi honestidad sin filtros y mi necesidad de lógica y rutinas claras. Es la forma en la que proceso el mundo, no algo que deba disimular.',
        stat: ' TEA'
    },
    {
        id: 'rubik',
        group: 'Mi Esencia',
        icon: 'fas fa-cube',
        title: 'Orden y Caos',
        desc: 'Los cubos Rubik satisfacen mi necesidad de demostrar que incluso el caos más complejo tiene una solución lógica.',
        stat: ' Resolución'
    },
    {
        id: 'mind',
        group: 'Mi Esencia',
        icon: 'fas fa-bolt',
        title: 'Mente Rápida',
        desc: 'No memorizo, comprendo. Cuando algo me atrapa, el tiempo se distorsiona y entro en un foco absoluto para desmontar la lógica de las cosas.',
        stat: ' Aprendizaje Profundo'
    },
    {
        id: 'music',
        group: 'Mi Esencia',
        icon: 'fas fa-guitar',
        title: 'Música',
        desc: 'Mi escape sensible. Tocar instrumentos conecta con esa parte de mí que siente intensamente.',
        stat: ' Pasión'
    },
    {
        id: 'dinos',
        group: 'Mi Esencia',
        icon: 'fas fa-dragon',
        title: 'Fascinación',
        desc: 'Gigantes, antiguos y reales. Me asombra lo que deja huella en la historia.',
        stat: ' Historia'
    },

    // ── Cuerpo & Descanso ───────────────────────────────────────
    {
        id: 'gym',
        group: 'Cuerpo & Descanso',
        icon: 'fas fa-dumbbell',
        title: 'Fuerza & Hipertrofia',
        desc: 'Contrarresto las horas de pantalla con entrenamiento de fuerza enfocado en hipertrofia, principalmente con mancuernas. Disciplina física para sostener el rendimiento mental.',
        stat: ' Gimnasio'
    },
    {
        id: 'cardio',
        group: 'Cuerpo & Descanso',
        icon: 'fas fa-person-walking',
        title: 'Caminatas Largas',
        desc: 'Complemento el esfuerzo explosivo del gym con caminatas largas al aire libre. Despejan mi mente y mantienen mi condición cardiovascular.',
        stat: ' Cardio & Mente'
    },
    {
        id: 'comfort-food',
        group: 'Cuerpo & Descanso',
        icon: 'fas fa-cookie-bite',
        title: 'Comfort Food',
        desc: 'Papas fritas y dulces: mi lado más simple y reconfortante. El placer culposo que balancea la disciplina del resto del día.',
        stat: ' Antojos'
    },
    {
        id: 'foodie',
        group: 'Cuerpo & Descanso',
        icon: 'fas fa-utensils',
        title: 'Mi Menú de Siempre',
        desc: 'Cuatro clásicos que nunca fallan. Sin pretensiones, directo al punto — igual que mi código.',
        stat: ' Comida Favorita',
        chips: [
            { icon: 'fas fa-hotdog', label: 'Hotdogs', color: '#D84315' },
            { icon: 'fas fa-pizza-slice', label: 'Pizza', color: '#F57C00' },
            { icon: 'fas fa-bowl-food', label: 'Ensalada', color: '#43A047' },
            { icon: 'fas fa-burger', label: 'Hamburguesa', color: '#6D4C41' },
        ]
    },

    // ── Pantallas & Nostalgia ───────────────────────────────────
    {
        id: 'gaming',
        group: 'Pantallas & Nostalgia',
        icon: 'fas fa-gamepad',
        title: 'Gamer Versátil',
        desc: 'Acción y competitividad en Call of Duty: Cold War, y progreso constante explorando el mundo real con Pokémon GO. Dos formas muy distintas de jugar.',
        stat: ' Videojuegos'
    },
    {
        id: 'modding',
        group: 'Pantallas & Nostalgia',
        icon: 'fas fa-puzzle-piece',
        title: 'Modding',
        desc: 'Disfruto el entorno colaborativo de crear mods: Java con libGDX y experimentos dentro del ecosistema de Super Mario 64 CoopDX.',
        stat: ' Comunidad'
    },
    {
        id: 'toonix',
        group: 'Pantallas & Nostalgia',
        icon: 'fas fa-tv',
        title: 'Nostalgia Toonix',
        desc: 'Mantengo vivo el gusto por la estética de los avatares Toonix de Cartoon Network. Un guiño constante a mi infancia.',
        stat: ' Recuerdos'
    },
    {
        id: 'sideloadly',
        group: 'Pantallas & Nostalgia',
        icon: 'fas fa-unlock',
        title: 'Curiosidad Técnica',
        desc: 'Mi curiosidad no descansa ni en mis propios dispositivos: uso herramientas como Sideloadly para instalar apps fuera del ecosistema cerrado de iOS.',
        stat: ' Hacking Ético'
    },

    // ── Fronteras ───────────────────────────────────────────────
    {
        id: 'ai',
        group: 'Fronteras',
        icon: 'fas fa-brain',
        title: 'Futuro & IA',
        desc: 'Investigo obsesivamente cómo la Inteligencia Artificial redefine nuestra capacidad de crear soluciones.',
        stat: ' Innovación'
    },
    {
        id: 'languages',
        group: 'Fronteras',
        icon: 'fas fa-language',
        title: 'Fronteras del Idioma',
        desc: 'Pulo mi inglés (B2) para dominar entrevistas técnicas, y en paralelo me aventuro con los diálogos básicos del francés.',
        stat: ' Inglés B2 · Francés A1'
    }
];

export class PersonalLife {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = personalData;
    }

    // --- NUEVO MÉTODO: Generar el fondo animado dentro de esta clase ---
    initBackground() {
        // Buscamos el contenedor del fondo. Si no existe en el HTML, lo creamos.
        let bgContainer = document.getElementById('pardos-background');
        
        if (!bgContainer) {
            bgContainer = document.createElement('div');
            bgContainer.id = 'pardos-background';
            bgContainer.className = 'pardos-bg';
            document.body.prepend(bgContainer); // Lo pone al principio del body
        }

        // Limpiamos por si acaso ya tenía elementos
        bgContainer.innerHTML = '';

        const numbers = [2, 4, 8, 16, 32, 64, 128]; 
        const tileCount = 20;

        for (let i = 0; i < tileCount; i++) {
            const tile = document.createElement('div');
            tile.classList.add('floating-tile');
            
            tile.textContent = numbers[Math.floor(Math.random() * numbers.length)];
            
            const randomLeft = Math.floor(Math.random() * 100);
            tile.style.left = `${randomLeft}%`;
            
            const size = Math.floor(Math.random() * 50) + 30;
            tile.style.width = `${size}px`;
            tile.style.height = `${size}px`;
            tile.style.fontSize = `${size / 2.5}px`;
            
            const duration = Math.floor(Math.random() * 15) + 15;
            tile.style.animationDuration = `${duration}s`;
            
            tile.style.animationDelay = `-${Math.floor(Math.random() * 20)}s`;

            bgContainer.appendChild(tile);
        }
    }

    render() {
        // 1. Iniciamos el fondo animado específico para esta página
        this.initBackground();

        if (!this.container) return;
        
        this.container.innerHTML = '';
        this.container.className = 'bento-grid';

        let lastGroup = null;

        this.data.forEach((item, index) => {
            if (item.group && item.group !== lastGroup) {
                const sectionTitle = document.createElement('h2');
                sectionTitle.className = 'bento-section-title';
                sectionTitle.textContent = item.group;
                this.container.appendChild(sectionTitle);
                lastGroup = item.group;
            }

            const card = document.createElement('div');
            card.className = `bento-card reveal-card`;
            card.id = item.id;

            // Animación escalonada (cada tarjeta aparece un poco después de la anterior)
            card.style.animationDelay = `${(index % 6) * 0.12}s`;

            const visualElement = `<div class="bento-icon"><i class="${item.icon}"></i></div>`;

            // --- CONTENIDO DE TEXTO ---
            const content = document.createElement('div');
            content.className = 'bento-content';

            const title = document.createElement('h3');
            title.textContent = item.title;
            
            const desc = document.createElement('p');
            desc.textContent = item.desc;

            const stat = document.createElement('span');
            stat.className = 'bento-stat';
            stat.textContent = item.stat;

            // Construcción del DOM de la tarjeta
            content.appendChild(title);
            content.appendChild(desc);

            // Chips opcionales: mini-grid de íconos (ej. comida favorita)
            if (item.chips && item.chips.length) {
                const chipsRow = document.createElement('div');
                chipsRow.className = 'bento-chips';
                item.chips.forEach(chip => {
                    const chipEl = document.createElement('div');
                    chipEl.className = 'bento-chip';
                    chipEl.style.setProperty('--chip-color', chip.color || '#8D6E63');
                    chipEl.innerHTML = `
                        <span class="bento-chip-icon"><i class="${chip.icon}"></i></span>
                        <span class="bento-chip-label">${chip.label}</span>
                    `;
                    chipsRow.appendChild(chipEl);
                });
                content.appendChild(chipsRow);
            }

            content.appendChild(stat);

            card.innerHTML = visualElement; // Inyecta la imagen o el icono
            card.appendChild(content);      // Añade el texto

            this.container.appendChild(card);
        });
    }
}