import {SNAKE_INIT, SPEED_DEFAULT, GRID_SIZE, RECT_RADIUS} from "./config.js";
import { drawSnake } from "./snakeDesign.js";
import { drawFlower, setNewGridFlowerPosition } from "./flowerDesign.js";


export class Game {

    gameSpeed;
    score;
    direction;
    snakeItemsPos
    flowerGridPosition;
    flowerAngle;
    intervalID;   // ID utilisé dans le setInterval
    
    constructor() {
        this.snakeItemsPos = SNAKE_INIT;
        this.gameSpeed = SPEED_DEFAULT;
        this.score = 0;
        this.direction = { x: 0, y: 0};
    }

    init(canvas, ctx) {
        this.flowerGridPosition = setNewGridFlowerPosition(canvas);
        this.flowerAngle = 0;
        
        drawSnake(ctx, this.snakeItemsPos, GRID_SIZE, RECT_RADIUS);
        drawFlower(ctx, this.flowerGridPosition, this.flowerAngle);
    }

    start(gameSpeed) {
        if(this.intervalID !== null) {
            return;
        }

        this.direction = {x:1, y:0};
        this.intervalID = setInterval(this.updateGame(), gameSpeed);

    }



    // Update score
    updateScore() {
        this.score += 1;
    }




}