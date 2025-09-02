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

After looking for some snake game examples, we have determined the need for the game design to have a canva where the snake will move and the food will appear with an animation frame. 
Based on the [M mdn] (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) ressource, for creating this frame, we have used Canvas API and `<canvas id="canvas"></canvas>` HTML element.

The size of the canvas is declared in our main JS code file app.js :
`const canvas = document.getElementById("canvas");`
`canvas.width = 600;`
`canvas.height = 400;`

Canvas API provides methods to draw and animate graphics in the navigator.

By using what is named the context, we can then declared that we will desing a 2D environment :
`const ctx = canvas.getContext("2d");`

With this context, you can declare what you will needed in this canvas such a this form which will constitute an element for our snake.
This will draw a rectangle with a specified border radius and color:
`ctx.beginPath();`
`ctx.moveTo(x, y + radius);`
`ctx.arcTo(x, y + height, x + radius, y + height, radius);`
`ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);`
`ctx.arcTo(x + width, y, x + width - radius, y, radius);`
`ctx.arcTo(x, y, x, y + radius, radius);`
`ctx.closePath();`
`ctx.fillStyle = color;`
`ctx.fill();`

At this first step, we have used the same element for drawing the food of the snake. 





grid 
animation : RefreshAnimationFrame

### Snake (Patrick)
position of all the elements composing the snake in an array, drawing elements & animation

### Food = Flower (Paul)

(flower) : initialy a simple square

## Game (Paul)
GameStart
UpdateGame : snake moving, eating food
GameEnding : collision on the borders, or snake eating itself


## :art: Design UI/UX (Patrick)

[Subframe - Pixel Legends Showcase]
(https://www.subframe.com/tips/css-pixel-art-examples)

Inspiration by the design to create our interface with retro pixel design and audio sound. 

## :sound: Sound design (Patrick)

Using Web Audio API and examples from Subframe

## :computer: Refactoring (Patrick : modules, Paul : class)

Modules
Class Game


## 👨‍💻 Authors
Coded by @Pololac & @PatrickLaubscher.