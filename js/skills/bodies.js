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

                    if (massJ.radius == 4) { //TODO improve this if statement to check if its not earth
                        //some pixel collision
                        var indexX = Math.floor((massJ.x * scale) + (width / 2));
                        var indexY = Math.floor((massJ.y * scale) + (height / 2));

                        massJ.bone.setXY(indexX, indexY); //KAN BETER
                        //massJ.bone.render(indexX, indexY);

                        var pixelData = gPlanet.getImageData(indexX, indexY, 1, 1).data;//event.offsetX, event.offsetY, 1, 1).data;
                        for (var zx = 0, n = pixelData.length; zx < n; zx += 4) {
                            //console.log(pixelData[zx + 3].toString());

                            if (pixelData[zx + 3].toString() != 0) { //.toString() ???? //alpha channel
                                massJ.bone.destroy();
                                var explosion = new Explosion(indexX, indexY, 256, 256, 1, 2400, 1200);
                                explosions.push(explosion);
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