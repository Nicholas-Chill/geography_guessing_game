let flagArray = [
    'canada.png',
    'denmark.png'
    /*'finland.png',
    'iceland.png',
    'namibia.png',
    'norway.png',
    'philippines.png',
    'seychelles.png',
    'sweden.png',
    'tanzania.png',
    'usa.png'*/
];

let flagsShown = []

getRandomFlag();
let flag = document.getElementsByTagName("img");
let flagForm = document.getElementById("guessFlag");
let trophyImage = document.getElementById("win");
trophyImage.style.display = "none";

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
        trophyImage.style.display = "block";
    }
}

function checkGuess() {
    event.preventDefault();
    const guess = document.getElementById("guess").value.toLowerCase().concat('.png');
    if (guess == flagArray[flagsShown[flagsShown.length - 1]]) {
        getRandomFlag();
    }
    flagForm.reset();
}

document.getElementById("submitGuess").addEventListener('click', checkGuess);