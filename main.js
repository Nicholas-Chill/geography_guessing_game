let flagArray = [
    /*'canada.png',
    'denmark.png',
    'finland.png',
    'iceland.png',
    'namibia.png',
    'norway.png',
    'philippines.png',
    'seychelles.png',
    'sweden.png',
    'tanzania.png',*/
    'usa.png'
];

let flagsShown = []

getRandomFlag();
let flag = document.getElementsByTagName("img");
let flagForm = document.getElementById("guessFlag");
let trophyImage = document.getElementById("win");
let checkMark = document.getElementById("check");
hideCheckMark();
trophyImage.style.display = "none";

let score = 0;

function getRandomFlag() {
    if (flagsShown.length != flagArray.length) {
        let randomIndex = Math.floor(Math.random() * flagArray.length);
        while (flagsShown.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * flagArray.length);
        }

        let selectedFlag = flagArray[randomIndex];
        console.log(selectedFlag);
        document.getElementById("flag").src = `./flags/${selectedFlag}`;
        flagsShown.push(randomIndex);
    } else {
        trophyImage.style.display = "inline-flex";
    }
}

function checkGuess() {
    event.preventDefault();
    const guess = document.getElementById("guess").value.toLowerCase().concat('.png');
    if (guess == flagArray[flagsShown[flagsShown.length - 1]]) {
        checkMark.style.display = "inline-flex";
        increaseScore();
        setTimeout(hideCheckMark, 750);
        setTimeout(getRandomFlag, 750);
    }
    flagForm.reset();
}

function increaseScore() {
    document.getElementById("score").innerHTML = `Score: ${score += 1}/${flagArray.length}`;
}

function hideCheckMark() {
    checkMark.style.display = "none";
}

document.getElementById("submitGuess").addEventListener('click', checkGuess);