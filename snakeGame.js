// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the size of each grid box
const box = 20;

// Initialize the snake with one segment
let snake = [{ x: 9 * box, y: 10 * box }];

// Generate the initial position of the food
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
};

// Initialize the direction of the snake
let direction = null;

// Initialize the score
let score = 0;

// Listen for key presses to change the snake's direction
document.addEventListener('keydown', changeDirection);

// Function to change the direction of the snake
function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

// Define obstacles as an array of positions
let obstacles = [
    { x: 5 * box, y: 5 * box },
    { x: 10 * box, y: 10 * box },
    { x: 15 * box, y: 15 * box },
];

// Function to draw the game on the canvas
function drawGame() {
    // Clear the canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'lime' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        // Only draw borders for the head
        if (i === 0) {
            ctx.strokeStyle = '#000';
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw the obstacles
    ctx.fillStyle = 'gray';
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, box, box);
    }

    // Display the score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);

    // Get the current position of the snake's head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update the position of the snake's head based on the direction
    if (direction === 'UP') snakeY -= box;
    if (direction === 'DOWN') snakeY += box;
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'RIGHT') snakeX += box;

    // Wrap the snake's position when it goes through the wall
    if (snakeX < 0) snakeX = canvas.width - box; // Left wall
    if (snakeX >= canvas.width) snakeX = 0; // Right wall
    if (snakeY < 0) snakeY = canvas.height - box; // Top wall
    if (snakeY >= canvas.height) snakeY = 0; // Bottom wall

    // Check if the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop();
    }

    // Create the new head of the snake
    const newHead = { x: snakeX, y: snakeY };

    // Check for collisions with the wall, itself, or obstacles
    if (
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y) ||
        obstacles.some(obstacle => obstacle.x === newHead.x && obstacle.y === newHead.y)
    ) {
        clearInterval(game);
        alert('Game Over! Your score: ' + score);
    }

    // Add the new head to the snake
    snake.unshift(newHead);
}

// Run the game loop every 100 milliseconds
const game = setInterval(drawGame, 100);