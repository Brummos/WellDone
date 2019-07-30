//NEEDS TO BE CLASS
function DickLit(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.image = new Image();

    // this.audio = new Audio('audio/soundsample.mp3');
    // this.audio.play();

    this.render = function() {
        this.image.src = "images/chicken.png";
        cDickLets.drawImage(this.image, this.x, this.y, this.width, this.height);
    };

    this.tick = function() {
        for (i in bones) {
            if (this.collision(this, bones[i])) {
                // score = score + bones[i].scoreValue;
                //bones.splice(bones.indexOf(bones[i]), 1);
                dickLitList.splice(dickLitList.indexOf(this), 1);
            }
        }

    };

    this.collision = function(obj1, obj2) {
       // return (
            // obj1.x < obj2.x + obj2.width &&
            // obj1.x + obj1.width > obj2.x &&
            // obj1.y < obj2.y + obj2.height &&
            // obj1.y + obj1.height > obj2.y


        console.log(obj1.x);
        console.log(obj1.y);

        var pixelData = cBone.getImageData(obj1.x+20, obj1.y+20, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
        for (var zx = 0, n = pixelData.length; zx < n; zx += 4) {
            //console.log(pixelData[zx + 3].toString());
            return pixelData[zx + 3].toString() != 0;


            // if (pixelData[zx + 3].toString() != 0) { //.toString() ???? //alpha channel
            //     massJ.bone.destroy();
            //     var explosion = new Explosion(indexX, indexY, 256, 256, 1, 2400, 1200);
            //     explosions.push(explosion);
            //     this.masses.splice(j, 1);
            //     break;
            // }
        }

       // )
    };
}