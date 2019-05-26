// var FPS = 60;
// const canvas = document.querySelector("#canvas_enemies");
// const ctx = canvas.getContext("2d");
//
// const width = (canvas.width)// = window.innerWidth);
// const height = (canvas.height)// = window.innerHeight);
//
// var gExpl = document.getElementById("canvas_explosions").getContext('2d');
// var gExplc = document.getElementById("canvas_explosions");
//
// var gPlanet = document.getElementById("canvas_planet").getContext('2d');
// var planet = new Planet(0, 0);
//
// function Explosion(x, y) {
//     this.x = x;
//     this.y = y;
//     this.width = 50;
//     this.height = 50;
//     this.image = new Image();
//     this.render = function() {
//         this.image.src = "https://jjwallace.github.io/assets/examples/images/boom.png"//"images/explossion.png";
//         gExpl.drawImage(this.image, this.x, this.y, this.width, this.height);
//     };
// }
//
// function Planet(x, y) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.image = new Image();
//     this.render = function() {
//         this.image.src = "images/planet.png";
//         gPlanet.drawImage(this.image, this.x, this.y, this.width, this.height);
//     };
// }
//
// function render() {
//     gPlanet.clearRect(0, 0, width, height);
//     planet.render();
// }
//
// function rotatePlanet() {
//     gPlanet.translate(planet.width/2, planet.height/2);
//     gPlanet.rotate(- (Math.PI / 180) /10);
//     gPlanet.translate(-planet.width/2, -planet.height/2);
//
//
// }
//
// class nBodyProblem {
//     constructor(params) {
//         this.g = params.g;
//         this.dt = params.dt;
//         this.softeningConstant = params.softeningConstant;
//
//         this.masses = params.masses;
//     }
//
//     updatePositionVectors() {
//         const massesLen = this.masses.length;
//
//         for (let i = 0; i < massesLen; i++) {
//             const massI = this.masses[i];
//
//             if (i == 1) {
//
//
//              ///  console.log(massI.x * scale) + width /2;
//
//                // const x = (massI.x + width * 2) * scale;
//
//
//                 massI.rx += massI.vx * this.dt;
//                 massI.ry += massI.vy * this.dt;
//
//                 var pixelData = gPlanet.getImageData(massI.rx, massI.ry, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
//                 for (var zx = 0, n = pixelData.length; zx < n; zx += 4) {
//                     // console.log(pixelData[zx+3].toString());
//                 }
//             }
//
//
//
//
//
//             massI.x += massI.vx * this.dt;
//             massI.y += massI.vy * this.dt;
//             massI.z += massI.vz * this.dt;
//         }
//
//         return this;
//     }
//
//     updateVelocityVectors() {
//         const massesLen = this.masses.length;
//
//         for (let i = 0; i < massesLen; i++) {
//             const massI = this.masses[i];
//
//             massI.vx += massI.ax * this.dt;
//             massI.vy += massI.ay * this.dt;
//             massI.vz += massI.az * this.dt;
//         }
//     }
//
//     updateAccelerationVectors() {
//         const massesLen = this.masses.length;
//
//         for (let i = 0; i < this.masses.length; i++) {
//             let ax = 0;
//             let ay = 0;
//             let az = 0;
//
//             const massI = this.masses[i];
//
//             for (let j = 0; j < this.masses.length; j++) {
//
//
//
//                 if (i !== j) {
//
//
//
//
//
//                     // var pixelData = gPlanet.getImageData(massJ.x, massJ.y, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
//                     // for (var z = 0, n = pixelData.length; z < n; z += 4) {
//                     //     console.log(pixelData[z+3].toString());
//                     // }
//
//
//
//
//                     ////nice
//                     // this.masses.splice(j, 1);
//                     // break;
//
//                     const massJ = this.masses[j];
//
//                     if (massJ.radius == 4) {
//                         //some collision
//                         var indexX = Math.floor((massJ.x * scale) + (width / 2));
//                         var indexY = Math.floor((massJ.y * scale) + (height / 2));
//
//                         var pixelData = gPlanet.getImageData(indexX, indexY, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
//                         for (var zx = 0, n = pixelData.length; zx < n; zx += 4) {
//                             //console.log(pixelData[zx + 3].toString());
//
//                             if (pixelData[zx + 3].toString() != 0) {
//                                 var explosion = new Explosion(indexX, indexY);
//                                 explosion.render();
//                                 this.masses.splice(j, 1);
//
//
//
//                                 break;
//                             }
//                         }
//                     }
//                     //console.log(massJ.x*100);
//
// //massJ.x massJ.y
// //                     var pixelData = gPlanet.getImageData(500, 500, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
// //                     for (var z = 0, n = pixelData.length; z < n; z += 4) {
// //                         console.log(pixelData[z+3].toString());
// //                     }
//
//
//
//
//                     const dx = massJ.x - massI.x;
//                     const dy = massJ.y - massI.y;
//                     const dz = massJ.z - massI.z;
//
//                     const distSq = dx * dx + dy * dy + dz * dz;
//
//                     const f =
//                         (this.g * massJ.m) /
//                         (distSq * Math.sqrt(distSq + this.softeningConstant));
//
//                     ax += dx * f;
//                     ay += dy * f;
//                     az += dz * f;
//
//
//                     //if (collision(massI, massJ)) {
//                     //massJ.destroy(j);
//                     //}
//                 }
//             }
//
//             massI.ax = ax;
//             massI.ay = ay;
//             massI.az = az;
//         }
//
//         return this;
//     }
// }
//
// /*
//  * Inputs for our nBodyProblem
//  */
//
// const g = 20;//39.5; //gravity
// const dt = 0.008; //0.005 years is equal to 1.825 days //speed
// const softeningConstant = 0.15;
//
// const masses = [
//     {
//         name: "", //We use solar masses as the unit of mass, so the mass of the Sun is exactly 1
//         m: 2,
//         x: -1.50324727873647e-6,
//         y: -3.93762725944737e-6,
//         z: -4.86567877183925e-8,
//         vx: 3.1669325898331e-5,
//         vy: -6.85489559263319e-6,
//         vz: -7.90076642683254e-7,
//         rx: 0,
//         ry: 0,
//         radius: 300
//     }
// ];
//
// const innerSolarSystem = new nBodyProblem({
//     g,
//     dt,
//     masses: JSON.parse(JSON.stringify(masses)),
//     softeningConstant
// });
//
// class Manifestation {
//     constructor(ctx, trailLength, radius) {
//         this.ctx = ctx;
//
//         this.trailLength = trailLength;
//
//         this.radius = radius;
//
//         this.positions = [];
//     }
//
//     storePosition(x, y) {
//         this.positions.push({
//             x,
//             y
//         });
//
//         if (this.positions.length > this.trailLength) this.positions.shift();
//     }
//
//     draw(x, y) {
//         this.storePosition(x, y);
//
//         const positionsLen = this.positions.length;
//
//         for (let i = 0; i < positionsLen; i++) {
//             let transparency;
//             let circleScaleFactor;
//
//             const scaleFactor = i / positionsLen;
//
//             if (i === positionsLen - 1) {
//                 transparency = 1;
//                 circleScaleFactor = 1;
//             } else {
//                 transparency = scaleFactor / 2;
//                 circleScaleFactor = scaleFactor;
//             }
//
//             this.ctx.beginPath();
//             this.ctx.arc(
//                 this.positions[i].x,
//                 this.positions[i].y,
//                 circleScaleFactor * this.radius,
//                 0,
//                 2 * Math.PI
//             );
//             this.ctx.fillStyle = `rgb(0, 12, 153, ${transparency})`;
//
//             this.ctx.fill();
//         }
//     }
// }
//
// const scale = 300; //300
// const trailLength = 35;
//
// const populateManifestations = masses => {
//     masses.forEach(
//         mass =>
//             (mass["manifestation"] = new Manifestation(
//                 ctx,
//                 trailLength,
//                 mass.radius//radius
//             ))
//     );
// };
//
// populateManifestations(innerSolarSystem.masses);
//
// let mousePressX = 0;
// let mousePressY = 0;
// let currentMouseX = 0;
// let currentMouseY = 0;
// let dragging = false;
//
// canvas.addEventListener(
//     "mousedown",
//     e => {
//
//         // console.log(e.clientX)
//         // console.log(e.clientY)
//
//         // var pixelData = gPlanet.getImageData(e.clientX, e.clientY, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
//         // for (var z = 0, n = pixelData.length; z < n; z += 4) {
//         //     console.log(pixelData[z+3].toString());
//         // }
//
//
//         mousePressX = e.clientX;
//         mousePressY = e.clientY;
//         dragging = true;
//     },
//     false
// );
//
// canvas.addEventListener(
//     "mousemove",
//     e => {
//         currentMouseX = e.clientX;
//         currentMouseY = e.clientY;
//     },
//     false
// );
//
// const massesList = document.querySelector("#masses-list");
//
// canvas.addEventListener(
//     "mouseup",
//     e => {
//         const x = (mousePressX - width / 2) / scale;
//
//         const y = (mousePressY - height / 2) / scale;
//         const z = 0;
//         const vx = (e.clientX - mousePressX) / 35;
//         const vy = (e.clientY - mousePressY) / 35;
//         const vz = 0;
//         const rx = mousePressX;
//         const ry = mousePressY;
//         const radius = 4;
//
//         innerSolarSystem.masses.push({
//             m: parseFloat(massesList.value),
//             x,
//             y,
//             z,
//             vx,
//             vy,
//             vz,
//             rx,
//             ry,
//             radius,
//             manifestation: new Manifestation(ctx, trailLength, radius)
//         });
//
//         dragging = false;
//     },
//     false
// );
//
// const animate = () => {
//     render();
//     rotatePlanet();
//
//     innerSolarSystem
//         .updatePositionVectors()
//         .updateAccelerationVectors()
//         .updateVelocityVectors();
//
//     ctx.clearRect(0, 0, width, height);
//
//     const massesLen = innerSolarSystem.masses.length;
//
//     for (let i = 0; i < massesLen; i++) {
//         const massI = innerSolarSystem.masses[i];
//         const x = width / 2 + massI.x * scale;
//         const y = height / 2 + massI.y * scale;
//
//         massI.manifestation.draw(x, y);
//
//         // if (x < radius || x > width - radius) massI.vx = -massI.vx;
//         //
//         // if (y < radius || y > height - radius) massI.vy = -massI.vy;
//     }
//
//     if (dragging) {
//         ctx.beginPath();
//         ctx.moveTo(mousePressX, mousePressY);
//         ctx.lineTo(currentMouseX, currentMouseY);
//         ctx.strokeStyle = "red";
//         ctx.stroke();
//     }
//
//     requestAnimationFrame(animate);
// };
//
// animate();