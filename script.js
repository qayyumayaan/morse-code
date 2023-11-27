let context = new AudioContext();
let oscillator;
let keyDownTime;
let lastKeyUpTime = 0;
let spaceTimeout;
let spaceAdded = false; 

document.addEventListener('keydown', function(event) {
    clearTimeout(spaceTimeout); 
    spaceAdded = false; 

    if (event.code === 'Space' && !oscillator) {
        keyDownTime = new Date().getTime();

        oscillator = context.createOscillator();
        oscillator.frequency.setValueAtTime(500, context.currentTime); 
        oscillator.connect(context.destination);
        oscillator.start();
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space' && oscillator) {
        const keyUpTime = new Date().getTime(); 
        const duration = keyUpTime - keyDownTime; 

        if (duration <= 250) {
            printMessage(". "); 
        } else {
            printMessage("- "); 
        }

        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;

        lastKeyUpTime = keyUpTime; 

        spaceTimeout = setTimeout(function() {
            if (new Date().getTime() - lastKeyUpTime >= 500 && !spaceAdded) { 
                printMessage(" "); 
                spaceAdded = true; 
            }
        }, 2000);
    }
});

function printMessage(message) {
    const output = document.getElementById('output');
    output.value += message; 
}

function copyText() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
}    document.getElementById('output').value = ''; 
    document.getElementById('translation').textContent = ''; 
}

