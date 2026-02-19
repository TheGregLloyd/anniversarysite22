const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

ctx.imageSmoothingEnabled = false;


const paddleSprite1 = new Image();
paddleSprite1.src = "images/ellaPaddle.png";

const paddleSprite2 = new Image();
paddleSprite2.src = "images/georgePaddle.png";

const ballSprite = new Image();
ballSprite.src = "images/ball.png";

const hitSound = document.getElementById("hitSound");

// Paddle settings
const paddleWidth = 50;
const paddleHeight = 120;
const paddleSpeed = 8;

// Ball settings
const ballSize = 20;

// Player positions
let player1 = { x: 20, y: canvas.height / 2 - paddleHeight / 2 };
let player2 = { x: canvas.width - 40, y: canvas.height / 2 - paddleHeight / 2 };

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 4,
    dy: 4
};

let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {

    // Player 1 (W/S)
    if (keys["w"] && player1.y > 0) player1.y -= paddleSpeed;
    if (keys["s"] && player1.y < canvas.height - paddleHeight) player1.y += paddleSpeed;

    // Player 2 (Arrow keys)
    if (keys["ArrowUp"] && player2.y > 0) player2.y -= paddleSpeed;
    if (keys["ArrowDown"] && player2.y < canvas.height - paddleHeight) player2.y += paddleSpeed;

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (top/bottom)
    if (ball.y <= 0 || ball.y >= canvas.height - ballSize) {
        ball.dy *= -1;
        playHit();
    }

    // Paddle collision
    if (
        ball.x <= player1.x + paddleWidth &&
        ball.y + ballSize >= player1.y &&
        ball.y <= player1.y + paddleHeight
    ) {
        ball.dx *= -1.2;
        playHit();
    }

    if (
        ball.x + ballSize >= player2.x &&
        ball.y + ballSize >= player2.y &&
        ball.y <= player2.y + paddleHeight
    ) {
        ball.dx *= -1.2;
        playHit();
    }

    // Reset if out of bounds
    if (ball.x < 0 || ball.x > canvas.width) {
        resetBall();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.drawImage(paddleSprite1, player1.x, player1.y, paddleWidth, paddleHeight);
    ctx.drawImage(paddleSprite2, player2.x, player2.y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.drawImage(ballSprite, ball.x, ball.y, ballSize, ballSize);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4
    ball.dx *= -1;
}

function playHit() {
    hitSound.currentTime = 0;
    hitSound.play();
}

function gameLoop() {
    update();
    draw();
}

setInterval(gameLoop, 1000 / 60);
