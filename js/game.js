gameStateEnum = {
    MENU : 'MENU',
    PLAY : 'PLAY',
    PAUSE : 'PAUSE'
}

init();

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

var explosions = [];
var dickLitList = [];
var stars = [];

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

var avatar = null;

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
    avatar = new Avatar(10, 10, nameField.value, cAvatarCanvas);

    avatar.render();

    volume = volumeSlider.value / 100;
    musicVolume = musicVolumeSlider.value / 100;

    nameField.style.display = 'none';
    startGameBtn.style.display = 'none';
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

function enterName() {
    startBtn.style.display = 'none';
    optionsBtn.style.display = 'none';
    playMusicBtn.style.display = 'none';

    nameField.style.display = 'inline';
    startGameBtn.style.display = 'inline';
}

function reset() {
    for (i in explosions) explosions[i].destroy();

    dickLitList.splice(0, dickLitList.length);
    stars.splice(0, stars.length);
    innerSolarSystem.masses.splice(0, innerSolarSystem.masses.length);

    cAvatar.clearRect(0, 0, 2400, 1200);
    ctx.clearRect(0, 0, 2400, 1200);
    gPlanet.clearRect(0, 0, 2400, 1200);
    cStars.clearRect(0, 0, 2400, 1200);

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

//TODO username and avatar

//TODO start building enemies into the game
//TODO score system and score screen

//TODO blackholes

//TODO difficulty setting

//TODO when all above is done lets see if we can connect a DB for the scores
