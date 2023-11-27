let context = new AudioContext();
let oscillator;
let keyDownTime;
let lastKeyUpTime = 0;
let spaceTimeout, slashTimeout;
let spaceAdded = false; 
let dotLength = 200;
let isMuted = false;
let pitch = 500;
let lastCharacterTime = 0; 

document.addEventListener('keydown', function(event) {
    if (!keyDownTime) { 
        keyDownTime = new Date().getTime();

        if (!oscillator && !isMuted) {
            oscillator = context.createOscillator();
            oscillator.frequency.setValueAtTime(pitch, context.currentTime); 
            oscillator.connect(context.destination);
            oscillator.start();
        }
    }
});

document.addEventListener('keyup', function(event) {
    // Removed the specific check for 'Space'
    const keyUpTime = new Date().getTime();
    const duration = keyUpTime - keyDownTime;

    if (duration <= dotLength) {
        printMessage(".");
    } else {
        printMessage("-");
    }

    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }

    keyDownTime = null;

    clearTimeout(spaceTimeout);
    clearTimeout(slashTimeout);

    spaceTimeout = setTimeout(function() {
        if (new Date().getTime() - keyUpTime >= dotLength * 3) {
            printMessage(" ");
        }
    }, dotLength * 3);

    slashTimeout = setTimeout(function() {
        if (new Date().getTime() - keyUpTime >= dotLength * 7) {
            printMessage("/ ");
        }
    }, dotLength * 7);
});





function printMessage(message) {
    const output = document.getElementById('output');
    output.value += message; 
}

function copyText() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
}

function clearText() {
    document.getElementById('output').value = ''; 
    document.getElementById('translation').textContent = ''; 
}


function morseCodeTranslator(morseCode) {
    const morseToText = {
        ".-": "A", 
        "-...": "B", 
        "-.-.": "C",
        "-..": "D", 
        ".": "E",
        "..-..": "É",
        "..-.": "F",
        "--.": "G",
        "....": "H", 
        "..": "I",
        ".---": "J",
        "-.-": "K",
        ".-..": "L", 
        "--": "M",
        "-.": "N",
        "---": "O",
        ".--.": "P", 
        "--.-": "Q",
        ".-.": "R", 
        "...": "S", 
        "-": "T",
        "..-": "U", 
        "...-": "V", 
        ".--": "W", 
        "-..-": "X", 
        "-.--": "Y",
        "--..": "Z", 
        ".----": "1", 
        "..---": "2", 
        "...--": "3",
        "....-": "4", 
        ".....": "5", 
        "-....": "6", 
        "--...": "7", 
        "---..": "8",
        "----.": "9", 
        "-----": "0", 
        ".-.-.-": ". ",
        "--..--": ", ",
        "---...": ":",
        "..--..": "?",
        ".----.": "'",
        "-....-": "–",
        "-..-.": "/",
        "-.--.": "(",
        "-.--.-": ")",
        ".-..-.": '"',
        "-...-": "=",
        "...-.": "[Understood] ",
        "........": "[Error] ",
        ".-.-.": "+",
        ".-...": "[Wait] ",
        "...-.-": "[End of work] ",
        "-.-.-": "[Starting signal] ",
        "-..-": "*",
        ".--.-.": "@",
        " ": " ",
        "/": " "
    };
        // "-.-": "[Invitation to transmit] ",
    console.log(morseCode)
    const bruh = morseCode.split(' ').map(code => morseToText[code]).join('');
    console.log(bruh)
    return bruh;
}


function translateMorse() {
    const morseCode = document.getElementById('output').value.trim();
    const translation = morseCodeTranslator(morseCode);
    document.getElementById('translation').textContent = translation;
}

function toggleMute() {
    isMuted = !isMuted;
    const muteButton = document.querySelector('.btn-warning');
    if (isMuted) {
        muteButton.textContent = 'Unmute';
    } else {
        muteButton.textContent = 'Mute';
    }
}

function updateDotLength() {
    const slider = document.getElementById('dot-length-slider');
    const dotLengthDisplay = document.getElementById('dot-length-display');
    const dotLengthValue = document.getElementById('dot-length-value');
    const dashLengthValue = document.getElementById('dash-length-value');

    dotLength = parseInt(slider.value);
    dotLengthDisplay.textContent = dotLength;
    dotLengthValue.textContent = dotLength;
    dashLengthValue.textContent = dotLength * 3; 
}

function updatePitch() {
    const slider = document.getElementById('pitch-slider');
    const pitchDisplay = document.getElementById('pitch-display');

    pitch = parseInt(slider.value);
    pitchDisplay.textContent = pitch;
}