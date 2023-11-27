let context = new AudioContext();
let oscillator;
let keyDownTime;
let lastKeyUpTime = 0;
let spaceTimeout;
let spaceAdded = false; 
let dotLength = 200;
let spaceTime = dotLength + 300;
let isMuted = false;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (!keyDownTime) {
            keyDownTime = new Date().getTime();
        }

        if (!oscillator && !isMuted) {
            oscillator = context.createOscillator();
            oscillator.frequency.setValueAtTime(500, context.currentTime); 
            oscillator.connect(context.destination);
            oscillator.start();
        }
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
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
        lastKeyUpTime = keyUpTime;

        clearTimeout(spaceTimeout);

        spaceTimeout = setTimeout(function() {
            if (new Date().getTime() - lastKeyUpTime >= spaceTime) { 
                printMessage(" "); 
                spaceAdded = true; 
            } else {
                spaceAdded = false;
            }
        }, spaceTime);
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
        "........": "[Understood] ",
        ".-.-.": "+",
        "-.-": "[Invitation to transmit] ",
        ".-...": "[Wait] ",
        "...-.-": "[End of work] ",
        "-.-.-": "[Starting signal] ",
        "-..-": "*",
        ".--.-.": "@",
        " ": " "
    };
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

