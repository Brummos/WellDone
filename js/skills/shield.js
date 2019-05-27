class Shield {
    constructor(width, height, radius, canvas) {
        this.y = 0;
        this.timer = 10;
        this.initHealth = 100;
        this.health = this.initHealth;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.image = new Image();
        this.image.src = "images/forceField.png";
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');
        this.canvasContext.globalAlpha = 0.4;
        this.fps = 60;
    };

    render(x, y) {
        this.timer -= (1 / this.fps);

        cShield.setTransform(1, 0, 0, 1, 0, 0);
        cShield.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.timer > 0) {
            this.angle = Math.atan2(y - (this.canvas.height / 2), x - (this.canvas.width / 2));
            cShield.setTransform(1, 0, 0, 1, (this.canvas.width / 2), (this.canvas.height / 2));
            cShield.rotate(this.angle);

            cShield.globalAlpha = 0.4;
            cShield.drawImage(this.image, this.radius - (150 / 2), this.y - (200 / 2), 150, 200);
        }

        // cShield.setTransform(1, 0, 0, 1, 0, 0);
        // cShield.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.angle = Math.atan2(y - (this.canvas.height / 2), x - (this.canvas.width / 2));
        // cShield.setTransform(1, 0, 0, 1, (this.canvas.width / 2), (this.canvas.height / 2));
        // cShield.rotate(this.angle);
        //
        // cShield.globalAlpha = 0.4;
        // cShield.drawImage(this.image, this.radius - (150 / 2), this.y - (200 / 2), 150, 200);
    };
}