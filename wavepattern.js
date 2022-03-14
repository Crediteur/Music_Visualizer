//draw the waveform to the screen
class WavePattern {
	constructor() {
		//vis name
		this.name = "wavepattern";
	}
	//draw the wave form to the screen
	draw(beat) {
		background(0);
		push();
		noFill();
		//stroke(150, 0, 220);
		strokeWeight(random(4));

		fourier.analyze();
		let bass = fourier.getEnergy("bass");
		let highMid = fourier.getEnergy("highMid");
		let treble = fourier.getEnergy("treble");
		var wave = fourier.waveform(); //do not modify

		beginShape();
		for (var i = 0; i < wave.length; i++) {
			var x = map(i, 0, wave.length, 0, width);
			var y = map(wave[i], -1, 1, 0, height);
			stroke(i, i, i);
			vertex(x, y - 200);
		}
		endShape();
		beginShape();
		for (var i = 0; i < wave.length; i++) {
			var x = map(i, 0, max(1, highMid), 0, width);
			var y = map(wave[i], -1, 1, 0, height);
			stroke(i, wave[i], i);
			vertex(x, y - 65);
		}
		endShape();

		beginShape();
		for (var i = 0; i < wave.length; i++) {
			var x = map(i, 0, max(1, treble), 0, width);
			var y = map(wave[i], -1, 1, 0, height);
			stroke(wave[i], wave[i], i);
			vertex(x, y + 65);
		}
		endShape();

		beginShape();
		for (var i = 0; i < wave.length; i++) {
			var x = map(i, 0, max(1, bass), 0, width);
			var y = map(wave[i], -1, 1, 0, height);
			stroke(i, i, wave[i]);
			vertex(x, y + 200);
		}
		endShape();

		pop();
	}
}