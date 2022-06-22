class OverworldEvent {
    constructor({ map, event}) {
    this.map = map;
    this.event = event;
    }

    //Resolves promise that we waited for in other files
    stand(resolve) {
    const executor = this.map.gameObjects[ this.event.executor ];
    executor.startBehavior({
        map: this.map
    }, {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time
    });

    // Handler completes when the correct person/executor is done, then resolves the event
    const completeHandler = e => {
        if (e.detail.executorId === this.event.executor) {
            document.removeEventListener("PersonWalkingComplete", completeHandler);
            resolve();
        }
    }
    document.addEventListener("PersonWalkingComplete", completeHandler)
}

    walk(resolve) {
    const executor = this.map.gameObjects[ this.event.executor ];
    executor.startBehavior({
        map: this.map
    }, {
        type: "walk",
        direction: this.event.direction,
        retry: true
    });

    //Handler completes when the correct person/executor is done, then resolves the event
    const completeHandler = e => {
        if (e.detail.executorId === this.event.executor) {
            document.removeEventListener("PersonWalkingComplete", completeHandler);
            resolve();
        }
    }
    document.addEventListener("PersonWalkingComplete", completeHandler)
    
}

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve);
        });
    }
}