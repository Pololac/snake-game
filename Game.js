import {SNAKE_INIT, SPEED_DEFAULT} from "./config.js";


export class Game {

    gameSpeed;
    score;
    intervalID;   // 
    flowerGridPosition;
    flowerAngle;

    constructor(score, direction) {
        this.gamespeed = SPEED_DEFAULT;
        this.score = score
        this.direction = direction;
    }

    startGame(gameSpeed) {
        direction= {x:1, y:0};
        if(intervalID == null) {
            intervalID = setInterval(updateGame, gameSpeed);
        } 
    }



}