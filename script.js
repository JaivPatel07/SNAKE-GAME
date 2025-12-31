document.addEventListener("DOMContentLoaded", () => {
  const scoreElement = document.querySelector('.score');
  const box = document.getElementById("box");

  box.width = 400;
  box.height = 400;

  const width = box.width;
  const height = box.height;
  const boxContext = box.getContext('2d');

  const snakeColor = "green";
  const foodColor = "red";
  const bgColor = "white";
  const unitSize = 25;

  let running = false;
  let xVelocity = unitSize;
  let yVelocity = 0;
  let xFood;
  let yFood;
  let score = 0;

  let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
  ];

  window.addEventListener("keydown", changePosition);
  gameStart();

  function gameStart() {
    running = true;
    score = 0;
    scoreElement.textContent = score;
    createFood();
    nextTick();
  }

  function nextTick() {
    if (running) {
      setTimeout(() => {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
      }, 100);
    }
  }

  function clearBoard() {
    boxContext.fillStyle = bgColor;
    boxContext.fillRect(0, 0, width, height);
  }

  function createFood() {
    function randomFood(min, max) {
      return Math.floor((Math.random() * (max - min) + min) / unitSize) * unitSize;
    }

    do {
      xFood = randomFood(0, width);
      yFood = randomFood(0, height);
    } while (snake.some(part => part.x === xFood && part.y === yFood));
  }

  function drawFood() {
    boxContext.fillStyle = foodColor;
    boxContext.fillRect(xFood, yFood, unitSize, unitSize);
  }

  function moveSnake() {
    const head = {
      x: snake[0].x + xVelocity,
      y: snake[0].y + yVelocity
    };

    snake.unshift(head);

    if (head.x === xFood && head.y === yFood) {
      score++;
      scoreElement.textContent = score;
      createFood();
    } else {
      snake.pop();
    }
  }

  function drawSnake() {
    boxContext.fillStyle = snakeColor;
    snake.forEach(part => {
      boxContext.fillRect(part.x, part.y, unitSize, unitSize);
    });
  }

  function changePosition(event) {
    const key = event.key;

    if (key === "ArrowUp" && yVelocity === 0) {
      xVelocity = 0;
      yVelocity = -unitSize;
    }
    if (key === "ArrowDown" && yVelocity === 0) {
      xVelocity = 0;
      yVelocity = unitSize;
    }
    if (key === "ArrowLeft" && xVelocity === 0) {
      xVelocity = -unitSize;
      yVelocity = 0;
    }
    if (key === "ArrowRight" && xVelocity === 0) {
      xVelocity = unitSize;
      yVelocity = 0;
    }
  }

  function checkGameOver() {
    const head = snake[0];

    if (
      head.x < 0 ||
      head.x >= width ||
      head.y < 0 ||
      head.y >= height
    ) {
      endGame();
    }

    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        endGame();
      }
    }
  }

  function endGame() {
    running = false;
    alert("Game Over! Score: " + score);
  }

  const resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", resetGame);
  function resetGame() {
    running = false;

    snake = [
      { x: unitSize * 4, y: 0 },
      { x: unitSize * 3, y: 0 },
      { x: unitSize * 2, y: 0 },
      { x: unitSize, y: 0 },
      { x: 0, y: 0 }
    ];

    xVelocity = unitSize;
    yVelocity = 0;
    score = 0;
    scoreElement.textContent = score;

    clearBoard();
    createFood();
    running = true;
    nextTick();
  }
});
