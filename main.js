let flagArray = [
    'canada.png',
    'iceland.png',
    'namibia.png',
    'philippines.png',
    'seychelles.png',
    'sweden.png',
    'tanzania.png',
    'usa.png'
];

let flagsShown = []

getRandomFlag();
let flag = document.getElementsByTagName("img");
let flagForm = document.getElementById("guessFlag");

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
    }
}

function checkGuess() {
    event.preventDefault();
    const guess = document.getElementById("guess").value.toLowerCase().concat('.png');
    console.log(guess);
    if (guess == flagArray[flagsShown[flagsShown.length - 1]]) {
        getRandomFlag();
    }
    flagForm.reset();
}

document.getElementById("submitGuess").addEventListener('click', checkGuess);