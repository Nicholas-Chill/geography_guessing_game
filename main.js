let flagArray = [
    /*'canada.png',
    'denmark.png',
    'finland.png',
    'france.png',
    'germany.png',
    'iceland.png',
    'mexico.png',
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

let seconds = 0;
let minutes = 0;

console.log(flagArray.length);
console.log(score);

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
    console.log(score);
}

function hideCheckMark() {
    checkMark.style.display = "none";
}

function timer() {
    seconds += 1;
    if(seconds == 60) {
        seconds = 0;
        minutes += 1;
    }
    document.getElementById("seconds").innerHTML = `Time: 0${minutes}:0${seconds}`;
}

if(score != flagArray.length) {
    setInterval(timer, 1000);
    console.log(flagArray.length);
    console.log("score: " + score);
} else {
    setInterval(timer, 0);
    console.log(flagArray.length);
    console.log("score: " + score);
}

document.getElementById("submitGuess").addEventListener('click', checkGuess);