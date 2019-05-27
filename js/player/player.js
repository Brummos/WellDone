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

        this.image2 = new Image();
        this.image2.src = "images/forceField.png";

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



        // cShield.setTransform(1, 0, 0, 1, 0, 0);
        // cShield.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.angle = Math.atan2(y - (this.canvas.height / 2), x - (this.canvas.width / 2));
        // cShield.setTransform(1, 0, 0, 1, (this.canvas.width / 2), (this.canvas.height / 2));
        // cShield.rotate(this.angle);
        //
        // cShield.globalAlpha = 0.4;
        //
        // cShield.drawImage(this.image2, this.radius - (150 / 2), this.y - (200 / 2), 150, 200);





        // cShield.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // cShield.drawImage(this.image, 0, 0, this.width, this.height);


        // //shield
        // cShield.setTransform(1, 0, 0, 1, 0, 0);
        // cShield.clearRect(0, 0, cShieldCanvas.width, cShieldCanvas.height);
        // var  angle2 = Math.atan2(y - (cShieldCanvas.height / 2), x - (cShieldCanvas.width / 2));
        //
        // cShield.setTransform(1, 0, 0, 1, (cShieldCanvas.width / 2), (cShieldCanvas.height / 2));
        // cShield.rotate(angle2);
        // cShield.drawImage(this.image, this.radius - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
    };

}