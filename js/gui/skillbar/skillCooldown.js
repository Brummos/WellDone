class SkillCooldown {
    constructor(x, y, timer, canvas) {
        this.x = x;
        this.y = y;
        this.timer = timer;
        this.width = 100;
        this.initHeight = 100;
        this.height = this.initHeight;
        this.image = new Image();
        this.image.src = "images/planet.png";
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');
        this.canvasContext.globalAlpha = 0.4;
        this.fps = 60;
    };

    render() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.height > 0) {
            this.height -= (this.initHeight / this.timer) / this.fps;
            this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
        }
    };
}