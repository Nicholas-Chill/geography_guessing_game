image_array = [
    'sweden.png',
    'usa.png'
];
getRandomFlag();
let flag = document.getElementsByTagName("img");
let flagForm = document.getElementById("guessFlag");
console.log(flag[0].id);

function getRandomFlag() {
    let random_index = Math.floor(Math.random() * image_array.length);
    let selected_image = image_array[random_index];
    document.getElementById("flag").src = `./flags/${selected_image}`;
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