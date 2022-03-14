//constructor function to draw and handle the onscreen menu with keyboard and mouse
//controls
function ControlsAndInput() {

	this.menuDisplayed = false;

	//playback button and other UI buttons
	this.playbackButton = new PlaybackButton();
	this.controlButton = new ControlButtons();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function () {
		if (!this.playbackButton.hitCheck()) {
			// var fs = fullscreen();
			// fullscreen(!fs);
		}
		if (!this.controlButton.fullscreen_hitCheck()) { }
		if (!this.controlButton.nextSong_hitCheck(this.playbackButton.playing)) { }
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function (keycode) {
		//console.log(keycode);
		if (keycode == 32) {
			this.menuDisplayed = !this.menuDisplayed;
		}
		//select visualizer with number keys 1-9
		if (keycode > 48 && keycode < 58) {
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
		}
		//right arrow key to go to next song
		if (keycode == 39 && mode == 1) {
			soundLibrary[currTrack].stop();
			if (currTrack >= tracks) {
				currTrack = 0;
				if (this.playbackButton.playing) {
					soundLibrary[currTrack].loop();
				}
			}
			else {
				currTrack++;
				if (this.playbackButton.playing) {
					soundLibrary[currTrack].loop();
				}
			}
		}
		//left arrow key to go to previous song
		if (keycode == 37 && mode == 1) {
			soundLibrary[currTrack].stop();
			if (currTrack == 0) {
				currTrack = tracks;
				if (this.playbackButton.playing) {
					soundLibrary[currTrack].loop();
				}
			}
			else {
				currTrack--;
				if (this.playbackButton.playing) {
					soundLibrary[currTrack].loop();
				}
			}
		}
		//up arrow key to increase volume by 20%
		if (keycode == 38 && mode == 1) {
			volume += 0.2;
			for (let i = 0; i < tracks; i++) {
				soundLibrary[i].setVolume(volume);
			}
		}
		//down arrow key to decrease volume by 20%
		if (keycode == 40 && mode == 1) {
			volume -= 0.2;
			for (let i = 0; i < tracks; i++) {
				soundLibrary[i].setVolume(volume);
			}
		}
		//enter key to pause/play song
		if (keycode == 13 && mode == 1) {
			if (!this.playbackButton.playing) {
				soundLibrary[currTrack].loop();
			}
			else {
				soundLibrary[currTrack].pause();
			}
			this.playbackButton.playing = !this.playbackButton.playing;
		}
		//f key to enter/exit fullscreen
		if (keycode == 70 && mode == 1 && focused) {
			fullscreen(!this.controlButton.fs);
			this.controlButton.fs = !this.controlButton.fs;
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function () {
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);
		//playback button 
		this.playbackButton.draw();
		this.playbackButton.x = windowWidth / 16;
		this.playbackButton.y = windowHeight - windowHeight / 10;

		this.controlButton.fullscreen_draw();
		this.controlButton.nextSong_draw();
		this.controlButton.x = windowWidth - windowWidth / 10;
		this.controlButton.y = windowHeight - windowHeight / 10;


		//only draw the menu if menu displayed is set to true.
		if (this.menuDisplayed) {
			text("Select a visualisation:", 100, 30);
			this.menu();
		}

		//display text song title and volume
		stroke(1);
		textSize(12);
		textAlign(CENTER);
		text(soundNames[currTrack], windowWidth / 16 + 25, windowHeight - windowHeight / 10 + 68);
		volume = constrain(volume, 0, 3); //constrain volume to 300%
		text("Vol: " + round(volume * 100) + "%", windowWidth - windowWidth / 10 + 25, windowHeight - windowHeight / 10 + 70);
		pop();

	};

	this.menu = function () {
		//draw out menu items for each visualisation
		for (var i = 0; i < vis.visuals.length; i++) {
			var yLoc = 70 + i * 40;
			text((i + 1) + ":  " + vis.visuals[i].name, 100, yLoc);
		}
	};
}


