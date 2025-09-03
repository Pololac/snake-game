import {randomCellPosition, cellToPx} from "./utils.js";
import {xCells, yCells} from "./config.js";

const TAU = Math.PI * 2; // 1 tour complet
const friction = 0.95;  // ralentit: ~95%/seconde

let speed = 6;        // tours/s au début

export function setNewGridFlowerPosition(canvas) {
    // Random positon of Flower (en pixel)
    let flowerGridPosition = { x:0, y:0 };
    
    flowerGridPosition = {
        x: randomCellPosition(xCells),
        y: randomCellPosition(yCells)
    };

    return flowerGridPosition;
}


export function slowDownFlowerRotation(flowerAngle) {
    speed *= friction;
    return (flowerAngle + TAU * speed / 60) % TAU;
}


export function reinitializeSpeedFlowerRotation() {
    speed = 3;
}


// draw Flower
export function drawFlower(ctx, flowerGridPosition, flowerAngle) {
    // Diameter < 20px (size of a cell)
    const petalR = 4;   // petal radius in px
    const centerR = 3;  // center radius in px
    const offset = 5;   // distance from center to each petal in px
  
    // position of the center of the flower (in pixels)
    const px = cellToPx(flowerGridPosition.x);
    const py = cellToPx(flowerGridPosition.y);

    // Animation (= rotation)
    ctx.save();                // save canvas state
    ctx.translate(px, py);      // (0,0) becomes the flower’s center
    ctx.rotate(flowerAngle);   // rotate around the center
    
    
    // 5 Petals (relative coordinates to flower's center)
    for (let i = 0; i < 5; i++) {
        ctx.fillStyle = "#ffd34d";
        const a = i * (2 * Math.PI / 5);        // 360° / 5 = 72°
        
        // petal's center coordinates from the flower's center
        const pxr = Math.cos(a) * offset;
        const pyr = Math.sin(a) * offset;
        
        ctx.beginPath();
        ctx.arc(pxr, pyr, petalR, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Coeur
    ctx.fillStyle = "#ff0000"; // jaune
    ctx.beginPath();
    ctx.arc(0, 0, centerR, 0, Math.PI * 2);
    ctx.fill();
    

    ctx.restore(); // Cancels the rotation/translation for the rest of the drawing.

}