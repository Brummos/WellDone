var Key = {
    escape: false,
    q: false,
    w: false,
    e: false
};

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
        const bone = new Bone(1280/30, 652/30);
        bones.push(bone);

        innerSolarSystem.masses.push({
            m: parseFloat(massesList.value),
            x,
            y,
            z,
            vx,
            vy,
            vz,
            radius,
            bone, //392 244
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
            case 81:
                Key.q = true;
                if (cd1 == null || !cd1.onCooldown) {
                    cd1 = new SkillCooldown(1838, 1101, 145, -105, 10, cSkillCD1Canvas);
                    shield = new Shield(244/5, 392/5, playerRadius, cShieldCanvas); //392 244
                }
                break;
            case 87:
                Key.w = true;
                if (cd2 == null || !cd2.onCooldown) {
                    cd2 = new SkillCooldown(2003, 1101, 142, -105, 2, cSkillCD2Canvas);
                }
                break;
            case 69:
                Key.e = true;
                if (cd3 == null || !cd3.onCooldown) {
                    cd3 = new SkillCooldown(2167, 1105, 145, -111, 1, cSkillCD3Canvas); //15
                    meteor = new Meteor(-50, 50, 3552/100, 2453/100, cMeteorCanvas); //392 244 cSkillCD1Canvas cMeteorCanvas //240 heigth
                   // meteor = new Meteor(-50, 240, 20, 20, cMeteorCanvas); //392 244 cSkillCD1Canvas cMeteorCanvas
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
        case 69:
            Key.e = false;
            break;
    }
}, false);