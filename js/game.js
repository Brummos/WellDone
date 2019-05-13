const canvas = document.querySelector("#canvas_enemies");
const ctx = canvas.getContext("2d");
const width = (canvas.width);
const height = (canvas.height);

var gExplC = document.getElementById("canvas_explosions");
var gExpl = document.getElementById("canvas_explosions").getContext('2d');
var gPlanet = document.getElementById("canvas_planet").getContext('2d');
var planet = new Planet(0, 0);

//var explosion = null;
var explosionCount = 0;

var explosions = [];

function Planet(x, y) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.render = function() {
        this.image.src = "images/planet.png";
        gPlanet.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
}

function Explosion(x, y) {
    this.x = x;
    this.y = y;
    this.width = 256;
    this.height = 256;
    this.scale = 1;
    this.scaledWidth = this.scale * this.width;
    this.scaledHeight = this.scale * this.height;
    this.i = 0;
    this.sheetRow = 0;
    this.sheetLengthX = 8;
    this.sheetLengthY = 8;
    this.image = new Image();
    this.image.src = 'https://jjwallace.github.io/assets/examples/images/boom.png';

    this.canvas = document.createElement('canvas');
    this.canvas.id = "canvas_explosion" + explosionCount;
    this.canvas.width  = 1000;
    this.canvas.height = 1000;
    this.canvas.style.zzIndex   = "8";
//    canvas.style.position = "absolute";
    this.canvas.style.border   = "1px solid black";
    document.getElementsByTagName("body")[0].appendChild(this.canvas);
    this.canvasContext = this.canvas.getContext("2d");

    this.render = function(frameX, frameY, canvasX, canvasY) {
        this.canvasContext.drawImage(this.image,
                        frameX * this.width, frameY * this.height,
                        this.width,
                        this.height,
                        canvasX,
                        canvasY,
                        this.scaledWidth,
                        this.scaledHeight);
    };

    this.tick = function() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.width); //TODO only where explosion is
        if (this.sheetRow <= this.sheetLengthY) {
            this.render(this.i, this.sheetRow, this.x-(this.width/2), this.y-(this.height/2));
            this.i++;
            if (this.i >= this.sheetLengthX) {
                this.i = 0;
                this.sheetRow++;
            }

            if (this.sheetRow > this.sheetLengthY) {
                //explosion = null; //TODO makes it stop refreshing the other explosions

                //TODO slice the array to remove it
                 var index = explosions.indexOf(this);
                 explosions.splice(index, 1);
                 explosionCount--;

                document.getElementsByTagName("body")[0].removeChild(this.canvas);

            }
        }
    }
}

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

                    if (massJ.radius == 4) {
                        //some collision
                        var indexX = Math.floor((massJ.x * scale) + (width / 2));
                        var indexY = Math.floor((massJ.y * scale) + (height / 2));

                        var pixelData = gPlanet.getImageData(indexX, indexY, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
                        for (var zx = 0, n = pixelData.length; zx < n; zx += 4) {
                            //console.log(pixelData[zx + 3].toString());

                            if (pixelData[zx + 3].toString() != 0) {

                                explosions.push(new Explosion(indexX, indexY));

                                //explosion = new Explosion(indexX, indexY); //TODO array van maken
                                explosionCount++;
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

const g = 20;//39.5; //gravity
const dt = 0.008; //0.005 years is equal to 1.825 days //speed
const softeningConstant = 0.15;

const masses = [
    {
        name: "",
        m: 2,
        x: -1.50324727873647e-6,
        y: -3.93762725944737e-6,
        z: -4.86567877183925e-8,
        vx: 3.1669325898331e-5,
        vy: -6.85489559263319e-6,
        vz: -7.90076642683254e-7,
        radius: 300
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

const scale = 300;
const trailLength = 35;

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

let mousePressX = 0;
let mousePressY = 0;
let currentMouseX = 0;
let currentMouseY = 0;
let dragging = false;

const massesList = document.querySelector("#masses-list");

addEventListener(
    "mousedown",
    e => {
        mousePressX = e.clientX;
        mousePressY = e.clientY;
        dragging = true;
    },
    false
);

addEventListener(
    "mousemove",
    e => {
        currentMouseX = e.clientX;
        currentMouseY = e.clientY;
    },
    false
);

addEventListener(
    "mouseup",
    e => {
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

        dragging = false;
    },
    false
);


function rotatePlanet() {
    gPlanet.translate(planet.width/2, planet.height/2);
    gPlanet.rotate(- (Math.PI / 180) /10);
    gPlanet.translate(-planet.width/2, -planet.height/2);
}

function render() {
    gPlanet.clearRect(0, 0, width, height);
    planet.render();
}

const animate = () => {
    render();
    rotatePlanet();

    for (i in explosions) {
        explosions[i].tick();
    }

    innerSolarSystem
        .updatePositionVectors()
        .updateAccelerationVectors()
        .updateVelocityVectors();

    ctx.clearRect(0, 0, width, height);

    const massesLen = innerSolarSystem.masses.length;

    for (let i = 0; i < massesLen; i++) {
        const massI = innerSolarSystem.masses[i];
        const x = width / 2 + massI.x * scale;
        const y = height / 2 + massI.y * scale;

        massI.manifestation.draw(x, y);

        // if (x < radius || x > width - radius) massI.vx = -massI.vx;
        //
        // if (y < radius || y > height - radius) massI.vy = -massI.vy;
    }

    if (dragging) {
        ctx.beginPath();
        ctx.moveTo(mousePressX, mousePressY);
        ctx.lineTo(currentMouseX, currentMouseY);
        ctx.strokeStyle = "red";
        ctx.stroke();
    }

    requestAnimationFrame(animate);
};

animate();