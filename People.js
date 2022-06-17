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
        this.updateSprite(state);

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }

    //Should be run every frame
    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }

    //Updates sprite animation based on the direction we're typing
    updateSprite(state) {

        //If no arrow is pressed, show an idle animation
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-" + this.direction);
            return;
        }

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
        }
    }
}