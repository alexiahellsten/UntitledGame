class Person extends GameObject {
    constructor(config) {
        //Super calls the methods of the parent class GameObject
        super(config);

        //Lets characters keep moving until they reach a cetain point in the grid
        this.movingProgressRemaining = 16;
        this.isStanding = false;

        this.isPlayerControlled = config.isPlayerControlled || false;

        //Sets the direction of character movement on a X/Y grid
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }
    
    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            //Cases for starting to walk will come here
            //
            //

            //Case - User has pressed an arrow key, we're keyboard ready
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                  type: "walk",
                  direction: state.arrow
                })
              }
              this.updateSprite(state);
            }
          }
        

    //Fires a walk command on a person without it being user controlled
    startBehavior(state, behavior) {
        //Set character direction to that which behavior has
        this.direction = behavior.direction;
        
        if (behavior.type === "walk") {
    
          //Stops function is the space is taken/person hit a wall etc
          if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
            
            behavior.retry && setTimeout(() => {
              this.startBehavior(state, behavior)
            }, 10)

            return;
          }
    
          //Start walking again
          state.map.moveWall(this.x, this.y, this.direction);
          this.movingProgressRemaining = 16;
          this.updateSprite(state); //Updates to right animation frame
        }
        if (behavior.type === "stand") {
          this.isStanding = true;
          setTimeout(() => {
            utils.emitEvent("PersonStandComplete", {
              executorId: this.id
            })
            this.isStanding = false;
          }, behavior.time)
        }
      }

    //Should be run every frame
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;

        //If person is done moving, emit event
        if (this.movingProgressRemaining === 0) {
          utils.emitEvent("PersonWalkingComplete", {
            executorId: this.id
          });
        }
    }

    //Updates sprite animation based on the direction we're typing
    updateSprite() {
        if (this.movingProgressRemaining > 0) {
          this.sprite.setAnimation("walk-" + this.direction);
          return;
        }
        this.sprite.setAnimation("idle-" + this.direction);    
      }
    
    }