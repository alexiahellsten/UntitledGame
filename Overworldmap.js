class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperSrc = config.upperSrc;

        this.isCutscenePlaying = false;
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
            Object.keys(this.gameObjects).forEach(key => {
              
                //Gives the object an id with the key value
                let object = this.gameObjects[key];
                object.id = key;

                //TODO: determine if object should actually render/mount
                object.mount(this);
            });
        }

        //Method to start playing cutscene
        async startCutscene(events) {
            this.isCutscenePlaying = true;

            for (let i = 0; i < events.length; i++ ) {
                const event = new OverWorldEvent({
                    event: events[i],
                    map: this,
                })
                await eventHandler.init();
            }
            this.isCutscenePlaying = false;

            //Resets NPC to do their idle behaviors
            Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent())
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
            fox: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/Fox Sprite Sheet.png",
                behaviorLoop: [
                    { type: "walk", direction: "left" },
                    // { type: "stand", direction: "up", time: 800 },
                    { type: "walk", direction: "up" },
                    { type: "walk", direction: "right" },
                    { type: "walk", direction: "down" },
                ]
            }),
            panda: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(10),
                src: "/images/characters/panda-spritesheet-16x16.png",
                behaviorLoop: [
                    { type: "stand", direction: "left", time: 800 },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "walk", direction: "right", time: 1200 },
                    { type: "walk", direction: "up", time: 300 },
                ]
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