class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperSrc = config.upperSrc;
    }
    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0)
    }
    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0)
    }
}

//Object for all of the maps in the game
window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/outerhouse.png", 
        upperSrc: "/images/maps/outerhouse.png",
        gameObjects: {
            hero: new GameObject({
            x: 5,
            y: 6,
            }),
            fox: new GameObject({
                x: 7,
                y: 9,
                src: "/images/characters/Fox Sprite Sheet.png"
            })
        }
    },
    InsideHouse: {
        lowerSrc: "/images/maps/interior2.png",
        upperSrc: "/images/maps/interior2.png", 
        gameObjects: {
            hero: new GameObject({
            x: 5,
            y: 6,
            }),
            fox: new GameObject({
                x: 7,
                y: 9,
                src: "/images/characters/Fox Sprite Sheet.png"
            }),
            panda: new GameObject({
                x: 4,
                y: 10,
                src: "/images/characters/panda-spritesheet-16x16.png"
            })
        }
    }
}