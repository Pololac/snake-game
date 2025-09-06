import {SNAKE_INIT, SPEED_DEFAULT, GRID_SIZE, xCells, yCells, RECT_RADIUS} from "./config.js";
import { drawSnake } from "./snakeDesign.js";
import { drawFlower, setNewGridFlowerPosition, slowDownFlowerRotation, reinitializeSpeedFlowerRotation } from "./flowerDesign.js";
import {gameOverAudiosound, snakeEatingAudiosound, snakeMovingAudiosound} from "./soundDesign.js";


export class Game {
    flowerGridPosition;
    
    constructor(canvas, ctx, scoreDiv) {
        // Display variables
        this.canvas = canvas;
        this.ctx = ctx;
        this.scoreDiv = scoreDiv;

        // Game variables
        this.score = 0;
        this.gameSpeed = SPEED_DEFAULT;
        this.snakeItemsPos = SNAKE_INIT.map(segment => ({...segment})); // Creating a copy so as not to mutate the original table
        this.direction = { x: 0, y: 0};
        this.flowerAngle = 0;

        // Loop variables
        this.intervalID = null; // ID used in setInterval
    }

    init() {
        this.flowerGridPosition = setNewGridFlowerPosition(this.canvas);
        this.flowerAngle = 0;
        this.displayScore(this.scoreDiv);
        
        drawSnake(this.ctx, this.snakeItemsPos, GRID_SIZE, RECT_RADIUS);
        drawFlower(this.ctx, this.flowerGridPosition, this.flowerAngle);
    }

    start(gameSpeed) {
        if(this.intervalID !== null) return;

        this.direction = { x: 1, y: 0 };
        this.intervalID = setInterval(() => this.updateGame(), gameSpeed);
        
    }

    setDirection(nextDir) {
        if ((this.direction.y !== 0 && nextDir.y !== 0)
            || (this.direction.x !== 0 && nextDir.x !== 0)) {
            return;
        } else {
            this.direction = nextDir;
        }
    }

    updateGame() {
        let isEating = false;
    
        // create new head
        const head = {
            x: this.snakeItemsPos[0].x + this.direction.x,
            y: this.snakeItemsPos[0].y + this.direction.y
        }
    
        // check if head don't touch borders
        if (head.x >= xCells || head.x < 0 || head.y >= yCells || head.y < 0){
            this.gameOver(this.ctx);
            return;
        }
    
        // check if snake head don't touch snake body
        for(let i = 1; i < this.snakeItemsPos.length; i++) {
            if(head.x === this.snakeItemsPos[i].x && head.y === this.snakeItemsPos[i].y) {
                this.gameOver(this.ctx);
                return;
            }
        }
    
        // check if head position is on the flower
        if(head.x === this.flowerGridPosition.x && head.y === this.flowerGridPosition.y) {
            isEating = true;
            snakeEatingAudiosound();
            this.updateScore();
            this.displayScore();

            reinitializeSpeedFlowerRotation();
            this.flowerGridPosition = setNewGridFlowerPosition(this.canvas);
            drawFlower(ctx, this.flowerGridPosition, this.flowerAngle);
        }
    
        // add new head and remove last element (unless it eats the flower)
        this.snakeItemsPos.unshift(head);
    
        if(isEating === false) {
            this.snakeItemsPos.pop();
        }
    
        snakeMovingAudiosound();
    
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Rotate the flower
        this.flowerAngle = slowDownFlowerRotation(this.flowerAngle);
    
        drawFlower(this.ctx, this.flowerGridPosition, this.flowerAngle);
        drawSnake(this.ctx, this.snakeItemsPos, GRID_SIZE, RECT_RADIUS);
    }
    
    updateScore() {
        this.score += 1;
    }

    displayScore() {
        this.scoreDiv.innerText = `Score : ${this.score}`;
    }

    gameOver() {
        gameOverAudiosound();
        clearInterval(this.intervalID);
        this.intervalID = null;

        this.ctx.fillStyle = "#ffffff"
        this.ctx.font = "48px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2);
    }

    replay(){
        clearInterval(this.intervalID);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}