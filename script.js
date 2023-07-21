// Constants
const ball = document.querySelector('.ball');
const paddle = document.querySelector('.paddle');
const bricks = document.querySelector('.bricks');

const gameContainer = document.querySelector('.game-container');
const containerRect = gameContainer.getBoundingClientRect();

const ballDiameter = 20;
const paddleWidth = 100;
const paddleHeight = 10;
const brickWidth = 50;
const brickHeight = 20;
const brickRowCount = 4;
const brickColumnCount = 8;
const brickMargin = 5;

let ballX = gameContainer.clientWidth / 2 - ballDiameter / 2;
let ballY = gameContainer.clientHeight / 2 - ballDiameter / 2;
let ballSpeedX = 4;
let ballSpeedY = -4;

let paddleX = gameContainer.clientWidth / 2 - paddleWidth / 2;
const paddleSpeed = 8;

// Create bricks
for (let row = 0; row < brickRowCount; row++) {
  for (let col = 0; col < brickColumnCount; col++) {
    const brick = document.createElement('div');
    brick.classList.add('brick');
    brick.style.left = col * (brickWidth + brickMargin) + 'px';
    brick.style.top = row * (brickHeight + brickMargin) + 'px';
    bricks.appendChild(brick);
  }
}

// Event listener for moving the paddle
document.addEventListener('mousemove', function (event) {
  const mouseX = event.clientX - containerRect.left;
  paddleX = mouseX - paddleWidth / 2;
});

// Game loop
function update() {
  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check collision with walls
  if (ballX <= 0 || ballX >= gameContainer.clientWidth - ballDiameter) {
    ballSpeedX *= -1;
  }

  if (ballY <= 0) {
    ballSpeedY *= -1;
  }

  // Check collision with paddle
  if (
    ballY >= gameContainer.clientHeight - ballDiameter - paddleHeight &&
    ballX >= paddleX &&
    ballX <= paddleX + paddleWidth
  ) {
    ballSpeedY *= -1;
  }

  // Check collision with bricks
  const brickElements = document.querySelectorAll('.brick');
  brickElements.forEach((brick) => {
    const brickRect = brick.getBoundingClientRect();
    if (
      ballY + ballDiameter >= brickRect.top &&
      ballY <= brickRect.bottom &&
      ballX + ballDiameter >= brickRect.left &&
      ballX <= brickRect.right
    ) {
      ballSpeedY *= -1;
      brick.parentNode.removeChild(brick);
    }
  });

  // Game over if ball hits the bottom
  if (ballY >= gameContainer.clientHeight - ballDiameter) {
    alert('Game Over');
    document.location.reload();
  }

  // Update ball position
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';

  // Update paddle position
  paddle.style.left = paddleX + 'px';

  requestAnimationFrame(update);
}

update();
