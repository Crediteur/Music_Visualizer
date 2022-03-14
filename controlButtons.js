//draws the control buttons and checks if user has clicked them within given bounds
class ControlButtons {
    constructor() {
        this.x = windowWidth - windowWidth / 10;
        this.y = windowHeight - windowHeight / 10;
        this.width = 50;
        this.height = 50;
        this.margin = this.width / 8;
        self = this;
        this.fs = false;
    }

    fullscreen_draw() {
        if (this.fs == true) {
            fill("black"); //draw fullscreen button
            rect(this.x, this.y, this.width, this.height);
            fill("white");
            rect(this.x + this.margin + 2, this.y + this.margin + 2, this.width - this.margin * 2 - 4, this.height - this.margin * 2 - 4);
            fill("black");
            rect(this.x, this.y + this.height / 2 - this.margin / 2, this.width, this.margin); //horizontal
            rect(this.x + this.width / 2 - this.margin / 2, this.y, this.margin, this.height); //vertical black bar
            rect(this.x, this.y, this.margin * 2.5, this.margin * 2.5);
            rect(this.x + 34.5, this.y, this.margin * 2.5, this.margin * 2.5);
            rect(this.x, this.y + 34.5, this.margin * 2.5, this.margin * 2.5);
            rect(this.x + 34.5, this.y + 34.5, this.margin * 2.5, this.margin * 2.5);
            fill("white");
        }
        else {
            fill("black");
            rect(this.x, this.y, this.width, this.height);
            fill("white");
            rect(this.x + this.margin, this.y + this.margin, this.width - this.margin * 2, this.height - this.margin * 2);
            fill("black");
            rect(this.x + this.margin * 2, this.y + this.margin * 2, this.width - this.margin * 4, this.height - this.margin * 4);
            rect(this.x, this.y + this.height / 2 - this.margin, this.width, this.margin * 2); //horizontal
            rect(this.x + this.width / 2 - this.margin, this.y, this.margin * 2, this.height); //vertical black bar
            fill("white");
        }
    }

    fullscreen_hitCheck() {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height && mode == 1) {
            fullscreen(!this.fs);
            this.fs = !this.fs;
        }
    }
    nextSong_draw() {
        triangle(this.x / 14 - 2, this.y - 60, this.x / 14 - 18 + this.width, this.y - 65 + this.height / 2, this.x / 14 - 2, this.y - 70 + this.height);
        triangle(this.x / 14 + 15, this.y - 60, this.x / 14 - 1 + this.width, this.y - 65 + this.height / 2, this.x / 14 + 15, this.y - 70 + this.height);
    }
    nextSong_hitCheck(playing) {
        if (mouseX > this.x / 14 - 2 && mouseX < this.x / 14 - 1 + this.width && mouseY > this.y - 60 && mouseY < this.y - 70 + this.height && mode == 1) {
            soundLibrary[currTrack].stop();
            if (currTrack >= tracks) {
                currTrack = 0;
                if (playing) {
                    soundLibrary[currTrack].loop();
                }
            }
            else {
                currTrack++;
                if (playing) {
                    soundLibrary[currTrack].loop();
                }
            }
        }
    }
}
