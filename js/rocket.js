class Rocket {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 80;
        this.image = new Image();
        this.image.src = "images/rocket.png";
        this.velX = 0;
        this.velY = 0;
        this.speed = 2;
        this.landed = false;
        // this.audio = new Audio('audio/soundsample.mp3');
        // this.audio.play();
        //this.dd = false;
    }

    //TODO give object own canvas (dynamic)

    render() {
        if (!this.landed) {
            this.collision();
            this.move();
        }

        gRocket.clearRect(0, 0, width, height);
        gRocket.drawImage(this.image, this.x, this.y, this.width, this.height);

        if (this.landed) {
            gRocket.translate(500, 500); //half canvas
            gRocket.rotate(- (Math.PI / 180) /10);
            gRocket.translate(-500, -500); //half canvas
        }
    };

    move() {
        var tx = 500 - this.x, //500 is center
            ty = 500 - this.y,
            dist = Math.sqrt(tx * tx + ty * ty);

        if (dist >= this.speed) {
            this.velX = (tx / dist) * this.speed;
            this.velY = (ty / dist) * this.speed;
            this.x += this.velX;
            this.y += this.velY;
        }
    };

    collision() {
        var pixelData = gPlanet.getImageData(this.x, this.y, 1, 1).data;
        for (var zx = 0, n = pixelData.length; zx < n; zx += 4) {
            //console.log(pixelData[zx + 3].toString());

            if (pixelData[zx + 3] != 0) {
                this.landed = true;
                break;
            }
        }
    }
}