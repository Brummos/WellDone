function exitGame() {
    gameState = gameStateEnum.MENU;
    reset();
    showUnpause();

    // cSkills.clearRect(0, 0, 2400, 1200);
    // cPlayer.clearRect(0, 0, 2400, 1200);
    // cCircles.clearRect(0, 0, 2400, 1200);
    // cDickLets.clearRect(0, 0, 2400, 1200);
    // gPlanet.clearRect(0, 0, 2400, 1200);
    // gRocket.clearRect(0, 0, 2400, 1200);
    // cBackground.clearRect(0, 0, 2400, 1200);
    // cStars.clearRect(0, 0, 2400, 1200);

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