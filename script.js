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

// Datos del juego
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

// [Las funciones loadLevel8 a loadLevel10 permanecen iguales]

// [El resto del código permanece igual]
