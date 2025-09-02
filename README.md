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


### Food = Flower (Paul)

(flower) : initialy a simple square

## Game (Paul)
GameStart
UpdateGame : snake moving, eating food
GameEnding : collision on the borders, or snake eating itself


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



# :computer: Refactoring (Patrick : modules, Paul : class)

Modules
Class Game


# Perspectives of improvements

TBD

# 👨‍💻 Authors
Coded by @Pololac & @PatrickLaubscher.