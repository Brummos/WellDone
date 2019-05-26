// let img = new Image();
// img.src = 'https://jjwallace.github.io/assets/examples/images/boom.png'; //'https://jjwallace.github.io/assets/examples/images/boom.png';// 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png
// img.onload = function() {
//     init();
// };
//
// let canvas = document.querySelector('canvas');
// let ctx = canvas.getContext('2d');
//
// const scale = 1;
// const width = 256;
// const height = 256;
// const scaledWidth = scale * width;
// const scaledHeight = scale * height;
//
// function drawFrame(frameX, frameY, canvasX, canvasY) {
//     ctx.drawImage(img,
//         frameX * width, frameY * height, width, height,
//         canvasX, canvasY, scaledWidth, scaledHeight);
// }
//
// let i = 0;
// let sheetRow = 0;
// const sheetLengthX = 8;
// const sheetLengthY = 8;
//
// function step() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawFrame(i, sheetRow, 0, 0);
//     i++;
//     if (i >= sheetLengthX) {
//         i = 0;
//         sheetRow++;
//     }
//
//     //loop
//     if (sheetRow >= sheetLengthY) {
//         sheetRow = 0;
//     }
//     window.requestAnimationFrame(step);
// }
//
// function init() {
//
//     window.requestAnimationFrame(step);
// }