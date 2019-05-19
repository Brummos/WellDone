function Star(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3;
    this.render = function() {
        cStars.fillStyle = "white";
        cStars.fillRect(this.x, this.y, this.size, this.size);
    }
    this.tick = function() {
        // if (this.y > gBackgroundHeight + 4) {
        //     stars.splice(stars.indexOf(this), 1);
        //     return;
        // }
        // this.y++;

    }
} //needs to be a class