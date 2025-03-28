// Variables del juego
let currentLevel = 1;
let lives = 3;
let score = 0;
let timeLeft = 3600;
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

// [El código anterior permanece igual hasta la sección gameData]

const gameData = {
    // Nivel 1: Completar palabra con sílabas faltantes
    level1: {
        words: [
            { word: "computadora", syllables: ["com", "pu", "ta", "do", "ra"] },
            { word: "elefante", syllables: ["e", "le", "fan", "te"] },
            { word: "universidad", syllables: ["u", "ni", "ver", "si", "dad"] },
            { word: "mariposa", syllables: ["ma", "ri", "po", "sa"] },
            { word: "helicoptero", syllables: ["he", "li", "cop", "te", "ro"] },
            { word: "bicicleta", syllables: ["bi", "ci", "cle", "ta"] },
            { word: "telefono", syllables: ["te", "le", "fo", "no"] },
            { word: "refrigerador", syllables: ["re", "fri", "ge", "ra", "dor"] }
        ],
        extraSyllables: ["ba", "be", "bi", "bo", "bu", "ca", "co", "cu", "da", "de", "di", "do", "fa", "fe", "fi", "fo", "ga", "ge", "gi", "go", "gu", "la", "le", "li", "lo", "lu", "ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "no", "nu", "pa", "pe", "pi", "po", "pu", "ra", "re", "ri", "ro", "ru", "sa", "se", "si", "so", "su", "ta", "te", "ti", "to", "tu", "va", "ve", "vi", "vo"]
    },
    
    // Nivel 2: Memoria de cartas
    level2: {
        pairs: 8,
        icons: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🦄", "🐴", "🦋", "🐝", "🐛", "🦀", "🐙", "🦑", "🐬", "🦈", "🐋", "🐅", "🐆"]
    },
    
    // Nivel 3: Secuencia de colores
    level3: {
        sequences: [
            { sequence: ["red", "blue", "green", "yellow"], name: "Secuencia básica" },
            { sequence: ["purple", "orange", "purple", "green"], name: "Secuencia intermedia" },
            { sequence: ["blue", "blue", "red", "yellow", "green"], name: "Secuencia avanzada" },
            { sequence: ["green", "yellow", "red", "blue", "purple"], name: "Secuencia arcoíris" },
            { sequence: ["red", "blue", "yellow", "green", "red", "blue"], name: "Secuencia larga" }
        ],
        colors: {
            red: "#e74c3c",
            blue: "#3498db",
            green: "#2ecc71",
            yellow: "#f1c40f",
            purple: "#9b59b6",
            orange: "#e67e22",
            pink: "#e91e63",
            teal: "#009688"
        }
    },
    
    // Nivel 4: Secuencia de colores con tono musical
    level4: {
        sequences: [
            { sequence: ["red", "blue", "green", "yellow"], sounds: [440, 494, 554, 587], name: "Melodía simple" },
            { sequence: ["purple", "orange", "purple", "green"], sounds: [523, 587, 523, 659], name: "Melodía intermedia" },
            { sequence: ["blue", "blue", "red", "yellow", "green"], sounds: [392, 392, 440, 494, 523], name: "Melodía compleja" },
            { sequence: ["green", "yellow", "red", "blue", "purple"], sounds: [523, 494, 440, 392, 370], name: "Melodía descendente" },
            { sequence: ["red", "blue", "yellow", "green", "red", "blue"], sounds: [440, 523, 494, 587, 440, 523], name: "Melodía oscilante" }
        ],
        colors: {
            red: "#e74c3c",
            blue: "#3498db",
            green: "#2ecc71",
            yellow: "#f1c40f",
            purple: "#9b59b6",
            orange: "#e67e22",
            pink: "#e91e63",
            teal: "#009688"
        }
    },
    
    // Nivel 5: Ordenar letras para formar palabra
    level5: {
        words: ["casa", "perro", "libro", "sol", "agua", "cielo", "flor", "mesa", "luz", "pez", "mar", "pan", "red", "oso", "paz", "rey", "sal", "ojo", "ala", "ola"]
    },
    
    // Nivel 6: Elemento que no pertenece al grupo
    level6: {
        groups: [
            { items: ["manzana", "pera", "uva", "zanahoria"], odd: "zanahoria", category: "frutas" },
            { items: ["auto", "bicicleta", "avión", "heladera"], odd: "heladera", category: "medios de transporte" },
            { items: ["rojo", "azul", "verde", "perro"], odd: "perro", category: "colores" },
            { items: ["gato", "perro", "pez", "árbol"], odd: "árbol", category: "animales" },
            { items: ["silla", "mesa", "sofá", "televisor"], odd: "televisor", category: "muebles" },
            { items: ["enero", "febrero", "lunes", "marzo"], odd: "lunes", category: "meses" },
            { items: ["España", "Francia", "Madrid", "Italia"], odd: "Madrid", category: "países" },
            { items: ["piano", "guitarra", "violín", "libro"], odd: "libro", category: "instrumentos musicales" }
        ]
    },
    
    // Nivel 7: Memoria de sonidos (nuevo)
    level7: {
        sounds: [
            { name: "Campana", frequency: 784 },
            { name: "Flauta", frequency: 659 },
            { name: "Tambor", frequency: 294 },
            { name: "Silbato", frequency: 880 },
            { name: "Xilófono", frequency: 523 },
            { name: "Triángulo", frequency: 1319 }
        ],
        sequences: [
            { sequence: [0, 1, 2], name: "Secuencia simple" },
            { sequence: [3, 1, 4, 2], name: "Secuencia media" },
            { sequence: [5, 2, 1, 4, 0], name: "Secuencia compleja" }
        ]
    },
    
    // Nivel 8: Corregir palabras mal escritas
    level8: {
        words: [
            { incorrect: "haver", correct: "haber" },
            { incorrect: "vajo", correct: "bajo" },
            { incorrect: "sierto", correct: "cierto" },
            { incorrect: "espeso", correct: "espeso" },
            { incorrect: "berde", correct: "verde" },
            { incorrect: "jente", correct: "gente" },
            { incorrect: "echo", correct: "hecho" },
            { incorrect: "tubo", correct: "tuvo" },
            { incorrect: "hico", correct: "hizo" },
            { incorrect: "cullar", correct: "cuchara" }
        ]
    },
    
    // Nivel 9: Sinónimos
    level9: {
        wordPairs: [
            { word: "feliz", synonyms: ["alegre", "contento", "gozoso"] },
            { word: "rápido", synonyms: ["veloz", "ágil", "ligero"] },
            { word: "bonito", synonyms: ["hermoso", "lindo", "bello"] },
            { word: "inteligente", synonyms: ["listo", "sabio", "astuto"] },
            { word: "grande", synonyms: ["enorme", "gigante", "immenso"] },
            { word: "pequeño", synonyms: ["chico", "diminuto", "minúsculo"] },
            { word: "oscuro", synonyms: ["tenebroso", "sombrío", "negro"] }
        ],
        fakeSynonyms: ["triste", "lento", "feo", "tonto", "pequeño", "grande", "claro"]
    },
    
    // Nivel 10: Pupiletras
    level10: {
        words: ["sol", "luna", "estrella", "planeta", "cometa", "galaxia", "astro", "cielo", "tierra", "satelite"],
        gridSize: 12
    }
};

// [Las funciones initGame, updateUI, startTimer, loseLife, gameOver, showMessage permanecen iguales]

// Usar pista - ACTUALIZADA PARA TODOS LOS NIVELES
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
            
        case 3:
            // Mostrar la secuencia nuevamente
            showSequence();
            break;
            
        case 4:
            // Mostrar la secuencia con sonido nuevamente
            showSequenceWithSound();
            break;
            
        case 5:
            // Mostrar la primera letra correcta
            const emptySlots = document.querySelectorAll('.word-slot:empty');
            if (emptySlots.length > 0) {
                const firstEmptyIndex = currentLevelData.selectedLetters.length;
                const correctLetter = currentLevelData.targetWord[firstEmptyIndex];
                const letterOption = document.querySelector(`.letter-option[data-letter="${correctLetter}"]:not(.used)`);
                
                if (letterOption) {
                    letterOption.classList.add('hint');
                    setTimeout(() => letterOption.classList.remove('hint'), 2000);
                }
            }
            break;
            
        case 6:
            // Resaltar el elemento intruso
            const options = document.querySelectorAll('.syllable-option');
            const oddOption = Array.from(options).find(opt => opt.dataset.item === currentLevelData.correctAnswer);
            if (oddOption) {
                oddOption.classList.add('hint');
                setTimeout(() => oddOption.classList.remove('hint'), 2000);
            }
            break;
            
        case 7:
            // Reproducir la secuencia nuevamente
            playSoundSequence();
            break;
            
        case 8:
            // Mostrar la primera letra correcta
            const input = document.getElementById('word-input');
            const correctWord = currentLevelData.correctWord;
            if (input.value.length < correctWord.length) {
                const nextChar = correctWord[input.value.length];
                showMessage(`La siguiente letra es: ${nextChar.toUpperCase()}`, "info");
            }
            break;
            
        case 9:
            // Mostrar un sinónimo correcto no seleccionado
            const unselectedSynonyms = currentLevelData.correctSynonyms.filter(
                syn => !currentLevelData.foundSynonyms.includes(syn)
            );
            if (unselectedSynonyms.length > 0) {
                const randomSynonym = unselectedSynonyms[Math.floor(Math.random() * unselectedSynonyms.length)];
                const synonymOption = document.querySelector(`.syllable-option[data-synonym="${randomSynonym}"]`);
                if (synonymOption) {
                    synonymOption.classList.add('hint');
                    setTimeout(() => synonymOption.classList.remove('hint'), 2000);
                }
            }
            break;
            
        case 10:
            // Mostrar una palabra no encontrada
            const unfoundWords = currentLevelData.words.filter(
                word => !currentLevelData.foundWords.includes(word)
            );
            if (unfoundWords.length > 0) {
                const randomWord = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
                showMessage(`Busca la palabra: ${randomWord.toUpperCase()}`, "info");
            }
            break;
    }
    
    showMessage(`Pista usada (${hintsUsed}/3)`, "info");
}

// [Las funciones restartGame, nextLevel, shuffleArray permanecen iguales]

// Función auxiliar para obtener sílabas aleatorias
function getRandomSyllables(excludeSyllables, count) {
    const availableSyllables = gameData.level1.extraSyllables.filter(
        syl => !excludeSyllables.includes(syl)
    );
    
    // Seleccionar aleatoriamente, asegurando que no se repitan
    const selected = [];
    while (selected.length < count && availableSyllables.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSyllables.length);
        selected.push(availableSyllables[randomIndex]);
        availableSyllables.splice(randomIndex, 1);
    }
    
    // Si no hay suficientes sílabas únicas, completar con repetidas
    while (selected.length < count) {
        const randomIndex = Math.floor(Math.random() * gameData.level1.extraSyllables.length);
        selected.push(gameData.level1.extraSyllables[randomIndex]);
    }
    
    return selected;
}

// [Las funciones loadLevel1 a loadLevel6 permanecen iguales]

// Nivel 7: Memoria de sonidos (nuevo)
function loadLevel7() {
    const sounds = gameData.level7.sounds;
    const sequences = gameData.level7.sequences;
    const randomSequence = sequences[Math.floor(Math.random() * sequences.length)];
    
    currentLevelData = {
        sounds: sounds,
        sequence: randomSequence.sequence.map(index => sounds[index]),
        userSequence: [],
        showingSequence: false
    };
    
    const levelHTML = `
        <h2>Memoria de sonidos</h2>
        <p>Escucha y repite la secuencia de sonidos</p>
        <div class="sound-level">
            <div class="sound-options">
                ${sounds.map((sound, index) => `
                    <div class="sound-option" data-index="${index}">${sound.name}</div>
                `).join('')}
            </div>
        </div>
    `;
    
    levelContainer.innerHTML = levelHTML;
    
    // Mostrar la secuencia al inicio
    playSoundSequence();
    
    // Event listeners para los botones de sonido
    document.querySelectorAll('.sound-option').forEach(option => {
        option.addEventListener('click', function() {
            if (currentLevelData.showingSequence) return;
            
            const index = parseInt(this.dataset.index);
            const sound = currentLevelData.sounds[index];
            
            // Resaltar y reproducir sonido
            this.classList.add('active');
            playSound(sound.frequency);
            
            setTimeout(() => {
                this.classList.remove('active');
            }, 500);
            
            // Añadir a la secuencia del usuario
            currentLevelData.userSequence.push(index);
            
            // Verificar la secuencia
            checkSoundSequence();
        });
    });
}

// Reproducir secuencia de sonidos
function playSoundSequence() {
    currentLevelData.showingSequence = true;
    currentLevelData.userSequence = [];
    
    let i = 0;
    const options = document.querySelectorAll('.sound-option');
    const interval = setInterval(() => {
        if (i >= currentLevelData.sequence.length) {
            clearInterval(interval);
            currentLevelData.showingSequence = false;
            return;
        }
        
        const sound = currentLevelData.sequence[i];
        const option = options[sound.index];
        
        // Resaltar y reproducir
        option.classList.add('active');
        playSound(sound.frequency);
        
        setTimeout(() => {
            option.classList.remove('active');
        }, 500);
        
        i++;
    }, 1000);
}

// Verificar secuencia de sonidos
function checkSoundSequence() {
    if (currentLevelData.userSequence.length === currentLevelData.sequence.length) {
        const isCorrect = currentLevelData.userSequence.every((soundIndex, i) => {
            return soundIndex === currentLevelData.sequence[i].index;
        });
        
        if (isCorrect) {
            score += 200;
            showMessage("¡Secuencia correcta!", "success");
            setTimeout(() => nextLevel(), 1500);
        } else {
            showMessage("Secuencia incorrecta. Escucha de nuevo.", "error");
            setTimeout(() => playSoundSequence(), 1500);
        }
    }
}

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
