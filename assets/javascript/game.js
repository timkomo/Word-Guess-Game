
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', '-'
];


var passwords = ["booty", "blackbeard", "doubloon", "crowsnest", "poopdeck", 
"landho", "pegleg", "eyepatch", "kraken", "swords", "gold", "cannonball", "rum", "pearls", "whale", "parrot"]


var selectedWord = "";

var lettersInWord = [];

var letterBlanks = 0;
//Holds Blanks and right letter guesses
var blanksAndRightLetters = [];
//Holds Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 9;
var rightGuessCounter = 0;


//FUNCTIONS
// This area is the functions of the game. Functions are the actions within game. 
// They create the conditions to execute. 
//----------------------------------------
// This is the reset function.  The reset function is similar to the startGame() function 
// except the test is set to false and the function startGame() is initiated. 
// The reason the test variable is place in there is to not reset the win / loss sections.
function reset() {
    //Chooses word randombly from the passwords
    selectedWord = passwords[Math.floor(Math.random() * passwords.length)];
    // splits the selected word into individual letters
    lettersInWord = selectedWord.split('');
    //Get the number of letter blanks
    letterBlanks = lettersInWord.length;

    //Reset game ---------------
    
    letterGuessed = 0;
    rightGuessCounter = 0;
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];
    alphabet = ['a', 'b', 'c',
        'd', 'e', 'f',
        'g', 'h', 'i',
        'j', 'k', 'l',
        'm', 'n', 'o',
        'p', 'q', 'r',
        's', 't', 'u',
        'v', 'w', 'x',
        'y', 'z'
    ];
    test = false;
    startGame();
}

function startGame() {
    // When startGame() is initiated by the key up, the game will begin.
    // This is what code will run once the first key is initiated. 
    // Chooses word randombly from the passwords.
    selectedWord = passwords[Math.floor(Math.random() * passwords.length)];
    //Splits the choosen word into individual letters.
    lettersInWord = selectedWord.split('');
    //Get the number of blanks required for the letters in the word. 
    letterBlanks = lettersInWord.length;

    //RESET
    // These codes will reset to the following conditions. 
    //===========================================================
    rightGuessCounter = 0;
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];
    alphabet = ['a', 'b', 'c',
        'd', 'e', 'f',
        'g', 'h', 'i',
        'j', 'k', 'l',
        'm', 'n', 'o',
        'p', 'q', 'r',
        's', 't', 'u',
        'v', 'w', 'x',
        'y', 'z'
    ];

    //Populate blanks
    // This is the loop that will create the conditions to change the 
    // blanks to underscores to represent the letters to guess. 
    for (var i = 0; i < letterBlanks; i++) {
        blanksAndSuccesses.push('_');
        document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
    }

    //Changes HTML 
    // This part of the function will document the changes in the HTML when a value
    // is entered by the player
    document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
    // This will show the guesses the player makes.
    document.getElementById('numGuesses').innerHTML = guessesLeft;
    // This will show the number of guesses remaining. If a letter is missed, the 
    //guess will go down (see next function). 
    document.getElementById('winCounter').innerHTML = winCount;
    // This will show the number of wins the player gets. See Function winLose()
    document.getElementById('lossCounter').innerHTML = loseCount;
    // This will do the same thing as winCount, but represent a lose. 
    document.getElementById('wrongGuesses').innerHTML = wrongLetters;
    // This will show the stored values of the wrongLetters guessed. 
    // Testing / Debugging
    //console.log(selectedWord);
    //console.log(lettersInWord);
    //console.log(letterBlanks);
    //console.log(blanksAndSuccesses);
}

// This function is designed to compare the letters guessed.
function compareLetters(userKey) {
    //If player keys a letter from the alphabet array, 
     // then this if condition is saying: if the userKey
     // has a value inside the selectedWord then perform the loop below. 
     // The reason the -1 value is shown is because anything not represented 
     //in the chooseWord will carry a undefined or -1 value in the selectedWord. 
         if (selectedWord.indexOf(userKey) > -1) {
        //This variable is stating variable i = 0. If the conditions above allow, 
        // the loop will start at 0 and go through the letterBlanks. letterBlanks represent 
        // lettersinWord.length.  This loop will run until the value of the userKey is 
        // represented.  Once represented, the next condition will be activated. 
        for (var i = 0; i < letterBlanks; i++) {
            //This if condition states if userKey is not coerced by the lettersInWord[i], 
            //then increment the right guess counter, apply the userKey to the underscore stored
            //in the blanksAndSuccesses, and finally document these changes to the HTML ID wordToGuess.
            if (lettersInWord[i] === userKey) {
                rightGuessCounter++;
                blanksAndSuccesses[i] = userKey;
                document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
            }
        }
 
    }
    //Wrong Letters
    // This part of the condition is activated if the initial userKey gives us a -1 condition. 
    // If this is the case, the userKey is pushed into the wrongLetters area and 
    // the guesses are decreased.
    else {
        wrongLetters.push(userKey);
        guessesLeft--;
        //Changes HTML
        document.getElementById('numGuesses').innerHTML = guessesLeft;
        document.getElementById('wrongGuesses').innerHTML = wrongLetters;
        
      
    }



}
// This function is designed to provide the conditions of the win or loss to the player.
function winLose() {
    // This if statement is stating if the letterBlanks are not coerced by the rightGuessCounter
    // aka there are no more blanks left then increment the win count by 1, document the win, alert
    // the player of the win, and initiate the reset function. 
    if (rightGuessCounter === letterBlanks) {
        //Counts Wins 
        winCount++;
        //Changes HTML
        document.getElementById('winCounter').innerHTML = winCount;
        document.getElementById("pirateMan").src="http://www.videogamesprites.net/ChronoTrigger/NPCs/DarkAges/Dalton%20-%20Angry.gif";
        document.getElementById("pirateTalk").innerHTML =  selectedWord  + "!" + " Arr! You win my treasure! Type to play again!";

        reset();
    }
    // The other condition in the if else statement does the exact opposite to the rightGuessCounter. 
    // When number of Guesses reaches 0 then You lose
    else if (guessesLeft === 0) {
        //Counts losses
        loseCount++;
        //Changes HTML
        document.getElementById('lossCounter').innerHTML = loseCount;
        document.getElementById("pirateMan").src="http://www.videogamesprites.net/ChronoTrigger/NPCs/DarkAges/Dalton%20-%20Laugh.gif";
        document.getElementById("pirateTalk").innerHTML = "It was " + selectedWord + "!" + " Yo-Ho! You Lose! Time to walk the plank!! Type to play again.";
        reset();
    }
}

//MAIN PROCCESS
//-------------------------------------------	
//Initiates the Code.  This section activates the functions above. 
// This is stating the game will start when, the function (event)
// is activated with a key up by the player.  
 startGame();

document.onkeyup = function (event) {
    test = true;
    // This is a variable created to apply a value to the event.key. 
    var letterGuessed = event.key;
    // Changes picture and text back to original after winning and pressing anykey.
    document.getElementById("pirateMan").src="http://www.videogamesprites.net/ChronoTrigger/NPCs/DarkAges/Dalton%20-%20Nod.gif";;
    document.getElementById("pirateTalk").innerHTML = "What's the Password!?";

    // This loop is created to state variable i = 0. The variable will go through the loop
    // of the alphabet array until the userKey is met. Once met, the if condition will activate. 
    for (var i = 0; i < alphabet.length; i++) {
        // what this if state is stating if the variable of the alphabet[i] is not coerced by the 
        //letterGuesses and the true value is not coerced by test, then we will activate 
        // the compareLetters function and the winLose function. 
        if (letterGuessed === alphabet[i] && test === true) {
            // This variable is created to create the conditions so the player will not be
            //penalized for guessing a letter already guessed. 
            var spliceDword = alphabet.splice(i, 1);
      
            compareLetters(letterGuessed);
            winLose();
        }
    }

}