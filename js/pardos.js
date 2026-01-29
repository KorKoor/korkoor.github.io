/* --- CLASE PARA LA LANDING PAGE DE PARDOS --- */
export class ParDosCarousel {
    constructor(trackId) {
        this.track = document.getElementById(trackId);
        this.indicatorsContainer = document.getElementById('pardos-indicators');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        this.images = [
            'Menu.png', 'Records.png', 'AWARDS.png', 'Custom.png', 
            'Custom 2.png', 'ModelSelector.png', 'Campaign.png', 'Gameplay.png'
        ];
        
        this.currentIndex = 0;
        this.path = 'assets/images/ParDos/';
        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    init() {
        // 1. INICIAR FONDO (Crea el div si no existe)
        this.initBackground();

        if (!this.track) return;
        
        this.renderSlides();
        this.renderIndicators();
        this.updateCarousel();
        
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.move(-1));
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.move(1));
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateCarousel();
            });
        });

        this.track.addEventListener('touchstart', (e) => this.touchStartX = e.touches[0].clientX);
        this.track.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
    }

    /* --- LÓGICA ROBUSTA DEL FONDO --- */
    initBackground() {
        // Intentamos buscar el contenedor
        let container = document.getElementById('pardos-background');
        
        // SI NO EXISTE EN EL HTML, LO CREAMOS AUTOMÁTICAMENTE
        if (!container) {
            console.log("Creando contenedor de fondo dinámicamente...");
            container = document.createElement('div');
            container.id = 'pardos-background';
            // Lo insertamos justo después de abrir el body para que quede al fondo
            document.body.prepend(container);
        }

        container.innerHTML = ''; // Limpiar

        const numbers = [2, 4, 8, 16, 32, 64, 128]; 
        const tileCount = 20;

        for (let i = 0; i < tileCount; i++) {
            const tile = document.createElement('div');
            tile.classList.add('floating-tile'); // Usa el CSS que acabamos de agregar
            
            tile.textContent = numbers[Math.floor(Math.random() * numbers.length)];
            
            // Posición horizontal aleatoria
            tile.style.left = `${Math.floor(Math.random() * 100)}%`;
            
            // Tamaño variable
            const size = Math.floor(Math.random() * 50) + 30;
            tile.style.width = `${size}px`;
            tile.style.height = `${size}px`;
            tile.style.fontSize = `${size / 2.5}px`;
            
            // Velocidad aleatoria (15s a 30s)
            const duration = Math.floor(Math.random() * 15) + 15;
            tile.style.animationDuration = `${duration}s`;
            
            // Delay negativo para que ya estén en pantalla al cargar
            tile.style.animationDelay = `-${Math.floor(Math.random() * 20)}s`;

            container.appendChild(tile);
        }
    }

    /* --- (Resto de métodos del carrusel igual que antes...) --- */
    renderSlides() {
        this.track.innerHTML = '';
        this.images.forEach((imgName, index) => {
            const slide = document.createElement('div');
            slide.className = 'screenshot-item';
            
            const img = document.createElement('img');
            img.src = `${this.path}${imgName}`;
            img.alt = `Screen ${index}`;
            
            slide.appendChild(img);
            this.track.appendChild(slide);
        });
    }

    renderIndicators() {
        this.indicatorsContainer.innerHTML = '';
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            this.indicatorsContainer.appendChild(dot);
        });
    }

    move(direction) {
        this.currentIndex += direction;
        if (this.currentIndex < 0) this.currentIndex = this.images.length - 1;
        if (this.currentIndex >= this.images.length) this.currentIndex = 0;
        this.updateCarousel();
    }

    handleSwipe() {
        const threshold = 50;
        if (this.touchEndX < this.touchStartX - threshold) this.move(1);
        if (this.touchEndX > this.touchStartX + threshold) this.move(-1);
    }

    updateCarousel() {
        const slides = document.querySelectorAll('.screenshot-item');
        const dots = document.querySelectorAll('.dot');
        const total = this.images.length;
        const prevIndex = (this.currentIndex - 1 + total) % total;
        const nextIndex = (this.currentIndex + 1) % total;

        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            // Resetear estilos inline base para limpieza
            slide.style.transform = 'translate3d(0, 0, -300px) scale(0.5)';
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
            slide.style.display = 'none'; 
            
            if (index === this.currentIndex) {
                slide.style.display = 'block';
                slide.classList.add('active');
                slide.style.transform = 'translate3d(0, 0, 0) scale(1) rotateY(0deg)';
                slide.style.opacity = '1';
                slide.style.zIndex = '20'; 
            } else if (index === prevIndex) {
                slide.style.display = 'block';
                slide.style.transform = 'translate3d(-65%, 0, -150px) scale(0.85) rotateY(30deg)';
                slide.style.opacity = '0.5';
                slide.style.zIndex = '10';   
            } else if (index === nextIndex) {
                slide.style.display = 'block';
                slide.style.transform = 'translate3d(65%, 0, -150px) scale(0.85) rotateY(-30deg)';
                slide.style.opacity = '0.5';
                slide.style.zIndex = '10';
            } 
        });

        dots.forEach(d => d.classList.remove('active'));
        if (dots[this.currentIndex]) dots[this.currentIndex].classList.add('active');
    }
}