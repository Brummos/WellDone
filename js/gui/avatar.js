class Avatar {
    constructor(x, y, name, canvas) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.score = 0;
        this.scoreText = "Score: ";
        // this.width = width;
        // this.height = height;
        this.image = new Image();
        this.image.src = "images/avatar.png";
        this.mainImage = new Image();
        this.mainImage.src = "images/avatar_new.png";
        this.barImage = new Image();
        this.barImage.src = "images/bar.png";
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');

        this.HealthWidth = 240;
        this.health = 100;

        this.initPower = 34;
        this.PowerWidth = 221; //255
        this.power = 100;




    }

    render() {
        //background
        var posPower = this.PowerWidth * (this.power / 100);
        this.canvasContext.drawImage(this.barImage, 120, 143,this.initPower + posPower, 25);
        this.canvasContext.drawImage(avatarImg, 20, 20, 360, 150);
    //
    //     //avatar icon
    //     this.canvasContext.drawImage(this.image, 20+10, 20+10, 130, 130);
    //
    //     //name
    //     this.canvasContext.fillStyle = 'white';
    //     this.canvasContext.fillRect(170, 30, 240, 35);
    //     this.canvasContext.fillStyle = 'black';
    //     this.canvasContext.font = "20px Georgia";
    //     this.canvasContext.fillText(this.name, 175, 55);
    //
    //     //score
    //     this.updateScore();
    //
    //     //power
    //     this.updatePower();
    //
    //     this.updateHealth();
    };

    updateScore() {
        this.canvasContext.clearRect(170, 75, 240, 35);
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.fillRect(170, 75, 240, 35);
        this.canvasContext.fillStyle = 'black';
        this.canvasContext.font = "20px Georgia";
        this.canvasContext.fillText(this.scoreText + this.score, 175, 100);
    };

    updatePower() {
        this.canvasContext.clearRect(170, 120, 240, 35);
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.fillRect(170, 120, this.PowerWidth * (this.health / 100), 35);
        this.canvasContext.fillStyle = 'black';
        this.canvasContext.font = "20px Georgia";
        this.canvasContext.fillText("Power", 175, 145);
    };

    updateHealth() {
        this.canvasContext.clearRect(170, 165, 240, 35);
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.fillRect(170, 165, this.HealthWidth * (this.health / 100), 35);
    }
}