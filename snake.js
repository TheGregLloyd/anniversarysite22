const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const gridSize = 40;
const tileCount = canvas.width / gridSize;


const snakeSprite = new Image();
snakeSprite.src = "images/chip.png";   

const appleSprite = new Image();
appleSprite.src = "images/dip.png";   

let snake = [
    { x: 10, y: 10 }
];

let apple = {
    x: 5,
    y: 5
};

let dx = 0;
let dy = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0; dy = -1;
    }
    if (e.key === "ArrowDown" && dy === 0) {
        dx = 0; dy = 1;
    }
    if (e.key === "ArrowLeft" && dx === 0) {
        dx = -1; dy = 0;
    }
    if (e.key === "ArrowRight" && dx === 0) {
        dx = 1; dy = 0;
    }
}

function gameLoop() {
    update();
    draw();
}

function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wall collision
    if (head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount) {
        resetGame();
        return;
    }

    // Self collision
    for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
            resetGame();
            return;
        }
    }

    snake.unshift(head);

    // Apple collision
    if (head.x === apple.x && head.y === apple.y) {
        apple.x = Math.floor(Math.random() * tileCount);
        apple.y = Math.floor(Math.random() * tileCount);
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(part => {
        ctx.drawImage(
            snakeSprite,
            part.x * gridSize,
            part.y * gridSize,
            gridSize,
            gridSize
        );
    });

    // Draw apple
    ctx.drawImage(
        appleSprite,
        apple.x * gridSize,
        apple.y * gridSize,
        gridSize,
        gridSize
    );
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
}

setInterval(gameLoop, 100);
