let imageArray = [
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
console.log(flag[0].id);

function getRandomFlag() {
    console.log(flagsShown);
    let randomIndex = Math.floor(Math.random() * imageArray.length);
    while(flagsShown.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random * imageArray.length);
    }
    let selectedImage = imageArray[randomIndex];
    document.getElementById("flag").src = `./flags/${selectedImage}`;
    flagsShown.push(randomIndex);
}

function checkGuess() {
    event.preventDefault();
    const guess = document.getElementById("guess").value.toLowerCase();
    console.log("Guess: " + guess);
    if(guess == flag[0].id) {
        console.log("Correct");
    } else {
        console.log("Wrong");
    }
    flagForm.reset();
}
document.getElementById("submitGuess").addEventListener('click', checkGuess);