/* --- DATOS PERSONALES (Bento Grid) --- */
const personalData = [
    {
        id: 'lee',
        size: 'large', 
        // CAMBIO: Ruta actualizada y correcta
        image: 'assets/images/Lee.png', 
        title: 'Lee & Lealtad',
        desc: 'Más que una mascota, Lee es mi refugio emocional. Una conexión silenciosa que me recuerda la pureza del amor sin condiciones.',
        stat: ' Husky Siberiano'
    },
    {
        id: 'rubik',
        size: 'medium',
        icon: 'fas fa-cube',
        title: 'Orden y Caos',
        desc: 'Los cubos Rubik satisfacen mi necesidad de demostrar que incluso el caos más complejo tiene una solución lógica.',
        stat: ' Resolución'
    },
    {
        id: 'mind',
        size: 'wide',
        icon: 'fas fa-bolt',
        title: 'Mente Rápida',
        desc: 'No memorizo, comprendo. Cuando algo me atrapa, el tiempo se distorsiona y entro en un foco absoluto para desmontar la lógica de las cosas.',
        stat: ' Aprendizaje Profundo'
    },
    {
        id: 'dinos',
        size: 'small',
        icon: 'fas fa-dragon',
        title: 'Fascinación',
        desc: 'Gigantes, antiguos y reales. Me asombra lo que deja huella en la historia.',
        stat: ' Historia'
    },
    {
        id: 'music',
        size: 'small',
        icon: 'fas fa-guitar',
        title: 'Música',
        desc: 'Mi escape sensible. Tocar instrumentos conecta con esa parte de mí que siente intensamente.',
        stat: ' Pasión'
    },
    {
        id: 'core',
        size: 'tall',
        icon: 'fas fa-heart',
        title: 'Sensibilidad',
        desc: 'No es fragilidad, es mi motor. Percibo matices que otros ignoran. Mi filosofía es "Todo o Nada": prefiero pocos intereses profundos y reales antes que muchos superficiales. Lo mío es verdad, incluso cuando duele.',
        stat: ' Esencia'
    },
    {
        id: 'ai',
        size: 'medium',
        icon: 'fas fa-brain',
        title: 'Futuro & IA',
        desc: 'Investigo obsesivamente cómo la Inteligencia Artificial redefine nuestra capacidad de crear soluciones.',
        stat: ' Innovación'
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

        this.data.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `bento-card ${item.size} reveal-card`;
            card.id = item.id; 
            
            // Animación escalonada (cada tarjeta aparece un poco después de la anterior)
            card.style.animationDelay = `${index * 0.15}s`;
            
            // --- LÓGICA VISUAL (Imagen 3D vs Icono) ---
            let visualElement = '';
            
            if (item.image) {
                // Imagen del Husky
                visualElement = `<img src="${item.image}" alt="${item.title}" class="bento-3d-img">`;
            } else {
                // Icono estándar
                visualElement = `<div class="bento-icon"><i class="${item.icon}"></i></div>`;
            }

            // --- CONTENIDO DE TEXTO ---
            const content = document.createElement('div');
            content.className = 'bento-content';
            
            // Aseguramos que el texto de Lee quede sobre la imagen si se cruzan
            if(item.id === 'lee') content.style.zIndex = '5';

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
            content.appendChild(stat);

            card.innerHTML = visualElement; // Inyecta la imagen o el icono
            card.appendChild(content);      // Añade el texto

            this.container.appendChild(card);
        });
    }
}