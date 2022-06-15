class Sprite {
    constructor(config) {

        //Setting up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //Setting up the shadow
        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false
        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        //Configuring the initial state & animation
        this.animations = config.animations || {
            idleDown : [
                [0, 0]
            ]
        } 
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        //Reference to the game object
        this.gameObject = config.gameObject;
    }

    //Method for drawing the objects on the screen
    draw(ctx) {

        //Shadow variables
        const z = this.gameObject.z * 16 - 8;
        const q = this.gameObject.q * 16 - 50;
        
        //Sprite variables
        const x = this.gameObject.x * 16 - 17;
        const y = this.gameObject.y * 16 - 64;

        this.isShadowLoaded && ctx.drawImage(this.shadow, z, q);

        this.isLoaded && ctx.drawImage(this.image, 
            0, 0,
            32, 32,
            x, y,
            32, 32
            )
    }
}