const projectsData = [
    {
        title: "ParDos Puzzle Game",
        description: "Una evolución del clásico 2048 creada con Jetpack Compose. Destaca por su diseño 'Aesthetic', animaciones fluidas (Juicy UI) y soporte total Vertical/Horizontal.",
        tags: ["Kotlin", "Jetpack Compose", "Android", "UX/UI"],
        repoUrl: "https://github.com/KorKoor/ParDos-Puzzle-Game"
    },
    {
        title: "PLAY-ZONE Social Network",
        description: "Plataforma social Full Stack para gamers. Incluye perfiles de usuario, creación de guías interactivas y reseñas. Se integra con una API RESTful propia (Play-Zone-API).",
        tags: ["JavaScript", "Full Stack", "REST API", "Web Dev"],
        repoUrl: "https://github.com/KorKoor/PLAY-ZONE"
    },
    {
        title: "Sudoku Solver ADN",
        description: "Programa de alto rendimiento para resolver sudokus 9x9 utilizando métodos de computación evolutiva (Algoritmos Genéticos) como mutación y selección natural.",
        tags: ["C++", "Algoritmos Genéticos", "Lógica", "Optimización"],
        repoUrl: "https://github.com/KorKoor/Sudoku_ADN"
    },
    {
        title: "Diabetes Monitor (ACIF)",
        description: "Aplicación móvil para el monitoreo y control de fases en pacientes con diabetes. Enfocada en la recolección precisa de datos médicos y accesibilidad.",
        tags: ["Kotlin", "HealthTech", "Android", "Mobile App"],
        repoUrl: "https://github.com/KorKoor/Diabetes_App_ACIF"
    }
];

export function loadProjects(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Limpiamos el contenedor por si acaso
    container.innerHTML = '';

    projectsData.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // Título
        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = proj.title;

        // Descripción
        const desc = document.createElement('p');
        desc.className = 'project-desc';
        desc.textContent = proj.description;

        // Tags Container
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'skill-list'; 
        
        proj.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'skill-tag';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });

        // Botón de GitHub (NUEVO)
        const linkBtn = document.createElement('a');
        linkBtn.href = proj.repoUrl;
        linkBtn.target = "_blank"; // Abrir en nueva pestaña
        linkBtn.className = 'project-link-btn';
        linkBtn.textContent = 'Ver en GitHub';

        // Insertar elementos en la tarjeta
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(tagsContainer);
        card.appendChild(linkBtn); // Agregamos el botón al final

        container.appendChild(card);
    });
}