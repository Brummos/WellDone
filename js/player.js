class Player {
    constructor(width, height, canvas) {
        this.x = 500; //800
        this.y = 0; //100
        this.width = width;
        this.height = height;
        this.radius = 500;
        this.angle = 0;
        this.image = new Image();
        this.image.src = "images/planet.png";
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');
    };

    render(x, y) {
        this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.angle = Math.atan2(y- 600, x- 1200)
        this.canvasContext.setTransform(1, 0, 0, 1, 1200, 600);
        this.canvasContext.rotate(this.angle);
        this.canvasContext.drawImage(this.image, this.x - (this.width / 2), this.y - (this.height/2), this.width, this.height); //this.y-(this.height/2
    };

}