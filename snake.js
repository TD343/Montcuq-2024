// Initialisation du canvas et du contexte
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Paramètres du jeu
const boxSize = 20; // Taille de chaque case
const canvasWidth = canvas.width / boxSize; // Nombre de cases en largeur
const canvasHeight = canvas.height / boxSize; // Nombre de cases en hauteur
let snake = [{ x: 9, y: 9 }]; // Position initiale du serpent
let direction = null; // Direction initiale (null pour éviter de commencer)
let food = randomFoodPosition(); // Position initiale de la nourriture
let score = 0;
let gameRunning = false; // Le jeu ne démarre pas automatiquement

// Fonction pour dessiner le jeu
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le serpent
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'blue' : 'green'; // Tête bleue, corps vert
        ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
    }

    // Dessiner la nourriture
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

    // Dessiner le score
    ctx.fillStyle = '#0077b6';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Fonction pour générer une position aléatoire pour la nourriture
function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * canvasWidth),
        y: Math.floor(Math.random() * canvasHeight)
    };
}

// Mise à jour de la position du serpent
function updateGame() {
    if (!gameRunning) return; // Empêche la mise à jour si le jeu n'est pas lancé

    // Calcule la nouvelle position de la tête
    let head = { ...snake[0] };
    if (direction === 'RIGHT') head.x += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;

    // Vérifie si le serpent mange la nourriture
    if (head.x === food.x && head.y === food.y) {
        score += 1;
        food = randomFoodPosition();
    } else {
        snake.pop(); // Supprime la dernière partie du serpent si pas de nourriture mangée
    }

    // Ajoute la nouvelle tête au début du serpent
    snake.unshift(head);

    // Vérifie les collisions avec les bords ou le corps
    if (
        head.x < 0 || head.x >= canvasWidth ||
        head.y < 0 || head.y >= canvasHeight ||
        collisionWithBody(head)
    ) {
        alert('Game Over! Score: ' + score);
        document.location.reload();
    }
}

// Fonction pour vérifier les collisions avec le corps
function collisionWithBody(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

// Fonction pour gérer la direction à partir des touches du clavier
document.addEventListener('keydown', function (event) {
    if (!gameRunning) gameRunning = true; // Démarre le jeu à la première touche
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

// Gestion des gestes tactiles pour mobiles
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', function (event) {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

canvas.addEventListener('touchmove', function (event) {
    if (!gameRunning) gameRunning = true; // Démarre le jeu au premier geste

    const touch = event.touches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && direction !== 'LEFT') direction = 'RIGHT';
        else if (diffX < 0 && direction !== 'RIGHT') direction = 'LEFT';
    } else {
        if (diffY > 0 && direction !== 'UP') direction = 'DOWN';
        else if (diffY < 0 && direction !== 'DOWN') direction = 'UP';
    }
});

// Boucle principale du jeu
function gameLoop() {
    updateGame();
    drawGame();
    setTimeout(gameLoop, 100); // La vitesse du jeu (100 ms par mouvement)
}

// Lancer la boucle de jeu
drawGame(); // Affiche le plateau initial sans démarrer le jeu
gameLoop(); // Met à jour le jeu selon l'état `gameRunning`
