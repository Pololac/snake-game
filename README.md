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