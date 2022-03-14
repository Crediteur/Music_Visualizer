class Spectrum {
	constructor() {
		this.name = "spectrum";
		this.fourierSpectrum = new p5.FFT(0.9, 128);
	}
	draw() {
		background(0);

		push();

		var spectrum = this.fourierSpectrum.analyze();
		noStroke();
		for (var i = 0; i < spectrum.length; i++) {

			//fade the colour of the bin from green to red
			var g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i] / 2, g / 3, i * 3);

			//draw each bin as a rectangle from the left of the screen
			//across
			var y = map(i, 0, spectrum.length, 0, height + 150);
			var w = map(spectrum[i], 0, 255, 0, width);
			rect(0, y, w, height / spectrum.length);
		}
		pop();
	}
}

