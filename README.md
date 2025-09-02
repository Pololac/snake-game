<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />

# :snake: Snake game

Snake game coded in **vanilla JavaScript** with keyboard controls and retro gaming design.

We used 2 JavaScript APIs: 
- **Canvas API** → drawings & animations.
- **Web Audio API** → the sound design.


## :video_game: Play the game

Choose a difficulty and click on "Start".

Use the arrow key directions on your keyboard to move the snake. The goal is to eat as many flowers as you can.

You can reset the game at any time by clicking on "Replay".

### Rules Reminder
- The goal is to eat food (e.g., apples, flowers, dots) that appears randomly on the grid.
- Each time the snake eats, it grows longer and the score increases.
- The game ends if the snake:
    - hits the walls (border of the play area), or
    - runs into its own body.

- The challenge is to survive as long as possible while making the snake as long as you can.


## :bulb: Conception

### API Canvas

#### Main concepts (Patrick)

grid / drawing
animation : RefreshAnimationFrame

### Snake (Patrick)
position of all the elements composing the snake in an array, drawing elements & animation

### Food = Flower (Paul)

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


## :art: Design UI/UX (Patrick)

[Subframe - Pixel Legends Showcase]
(https://www.subframe.com/tips/css-pixel-art-examples)

Inspiration by the design to create our interface with retro pixel design and audio sound. 

## :sound: Sound design (Patrick)

Using Web Audio API and examples from Subframe

## :computer: Refactoring (Patrick : modules, Paul : class)
### ES Modules



### The Game class
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

> ** 🎯 Why Refactor?**  
> This process is extremely time-consuming but worth the time spent as it makes the project easier to maintain and extend.

## 👨‍💻 Authors
Coded by @Pololac & @PatrickLaubscher.