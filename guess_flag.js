import { flagArray } from './flag_array.js';

const flagForm = document.getElementById("guessFlag");
const trophyImage = document.getElementById("win");
const checkMark = document.getElementById("check");
const startButton = document.getElementById("start");
const input = document.getElementById("guess");
const submit = document.getElementById("submit");
const next = document.getElementById("next");
const previous = document.getElementById("last");
const flagImage = document.getElementById("flag");
const endGame = document.getElementById("end");
const restart = document.getElementById("restart");
const timer = document.getElementById("timer");

let score = 0;

let seconds1 = 0;
let seconds2 = 0;
let minutes1 = 0;
let minutes2 = 0;

let clock;

let flagOrder = [];

next.disabled = true;
previous.disabled = true;
endGame.disabled = true;
restart.disabled = true;
trophyImage.style.display = "none";

function startGame() {
    startButton.disabled = true;
    clock = setInterval(countUpTimer, 1000);
    input.disabled = false;
    input.focus();
    submit.disabled = false;
    next.disabled = false;
    previous.disabled = false;
    endGame.disabled = false;
}

function showScore() {
    document.getElementById('score').innerHTML = `Score: ${score}/${flagArray.length}`
}

function getRandomFlag() {
    if (flagOrder.length != flagArray.length) {
        let randomIndex = Math.floor(Math.random() * flagArray.length);
        let selectedFlag = flagArray[randomIndex];
        while (flagOrder.includes(selectedFlag)) {
            randomIndex = Math.floor(Math.random() * flagArray.length);
            selectedFlag = flagArray[randomIndex];
        }
        return randomIndex;
    }
}

export function checkGuess() {
    const guess = input.value.toLowerCase().concat('.png');
    if (guess == flagOrder[currentFlagIndex]) {
        submit.click();
        flagOrder.splice(currentFlagIndex, 1);
        checkMark.style.display = "inline-flex";
        increaseScore();
        setTimeout(hideCheckMark, 750);
        if (currentFlagIndex == flagOrder.length) {
            currentFlagIndex = 0;
        }
        showFlag(flagOrder[currentFlagIndex]);
        flagForm.reset();
    }
}

function increaseScore() {
    score += 1;
    showScore();
}

function hideCheckMark() {
    checkMark.style.display = "none";
}

function countUpTimer() {
    if (minutes2 == 9 && seconds1 == 5 && seconds2 == 9) {
        minutes1++;
        minutes2 = 0;
        seconds1 = 0;
        seconds2 = 0;
    } else if (seconds1 == 5 && seconds2 == 9) {
        minutes2++;
        seconds1 = 0;
        seconds2 = 0;
    } else if (seconds2 == 9) {
        seconds1++;
        seconds2 = 0;
    } else {
        seconds2++;
    }

    timer.innerHTML = `Time: ${minutes1}${minutes2}:${seconds1}${seconds2}`;
}

function getNextFlag() {
    let nextFlagIndex = currentFlagIndex + 1;

    if (nextFlagIndex > flagOrder.length - 1) {
        nextFlagIndex = 0;
    }

    currentFlagIndex = nextFlagIndex;
  
    showFlag(flagOrder[nextFlagIndex]);
    input.focus();
    flagForm.reset();
}

function getPreviousFlag() {
    let lastFlagIndex = currentFlagIndex - 1;

    if (lastFlagIndex < 0) {
        lastFlagIndex = flagOrder.length - 1;
    }

    currentFlagIndex = lastFlagIndex;

    showFlag(flagOrder[lastFlagIndex])
    input.focus();
    flagForm.reset();
}

function showFlag(flag) {
    if (flagOrder.length == 0) {
        clearInterval(clock);
        trophyImage.style.display = "inline-flex";
        previous.disabled = true;
        next.disabled = true;
        input.disabled = true;
        endGame.disabled = true;
        restart.disabled = false;
    } else {
        flagImage.src = `./flags/${flag}`;
    }
}

function giveUp() {
    clearInterval(clock);
    previous.disabled = true;
    next.disabled = true;
    input.disabled = true;
    restart.disabled = false;
    endGame.disabled = true;
}

function createFlagOrder() {
    for (let i = 0; i < flagArray.length; i++) {
        let randomIndex = getRandomFlag();
        flagOrder.push(flagArray[randomIndex]);
    }
}

function restartGame() {
    score = 0;
    seconds1 = 0;
    seconds2 = 0;
    minutes1 = 0;
    minutes2 = 0;
    timer.innerHTML = `Time: ${minutes1}${minutes2}:${seconds1}${seconds2}`;
    showScore();
    flagOrder = [];
    createFlagOrder();
    showFlag(flagOrder[0]);
    restart.disabled = true;
    startButton.disabled = false;
    endGame.disabled = true;
    trophyImage.style.display = "none";
}

showScore();

hideCheckMark();


startButton.addEventListener('click', startGame);
flagForm.addEventListener('input', checkGuess);
next.addEventListener('click', getNextFlag);
previous.addEventListener('click', getPreviousFlag);
endGame.addEventListener('click', giveUp);
restart.addEventListener('click', restartGame);

createFlagOrder();

let currentFlagIndex = 0;
showFlag(flagOrder[0]);