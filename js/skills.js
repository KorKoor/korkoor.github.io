const skillsData = [
    {
        category: "Mobile & Cross-Platform",
        items: ["Android Nativo (Java/Kotlin)", "React Native", "Jetpack Compose"]
    },
    {
        category: "Web & Full Stack",
        items: ["HTML5 & CSS3", "JavaScript (ES6+)", "React.js", "APIs RESTful"]
    },
    {
        category: "Backend & Core",
        items: ["Python", "C# (.NET)", "C / C++", "Node.js"]
    },
    {
        category: "Data & Tools",
        items: ["SQL & MongoDB", "Análisis de Datos", "Git/GitHub", "Algoritmos"]
    }
];

export function loadSkills(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    skillsData.forEach(group => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';

        const title = document.createElement('h3');
        title.textContent = group.category;

        const listDiv = document.createElement('div');
        listDiv.className = 'skill-list';

        group.items.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'skill-tag';
            span.textContent = skill;
            listDiv.appendChild(span);
        });

        categoryDiv.appendChild(title);
        categoryDiv.appendChild(listDiv);
        container.appendChild(categoryDiv);
    });
}