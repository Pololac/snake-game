
const btnStart = document.getElementById("btn-start");
const btnReplay = document.getElementById("btn-replay");
const buttons = document.querySelectorAll("#speed-buttons button");

const scoreDisplay = document.getElementById("score");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GRID_SIZE = 20;
canvas.width = 30 * GRID_SIZE;
canvas.height = 20 * GRID_SIZE;

const RECT_RADIUS = 4;

// game speed
let gameSpeed = 400;

// score
let score = 0;

// rectangle with border radius
function roundedRect(ctx, x, y, width, height, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

// snake positions
let snakeItemsPos = [
    { x: 14, y: 10 },  // head
    { x: 13, y: 10 },  // segments...
    { x: 12, y: 10 },
    { x: 11, y: 10 }
];


// food position
function randomFoodPosition(max) {
    totalGrid = max / GRID_SIZE;
    return Math.floor(Math.random()*totalGrid);
}

let foodPosition = {x: randomFoodPosition(canvas.width), y: randomFoodPosition(canvas.height)};


// initialize direction
let xDir = 0;
let yDir = 0;


// draw snake elements
function drawSnake() {
    snakeItemsPos.forEach((segment, idx) => {
        if(idx === 0) {
            roundedRect(ctx, segment.x*GRID_SIZE, segment.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "green");
        } else {
            roundedRect(ctx, segment.x*GRID_SIZE, segment.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "blue");
        }
    })
}

// draw snake food
function drawFood() {
    roundedRect(ctx, foodPosition.x*GRID_SIZE, foodPosition.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "red");
}

 
function updateGame() {
    let isEating = false;

    // create new head
    const head = {
        x: snakeItemsPos[0].x + xDir,
        y: snakeItemsPos[0].y + yDir
    }

    // check if head don't touch borders
    if (snakeItemsPos[0].x >= canvas.width/GRID_SIZE || snakeItemsPos[0].x < 0 || snakeItemsPos[0].y >= canvas.height/GRID_SIZE || snakeItemsPos[0].y < 0){
        clearInterval(gameLoop);
        return;
    }

    // check if snake head don't touche snake body
    for(let i = 1; i < snakeItemsPos.length; i++) {
        if(head.x === snakeItemsPos[i].x && head.y === snakeItemsPos[i].y) {
            clearInterval(gameLoop);
            return;
        }
    }

    // check if head position is on the food
    if(snakeItemsPos[0].x === foodPosition.x && snakeItemsPos[0].y === foodPosition.y) {
        isEating = true;
        foodPosition = {x: randomFoodPosition(canvas.width), y: randomFoodPosition(canvas.height)};
        updateScore();
        console.log("updateGame : " + score);
    }

    // add new head and remove last element
    snakeItemsPos.unshift(head);

    // if isEating we keep the last element
    if(isEating === false) {
        snakeItemsPos.pop();
    }

    displayScore();

    ctx.fillStyle = "rgb(255 255 255 / 80%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();

}

// Update score
function updateScore() {
    score += 1;
}

// Display score
function displayScore() {
    return scoreDisplay.innerText = `Score : ${score}`;
}



// Difficulty choice
buttons.forEach (btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        gameSpeed = btn.dataset.speed;
    });
});


// declare gameLoop for interval id
let gameLoop;

// start new game
btnStart.addEventListener("click", (e) => {
    xDir = 1;
    yDir = 0;
    
    gameLoop = setInterval(updateGame, gameSpeed);
});

// TO DO
// Replay game
btnReplay.addEventListener("click", (e) => {


});

// event listener keyboard
window.addEventListener(
  "keydown",
  (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "ArrowDown":
            if(yDir === 0) {
                yDir = 1;
            }
            xDir = 0;
            break;
        case "ArrowUp":
            if(yDir === 0) {
                yDir = -1;
            };
            xDir = 0;
            break;
        case "ArrowLeft":
            yDir = 0;
            if(xDir === 0) {
                xDir = -1;
            }
            break;
        case "ArrowRight":
            yDir = 0;
            if(xDir === 0) {
                xDir = 1;
            }
            break;
        case "Enter":
            //
            break;
        case " ":
            //
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true,
);



displayScore();
drawSnake();
drawFood();

