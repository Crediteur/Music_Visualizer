//extension 3, a psychedelic spinning pattern that moves and changes
//created by layering arc lines in a circular pattern that slowly rotate on its own
//music greatly enchances the rotation speed and spread pattern
class Spinner {
    constructor() {
        this.name = "spinner";
        this.gap = 3;
        this.cirNum = 60;
        this.cirSize = 5;
        this.angle = 360;
        this.maxBass = 200;
        this.randRed = random(100);
        this.randGreen = random(100);
    }
    draw(beat) {
        background(0, 15);
        push();
        fourier.analyze();
        let bass = fourier.getEnergy("bass");
        let highMid = fourier.getEnergy("highMid");
        let treble = fourier.getEnergy("treble");
        //let wave = fourier.waveform();

        angleMode(DEGREES);
        //translate to centre to create effect from centre
        translate(width / 2, height / 2);
        rotate(this.angle);
        strokeCap(SQUARE);

        noFill();

        if (beat) {
            this.angle += 0.08;
        }
        //gradual colour shift
        this.randRed += random(-treble / 40, treble / 40);
        this.randGreen += random(-highMid / 80, highMid / 80);
        this.randRed = constrain(this.randRed, 0, 255);
        this.randGreen = constrain(this.randGreen, 0, 255);
        stroke(this.randRed, this.randGreen, this.maxBass);

        //draw the circular pattern using arcs, influenced by the beat, treble, bass, highmid
        for (let i = 0; i < this.cirNum; i++) {
            //  x, y,       width,                           height,               start,                         stop
            arc(0, 0, this.cirSize + this.gap * i, this.cirSize + this.gap * i, this.angle * i + treble / 8, bass - this.angle * i + highMid / 100);
            strokeWeight(i);
            if (bass > 230) {
                stroke(bass / 1.3);
                this.gap += i;
            }
            else {
                this.gap += 0.9;
            }
        }

        //threshold for max bass on the song
        this.gap = 5;
        if (bass > this.maxBass) {
            this.maxBass = bass;
        }
        else {
            this.maxBass -= 0.01;
        }

        //passively rotate the circle
        if (this.angle > 3600) {
            this.angle = 360
        }
        this.angle += 0.01;
        pop();
    }
}