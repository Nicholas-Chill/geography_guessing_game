import { flagArray } from './flag_array.js';

const trophyImage = document.getElementById("win");
const checkMark = document.getElementById("check");
const startButton = document.getElementById("start");
const next = document.getElementById("next");
const previous = document.getElementById("last");
const flagImage = document.getElementById("flag");
const endGame = document.getElementById("end");
const restart = document.getElementById("restart");
const timer = document.getElementById("timer");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choice4 = document.getElementById("choice4");

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
    next.disabled = false;
    previous.disabled = false;
    endGame.disabled = false;
    choice1.disabled = false;
    choice2.disabled = false;
    choice3.disabled = false;
    choice4.disabled = false;
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

function randomChoiceOptions() {
    let choices = [choice1, choice2, choice3, choice4];
    const randomChoiceAnswer = choices[Math.floor(Math.random() * choices.length)];
    choices.splice(randomChoiceAnswer, 1);
    
    let randomChoiceOrder = [];
    for (let i = 0; choices.length; i++) {
        let randomIndex = Math.floor(Math.random() * choices.length);
        if (randomChoiceOrder.includes(randomIndex)) {
            while (randomChoiceOrder.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * choices.length);
            }
        }
        randomChoiceOrder.push(randomIndex);
    }

    let indexes = [];
    for (let i = 0; i < randomChoiceOrder.length; i++) {
        let randomIndex = Math.floor(Math.random() * flagArray.length);
        if (indexes.includes(randomIndex)) {
            while (indexes.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * flagArray.length);
            }
        }
        indexes.push(randomIndex);
        randomChoiceOrder[i].innerHTML = flagArray[indexes[0]].replace(".png", "");
    }

    randomChoiceAnswer.innerHTML = flagOrder[currentFlagIndex].replace(".png", "");
}

showScore();

hideCheckMark();

startButton.addEventListener('click', startGame);
next.addEventListener('click', getNextFlag);
previous.addEventListener('click', getPreviousFlag);
endGame.addEventListener('click', giveUp);
restart.addEventListener('click', restartGame);

createFlagOrder();

let currentFlagIndex = 0;

showFlag(flagOrder[0]);

randomChoiceOptions();