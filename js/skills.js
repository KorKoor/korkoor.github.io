export function loadSkills() {
const skills = [
'Kotlin & Java (Android)',
'Desarrollo Web',
'APIs REST',
'MongoDB (NoSQL)',
'SQL / SQLite',
'Git & GitHub',
'Algoritmos y lógica',
'C++ (algoritmos genéticos)'
];


const list = document.getElementById('skills-list');


skills.forEach(skill => {
const li = document.createElement('li');
li.className = 'skill';
li.textContent = skill;
list.appendChild(li);
});
}