import { GRID_SIZE } from "./config.js";


// Positionnement aléatoire dans grille
export function randomCellPosition(max) {
    const totalGrids = max / GRID_SIZE;
    return Math.floor(Math.random() * totalGrids);
}

// Convertir coordonnée de grille en pixel (centré dans la case)
export function cellToPx(cellIndex) {
    return (cellIndex + 0.5) * GRID_SIZE;
}