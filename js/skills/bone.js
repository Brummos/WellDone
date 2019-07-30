var i= 0;

class Bone {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = "images/bone.png";

        this.canvas = cBoneCanvas;//document.createElement('canvas');
        // this.canvas.id = "canvas_bone" + i;
        // this.canvas.width = 2400;
        // this.canvas.height = 1200;
        this.canvas.style.zzIndex = "9";
//    canvas.style.position = "absolute";
        //this.canvas.style.border = "1px solid black";
        //document.getElementsByTagName("body")[0].appendChild(this.canvas);
        this.canvasContext = this.canvas.getContext("2d");

        this.x = 0;
        this.y = 0;
    };

    setXY(x, y) {
    this.x = x;
    this.y = y;
    }

    render(x, y) {
        //this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.drawImage(this.image, x- (this.width / 2), y- (this.height / 2), this.width, this.height);
        // // // rotate in place
        // this.canvasContext.translate(x, y);
        // this.canvasContext.rotate((Math.PI / 50));
        // this.canvasContext.translate(-x, -y);
    };

    destroy() {
        //this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.width);
        bones.splice(bones.indexOf(this), 1);
        //document.getElementsByTagName("body")[0].removeChild(this.canvas);
    };
}