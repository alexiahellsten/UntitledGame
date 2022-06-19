const utils = {
    withGrid(n) {
        return n * 16;
    },
    
    //Takes in x and y, returns string
    asGridCoord(x, y) {
     return `${x*16},${y*16}`;
    },

    //Next position that character can move to
    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 16;
        
        if (direction === "left") {
            x -= size;
        } else if (direction === "right") {
            x += size;
        }
        else if (direction === "up") {
            y -= size;
        }
        else if (direction === "down") {
            y += size;
        }
        return {x, y};
    }
}