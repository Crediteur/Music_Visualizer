//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
var soundLibrary = [];
var soundNames = [];
var currTrack = 0;
var tracks = 0;
var volume = 0.8;
//variable for p5 fast fourier transform
var fourier;
//function to check beat of music
var beatDetect;
//start text screen
var mode = 0;
function preload() {
	sound0 = loadSound('assets/stomper_reggae_bit.mp3');
	sound1 = loadSound('assets/nightdrive_vhsdreams.mp3');
	sound2 = loadSound('assets/multiverse_pbn.mp3');
	sound3 = loadSound('assets/heartbeat_natalie.mp3');
	sound4 = loadSound('assets/the_return_pylot.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	controls = new ControlsAndInput();
	beatDetect = new BeatDetect();
	soundSetup();
	textFont('Calibri');

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());
	vis.add(new StarTunnel());
	vis.add(new Fireworks());
	vis.add(new Spinner());
}

function draw() {
	let spectrum = fourier.analyze();
	if (mode == 0) {
		showStartScreen();
	}
	else {
		//draw the selected visualisation
		vis.selectedVisual.draw(beatDetect.detectBeat(spectrum));
		//draw the controls on top.
		controls.draw();
	}
}
//tutorial start screen
function showStartScreen() {
	push();
	background(0);
	textSize(32);
	strokeWeight(2);
	stroke("white");
	text(`'SPACE' to show menu`, windowWidth / 3, windowHeight / 2 - 240);
	text(`'1 - 6' to select visual template`, windowWidth / 3, windowHeight / 2 - 200);
	text(`'ENTER' play/pause current song`, windowWidth / 3, windowHeight / 2 - 160);
	text(`'←' '→' to change song`, windowWidth / 3, windowHeight / 2 - 120);
	text(`'↑' '↓' to adjust volume`, windowWidth / 3, windowHeight / 2 - 80);
	text(`'F' to go in fullscreen`, windowWidth / 3, windowHeight / 2 - 40);
	text(`Press 'ENTER' or click to continue!`, windowWidth / 3, windowHeight / 2 + 100);
	pop();
}
//song playlist & volume setup
function soundSetup() {
	soundLibrary = [sound0, sound1, sound2, sound3, sound4];
	soundNames = ["Stomper Reggae", "Nightdrive - VHS Dreams", "Multiverse - PBN", "Heartbeat - Natalie", "The Return - Pylot"];
	tracks = soundLibrary.length - 1;
	for (let i = 0; i < soundLibrary.length; i++) {
		soundLibrary[i].setVolume(volume);
	}

	//instantiate the fft object
	fourier = new p5.FFT(0.90);
}
function mouseClicked() {
	if (mode == 0 && focused) {
		mode = 1;
	}
	else {
		controls.mousePressed();
	}
}

function keyPressed() {
	if (keyCode == 13 && mode == 0) {
		mode = 1;
	}
	else {
		controls.keyPressed(keyCode);
	}
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}
