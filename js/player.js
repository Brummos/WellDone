class Player {
    constructor(width, height, canvas) {
      //  this.x = 500; //800
        this.y = 0; //100
        this.width = width;
        this.height = height;
        this.radius = 500;
        this.angle = 0;
        this.image = new Image();
        this.image.src = "images/player2.png";
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');

        this.angleOld = 0;
    };

    render(x, y) {
        this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.angle = Math.atan2(y - (this.canvas.height / 2), x - (this.canvas.width / 2));

        //console.log(Math.atan2(y,  x) / Math.PI * 180);

        if (this.angle < this.angleOld) {
            this.image.src = "images/player2.png";
            this.angleOld = this.angle;
        } else if (this.angle > this.angleOld) {
            this.image.src = "images/player22.png";
            this.angleOld = this.angle;
        }

        this.canvasContext.setTransform(1, 0, 0, 1, (this.canvas.width / 2), (this.canvas.height / 2));
        this.canvasContext.rotate(this.angle);
        this.canvasContext.drawImage(this.image, this.radius - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
    };

}