import { flagArray } from './flag_array.js';

const trophyImage = document.getElementById("win");
const checkMark = document.getElementById("check");
const startButton = document.getElementById("start");
const next = document.getElementById("next");
const previous = document.getElementById("last");
const flagImage = document.getElementById("flag");
const endGame = document.getElementById("end");
const restart = document.getElementById("restart");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choice4 = document.getElementById("choice4");
const choices = document.getElementsByClassName("choices");

let score = 0;
let flagOrder = [];
let guess = "";
var buttonClicked; 

choice1.disabled = true;
choice2.disabled = true;
choice3.disabled = true;
choice4.disabled = true;
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

function getRandomFlagIndex() {
    let randomIndex = Math.floor(Math.random() * flagArray.length);
    randomIndex = Math.floor(Math.random() * flagArray.length);
    return randomIndex;
}

export function checkGuess() {
    if (guess.concat(".png") == flagOrder[currentFlagIndex]) {
        buttonClicked.style.backgroundColor = 'green';
        increaseScore();
        setTimeout(changeChoicesColorToWhite, 750);
        setTimeout(getNextFlag, 750);
    } else {
        buttonClicked.style.backgroundColor = 'red';
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
    randomChoiceOptions();
}

function getPreviousFlag() {
    let lastFlagIndex = currentFlagIndex - 1;

    if (lastFlagIndex < 0) {
        lastFlagIndex = flagOrder.length - 1;
    }

    currentFlagIndex = lastFlagIndex;

    showFlag(flagOrder[lastFlagIndex]);
    randomChoiceOptions();
}

function showFlag(flag) {
    if (flagOrder.length == 0) {
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
    previous.disabled = true;
    next.disabled = true;
    restart.disabled = false;
    endGame.disabled = true;
    choice1.disabled = true;
    choice2.disabled = true;
    choice3.disabled = true;
    choice4.disabled = true;
}

function createFlagOrder() {
    for (let i = 0; i < flagArray.length; i++) {
        let randomIndex = getRandomFlagIndex();
        while (flagOrder.includes(flagArray[randomIndex])) {
            randomIndex = getRandomFlagIndex();
        }
        flagOrder.push(flagArray[randomIndex]);
    }
}

function restartGame() {
    changeChoicesColorToWhite();
    currentFlagIndex = 0;
    score = 0;
    showScore();
    flagOrder = [];
    createFlagOrder();
    showFlag(flagOrder[0]);
    randomChoiceOptions();
    restart.disabled = true;
    startButton.disabled = false;
    endGame.disabled = true;
    trophyImage.style.display = "none";
}

function randomChoiceOptions() {
    let choices = [choice1, choice2, choice3, choice4];
    const randomChoiceAnswer = choices[Math.floor(Math.random() * choices.length)];
    choices.splice(choices.indexOf(randomChoiceAnswer), 1);
    randomChoiceAnswer.innerHTML = flagOrder[currentFlagIndex].replace(".png", "");

    let flagOptions = [];
    for (let i = 0; i < choices.length; i++) {
        let flagIndex = getRandomFlagIndex();
        let flag = flagArray[flagIndex];
        while (flagOptions.includes(flag) || flag == flagOrder[currentFlagIndex]) {
            flagIndex = getRandomFlagIndex();
            flag = flagArray[flagIndex];
        }
        flagOptions.push(flag);
        choices[i].innerHTML = flagOptions[i].replace(".png", "");
    }
}

function changeChoicesColorToWhite() {
    for (let i = 0; i < choices.length; i++) {
        choices[i].style.backgroundColor = "white";
    }
}

showScore();

hideCheckMark();

startButton.addEventListener('click', startGame);
next.addEventListener('click', () => {
    changeChoicesColorToWhite();
    getNextFlag();
});
previous.addEventListener('click', () => {
    changeChoicesColorToWhite();
    getPreviousFlag();
});
endGame.addEventListener('click', giveUp);
restart.addEventListener('click', restartGame);
choice1.addEventListener('click', (e) => {
    guess = e.target.innerHTML;
    buttonClicked = choice1;
    checkGuess();
});
choice2.addEventListener('click', (e) => {
    guess = e.target.innerHTML;
    buttonClicked = choice2;
    checkGuess();
});
choice3.addEventListener('click', (e) => {
    guess = e.target.innerHTML;
    buttonClicked = choice3;
    checkGuess();
});
choice4.addEventListener('click', (e) => {
    guess = e.target.innerHTML;
    buttonClicked = choice4;
    checkGuess();
});

createFlagOrder();

let currentFlagIndex = 0;

showFlag(flagOrder[0]);

randomChoiceOptions();

console.log(choices);