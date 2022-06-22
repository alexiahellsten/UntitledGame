class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0 ;
        this.y = config.y || 0;
        this.direction = config.direction || "down"; //Has to be a string value
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/cat-spritesheetREWORKED-16x16.png",
        });

        //BehaviorLoops of the NPCs
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        //If we've got a behavior, fire it after a set time
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10)
    }

    //Method to update certain GameObjects
    update() {

    }

    async doBehaviorEvent(map) {

        //If a cutscene is playing or if there's no configs, stop
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
            return;
        }

        //Setting up our event
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.executor = this.id; //event.who

        //Create an event instance out of the next eventconfig
        const eventHandler = new OverworldEvent({ map, event: eventConfig });
        await eventHandler.init();

        //Only runs after eventHandler's initiated

        //Loop that sets next behavior event to fire
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        this.doBehaviorEvent(map);
    }
}