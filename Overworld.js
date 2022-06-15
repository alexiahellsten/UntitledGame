class Overworld {
 constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
 }   

 init() {
    const image = new Image();
    image.onload = () => {
        this.ctx.drawImage(image, 0,0)
    };
    image.src = "/images/maps/testmap.png";

    //Placing objects
    const hero = new GameObject({
        x: 5,
        y: 6,
    })

    const fox = new GameObject({
        x: 7,
        y: 9,
        src: "/images/characters/Fox Sprite Sheet.png"
    })

    setTimeout(() => {
        hero.sprite.draw(this.ctx);
        fox.sprite.draw(this.ctx);
    }, 200);
}
}

