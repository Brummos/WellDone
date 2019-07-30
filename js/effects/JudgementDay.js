class JudgementDay {
    constructor(x, y, width, height, canvas) {
        this.cx = x;
        this.cy = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = "images/planet.png";
        this.radius = 300;
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');
        this.bone = null;
    };

    render() {
        // this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.canvasContext.drawImage(this.image, this.cx, this.cy, this.width, this.height);
        // this.canvasContext.translate(this.canvas.width/2, this.canvas.height/2);
        // this.canvasContext.rotate(- (Math.PI / 180) /10);
        // this.canvasContext.translate(-this.canvas.width/2, -this.canvas.height/2);


        this.canvasContext.save();
        this.canvasContext.strokeSyle = "rgb(0, 0, 0)";
        this.canvasContext.lineWidth = 3;
        this.canvasContext.strokeRect(0, 0, 400, 200);

        let pat = new Image();
        pat.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/16777216colors.png/100px-16777216colors.png";
        pat.onload = function () {
            var pattern = ctx.createPattern(pat, "repeat");
            this.canvasContext.fillStyle = pattern;
            this.canvasContext.beginPath();
            this.canvasContext.arc(100, 100, 50, 0, 2 * Math.PI);
            // translate canvas to offset where the image coordinates are for .fill()
            //if (this.canvasContext.canvas === canvas2) {
                this.canvasContext.translate(50, 50);
           // }
            this.canvasContext.fill();
            // restore ctx back to before the translate()
            this.canvasContext.restore();
        }
    };
}