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
                    if (playMusicBtn.value == "unmuted") {
                        menuMusic.pause();
                        for (i in explosions) explosions[i].soundEffect.pause();
                    }
                    showPause();
                } else {
                    if (playMusicBtn.value == "unmuted") {
                        menuMusic.play();
                        for (i in explosions) explosions[i].soundEffect.play();
                    }
                    showUnpause();
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