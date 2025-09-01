
const buttons = document.querySelectorAll("button");
const btnStart = document.getElementById("btn-start");
const btnReplay = document.getElementById("btn-replay");
const btnSpeedChoice = document.querySelectorAll("#speed-buttons button");

const scoreDisplay = document.getElementById("score");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GRID_SIZE = 20;
canvas.width = 30 * GRID_SIZE;
canvas.height = 20 * GRID_SIZE;
let maxX = canvas.width/GRID_SIZE;
let maxY = canvas.height/GRID_SIZE;

const RECT_RADIUS = 4;

// game speed
let gameSpeed = 300;

// score
let score = 0;

// declare gameLoop for interval id
let gameLoop;


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

// Positionnement aléatoire dans grille
function randomCellPosition(max) {
    const totalGrids = max / GRID_SIZE;
    return Math.floor(Math.random() * totalGrids);
}

// Convertir coordonnée de grille en pixel (centré dans la case)
function cellToPx(cellIndex) {
    return (cellIndex + 0.5) * GRID_SIZE;
}

let flowerGridPosition = { x: 0, y: 0 };

function setNewGridFlowerPosition() {
    // Random positon of Flower (en pixel)
    flowerGridPosition = {
        x: randomCellPosition(canvas.width),
        y: randomCellPosition(canvas.height)
    };

    // Donne un boost de vitesse à la nouvelle fleur
    speed = 3; // tours par seconde au départ
}

let flowerAngle = 0;

// draw Flower
function drawFlower() {
    // Diamètre < 20px (taille d'une cellule)
    const petalR = 4;   // rayon d'un pétale en px
    const centerR = 3;  // rayon du cœur
    const offset = 5;  // distance du centre vers chaque pétale
  
    // position du centre de la fleur (en pixel)
    const px = cellToPx(flowerGridPosition.x);
    const py = cellToPx(flowerGridPosition.y);

    // Pour l'animation de la fleur
    ctx.save();                // sauve l’état actuel du canvas
    ctx.translate(px, py);       // déplace le point d’origine au centre de la fleur
    ctx.rotate(flowerAngle);   // rotation autour du centre
    
    
    // 4 Petales (coordonnées relatives au centre de la fleur)
    for (let i = 0; i < 5; i++) {
        ctx.fillStyle = "#ffd34d";
        const a = i * (2 * Math.PI / 5);        // // 360° / 5 = 72°

        const px = Math.cos(a) * offset;  // relatif
        const py = Math.sin(a) * offset;  // relatif
        
        ctx.beginPath();
        ctx.arc(px, py, petalR, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Coeur
    ctx.fillStyle = "#ff0000"; // jaune
    ctx.beginPath();
    ctx.arc(0, 0, centerR, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // restaure l’état du canvas (pas de rotation pour le reste)

}

    // Animation de la fleur
    const TAU = Math.PI * 2; // 1 tour complet
    let speed = 0;        // tours/s au début
    const friction = 0.95;  // ralentit: ~95%/seconde



function updateGame() {
    let isEating = false;

    // create new head
    const head = {
        x: snakeItemsPos[0].x + xDir,
        y: snakeItemsPos[0].y + yDir
    }

    // check if head don't touch borders
    if (head.x >= maxX || head.x < 0 || head.y >= maxY || head.y < 0){
        gameOver();
        return;
    }

    // check if snake head don't touch snake body
    for(let i = 1; i < snakeItemsPos.length; i++) {
        if(head.x === snakeItemsPos[i].x && head.y === snakeItemsPos[i].y) {
            gameOver();
            return;
        }
    }

    // check if head position is on the food
    if(snakeItemsPos[0].x === flowerGridPosition.x && snakeItemsPos[0].y === flowerGridPosition.y) {
        isEating = true;
        updateScore();
        setNewGridFlowerPosition();
        drawFlower();
        snakeEatingAudiosound();
        console.log("updateGame : " + score);

    }

    // add new head and remove last element
    snakeItemsPos.unshift(head);

    // if isEating we keep the last element
    if(isEating === false) {
        snakeItemsPos.pop();
    }

    snakeMovingAudiosound();

    displayScore();
    // ctx.fillStyle = "rgb(255 255 255 / 80%)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Animation de la fleur
    speed *= friction;
    flowerAngle = (flowerAngle + TAU * speed / 60) % TAU;
    drawFlower();

    drawSnake();
}

// Update score
function updateScore() {
    score += 1;
}

// Display score
function displayScore() {
    return scoreDisplay.innerText = `Score : ${score}`;
}

// Game over
function gameOver() {
    gameOverAudiosound();
    clearInterval(gameLoop);

    ctx.fillStyle = "#ffffff"
    ctx.font = "48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}


// Difficulty choice
btnSpeedChoice.forEach (btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        gameSpeed = btn.dataset.speed, 10;
        console.log(gameSpeed);
    });
});


// start game
btnStart.addEventListener("click", () => {
    xDir = 1;
    yDir = 0;
    console.log(gameLoop);
    if(gameLoop == null) {
        gameLoop = setInterval(updateGame, gameSpeed);
    } 
});


// reset game to initial state and stop actual game
function resetGameToInitialState() {

    // stop and reset gameLoop
    clearInterval(gameLoop);
    gameLoop = null;
    // reset score
    score = 0;
    // reset draw context
    ctx.reset();
    
    // reset snake position
    snakeItemsPos = [
        { x: 14, y: 10 },  
        { x: 13, y: 10 },  
        { x: 12, y: 10 },
        { x: 11, y: 10 }
    ];

    // draw new snake and flower with new position
    drawSnake();
    setNewGridFlowerPosition()
    drawFlower();

}


// Replay game - reset the game at initial state
btnReplay.addEventListener("click", () => {
    resetGameToInitialState();
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
setNewGridFlowerPosition();
drawFlower();


// audio animation //

// buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
    if (typeof audioCtx === 'undefined') {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioCtx = new AudioContext();
    }
    
    if (window.audioCtx) {
        const oscillator = window.audioCtx.createOscillator();
        const gainNode = window.audioCtx.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, window.audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(150, window.audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, window.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioCtx.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(window.audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(window.audioCtx.currentTime + 0.2);
    }
    });
});


// snake moving audiosound
function snakeMovingAudiosound() {

    if (typeof audioCtx === 'undefined') {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          window.audioCtx = new AudioContext();
        }
        
        if (window.audioCtx) {
          const oscillator = window.audioCtx.createOscillator();
          const gainNode = window.audioCtx.createGain();
          
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(100, window.audioCtx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(300, window.audioCtx.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.05, window.audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioCtx.currentTime + 0.1);
          
          oscillator.connect(gainNode);
          gainNode.connect(window.audioCtx.destination);
          
          oscillator.start();
          oscillator.stop(window.audioCtx.currentTime + 0.1);
    }
}


// snake eating audiosound
function snakeEatingAudiosound() {

    if (typeof audioCtx === 'undefined') {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          window.audioCtx = new AudioContext();
        }
        
        if (window.audioCtx) {
          const oscillator = window.audioCtx.createOscillator();
          const gainNode = window.audioCtx.createGain();
          
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(500, window.audioCtx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(700, window.audioCtx.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.05, window.audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioCtx.currentTime + 0.1);
          
          oscillator.connect(gainNode);
          gainNode.connect(window.audioCtx.destination);
          
          oscillator.start();
          oscillator.stop(window.audioCtx.currentTime + 0.1);
    }
}
    

// game over audiosound
function gameOverAudiosound() {

    if (typeof audioCtx === 'undefined') {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          window.audioCtx = new AudioContext();
        }
        
        if (window.audioCtx) {
          const oscillator = window.audioCtx.createOscillator();
          const gainNode = window.audioCtx.createGain();
          
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(1000, window.audioCtx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, window.audioCtx.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.05, window.audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioCtx.currentTime + 0.1);
          
          oscillator.connect(gainNode);
          gainNode.connect(window.audioCtx.destination);
          
          oscillator.start();
          oscillator.stop(window.audioCtx.currentTime + 0.1);
    }
}