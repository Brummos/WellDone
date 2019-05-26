class Explosion {
    constructor(x, y, width, height, scale, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.scaledWidth = this.scale * this.width;
        this.scaledHeight = this.scale * this.height;
        this.sheetCol = 0;
        this.sheetRow = 0;
        this.sheetLengthX = 8;
        this.sheetLengthY = 8;
        this.canvas = document.createElement('canvas');
        this.canvas.id = "canvas_explosion" + explosions.length;
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.zzIndex = "8";
//    canvas.style.position = "absolute";
        this.canvas.style.border = "1px solid black";
        document.getElementsByTagName("body")[0].appendChild(this.canvas);
        this.canvasContext = this.canvas.getContext("2d");
        this.soundEffect = new Audio('audio/explosion_effect.mp3');
        this.soundEffect.volume = volume;

        if (playMusicBtn.value == "unmuted") {
            this.soundEffect.play();
        }
    }

    destroy() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.width);
        explosions.splice(explosions.indexOf(this), 1);
        document.getElementsByTagName("body")[0].removeChild(this.canvas);
    };

    render(frameX, frameY, canvasX, canvasY) {
        this.canvasContext.drawImage(explosionImg,
            frameX * this.width, frameY * this.height,
            this.width,
            this.height,
            canvasX,
            canvasY,
            this.scaledWidth,
            this.scaledHeight);
    };

    tick() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.width);
        if (this.sheetRow <= this.sheetLengthY) {
            this.render(this.sheetCol, this.sheetRow, this.x-(this.width/2), this.y-(this.height/2));
            this.sheetCol++;
            if (this.sheetCol >= this.sheetLengthX) {
                this.sheetCol = 0;
                this.sheetRow++;
            }

            if (this.sheetRow > this.sheetLengthY) {
                explosions.splice(explosions.indexOf(this), 1);
                document.getElementsByTagName("body")[0].removeChild(this.canvas);
            }
        }
    }
}