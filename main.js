let flagArray = [
    'albania.png',
    'algeria.png',
    'andorra.png',
    'angola.png',
    'antigua and barbuda.png',
    'argentina.png',
    'armenia.png',
    'australia.png',
    'austria.png',
    'azerbaijan.png',
    'bahamas.png',
    'bahrain.png',
    'bangladesh.png',
    'barbados.png',
    'belarus.png',
    'belgium.png',
    'belize.png',
    'benin.png',
    'bhutan.png',
    'bolivia.png',
    'bosnia and herzegovina.png',
    'botswana.png',
    'brazil.png',
    'brunei.png',
    'bulgaria.png',
    'burkina faso.png',
    'burundi.png',
    'cambodia.png',
    'cameroon.png',
    'canada.png',
    'cape verde.png',
    'central african republic.png',
    'chad.png',
    'chile.png',
    'china.png',
    'colombia.png',
    'comoros.png',
    'costa rica.png',
    'croatia.png',
    'cuba.png',
    'cyprus.png',
    'czechia.png',
    'democratic republic of the congo.png',
    'denmark.png',
    'djibouti.png',
    'dominica.png',
    'dominican republic.png',
    'ecuador.png',
    'egypt.png',
    'el salvador.png',
    'equatorial guinea.png',
    'eritrea.png',
    'estonia.png',
    'eswatini.png',
    'ethiopia.png',
    'fiji.png',
    'finland.png',
    'france.png',
    'germany.png',
    'iceland.png',
    'ivory coast.png',
    'mexico.png',
    'mozambique.png',
    'namibia.png',
    'netherlands.png',
    'north korea.png',
    'norway.png',
    'oman.png',
    'pakistan.png',
    'palau.png',
    'panama.png',
    'papua new guinea.png',
    'paraguay.png',
    'peru.png',
    'philippines.png',
    'poland.png',
    'portugal.png',
    'qatar.png',
    'romania.png',
    'russia.png',
    'rwanda.png',
    'seychelles.png',
    'south africa.png',
    'sweden.png',
    'tanzania.png',
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

let seconds1 = 0;
let seconds2 = 0;
let minutes1 = 0;
let minutes2 = 0;

let clock = setInterval(timer, 1000);

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
        clearInterval(clock);
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
        //setTimeout(getRandomFlag, 750);
        getRandomFlag();
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
    if(minutes2 == 9 && seconds1 == 5 && seconds2 == 9) {
        minutes1++;
        minutes2 = 0;
        seconds1 = 0;
        seconds2 = 0;
    } else if(seconds1 == 5 && seconds2 == 9) {
        minutes2++;
        seconds1 = 0;
        seconds2 = 0;
    } else if(seconds2 == 9) {
        seconds1++;
        seconds2 = 0;
    } else {
        seconds2++;
    }
    document.getElementById("timer").innerHTML = `Time: ${minutes1}${minutes2}:${seconds1}${seconds2}`;
}

document.getElementById("submitGuess").addEventListener('click', checkGuess);

console.log(flagArray.length);