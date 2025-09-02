import {SNAKE_INIT, SPEED_DEFAULT, GRID_SIZE, maxX, maxY, RECT_RADIUS} from "./config.js";
import { drawSnake } from "./snakeDesign.js";
import { drawFlower, setNewGridFlowerPosition, slowDownFlowerRotation, reinitializeSpeedFlowerRotation } from "./flowerDesign.js";
import {gameOverAudiosound, snakeEatingAudiosound, snakeMovingAudiosound} from "./soundDesign.js";


export class Game {

    gameSpeed;
    score;
    direction;
    snakeItemsPos
    flowerGridPosition;
    flowerAngle;
    intervalID;   // ID utilisé dans le setInterval
    
    constructor() {
        this.snakeItemsPos = SNAKE_INIT.map(segment => ({...segment})); // Création d'une copie pour ne pas muter le tableau original
        this.gameSpeed = SPEED_DEFAULT;
        this.score = 0;
        this.direction = { x: 0, y: 0};
        this.intervalID = null;
        this.flowerAngle = 0;
    }

    init(canvas, ctx) {
        this.flowerGridPosition = setNewGridFlowerPosition(canvas);
        this.flowerAngle = 0;
        
        drawSnake(ctx, this.snakeItemsPos, GRID_SIZE, RECT_RADIUS);
        drawFlower(ctx, this.flowerGridPosition, this.flowerAngle);
    }

    start(gameSpeed, canvas, ctx) {
        if(this.intervalID !== null) return;

        this.direction = { x: 1, y: 0 };
        this.intervalID = setInterval(() => this.updateGame(canvas, ctx), gameSpeed);
        
    }

    setDirection(nextDir) {
        if ((this.direction.y !== 0 && nextDir.y !== 0)
            || (this.direction.x !== 0 && nextDir.x !== 0)) {
            return;
        } else {
            this.direction = nextDir;
        }
    }


    updateGame(canvas, ctx) {
        let isEating = false;
    
        // create new head
        const head = {
            x: this.snakeItemsPos[0].x + this.direction.x,
            y: this.snakeItemsPos[0].y + this.direction.y
        }
    
        // check if head don't touch borders
        if (head.x >= maxX || head.x < 0 || head.y >= maxY || head.y < 0){
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
    
        // check if head position is on the food
        if(head.x === this.flowerGridPosition.x && head.y === this.flowerGridPosition.y) {
            isEating = true;
            snakeEatingAudiosound();
            this.updateScore();

            reinitializeSpeedFlowerRotation();
            this.flowerGridPosition = setNewGridFlowerPosition(canvas);
            drawFlower(ctx, this.flowerGridPosition, this.flowerAngle);
        }
    
        // add new head and remove last element
        this.snakeItemsPos.unshift(head);
    
        // if isEating we keep the last element
        if(isEating === false) {
            this.snakeItemsPos.pop();
        }
    
        snakeMovingAudiosound();
    
        // ctx.fillStyle = "rgb(255 255 255 / 80%)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Animation de la fleur
        this.flowerAngle = slowDownFlowerRotation(this.flowerAngle);
    
        drawFlower(ctx, this.flowerGridPosition, this.flowerAngle);
        drawSnake(ctx, this.snakeItemsPos, GRID_SIZE, RECT_RADIUS);
        console.log(SNAKE_INIT);
    }
    


    // Update score
    updateScore() {
        this.score += 1;
    }

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

    replay(ctx){
        clearInterval(this.intervalID);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}