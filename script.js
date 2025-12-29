// ================================
// SNAKE GAME - MAIN JAVASCRIPT FILE
// ================================

// Get DOM elements
const board = document.getElementById("game-board");
const scoreEl = document.getElementById("score");

// Game settings
const gridSize = 20;
const speed = 150;

// Game state
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;
let gameStarted = false;

// ================================
// DRAW FUNCTION
// ================================
function draw() {
  board.innerHTML = "";

  // Draw snake
  snake.forEach(part => {
    const div = document.createElement("div");
    div.style.gridColumnStart = part.x;
    div.style.gridRowStart = part.y;
    div.classList.add("snake");
    board.appendChild(div);
  });

  // Draw food
  const foodDiv = document.createElement("div");
  foodDiv.style.gridColumnStart = food.x;
  foodDiv.style.gridRowStart = food.y;
  foodDiv.classList.add("food");
  board.appendChild(foodDiv);
}

// ================================
// MOVE SNAKE
// ================================
function moveSnake() {
  // Don't move until user presses a key
  if (!gameStarted) return;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // Wall collision
  if (
    head.x < 1 || head.x > gridSize ||
    head.y < 1 || head.y > gridSize
  ) {
    gameOver();
    return;
  }

  // Self collision
  for (let part of snake) {
    if (part.x === head.x && part.y === head.y) {
      gameOver();
      return;
    }
  }

  // Add new head
  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    generateFood();
  } else {
    snake.pop(); // Remove tail
  }
}

// ================================
// GENERATE FOOD
// ================================
function generateFood() {
  food = {
    x: Math.floor(Math.random() * gridSize) + 1,
    y: Math.floor(Math.random() * gridSize) + 1
  };
}

// ================================
// GAME OVER
// ================================
function gameOver() {
  alert("Game Over! Score: " + score);
  location.reload();
}

// ================================
// KEYBOARD CONTROLS
// ================================
document.addEventListener("keydown", e => {
  // Prevent reverse movement
  if (e.key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -1 };
    gameStarted = true;
  } else if (e.key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: 1 };
    gameStarted = true;
  } else if (e.key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -1, y: 0 };
    gameStarted = true;
  } else if (e.key === "ArrowRight" && direction.x === 0) {
    direction = { x: 1, y: 0 };
    gameStarted = true;
  }
});

// ================================
// GAME LOOP
// ================================
setInterval(() => {
  moveSnake();
  draw();
}, speed);
