// var FPS = 60;
// var gBackgroundWidth = 400;
// var gBackgroundHeight = 400;
//
// var canvas = document.getElementById("canvas_background");
// var c= canvas.getContext('2d');
// var gBackground = document.getElementById("canvas_background").getContext('2d');
// var gPlanet = document.getElementById("canvas_planet").getContext('2d');
// var gArrow = document.getElementById("canvas_arrow").getContext('2d');
// var gPlayer = document.getElementById("canvas_player").getContext('2d');
// var GUI = document.getElementById("ui_enemies").getContext('2d');
//
// var mouseX = 0;
// var mouseY = 0;
//
// var mouseOX = 0;
// var mouseOY = 0;
//
//
// var imgArrow = new Image();
// imgArrow.src = "images/arrow.png";
//
// var sky = new Image();
// sky.src = "images/sky.jpg";
//
//
// var TO_RADIANS = Math.PI/180;
//
// var img = new Image();
// img.src = "images/arrow.png";//'http://cssdeck.com/uploads/media/4/4M29duK.png';
//
// var planet = new Planet((gBackgroundWidth/2)-400/2, (gBackgroundHeight/2)-400/2);
//
// // TODO
// // first
//
// // acceleration
// // deceleration
// // lift off
// // landing
//
// // other crap
// // friction
//
// addEventListener("mousedown", function(e){
//     var evt = (e==null ? event:e)
//     if (evt.which==1) {
//         Mouse.down = true;
//          mouseOX = evt.x;
//          mouseOY = evt.y;
//
//         console.log("mouse down");
//
//         var pixelData = gPlanet.getImageData(mouseOX, mouseOY, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
//         for (var i = 0, n = pixelData.length; i < n; i += 4) {
//             console.log(pixelData[i+3].toString());
//         }
//
//         // for (var i = 0; i < imgData.data.length; i += 4) {
//         //     imgData.data[i] = 255 - imgData.data[i];
//         //     imgData.data[i + 1] = 255 - imgData.data[i + 1];
//         //     imgData.data[i + 2] = 255 - imgData.data[i + 2];
//         //     imgData.data[i + 3] = 255;
//         // }
//
//
//         // for (var i = 0, n = pixelData.length; i < n; i += 4) {
//         //     console.log(pixelData[i+3].toString());
//         // }
//
//         // var imgData = gPlanet.getImageData(0, 0, 200, 200);
//         // for (var i = 0, n = imgData.length; i < n; i++) {
//         //
//         //
//         //     var h = imgData[i].x;
//         //
//         //     if (h> 0) {
//         //         console.log(imgData[i].x);
//         //     }
//         //
//         // }
//
//
//        // console.log(imgData.data[453].x);
//       //  imgData.data[i].
//
//         // var imgData = gPlanet.getImageData(0, 0, 200, 200).data;
//         // console.log(imgData[i+3].x);
//         //
//         // var pixelData = gPlanet.getImageData(event.offsetX, event.offsetY, 1, 1).data;
//
//        // var red=imgData.data[0];
//        //  green=imgData.data[1];
//        //  blue=imgData.data[2];
//        //  alpha=imgData.data[3];
//        //
//        //  console.log(red.size)
//
//         //particles[0].velocity = 0.03;
//     }
// }, false);
//
// addEventListener("mouseup", function(e){
//     var evt = (e==null ? event:e)
//     if (evt.which==1) {
//         Mouse.down = false;
//         console.log("mouse up");
//
//
//         gArrow.clearRect(0, 0, 400, 400);
//
//         // gArrow.clearRect(0, 0, gBackgroundWidth, gBackgroundHeight);
//         //gArrow.clearRect(0, 0, gBackgroundWidth, gBackgroundHeight);
//         //gArrow.drawImage(imgArrow, 100, 100, 100+evt.x, 50); //mouseX+evt.x, mouseY+evt.y)
//         // gArrow.drawImage(imgArrow, mouseX, mouseY, 10, 10);
//
//     }
//
//
//
// }, false);
//
// addEventListener("mousemove", function(e){
//     var evt = (e==null ? event:e)
//     if (evt.which==1) {
//         if (Mouse.down) {
//             mouseX = evt.x;
//             mouseY = evt.y;
//             console.log("mouse drag");
//
//             //canvas_arrow(gArrow, mouseOX, mouseOY, evt.x, evt.y);
//             gArrow.clearRect(0, 0, 400, 400);
//             drawArrow(mouseOX, mouseOY, evt.x, evt.y);
//
//             // gArrow.clearRect(0, 0, 400, 400);
//             //
//             //  gArrow.save();
//             //  gArrow.translate(mouseOX,mouseOY);
//             //  //gArrow.translate(400/2, img.height/2);
//             // var angle = Math.atan2(mouseY - 150, mouseX - 150);
//             //  gArrow.rotate(angle);
//             //  gArrow.drawImage(img, 0, 0, Math.abs(evt.x- mouseOX), Math.abs(evt.y- mouseOY));
//             //
//             //
//             //
//             // gArrow.restore();
//
//
//
//             // gArrow.save();
//             // gArrow.scale(1,1);
//             // gArrow.drawImage(img, img.width/2, img.height/2);
//             // gArrow.restore();
//
//             // gArrow.translate(100,100);
//             // gArrow.rotate(30 * TO_RADIANS);
//             // gArrow.drawImage(img, 0, 0);
//
//
//
//             //
//             // gArrow.clearRect(0, 0, gBackgroundWidth, gBackgroundHeight);
//             //
//             // gArrow.fillStyle = 'red';
//             // gArrow.fillRect(0, 0, 100, 100);
//             //
//             // gArrow.translate(100, 100);
//             // gArrow.fillStyle = 'blue';
//             // gArrow.fillRect(0, 0, 100, 100);
//
//             // gArrow.drawImage(imgArrow, 200, 200, 50, 50); //mouseX+evt.x, mouseY+evt.y)
//             // //  gArrow.translate(200,200); //(100+evt.x)/2
//             // // var angle = Math.atan2(mouseY - 150, mouseX - 150);
//             // //  gArrow.rotate(angle);
//             // //  gArrow.translate(0, 400);
//             //
//             // gArrow.translate(400/2, 400/2);
//             // gArrow.rotate(- (Math.PI / 180) /10);
//             // gArrow.translate(-400/2, -400/2);
//
//             //console.log(evt.x);
//         }
//     }
// }, false);
//
// var Mouse = {
//     down: false
// };
//
//
//
// function Planet(x, y) {
//     this.x = x;
//     this.y = y;
//     this.width = 400;
//     this.height = 400;
//     this.speed = 0.3;
//     this.image = new Image();
//     this.render = function() {
//         this.image.src = "images/planet.png";
//         gPlanet.drawImage(this.image, this.x, this.y, this.width, this.height);
//
//         //document.body.append(this.image);
//
//     };
//     this.tick = function() {
//         this.y += this.speed;
//     };
// }
//
// function Particle(x, y, radius, color) {
//     this.x = x;
//     this.y = y;
//     this.width = 30;
//     this.height = 30;
//     this.radius = radius;
//     this.color = color;
//     this.image = new Image();
//
//     this.radians = 0;
//     this.radius = 180;
//
//     this.acceleration = 0.00;
//     this.velocity = 0.001; //more is faster
//     this.friction = 0.994; //0.97 //less is more friction
//
// this.acc = true;
//
//     this.update = () => {
//
//         // hacky accellerate
//         if (this.acc) {
//         this.velocity += 0.0006;
//         if (this.velocity > 0.03) {
//             this.acc = false;
//             this.velocity = 0.03;
//         }
//     }
//         //console.log(this.velocity);
//
//         // introduce friction
//         this.velocity *= this.friction;
//        // console.log(this.velocity);
//
//         // move points over time
//         this.radians += this.velocity;
//         this.x = x + Math.cos(this.radians) * this.radius;
//         this.y = y + Math.sin(this.radians) * this.radius;
//
//         ///console.log(Math.cos(this.radians) * 100)
//
//         this.draw();
//     };
//
//     this.draw = () => {
//
//         this.image.src = "images/chicken.png";
//         c.drawImage(this.image, this.x, this.y, this.width, this.height);
//
//         // c.beginPath();
//         // c.arc(this.x, this.y, this.radius, 0,  Math.PI * 2, false);
//         // c.fillStyle = this.color;
//         // c.fill();
//         // c.closePath();
//     };
//
// }
//
// // function Particle(x, y, radius, color) {
// //     this.x = x;
// //     this.y = y;
// //     this.radius = radius;
// //     this.color = color;
// //     this.radians = 0;
// //     this.velocity = 0.05;
// //
// //     this.update = () => {
// //         // mnove points over time
// //         this.radians += this.velocity;
// //         this.x = x + Math.cos(this.radians) * 100;
// //         this.y = y + Math.sin(this.radians) * 100;
// //         console.log(Math.cos(this.radians) * 100);
// //         this.draw();
// //     };
// //
// //     this.draw = () => {
// //         c.beginPath();
// //         c.arc(this.x, this.y, this.radius, 0,  Math.PI * 2, false);
// //         c.fillStyle = this.color;
// //         c.fill();
// //         c.closePath();
// //     };
// //
// // }
//
// var particles = [];
// function init() {
//    //particles = [];
//
//     for (let i = 0; i < 1; i++) {
//         particles.push(new Particle(canvas.width/2, canvas.height/2, 5, 'blue'));
//     }
//
// }
//
//
// function render() {
//     gPlanet.clearRect(0, 0, gBackgroundWidth, gBackgroundHeight);
//     c.clearRect(0, 0, gBackgroundWidth, gBackgroundHeight);
//     planet.render();
//     GUI.clearRect(0, 0, gBackgroundWidth, gBackgroundHeight);
//     GUI.drawImage(sky, 0, 0, 400, 400);
//
// }
// // function tick() {
// //     //planet.image.style.transform = "rotate(90deg)";
// // }
//
//
// // function main() {
// //
// //     // gBackground.fillStyle = "black";
// //     // gBackground.fillRect(0, 0, 400, 400);
// //
// //     // this.image.src = "images/enemy.png";
// //     // gPlayer.drawImage(this.image, this.x, this.y, this.width, this.height);
// //
// // }
//
// // function init() {
// //
// // }
//
// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, canvas.width, canvas.height);
//
//     // for (particle in particles) {
//     //     particle.update();
//     // }
//     particles.forEach(particle => {
//         particle.update();
//     });
//
//     //p.update();
// }
//
// animate();
// init();
// setInterval(function() {
//     render();
//
//     // render();
//     // tick();
// }, 1000/FPS);
//
// function rotatePlanet() {
//     gPlanet.translate(400/2, 400/2);
//     gPlanet.rotate(- (Math.PI / 180) /10);
//     gPlanet.translate(-400/2, -400/2);
//
//
// }
//
// function drawArrow(fromx, fromy, tox, toy){
//     //variables to be used when creating the arrow
//     // var c = document.getElementById("myCanvas");
//     // var ctx = c.getContext("2d");
//     var headlen = 10;
//
//     var angle = Math.atan2(toy-fromy,tox-fromx);
//
//     //starting path of the arrow from the start square to the end square and drawing the stroke
//     gArrow.beginPath();
//     gArrow.moveTo(fromx, fromy);
//     gArrow.lineTo(tox, toy);
//     gArrow.strokeStyle = "#cc0000";
//     gArrow.lineWidth = 22;
//     gArrow.stroke();
//
//     //starting a new path from the head of the arrow to one of the sides of the point
//     gArrow.beginPath();
//     gArrow.moveTo(tox, toy);
//     gArrow.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
//
//     //path from the side point of the arrow, to the other side point
//     gArrow.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));
//
//     //path from the side point back to the tip of the arrow, and then again to the opposite side point
//     gArrow.lineTo(tox, toy);
//     gArrow.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
//
//     //draws the paths created above
//     gArrow.strokeStyle = "#cc0000";
//     gArrow.lineWidth = 22;
//     gArrow.stroke();
//     gArrow.fillStyle = "#cc0000";
//     gArrow.fill();
// }
//
// function canvas_arrow(context, fromx, fromy, tox, toy){
//     var headlen = 10;   // length of head in pixels
//     var angle = Math.atan2(toy-fromy,tox-fromx);
//     context.moveTo(fromx, fromy);
//     context.lineTo(tox, toy);
//     context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
//     context.moveTo(tox, toy);
//     context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
// }
//
// // function drawRotated(x, y, angle) {
// //   //  gArrow.setTransform(1, 0, 0, 1, x, y);
// //       gArrow.translate(100,100); //(100+evt.x)/2
// //       gArrow.rotate(angle);
// //       gArrow.translate(100, 100);
// //
// //    // gArrow.rotate(angle);
// //     // gArrow.beginPath();
// //     // gArrow.arc(0, 0, 100, 0, Math.PI * 2);
// //     // gArrow.moveTo(-100, 0);
// //     // gArrow.lineTo(100, 0);
// //     // gArrow.lineTo(60, -80);
// //     // gArrow.closePath();
// //     // gArrow.stroke();
// // }
//
// // render loop called 60 times a second
// // function update(timer) {
// //     gArrow.setTransform(1, 0, 0, 1, 0, 0); // reset transform
// //     gArrow.clearRect(0, 0, 300, 300);
// //
// //
// //     gArrow.drawImage(imgArrow, 100, 100, 50, 50); //mouseX+evt.x, mouseY+evt.y)
// //
// //     // get angle from center to mouse
// //     var angle = Math.atan2(mouseY - 150, mouseX - 150);
// //     console.log(angle)
// //
// //     // draw rotated design
// //     drawRotated(150, 150, angle);
// //     requestAnimationFrame(update);
// // }
// // requestAnimationFrame(update);
//
// setInterval(function() {
//     rotatePlanet();
// }, 1000/60);