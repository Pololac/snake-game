import { GRID_SIZE } from "./config.js";


// Random position in the canva
export function randomCellPosition(cellsNumber) {
    return Math.floor(Math.random() * cellsNumber);
}

// Convert coordinates to pixels (the center of the grid)
export function cellToPx(cellIndex) {
    return (cellIndex + 0.5) * GRID_SIZE;
}