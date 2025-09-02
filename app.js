import {Game} from "./Game.js";
import {GRID_SIZE, maxX, maxY} from "./config.js";
import {activateButtonSound} from "./soundDesign.js";
import {handleKeyDown} from "./keyControlsConfig.js";


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreDiv = document.getElementById("score");

const buttons = document.querySelectorAll("button");
const btnStart = document.getElementById("btn-start");
const btnReplay = document.getElementById("btn-replay");
const btnSpeedChoice = document.querySelectorAll("#speed-buttons button");

canvas.width = maxX * GRID_SIZE;
canvas.height = maxY * GRID_SIZE;

let game = new Game();
let gameSpeed = game.gameSpeed;

game.init(canvas, ctx, scoreDiv);

// BUTTONS EVENTLISTENERS //
// Difficulty choice
btnSpeedChoice.forEach (btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        gameSpeed = btn.dataset.speed, 10;
    });
});

// Start game
btnStart.addEventListener("click", () => {
   game.start(gameSpeed, canvas, ctx, scoreDiv);
});

// Replay game
btnReplay.addEventListener("click", () => {
    game.replay(ctx);
    game = new Game();
    game.init(canvas, ctx, scoreDiv);
});

// SOUND on BUTTONS CLICK //
buttons.forEach(button => {
    button.addEventListener('click', () => {
        activateButtonSound();
    });
});

// KEYBOARD LISTENER for SNAKE DIRECTION //
window.addEventListener("keydown", (event) => {
    const nextDir = handleKeyDown(event);
    if (!nextDir) return;

    game.setDirection(nextDir);
    event.preventDefault();
    }
    , true
);