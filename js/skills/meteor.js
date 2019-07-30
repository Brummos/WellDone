class Meteor {
    constructor(x, y, width, height, canvas) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scale = 1;
        this.scaledWidth = this.scale * this.width;
        this.scaledHeight = this.scale * this.height;
        this.canvas = canvas;// document.createElement('canvas');
//         this.canvas.id = "canvas_meteor" + 1;//explosions.length;
//         this.canvas.width = 2400;
//         this.canvas.height = 1200;
//         this.canvas.style.zzIndex = "8";
// //    canvas.style.position = "absolute";
//         this.canvas.style.border = "1px solid black";
       // document.getElementsByTagName("body")[0].appendChild(this.canvas);
        this.canvasContext = this.canvas.getContext("2d");
        this.image = new Image();
        this.image.src = "images/meteor4.png";
        this.soundEffect = new Audio('audio/meteor_impact.mp3');
        this.soundEffect.volume = volume;

        if (playMusicBtn.value == "unmuted") {
            this.soundEffect.play();
        }


        this.velocity = 1.0001;
        this.side = 1;

    }

    destroy() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.width);
        // explosions.splice(explosions.indexOf(this), 1);
       // document.getElementsByTagName("body")[0].removeChild(this.canvas);
    };

    render(frameX, frameY, canvasX, canvasY) {
        // this.canvasContext.drawImage(explosionImg,
        //     frameX * this.width, frameY * this.height,
        //     this.width,
        //     this.height,
        //     canvasX,
        //     canvasY,
        //     this.scaledWidth,
        //     this.scaledHeight);

        this.canvasContext.drawImage(this.image, this.x, this.y, this.width*this.scale, this.height*this.scale);
    };

    tick() {
        // this.scale += 0.1;
        // this.x += 21;
        // this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //
        // if (this.scale < 3.5) {
        //     this.render(0, 0, this.x-(this.width/2), this.y-(this.height/2));
        // } else {
        //     this.scale -= 0.1;
        //     this.x -= 21;
        //     this.render(0, 0, this.x-(this.width/2), this.y-(this.height/2));
        // }


        //////////////////////////////////

        // this.scale *= this.velocity;
        //
        // this.velocity += 0.00053;
        //
        // this.x += 2;
        // this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //
        //
        // if (this.scale < 35.5) {
        // //if (this.width < 500) {
        //     this.render(0, 0, this.x-(this.width/2), this.y-(this.height/2));
        // } else {
        //     this.scale = 35.5;
        //     this.x -= 1;
        //     this.render(0, 0, this.x-(this.width/2), this.y-(this.height/2));
        // }


        /////////////////////////////////////////


        // this.scale *= this.velocity;
        //
        // this.x += this.side;
        //
        // this.velocity += 0.00053;
        // this.side += 0.11;
        //
        //
        // this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //
        //
        // if (this.scale < 35.5) {
        //     //if (this.width < 500) {
        //     this.render(0, 0, this.x-(this.width/2), this.y-(this.height/2));
        // } else {
        //     this.scale = 35.5;
        //     this.x -= this.side;
        //     this.render(0, 0, this.x-(this.width/2), this.y-(this.height/2));
        // }

//////////////////////////

        // this.scale *= this.velocity;
        //
        // this.x += this.side;
        //
        // this.velocity += 0.00053;
        // this.side += 0.116;
        //
        // this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //
        // if (this.scale < 35.5) {
        //     //if (this.width < 500) {
        //     this.render(0, 0, this.x-(this.width/2), this.y-(this.height/2));
        // }


        ////////////////////////////////////////////////////////////

        this.scale *= this.velocity;

        this.x += this.side;

        this.velocity += 0.00200;
        this.side += 0.116;

        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.scale < 35.5) {
            //if (this.width < 500) {
            this.render(0, 0, this.x-(this.width/2), this.y-(this.height/2));
        }

    }
}