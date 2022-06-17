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
            "idle-down": [ [0, 0] ], 
            "idle-right": [ [6, 16] ], 
            "idle-up": [ [0, 7] ], 
            "idle-left": [ [0, 12] ],
            "walk-down": [ [0, 3], [3, 3], [0, 3], [6, 3] ],
            "walk-right": [ [3, 16], [6, 16 ], [3, 16], [3, 16] ], //needs some fine tuning
            "walk-up": [ [4, 6], [4, 9], [4, 6], [4, 9] ], //needs some fine tuning
            "walk-left": [ [0, 12], [0, 12], [3, 12], [3, 12] ], //needs some fine tuning
            "stretch-up": [ [0, 3], [0, 3], [6, 0], [3, 0] ], 
            "jump-up": [ [0, 3], [0, 3], [6, 0], [3, 1] ]
        } 
        this.currentAnimation = "walk-down"; //config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        //How many game loop frames we want to show the cropped sprite image
        this.animationFrameLimit = config.animationFrameLimit || 10;
        this.animationFrameProgress = this.animationFrameLimit;

        //Reference to the game object
        this.gameObject = config.gameObject;
    }

    //Gets the current animation frame
    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    //Checks if the animation is changing & resets
    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    //Updates which frame is being drawn
    updateAnimationProgress() {
        //Downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        //Resets the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    //Method for drawing the objects on the screen
    draw(ctx) {

        //Shadow variables
        const z = this.gameObject.z - 8;
        const q = this.gameObject.q - 50;
        
        //Sprite variables
        const x = this.gameObject.x - 17;
        const y = this.gameObject.y - 64;

        this.isShadowLoaded && ctx.drawImage(this.shadow, z, q);


        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image, 
            frameX * 16, frameY * 16, // 0, 0,
            32, 32,
            x, y,
            32, 32
            )

            this.updateAnimationProgress();
    }
}