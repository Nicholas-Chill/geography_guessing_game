import { flagArray } from './flag_array.js';

const flagForm = document.getElementById("guessFlag");
const trophyImage = document.getElementById("win");
const checkMark = document.getElementById("check");
const startButton = document.getElementById("start");
const input = document.getElementById("guess");
const submit = document.getElementById("submit")

let score = 0;

let seconds1 = 0;
let seconds2 = 0;
let minutes1 = 0;
let minutes2 = 0;

let clock;

let flagsShown = []

getRandomFlag();

function startGame() {
    startButton.disabled = true;
    //setInterval(checkGuess, 100);
    clock = setInterval(timer, 1000);
    input.disabled = false;
    input.focus();
    submit.disabled = false;
}

function showScore() {
    document.getElementById('score').innerHTML = `Score: ${score}/${flagArray.length}`
}

function getRandomFlag() {
    if (flagsShown.length != flagArray.length) {
        let randomIndex = Math.floor(Math.random() * flagArray.length);
        while (flagsShown.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * flagArray.length);
        }

        let selectedFlag = flagArray[randomIndex];
        document.getElementById("flag").src = `./flags/${selectedFlag}`;
        flagsShown.push(randomIndex);
    } else {
        clearInterval(clock);
        trophyImage.style.display = "inline-flex";
    }
}

export function checkGuess() {
    const guess = input.value.toLowerCase().concat('.png');
    if (guess == flagArray[flagsShown[flagsShown.length - 1]]) {
        submit.click();
        checkMark.style.display = "inline-flex";
        increaseScore();
        setTimeout(hideCheckMark, 750);
        getRandomFlag();
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

function timer() {
    if(minutes2 == 9 && seconds1 == 5 && seconds2 == 9) {
        minutes1++;
        minutes2 = 0;
        seconds1 = 0;
        seconds2 = 0;
    } else if(seconds1 == 5 && seconds2 == 9) {
        minutes2++;
        seconds1 = 0;
        seconds2 = 0;
    } else if(seconds2 == 9) {
        seconds1++;
        seconds2 = 0;
    } else {
        seconds2++;
    }

    document.getElementById("timer").innerHTML = `Time: ${minutes1}${minutes2}:${seconds1}${seconds2}`;
}

showScore();

hideCheckMark();
trophyImage.style.display = "none";

startButton.addEventListener('click', startGame);
flagForm.addEventListener('input', checkGuess);