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

var menuImage = new Image();
menuImage.src = 'images/menu.jpg'; //menu

var optionsImage = new Image();
optionsImage.src = 'images/options.jpg'; //menu

var explosionImg = new Image();
explosionImg.src = 'images/boom.png';
var bgimg = new Image();
bgimg.src = 'images/bg.jpeg';

var volume = 1;
var musicVolume = 1;

var menuMusic = new Audio('audio/menu_audio.mp3');
menuMusic.volume = musicVolume;
menuMusic.loop = true;

musicVolumeSlider.addEventListener("input", function(){
    menuMusic.volume = musicVolumeSlider.value / 100;
});
