//displays and handles clicks on the playback button.
class PlaybackButton {
	constructor() {

		this.x = windowWidth / 16;
		this.y = windowHeight - windowHeight / 10;
		this.width = 50;
		this.height = 50;

		//flag to determine whether to play or pause after button click and
		//to determine which icon to draw
		this.playing = false;
	}

	draw() {
		if (this.playing) {
			rect(this.x, this.y, this.width / 2 - 2, this.height);
			rect(this.x + (this.width / 2 + 2), this.y, this.width / 2 - 2, this.height);
		}
		else {
			triangle(this.x, this.y, this.x + this.width, this.y + this.height / 2, this.x, this.y + this.height);

		}
	}

	hitCheck() {
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height && mode == 1) {
			if (!this.playing) {
				soundLibrary[currTrack].loop();
			}
			else {
				for (let i = 0; i < soundLibrary.length; i++) {
					soundLibrary[i].pause();
				}
			}
			this.playing = !this.playing;
			return true;
		}
		return false;
	}
}