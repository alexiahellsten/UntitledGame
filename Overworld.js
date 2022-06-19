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

        //Establishes the "camera object", the person that the camera follows around
        const cameraPerson = this.map.gameObjects.hero;

        //Updates all objects
        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                arrow: this.directionInput.direction,
                map: this.map,
            });
        });
 
        //Draws the lower layer
        this.map.drawLowerImage(this.ctx, cameraPerson);

        //Draws the game objects
        Object.values(this.map.gameObjects).forEach(object => {
            object.sprite.draw(this.ctx, cameraPerson);
        });

        //Draws the upper layer
        this.map.drawUpperImage(this.ctx, cameraPerson);
            
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

    this.map.mountObjects();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGame(); //Loop starts on browser load
    }
}

