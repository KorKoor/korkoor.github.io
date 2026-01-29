export function loadProjects() {
const projects = [
{
title: 'Solucionador de Sudoku',
description: 'Programa en C++ que utiliza algoritmos genéticos para resolver sudokus.'
},
{
title: 'API REST',
description: 'API desarrollada con manejo de datos en MongoDB y estructura modular.'
},
{
title: 'Aplicación Android',
description: 'App desarrollada en Kotlin/Java con enfoque en lógica y escalabilidad.'
}
];


const container = document.getElementById('projects-container');


projects.forEach(project => {
const div = document.createElement('div');
div.className = 'project';


div.innerHTML = `
<h3>${project.title}</h3>
<p>${project.description}</p>
`;


container.appendChild(div);
});
}