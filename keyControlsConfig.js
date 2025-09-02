
export function handleKeyDown(event, direction) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "ArrowDown":
            if(direction.y === 0) {
                direction.y = 1;
            }
            direction.x = 0;
            break;
        case "ArrowUp":
            if(direction.y === 0) {
                direction.y = -1;
            };
            direction.x = 0;
            break;
        case "ArrowLeft":
            direction.y = 0;
            if(direction.x === 0) {
                direction.x = -1;
            }
            break;
        case "ArrowRight":
            direction.y = 0;
            if(direction.x === 0) {
                direction.x = 1;
            }
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    };
    
    event.preventDefault();

    return direction;
}