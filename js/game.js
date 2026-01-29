export class ParDosGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.grid = [];
        this.score = 0;
        this.size = 4;
        this.isGameOver = false;

        // Variables para Touch (Swipe)
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;

        // Colores ParDos (Café Aesthetic)
        this.colors = {
            2: { bg: '#EFEBE9', text: '#5D4037' },
            4: { bg: '#D7CCC8', text: '#5D4037' },
            8: { bg: '#BCAAA4', text: '#FFF' },
            16: { bg: '#A1887F', text: '#FFF' },
            32: { bg: '#8D6E63', text: '#FFF' },
            64: { bg: '#795548', text: '#FFF' },
            128: { bg: '#6D4C41', text: '#FFF', shadow: '0 0 10px #6D4C41' },
            256: { bg: '#5D4037', text: '#FFF', shadow: '0 0 10px #5D4037' },
            512: { bg: '#4E342E', text: '#FFF', shadow: '0 0 15px #4E342E' },
            1024: { bg: '#3E2723', text: '#FFF', shadow: '0 0 20px #3E2723' },
            2048: { bg: '#FFC107', text: '#3E2723', shadow: '0 0 25px #FFC107' }
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.restartGame = this.restartGame.bind(this);
    }

    init() {
        if (!this.container) return;
        this.createBoard();
        this.startNewGame();
        
        // Eventos
        document.addEventListener('keydown', this.handleInput);
        
        // Touch Events (Móvil)
        const gridContainer = this.container.querySelector('.grid-container');
        gridContainer.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        gridContainer.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        gridContainer.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    }

    startNewGame() {
        this.score = 0;
        this.isGameOver = false;
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        
        // Ocultar capa de Game Over si existe
        const overlay = this.container.querySelector('.game-over-overlay');
        if (overlay) overlay.style.display = 'none';

        this.addNewTile();
        this.addNewTile();
        this.updateView();
    }

    createBoard() {
        this.container.innerHTML = '';
        this.container.classList.add('pardos-board');

        // Header con Score y Reset
        const header = document.createElement('div');
        header.className = 'game-header';
        
        const scoreBoard = document.createElement('div');
        scoreBoard.className = 'score-box';
        scoreBoard.innerHTML = `<span>SCORE</span><strong id="score-val">0</strong>`;
        
        const resetBtn = document.createElement('button');
        resetBtn.className = 'reset-btn';
        resetBtn.innerHTML = '<i class="fas fa-redo"></i>';
        resetBtn.onclick = this.restartGame;

        header.appendChild(scoreBoard);
        header.appendChild(resetBtn);
        this.container.appendChild(header);

        // Grid Container
        const gridEl = document.createElement('div');
        gridEl.className = 'grid-container';

        // Celdas de fondo (Grid estático)
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            gridEl.appendChild(cell);
        }

        // Capa de Tiles (Fichas dinámicas)
        const tileContainer = document.createElement('div');
        tileContainer.className = 'tile-container';
        gridEl.appendChild(tileContainer);

        // Capa Game Over
        const gameOverOverlay = document.createElement('div');
        gameOverOverlay.className = 'game-over-overlay';
        gameOverOverlay.innerHTML = `
            <h3>¡Juego Terminado!</h3>
            <button class="try-again-btn">Intentar de nuevo</button>
        `;
        gameOverOverlay.querySelector('button').onclick = this.restartGame;
        gridEl.appendChild(gameOverOverlay);

        this.container.appendChild(gridEl);
    }

    addNewTile() {
        const emptyCells = [];
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c] === 0) emptyCells.push({r, c});
            }
        }
        if (emptyCells.length > 0) {
            const {r, c} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    updateView() {
        const tileContainer = this.container.querySelector('.tile-container');
        tileContainer.innerHTML = ''; // Limpiar render anterior

        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                const value = this.grid[r][c];
                if (value !== 0) {
                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    tile.textContent = value;
                    
                    // Posicionamiento (0, 1, 2, 3) -> CSS Transforms
                    // Multiplicamos por 100% + gap logic en CSS, aquí usamos clases de posición
                    tile.classList.add(`tile-position-${r}-${c}`); // Clase para posición
                    
                    // Estilos dinámicos
                    const style = this.colors[value] || this.colors[2048];
                    tile.style.background = style.bg;
                    tile.style.color = style.text;
                    if (style.shadow) tile.style.boxShadow = style.shadow;
                    
                    // Si es nuevo, animación pop
                    tile.classList.add('tile-new');
                    
                    tileContainer.appendChild(tile);
                }
            }
        }
        
        document.getElementById('score-val').innerText = this.score;
    }

    // --- CONTROLES TECLADO ---
    handleInput(e) {
        if (this.isGameOver) return;
        let moved = false;
        switch(e.key) {
            case 'ArrowUp': moved = this.move('up'); break;
            case 'ArrowDown': moved = this.move('down'); break;
            case 'ArrowLeft': moved = this.move('left'); break;
            case 'ArrowRight': moved = this.move('right'); break;
        }
        if (moved) this.afterMove();
    }

    // --- CONTROLES TÁCTILES (SWIPE) ---
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        // Prevenir scroll de la página si estamos moviendo dentro del juego
        e.preventDefault(); 
    }

    handleTouchEnd(e) {
        if (this.isGameOver) return;
        
        this.touchEndX = e.changedTouches[0].clientX;
        this.touchEndY = e.changedTouches[0].clientY;
        
        this.handleGesture();
    }

    handleGesture() {
        const dx = this.touchEndX - this.touchStartX;
        const dy = this.touchEndY - this.touchStartY;
        const threshold = 30; // Mínimo desplazamiento para contar como swipe

        if (Math.abs(dx) > Math.abs(dy)) {
            // Movimiento Horizontal
            if (Math.abs(dx) > threshold) {
                if (dx > 0) { if (this.move('right')) this.afterMove(); }
                else { if (this.move('left')) this.afterMove(); }
            }
        } else {
            // Movimiento Vertical
            if (Math.abs(dy) > threshold) {
                if (dy > 0) { if (this.move('down')) this.afterMove(); }
                else { if (this.move('up')) this.afterMove(); }
            }
        }
    }

    afterMove() {
        this.addNewTile();
        this.updateView();
        if (this.checkGameOver()) {
            this.isGameOver = true;
            this.container.querySelector('.game-over-overlay').style.display = 'flex';
        }
    }

    restartGame() {
        this.startNewGame();
    }

    // --- LÓGICA MATEMÁTICA (Igual que antes) ---
    move(direction) {
        const rotate = matrix => matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
        const slide = row => {
            let arr = row.filter(val => val);
            let missing = this.size - arr.length;
            return arr.concat(Array(missing).fill(0));
        };
        const combine = row => {
            let movedLocal = false;
            for (let i = 0; i < this.size - 1; i++) {
                if (row[i] !== 0 && row[i] === row[i+1]) {
                    row[i] *= 2;
                    row[i+1] = 0;
                    this.score += row[i];
                    movedLocal = true;
                }
            }
            return row;
        };

        let originalGrid = JSON.stringify(this.grid);
        
        if (direction === 'up') this.grid = rotate(rotate(rotate(this.grid)));
        else if (direction === 'right') this.grid = rotate(rotate(this.grid));
        else if (direction === 'down') this.grid = rotate(this.grid);

        this.grid = this.grid.map(row => slide(combine(slide(row))));

        if (direction === 'up') this.grid = rotate(this.grid);
        else if (direction === 'right') this.grid = rotate(rotate(this.grid));
        else if (direction === 'down') this.grid = rotate(rotate(rotate(this.grid)));

        return JSON.stringify(this.grid) !== originalGrid;
    }

    checkGameOver() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c] === 0) return false;
                if (c < 3 && this.grid[r][c] === this.grid[r][c+1]) return false;
                if (r < 3 && this.grid[r][c] === this.grid[r+1][c]) return false;
            }
        }
        return true;
    }
}