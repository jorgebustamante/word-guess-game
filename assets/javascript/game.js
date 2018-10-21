window.onload = function () {
let words = 
    [
        "RED",
        "ORANGE",
        "YELLOW",
        "GREEN",
        "BLUE",
        "INDIGO",
        "VIOLET",
    ];

const maxTries = 5; 

let guessedLetters = []; 
let currentWordIndex; 
let guessingWord = []; 
let livesLeft = 0; 
let hasFinished = false;      
let wins = 0; 


// reset
function resetGame() {
    livesLeft = maxTries;

    currentWordIndex = Math.floor(Math.random() * (words.length));

    guessedLetters = [];
    guessingWord = [];

    for (var i = 0; i < words[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }   

    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("lossimg").style.cssText = "display: none";
    document.getElementById("winimg").style.cssText = "display: none";

    updateDisplay();
};

//  updates display
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    let guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    //
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("livesLeft").innerText = livesLeft;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};


function evaluateGuess(letter) {
    let positions = [];

    for (var i = 0; i < words[currentWordIndex].length; i++) {
        if(words[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

   
    if (positions.length <= 0) {
        livesLeft--;
    } else {
        // letter insert
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
// win check
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("winimg").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};


// loss check
function checkLoss()
{
    if(livesLeft <= 0) {
        document.getElementById("lossimg").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
}

// make guess
function makeGuess(letter) {
    if (livesLeft > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};


// Event listener
document.onkeydown = function(event) {
    // reset game on kwystroke.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // az tester if(!/[a-z]/.test(letter)) return;
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};
}