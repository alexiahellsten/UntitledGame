class GameObject {
    constructor(config) {
        this.x = config.x || 0 ;
        this.y = config.y || 0;
        this.direction = config.direction || "down"; //Has to be a string value
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/cat-spritesheet-16x16.png",
        });
    }
    //Method to update certain GameObjects
    update() {

    }
}