import { GRID_SIZE } from "./config.js";


// Positionnement aléatoire dans grille
export function randomCellPosition(cellsNumber) {
    return Math.floor(Math.random() * cellsNumber);
}

// Convertir coordonnée de grille en pixel (centré dans la case)
export function cellToPx(cellIndex) {
    return (cellIndex + 0.5) * GRID_SIZE;
}