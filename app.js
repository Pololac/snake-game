const canvas = document.getElementById("canvas");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const ctx = canvas.getContext("2d");
let raf;

const GRID_SIZE = 20;

const RECT_RADIUS = 4;


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
let direction = "x";

// eyes position
let eyePosX = GRID_SIZE/2;
let eyePosY = RECT_RADIUS/2;

// body length
let bodyLength = 3;



function drawSnake() {

    snakeItemsPos.forEach((segment, idx) => {

        if(idx === 0) {
            roundedRect(ctx, segment.x*GRID_SIZE, segment.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "green");

            //roundedRect(ctx, (segment.x*GRID_SIZE)+eyePosX, (segment.y*GRID_SIZE)+5, 10, 10, 5, "red");
            //roundedRect(ctx, (segment.x*GRID_SIZE)+eyePosX, (segment.y*GRID_SIZE)+20, 10, 10, 5, "red");

        } else {
            roundedRect(ctx, segment.x*GRID_SIZE, segment.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "blue");
        }

    })

}


function draw() {

    ctx.fillStyle = "rgb(255 255 255 / 30%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let timer = setInterval( () => {

        if(direction === "x") {

            for(let i = 0; i < snakeItemsPos.length; i++) {
                snakeItemsPos[i].x++;
            }
            clearInterval(timer);
        }

        if(direction === "-x") {
            //
        } 
        if(direction === "y") {
            //
        }
        if(direction === "-y") {
            //
        }


    }, 500);

    
    drawSnake();
    
    // // collision
    // if (
    // snakeItem.y + snakeItem.vy > canvas.height - snakeItem.radius ||
    // snakeItem.y + snakeItem.vy < snakeItem.radius
    // ) {
    // snakeItem.vy = -snakeItem.vy;
    // }
    // if (
    // snakeItem.x + snakeItem.vx > canvas.width - snakeItem.radius ||
    // snakeItem.x + snakeItem.vx < snakeItem.radius
    // ) {
    // snakeItem.vx = -snakeItem.vx;
    // }

    raf = window.requestAnimationFrame(draw);

}


btnStart.addEventListener("click", (e) => {
  raf = window.requestAnimationFrame(draw);
});

btnStop.addEventListener("click", (e) => {
  window.cancelAnimationFrame(raf);
});


window.addEventListener(
  "keydown",
  (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "ArrowDown":
            direction = "y";
            eyePosX = HEAD_RADIUS/2;
            eyePosY = 0;
            break;
        case "ArrowUp":
            direction = "-y";
            eyePosX = HEAD_RADIUS/2;
            eyePosY = 0;
            break;
        case "ArrowLeft":
            direction = "-x";
            eyePosX = RECT_DIM/2 - 10;
            eyePosY = HEAD_RADIUS/2;
            break;
        case "ArrowRight":
            direction = "x";
            eyePosX =  RECT_DIM/2;
            eyePosY = HEAD_RADIUS/2;
            break;
        case "Enter":
            raf = window.requestAnimationFrame(draw);
            break;
        case " ":
            bodyLength += 1;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true,
);


//snakeItem.draw();
drawSnake();