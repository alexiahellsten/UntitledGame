class Overworld {
 constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
}   

 //Loop to start the game and fire with every new frame
 startGame() {
    const step = () => {

        //"Clears" the drawing
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //Draws the lower layer
        this.map.drawLowerImage(this.ctx);

        //Draws the game objects
        Object.values(this.map.gameObjects).forEach(object => {
            object.x += 0.02;
            object.sprite.draw(this.ctx);
        });

        //Draws the upper layer
        this.map.drawUpperImage(this.ctx);
            
        requestAnimationFrame(() => {
            step();
        });
    }
    step();
 }

 //Initializing
 init() {

    //Boots up this map as the first one the user sees
    this.map = new OverworldMap(window.OverworldMaps.InsideHouse);
    this.startGame(); //Loop starts on browser load
    }
}

