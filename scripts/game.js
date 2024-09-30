const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const scoreElement = document.getElementById('score-value');
const levelElement = document.getElementById('level-value');
const mobileControls = document.getElementById('mobile-controls');

let gridSize, tileCount;
let snake, food, dx, dy, score, level, gameLoop, gameSpeed;

function initializeGame() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const size = Math.min(screenWidth, screenHeight) * 0.9;

    canvas.width = canvas.height = size;
    gridSize = Math.floor(size / 20);
    tileCount = Math.floor(size / gridSize);

    snake = [{ x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }];
    food = {};
    dx = 0;
    dy = 0;
    score = 0;
    level = 1;
    gameSpeed = 200;
}

function drawGame() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
    updateScore();
    updateLevel();
}

function clearCanvas() {
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
        if (score % 5 === 0) {
            levelUp();
        }
    } else {
        snake.pop();
    }
}

function drawSnake() {
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#2ecc71';
        } else {
            ctx.fillStyle = `hsl(${200 + index * 5}, 100%, 50%)`;
        }
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        
        if (index === 0) {
            ctx.fillStyle = '#000';
            ctx.fillRect(segment.x * gridSize + 3, segment.y * gridSize + 3, 4, 4);
            ctx.fillRect(segment.x * gridSize + gridSize - 7, segment.y * gridSize + 3, 4, 4);
        }
    });
}

function drawFood() {
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc((food.x + 0.5) * gridSize, (food.y + 0.5) * gridSize, gridSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function updateScore() {
    scoreElement.textContent = score;
    scoreElement.style.animation = 'pulse 0.3s';
    setTimeout(() => {
        scoreElement.style.animation = '';
    }, 300);
}

function updateLevel() {
    levelElement.textContent = level;
}

function levelUp() {
    level++;
    gameSpeed = Math.max(50, gameSpeed - 20);
    clearInterval(gameLoop);
    gameLoop = setInterval(drawGame, gameSpeed);
    
    levelElement.style.animation = 'pulse 0.5s';
    setTimeout(() => {
        levelElement.style.animation = '';
    }, 500);
}

function gameOver() {
    clearInterval(gameLoop);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    startButton.style.display = 'block';
    startButton.style.animation = 'fadeIn 1s';
}

function changeDirection(newDx, newDy) {
    if ((newDx === 1 && dx !== -1) || (newDx === -1 && dx !== 1) ||
        (newDy === 1 && dy !== -1) || (newDy === -1 && dy !== 1)) {
        dx = newDx;
        dy = newDy;
    }
}

function handleKeydown(event) {
    const key = event.key;
    if (key === 'ArrowLeft') changeDirection(-1, 0);
    if (key === 'ArrowUp') changeDirection(0, -1);
    if (key === 'ArrowRight') changeDirection(1, 0);
    if (key === 'ArrowDown') changeDirection(0, 1);
}

function startGame() {
    initializeGame();
    generateFood();
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(drawGame, gameSpeed);
    startButton.style.display = 'none';
}

document.addEventListener('keydown', handleKeydown);
startButton.addEventListener('click', startGame);

// Mobile controls
document.getElementById('left').addEventListener('click', () => changeDirection(-1, 0));
document.getElementById('up').addEventListener('click', () => changeDirection(0, -1));
document.getElementById('right').addEventListener('click', () => changeDirection(1, 0));
document.getElementById('down').addEventListener('click', () => changeDirection(0, 1));

// Prevent scrolling when touching the canvas
document.body.addEventListener('touchstart', function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });
document.body.addEventListener('touchend', function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });

// Initial setup
initializeGame();
clearCanvas();
drawSnake();
generateFood();
drawFood();