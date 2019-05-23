class Planet {
    constructor(x, y, width, height, canvas) {
        this.cx = x;
        this.cy = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = "images/planet.png";
        this.m = 2;
        this.x = -1.50324727873647e-6;
        this.y = -3.93762725944737e-6;
        this.z = -4.86567877183925e-8;
        this.vx = 3.1669325898331e-5;
        this.vy = -6.85489559263319e-6;
        this.vz = -7.90076642683254e-7;
        this.radius = 300;
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');
        this.bone = null;
    };

    render() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.drawImage(this.image, this.cx, this.cy, this.width, this.height);
        this.canvasContext.translate(this.canvas.width/2, this.canvas.height/2);
        this.canvasContext.rotate(- (Math.PI / 180) /10);
        this.canvasContext.translate(-this.canvas.width/2, -this.canvas.height/2);
    };
}