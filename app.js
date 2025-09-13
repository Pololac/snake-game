import {Game} from "./Game.js";
import {GRID_SIZE, xCells, yCells} from "./config.js";
import {activateButtonSound} from "./soundDesign.js";
import {handleKeyDown} from "./keyControlsConfig.js";
import { sanitizeName, getPlayerName, setPlayerName, loadLeaderboardFor, addScoreForSpeed, clearLeaderboardFor, formatDate } from "./leaderboard.js";


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreDiv = document.getElementById("score");
const lbList = document.getElementById('lb-list');
const lbClear = document.getElementById('lb-clear');
const playerName = document.getElementById('player-name');

const buttons = document.querySelectorAll("button");
const btnStart = document.getElementById("btn-start");
const btnReplay = document.getElementById("btn-replay");
const btnSpeedChoice = document.querySelectorAll("#speed-buttons button");

canvas.width = xCells * GRID_SIZE;
canvas.height = yCells * GRID_SIZE;

let game = new Game(canvas, ctx, scoreDiv);
let stepMs;

game.init();

// GET PLAYER NAME
const initialName = getPlayerName();
if (playerName) {
    playerName.value = initialName || '';
    playerName.addEventListener('input', (e) => {
        setPlayerName(e.target.value);
    });
    playerName.addEventListener('change', (e) => {
        setPlayerName(e.target.value);
    });
}

// SET LEADERBOARD
function renderLeaderboardFor(stepMs) {
    const list = loadLeaderboardFor(stepMs);
    lbList.innerHTML = '';
    if (!list.length) {
        lbList.innerHTML = '<li class="lb-item"><span>Aucun score pour le moment.</span></li>';
        return;
    }
    list.forEach((e, idx) => {
        const li = document.createElement('li');
        li.className = 'lb-item';
        li.innerHTML = `
        <div>
            <strong>${idx + 1}. ${e.name}</strong>
            <div class="lb-meta">${formatDate(e.createdAt)}</div>
        </div>
        <div><strong>${e.score}</strong></div>
        `;
        lbList.appendChild(li);
    });
}

// Bouton reset
lbClear?.addEventListener('click', () => {
    if (confirm('Effacer tous les scores ?')) {
        clearLeaderboardFor(stepMs)
        renderLeaderboardFor(stepMs);
    }
});

// Render Leaderboard
renderLeaderboardFor(stepMs);


// BUTTONS EVENTLISTENERS //
// Difficulty choice
btnSpeedChoice.forEach (btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const ms = parseInt(btn.dataset.speed, 10);
        stepMs = ms;
        console.log(ms);
        renderLeaderboardFor(stepMs);
        game.setSpeed(ms);
    });
});

// Start game
btnStart.addEventListener("click", () => {
   game.start();
});

// Replay game
btnReplay.addEventListener("click", () => {
    game.reset();
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

// SAVE LEADERBOARD ON GAME OVER
document.addEventListener('snake:gameover', (ev) => {
    const detail = ev.detail || {};
    const name = sanitizeName((playerName?.value || getPlayerName() || ''));
    setPlayerName(name); // persist
    addScoreForSpeed({
        name,
        stepMs,
        score: detail.score ?? 0,
        createdAt: detail.createdAt || Date.now()
    });
    renderLeaderboardFor(stepMs);
});