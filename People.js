class Person extends GameObject {
    constructor(config) {
        //Super calls the methods of the parent class GameObject
        super(config);

        //Lets characters keep moving until they reach a cetain point in the grid
        this.movingProgressRemaining = 16;

        this.isPlayerControlled = config.isPlayerControlled || false;

        //Sets the direction of character movement on a X/Y grid
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }
    
    update(state) {
        this.updatePosition();

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }

    //Should be run ever frame
    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }
}