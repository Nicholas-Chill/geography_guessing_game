import { flagArray } from './flag_array.js';

const trophyImage = document.getElementById("win");
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

let currentFlagIndex = 0;
let score = 0;
let flagOrder = [];
let guess = "";
var buttonClicked; 
let flagsAndChoices = {}

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

    createFlagOrder();
    showFlag(flagOrder[0]);
    assignFlagToButton();
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
        increaseScore();
        if (score != flagArray.length) {
            buttonClicked.style.backgroundColor = 'green';
            flagOrder.splice(currentFlagIndex, 1);
            setTimeout(showFlag, 750, flagOrder[currentFlagIndex]);
            setTimeout(assignFlagToButton, 750);
            setTimeout(changeChoicesColorToWhite, 750);
        }
    } else {
        buttonClicked.style.backgroundColor = 'red';
    }

    if (score == flagArray.length) {
        buttonClicked.style.backgroundColor = 'green';
        setTimeout(changeChoicesColorToWhite, 750);
        trophyImage.style.display = "inline-flex";
        previous.disabled = true;
        next.disabled = true;
        input.disabled = true;
        endGame.disabled = true;
        restart.disabled = false;
        choice1.disabled = true;
        choice2.disabled = true;
        choice3.disabled = true;
        choice4.disabled = true;
    }
}

function increaseScore() {
    score += 1;
    showScore();
}

function getNextFlag() {
    let nextFlagIndex = currentFlagIndex + 1;

    if (nextFlagIndex > flagOrder.length - 1) {
        nextFlagIndex = 0;
    }

    currentFlagIndex = nextFlagIndex;
    showFlag(flagOrder[nextFlagIndex]);
    assignFlagToButton();
}

function getPreviousFlag() {
    let lastFlagIndex = currentFlagIndex - 1;

    if (lastFlagIndex < 0) {
        lastFlagIndex = flagOrder.length - 1;
    }

    currentFlagIndex = lastFlagIndex;

    showFlag(flagOrder[lastFlagIndex]);
    assignFlagToButton();
}

function showFlag(flag) {
    flagImage.src = `./flags/${flag}`;
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

    for (let i = 0; i < flagArray.length; i++) {
        randomChoiceOptions(i);
    }
}

function restartGame() {
    changeChoicesColorToWhite();
    currentFlagIndex = 0;
    score = 0;
    showScore();
    flagOrder = [];
    //createFlagOrder();
    showFlag(flagOrder[0]);
    //randomChoiceOptions();
    restart.disabled = true;
    startButton.disabled = false;
    endGame.disabled = true;
    trophyImage.style.display = "none";
}


function randomChoiceOptions(flag) {
    let choices = [choice1, choice2, choice3, choice4];
    const randomChoiceAnswer = choices[Math.floor(Math.random() * choices.length)];
    //choices.splice(choices.indexOf(randomChoiceAnswer), 1);

    let flagOptions = [];
    for (let i = 0; i < choices.length; i++) {
        if (choices[i] == randomChoiceAnswer) {
            flagOptions.push(flagOrder[flag]);
            continue;
        }

        let randomFlagIndex = getRandomFlagIndex();
        let randomFlag = flagArray[randomFlagIndex];
        while (flagOptions.includes(randomFlag) || randomFlag == flagOrder[randomFlag]) {
            randomFlagIndex = getRandomFlagIndex();
            randomFlag = flagArray[randomFlagIndex];
        }
        flagOptions.push(randomFlag);
    }

    flagsAndChoices[flagOrder[flag]] = flagOptions;
}

function changeChoicesColorToWhite() {
    for (let i = 0; i < choices.length; i++) {
        choices[i].style.backgroundColor = "white";
    }
}

function assignFlagToButton() {
    const choices = [choice1, choice2, choice3, choice4]
    let flags = flagsAndChoices[flagOrder[currentFlagIndex]];
    for (let i = 0; i < flags.length; i++) {
        choices[i].innerHTML = flags[i].replace(".png", "");
    }
}

showScore();

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