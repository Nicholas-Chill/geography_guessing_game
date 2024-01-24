const guessButton = document.getElementById('guess');
const input = document.getElementById('input');
const countryList = document.getElementById('countries');

function submitGuess() {
    input.reset();
}

guessButton.addEventListener('click', submitGuess);