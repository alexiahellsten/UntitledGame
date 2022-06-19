class GameObject {
    constructor(config) {
        this.isMounted = false;
        this.x = config.x || 0 ;
        this.y = config.y || 0;
        this.direction = config.direction || "down"; //Has to be a string value
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/cat-spritesheetREWORKED-16x16.png",
        });
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }

    //Method to update certain GameObjects
    update() {

    }
}