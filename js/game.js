gameStateEnum = {
    MENU : 'MENU',
    PLAY : 'PLAY',
    PAUSE : 'PAUSE'
}

var menuImage = new Image();
menuImage.src = 'images/menu.jpg'; //menu

var optionsImage = new Image();
optionsImage.src = 'images/options.jpg'; //menu

var cCircles = document.getElementById("canvas_circles").getContext('2d');
var cDickLets = document.getElementById("canvas_dicklets").getContext('2d');
var cPlanetCanvas = document.getElementById("canvas_planet");
var gPlanet = document.getElementById("canvas_planet").getContext('2d');
var gRocket = document.getElementById("canvas_rocket").getContext('2d');
var cBackground = document.getElementById("canvas_background").getContext('2d');
var cStars = document.getElementById("canvas_stars").getContext('2d');

const canvas = document.querySelector("#canvas_enemies");
const ctx = canvas.getContext("2d");
const width = (canvas.width);
const height = (canvas.height);

var startBtn = document.getElementById("startBtn");
var optionsBtn = document.getElementById("optionsBtn");
var volumeSlider = document.getElementById("volumeSlider");
var musicVolumeSlider = document.getElementById("musicVolumeSlider");
var optionsBackBtn = document.getElementById("optionsBackBtn");
var playMusicBtn = document.getElementById("playMusicBtn");
var pauseOptionsBtn = document.getElementById("pauseOptionsBtn");
var pauseBackBtn = document.getElementById("pauseBackBtn");


init();

// class Planet {
//     constructor(x, y, width, height, canvas) {
//         this.cx = x;
//         this.cy = y;
//         this.width = width;
//         this.height = height;
//         this.image = new Image();
//         this.image.src = "images/planet.png";
//         this.m = 2;
//         this.x = -1.50324727873647e-6;
//         this.y = -3.93762725944737e-6;
//         this.z = -4.86567877183925e-8;
//         this.vx = 3.1669325898331e-5;
//         this.vy = -6.85489559263319e-6;
//         this.vz = -7.90076642683254e-7;
//         this.radius = 300;
//         this.canvas = canvas;
//         this.canvasContext = this.canvas.getContext('2d');
//     }
//
//     render() {
//         this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         this.canvasContext.drawImage(this.image, this.cx, this.cy, this.width, this.height);
//         this.canvasContext.translate(this.canvas.width/2, this.canvas.height/2);
//         this.canvasContext.rotate(- (Math.PI / 180) /10);
//         this.canvasContext.translate(-this.canvas.width/2, -this.canvas.height/2);
//     };
// }

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
    }

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
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.width); //TODO only where explosion is
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

class nBodyProblem {
    constructor(params) {
        this.g = params.g;
        this.dt = params.dt;
        this.softeningConstant = params.softeningConstant;

        this.masses = params.masses;
    }

    updatePositionVectors() {
        const massesLen = this.masses.length;

        for (let i = 0; i < massesLen; i++) {
            const massI = this.masses[i];

            massI.x += massI.vx * this.dt;
            massI.y += massI.vy * this.dt;
            massI.z += massI.vz * this.dt;
        }

        return this;
    }

    updateVelocityVectors() {
        const massesLen = this.masses.length;

        for (let i = 0; i < massesLen; i++) {
            const massI = this.masses[i];

            massI.vx += massI.ax * this.dt;
            massI.vy += massI.ay * this.dt;
            massI.vz += massI.az * this.dt;
        }
    }

    updateAccelerationVectors() {
        for (let i = 0; i < this.masses.length; i++) {
            let ax = 0;
            let ay = 0;
            let az = 0;

            const massI = this.masses[i];

            for (let j = 0; j < this.masses.length; j++) {
                if (i !== j) {
                    const massJ = this.masses[j];

                    if (massJ.radius == 4) { //TODO improve this if statement to check if its not earth
                        //some pixel collision
                        var indexX = Math.floor((massJ.x * scale) + (width / 2));
                        var indexY = Math.floor((massJ.y * scale) + (height / 2));

                        var pixelData = gPlanet.getImageData(indexX, indexY, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
                        for (var zx = 0, n = pixelData.length; zx < n; zx += 4) {
                            //console.log(pixelData[zx + 3].toString());

                            if (pixelData[zx + 3].toString() != 0) { //.toString() ????
                                var explosion = new Explosion(indexX, indexY, 256, 256, 1, 2400, 1200);
                                explosions.push(explosion);
                                if (playMusicBtn.value == "unmuted") {
                                    explosion.soundEffect.play();
                                }
                                this.masses.splice(j, 1);
                                break;
                            }
                        }
                    }

                    const dx = massJ.x - massI.x;
                    const dy = massJ.y - massI.y;
                    const dz = massJ.z - massI.z;

                    const distSq = dx * dx + dy * dy + dz * dz;

                    const f = (this.g * massJ.m) / (distSq * Math.sqrt(distSq + this.softeningConstant));

                    ax += dx * f;
                    ay += dy * f;
                    az += dz * f;
                }
            }

            massI.ax = ax;
            massI.ay = ay;
            massI.az = az;
        }

        return this;
    }
}

var gameState = gameStateEnum.MENU;
var volume = 1;
var musicVolume = 1;
var explosionImg = new Image();
explosionImg.src = 'images/boom.png';
var bgimg = new Image();
bgimg.src = 'images/bg.jpeg';
var explosions = [];
var dickLitList = [];
var stars = [];
var menuMusic = new Audio('audio/menu_audio.mp3');
menuMusic.volume = musicVolume;
menuMusic.loop = true;

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
}

var planet = new Planet((cPlanetCanvas.width/2)-(1000/2), (cPlanetCanvas.height/2)-(1000/2), 1000, 1000, cPlanetCanvas);
var rocket = new Rocket(800, -30);
var dickLit = new DickLit(100, (height/2)-40/2); //(width/2)-40/2

const g = 20;//39.5; //gravity
const dt = 0.008; //0.005 years is equal to 1.825 days //speed
const softeningConstant = 0.15;
const scale = 300;
const trailLength = 35;

let mousePressX = 0;
let mousePressY = 0;
let currentMouseX = 0;
let currentMouseY = 0;
let mouseDown = false;

var Key = {
    escape: false
};


function initStars(amount) {
    for (i = 0; i < amount; i++) {
        stars.push(new Star(Math.random() * 2400, Math.random() * 1200));
    }
}

function populateEnemies() {
    ////TEST STUFF
    // gRocket.clearRect(0, 0, width, height);
    rocket.render();

    cDickLets.clearRect(0, 0, width, height);
    dickLit.render();

    // rotate enemies
    cDickLets.translate(500, 500); //half canvas
    cDickLets.rotate(- (Math.PI / 180) /10);
    cDickLets.translate(-500, -500); //half canvas

    // test circles
    // inner circle
    cCircles.beginPath();
    cCircles.arc(500, 500, 330, 0, 2 * Math.PI);
    cCircles.stroke();
    // outer circle
    cCircles.beginPath();
    cCircles.arc(500, 500, 408, 0, 2 * Math.PI);
    cCircles.stroke();



    // test searching good pixels
    // var min=0;
    // var max=999;
    // var randomX = Math.random() * (+max - +min) + +min;
    // var randomY = Math.random() * (+max - +min) + +min;
    // var pixelData = gPlanet.getImageData(randomX, randomY, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
    // for (var zx = 0, n = pixelData.length; zx < n; zx += 4) {
    //     console.log(pixelData[zx + 3].toString());
    // }

    // // get random position between 2 radius
    //  var minR=330;
    //  var maxR=408;
    //  var radiusRandom = Math.random() * (+maxR - +minR) + +minR;
    //  var radius = 60;
    //  var minA=1;
    //  var maxA=360;
    //  var angleRandom = Math.random() * (+maxA - +minA) + +minA;
    //  var angle  = 140;
    //  var x = radiusRandom * Math.sin(Math.PI * 2 * angleRandom / 360); //angleRandom);//
    //  var y = radiusRandom * Math.cos(Math.PI * 2 * angleRandom / 360); //angleRandom);//
    //  // console.log('Points coors are  x='+
    //  //     Math.round(x * 100) / 100 +', y=' +
    //  //     Math.round(y * 100) / 100)
    //
    //  var xx = 0;
    //  if ( x < 0) {
    //      // x = --x;
    //      xx = 500 - Math.abs(x);
    //  } else {
    //      xx = 500 + x;
    //  }
    //
    //  var yy = 0;
    //  if ( y < 0) {
    //     // y = --y;
    //      yy = 500 - Math.abs(y);
    //  } else {
    //      yy = 500 + y;
    //  }
    //
    //  // console.log(xx)
    //  // console.log(yy)
    //
    //  //TODO CHECK y1 y2
    //  //           x1 x2
    //
    //  var pixelData = gPlanet.getImageData(xx-20, yy-20, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
    //  for (var zx = 0, n = pixelData.length; zx < n; zx += 4) {
    //      //console.log(pixelData[zx + 3].toString());
    //      if (pixelData[zx + 3].toString() != 0) {
    //          dickLitList.push(new DickLit(xx - 20, yy - 20)); // 20 is half size of chicken
    //
    //      }
    //  }
    //
    //  for (let i in dickLitList) {
    //      dickLitList[i].render();
    //  }
}

const masses = [
    {
        // name: "",
        // m: 2,
        // x: -1.50324727873647e-6,
        // y: -3.93762725944737e-6,
        // z: -4.86567877183925e-8,
        // vx: 3.1669325898331e-5,
        // vy: -6.85489559263319e-6,
        // vz: -7.90076642683254e-7,
        // radius: 300

        name: "",
        m: planet.m,
        x: planet.x,
        y: planet.y,
        z: planet.z,
        vx: planet.vx,
        vy: planet.vy,
        vz: planet.vz,
        radius: planet.radius
    }
];

const innerSolarSystem = new nBodyProblem({
    g,
    dt,
    masses: JSON.parse(JSON.stringify(masses)),
    softeningConstant
});

class Manifestation {
    constructor(ctx, trailLength, radius) {
        this.ctx = ctx;
        this.trailLength = trailLength;
        this.radius = radius;
        this.positions = [];
    }

    storePosition(x, y) {
        this.positions.push({
            x,
            y
        });

        if (this.positions.length > this.trailLength) this.positions.shift();
    }

    draw(x, y) {
        this.storePosition(x, y);

        const positionsLen = this.positions.length;

        for (let i = 0; i < positionsLen; i++) {
            let transparency;
            let circleScaleFactor;

            const scaleFactor = i / positionsLen;

            if (i === positionsLen - 1) {
                transparency = 1;
                circleScaleFactor = 1;
            } else {
                transparency = scaleFactor / 2;
                circleScaleFactor = scaleFactor;
            }

            this.ctx.beginPath();
            this.ctx.arc(
                this.positions[i].x,
                this.positions[i].y,
                circleScaleFactor * this.radius,
                0,
                2 * Math.PI
            );
            this.ctx.fillStyle = `rgb(0, 12, 153, ${transparency})`;

            this.ctx.fill();
        }
    }
}

const populateManifestations = masses => {
    masses.forEach(
        mass =>
            (mass["manifestation"] = new Manifestation(
                ctx,
                trailLength,
                mass.radius
            ))
    );
};

populateManifestations(innerSolarSystem.masses);

const massesList = document.querySelector("#masses-list");

addEventListener("mousedown", e => {
        if (gameState == gameStateEnum.PLAY) {
            mousePressX = e.clientX;
            mousePressY = e.clientY;
            mouseDown = true;
        }
    }, false);

addEventListener("mousemove", e => {
        if (gameState == gameStateEnum.PLAY) {
            currentMouseX = e.clientX;
            currentMouseY = e.clientY;
        }
    }, false);

addEventListener("mouseup", e => {
        if (gameState == gameStateEnum.PLAY) {
            const x = (mousePressX - width / 2) / scale;

            const y = (mousePressY - height / 2) / scale;
            const z = 0;
            const vx = (e.clientX - mousePressX) / 35;
            const vy = (e.clientY - mousePressY) / 35;
            const vz = 0;
            const radius = 4;

            innerSolarSystem.masses.push({
                m: parseFloat(massesList.value),
                x,
                y,
                z,
                vx,
                vy,
                vz,
                radius,
                manifestation: new Manifestation(ctx, trailLength, radius)
            });

            mouseDown = false;
        }
    }, false);

addEventListener("keydown", function(e) {
    if (gameState != gameStateEnum.MENU) {
    var keyCode = (e.keyKode) ? e.keyKode : e.which;
    switch(keyCode) {
        case 27:
            Key.escape = true;
            gameState = gameState == gameStateEnum.PLAY ? gameStateEnum.PAUSE : gameStateEnum.PLAY;

            if (gameState == gameStateEnum.PAUSE) {

                showPause();
                // for (i in explosions) {
                //     explosions[i].soundEffect.pause();
                // }
            } else {
                // for (i in explosions) {
                //     explosions[i].soundEffect.play();
                // }

                showUnpause();
                //document.getElementById("canvas_pause").style.display = "none";
            }


            break;
    }
    }
}, false);

addEventListener("keyup", function(e){
    var keyCode = (e.keyKode) ? e.keyKode : e.which;
    switch(keyCode) {
        case 27:
            Key.escape = false;
            break;
    }
}, false);

const animate = () => {
    if (gameState == gameStateEnum.PLAY) {
        planet.render();
        populateEnemies();

        cBackground.clearRect(0, 0, 2400, 1200);
        cBackground.drawImage(bgimg, 0, 0, 2400, 1200);

        for (i in stars) stars[i].render();

        for (i in explosions) {
            explosions[i].tick();
        }

        innerSolarSystem
            .updatePositionVectors()
            .updateAccelerationVectors()
            .updateVelocityVectors();

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < innerSolarSystem.masses.length; i++) {
            //skip "earth"
            if (i <= 0) continue;

            const massI = innerSolarSystem.masses[i];
            const x = width / 2 + massI.x * scale;
            const y = height / 2 + massI.y * scale;

            massI.manifestation.draw(x, y);

            //border bounce
            // if (x < radius || x > width - radius) massI.vx = -massI.vx;
            //
            // if (y < radius || y > height - radius) massI.vy = -massI.vy;
        }

        if (mouseDown) {
            ctx.beginPath();
            ctx.moveTo(mousePressX, mousePressY);
            ctx.lineTo(currentMouseX, currentMouseY);
            ctx.strokeStyle = "red";
            ctx.stroke();
        }
    }

    requestAnimationFrame(animate);
};

function start() {
    volume = volumeSlider.value / 100;
    musicVolume = musicVolumeSlider.value / 100;

    startBtn.style.display = 'none';
    optionsBtn.style.display = 'none';
    playMusicBtn.style.display = 'none';

    gameState = gameStateEnum.PLAY;

    initStars(600);

    menuMusic.pause();
    menuMusic = new Audio('audio/game_music.mp3');
    if (playMusicBtn.value == "unmuted") {
        menuMusic.volume = musicVolume;
        menuMusic.loop = true;
        menuMusic.play();
    }

    animate();
}

function reset() {
     explosions = [];
     dickLitList = [];
     stars = [];

     planet = new Planet((cPlanetCanvas.width/2)-(1000/2), (cPlanetCanvas.height/2)-(1000/2), 1000, 1000, cPlanetCanvas);
     rocket = new Rocket(800, -30);
     dickLit = new DickLit(100, (height/2)-40/2); //(width/2)-40/2

     mousePressX = 0;
     mousePressY = 0;
     currentMouseX = 0;
     currentMouseY = 0;
    // mouseDown = false;
}

function init() {
    cBackground.clearRect(0, 0, 2400, 1200);
    cBackground.drawImage(menuImage, 0, 0, 2400, 1200);
}

/////////////////////OPTIONS////////////////////////////

function exitGame() {
    gameState = gameStateEnum.MENU;
    reset();
    showUnpause();

    cCircles.clearRect(0, 0, 2400, 1200);
    cDickLets.clearRect(0, 0, 2400, 1200);
    gPlanet.clearRect(0, 0, 2400, 1200);
    gRocket.clearRect(0, 0, 2400, 1200);
    cBackground.clearRect(0, 0, 2400, 1200);
    cStars.clearRect(0, 0, 2400, 1200);

    init();

    startBtn.style.display = 'inline';
    optionsBtn.style.display = 'inline';
    playMusicBtn.style.display = 'inline';

    menuMusic.pause();
    menuMusic = new Audio('audio/menu_audio.mp3');
    menuMusic.volume = musicVolume;
    menuMusic.loop = true;
    if (playMusicBtn.value == "unmuted") {
        menuMusic.play();
    }
}

function showPause() {
    document.getElementById("canvas_pause").style.display = "block";
    pauseOptionsBtn.style.display = 'inline';
    pauseBackBtn.style.display = 'inline';
}

function showUnpause() {
    document.getElementById("canvas_pause").style.display = "none";
    pauseOptionsBtn.style.display = 'none';
    pauseBackBtn.style.display = 'none';
}

function showOptions() {
    cBackground.clearRect(0, 0, 2400, 1200);
    cBackground.drawImage(optionsImage, 0, 0, 2400, 1200);

    startBtn.style.display = 'none';
    optionsBtn.style.display = 'none';

    optionsBackBtn.style.display = 'inline';
    volumeSlider.style.display = 'inline';
    musicVolumeSlider.style.display = 'inline';
}

function backOptions() {
    cBackground.clearRect(0, 0, 2400, 1200);
    cBackground.drawImage(menuImage, 0, 0, 2400, 1200);

    volumeSlider.style.display = 'none';
    optionsBackBtn.style.display = 'none';
    musicVolumeSlider.style.display = 'none';

    startBtn.style.display = 'inline';
    optionsBtn.style.display = 'inline';
}

function playMusic() {
    if (playMusicBtn.value == "muted") {
        menuMusic.play();
        playMusicBtn.innerHTML = "Mute music";
        playMusicBtn.value = "unmuted"
    } else {
        menuMusic.pause();
        menuMusic.currentTime = 0;
        playMusicBtn.innerHTML = "Play music";
        playMusicBtn.value = "muted"
    }
}

musicVolumeSlider.addEventListener("input", function(){
    menuMusic.volume = musicVolumeSlider.value / 100;
});

//TODO username opgeven en coole avatar plaatsen met naam

//TODO difficulty setting
//TODO build a pause function TODO AUDIO PAUSE
//TODO blackholes
//TODO options screen
//TODO back when explosion, still shows explosion