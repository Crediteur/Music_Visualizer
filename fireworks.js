//extension 2, fires missiles that explode in the air 
//launches particles synced to the beat of the music 
//determines particles that explode based on treble and bass thresholds of the song
class Fireworks {
    constructor() {
        this.name = "fireworks"
        this.particles = [];
        this.boomParticles = [];
        this.maxTreble = 60;
        this.explosionHeight = 0.3; //adjust close to 0 to allow explosion leniency to beat
        this.maxParticles = 1000; //max particles allowed on screen
        this.maxboomParticles = 80;
    }
    draw(beat) {
        background(0, 45);
        push();
        fourier.analyze();
        let bass = fourier.getEnergy("bass");
        //let highMid = fourier.getEnergy("highMid");
        let treble = fourier.getEnergy("treble");

        if (beat) {
            let p = new fParticle(random(width), height);
            this.particles.push(p);
        }
        if (bass > 230) {
            let b = new fParticle(random(0, width), height);
            b.vel = createVector(random(-10, 10), random(-10, -16));
            this.particles.push(b);
        }

        //fireworks missile, explodes when velocity is nearing 0
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].show();

            if (this.particles[i].vel.y > -this.explosionHeight && this.particles[i].vel.y < this.explosionHeight && treble > this.maxTreble - 15 && this.boomParticles.length < this.maxParticles) {
                this.particles[i].exploded = true;
                let rColourR = random(30, 255);
                let rColourB = random(30, 255);
                let rColourG = random(30, 255);
                //create and push explosion particles into new array, limit particles
                for (let j = 0; j < random(30, this.maxboomParticles); j++) {
                    let b = new fParticle(this.particles[i].pos.x, this.particles[i].pos.y, true)
                    b.size = random(3, 7);
                    b.applyForce(-4);
                    b.colourR = rColourR + j / 3;
                    b.colourG = rColourG - j;
                    b.colourB = rColourB + j;
                    this.boomParticles.push(b);
                }
            }
            //remove particles if off screen
            if (this.particles[i].outofBounds() || this.particles[i].exploded) {
                this.particles.splice(i, 1);
            }
        }

        //update & show boom particles
        for (let i = this.boomParticles.length - 1; i >= 0; i--) {
            this.boomParticles[i].update(true);
            this.boomParticles[i].show(true);
            this.boomParticles[i].vel.mult(random(0.93, 0.99));

            if (this.boomParticles[i].outofBounds() || this.boomParticles[i].lifespan < 0) {
                this.boomParticles.splice(i, 1);
            }
        }

        //threshold for treble dependent effects to occur
        if (treble > this.maxTreble) {
            this.maxTreble = treble;
        }
        else {
            this.maxTreble -= 0.05;
        }
        pop();
    }
}

//constructor that handles the creation of specific vector missile and explosion particles
//creates explosion particles if conditional is true
class fParticle {
    constructor(x, y, boom) {
        this.heightRatio = -(height / (height * 0.05 + 0.40)); //scale firework height to window height, default target = -19
        this.exploded = false; // checks if firework has exploded
        this.pos = createVector(x, y);
        //if firework has exploded, create explosion particles, else launch straight up
        if (boom) {
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(1, 6));
        }
        else {
            this.vel = createVector(0, random(this.heightRatio + 10, this.heightRatio));
        }
        this.acc = createVector(0, 0);
        this.size = 4;
        this.lifespan = 255; //alpha
        this.colourR = 200;
        this.colourG = 200;
        this.colourB = 200;
        this.gravity = 0.2;
    }
    applyForce(force) {
        this.acc.add(0, force);
    }
    update(boom) {
        //apply less acceleration if explosion particle, else apply more
        if (boom) {
            this.applyForce(this.gravity / 3);

        }
        else {
            this.applyForce(this.gravity);
        }
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        if (boom) {
            this.lifespan -= 2.8;
        }
        else {
            this.lifespan -= 1;
        }
        this.colour = color(this.colourR, this.colourG, this.colourB, this.lifespan);
        this.size -= 0.01;
    }
    //update particle location every draw
    show() {
        noStroke();
        fill(this.colour);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
    //function to check if particles are out of bounds
    outofBounds() {
        if (this.pos.y > height || this.pos.x < 0 || this.pos.x > width) {
            return true;
        }
        return false;
    }
}
//inspired from Coding Train video: https://youtu.be/CKeyIbT3vXI