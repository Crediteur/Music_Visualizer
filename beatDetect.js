//constructor to anaylze and create a beat for the current song
class BeatDetect {
    constructor() {
        this.sampleBuffer = [];
    }
    detectBeat(spectrum) {
        let sum = 0;
        for (let i = 0; i < spectrum.length; i++) {
            sum += spectrum[i] * spectrum[i];
        }
        if (this.sampleBuffer.length == 30) {
            let sampleSum = 0;
            var isBeat = false;

            for (let i = 0; i < this.sampleBuffer.length; i++) {
                sampleSum += this.sampleBuffer[i];
            }

            let sampleAvg = sampleSum / this.sampleBuffer.length;
            let varianceSum = 0;
            for (let i = 0; i < this.sampleBuffer.length; i++) {
                varianceSum += this.sampleBuffer[i] - sampleAvg;
            }
            let variance = varianceSum / this.sampleBuffer.length;
            let m = -0.045 / (25 - 200);
            let b = 1 + (m * 200);
            let c = (m * variance) + b;

            if (sum > sampleAvg * c) {
                isBeat = true;
            }
            this.sampleBuffer.splice(0, 1);
            this.sampleBuffer.push(sum);
        }
        else {
            this.sampleBuffer.push(sum);
        }
        return isBeat;
    }
}