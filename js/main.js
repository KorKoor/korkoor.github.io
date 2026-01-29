import { initTypewriter } from './animation.js';
import { loadSkills } from './skills.js';
import { loadProjects } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
    
    //Cargar contenido
    const dynamicTextElement = document.querySelector('.dynamic-text');
    if (dynamicTextElement) {
        initTypewriter(dynamicTextElement, [
            "Software Developer", 
            "Mobile App Creator", 
            "Full Stack Engineer", 
            "Problem Solver"
        ]);
    }

    loadSkills('skills-container');
    loadProjects('projects-container');

    //Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150; 

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            } else {
                reveal.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    
    revealOnScroll();
});