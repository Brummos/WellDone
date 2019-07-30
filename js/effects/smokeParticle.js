class SmokeParticle {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.scale = 1;
        this.scaledWidth = this.scale * this.width;
        this.scaledHeight = this.scale * this.height;
        this.canvas = document.createElement('canvas');
        this.canvas.id = "canvas_smokepart" + index;//explosions.length;
        this.canvas.width = 2400;
        this.canvas.height = 1200;
        this.canvas.style.zzIndex = "8";
//    canvas.style.position = "absolute";
        this.canvas.style.border = "1px solid black";
        document.getElementsByTagName("body")[0].appendChild(this.canvas);
        this.canvasContext = this.canvas.getContext("2d");
        this.canvasContext.globalAlpha = 0.4;
        this.image = new Image();
        this.image.src = "images/planet.png";

    }

    destroy() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.width);
        // explosions.splice(explosions.indexOf(this), 1);
        document.getElementsByTagName("body")[0].removeChild(this.canvas);
    };

    render(frameX, frameY, canvasX, canvasY) {
        // this.canvasContext.drawImage(explosionImg,
        //     frameX * this.width, frameY * this.height,
        //     this.width,
        //     this.height,
        //     canvasX,
        //     canvasY,
        //     this.scaledWidth,
        //     this.scaledHeight);
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.scale < 1.5) {
            this.canvasContext.drawImage(this.image, this.x-((this.width * this.scale)/2), this.y-((this.height * this.scale)/2), this.width * this.scale, this.height * this.scale);
        }
    };

    tick() {
        this.scale += 0.01;


            this.render(0, 0, this.x-(this.width/2), this.y-(this.height/2));
             //   document.getElementsByTagName("body")[0].removeChild(this.canvas);

    }
}