const canvas = document.getElementById("canvas");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const ctx = canvas.getContext("2d");
let raf;

const RECT_RADIUS = 15;
const RECT_DIM = 40;

// initialize direction
let direction = "x";

// eyes position
let eyePosX = 0;
let eyePosY = RECT_RADIUS/2;

// body length
let bodyLength = 3;

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

const ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    radius: 25,
    color: "blue",
    draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    }
};


const snake = {
    x: 200,
    y: 200,
    vx: 1,
    vy: 1,
    width: RECT_DIM,
    height: RECT_DIM,
    radius: RECT_RADIUS,
    draw() {
          
        // snake head
      
        // ctx.beginPath();
        // ctx.fillStyle = "green";
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        // ctx.fill();

        roundedRect(ctx, this.x, this.y, this.width, this.height, this.radius, "green");
        
        roundedRect(ctx, this.x+10, this.y+5, 10, 10, 5, "red");
        roundedRect(ctx, this.x+10, this.y+20, 10, 10, 5, "red");


        // snake body
        for(let i = 1; i<= bodyLength; i++) {

            roundedRect(ctx, this.x+(i*35), this.y, this.width, this.height, this.radius, "green");

            // setTimeout(() => {
            //     roundedRect(ctx, this.x+(i*35), this.y, 40, 40, 15);
            //     //ctx.beginPath();
            //     //ctx.fillStyle = "green";
            //     //ctx.arc(this.x+(i*15), this.y+(i*15), this.radius, 0, Math.PI * 2, true);
            //     //ctx.fill();
            // },1000+(i*200));

        }

    }
};




function draw() {
    ctx.fillStyle = "rgb(255 255 255 / 30%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ball.draw();
    // ball.x += ball.vx;
    // ball.y += ball.vy;
    // ball.vy *= 0.99;
    // ball.vy += 0.25;

    snake.draw();

    if(direction === "x") {
        snake.x += snake.vx;
    }
    if(direction === "-x") {
        snake.x -= snake.vx;
    } 
    if(direction === "y") {
        snake.y += snake.vy;
    }
    if(direction === "-y") {
        snake.y -= snake.vy;
    }


    if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius
    ) {
    ball.vy = -ball.vy;
    }
    if (
    ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius
    ) {
    ball.vx = -ball.vx;
    }

    
    if (
    snake.y + snake.vy > canvas.height - snake.radius ||
    snake.y + snake.vy < snake.radius
    ) {
    snake.vy = -snake.vy;
    }
    if (
    snake.x + snake.vx > canvas.width - snake.radius ||
    snake.x + ball.vx < snake.radius
    ) {
    snake.vx = -snake.vx;
    }

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
            eyePosX = 0;
            eyePosY = HEAD_RADIUS/2;
            break;
        case "ArrowRight":
            direction = "x";
            eyePosX = 0;
            eyePosY = HEAD_RADIUS/2;
            break;
        case "Enter":
            raf = window.requestAnimationFrame(draw);
            break;
        case " ":
            bodyLength += 1;
            console.log(bodyLength);
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true,
    );


//ball.draw();
snake.draw();