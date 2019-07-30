gameStateEnum = {
    MENU : 'MENU',
    PLAY : 'PLAY',
    PAUSE : 'PAUSE'
}

init();

var testt = 1;

var gameState = gameStateEnum.MENU;

var playerRadius = 500;

var explosions = [];
var stars = [];
var bones = [];

var planet = new Planet((cPlanetCanvas.width/2)-(1000/2), (cPlanetCanvas.height/2)-(1000/2), 1000, 1000, cPlanetCanvas);
var player = new Player(244/5, 392/5, playerRadius, cPlayerCanvas); //392 244
var avatar = null;

var skillbarScale =  1.5;
var skillbar = new Skillbar(2400-((367*skillbarScale) + 50), 1200-((126*skillbarScale) + 30), 367*skillbarScale, 126*skillbarScale, cSkillsCanvas); //392 244

var cd1 = null;//new SkillCooldown(1838, 1101, 145, -105, 10, cSkillCD1Canvas); //996
var cd2 = null;//new SkillCooldown(2003, 1101, 142, -105, 2, cSkillCD2Canvas); //996
var cd3 = null;//new SkillCooldown(2167, 1105, 145, -111, 15, cSkillCD3Canvas); //996 //15
// // skills
// var shield = new Shield(0, 0, 100, 100, cShieldCanvas);
var shield = null;//null;//new Shield(244/5, 392/5, cShieldCanvas); //392 244


var meteor = null;
// var smokePar = null;
// var smokePar2 = null;
var rocket = new Rocket(800, -30);

var dickLitList = [];
var dickLit = new DickLit(780, (height/2)-40/2); //(width/2)-40/2

dickLitList.push(dickLit);




const g = 20;//39.5; //gravity
const dt = 0.008; //0.005 years is equal to 1.825 days //speed
const softeningConstant = 0.15;
const scale = 300;
const trailLength = 1;//35;

let mousePressX = 0;
let mousePressY = 0;
let currentMouseX = 0;
let currentMouseY = 0;
let mouseDown = false;

function initStars(amount) {
    for (i = 0; i < amount; i++) {
        stars.push(new Star(Math.random() * 2400, Math.random() * 1200));
    }
}

function populateEnemies() {
    ////TEST STUFF
    // gRocket.clearRect(0, 0, width, height);
   // rocket.render();

    // cDickLets.clearRect(0, 0, width, height);
    cDickLets.clearRect(0, 0, 2400, 1200);
    //dickLit.render();

    for (let i in dickLitList) {
        dickLitList[i].render();
        dickLitList[i].tick();
    }

    // rotate enemies

//     var t = new Transform();
//     console.log(t.transformPoint(1200, 600)); // will be just [5,6]
// // apply the same transformations that you did to the canvas
//     t.rotate(- (Math.PI / 180) /10);
//     console.log(t.transformPoint(1200, 600)); // will be [-2.347, 7.449]

    cDickLets.translate(1200, 600); //half canvas w , h
    cDickLets.rotate(- (Math.PI / 180) /10);
    cDickLets.translate(-1200, -600); //half canvas


    // test circles
    // inner circle

    // let pat = new Image();
    // pat.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/16777216colors.png/100px-16777216colors.png";
    // pat.onload = function () {
    //     var pattern = ctx.createPattern(pat, "repeat");
    //     cCircles.fillStyle = pattern;
    //     cCircles.beginPath();
    //     cCircles.arc(1200, 600, 330, 0, 2 * Math.PI);
    //     cCircles.stroke();
    //     cCircles.fill();
    //     // this.canvasContext.fillStyle = pattern;
    //     // this.canvasContext.beginPath();
    //     // this.canvasContext.arc(100, 100, 50, 0, 2 * Math.PI);
    //     // // translate canvas to offset where the image coordinates are for .fill()
    //     // //if (this.canvasContext.canvas === canvas2) {
    //     // this.canvasContext.translate(50, 50);
    //     // // }
    //     // this.canvasContext.fill();
    //     // // restore ctx back to before the translate()
    //     // this.canvasContext.restore();
    // }
    // //
    // // cCircles.beginPath();
    // // cCircles.arc(1200, 600, 330, 0, 2 * Math.PI);
    // // cCircles.stroke();
    // // outer circle
    // cCircles.beginPath();
    // cCircles.arc(1200, 600, 408, 0, 2 * Math.PI);
    // cCircles.stroke();



    // test searching good pixels
    // var min=0;
    // var max=999;
    // var randomX = Math.random() * (+max - +min) + +min;
    // var randomY = Math.random() * (+max - +min) + +min;
    // var pixelData = gPlanet.getImageData(randomX, randomY, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
    // for (var zx = 0, n = pixelData.length; zx < n; zx += 4) {
    //     console.log(pixelData[zx + 3].toString());
    // }

    // // // get random position between 2 radius
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

const masses = [{
        name: "",
        m: planet.m,
        x: planet.x,
        y: planet.y,
        z: planet.z,
        vx: planet.vx,
        vy: planet.vy,
        vz: planet.vz,
        radius: planet.radius,
        bone: planet.bone
    }];

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
    if (gameState == gameStateEnum.PLAY) { //only has to be rendered once
        cBackground.clearRect(0, 0, 2400, 1200); //only has to be rendered once
        cBackground.drawImage(bgimg, 0, 0, 2400, 1200); //only has to be rendered once
        for (i in stars) stars[i].render(); //only has to be rendered once

        skillbar.render(); //only has to be rendered once

        if (cd1 != null) cd1.render();
        if (cd2 != null) cd2.render();
        if (cd3 != null) cd3.render();

        planet.render();
        player.render(currentMouseX, currentMouseY);


        if (meteor != null) meteor.tick();
        // smokePar.tick();
        // smokePar2.tick();


        if (shield != null) shield.render(currentMouseX, currentMouseY);

        populateEnemies();

        for (i in explosions) {
            explosions[i].tick();
        }

        cBone.clearRect(0, 0, cBoneCanvas.width, cBoneCanvas.height);
        for (i in bones) {
            bones[i].render(bones[i].x, bones[i].y);
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
    // smokePar = new SmokeParticle(600, 600, 1); //392 244
    // smokePar2 = new SmokeParticle(620, 620, 2); //392 244

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

    for (i in bones) bones[i].destroy();

    dickLitList.splice(0, dickLitList.length);
    stars.splice(0, stars.length);
    innerSolarSystem.masses.splice(0, innerSolarSystem.masses.length);


    cSkills.clearRect(0, 0, 2400, 1200);
    cPlayer.clearRect(0, 0, 2400, 1200);
    cCircles.clearRect(0, 0, 2400, 1200);
    cDickLets.clearRect(0, 0, 2400, 1200);
    gPlanet.clearRect(0, 0, 2400, 1200);
    gRocket.clearRect(0, 0, 2400, 1200);
    cBackground.clearRect(0, 0, 2400, 1200);
    cStars.clearRect(0, 0, 2400, 1200);


     cAvatar.clearRect(0, 0, 2400, 1200);
     ctx.clearRect(0, 0, 2400, 1200);
    // gPlanet.clearRect(0, 0, 2400, 1200);
    // cStars.clearRect(0, 0, 2400, 1200);

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

//TODO atleast 3 weapons, we now have 1
//TODO username and avatar

//TODO add thrusters to player model

//TODO make the other planets spin, all different speed (put stars behind planets)

//TODO start building enemies into the game
//TODO score system and score screen

//TODO black holes

//TODO difficulty setting

//TODO when all above is done lets see if we can connect a DB for the scores

//TODO var interval = 10 //  / interval == 0 could be a possible deplay
// i%interval == 0

