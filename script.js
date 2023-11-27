let context = new AudioContext();
let oscillator;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !oscillator) {
        oscillator = context.createOscillator();
        oscillator.frequency.setValueAtTime(500, context.currentTime); // Set frequency to 500 Hz
        oscillator.connect(context.destination);
        oscillator.start();
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space' && oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }
});