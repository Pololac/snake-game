<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />

# :snake: Snake game

This project is aSnake game coded in vanilla JS with keyboard controls and retro graming design.

We used canvas API for the animations and web audio API both provided by javascript.

Coded by Paul & Patrick

# :video_game: How to play the game

Choose a difficulty between (slug, worm or viper) and click on "start".

Use the arrow key directions on your keyboard to move the snake and eat the flower.

You can reset the game by clicking on "replay".

# :bulb: Conception

## First steps

What is a snake game?

Principles

We have to create a canva in which the snake is moving. The objective is to eat food and each time the snake eat it, it grow up.

If the snake touches the canva's borders or its body the game is over.

The snake is designed by a group of element moving together.

The food is another element located randomly in the canva.

Discovery of Canvas API

For designing the game, we had to use Canvas API which provides the tools to design a canvas and create what is nammed a context.

The canva is a HTML element `<canvas></canvas>` in which we have defined an id to determine its width and height.

`const ctx = canvas.getContext("2d");`


## Canvas

grid and drawing  

## Snake

position of all the elements composing the snake in an array, drawing elements

## Food snake

(flower) : initialy a simple square

## Algo

GameStart
GameLoop : RefreshAnimationFrame, setInterval
UpdateGame : snake moving, eating food
GameEnding : collision on the borders, or snake eating itself


# :art: Design UI/UX

[Subframe - Pixel Legends Showcase]
(https://www.subframe.com/tips/css-pixel-art-examples)

Inspiration by the design to create our interface with retro pixel design and audio sound. 

# :sound: Sound design

Using Web Audio API and examples from Subframe

# :computer: Refactoring

Modules
Class Game
