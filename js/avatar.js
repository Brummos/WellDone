class Avatar {
    constructor(x, y, name, canvas) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.scoreText = "Score: ";
        // this.width = width;
        // this.height = height;
        this.image = new Image();
        this.image.src = "images/planet.png";
        this.radius = 300;
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');
    }

    render() {
    };
}