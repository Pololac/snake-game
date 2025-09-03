<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />

# :snake: Snake game

Snake game coded in **vanilla JavaScript** with keyboard controls and retro gaming design.

We used 2 JavaScript APIs:

- **Canvas API** → drawings & animations.
- **Web Audio API** → the sound design.

# :video_game: Play the game

Choose a difficulty and click on "Start".

Use the arrow key directions on your keyboard to move the snake. The goal is to eat as many flowers as you can.

You can reset the game at any time by clicking on "Replay".

## Rules Reminder

- The goal is to eat food (e.g., apples, flowers, dots) that appears randomly on the grid.
- Each time the snake eats, it grows longer and the score increases.
- The game ends if the snake:
    - hits the walls (border of the play area), or
    - runs into its own body.

- The challenge is to survive as long as possible while making the snake as long as you can.

# :bulb: Conception

## API Canvas

### Main concepts

### Canvas Implementation

After looking for some snake game examples, we determined that the game design needs a canvas where the snake will move and the food will appear with an animation frame.  
Based on the [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) resource, to create this frame, we used the Canvas API and the `<canvas id="canvas"></canvas>` HTML element.  

The size of the canvas is declared in our main JS file `app.js`:

```js
const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 400;
```

The Canvas API provides methods to draw and animate graphics in the browser.

By using what is called the context, we can declare that we will use a 2D environment:

```js
const ctx = canvas.getContext("2d");
```

With this context, you can define what you need in this canvas, such as this shape which will constitute an element of our snake.

This draws a rectangle with a specified border radius and color:

```js
ctx.beginPath();
ctx.moveTo(x, y + radius);
ctx.arcTo(x, y + height, x + radius, y + height, radius);
ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
ctx.arcTo(x + width, y, x + width - radius, y, radius);
ctx.arcTo(x, y, x, y + radius, radius);
ctx.closePath();
ctx.fillStyle = color;
ctx.fill();
```

### Canvas animation

Each segment of the snake will have differents following x,y coordinates.

At this first step, we have used the same element for drawing the food of the snake on the canvas.

Now that we have a small and snake and food, we have looked into the animation part.

Canvas API suggests several functions : `setInterval()`, `setTimeout()`, and `requestAnimationFrame()`;

`requestAnimationFrame()` was the first one we tried. It returns a callback as a timestamp in milliseconds and you can use it with conditions.

After some tests, we have preferred to use the `setInterval()` function, as it was easier for us to manage since we wanted to add several game speed options.

To animate an element in the canvas, you have to change the x,y coordinates based on a velocity or a time interval.

Preventing elements from going out of the canvas was easy, as you just have to use the width and height of the canvas in your movement conditions.

But in a snake game, the snake moves in a specific way: the last element takes the coordinates of the previous one. In addition, if the snake eats itself, the game is over.

### Grid

Considering the collision checks we need to implement and the food design, we were advised to use a grid.

The grid significantly simplifies the game design and collision checks.

Below is the grid configuration of our game. Each grid cell will be a square of 20x20 pixels, and the canvas will contain 30x20 grids:

```js
GRID_SIZE = 20;
maxX = 30;
maxY = 20;
```

Then the animation of the snake will be as follow, at each game loop it will move by one grid. The speed of the snake will be specified by our variable `gameSpeed`;

The display of the score will be in div element and declared at 0.

Then at the start of the game, we will use the following setInterval:

```js
setInterval(() => gameLoop(), gameSpeed);
```

## Snake

### Initial state design

As we will use a grid, we also have been suggested to use an array of coordinates for the snake as follow :

```js
const SNAKE = [{ x: 14, y: 10 }, { x: 13, y: 10 }, { x: 12, y: 10 }, { x: 11, y: 10 }];
```

This array of coordinates object will then represent our snake in with the first element will be the head.

We just have to create a loop as follow to draw our snake:

```js
function drawSnake(ctx, snakeItemsPos, GRID_SIZE, RECT_RADIUS) {
    snakeItemsPos.forEach((segment, idx) => {
        if(idx === 0) {
            roundedRect(ctx, segment.x*GRID_SIZE, segment.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "green");
        } else {
            roundedRect(ctx, segment.x*GRID_SIZE, segment.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "blue");
        }
    })
}
```

Here you have a hungry little snake of 1 head and 3 segments at the given coordinates. :snake:

For moving the snake, we will have to change the coordinates as detailed below.

### Food = Flower

To represent the food, we initially chose a simple square as the one used to create the snake body.
But it seems more fun to have a rotating flower to symbolize the food 😅​.

#### Random positioning

To set a random (X,Y) positionning of the flower in the grid (from (0,0) to (xCells, yCells) - grid size set in config.js), we use this function on x and y coordinates :

```js
function randomCellPosition(cellsNumber) {
    return Math.floor(Math.random() * cellsNumber);
}
```

It returns en integer between 0 and cellsNumber.
So we got the (X,Y) coordinates of the flower in the grid, that will be used later to check if the snake's head is on the same cell as the flower.

#### Convert grid → pixel position to draw the flower

The drawing in Canvas API is based on pixels. So we use a function to get the (x,y) coordinates in pixels of the center of the flower :

```js
function cellToPx(cellIndex) {
    return cellIndex * GRID_SIZE + 0,5 * GRID_SIZE ;
}
```

Those values are saved in constants (px, py).

#### Animation = Rotation with friction

To draw the flower, we have to translate the "ctx" to the flower's center.

```js
ctx.save();           // save the canvas state so that the rest of the drawing isn’t affected.

ctx.translate(px, py); // (0,0) becomes the flower’s center
ctx.rotate(flowerAngle); // rotate around the center

ctx.restore(); // Cancels the rotation/translation for the rest of the drawing.

```

#### Flower geometry

The flower should be embedded in a grid's cell (diameter < 20 px). So we chose those dimensions

```js
const petalR = 4;   // petal radius in px
const centerR = 3;  // center radius in px
const offset = 5;   // distance from center to each petal in px
```

- The petal centers are placed on a small circle of radius offset around the flower’s center.
- Each petal is a small disk with radius petalR.
- Quick check to fit inside a 20 px cell: 2 x (offset + petalR) = 2 x (5 + 4) = 18 ≤ 20 px → it fits.

#### Draw the center

We choose 5 petals instead of 4 to make the rotation easier to see.

```js
ctx.fillStyle = "#ff0000"; // center's color
ctx.beginPath();
ctx.arc(0, 0, centerR, 0, Math.PI * 2);
ctx.fill();
```

The heart of the flower is a red disk at the local center (0,0), with a radius = centerR.  
```Math.PI * 2``` = one full circle in radians (360°).

#### Draw the petals (relative coordinates to flower's center)

We choose 5 petals rather than 4 instead of 4 to make the rotation easier to see.

```js
for (let i = 0; i < 5; i++) {
    ctx.fillStyle = "#ffd34d";
    const a = i * (2 * Math.PI / 5);        // 360° / 5 = 72°
    
    // petal's center coordinates from the flower's center
    const pxr = Math.cos(a) * offset;
    const pyr = Math.sin(a) * offset;
    
    ctx.beginPath();
    ctx.arc(pxr, pyr, petalR, 0, Math.PI * 2);
    ctx.fill();
}
```

- Petals are evenly spaced on a circle: 360° / 5 = 72°.
- Polar → Cartesian: `x = cos(a) * radius (= offset)`.

#### Rotation

The rotation, applied every time `updateGame()` is run, is based on the `flowerAngle` in radians.  
We apply a friction factor to the rotation speed so that the spinning gradually slows down until it eventually stops.  

Before each rotation update, we call this function on `flowerAngle`:

```js
function slowDownFlowerRotation(flowerAngle) {
    speed *= friction;
    return (flowerAngle + TAU * speed / 60) % TAU;
}
```

- speed → a global (or outer-scope) variable representing the current rotation speed of the flower in turns per second (initially set to 6).

- friction → a multiplier slightly less than 1 (0.95 here) that reduces speed over time, simulating a slowdown.

- TAU → shorthand for 2 * Math.PI (≈ 6.283), representing one full circle in radians.

## Game Logic

### Game initialization

- Places the first flower at a random position.
- Resets the flower’s rotation angle.
- Displays the initial score (set in the instance of Game class).
- Draws the snake and the first flower on the canvas.

### Game start

Starts the game loop :
- Sets the initial snake direction (moving right).
- Launches a timed loop (setInterval) that repeatedly calls updateGame() at the given speed.
- Prevents multiple loops from being started at once.

NB: we save the `intervalID` here so that we could end the loop later.

```javascript
start(gameSpeed, canvas, ctx, scoreDiv) {
    if(this.intervalID !== null) return;

    this.direction = { x: 1, y: 0 };

    this.intervalID = setInterval(() => this.updateGame(canvas, ctx, scoreDiv), gameSpeed);
    
}
```

### Game update

Updates the game state at each tick of the loop.

- Moves the snake by creating a new head in the current direction.

```js
const head = {
    x: this.snakeItemsPos[0].x + this.direction.x,
    y: this.snakeItemsPos[0].y + this.direction.y
}
```

- Checks for collisions with the walls or the snake’s own body → triggers `gameOver` function if detected.

```js
// check if head don't touch borders
if (head.x >= xCells || head.x < 0 || head.y >= yCells || head.y < 0){
    this.gameOver(ctx);
    return;
}

// check if snake head don't touch snake body
for(let i = 1; i < this.snakeItemsPos.length; i++) {
    if(head.x === this.snakeItemsPos[i].x && head.y === this.snakeItemsPos[i].y) {
        this.gameOver(ctx);
        return;
    }
}
```

- Checks if the snake eats the flower:
  - Set the variable `isEating` to `true` (used to draw the "new" snake)
  - Plays the eating sound.
  - Increases and displays the score.
  - Spawns a new flower at a random position and resets its rotation speed.

```js
if(head.x === this.flowerGridPosition.x && head.y === this.flowerGridPosition.y) {
    isEating = true;
    snakeEatingAudiosound();
    this.updateScore();
    this.displayScore(scoreDiv);

    reinitializeSpeedFlowerRotation();
    this.flowerGridPosition = setNewGridFlowerPosition(canvas);
    drawFlower(ctx, this.flowerGridPosition, this.flowerAngle);
}
```

- Updates the snake’s body: keeps the new head and removes the tail (unless the snake has just eaten the flower).

```js
// add new head and remove last element (unless it eats the flower)
this.snakeItemsPos.unshift(head);

if(isEating === false) {
    this.snakeItemsPos.pop();
}
```

Plays the moving sound.

- Clears the canvas and redraws a "new" scene:
  - Updates the flower’s rotation with friction.
  - Renders the flower and the snake in their new positions.

### GameOver

Ends the current game session :

- Plays the game over sound effect.
- Stops the game loop by clearing the active interval.
- Displays a “Game Over” message centered on the canvas.

```js
gameOver(ctx) {
    gameOverAudiosound();
    clearInterval(this.intervalID);
    this.intervalID = null;

    ctx.fillStyle = "#ffffff"
    ctx.font = "48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}
```

# :art: Design UI/UX

For the design of our game, we have used this example to create our interface with retro pixel design and audio sound.

[Subframe - Pixel Legends Showcase](https://www.subframe.com/tips/css-pixel-art-examples)

With the font familly "Press start" :

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
```

The same colours shart:

```css
:root {
  --primary: #ff6b6b;
  --secondary: #4ecdc4;
  --dark: #1a1a2e;
  --light: #f8f9fa;
  --console-green: #92f29c;
}
```

# :sound: Sound design

In the same design here : [Subframe - Pixel Legends Showcase](https://www.subframe.com/tips/css-pixel-art-examples)

We used Web Audio API for the sound animation. Same as Canvas API, Web Audio API is used to create an audio context:

```js
const AudioContext = window.AudioContext || window.webkitAudioContext;
window.audioCtx = new AudioContext(); 
```

Then when an audio context is declared you can create digital sound with specified oscillator and gainode for the shape and design of the sound :

```js
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
```

Here below our function used when a button is activated :

```js
function activateButtonSound() {

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
}
```

# :computer: Refactoring

## Modules

### Config, utils, sound design

In the refactoring process and for creating the modules, at first we have created a module `config.js` for our constants providing the values of :

- grid size
- radius for the snake element
- position and state for the snake at start
- the default speed of the game

```js
// Sizes of the Grid cells and the Grid
export const GRID_SIZE = 20; // Size in pixels of a grid cell
export const xCells = 30; // Number of horizontal cells
export const yCells = 20; // Number of vertical cells

// Drawing of the elements of the snake
export const RECT_RADIUS = 4;

// Coordinates of the snake elements in the grid at initialization
export const SNAKE_INIT = [
    { x: 14, y: 10 },  // head
    { x: 13, y: 10 },  // segments...
    { x: 12, y: 10 },
    { x: 11, y: 10 }
];

// Game speed by default
export const SPEED_DEFAULT = 300;
```

Some general used functions have been declared in a separate module `utils.js`:

```js
import { GRID_SIZE } from "./config.js";

export function randomCellPosition(cellsNumber) {
    return Math.floor(Math.random() * cellsNumber);
}

export function cellToPx(cellIndex) {
    return (cellIndex + 0.5) * GRID_SIZE;
}
```

An identical process has been used of the sound design functions in the `soundDesign.js`module which are just called when they are needed whithout modification from their previous code in the non-factoring code.

### snake & flower draw

The second part which was the drawing of our elements it was in these functions that we needed to pass in parameter the context `ctx` of our canvas and then modify them accordingly :

- before refactoring :

```js
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
```

- in the `snakeDesign.js`module :

```js
// draw snake elements
export function drawSnake(ctx, snakeItemsPos, GRID_SIZE, RECT_RADIUS) {
    snakeItemsPos.forEach((segment, idx) => {
        if(idx === 0) {
            roundedRect(ctx, segment.x*GRID_SIZE, segment.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "green");
        } else {
            roundedRect(ctx, segment.x*GRID_SIZE, segment.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "blue");
        }
    })
}
```

All the drawing functions module need this context in parameter as they won't recognize the general variable in `app.js`.

### key controls

This was the most delicate part as the key controls are using an event listener on the window variable of the main js script.
We can't import the whole function in a separate module.

In addition as the directions value are used the main Game class (see below) we had to modify our primary control algorithm.

Then in this new version for the module, the `keyControlsConfig.js` returns only the directions value when the specified key board control is down.
The conditions verification stay in `app.js` and will be moved later in our `Game.js` class:

- before refactoring :

```js
/ event listener keyboard
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
```

- in the new module:

```js
export function handleKeyDown(event) {
    switch (event.key) {
        case "ArrowDown":  return { x: 0,  y: 1 };
        case "ArrowUp":    return { x: 0,  y: -1 };
        case "ArrowLeft":  return { x: -1, y: 0 };
        case "ArrowRight": return { x: 1,  y: 0 };
        default:           return null;
    };
}
```

## The Game class

The Game class is the central component that manages the snake’s state, the flower, the score, and the game loop.
It exposes methods such as init(), start(), updateGame(), and gameOver() to handle the different stages of a game session.

To use the class in `app.js`, create a new Game instance when the page loads:

```js
let game = new Game();
```

You can then call its methods in the file, for example:

```js
game.init(canvas, ctx, scoreDiv);
```

Make sure to pass the parameters (for example `canvas`, `ctx` or `scoreDiv`) that are set up in `app.js`, so they can be used inside the Game class for rendering and score display.

> **🎯 Why Refactor?**
> This process is extremely time-consuming but worth the time spent as it makes the project easier to maintain and extend.

# Perspectives of improvements

TBD

# 👨‍💻 Authors

Coded by @Pololac & @PatrickLaubscher.
