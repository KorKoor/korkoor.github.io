export function initTypewriter(element, words) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        
        element.textContent = currentChar;

        // Lógica de velocidad
        let typeSpeed = 100; // Velocidad al escribir
        if (isDeleting) typeSpeed = 50; // Velocidad al borrar

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, typeSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, typeSpeed);
        } else {
            // Cambio de estado (borrar <-> escribir)
            isDeleting = !isDeleting;
            
            // Si terminó de escribir, espera más tiempo antes de borrar
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 500); // Pausa breve antes de empezar la siguiente palabra
            } else {
                setTimeout(typeEffect, 2000); // Tiempo que se queda la palabra completa visible
            }
        }
    };

    typeEffect();
}