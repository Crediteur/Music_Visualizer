//extension 1, creates particles eminating from a layered semicircular pattern on screen
//particles move, change, and grow based on the music
//constructor determines how an object will behave based on the beat, bass, high mid, and treble of the current song
class StarTunnel {
    constructor() {
        this.name = "startunnel";
        this.circleLength = 150;
        this.particles = [];
        this.maxBass = 140;
        this.particleCount = 500; //particles change colour only after exceeding this number
    }
    draw(beat) {
        background(0, 50);
        push();
        angleMode(DEGREES);
        fourier.analyze();
        let bass = fourier.getEnergy("bass");
        let highMid = fourier.getEnergy("highMid");
        let treble = fourier.getEnergy("treble");
        let wave = fourier.waveform();

        //translate to centre to create expansion effect, and create particles based on beat
        translate(width / 2, height / 2);
        if (beat) {
            for (let i = 0; i < 3; i++) {
                let p = new sParticle((bass + treble + highMid) / 3 - 20);
                this.particles.push(p);
            }
        }
        //update all existing particles on screen, colour, movement, size, deletion
        //give random colour depending on number of existing particles on screen
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update(beat, bass > this.maxBass - 10);
            this.particles[i].show();
            if (i % this.particleCount == 0 && bass > this.maxBass - 10 && i != 0 && this.particles[i].colour == "white") {
                this.particles[i].colour = color(random(30, 255), random(30, 255), random(30, 255));
            }
            this.particles[i].size += (abs(this.particles[i].pos.x) + abs(this.particles[i].pos.y)) * 0.0001;
            if (this.particles[i].outofBounds()) {
                this.particles.splice(i, 1);
            }
        }

        noStroke();
        //draw right semicircle, listens to bass
        fill(highMid / 2, treble / 2, bass, 130);
        beginShape();
        for (let i = 0; i < this.circleLength; i++) {
            let ind = floor(map(i, 0, this.circleLength, 0, wave.length / 15));
            let size = map(wave[ind], 0, 1, bass / 1.9, 200); //map index to size/upper bounds of jumps
            let x = size * sin(i);
            let y = size * cos(i);
            vertex(x, y);
        }
        endShape(CLOSE);
        //draw left semicircle, listens to treble
        fill(treble * 2, treble, bass / 2, 130);
        if (treble > 25) {
            beginShape();
            for (let i = 0; i < this.circleLength; i++) {
                let ind = floor(map(i, 0, this.circleLength, 0, wave.length / 15));
                let size = map(wave[ind], 0, 1, treble, 200); //map index to size/upper bounds of jumps
                let x = size * -sin(i);
                let y = size * -cos(i);
                vertex(x, y);
            }
            endShape(CLOSE);
        }
        //draw top semicircle, listens to high mid
        fill(treble, bass / 1.4, highMid * 2, 130);
        if (highMid > 25) {
            beginShape();
            for (let i = 0; i < this.circleLength; i++) {
                let ind = floor(map(i, 0, this.circleLength, 0, wave.length / 15));
                let size = map(wave[ind], 0, 1, highMid, 180); //map index to size/upper bounds of jumps
                let x = size * cos(i);
                let y = size * -sin(i);
                vertex(x, y);
            }
            endShape(CLOSE);
        }

        //threshold for bass dependent effects to occur
        if (bass > this.maxBass) {
            this.maxBass = bass;
        }
        else {
            this.maxBass -= 0.05;
        }
        pop();
    }
}

//constructor to create specific vector particles for the star tunnel extension
//particles increase speed based on current beat and bass
class sParticle {
    constructor(s) {
        this.pos = p5.Vector.random2D().mult(max(15, s));
        this.vel = createVector(0, 0);
        this.acc = this.pos.copy().mult(random(0.00001, 0.00005));
        this.size = random(1, 3);

        this.colour = ("white");
    }
    //increase velocity based on beat, shake effect based on bass
    update(beat, bass) {
        this.pos.add(this.vel);
        this.vel.add(this.acc);

        if (beat) {
            for (let i = 0; i < 3; i++) {
                this.pos.add(this.vel);
            }
        }
        if (bass) {
            this.pos.add(p5.Vector.random2D());
        }
    }
    //update the particles each draw
    show() {
        noStroke();
        fill(this.colour);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
    //checks if particle is off screen
    outofBounds() {
        if (this.pos.x < -width || this.pos.x > width || this.pos.y < -height || this.pos.y > height) {
            return true;
        }
        return false;
    }
    //|| (this.pos.y > 2 && this.pos.y < 20 && this.pos.x > -3 && this.pos.x < 3) || (this.pos.y < 10 && this.pos.y > -10 && this.pos.x > -30 && this.pos.x < 30))
    //|| (this.pos.x < -10 && this.pos.y > 5 && this.pos.x > -40 && this.pos.y < 20)
}