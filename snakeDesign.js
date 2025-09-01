

// rectangle with border radius
export function roundedRect(ctx, x, y, width, height, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}


// draw snake elements
export function drawSnake(ctx, snakeItemsPos, GRID_SIZE, RECT_RADIUS) {
    snakeItemsPos.forEach((segment, idx) => {
        if(idx === 0) {
            roundedRect(ctx, segment.x*GRID_SIZE, segment.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "green");
        } else {
            roundedRect(ctx, segment.x*GRID_SIZE, segment.y*GRID_SIZE, GRID_SIZE, GRID_SIZE, RECT_RADIUS, "blue");
        }
    })
}