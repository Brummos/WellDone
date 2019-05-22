class Player {
    constructor(width, height, canvas) {
        this.x = 0;
        this.y = 0;
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
        this.angle = Math.atan2(y- 600, x- 1200)
        this.x = Math.cos(this.angle) * this.radius + ((this.canvas.width / 2) - (this.width / 2));
        this.y = Math.sin(this.angle) * this.radius + ((this.canvas.height / 2) - (this.height / 2));

        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.drawImage(this.image, this.x, this.y, this.width, this.height);
    };

}