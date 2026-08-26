/* =========================================
   IMPORTS
   ========================================= */
import { ParDosGame } from './game.js';
import { PersonalLife } from './personal.js';
import { loadSkills } from './skills.js';
import { loadProjects } from './projects.js';
import { setupMobileMenu, setupNavScrollEffect, setupRevealAnimations } from './nav.js';

/* =========================================
   1. FONDO ANIMADO PARDOS
   ========================================= */
function createPardosBackground() {
    const container = document.getElementById('pardos-background');
    if (!container) return;

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

        container.appendChild(tile);
    }
}

/* =========================================
   2. TYPEWRITER
   ========================================= */
function initTypewriter(element, words) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        element.textContent = currentChar;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, typeSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, typeSpeed);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 1500); 
            } else {
                setTimeout(typeEffect, 500); 
            }
        }
    };
    typeEffect();
}

/* =========================================
   4. BUSCADOR INTELIGENTE (SCROLL TO MATCH)
   ========================================= */
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput) return;

    // Función que busca y te desplaza
    const performSearch = () => {
        const term = searchInput.value.trim().toLowerCase();
        if (!term) return;

        // Elementos donde buscar (Texto, Cards, Títulos)
        const selectors = 'p, h1, h2, h3, h4, span, li, .app-card, .project-card, .soft-card';
        const elements = document.querySelectorAll(selectors);
        
        let found = false;

        for (let el of elements) {
            // Buscamos texto visible que coincida
            if (el.textContent.toLowerCase().includes(term) && el.offsetParent !== null) {
                
                // 1. Desplazamiento suave hacia el elemento
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // 2. Efecto visual de resaltado (Amarillo temporal)
                const originalTransition = el.style.transition;
                const originalBg = el.style.backgroundColor;
                const originalColor = el.style.color;

                el.style.transition = 'all 0.5s ease';
                el.style.backgroundColor = '#FFEB3B'; // Amarillo resaltador
                el.style.color = '#000';
                el.style.borderRadius = '4px';
                el.style.boxShadow = '0 0 10px #FFEB3B';

                // Quitar resaltado después de 1.5 segundos
                setTimeout(() => {
                    el.style.backgroundColor = originalBg;
                    el.style.color = originalColor;
                    el.style.boxShadow = 'none';
                    el.style.borderRadius = '0'; // Ojo, si tenía border-radius original se pierde, mejor resetear a ''
                    el.style.transition = originalTransition;
                }, 1500);

                found = true;
                searchInput.value = ''; // Limpiar input opcional
                searchInput.blur(); // Quitar foco para celular
                break; // Detenerse en la primera coincidencia
            }
        }

        if (!found) {
            alert(`No encontré resultados para: "${term}"`);
        }
    };

    // Evento Click Botón
    if(searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // Evento Enter en Input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/* =========================================
   5. EFECTO TILT (3D AL MOVER MOUSE)
   ========================================= */
function initTiltEffect() {
    const cards = document.querySelectorAll('.app-card, .project-card, .soft-card');

    cards.forEach(card => {
        card.classList.add('tilt-card'); 

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -7; 
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* =========================================
   6. LÓGICA DE PARDOS (Beta Gate)
   ========================================= */
function setupPardosGate() {
    const btnRegister = document.getElementById('btn-register-tester');
    const inputEmail = document.getElementById('tester-email');
    const formContainer = document.getElementById('pardos-form-container');
    const linkContainer = document.getElementById('pardos-link-container');

    if (btnRegister && inputEmail) {
        if (localStorage.getItem('pardos_beta_access') === 'true') {
            formContainer.style.display = 'none';
            linkContainer.style.display = 'block';
        }

        btnRegister.addEventListener('click', () => {
            const email = inputEmail.value;
            if (email.includes('@') && email.includes('.')) {
                alert(`¡Gracias! He registrado ${email} para acceso Beta.\n\nRecuerda: Debo darte de alta manualmente en Google Play Console antes de que el link funcione.`);
                
                formContainer.style.display = 'none';
                linkContainer.style.display = 'block';
                localStorage.setItem('pardos_beta_access', 'true');
            } else {
                alert('Por favor ingresa un correo válido.');
            }
        });
    }
}

/* =========================================
   7. LÓGICA DE LA DEMO (Juego)
   ========================================= */
function setupGameDemo() {
    const playBtn = document.getElementById('play-demo-btn');
    const modal = document.getElementById('game-modal');
    const closeBtn = document.getElementById('close-game');
    let gameInstance = null;

    if (playBtn && modal) {
        playBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            if (!gameInstance) {
                gameInstance = new ParDosGame('pardos-game-container');
                gameInstance.init();
            }
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}

/* =========================================
   INICIALIZACIÓN (DOM READY)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efectos Visuales
    createPardosBackground();
    const dynamicTextElement = document.querySelector('.dynamic-text');
    if (dynamicTextElement) {
        initTypewriter(dynamicTextElement, [
            "Software Developer", 
            "Mobile App Creator", 
            "Full Stack Engineer", 
            "Problem Solver"
        ]);
    }

    // 2. Cargar Contenido
    loadSkills('skills-container');
    loadProjects('projects-container');
    
    // 3. INICIAR BUSCADOR (Orden corregido)
    setupSearch(); 

    // 4. Activar Nuevas Funciones
    setupPardosGate(); 
    setupGameDemo(); 
    
    // 5. INICIAR EFECTO TILT
    initTiltEffect();

    // 6. Cargar Personal Life
    if (document.getElementById('personal-container')) {
        const myLife = new PersonalLife('personal-container');
        myLife.render();
    }

    // 7. Scroll Reveal (IntersectionObserver: más fluido, sin listener de scroll)
    setupRevealAnimations();

    // 8. Navegación: menú móvil + sombra al hacer scroll
    setupMobileMenu();
    setupNavScrollEffect();
});