class DirectionInput {
    constructor() {

        //Holds the keys that are being pressed and the order they were pressed
        this.heldDirection = [];

        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right",
        }

    }

    //Grabs the direction
    get direction() {
        return this.heldDirection[0];
    }

    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];

            //If we found valid direction and it doesn't exist in the array, we want to put it in the beginning of the array (unshift it)
            if(dir && this.heldDirection.indexOf(dir) === -1) {
                this.heldDirection.unshift(dir);
                // console.log(this.heldDirection);
            }
        });

        //If the key was in our array, we need to take it out of the array
        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.heldDirection.indexOf(dir);
            if(index > -1) {
                this.heldDirection.splice(index, 1); //Removes 1 entry out of the index
                // console.log(this.heldDirection);
            }
        })
    }
}