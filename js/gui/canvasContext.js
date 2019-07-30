var cCircles = document.getElementById("canvas_circles").getContext('2d');
var cDickLets = document.getElementById("canvas_dicklets").getContext('2d');
var cPlanetCanvas = document.getElementById("canvas_planet");
var gPlanet = document.getElementById("canvas_planet").getContext('2d');
var gRocket = document.getElementById("canvas_rocket").getContext('2d');
var cBackground = document.getElementById("canvas_background").getContext('2d');
var cStars = document.getElementById("canvas_stars").getContext('2d');
var cAvatarCanvas = document.getElementById("canvas_avatar");
var cAvatar = document.getElementById("canvas_avatar").getContext('2d');
var cPlayer = document.getElementById("canvas_player").getContext('2d');
var cPlayerCanvas = document.getElementById("canvas_player");
var cSkills = document.getElementById("canvas_skills").getContext('2d');
var cSkillsCanvas = document.getElementById("canvas_skills");
var cShield = document.getElementById("canvas_shield").getContext('2d');
var cShieldCanvas = document.getElementById("canvas_shield");
var cMeteor = document.getElementById("canvas_meteor").getContext('2d');
var cMeteorCanvas = document.getElementById("canvas_meteor");

var cSkillCD1 = document.getElementById("canvas_skill_cd1").getContext('2d');
var cSkillCD1Canvas = document.getElementById("canvas_skill_cd1");
var cSkillCD2 = document.getElementById("canvas_skill_cd2").getContext('2d');
var cSkillCD2Canvas = document.getElementById("canvas_skill_cd2");
var cSkillCD3 = document.getElementById("canvas_skill_cd3").getContext('2d');
var cSkillCD3Canvas = document.getElementById("canvas_skill_cd3");



var cBone = document.getElementById("canvas_bone").getContext('2d');
var cBoneCanvas = document.getElementById("canvas_bone");

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
var startGameBtn = document.getElementById("startGameBtn");

var nameField = document.getElementById("nameField");

var menuImage = new Image();
menuImage.src = 'images/menu.jpg'; //menu

var optionsImage = new Image();
optionsImage.src = 'images/options.jpg'; //menu

var skillsImage = new Image();
skillsImage.src = 'images/skillbar.png';

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

var imagesloader = 0;

function notify()
{
    alert('The imaged have been loaded into the browser cache.');
}

function loaded()
{
    imagesloader++;
    // if (imagesloader == 5) notify();

}



function preloader()
{
    menuImage = new Image();
    menuImage.src = 'images/menu.jpg'; //menu
    menuImage.onload = loaded;

    optionsImage = new Image();
    optionsImage.src = 'images/options.jpg'; //menu
    optionsImage.onload = loaded;

    explosionImg = new Image();
    explosionImg.src = 'images/boom.png';
    explosionImg.onload = loaded;

    bgimg = new Image();
    bgimg.src = 'images/bg.jpeg';
    bgimg.onload = loaded;

    menuMusic = new Audio('audio/menu_audio.mp3');

    avatarImg = new Image();
    avatarImg.src = "images/avatar_new.png";
    avatarImg.onload = loaded;


}