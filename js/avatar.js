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
        this.radius = 300;
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');
    }

    render() {
        //background
        this.canvasContext.fillStyle = 'blue';
        this.canvasContext.fillRect(20, 20, 400, 150);

        //avatar icon
        this.canvasContext.drawImage(this.image, 20+10, 20+10, 130, 130);

        //name
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.fillRect(170, 30, 240, 35);
        this.canvasContext.fillStyle = 'black';
        this.canvasContext.font = "20px Georgia";
        this.canvasContext.fillText("Brummos", 175, 55);

        //score
        this.updateScore();

        //power
        this.updatePower();
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
        this.canvasContext.fillRect(170, 120, 240, 35);
        this.canvasContext.fillStyle = 'black';
        this.canvasContext.font = "20px Georgia";
        this.canvasContext.fillText("Power", 175, 145);
    };
}