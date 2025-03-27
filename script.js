class MemoryGame {
    constructor() {
        this.playerName = '';
        this.currentLevel = 1;
        this.lives = 3;
        this.points = 0;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('next-level').addEventListener('click', () => this.nextLevel());
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
    }

    startGame() {
        this.playerName = document.getElementById('player-name').value.trim();
        if (!this.playerName) {
            alert('Por favor, ingresa tu nombre');
            return;
        }

        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        document.getElementById('display-name').textContent = this.playerName;

        this.loadLevel(this.currentLevel);
    }

    loadLevel(level) {
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = ''; // Limpiar área de juego

        document.getElementById('current-level').textContent = level;
        document.getElementById('lives-count').textContent = this.lives;
        document.getElementById('points-count').textContent = this.points;

        switch(level) {
            case 1:
                this.levelCompleteSyllables();
                break;
            case 2:
                this.levelMatchCards();
                break;
            // Implementar los demás niveles aquí
            default:
                alert('¡Felicidades! Has completado todos los niveles');
        }
    }

    levelCompleteSyllables() {
        const words = [
            { word: 'Computadora', missingPart: 'dora' },
            { word: 'Elefante', missingPart: 'fante' }
        ];

        const selectedWord = words[Math.floor(Math.random() * words.length)];
        const displayWord = selectedWord.word.replace(selectedWord.missingPart, '______');

        const gameArea = document.getElementById('game-area');
        const wordDisplay = document.createElement('div');
        wordDisplay.textContent = displayWord;
        gameArea.appendChild(wordDisplay);

        const inputField = document.createElement('input');
        inputField.type = 'text';
        gameArea.appendChild(inputField);

        const checkButton = document.createElement('button');
        checkButton.textContent = 'Verificar';
        checkButton.addEventListener('click', () => {
            if (inputField.value.toLowerCase() === selectedWord.missingPart.toLowerCase()) {
                this.levelCompleted();
            } else {
                this.reduceLife();
            }
        });
        gameArea.appendChild(checkButton);
    }

    levelMatchCards() {
        // Implementación del nivel de encontrar pares de cartas
    }

    levelCompleted() {
        this.currentLevel++;
        this.points += 100;
        document.getElementById('next-level').classList.remove('hidden');
    }

    reduceLife() {
        this.lives--;
        document.getElementById('lives-count').textContent = this.lives;

        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    nextLevel() {
        document.getElementById('next-level').classList.add('hidden');
        this.loadLevel(this.currentLevel);
    }

    gameOver() {
        this.savePlayerProgress();
        alert(`Game Over. Llegaste al nivel ${this.currentLevel - 1}`);
        document.getElementById('restart-game').classList.remove('hidden');
    }

    restartGame() {
        this.currentLevel = 1;
        this.lives = 3;
        this.points = 0;
        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('restart-game').classList.add('hidden');
    }

    savePlayerProgress() {
        const playerProgress = {
            name: this.playerName,
            level: this.currentLevel - 1,
            points: this.points,
            date: new Date().toISOString()
        };

        let savedProgress = JSON.parse(localStorage.getItem('memoryGameProgress') || '[]');
        savedProgress.push(playerProgress);
        localStorage.setItem('memoryGameProgress', JSON.stringify(savedProgress));
    }
}

// Inicializar el juego
const game = new MemoryGame();
