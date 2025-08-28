const canvas = document.getElementById("canvas");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const ctx = canvas.getContext("2d");
let raf;

const HEAD_RADIUS = 15;

// initialize direction
let direction = "x";

// eyes position
let eyePosX = 0;
let eyePosY = HEAD_RADIUS/2;

// body length
let bodyLength = 3;

// rectangle with border radius
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
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


const ball2 = {
    x: 200,
    y: 200,
    vx: 4,
    vy: 4,
    radius: HEAD_RADIUS,
    draw() {
          
        // snake head
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.x+(eyePosX), this.y+(eyePosY), 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.x-(eyePosX), this.y-(eyePosY), 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();


        // snake body
        for(let i = 0; i<= bodyLength; i++) {

            setTimeout( () => {
                roundedRect(ctx, this.x+(i*15), this.y+(i*15), 40, 40, 15);
                //ctx.beginPath();
                //ctx.fillStyle = "green";
                //ctx.arc(this.x+(i*15), this.y+(i*15), this.radius, 0, Math.PI * 2, true);
                //ctx.fill();
            },1000+(i*200));

        }

    }
};




function draw() {
    ctx.fillStyle = "rgb(255 255 255 / 30%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy *= 0.99;
    ball.vy += 0.25;

    ball2.draw();

    if(direction === "x") {
        ball2.x += ball2.vx;
    }
    if(direction === "-x") {
        ball2.x -= ball2.vx;
    } 
    if(direction === "y") {
        ball2.y += ball2.vy;
    }
    if(direction === "-y") {
        ball2.y -= ball2.vy;
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
    ball2.y + ball2.vy > canvas.height - ball2.radius ||
    ball2.y + ball2.vy < ball2.radius
    ) {
    ball2.vy = -ball2.vy;
    }
    if (
    ball2.x + ball2.vx > canvas.width - ball2.radius ||
    ball2.x + ball.vx < ball2.radius
    ) {
    ball2.vx = -ball2.vx;
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
            bodyLength += 3;
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


ball.draw();
ball2.draw();