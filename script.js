let context = new AudioContext();
let oscillator;
let keyDownTime;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !oscillator) {
        keyDownTime = new Date().getTime(); // Record the time when the key is pressed down

        oscillator = context.createOscillator();
        oscillator.frequency.setValueAtTime(500, context.currentTime); // Set frequency to 500 Hz
        oscillator.connect(context.destination);
        oscillator.start();
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space' && oscillator) {
        const keyUpTime = new Date().getTime(); // Record the time when the key is released
        const duration = keyUpTime - keyDownTime; // Calculate the duration of the key press

        if (duration <= 250) {
            printMessage(". "); // Print "." for short presses
        } else {
            printMessage("- "); // Print "-" for long presses
        }

        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }
});

function printMessage(message) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML += `<p>${message}</p>`; // Append the message to the main content
}

document.addEventListener('keyup', function(event) {
    if (event.code !== 'Space') {
        printMessage(" ");
    }
});
