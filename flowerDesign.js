import {randomCellPosition, cellToPx} from "./utils.js";

const TAU = Math.PI * 2; // 1 tour complet
const friction = 0.95;  // ralentit: ~95%/seconde

let speed = 3;        // tours/s au début

export function setNewGridFlowerPosition(canvas) {
    // Random positon of Flower (en pixel)
    let flowerGridPosition = { x:0, y:0 };
    
    flowerGridPosition = {
        x: randomCellPosition(canvas.width),
        y: randomCellPosition(canvas.height)
    };

    return flowerGridPosition;
}


export function slowDownFlowerRotation(flowerAngle) {
    speed *= friction;
    return flowerAngle = (flowerAngle + TAU * speed / 60) % TAU;
}


export function reinitializeSpeedFlowerRotation() {
    speed = 3;
}


// draw Flower
export function drawFlower(ctx, flowerGridPosition, flowerAngle) {
    // Diamètre < 20px (taille d'une cellule)
    const petalR = 4;   // rayon d'un pétale en px
    const centerR = 3;  // rayon du cœur
    const offset = 5;  // distance du centre vers chaque pétale
  
    // position du centre de la fleur (en pixel)
    const px = cellToPx(flowerGridPosition.x);
    const py = cellToPx(flowerGridPosition.y);

    // Pour l'animation de la fleur
    ctx.save();                // sauve l’état actuel du canvas
    ctx.translate(px, py);       // déplace le point d’origine au centre de la fleur
    ctx.rotate(flowerAngle);   // rotation autour du centre
    
    
    // 4 Petales (coordonnées relatives au centre de la fleur)
    for (let i = 0; i < 5; i++) {
        ctx.fillStyle = "#ffd34d";
        const a = i * (2 * Math.PI / 5);        // // 360° / 5 = 72°

        const px = Math.cos(a) * offset;  // relatif
        const py = Math.sin(a) * offset;  // relatif
        
        ctx.beginPath();
        ctx.arc(px, py, petalR, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Coeur
    ctx.fillStyle = "#ff0000"; // jaune
    ctx.beginPath();
    ctx.arc(0, 0, centerR, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // restaure l’état du canvas (pas de rotation pour le reste)

}