// Variables del juego
let currentLevel = 1;
let lives = 3;
let score = 0;
let timeLeft = 60;
let timer;
let currentLevelData = {};
let hintsUsed = 0;

// Elementos del DOM
const levelContainer = document.getElementById('level-container');
const levelDisplay = document.getElementById('level');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');
const hintButton = document.getElementById('hint-btn');
const restartButton = document.getElementById('restart-btn');

// Datos del juego
const gameData = {
    // Nivel 1: Completar palabra con sílabas faltantes
    level1: {
        words: [
            { word: "computadora", syllables: ["com", "pu", "ta", "do", "ra"] },
            { word: "elefante", syllables: ["e", "le", "fan", "te"] },
            { word: "universidad", syllables: ["u", "ni", "ver", "si", "dad"] },
            { word: "mariposa", syllables: ["ma", "ri", "po", "sa"] },
            { word: "helicoptero", syllables: ["he", "li", "cop", "te", "ro"] }
        ]
    },
    
    // Nivel 2: Memoria de cartas
    level2: {
        pairs: 8,
        icons: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦"]
    },
    
    // Nivel 3: Secuencia de colores
    level3: {
        sequences: [
            { sequence: ["red", "blue", "green", "yellow"], name: "Secuencia básica" },
            { sequence: ["purple", "orange", "purple", "green"], name: "Secuencia intermedia" },
            { sequence: ["blue", "blue", "red", "yellow", "green"], name: "Secuencia avanzada" }
        ],
        colors: {
            red: "#e74c3c",
            blue: "#3498db",
            green: "#2ecc71",
            yellow: "#f1c40f",
            purple: "#9b59b6",
            orange: "#e67e22"
        }
    },
    
    // Nivel 4: Secuencia de colores con tono musical
    level4: {
        sequences: [
            { sequence: ["red", "blue", "green", "yellow"], sounds: [440, 494, 554, 587], name: "Melodía simple" },
            { sequence: ["purple", "orange", "purple", "green"], sounds: [523, 587, 523, 659], name: "Melodía intermedia" },
            { sequence: ["blue", "blue", "red", "yellow", "green"], sounds: [392, 392, 440, 494, 523], name: "Melodía compleja" }
        ],
        colors: {
            red: "#e74c3c",
            blue: "#3498db",
            green: "#2ecc71",
            yellow: "#f1c40f",
            purple: "#9b59b6",
            orange: "#e67e22"
        }
    },
    
    // Nivel 5: Ordenar letras para formar palabra
    level5: {
        words: ["casa", "perro", "libro", "sol", "agua", "cielo", "flor", "mesa"]
    },
    
    // Nivel 6: Elemento que no pertenece al grupo
    level6: {
        groups: [
            { items: ["manzana", "pera", "uva", "zanahoria"], odd: "zanahoria", category: "frutas" },
            { items: ["auto", "bicicleta", "avión", "heladera"], odd: "heladera", category: "medios de transporte" },
            { items: ["rojo", "azul", "verde", "perro"], odd: "perro", category: "colores" },
            { items: ["gato", "perro", "pez", "árbol"], odd: "árbol", category: "animales" }
        ]
    },
    
    // Nivel 7: Cruce del puente
    level7: {
        rows: 5,
        columns: 5,
        safePath: [
            [true, false, true, false, true],
            [false, true, false, true, false],
            [true, false, true, false, true],
            [false, true, false, true, false],
            [true, false, true, false, true]
        ]
    },
    
    // Nivel 8: Corregir palabras mal escritas
    level8: {
        words: [
            { incorrect: "haver", correct: "haber" },
            { incorrect: "vajo", correct: "bajo" },
            { incorrect: "sierto", correct: "cierto" },
            { incorrect: "espeso", correct: "espeso" },
            { incorrect: "berde", correct: "verde" }
        ]
    },
    
    // Nivel 9: Sinónimos
    level9: {
        wordPairs: [
            { word: "feliz", synonyms: ["alegre", "contento", "gozoso"] },
            { word: "rápido", synonyms: ["veloz", "ágil", "ligero"] },
            { word: "bonito", synonyms: ["hermoso", "lindo", "bello"] },
            { word: "inteligente", synonyms: ["listo", "sabio", "astuto"] }
        ]
    },
    
    // Nivel 10: Pupiletras
    level10: {
        words: ["sol", "luna", "estrella", "planeta", "cometa", "galaxia"],
        gridSize: 10
    }
};

// Inicializar el juego
function initGame() {
    currentLevel = 1;
    lives = 3;
    score = 0;
    timeLeft = 60;
    hintsUsed = 0;
    
    updateUI();
    startTimer();
    loadLevel(currentLevel);
    
    // Event listeners
    hintButton.addEventListener('click', useHint);
    restartButton.addEventListener('click', restartGame);
}

// Actualizar la interfaz de usuario
function updateUI() {
    levelDisplay.textContent = `Nivel: ${currentLevel}`;
    livesDisplay.textContent = '❤️'.repeat(lives);
    scoreDisplay.textContent = `Puntos: ${score}`;
    timerDisplay.textContent = `Tiempo: ${timeLeft}`;
}

// Temporizador del juego
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Tiempo: ${timeLeft}`;
        
        if (timeLeft <= 0) {
            loseLife();
        }
    }, 1000);
}

// Perder una vida
function loseLife() {
    lives--;
    updateUI();
    
    if (lives <= 0) {
        gameOver();
    } else {
        showMessage("¡Perdiste una vida! Intenta de nuevo.", "error");
        // Recargar el nivel actual
        loadLevel(currentLevel);
    }
}

// Game over
function gameOver() {
    clearInterval(timer);
    showMessage(`¡Juego terminado! Puntuación final: ${score}`, "error");
    levelContainer.innerHTML = `
        <h2>Game Over</h2>
        <p>Puntuación final: ${score}</p>
        <p>Nivel alcanzado: ${currentLevel}</p>
        <button id="play-again-btn">Jugar de nuevo</button>
    `;
    
    document.getElementById('play-again-btn').addEventListener('click', initGame);
}

// Mostrar mensaje
function showMessage(message, type = "info") {
    messageDisplay.textContent = message;
    messageDisplay.className = "message " + type;
    
    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => {
        if (messageDisplay.textContent === message) {
            messageDisplay.textContent = "";
            messageDisplay.className = "message";
        }
    }, 3000);
}

// Usar pista
function useHint() {
    if (hintsUsed >= 3) {
        showMessage("Ya has usado todas las pistas disponibles", "error");
        return;
    }
    
    hintsUsed++;
    
    switch(currentLevel) {
        case 1:
            // Mostrar una sílaba correcta
            const syllableSlots = document.querySelectorAll('.syllable-slot:empty');
            if (syllableSlots.length > 0) {
                const randomSlot = syllableSlots[Math.floor(Math.random() * syllableSlots.length)];
                const correctSyllable = currentLevelData.currentWord.syllables[parseInt(randomSlot.dataset.index)];
                randomSlot.textContent = correctSyllable;
                randomSlot.classList.add('hint-used');
            }
            break;
        case 2:
            // Mostrar un par de cartas por 1 segundo
            const unflippedCards = Array.from(document.querySelectorAll('.card:not(.flipped):not(.matched)'));
            if (unflippedCards.length >= 2) {
                const card1 = unflippedCards[Math.floor(Math.random() * unflippedCards.length)];
                const card2 = unflippedCards.find(card => card !== card1 && card.dataset.value === card1.dataset.value);
                
                if (card2) {
                    card1.classList.add('flipped', 'hint');
                    card2.classList.add('flipped', 'hint');
                    
                    setTimeout(() => {
                        card1.classList.remove('flipped', 'hint');
                        card2.classList.remove('flipped', 'hint');
                    }, 1000);
                }
            }
            break;
        // Implementar pistas para otros niveles...
    }
    
    showMessage(`Pista usada (${hintsUsed}/3)`, "info");
}

// Reiniciar juego
function restartGame() {
    if (confirm("¿Estás seguro de que quieres reiniciar el juego?")) {
        initGame();
    }
}

// Cargar nivel
function loadLevel(level) {
    currentLevel = level;
    updateUI();
    levelContainer.innerHTML = '';
    currentLevelData = {};
    
    switch(level) {
        case 1: loadLevel1(); break;
        case 2: loadLevel2(); break;
        case 3: loadLevel3(); break;
        case 4: loadLevel4(); break;
        case 5: loadLevel5(); break;
        case 6: loadLevel6(); break;
        case 7: loadLevel7(); break;
        case 8: loadLevel8(); break;
        case 9: loadLevel9(); break;
        case 10: loadLevel10(); break;
    }
}

// Nivel 1: Completar palabra con sílabas faltantes
function loadLevel1() {
    const words = gameData.level1.words;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    currentLevelData = {
        currentWord: randomWord,
        missingIndices: []
    };
    
    // Seleccionar índices aleatorios para ocultar (al menos 2, máximo la mitad)
    const numToHide = Math.max(2, Math.floor(randomWord.syllables.length / 2));
    while (currentLevelData.missingIndices.length < numToHide) {
        const randomIndex = Math.floor(Math.random() * randomWord.syllables.length);
        if (!currentLevelData.missingIndices.includes(randomIndex)) {
            currentLevelData.missingIndices.push(randomIndex);
        }
    }
    
    // Crear interfaz
    const levelHTML = `
        <h2>Completa la palabra</h2>
        <p>Selecciona las sílabas correctas para completar la palabra</p>
        <div class="word-display">
            ${randomWord.syllables.map((syl, index) => 
                currentLevelData.missingIndices.includes(index) ? 
                    `<span class="syllable-slot" data-index="${index}"></span>` : 
                    `<span>${syl}</span>`
            ).join('')}
        </div>
        <div class="syllable-options">
            ${shuffleArray([...randomWord.syllables, ...getRandomSyllables(randomWord.syllables, 3)])
                .map(syl => `<div class="syllable-option" data-syllable="${syl}">${syl}</div>`)
                .join('')}
        </div>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    // Event listeners para las opciones de sílabas
    document.querySelectorAll('.syllable-option').forEach(option => {
        option.addEventListener('click', function() {
            const syllable = this.dataset.syllable;
            const emptySlots = document.querySelectorAll('.syllable-slot:empty');
            
            if (emptySlots.length > 0) {
                const firstEmptySlot = emptySlots[0];
                firstEmptySlot.textContent = syllable;
                firstEmptySlot.dataset.syllable = syllable;
                
                checkLevel1Completion();
            }
        });
    });
}

// Verificar si se completó el nivel 1
function checkLevel1Completion() {
    const allSlots = document.querySelectorAll('.syllable-slot');
    const allFilled = Array.from(allSlots).every(slot => slot.textContent !== '');
    
    if (allFilled) {
        const isCorrect = Array.from(allSlots).every(slot => {
            const index = parseInt(slot.dataset.index);
            return slot.textContent === currentLevelData.currentWord.syllables[index];
        });
        
        if (isCorrect) {
            score += 100;
            showMessage("¡Correcto! Palabra completada.", "success");
            setTimeout(() => nextLevel(), 1500);
        } else {
            loseLife();
        }
    }
}

// Nivel 2: Memoria de cartas
function loadLevel2() {
    const pairs = gameData.level2.pairs;
    const icons = gameData.level2.icons.slice(0, pairs);
    const cards = [...icons, ...icons];
    
    currentLevelData = {
        cards: shuffleArray(cards),
        flippedCards: [],
        matchedPairs: 0
    };
    
    const levelHTML = `
        <h2>Encuentra los pares</h2>
        <p>Voltea las cartas para encontrar todas las parejas</p>
        <div class="memory-level">
            ${currentLevelData.cards.map((icon, index) => `
                <div class="card" data-index="${index}" data-value="${icon}">
                    <span>${icon}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    // Event listeners para las cartas
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
            if (currentLevelData.flippedCards.length >= 2) return;
            
            this.classList.add('flipped');
            currentLevelData.flippedCards.push(this);
            
            if (currentLevelData.flippedCards.length === 2) {
                const card1 = currentLevelData.flippedCards[0];
                const card2 = currentLevelData.flippedCards[1];
                
                if (card1.dataset.value === card2.dataset.value) {
                    // Par encontrado
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    currentLevelData.flippedCards = [];
                    currentLevelData.matchedPairs++;
                    
                    score += 50;
                    
                    if (currentLevelData.matchedPairs === pairs) {
                        showMessage("¡Todos los pares encontrados!", "success");
                        setTimeout(() => nextLevel(), 1500);
                    }
                } else {
                    // No es un par, voltear de nuevo después de un segundo
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        currentLevelData.flippedCards = [];
                    }, 1000);
                }
            }
        });
    });
}

// Nivel 3: Secuencia de colores
function loadLevel3() {
    const sequences = gameData.level3.sequences;
    const randomSequence = sequences[Math.floor(Math.random() * sequences.length)];
    const colors = gameData.level3.colors;
    
    currentLevelData = {
        sequence: randomSequence.sequence,
        userSequence: [],
        colors: colors
    };
    
    const levelHTML = `
        <h2>Repite la secuencia</h2>
        <p>Memoriza y repite la secuencia de colores que se mostrará</p>
        <div class="sequence-level">
            <div class="sequence-display" id="sequence-display"></div>
            <div class="color-options">
                ${Object.entries(colors).map(([name, color]) => `
                    <div class="color-option" data-color="${name}" style="background-color: ${color}"></div>
                `).join('')}
            </div>
        </div>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    // Mostrar la secuencia al inicio
    showSequence();
    
    // Event listeners para las opciones de color
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            if (currentLevelData.showingSequence) return;
            
            const color = this.dataset.color;
            currentLevelData.userSequence.push(color);
            
            // Resaltar el color seleccionado
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            checkSequence();
        });
    });
}

// Mostrar la secuencia de colores
function showSequence() {
    currentLevelData.showingSequence = true;
    const sequenceDisplay = document.getElementById('sequence-display');
    sequenceDisplay.innerHTML = '';
    
    let i = 0;
    const interval = setInterval(() => {
        if (i >= currentLevelData.sequence.length) {
            clearInterval(interval);
            currentLevelData.showingSequence = false;
            currentLevelData.userSequence = [];
            return;
        }
        
        const color = currentLevelData.sequence[i];
        const colorElement = document.createElement('div');
        colorElement.className = 'sequence-item';
        colorElement.style.backgroundColor = currentLevelData.colors[color];
        sequenceDisplay.appendChild(colorElement);
        
        // Animación
        setTimeout(() => {
            sequenceDisplay.removeChild(colorElement);
        }, 800);
        
        i++;
    }, 1000);
}

// Verificar la secuencia del usuario
function checkSequence() {
    if (currentLevelData.userSequence.length === currentLevelData.sequence.length) {
        const isCorrect = currentLevelData.userSequence.every((color, index) => 
            color === currentLevelData.sequence[index]
        );
        
        if (isCorrect) {
            score += 150;
            showMessage("¡Secuencia correcta!", "success");
            setTimeout(() => nextLevel(), 1500);
        } else {
            showMessage("Secuencia incorrecta. Intenta de nuevo.", "error");
            setTimeout(() => showSequence(), 1500);
        }
    }
}

// Nivel 4: Secuencia de colores con tono musical (similar al 3 pero con sonido)
function loadLevel4() {
    const sequences = gameData.level4.sequences;
    const randomSequence = sequences[Math.floor(Math.random() * sequences.length)];
    const colors = gameData.level4.colors;
    
    currentLevelData = {
        sequence: randomSequence.sequence,
        sounds: randomSequence.sounds,
        userSequence: [],
        colors: colors
    };
    
    const levelHTML = `
        <h2>Repite la secuencia con sonido</h2>
        <p>Memoriza y repite la secuencia de colores y sonidos que se mostrará</p>
        <div class="sequence-level">
            <div class="sequence-display" id="sequence-display"></div>
            <div class="color-options">
                ${Object.entries(colors).map(([name, color]) => `
                    <div class="color-option" data-color="${name}" style="background-color: ${color}"></div>
                `).join('')}
            </div>
        </div>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    // Mostrar la secuencia al inicio
    showSequenceWithSound();
    
    // Event listeners para las opciones de color
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            if (currentLevelData.showingSequence) return;
            
            const color = this.dataset.color;
            currentLevelData.userSequence.push(color);
            
            // Resaltar el color seleccionado y reproducir sonido
            this.style.transform = 'scale(1.2)';
            playSoundForColor(color);
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            checkSequenceWithSound();
        });
    });
}

// Mostrar secuencia con sonido
function showSequenceWithSound() {
    currentLevelData.showingSequence = true;
    const sequenceDisplay = document.getElementById('sequence-display');
    sequenceDisplay.innerHTML = '';
    
    let i = 0;
    const interval = setInterval(() => {
        if (i >= currentLevelData.sequence.length) {
            clearInterval(interval);
            currentLevelData.showingSequence = false;
            currentLevelData.userSequence = [];
            return;
        }
        
        const color = currentLevelData.sequence[i];
        const sound = currentLevelData.sounds[i];
        
        const colorElement = document.createElement('div');
        colorElement.className = 'sequence-item';
        colorElement.style.backgroundColor = currentLevelData.colors[color];
        sequenceDisplay.appendChild(colorElement);
        
        // Reproducir sonido
        playSound(sound);
        
        // Animación
        setTimeout(() => {
            sequenceDisplay.removeChild(colorElement);
        }, 800);
        
        i++;
    }, 1000);
}

// Reproducir sonido para un color
function playSoundForColor(color) {
    const index = currentLevelData.sequence.indexOf(color);
    if (index !== -1) {
        playSound(currentLevelData.sounds[index]);
    }
}

// Reproducir sonido
function playSound(frequency) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.5);
    oscillator.stop(audioCtx.currentTime + 0.5);
}

// Verificar secuencia con sonido
function checkSequenceWithSound() {
    if (currentLevelData.userSequence.length === currentLevelData.sequence.length) {
        const isCorrect = currentLevelData.userSequence.every((color, index) => 
            color === currentLevelData.sequence[index]
        );
        
        if (isCorrect) {
            score += 200;
            showMessage("¡Secuencia correcta!", "success");
            setTimeout(() => nextLevel(), 1500);
        } else {
            showMessage("Secuencia incorrecta. Intenta de nuevo.", "error");
            setTimeout(() => showSequenceWithSound(), 1500);
        }
    }
}

// Nivel 5: Ordenar letras para formar palabra
function loadLevel5() {
    const words = gameData.level5.words;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const scrambledLetters = shuffleArray(randomWord.split(''));
    
    currentLevelData = {
        targetWord: randomWord,
        letters: scrambledLetters,
        selectedLetters: []
    };
    
    const levelHTML = `
        <h2>Ordena las letras</h2>
        <p>Selecciona las letras en el orden correcto para formar la palabra</p>
        <div class="word-display-scramble" id="word-display"></div>
        <div class="letter-options">
            ${scrambledLetters.map((letter, index) => `
                <div class="letter-option" data-letter="${letter}" data-index="${index}">${letter}</div>
            `).join('')}
        </div>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    // Event listeners para las letras
    document.querySelectorAll('.letter-option').forEach(letter => {
        letter.addEventListener('click', function() {
            if (this.classList.contains('used')) return;
            
            const letterChar = this.dataset.letter;
            currentLevelData.selectedLetters.push(letterChar);
            this.classList.add('used');
            
            updateWordDisplay();
            
            // Verificar si la palabra está completa
            if (currentLevelData.selectedLetters.length === currentLevelData.targetWord.length) {
                const userWord = currentLevelData.selectedLetters.join('');
                if (userWord === currentLevelData.targetWord) {
                    score += 120;
                    showMessage("¡Palabra correcta!", "success");
                    setTimeout(() => nextLevel(), 1500);
                } else {
                    showMessage("Palabra incorrecta. Intenta de nuevo.", "error");
                    setTimeout(() => resetLevel5(), 1500);
                }
            }
        });
    });
    
    // Inicializar display de palabra
    updateWordDisplay();
}

// Actualizar display de palabra en nivel 5
function updateWordDisplay() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = '';
    
    for (let i = 0; i < currentLevelData.targetWord.length; i++) {
        const letter = currentLevelData.selectedLetters[i] || '';
        const slot = document.createElement('div');
        slot.className = 'word-slot';
        slot.textContent = letter;
        wordDisplay.appendChild(slot);
    }
}

// Reiniciar nivel 5
function resetLevel5() {
    currentLevelData.selectedLetters = [];
    document.querySelectorAll('.letter-option').forEach(letter => {
        letter.classList.remove('used');
    });
    updateWordDisplay();
}

// Nivel 6: Elemento que no pertenece al grupo
function loadLevel6() {
    const groups = gameData.level6.groups;
    const randomGroup = groups[Math.floor(Math.random() * groups.length)];
    
    currentLevelData = {
        items: shuffleArray([...randomGroup.items]),
        correctAnswer: randomGroup.odd,
        category: randomGroup.category
    };
    
    const levelHTML = `
        <h2>Encuentra el intruso</h2>
        <p>Selecciona el elemento que no pertenece al grupo: ${currentLevelData.category}</p>
        <div class="syllable-options">
            ${currentLevelData.items.map(item => `
                <div class="syllable-option" data-item="${item}">${item}</div>
            `).join('')}
        </div>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    // Event listeners para los elementos
    document.querySelectorAll('.syllable-option').forEach(item => {
        item.addEventListener('click', function() {
            const selectedItem = this.dataset.item;
            
            if (selectedItem === currentLevelData.correctAnswer) {
                score += 130;
                showMessage("¡Correcto! " + selectedItem + " no pertenece al grupo.", "success");
                setTimeout(() => nextLevel(), 1500);
            } else {
                showMessage("Incorrecto. " + selectedItem + " sí pertenece al grupo.", "error");
                loseLife();
            }
        });
    });
}

// Nivel 7: Cruce del puente
function loadLevel7() {
    const config = gameData.level7;
    
    currentLevelData = {
        safePath: config.safePath,
        currentRow: 0,
        currentCol: 0,
        playerPosition: { row: 0, col: 0 }
    };
    
    // Encontrar posición inicial segura en la primera fila
    const safeCols = [];
    for (let col = 0; col < config.columns; col++) {
        if (config.safePath[0][col]) {
            safeCols.push(col);
        }
    }
    currentLevelData.playerPosition.col = safeCols[Math.floor(Math.random() * safeCols.length)];
    
    const levelHTML = `
        <h2>Cruza el puente seguro</h2>
        <p>Selecciona las baldosas seguras para cruzar el puente</p>
        <div class="bridge-level">
            ${Array(config.rows).fill().map((_, row) => `
                <div class="bridge-row">
                    ${Array(config.columns).fill().map((_, col) => `
                        <div class="bridge-tile" data-row="${row}" data-col="${col}"></div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
        <div class="player" id="player"></div>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    // Posicionar al jugador
    const player = document.getElementById('player');
    updatePlayerPosition();
    
    // Event listeners para las baldosas
    document.querySelectorAll('.bridge-tile').forEach(tile => {
        tile.addEventListener('click', function() {
            const row = parseInt(this.dataset.row);
            const col = parseInt(this.dataset.col);
            
            // Solo se puede mover a la siguiente fila
            if (row !== currentLevelData.playerPosition.row + 1) return;
            
            // Verificar si es seguro
            if (config.safePath[row][col]) {
                // Movimiento seguro
                currentLevelData.playerPosition.row = row;
                currentLevelData.playerPosition.col = col;
                updatePlayerPosition();
                
                // Verificar si llegó al final
                if (row === config.rows - 1) {
                    score += 250;
                    showMessage("¡Puente cruzado con éxito!", "success");
                    setTimeout(() => nextLevel(), 1500);
                }
            } else {
                // Baldosa peligrosa
                showMessage("¡Baldosa peligrosa!", "error");
                loseLife();
            }
        });
    });
    
    function updatePlayerPosition() {
        const tile = document.querySelector(`.bridge-tile[data-row="${currentLevelData.playerPosition.row}"][data-col="${currentLevelData.playerPosition.col}"]`);
        const tileRect = tile.getBoundingClientRect();
        const containerRect = levelContainer.getBoundingClientRect();
        
        player.style.left = `${tileRect.left - containerRect.left + (tileRect.width / 2) - 20}px`;
        player.style.top = `${tileRect.top - containerRect.top + (tileRect.height / 2) - 20}px`;
    }
}

// Nivel 8: Corregir palabras mal escritas
function loadLevel8() {
    const words = gameData.level8.words;
    const randomWordPair = words[Math.floor(Math.random() * words.length)];
    
    currentLevelData = {
        incorrectWord: randomWordPair.incorrect,
        correctWord: randomWordPair.correct,
        attempts: 0
    };
    
    const levelHTML = `
        <h2>Corrige la palabra</h2>
        <p>La palabra "${randomWordPair.incorrect}" está mal escrita. Ingresa la corrección:</p>
        <input type="text" id="word-input" placeholder="Escribe la corrección aquí">
        <button id="check-word-btn">Verificar</button>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    document.getElementById('check-word-btn').addEventListener('click', checkWordCorrection);
    document.getElementById('word-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkWordCorrection();
    });
}

// Verificar corrección de palabra
function checkWordCorrection() {
    const userInput = document.getElementById('word-input').value.trim().toLowerCase();
    const correctWord = currentLevelData.correctWord.toLowerCase();
    
    if (userInput === correctWord) {
        score += 140;
        showMessage("¡Corrección correcta!", "success");
        setTimeout(() => nextLevel(), 1500);
    } else {
        currentLevelData.attempts++;
        if (currentLevelData.attempts >= 3) {
            showMessage(`La corrección era: ${currentLevelData.correctWord}`, "error");
            loseLife();
        } else {
            showMessage("Incorrecto. Intenta de nuevo.", "error");
        }
    }
}

// Nivel 9: Sinónimos
function loadLevel9() {
    const wordPairs = gameData.level9.wordPairs;
    const randomPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    const allSynonyms = shuffleArray([...randomPair.synonyms, ...getRandomSynonyms(randomPair.word, 3)]);
    
    currentLevelData = {
        targetWord: randomPair.word,
        correctSynonyms: randomPair.synonyms,
        allOptions: allSynonyms,
        foundSynonyms: []
    };
    
    const levelHTML = `
        <h2>Encuentra los sinónimos</h2>
        <p>Selecciona los sinónimos de la palabra: <strong>${randomPair.word}</strong></p>
        <div class="syllable-options">
            ${allSynonyms.map(syn => `
                <div class="syllable-option" data-synonym="${syn}">${syn}</div>
            `).join('')}
        </div>
        <div class="found-synonyms">
            <p>Sinónimos encontrados: <span id="found-synonyms-list">Ninguno</span></p>
        </div>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    // Event listeners para los sinónimos
    document.querySelectorAll('.syllable-option').forEach(option => {
        option.addEventListener('click', function() {
            const synonym = this.dataset.synonym;
            
            if (currentLevelData.correctSynonyms.includes(synonym)) {
                if (!currentLevelData.foundSynonyms.includes(synonym)) {
                    currentLevelData.foundSynonyms.push(synonym);
                    this.classList.add('matched');
                    updateFoundSynonyms();
                    
                    // Verificar si se encontraron todos
                    if (currentLevelData.foundSynonyms.length === currentLevelData.correctSynonyms.length) {
                        score += 180;
                        showMessage("¡Todos los sinónimos encontrados!", "success");
                        setTimeout(() => nextLevel(), 1500);
                    } else {
                        showMessage("¡Sinónimo correcto!", "success");
                    }
                }
            } else {
                showMessage("Incorrecto. No es un sinónimo.", "error");
                loseLife();
            }
        });
    });
}

// Actualizar lista de sinónimos encontrados
function updateFoundSynonyms() {
    const foundList = document.getElementById('found-synonyms-list');
    
    if (currentLevelData.foundSynonyms.length === 0) {
        foundList.textContent = "Ninguno";
    } else {
        foundList.textContent = currentLevelData.foundSynonyms.join(', ');
    }
}

// Nivel 10: Pupiletras
function loadLevel10() {
    const words = gameData.level10.words;
    const gridSize = gameData.level10.gridSize;
    
    // Crear matriz vacía
    const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
    
    // Colocar palabras en la matriz
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            const row = Math.floor(Math.random() * (direction === 'horizontal' ? gridSize : gridSize - word.length));
            const col = Math.floor(Math.random() * (direction === 'vertical' ? gridSize : gridSize - word.length));
            
            // Verificar si se puede colocar la palabra
            let canPlace = true;
            for (let i = 0; i < word.length; i++) {
                const r = direction === 'horizontal' ? row : row + i;
                const c = direction === 'vertical' ? col : col + i;
                
                if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
                    canPlace = false;
                    break;
                }
            }
            
            // Colocar la palabra si es posible
            if (canPlace) {
                for (let i = 0; i < word.length; i++) {
                    const r = direction === 'horizontal' ? row : row + i;
                    const c = direction === 'vertical' ? col : col + i;
                    grid[r][c] = word[i];
                }
                placed = true;
            }
        }
    });
    
    // Rellenar espacios vacíos con letras aleatorias
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            }
        }
    }
    
    currentLevelData = {
        grid: grid,
        words: words,
        foundWords: [],
        selectedCells: []
    };
    
    const levelHTML = `
        <h2>Pupiletras</h2>
        <p>Encuentra las palabras en la sopa de letras</p>
        <div class="word-search" id="word-grid">
            ${grid.map((row, rowIndex) => 
                row.map((cell, colIndex) => `
                    <div class="word-search-cell" data-row="${rowIndex}" data-col="${colIndex}">${cell}</div>
                `).join('')
            ).join('')}
        </div>
        <div class="word-list">
            <p>Palabras a encontrar:</p>
            ${words.map(word => `
                <div class="word-list-item" data-word="${word}">${word}</div>
            `).join('')}
        </div>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    // Variables para selección de celdas
    let isSelecting = false;
    let startCell = null;
    
    // Event listeners para las celdas
    const cells = document.querySelectorAll('.word-search-cell');
    cells.forEach(cell => {
        cell.addEventListener('mousedown', function(e) {
            isSelecting = true;
            startCell = this;
            currentLevelData.selectedCells = [this];
            this.classList.add('selected');
            e.preventDefault(); // Evitar selección de texto
        });
        
        cell.addEventListener('mouseenter', function() {
            if (isSelecting && startCell !== this) {
                clearSelection();
                selectCellsBetween(startCell, this);
            }
        });
        
        cell.addEventListener('mouseup', function() {
            if (isSelecting) {
                isSelecting = false;
                checkSelectedWord();
            }
        });
    });
    
    // Permitir soltar el mouse fuera de la celda
    document.addEventListener('mouseup', function() {
        if (isSelecting) {
            isSelecting = false;
            checkSelectedWord();
        }
    });
    
    function clearSelection() {
        cells.forEach(c => c.classList.remove('selected'));
        currentLevelData.selectedCells = [];
    }
    
    function selectCellsBetween(cell1, cell2) {
        const row1 = parseInt(cell1.dataset.row);
        const col1 = parseInt(cell1.dataset.col);
        const row2 = parseInt(cell2.dataset.row);
        const col2 = parseInt(cell2.dataset.col);
        
        // Solo seleccionar en línea recta (horizontal, vertical o diagonal)
        if (row1 !== row2 && col1 !== col2 && Math.abs(row1 - row2) !== Math.abs(col1 - col2)) {
            return;
        }
        
        const rowStep = row1 === row2 ? 0 : (row1 < row2 ? 1 : -1);
        const colStep = col1 === col2 ? 0 : (col1 < col2 ? 1 : -1);
        
        let row = row1;
        let col = col1;
        
        while (true) {
            const cell = document.querySelector(`.word-search-cell[data-row="${row}"][data-col="${col}"]`);
            cell.classList.add('selected');
            currentLevelData.selectedCells.push(cell);
            
            if (row === row2 && col === col2) break;
            
            row += rowStep;
            col += colStep;
        }
    }
    
    function checkSelectedWord() {
        if (currentLevelData.selectedCells.length < 2) {
            clearSelection();
            return;
        }
        
        const selectedWord = currentLevelData.selectedCells.map(cell => cell.textContent).join('').toLowerCase();
        const reversedWord = selectedWord.split('').reverse().join('');
        
        // Verificar si la palabra seleccionada está en la lista
        let foundWord = null;
        for (const word of currentLevelData.words) {
            if (!currentLevelData.foundWords.includes(word) && 
                (selectedWord === word.toLowerCase() || reversedWord === word.toLowerCase())) {
                foundWord = word;
                break;
            }
        }
        
        if (foundWord) {
            // Palabra encontrada
            currentLevelData.foundWords.push(foundWord);
            currentLevelData.selectedCells.forEach(cell => {
                cell.classList.remove('selected');
                cell.classList.add('found');
            });
            
            // Marcar palabra en la lista
            document.querySelector(`.word-list-item[data-word="${foundWord}"]`).classList.add('found');
            
            score += 100;
            showMessage(`¡Encontraste "${foundWord}"!`, "success");
            
            // Verificar si se encontraron todas las palabras
            if (currentLevelData.foundWords.length === currentLevelData.words.length) {
                showMessage("¡Todas las palabras encontradas!", "success");
                setTimeout(() => nextLevel(), 1500);
            }
        } else {
            // Palabra incorrecta
            showMessage("Palabra no encontrada en la lista", "error");
            clearSelection();
        }
    }
}

// Pasar al siguiente nivel
function nextLevel() {
    if (currentLevel < 10) {
        currentLevel++;
        loadLevel(currentLevel);
    } else {
        // Juego completado
        clearInterval(timer);
        showMessage("¡Felicidades! Has completado todos los niveles.", "success");
        levelContainer.innerHTML = `
            <h2>¡Juego completado!</h2>
            <p>Puntuación final: ${score}</p>
            <p>¡Felicidades por completar todos los niveles!</p>
            <button id="play-again-btn">Jugar de nuevo</button>
        `;
        
        document.getElementById('play-again-btn').addEventListener('click', initGame);
    }
}

// Funciones auxiliares
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function getRandomSyllables(excludeSyllables, count) {
    const allSyllables = ["ba", "be", "bi", "bo", "bu", "ca", "co", "cu", "da", "de", "di", "do", "fa", "fe", "fi", "fo", "ga", "ge", "gi", "go", "gu", "la", "le", "li", "lo", "lu", "ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "no", "nu", "pa", "pe", "pi", "po", "pu", "ra", "re", "ri", "ro", "ru", "sa", "se", "si", "so", "su", "ta", "te", "ti", "to", "tu", "va", "ve", "vi", "vo"];
    const availableSyllables = allSyllables.filter(syl => !excludeSyllables.includes(syl));
    
    // Seleccionar aleatoriamente, asegurando que no se repitan
    const selected = [];
    while (selected.length < count && availableSyllables.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSyllables.length);
        selected.push(availableSyllables[randomIndex]);
        availableSyllables.splice(randomIndex, 1);
    }
    
    return selected;
}

function getRandomSynonyms(word, count) {
    // Esto es un ejemplo simplificado. En una aplicación real, usarías un diccionario de sinónimos.
    const synonymGroups = {
        "feliz": ["triste", "enojado", "molesto"],
        "rápido": ["lento", "tardío", "pausado"],
        "bonito": ["feo", "horrible", "desagradable"],
        "inteligente": ["tonto", "torpe", "ignorante"]
    };
    
    return synonymGroups[word] ? synonymGroups[word].slice(0, count) : Array(count).fill('???');
}

// Iniciar el juego cuando se cargue la página
window.addEventListener('DOMContentLoaded', initGame);
