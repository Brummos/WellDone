class Skillbar {
    constructor(x, y, width, height, canvas) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = "images/skillbar2.png";
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');
    };

    render() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
}