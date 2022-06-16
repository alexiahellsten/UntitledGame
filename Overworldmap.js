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
            hero: new Person({
            isPlayerControlled: true,
            x: utils.withGrid(5),
            y: utils.withGrid(6),
            }),
            fox: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/Fox Sprite Sheet.png"
            })
        }
    },
    InsideHouse: {
        lowerSrc: "/images/maps/interior2.png",
        upperSrc: "/images/maps/interior2.png", 
        gameObjects: {
            hero: new Person({
            isPlayerControlled: true,
            x: utils.withGrid(9),
            y: utils.withGrid(10),
            }),
            fox: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/Fox Sprite Sheet.png"
            }),
            panda: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(10),
                src: "/images/characters/panda-spritesheet-16x16.png"
            })
        }
    }
}