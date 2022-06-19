class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperSrc = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
        this.lowerImage, 
        utils.withGrid(9.5) - cameraPerson.x,
        utils.withGrid(9) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage, 
            utils.withGrid(9.5) - cameraPerson.x,
            utils.withGrid(9) - cameraPerson.y
            )
        }

        //Uses helper function to see if character can move to a certain position
        isSpaceTaken(currentX, currentY, direction) {
            const {x,y} = utils.nextPosition(currentX, currentY, direction);
            return this.walls[`${x},${y}`] || false;
        }

        mountObjects() {
            Object.values(this.gameObjects).forEach(o => {
              
                //TODO: determine if object should actually render/mount
                o.mount(this);
            });
        }

        //When game object enters, one of these methods will fire
        addWall(x, y) {
           this.walls[`${x},${y}`] = true;
        }

        removeWall(x, y) {
           delete this.walls[`${x},${y}`]
         }

        //Removes the walls at old position and creates new one in new direction
         moveWall(wasX, wasY, direction) {
            this.removeWall(wasX, wasY);
            const {x,y} = utils.nextPosition(wasX, wasY, direction);
            this.addWall(x,y);
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
            // fox: new Person({
            //     x: utils.withGrid(7),
            //     y: utils.withGrid(9),
            //     src: "/images/characters/Fox Sprite Sheet.png"
            // }),
            panda: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(10),
                src: "/images/characters/panda-spritesheet-16x16.png"
            })
        },
        walls: {
            [utils.asGridCoord(5,8)]: true,
            [utils.asGridCoord(6,8)]: true,
            [utils.asGridCoord(5,9)]: true,
            [utils.asGridCoord(6,9)]: true
        }
    }
}