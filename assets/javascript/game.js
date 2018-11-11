
//Array with the pokemon names
var pokemonNames = ['charmander', 'bulbasaur', 'squirtle'];

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

//variables grabs the html <span> with a matching id
var winText = document.getElementById("wins");
var lossText = document.getElementById("loss");
var guessRemText = document.getElementById("guesses");
var guessedText = document.getElementById("keyInputs");
var pokemonPicked = document.getElementById("hold");

//values represented in html
var wins = 0;
var loss = 0;
var guesses = 9;
var guessed = [];

var selectedPokemon ;

//Displays correct guess
var correctLetters = [];
var computerGuess;

//Number of spaces in a word
var spaces = '_';

//Computer guesses random letter function
function randomPokemon() {
    computerGuess = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
    console.log("Computer picked the Pokemon: " + computerGuess);
    document.getElementById("hold").innerHTML = computerGuess;
    return computerGuess;
}

function hiddenLetters() {
    document.getElementById("hold");
    for (i = 0; i < pokemonNames.length; i++); {
        console.log("testing hidden letters");
    }
}

//resets the guesses to 9 after a win
function resetGuess() {
    guesses = 9;
}

//resets the guessed keys to blank after a win
function resetGuessed() {
    guessed = [];
}

//pokemon name gets guessed
//run function to change letters to "_" until guessed correctly
//displays pokemon name in hold <div>
//when letters guessed correctly, change it to letters

//runs the random letter function

//when a key is pressed, runs this function
document.onkeyup = function (e) {
    var userInput = e.key.toLowerCase();
    console.log(userInput);

    //If the user input matches what the computer guessed, increase the value of wins by 1 and the values reset
    if (userInput === computerGuess) {
        wins++;
        console.log("Win")
        resetGuess();
        resetGuessed();
    }

    //If guesses equals 0, you get 1 loss and the values reset
    else if (guesses < 1) {
        loss++;
        console.log("Loss")
        resetGuess();
        resetGuessed();   
    }

    //If the user input doesn't match the computer guessed key, decrease the guess' value by 1
    else {
        guesses --;
        guessed.push(" " + userInput);
    }

    //This displays the values into the HTML
    winText.textContent = wins;
    lossText.textContent = loss;
    guessRemText.textContent = guesses;
    guessedText.textContent = guessed;
    pokemonPicked.textContent = computerGuess;

}